import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Overview', icon: 'dashboard', to: '/saas-admin' },
  { label: 'Company Master', icon: 'corporate_fare', to: '/saas-admin/company-master' },
  { label: 'Plan Master', icon: 'workspace_premium', to: '/saas-admin/plan-master' },
  { label: 'Guideline Rate Master', icon: 'map', to: '/saas-admin/rates' },
  { label: 'Valuer Licenses', icon: 'badge', to: '/saas-admin/licenses' },
  { label: 'Billing & Invoices', icon: 'receipt_long', to: '/saas-admin/billing' },
  { label: 'Audit Logs', icon: 'history', to: '/saas-admin/audit' },
];

export default function SaasAdminSidebar() {
  return (
    <aside
      aria-label="SaaS Admin Sidebar"
      className="w-60 shrink-0 bg-surface-container-lowest border-r border-outline-variant min-h-screen flex flex-col justify-between p-5"
    >
      <div className="flex flex-col gap-6">
        {/* Brand + SAAS ADMIN Pill */}
        <div className="flex flex-col gap-3 px-2 pt-1">
          <div className="flex items-center">
            <img
              src="https://lh3.googleusercontent.com/aida/ALJJyrDfaZxRPtpONLYzIZpPJxvUID-nJoYMbf6H0UkQSJFT3skYxSjmQ9fVQh5g1XqNDEWcljqXK_hBerFqmB_TOvZdbt9d0kKQrAEBSh-qdN0T9FrgyfufURh5up5H75iPdNiS0gbvDgO-mzcIcMdJoFowK5x6SzoDYEtC0ty_R29UmR1A00QjiOdS0yFfDGV9f2-xfOmF83ZyX4PB2E_SNp3IKCVsWYV_eccQGSs-hxDROXpHw40HQUUDgA"
              alt="TrueArk"
              className="w-36 h-10 object-cover object-[50%_43.5%] mix-blend-multiply"
            />
          </div>
          <div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label text-label-sm tracking-wider">
              SAAS ADMIN
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav aria-label="SaaS Admin Navigation" className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/saas-admin'}
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
  );
}
