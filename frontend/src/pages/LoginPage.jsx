import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('arjun.mehta@apexvaluations.in');
  const [password, setPassword] = useState('TrueArk2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    document.title = 'Sign In — TrueArk';
  }, []);

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
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-surface text-on-surface font-body antialiased">
      {/* Left Panel: Soft off-white with subtle topographic contour lines */}
      <section className="relative bg-surface border-b lg:border-b-0 lg:border-r border-outline-variant p-6 sm:p-10 lg:p-14 flex flex-col justify-between overflow-hidden min-h-[320px] lg:min-h-screen">
        {/* Subtle Topographic Contour Map SVG Background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40 select-none"
          viewBox="0 0 800 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <path
            d="M-80 120C60 80 180 180 320 140C460 100 560 20 740 80C860 120 920 220 940 280"
            stroke="#CBD5E1"
            strokeWidth="1.25"
          />
          <path
            d="M-60 200C80 150 210 250 360 200C510 150 610 70 790 140C890 180 940 270 960 340"
            stroke="#CBD5E1"
            strokeWidth="1.25"
          />
          <path
            d="M-40 290C110 230 230 330 390 270C550 210 650 140 820 210"
            stroke="#CBD5E1"
            strokeWidth="1.25"
          />
          <path
            d="M-90 410C70 360 190 460 370 400C550 340 660 260 850 340"
            stroke="#CBD5E1"
            strokeWidth="1.25"
          />
          <path
            d="M-50 530C120 480 260 580 430 510C600 440 710 380 880 460"
            stroke="#CBD5E1"
            strokeWidth="1.25"
          />
          <path
            d="M-70 660C100 600 240 700 410 640C580 580 700 500 890 590"
            stroke="#CBD5E1"
            strokeWidth="1.25"
          />
          <path
            d="M-30 780C150 720 290 810 470 750C650 690 760 630 920 710"
            stroke="#CBD5E1"
            strokeWidth="1.25"
          />
          <ellipse cx="560" cy="480" rx="190" ry="120" stroke="#E2E8F0" strokeWidth="1.25" />
          <ellipse cx="560" cy="480" rx="135" ry="82" stroke="#E2E8F0" strokeWidth="1.25" />
          <ellipse cx="560" cy="480" rx="80" ry="48" stroke="#E2E8F0" strokeWidth="1.25" />
        </svg>

        {/* Top: TrueArk Brand Logo */}
        <header className="relative z-10 flex items-center">
          <img
            src="/company-logo.png"
            alt="TrueArk"
            className="h-10 sm:h-12 w-auto object-contain hover:opacity-90 transition-opacity"
          />
        </header>

        {/* Center: Value Proposition */}
        <div className="relative z-10 max-w-lg my-auto py-8 sm:py-12 lg:py-0">
          <h1 className="font-display text-[28px] sm:text-[36px] lg:text-[44px] font-bold text-primary leading-tight text-balance">
            Precision Land &amp; Property Valuations
          </h1>
          <p className="mt-3 sm:mt-4 font-body text-body-md text-on-surface-variant max-w-md">
            Bank-grade property valuation, survey analytics, and regulatory compliance platform for certified valuation firms and financial institutions.
          </p>
        </div>

        {/* Bottom Footer Note */}
        <div className="relative z-10 pt-4 border-t border-outline-variant/60 flex items-center justify-between text-on-surface-variant font-body text-body-sm">
          <span>© {new Date().getFullYear()} TrueArk Systems</span>
          <span className="inline-flex items-center gap-1.5 text-secondary font-medium">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Enterprise Cloud v4.2
          </span>
        </div>
      </section>

      {/* Right Panel: Crisp White Floating Login Card */}
      <main className="bg-surface-container-low/50 flex items-center justify-center p-6 sm:p-8 lg:p-14 min-h-[600px] lg:min-h-screen">
        <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant rounded-lg p-7 sm:p-8 shadow-lg shadow-shadow/5">
          {/* Mobile-only TrueArk logo */}
          <div className="lg:hidden flex items-center justify-center mb-6">
            <img
              src="/company-logo.png"
              alt="TrueArk"
              className="h-9 w-auto object-contain"
            />
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h2 className="font-headline text-[20px] sm:text-[22px] font-semibold text-primary">
              Welcome Back
            </h2>
            <p className="font-body text-body-sm text-on-surface-variant mt-1">
              Please enter your credentials to access the portal
            </p>
          </div>

          {/* Login Form */}
          <form className="flex flex-col gap-4 sm:gap-5" onSubmit={(e) => e.preventDefault()}>
            {/* Work Email */}
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Work Email</span>
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
                  className="w-full rounded border border-outline-variant bg-surface-container-lowest pl-10 pr-11 py-2.5 font-body text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
                <button
                  type="button"
                  aria-label="Toggle password visibility"
                  onClick={togglePassword}
                  className="absolute right-3 rounded p-1 text-outline hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
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
                <span className="font-body text-body-md text-on-surface-variant">Remember me</span>
              </label>
              <a
                href="#forgot-password"
                className="font-label text-label-md text-tertiary hover:underline transition-colors duration-state-change"
              >
                Forgot Password?
              </a>
            </div>

            {/* Two Login Buttons */}
            <div className="flex flex-col gap-2.5 pt-1.5">
              {/* Primary Button: SaaS Product Admin */}
              <button
                type="button"
                onClick={handleSaasAdminLogin}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-primary text-on-primary font-label text-label-md hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-state-change shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">shield_person</span>
                <span>Sign In as SaaS Product Admin</span>
              </button>

              {/* Secondary Button: Company Admin */}
              <button
                type="button"
                onClick={handleCompanyAdminLogin}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-surface-container-low border border-outline-variant text-primary font-label text-label-md hover:bg-surface-container hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-state-change"
              >
                <span className="material-symbols-outlined text-[18px] text-tertiary">corporate_fare</span>
                <span>Sign In as Company Admin</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
