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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password, rememberMe });
    // Navigate to SaaS Admin Dashboard
    navigate('/saas-admin');
  };

  return (
    <main className="min-h-screen bg-surface-container-low/50 flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant rounded-lg p-8 shadow-lg shadow-shadow/5">
        {/* Company Logo + Heading */}
        <div className="flex flex-col items-center text-center gap-4 mb-7">
          <img
            src="/company-logo.png"
            alt="Glopixcel"
            className="h-12 w-auto object-contain"
          />
          <h2 className="font-headline text-headline-md text-primary">Welcome Back</h2>
        </div>

        {/* Login Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Work Email Input */}
          <label className="flex flex-col gap-1.5">
            <span className="font-label text-label-md text-on-surface">Work Email</span>
            <div className="relative flex items-center">
              <span
                aria-hidden="true"
                className="material-symbols-outlined absolute left-3.5 text-outline text-title-md select-none"
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
                className="w-full rounded border border-outline-variant bg-surface-container-lowest pl-10 pr-3.5 py-2.5 font-body text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>
          </label>

          {/* Password with Show/Hide Eye Icon */}
          <label className="flex flex-col gap-1.5">
            <span className="font-label text-label-md text-on-surface">Password</span>
            <div className="relative flex items-center">
              <span
                aria-hidden="true"
                className="material-symbols-outlined absolute left-3.5 text-outline text-title-md select-none"
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
                className="w-full rounded border border-outline-variant bg-surface-container-lowest pl-10 pr-11 py-2.5 font-body text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
              <button
                type="button"
                aria-label="Toggle password visibility"
                onClick={togglePassword}
                className="absolute right-3 rounded p-0.5 text-outline hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span id="eye-icon" className="material-symbols-outlined text-title-md">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </label>

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between gap-2">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-outline-variant text-primary focus:ring-primary"
              />
              <span className="font-body text-body-md text-on-surface-variant">Remember me</span>
            </label>
            <a
              href="#forgot-password"
              className="font-label text-label-md text-tertiary hover:underline transition-colors duration-state-change"
            >
              Forgot Password?
            </a>
          </div>

          {/* Full-width Primary CTA Button */}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-primary text-on-primary font-label text-label-lg hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-state-change ease-state-change"
          >
            <span>Sign In</span>
          </button>
        </form>
      </div>
    </main>
  );
}
