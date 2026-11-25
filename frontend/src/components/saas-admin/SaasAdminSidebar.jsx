import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const navItems = [
  { label: 'Overview', icon: 'dashboard', to: '/saas-admin' },
  { label: 'Company Master', icon: 'corporate_fare', to: '/saas-admin/company-master' },
  { label: 'Plan Master', icon: 'workspace_premium', to: '/saas-admin/plan-master' },
  { label: 'Guideline Rate Master', icon: 'map', to: '/saas-admin/rates' },
  { label: 'Valuer Licenses', icon: 'badge', to: '/saas-admin/licenses' },
  { label: 'Billing & Invoices', icon: 'receipt_long', to: '/saas-admin/billing' },
  { label: 'Audit Logs', icon: 'history', to: '/saas-admin/audit' },
];

export default function SaasAdminSidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="SaaS Admin Sidebar"
        className={`
          fixed inset-y-0 left-0 z-40 w-60 shrink-0 bg-surface-container-lowest border-r border-outline-variant
          flex flex-col justify-between p-5 overflow-y-auto
          transform transition-transform duration-surface-enter ease-surface-enter
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:static lg:translate-x-0 lg:z-20
        `}
      >
        <div className="flex flex-col gap-6">
          {/* Brand Logo */}
          <div className="px-2 pt-1">
            <div className="flex items-center justify-between">
              <Link
                to="/saas-admin"
                onClick={onClose}
                className="inline-flex items-center focus:outline-none focus:ring-2 focus:ring-primary/20 rounded cursor-pointer"
                aria-label="TrueArk Admin Overview"
              >
                <img
                  src="/company-logo.png"
                  alt="TrueArk"
                  className="h-9 w-auto object-contain hover:opacity-90 transition-opacity"
                />
              </Link>
              {/* Mobile close button */}
              <button
                type="button"
                onClick={onClose}
                className="lg:hidden inline-flex items-center justify-center w-7 h-7 rounded text-on-surface-variant hover:bg-surface-container-low"
                aria-label="Close sidebar"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav aria-label="SaaS Admin Navigation" className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/saas-admin'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded font-label text-label-md transition-colors duration-state-change ${
                    isActive
                      ? 'bg-secondary-container text-primary font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`material-symbols-outlined text-title-md ${
                        isActive ? 'text-tertiary' : ''
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-outline-variant px-2">
          <p className="font-body text-body-sm text-outline">Platform v4.2 • Cloud</p>
        </div>
      </aside>
    </>
  );
}
