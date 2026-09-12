import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, MapPin, Car, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';
import { TaraNissanLogo } from './TaraNissanLogo';
import { CAR_MODELS, DEALERS_LIST } from '../data/nissanData';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'signin' | 'signup';
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'signin',
  onClose,
  onSuccess,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordView, setForgotPasswordView] = useState(false);
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Sign In Form State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up Form State
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpCity, setSignUpCity] = useState(DEALERS_LIST[0].city);
  const [signUpPreferredCar, setSignUpPreferredCar] = useState(CAR_MODELS[0].name);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Error / Toast state
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!loginIdentifier || !loginPassword) {
      setErrorMessage('Please enter both your email/phone and password.');
      return;
    }

    // Simulate login
    const user: UserProfile = {
      id: 'usr_' + Date.now(),
      name: loginIdentifier.includes('@')
        ? loginIdentifier.split('@')[0].replace('.', ' ').toUpperCase()
        : 'Tara Nissan Member',
      email: loginIdentifier.includes('@') ? loginIdentifier : 'member@taranissan.in',
      phone: loginIdentifier.includes('@') ? '+91 98765 43210' : loginIdentifier,
      city: 'Delhi NCR',
    };

    onSuccess(user);
    onClose();
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!signUpName || !signUpEmail || !signUpPhone || !signUpPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Please accept the Terms & Privacy Policy to proceed.');
      return;
    }

    const user: UserProfile = {
      id: 'usr_' + Date.now(),
      name: signUpName,
      email: signUpEmail,
      phone: signUpPhone,
      city: signUpCity,
      preferredCar: signUpPreferredCar,
    };

    onSuccess(user);
    onClose();
  };

  const handleDemoLogin = () => {
    const demoUser: UserProfile = {
      id: 'usr_demo',
      name: 'Vikram Mehta',
      email: 'vikram.mehta@example.com',
      phone: '+91 98200 12345',
      city: 'Mumbai',
      preferredCar: 'Nissan Magnite',
    };
    onSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        id="auth-modal-container"
        className="bg-white dark:bg-[#151515] w-full max-w-lg my-8 overflow-hidden shadow-2xl relative border border-[#222222] dark:border-[#333333] flex flex-col max-h-[92vh] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Close button and Tara Nissan Logo */}
        <div className="bg-[#111111] dark:bg-[#0d0d0d] text-white p-6 pb-5 flex items-center justify-between border-b border-[#222222] dark:border-[#262626] shrink-0">
          <div className="flex items-center">
            <TaraNissanLogo theme="dark" size="md" />
          </div>
          <button
            id="close-auth-modal-btn"
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close authentication window"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab switchers: Sign In vs Sign Up */}
        {!forgotPasswordView && (
          <div className="flex border-b border-[#e5e5e5] dark:border-[#2a2a2a] bg-[#f8f8f8] dark:bg-[#1a1a1a] shrink-0">
            <button
              id="tab-signin-btn"
              onClick={() => {
                setMode('signin');
                setErrorMessage('');
              }}
              className={`flex-1 py-3.5 text-center text-[13px] font-nissan-bold uppercase tracking-[1.5px] cursor-pointer transition-colors border-b-2 ${
                mode === 'signin'
                  ? 'border-[#c3002f] text-[#c3002f] bg-white dark:bg-[#151515]'
                  : 'border-transparent text-[#666666] dark:text-[#a0a0a0] hover:text-[#111111] dark:hover:text-white'
              }`}
            >
              SIGN IN
            </button>
            <button
              id="tab-signup-btn"
              onClick={() => {
                setMode('signup');
                setErrorMessage('');
              }}
              className={`flex-1 py-3.5 text-center text-[13px] font-nissan-bold uppercase tracking-[1.5px] cursor-pointer transition-colors border-b-2 ${
                mode === 'signup'
                  ? 'border-[#c3002f] text-[#c3002f] bg-white dark:bg-[#151515]'
                  : 'border-transparent text-[#666666] dark:text-[#a0a0a0] hover:text-[#111111] dark:hover:text-white'
              }`}
            >
              CREATE ACCOUNT (SIGN UP)
            </button>
          </div>
        )}

        {/* Error display */}
        {errorMessage && (
          <div className="bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 text-[13px] px-6 py-2.5 border-b border-red-200 dark:border-red-900/50">
            {errorMessage}
          </div>
        )}

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* FORGOT PASSWORD VIEW */}
          {forgotPasswordView ? (
            <div className="space-y-6">
              {!forgotSubmitted ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setForgotSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="text-center space-y-2 mb-4">
                    <h3 className="text-[20px] font-nissan-bold text-[#111111] dark:text-white uppercase tracking-wide">
                      Reset Your Password
                    </h3>
                    <p className="text-[14px] text-[#666666] dark:text-[#a0a0a0] font-nissan-regular">
                      Enter the registered email or mobile number linked to your Tara Nissan profile. We'll send an OTP verification link.
                    </p>
                  </div>

                  <div>
                    <label className="nissan-label-text text-[#444444] dark:text-[#a0a0a0] block mb-1">
                      Email or Mobile Number
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. rahul@example.com or 9876543210"
                        className="w-full pl-10 pr-4 py-2.5 border border-[#d5d5d5] dark:border-[#333333] bg-white dark:bg-[#202020] text-[#111111] dark:text-white text-[14px] font-nissan-regular focus:outline-none focus:border-[#c3002f]"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-mui-contained w-full justify-center text-[13px] py-3 mt-4"
                  >
                    SEND VERIFICATION OTP
                  </button>

                  <button
                    type="button"
                    onClick={() => setForgotPasswordView(false)}
                    className="btn-mui-text w-full justify-center text-[13px] py-2 text-[#666666] dark:text-[#a0a0a0] hover:text-[#c3002f]"
                  >
                    &larr; BACK TO SIGN IN
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-[18px] font-nissan-bold text-[#111111] dark:text-white">
                    Verification Link Sent!
                  </h4>
                  <p className="text-[14px] text-[#555555] dark:text-[#b0b0b0]">
                    Please check your SMS or email inbox for instructions to reset your Tara Nissan password.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotSubmitted(false);
                      setForgotPasswordView(false);
                    }}
                    className="btn-nissan-primary px-6 py-2.5 text-[13px]"
                  >
                    RETURN TO SIGN IN
                  </button>
                </div>
              )}
            </div>
          ) : mode === 'signin' ? (
            /* SIGN IN (LOGIN) FORM */
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-[20px] font-nissan-bold text-[#111111] dark:text-white uppercase tracking-wide">
                  Welcome to Tara Nissan
                </h3>
                <p className="text-[14px] text-[#666666] dark:text-[#a0a0a0] font-nissan-regular">
                  Sign in to track your test drive bookings, service records, and personalized quotes.
                </p>
              </div>

              {/* Login Identifier */}
              <div>
                <label className="nissan-label-text text-[#444444] dark:text-[#a0a0a0] block mb-1">
                  Email Address or Mobile Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="signin-email-input"
                    type="text"
                    placeholder="Enter email or 10-digit mobile"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-[#d5d5d5] dark:border-[#333333] bg-white dark:bg-[#202020] text-[#111111] dark:text-white text-[14px] font-nissan-regular focus:outline-none focus:border-[#c3002f]"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="nissan-label-text text-[#444444] dark:text-[#a0a0a0]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordView(true)}
                    className="text-[12px] font-nissan-regular text-[#c3002f] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="signin-password-input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 border border-[#d5d5d5] dark:border-[#333333] bg-white dark:bg-[#202020] text-[#111111] dark:text-white text-[14px] font-nissan-regular focus:outline-none focus:border-[#c3002f]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  id="signin-remember-checkbox"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#c3002f] rounded-xs cursor-pointer"
                />
                <label
                  htmlFor="signin-remember-checkbox"
                  className="text-[13px] text-[#555555] dark:text-[#b0b0b0] font-nissan-regular cursor-pointer select-none"
                >
                  Keep me signed in on this device
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  id="signin-submit-btn"
                  type="submit"
                  className="btn-mui-contained w-full justify-center text-[13px] py-3.5"
                >
                  <span>SIGN IN TO MY TARA NISSAN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* One-click Demo login */}
              <div className="pt-3 border-t border-[#f0f0f0] dark:border-[#282828] flex flex-col gap-2">
                <button
                  type="button"
                  id="demo-login-quick-btn"
                  onClick={handleDemoLogin}
                  className="btn-mui-outlined w-full justify-center text-[12px] py-2.5"
                >
                  ⚡ One-Click Demo Sign In (Vikram Mehta)
                </button>

                <div className="text-center text-[13px] text-[#666666] dark:text-[#a0a0a0] pt-2">
                  Don't have a Tara Nissan account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="font-nissan-bold text-[#c3002f] hover:underline uppercase tracking-wider ml-1 cursor-pointer"
                  >
                    Sign Up Now
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* SIGN UP (CREATE ACCOUNT) FORM */
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-[20px] font-nissan-bold text-[#111111] dark:text-white uppercase tracking-wide">
                  Create Your Account
                </h3>
                <p className="text-[14px] text-[#666666] dark:text-[#a0a0a0] font-nissan-regular">
                  Join Tara Nissan Privileges for doorstep test drives, instant finance approvals, and priority service bookings.
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label className="nissan-label-text text-[#444444] dark:text-[#a0a0a0] block mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="signup-name-input"
                    type="text"
                    placeholder="e.g. Ramesh Kumar"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-[#d5d5d5] dark:border-[#333333] bg-white dark:bg-[#202020] text-[#111111] dark:text-white text-[14px] font-nissan-regular focus:outline-none focus:border-[#c3002f]"
                    required
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="nissan-label-text text-[#444444] dark:text-[#a0a0a0] block mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="signup-email-input"
                      type="email"
                      placeholder="ramesh@gmail.com"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-[#d5d5d5] dark:border-[#333333] bg-white dark:bg-[#202020] text-[#111111] dark:text-white text-[14px] font-nissan-regular focus:outline-none focus:border-[#c3002f]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="nissan-label-text text-[#444444] dark:text-[#a0a0a0] block mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="signup-phone-input"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={signUpPhone}
                      onChange={(e) => setSignUpPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-[#d5d5d5] dark:border-[#333333] bg-white dark:bg-[#202020] text-[#111111] dark:text-white text-[14px] font-nissan-regular focus:outline-none focus:border-[#c3002f]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="nissan-label-text text-[#444444] dark:text-[#a0a0a0] block mb-1">
                  Create Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="signup-password-input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="At least 6 characters"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 border border-[#d5d5d5] dark:border-[#333333] bg-white dark:bg-[#202020] text-[#111111] dark:text-white text-[14px] font-nissan-regular focus:outline-none focus:border-[#c3002f]"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Preferences: City and Interested Vehicle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="nissan-label-text text-[#444444] dark:text-[#a0a0a0] block mb-1">
                    Nearest Dealership City
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={signUpCity}
                      onChange={(e) => setSignUpCity(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 border border-[#d5d5d5] dark:border-[#333333] text-[13px] font-nissan-regular bg-white dark:bg-[#202020] text-[#111111] dark:text-white focus:outline-none focus:border-[#c3002f]"
                    >
                      {DEALERS_LIST.map((d) => (
                        <option key={d.id} value={d.city} className="dark:bg-[#202020]">
                          {d.city} ({d.name.split(' ')[0]})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="nissan-label-text text-[#444444] dark:text-[#a0a0a0] block mb-1">
                    Preferred Nissan Model
                  </label>
                  <div className="relative">
                    <Car className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={signUpPreferredCar}
                      onChange={(e) => setSignUpPreferredCar(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 border border-[#d5d5d5] dark:border-[#333333] text-[13px] font-nissan-regular bg-white dark:bg-[#202020] text-[#111111] dark:text-white focus:outline-none focus:border-[#c3002f]"
                    >
                      {CAR_MODELS.map((car) => (
                        <option key={car.id} value={car.name} className="dark:bg-[#202020]">
                          {car.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Agreement checkbox */}
              <div className="flex items-start gap-2 pt-2">
                <input
                  id="signup-terms-checkbox"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-[#c3002f] rounded-xs cursor-pointer"
                  required
                />
                <label
                  htmlFor="signup-terms-checkbox"
                  className="text-[12px] text-[#555555] dark:text-[#b0b0b0] font-nissan-regular leading-tight select-none cursor-pointer"
                >
                  I agree to Tara Nissan's Terms of Service and consent to receiving test drive updates and product news via Phone/WhatsApp.
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  id="signup-submit-btn"
                  type="submit"
                  className="btn-mui-contained w-full justify-center text-[13px] py-3.5"
                >
                  <span>CREATE TARA NISSAN ACCOUNT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center text-[13px] text-[#666666] dark:text-[#a0a0a0] pt-2 border-t border-[#f0f0f0] dark:border-[#282828]">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="font-nissan-bold text-[#c3002f] hover:underline uppercase tracking-wider ml-1 cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer info note */}
        <div className="bg-[#f5f5f5] dark:bg-[#181818] px-6 py-3 border-t border-[#e5e5e5] dark:border-[#2a2a2a] text-[11px] text-[#777777] dark:text-[#a0a0a0] flex items-center justify-between shrink-0">
          <span>Protected by 256-bit SSL Security</span>
          <span>Tara Nissan Dealership Network</span>
        </div>
      </div>
    </div>
  );
};
