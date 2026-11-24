import React from 'react';

export default function SaasAdminHeader({ title = 'SaaS Platform Overview' }) {
  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant px-6 py-3 flex items-center justify-between gap-6 shrink-0">
      <h1 className="font-headline text-headline-md text-primary">{title}</h1>

      <div className="flex items-center gap-4">
        {/* Global Search Bar */}
        <div className="relative w-72">
          <span
            aria-hidden="true"
            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-title-md select-none"
          >
            search
          </span>
          <input
            type="search"
            placeholder="Search tenants, licenses, invoices..."
            className="w-full rounded border border-outline-variant bg-surface pl-9 pr-3 py-1.5 font-body text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </div>

        {/* Notification Bell */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative inline-flex items-center justify-center w-9 h-9 rounded bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors duration-state-change"
        >
          <span className="material-symbols-outlined text-title-md">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary"></span>
        </button>

        {/* Super Admin Profile Avatar */}
        <div className="flex items-center gap-3 pl-2 border-l border-outline-variant">
          <img
            src="https://lh3.googleusercontent.com/aida/ALJJyrBiIl0zygOwaFcj-k8GGJgoxmsWwwGrQegsFE1GlFZNdnMb79H_aMM-L761dfnmFhnn_HLQWHkbdgvV87_Z8Hzt648kZSmM7Dpvfb69FdI4PaOKFQ4QJA6qAJlMmPbc046WLuhB5qqd7drylrFqd_0WsPRJhuLcOE2DcTYuzFyDFxKhnYMjs7UuAYr_9yUkUd04qpFIxoGrO5oiaJiba7Ifip7tcRpu5FWZM_yt5k99ujbrvQMgvfIFpJg7"
            alt="Vikramaditya Rao"
            className="w-8 h-8 rounded-full object-cover border border-outline-variant"
          />
          <div className="hidden xl:block">
            <p className="font-label text-label-md text-primary leading-tight">Vikramaditya Rao</p>
            <p className="font-body text-body-sm text-on-surface-variant leading-tight">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
