import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', to: '/company-admin' },
  { label: 'New Valuation', icon: 'add_location_alt', to: '/company-admin/new-valuation' },
  { label: 'My Properties & Parcels', icon: 'layers', to: '/company-admin/parcels' },
  { label: 'Market Rate Map', icon: 'explore', to: '/company-admin/market-map' },
  { label: 'Generated Reports', icon: 'description', to: '/company-admin/reports' },
  { label: 'Team & Settings', icon: 'settings', to: '/company-admin/settings' },
];

export default function CompanyAdminSidebar({ isOpen, onClose }) {
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
        aria-label="Company Admin Sidebar"
        className={`
          fixed inset-y-0 left-0 z-40 w-60 shrink-0 bg-surface-container-lowest border-r border-outline-variant
          flex flex-col justify-between p-5 overflow-y-auto
          transform transition-transform duration-surface-enter ease-surface-enter
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:static lg:translate-x-0 lg:z-20
        `}
      >
        <div className="flex flex-col gap-6">
          {/* Brand + Organization Name Badge */}
          <div className="flex flex-col gap-3 px-2 pt-1">
            <div className="flex items-center justify-between">
              <Link
                to="/company-admin"
                onClick={onClose}
                className="inline-flex items-center focus:outline-none focus:ring-2 focus:ring-primary/20 rounded cursor-pointer"
                aria-label="TrueArk Valuation Dashboard"
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
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-low border border-outline-variant w-fit">
              <span className="material-symbols-outlined text-secondary text-body-sm" aria-hidden="true">
                domain
              </span>
              <span className="font-label text-label-sm text-primary">Apex Valuation Assoc.</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav aria-label="User Portal Navigation" className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/company-admin'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded font-label text-label-md transition-colors duration-state-change ${
                    isActive
                      ? 'bg-primary text-on-primary'
                      : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                  }`
                }
              >
                <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer: Valuer Profile */}
        <div className="pt-4 border-t border-outline-variant px-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-primary-container text-primary font-label text-label-sm flex items-center justify-center shrink-0">
              AM
            </div>
            <div className="min-w-0">
              <p className="font-label text-label-sm text-primary truncate">Arjun Mehta</p>
              <p className="font-body text-body-sm text-outline truncate">Lead Certified Valuer</p>
            </div>
          </div>
          <Link
            to="/login"
            title="Sign Out"
            aria-label="Sign Out"
            className="inline-flex items-center justify-center w-7 h-7 rounded text-outline hover:bg-surface-container-low hover:text-primary transition-colors duration-state-change shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
