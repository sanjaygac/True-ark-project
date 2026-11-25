import React from 'react';
import { Link } from 'react-router-dom';

export default function CompanyAdminUnderDevPage() {
  return (
    <div className="min-h-screen bg-surface-container-low/50 flex flex-col justify-between font-body text-on-surface antialiased p-6 lg:p-8">
      {/* Top Bar with Brand */}
      <header className="flex items-center justify-between max-w-5xl mx-auto w-full pb-6 border-b border-outline-variant">
        <div className="flex items-center gap-3">
          <Link
            to="/saas-admin"
            className="inline-flex items-center focus:outline-none focus:ring-2 focus:ring-primary/20 rounded cursor-pointer"
            aria-label="TrueArk Admin Overview"
          >
            <img
              src="/company-logo.png"
              alt="TrueArk"
              className="h-9 w-auto object-contain hover:opacity-90 transition-opacity"
            />
          </Link>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-label-sm tracking-wider">
            COMPANY ADMIN
          </span>
        </div>

        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 font-label text-label-sm text-tertiary hover:underline"
        >
          <span className="material-symbols-outlined text-title-sm" aria-hidden="true">
            arrow_back
          </span>
          <span>Back to Sign In</span>
        </Link>
      </header>

      {/* Main Under Development Container */}
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-xl bg-surface-container-lowest border border-outline-variant rounded-lg p-8 lg:p-10 shadow-lg shadow-shadow/5 flex flex-col items-center text-center gap-5">
          {/* Construction / Portal Icon */}
          <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[36px]" aria-hidden="true">
              corporate_fare
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-warning-container text-on-warning-container font-label text-label-sm">
              Page Under Development
            </span>
            <h1 className="font-headline text-[20px] lg:text-[22px] font-bold text-primary mt-1">
              Company Admin Portal
            </h1>
            <p className="font-body text-body-md text-on-surface-variant max-w-md">
              The internal tenant management dashboard for multi-branch valuation firms, approval workflows, and valuer assignments is currently being configured.
            </p>
          </div>

          <div className="w-full border-t border-outline-variant my-1"></div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
            <Link
              to="/login"
              className="w-full sm:w-auto px-5 py-2.5 rounded bg-surface-container-lowest border border-outline-variant text-primary font-label text-label-md hover:bg-surface-container-low transition-colors duration-state-change text-center"
            >
              Back to Login
            </Link>
            <Link
              to="/saas-admin"
              className="w-full sm:w-auto px-5 py-2.5 rounded bg-primary text-on-primary font-label text-label-md hover:opacity-95 transition-colors duration-state-change text-center"
            >
              Open SaaS Product Admin
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 border-t border-outline-variant max-w-5xl mx-auto w-full">
        <p className="font-body text-body-sm text-outline">
          TrueArk Platform • Multi-Tenant Enterprise Valuation Engine
        </p>
      </footer>
    </div>
  );
}
