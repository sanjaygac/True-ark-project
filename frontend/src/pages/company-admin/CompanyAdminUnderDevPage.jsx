import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CompanyAdminSidebar from '../../components/company-admin/CompanyAdminSidebar';

export default function CompanyAdminUnderDevPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-surface text-on-surface font-body antialiased overflow-hidden relative">
      {/* Left Sidebar */}
      <CompanyAdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Column */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        {/* Header */}
        <header className="bg-surface-container-lowest border-b border-outline-variant px-3 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="lg:hidden inline-flex items-center justify-center w-8 h-8 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors duration-state-change shrink-0"
              aria-label="Open sidebar menu"
            >
              <span className="material-symbols-outlined text-[20px]">menu</span>
            </button>
            <h1 className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-primary">
              Company Admin Module
            </h1>
          </div>

          <Link
            to="/company-admin"
            className="inline-flex items-center gap-1.5 font-label text-label-sm text-tertiary hover:underline"
          >
            <span className="material-symbols-outlined text-title-sm" aria-hidden="true">
              arrow_back
            </span>
            <span>Back to Valuation Dashboard</span>
          </Link>
        </header>

        {/* Main Under Development Container */}
        <main className="flex-1 flex items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-xl bg-surface-container-lowest border border-outline-variant rounded-lg p-8 lg:p-10 shadow-lg shadow-shadow/5 flex flex-col items-center text-center gap-5">
            <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[36px]" aria-hidden="true">
                engineering
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-warning-container text-on-warning-container font-label text-label-sm">
                Page Under Development
              </span>
              <h2 className="font-headline text-[16px] lg:text-[18px] font-bold text-primary mt-1">
                Module Coming Soon
              </h2>
              <p className="font-body text-body-md text-on-surface-variant max-w-md">
                This Valuation Portal section is currently being finalized for Apex Valuation Assoc. You can return to your Valuation Dashboard to view active inspections and certified reports.
              </p>
            </div>

            <div className="w-full border-t border-outline-variant my-1"></div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
              <Link
                to="/company-admin"
                className="w-full sm:w-auto px-5 py-2.5 rounded bg-primary text-on-primary font-label text-label-md hover:opacity-95 transition-colors duration-state-change text-center"
              >
                Back to Valuation Dashboard
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-5 py-2.5 rounded bg-surface-container-lowest border border-outline-variant text-primary font-label text-label-md hover:bg-surface-container-low transition-colors duration-state-change text-center"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
