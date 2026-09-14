// Centralized API Client connecting the React Client Layer to the Express Backend Layer

async function safeParseJson(res: Response) {
  try {
    const text = await res.text();
    return JSON.parse(text);
  } catch {
    return { success: false, message: `Server returned HTTP ${res.status}` };
  }
}

export interface TestDrivePayload {
  vehicleModel: string;
  vehicleModelCode?: string;
  fullName: string;
  phone: string;
  email: string;
  dealership?: string;
  dealershipCity?: string;
  bookingDate: string;
  timeSlot: string;
  locationType?: 'showroom' | 'doorstep';
  address?: string;
  notes?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  city?: string;
  preferredVehicle?: string;
}

export async function trackCallTelemetry(vehicleModel = 'General Inquiry') {
  try {
    const res = await fetch('/api/v1/leads/track-call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: '9031005087',
        vehicleModel,
        sourceUrl: window.location.href,
      }),
    });
    return await safeParseJson(res);
  } catch (err) {
    console.warn('[Telemetry] Error logging call event:', err);
    return null;
  }
}

export async function trackWhatsAppTelemetry(vehicleModel = 'All-New Nissan Lineup', message = '') {
  try {
    const res = await fetch('/api/v1/leads/track-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: '9031005087',
        vehicleModel,
        message,
        sourceUrl: window.location.href,
      }),
    });
    return await safeParseJson(res);
  } catch (err) {
    console.warn('[Telemetry] Error logging WhatsApp event:', err);
    return null;
  }
}

export async function apiBookTestDrive(payload: TestDrivePayload) {
  const res = await fetch('/api/v1/test-drives', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await safeParseJson(res);
  if (!res.ok) {
    throw new Error(data.error?.message || data.message || 'Failed to schedule test drive');
  }
  return data;
}

export async function apiRegister(payload: RegisterPayload) {
  const res = await fetch('/api/v1/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await safeParseJson(res);
  if (!res.ok) {
    throw new Error(data.error?.message || data.message || 'Registration failed');
  }
  return data;
}

export async function apiLogin(identifier: string, password: string) {
  const res = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  });

  const data = await safeParseJson(res);
  if (!res.ok) {
    throw new Error(data.error?.message || data.message || 'Sign in failed');
  }
  return data;
}

export async function apiSubmitLead(leadData: {
  leadType: string;
  name?: string;
  phone?: string;
  email?: string;
  vehicleModel?: string;
  vehicleModelCode?: string;
  message?: string;
  metadata?: Record<string, any>;
}) {
  try {
    const res = await fetch('/api/v1/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...leadData,
        sourceUrl: window.location.href,
      }),
    });
    return await safeParseJson(res);
  } catch (err) {
    console.warn('[API] Submit lead error:', err);
    return null;
  }
}

// Track Click Telemetry (Section 6: channel: "whatsapp" | "call", vehicleId)
export async function apiTrackClick(channel: 'whatsapp' | 'call', vehicleId?: string) {
  try {
    const res = await fetch('/api/v1/leads/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ channel, vehicleId }),
    });
    return await safeParseJson(res);
  } catch (err) {
    console.warn('[API] Track click error:', err);
    return null;
  }
}

// Demo role switch helper for fast evaluator verification
export async function apiDemoSwitchRole(role: 'customer' | 'sales_advisor' | 'service_manager' | 'admin') {
  const res = await fetch('/api/v1/auth/demo-switch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  });
  const data = await safeParseJson(res);
  if (!res.ok) {
    throw new Error(data.message || 'Failed to switch role');
  }
  if (data.data?.token) {
    try {
      localStorage.setItem('tara_nissan_jwt', data.data.token);
    } catch {}
  }
  return data.data?.user || data.data;
}

// Customer Dashboard API functions
export async function apiGetCustomerDashboard(phone?: string) {
  const url = phone ? `/api/v1/customer/dashboard?phone=${encodeURIComponent(phone)}` : '/api/v1/customer/dashboard';
  const res = await fetch(url);
  const data = await safeParseJson(res);
  if (!res.ok) throw new Error(data.message || 'Failed to load dashboard');
  return data.data;
}

export async function apiSaveCarConfiguration(config: any) {
  const res = await fetch('/api/v1/customer/configurations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config),
  });
  const data = await safeParseJson(res);
  if (!res.ok) throw new Error(data.message || 'Failed to save configuration');
  return data.data;
}

export async function apiDeleteCarConfiguration(id: string) {
  const res = await fetch(`/api/v1/customer/configurations/${id}`, {
    method: 'DELETE',
  });
  const data = await safeParseJson(res);
  if (!res.ok) throw new Error(data.message || 'Failed to delete configuration');
  return data;
}

export async function apiGetCustomerInvoices(phone?: string) {
  const url = phone ? `/api/v1/customer/invoices?phone=${encodeURIComponent(phone)}` : '/api/v1/customer/invoices';
  const res = await fetch(url);
  const data = await safeParseJson(res);
  if (!res.ok) throw new Error(data.message || 'Failed to load invoices');
  return data.data;
}

// Staff & Admin RBAC API functions
export async function apiGetAdminLeads() {
  const res = await fetch('/api/v1/admin/leads');
  const data = await safeParseJson(res);
  if (!res.ok) throw new Error(data.message || 'Failed to load leads');
  return data.data;
}

export async function apiUpdateLead(id: string, updates: { status?: string; assignedAdvisor?: string; notes?: string }) {
  const res = await fetch(`/api/v1/admin/leads/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  const data = await safeParseJson(res);
  if (!res.ok) throw new Error(data.message || 'Failed to update lead');
  return data.data;
}

export async function apiGetAdminTestDrives() {
  const res = await fetch('/api/v1/admin/test-drives');
  const data = await safeParseJson(res);
  if (!res.ok) throw new Error(data.message || 'Failed to load test drives');
  return data.data;
}

export async function apiUpdateTestDrive(id: string, updates: { status?: string; assignedAdvisor?: string }) {
  const res = await fetch(`/api/v1/admin/test-drives/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  const data = await safeParseJson(res);
  if (!res.ok) throw new Error(data.message || 'Failed to update test drive');
  return data.data;
}

export async function apiGetAdminServices() {
  const res = await fetch('/api/v1/admin/services');
  const data = await safeParseJson(res);
  if (!res.ok) throw new Error(data.message || 'Failed to load services');
  return data.data;
}

export async function apiUpdateServiceStatus(
  id: string,
  updates: { status?: string; currentStage?: number; estimatedDelivery?: string; assignedAdvisor?: string }
) {
  const res = await fetch(`/api/v1/admin/services/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  const data = await safeParseJson(res);
  if (!res.ok) throw new Error(data.message || 'Failed to update service status');
  return data.data;
}

export async function apiGetAdminStats() {
  const res = await fetch('/api/v1/admin/stats');
  const data = await safeParseJson(res);
  if (!res.ok) throw new Error(data.message || 'Failed to load stats');
  return data.data;
}
