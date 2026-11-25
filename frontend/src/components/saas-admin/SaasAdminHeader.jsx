import React from 'react';

export default function SaasAdminHeader({ title = 'SaaS Platform Overview', onMenuToggle }) {
  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant px-3 sm:px-5 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-6 shrink-0">
      {/* Top Row: Hamburger + Title, and Right: Notification + Profile */}
      <div className="flex items-center justify-between gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-2 min-w-0">
          {/* Mobile hamburger menu button */}
          <button
            type="button"
            onClick={onMenuToggle}
            className="lg:hidden inline-flex items-center justify-center w-8 h-8 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors duration-state-change shrink-0"
            aria-label="Open sidebar menu"
          >
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>

          <h1 className="font-headline text-[14px] sm:text-[16px] lg:text-[17px] font-semibold text-primary truncate">
            {title}
          </h1>
        </div>

        {/* Mobile: Notification + Profile in a single row */}
        <div className="flex sm:hidden items-center gap-2 shrink-0">
          <button
            type="button"
            aria-label="Notifications"
            className="relative inline-flex items-center justify-center w-8 h-8 rounded bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors duration-state-change"
          >
            <span className="material-symbols-outlined text-[17px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-secondary"></span>
          </button>
          <img
            src="https://lh3.googleusercontent.com/aida/ALJJyrBiIl0zygOwaFcj-k8GGJgoxmsWwwGrQegsFE1GlFZNdnMb79H_aMM-L761dfnmFhnn_HLQWHkbdgvV87_Z8Hzt648kZSmM7Dpvfb69FdI4PaOKFQ4QJA6qAJlMmPbc046WLuhB5qqd7drylrFqd_0WsPRJhuLcOE2DcTYuzFyDFxKhnYMjs7UuAYr_9yUkUd04qpFIxoGrO5oiaJiba7Ifip7tcRpu5FWZM_yt5k99ujbrvQMgvfIFpJg7"
            alt="Vikramaditya Rao"
            className="w-7 h-7 rounded-full object-cover border border-outline-variant"
          />
        </div>
      </div>

      {/* Global Search Bar - in a separate row on mobile, inline on sm+ */}
      <div className="flex items-center gap-3.5 w-full sm:w-auto">
        <div className="relative w-full sm:w-48 md:w-64">
          <span
            aria-hidden="true"
            className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[16px] select-none"
          >
            search
          </span>
          <input
            type="search"
            placeholder="Search tenants, licenses, invoices..."
            className="w-full rounded border border-outline-variant bg-surface pl-8 pr-3 py-1.5 sm:py-1 font-body text-[12px] text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </div>

        {/* Desktop notification and profile */}
        <div className="hidden sm:flex items-center gap-3.5 shrink-0">
          <button
            type="button"
            aria-label="Notifications"
            className="relative inline-flex items-center justify-center w-8 h-8 rounded bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors duration-state-change"
          >
            <span className="material-symbols-outlined text-[17px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-secondary"></span>
          </button>

          <div className="flex items-center gap-2.5 pl-2 border-l border-outline-variant">
            <img
              src="https://lh3.googleusercontent.com/aida/ALJJyrBiIl0zygOwaFcj-k8GGJgoxmsWwwGrQegsFE1GlFZNdnMb79H_aMM-L761dfnmFhnn_HLQWHkbdgvV87_Z8Hzt648kZSmM7Dpvfb69FdI4PaOKFQ4QJA6qAJlMmPbc046WLuhB5qqd7drylrFqd_0WsPRJhuLcOE2DcTYuzFyDFxKhnYMjs7UuAYr_9yUkUd04qpFIxoGrO5oiaJiba7Ifip7tcRpu5FWZM_yt5k99ujbrvQMgvfIFpJg7"
              alt="Vikramaditya Rao"
              className="w-7 h-7 rounded-full object-cover border border-outline-variant"
            />
            <div className="hidden xl:block">
              <p className="font-label text-[12px] font-semibold text-primary leading-tight">Vikramaditya Rao</p>
              <p className="font-body text-[11px] text-on-surface-variant leading-tight">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
