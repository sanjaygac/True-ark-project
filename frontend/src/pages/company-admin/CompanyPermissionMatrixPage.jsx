import React, { useState, useEffect } from 'react';
import CompanyAdminSidebar from '../../components/company-admin/CompanyAdminSidebar';

const ACTION_COLUMNS = [
  'View',
  'Create',
  'Edit',
  'Delete',
  'Approve',
  'Reject',
  'Assign',
  'Status',
  'Export',
  'Print',
  'Settings',
];

const ROLES = [
  { name: 'Org Admin', hasLock: true },
  { name: 'Lead Valuer', hasLock: false },
  { name: 'Branch Manager', hasLock: false },
  { name: 'Senior Valuer', hasLock: false },
  { name: 'Field Valuer', hasLock: false },
  { name: 'Reviewer', hasLock: false },
  { name: 'Viewer', hasLock: false },
];

const FOUNDATION_MODULES = [
  { name: 'Activity Logs', keyPrefix: 'Activity Logs', actions: ['View', 'Export'] },
  { name: 'Company Settings', keyPrefix: 'Company Settings', actions: ['View', 'Edit', 'Settings'] },
  { name: 'Dashboard', keyPrefix: 'Dashboard', actions: ['View'] },
  { name: 'Notifications', keyPrefix: 'Notifications', actions: ['View', 'Create', 'Settings'] },
  { name: 'Permissions', keyPrefix: 'Permissions', actions: ['View', 'Settings'] },
  { name: 'Roles', keyPrefix: 'Roles', actions: ['View', 'Create', 'Edit', 'Delete', 'Assign'] },
  { name: 'Users & Valuers', keyPrefix: 'Users', actions: ['View', 'Create', 'Edit', 'Delete', 'Status', 'Export'] },
];

const VALUATION_MODULES = [
  {
    name: 'Valuations',
    keyPrefix: 'Valuations',
    actions: ['View', 'Create', 'Edit', 'Delete', 'Approve', 'Reject', 'Assign', 'Status', 'Export', 'Print'],
  },
  {
    name: 'Site Inspections & GIS',
    keyPrefix: 'Site Inspections',
    actions: ['View', 'Create', 'Edit', 'Assign', 'Export'],
  },
  {
    name: 'Approvals & Sign-Off',
    keyPrefix: 'Approvals',
    actions: ['View', 'Approve', 'Reject', 'Status'],
  },
  {
    name: 'Generated Reports',
    keyPrefix: 'Generated Reports',
    actions: ['View', 'Create', 'Export', 'Print'],
  },
  {
    name: 'Market Rate Map',
    keyPrefix: 'Market Rate Map',
    actions: ['View', 'Create', 'Edit', 'Export'],
  },
  {
    name: 'Plans & Billing',
    keyPrefix: 'Plans & Billing',
    actions: ['View', 'Edit', 'Status', 'Settings'],
  },
];

const ALL_PERMISSION_KEYS = [...FOUNDATION_MODULES, ...VALUATION_MODULES].flatMap((mod) =>
  mod.actions.map((action) => `${mod.keyPrefix} ${action}`)
);

const ROLE_PRESETS = {
  'Org Admin': null, // all checked
  'Lead Valuer': [
    'Activity Logs View',
    'Company Settings View',
    'Dashboard View',
    'Notifications View',
    'Permissions View',
    'Roles View',
    'Users View',
    'Valuations View',
    'Valuations Create',
    'Valuations Edit',
    'Valuations Approve',
    'Valuations Reject',
    'Valuations Assign',
    'Valuations Status',
    'Valuations Export',
    'Valuations Print',
    'Site Inspections View',
    'Site Inspections Create',
    'Site Inspections Edit',
    'Site Inspections Assign',
    'Site Inspections Export',
    'Approvals View',
    'Approvals Approve',
    'Approvals Reject',
    'Approvals Status',
    'Generated Reports View',
    'Generated Reports Create',
    'Generated Reports Export',
    'Generated Reports Print',
    'Market Rate Map View',
    'Market Rate Map Create',
    'Market Rate Map Edit',
    'Market Rate Map Export',
    'Plans & Billing View',
  ],
  'Branch Manager': [
    'Activity Logs View',
    'Dashboard View',
    'Notifications View',
    'Users View',
    'Users Create',
    'Users Edit',
    'Users Status',
    'Valuations View',
    'Valuations Assign',
    'Valuations Status',
    'Valuations Export',
    'Site Inspections View',
    'Site Inspections Assign',
    'Approvals View',
    'Generated Reports View',
    'Generated Reports Export',
    'Market Rate Map View',
    'Plans & Billing View',
  ],
  'Senior Valuer': [
    'Dashboard View',
    'Notifications View',
    'Valuations View',
    'Valuations Create',
    'Valuations Edit',
    'Valuations Approve',
    'Valuations Export',
    'Valuations Print',
    'Site Inspections View',
    'Site Inspections Create',
    'Site Inspections Edit',
    'Approvals View',
    'Approvals Approve',
    'Generated Reports View',
    'Generated Reports Create',
    'Generated Reports Export',
    'Market Rate Map View',
    'Market Rate Map Edit',
  ],
  'Field Valuer': [
    'Dashboard View',
    'Notifications View',
    'Valuations View',
    'Valuations Create',
    'Valuations Edit',
    'Site Inspections View',
    'Site Inspections Create',
    'Site Inspections Edit',
    'Site Inspections Export',
    'Generated Reports View',
    'Market Rate Map View',
  ],
  Reviewer: [
    'Activity Logs View',
    'Dashboard View',
    'Valuations View',
    'Valuations Approve',
    'Valuations Reject',
    'Approvals View',
    'Approvals Approve',
    'Approvals Reject',
    'Approvals Status',
    'Generated Reports View',
    'Generated Reports Print',
    'Market Rate Map View',
  ],
  Viewer: [
    'Dashboard View',
    'Valuations View',
    'Site Inspections View',
    'Generated Reports View',
    'Market Rate Map View',
  ],
};

function buildInitialPermissions(role) {
  const preset = ROLE_PRESETS[role];
  const map = {};
  ALL_PERMISSION_KEYS.forEach((key) => {
    map[key] = preset === null ? true : preset.includes(key);
  });
  return map;
}

export default function CompanyPermissionMatrixPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeRole, setActiveRole] = useState('Org Admin');
  const [roleMatrix, setRoleMatrix] = useState(() => {
    const initial = {};
    ROLES.forEach((r) => {
      initial[r.name] = buildInitialPermissions(r.name);
    });
    return initial;
  });
  const [saveBannerRole, setSaveBannerRole] = useState(null);

  useEffect(() => {
    document.title = 'Permission Matrix — TrueArk';
  }, []);

  const currentPermissions = roleMatrix[activeRole] || {};

  const handleRoleChange = (roleName) => {
    setActiveRole(roleName);
    setSaveBannerRole(null);
  };

  const handleTogglePermission = (permKey) => {
    setRoleMatrix((prev) => ({
      ...prev,
      [activeRole]: {
        ...prev[activeRole],
        [permKey]: !prev[activeRole][permKey],
      },
    }));
  };

  const handleToggleRow = (mod) => {
    const keys = mod.actions.map((a) => `${mod.keyPrefix} ${a}`);
    const allChecked = keys.every((k) => Boolean(currentPermissions[k]));
    setRoleMatrix((prev) => {
      const updated = { ...prev[activeRole] };
      keys.forEach((k) => {
        updated[k] = !allChecked;
      });
      return {
        ...prev,
        [activeRole]: updated,
      };
    });
  };

  const handleSave = () => {
    setSaveBannerRole(activeRole);
  };

  const handleReset = () => {
    setRoleMatrix((prev) => ({
      ...prev,
      [activeRole]: buildInitialPermissions(activeRole),
    }));
    setSaveBannerRole(null);
  };

  const renderModuleRow = (mod) => (
    <tr
      key={mod.name}
      className="matrix-row hover:bg-surface-container-low/40 transition-colors duration-state-change"
    >
      <td className="px-3 xl:px-4 py-3 font-body text-body-sm xl:text-body-md text-on-surface whitespace-nowrap">
        {mod.name}
      </td>
      {ACTION_COLUMNS.map((action) => {
        const isSupported = mod.actions.includes(action);
        const permKey = `${mod.keyPrefix} ${action}`;
        if (!isSupported) {
          return (
            <td
              key={action}
              className="px-1 xl:px-1.5 py-3 text-center text-on-surface-variant font-body text-body-sm"
            >
              —
            </td>
          );
        }
        return (
          <td key={action} className="px-1 xl:px-1.5 py-3 text-center">
            <input
              type="checkbox"
              checked={Boolean(currentPermissions[permKey])}
              onChange={() => handleTogglePermission(permKey)}
              aria-label={permKey}
              className="perm-check w-4 h-4 rounded border-outline text-primary focus:ring-primary/20 cursor-pointer"
            />
          </td>
        );
      })}
      <td className="px-3 xl:px-4 py-3 text-right whitespace-nowrap">
        <button
          type="button"
          onClick={() => handleToggleRow(mod)}
          className="select-all-row font-label text-label-sm xl:text-label-md text-primary hover:underline"
        >
          Select All
        </button>
      </td>
    </tr>
  );

  return (
    <div className="h-screen flex bg-surface text-on-surface font-body antialiased overflow-hidden relative">
      {/* Left Sidebar (unchanged Company Admin Sidebar) */}
      <CompanyAdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Workspace */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto overflow-x-hidden">
        {/* Top Header Bar */}
        <header className="bg-surface-container-lowest border-b border-outline-variant px-3 sm:px-5 lg:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 sm:gap-4 shrink-0">
          <div className="flex items-start gap-2 sm:gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="lg:hidden inline-flex items-center justify-center w-8 h-8 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors duration-state-change shrink-0"
              aria-label="Open sidebar menu"
            >
              <span className="material-symbols-outlined text-[20px]">menu</span>
            </button>
            <span
              className="material-symbols-outlined text-primary text-[19px] sm:text-[21px] mt-0.5 shrink-0"
              aria-hidden="true"
            >
              verified_user
            </span>
            <div className="min-w-0">
              <h1 className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-primary">
                Permission Matrix &amp; Operational Controls
              </h1>
              <p className="font-body text-body-sm text-on-surface-variant">
                Granular action-level access control across platform foundation and valuation modules
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              id="save-btn"
              type="button"
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 rounded bg-primary text-on-primary font-label text-label-md hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-state-change whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-title-sm" aria-hidden="true">
                save
              </span>
              <span>Save Matrix Changes</span>
            </button>

            <button
              id="reset-btn"
              type="button"
              onClick={handleReset}
              aria-label="Reset Matrix Defaults"
              title="Reset Matrix Defaults"
              className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:bg-surface-container-low hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors duration-state-change"
            >
              <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                refresh
              </span>
            </button>
          </div>
        </header>

        <main className="p-3 sm:p-4 lg:p-5 flex-1 flex flex-col gap-4 min-w-0">
          {/* Save Feedback Banner */}
          {saveBannerRole && (
            <div
              id="save-banner"
              className="flex items-center justify-between gap-3 px-4 py-3 rounded bg-secondary-container border border-secondary/20 text-on-secondary-container"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-title-md text-secondary" aria-hidden="true">
                  check_circle
                </span>
                <span className="font-label text-label-md">
                  Matrix changes saved for {saveBannerRole}.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSaveBannerRole(null)}
                className="font-label text-label-sm text-on-secondary-container hover:underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Role Selector Strip */}
          <section
            aria-label="Role Selector"
            className="bg-surface-container-lowest border border-outline-variant rounded-md px-4 sm:px-5 py-3 shadow-sm flex flex-wrap items-center gap-2.5 sm:gap-3"
          >
            <span className="font-label text-label-sm text-outline uppercase tracking-wider">
              ROLE:
            </span>
            <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Select Role">
              {ROLES.map((role) => {
                const isSelected = activeRole === role.name;
                return (
                  <button
                    key={role.name}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleRoleChange(role.name)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded font-label text-label-md transition-colors duration-state-change whitespace-nowrap ${
                      isSelected
                        ? 'bg-primary-container text-primary'
                        : 'bg-surface-container-low text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    {role.hasLock && (
                      <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                        lock
                      </span>
                    )}
                    <span>{role.name}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Grouped Permission Matrix Table Card */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm overflow-hidden">
            {/* Group 1 Header: Platform Foundation */}
            <div className="px-4 sm:px-5 py-3 bg-surface-container-lowest border-b border-outline-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-title-md" aria-hidden="true">
                layers
              </span>
              <h2 className="font-label text-label-md text-primary uppercase tracking-wider">
                Platform Foundation
              </h2>
            </div>

            <div className="w-full overflow-x-auto lg:overflow-x-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low/70 border-b border-outline-variant">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 xl:px-4 py-3 font-label text-[10px] xl:text-label-sm text-on-surface-variant uppercase tracking-wider whitespace-nowrap"
                    >
                      Module
                    </th>
                    {ACTION_COLUMNS.map((col) => (
                      <th
                        key={col}
                        scope="col"
                        className="px-1 xl:px-1.5 py-3 font-label text-[10px] xl:text-label-sm text-on-surface-variant uppercase tracking-wider text-center whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="px-3 xl:px-4 py-3 font-label text-[10px] xl:text-label-sm text-on-surface-variant uppercase tracking-wider text-right whitespace-nowrap"
                    >
                      Bulk Select
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {FOUNDATION_MODULES.map(renderModuleRow)}

                  {/* Group 2 Subheader Row: Valuation Business Modules */}
                  <tr className="bg-surface-container-low/50 border-t border-outline-variant">
                    <td colSpan={13} className="px-4 sm:px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-title-md" aria-hidden="true">
                          layers
                        </span>
                        <span className="font-label text-label-md text-primary uppercase tracking-wider">
                          Valuation Business Modules
                        </span>
                      </div>
                    </td>
                  </tr>

                  {VALUATION_MODULES.map(renderModuleRow)}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
