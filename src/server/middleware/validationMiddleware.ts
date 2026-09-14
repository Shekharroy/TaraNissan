import { Request, Response, NextFunction } from 'express';

export type ValidatorRule = {
  field: string;
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'email' | 'phone' | 'date';
  min?: number;
  max?: number;
  pattern?: RegExp;
  enum?: string[];
  message?: string;
};

export function validateSchema(rules: ValidatorRule[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: Array<{ field: string; message: string }> = [];
    const body = req.body || {};

    for (const rule of rules) {
      const value = body[rule.field];

      if (rule.required && (value === undefined || value === null || value === '')) {
        errors.push({
          field: rule.field,
          message: rule.message || `${rule.field} is required.`,
        });
        continue;
      }

      if (value !== undefined && value !== null && value !== '') {
        if (rule.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(String(value).trim())) {
            errors.push({
              field: rule.field,
              message: rule.message || `${rule.field} must be a valid email address.`,
            });
          }
        }

        if (rule.type === 'phone') {
          // Indian 10-digit mobile or with +91
          const cleanPhone = String(value).replace(/[\s\-+]/g, '');
          if (cleanPhone.length < 10 || isNaN(Number(cleanPhone))) {
            errors.push({
              field: rule.field,
              message: rule.message || `${rule.field} must be a valid 10-digit phone number.`,
            });
          }
        }

        if (rule.min !== undefined) {
          if (typeof value === 'string' && value.length < rule.min) {
            errors.push({
              field: rule.field,
              message: rule.message || `${rule.field} must be at least ${rule.min} characters long.`,
            });
          } else if (typeof value === 'number' && value < rule.min) {
            errors.push({
              field: rule.field,
              message: rule.message || `${rule.field} must be greater than or equal to ${rule.min}.`,
            });
          }
        }

        if (rule.enum && !rule.enum.includes(value)) {
          errors.push({
            field: rule.field,
            message: rule.message || `${rule.field} must be one of: ${rule.enum.join(', ')}.`,
          });
        }
      }
    }

    if (errors.length > 0) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Request payload validation failed.',
          validationErrors: errors,
        },
      });
      return;
    }

    next();
  };
}
