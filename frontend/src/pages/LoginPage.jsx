import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('superadmin@trueark.io');
  const [password, setPassword] = useState('TrueArk2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSaasAdminLogin = (e) => {
    e.preventDefault();
    console.log('Logging in as SaaS Product Admin:', { email, password, rememberMe });
    navigate('/saas-admin');
  };

  const handleCompanyAdminLogin = (e) => {
    e.preventDefault();
    console.log('Logging in as Company Admin:', { email, password, rememberMe });
    navigate('/company-admin');
  };

  return (
    <main className="min-h-screen bg-surface-container-low/50 flex items-center justify-center p-6 lg:p-8">
      <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant rounded-lg p-7 lg:p-8 shadow-lg shadow-shadow/5">
        {/* Company Logo + Heading */}
        <div className="flex flex-col items-center text-center gap-3.5 mb-6">
          <img
            src="/company-logo.png"
            alt="TrueArk"
            className="h-11 w-auto object-contain"
          />
          <h2 className="font-headline text-[17px] lg:text-[18px] font-semibold text-primary">Welcome Back</h2>
        </div>

        {/* Login Form */}
        <form className="flex flex-col gap-4">
          {/* Work Email Input */}
          <label className="flex flex-col gap-1.5">
            <span className="font-label text-label-sm text-on-surface">Work Email</span>
            <div className="relative flex items-center">
              <span
                aria-hidden="true"
                className="material-symbols-outlined absolute left-3.5 text-outline text-[18px] select-none"
              >
                mail
              </span>
              <input
                id="work-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                inputMode="email"
                required
                className="w-full rounded border border-outline-variant bg-surface-container-lowest pl-10 pr-3.5 py-2 font-body text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>
          </label>

          {/* Password with Show/Hide Eye Icon */}
          <label className="flex flex-col gap-1.5">
            <span className="font-label text-label-sm text-on-surface">Password</span>
            <div className="relative flex items-center">
              <span
                aria-hidden="true"
                className="material-symbols-outlined absolute left-3.5 text-outline text-[18px] select-none"
              >
                lock
              </span>
              <input
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                className="w-full rounded border border-outline-variant bg-surface-container-lowest pl-10 pr-11 py-2 font-body text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
              <button
                type="button"
                aria-label="Toggle password visibility"
                onClick={togglePassword}
                className="absolute right-3 rounded p-0.5 text-outline hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span id="eye-icon" className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </label>

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between gap-2 py-0.5">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-outline-variant text-primary focus:ring-primary"
              />
              <span className="font-body text-body-sm text-on-surface-variant">Remember me</span>
            </label>
            <a
              href="#forgot-password"
              className="font-label text-label-sm text-tertiary hover:underline transition-colors duration-state-change"
            >
              Forgot Password?
            </a>
          </div>

          {/* Action Buttons: SaaS Product Admin and Company Admin */}
          <div className="flex flex-col gap-2.5 pt-1">
            {/* Primary Button: SaaS Product Admin */}
            <button
              type="button"
              onClick={handleSaasAdminLogin}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-primary text-on-primary font-label text-[13px] hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-state-change shadow-sm"
            >
              <span className="material-symbols-outlined text-[17px]">shield_person</span>
              <span>Sign In as SaaS Product Admin</span>
            </button>

            {/* Secondary Button: Company Admin */}
            <button
              type="button"
              onClick={handleCompanyAdminLogin}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-surface-container-low border border-outline-variant text-primary font-label text-[13px] hover:bg-surface-container hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-state-change"
            >
              <span className="material-symbols-outlined text-[17px] text-tertiary">corporate_fare</span>
              <span>Sign In as Company Admin</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
