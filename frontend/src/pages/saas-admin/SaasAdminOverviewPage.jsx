import React, { useState } from 'react';
import SaasAdminSidebar from '../../components/saas-admin/SaasAdminSidebar';
import SaasAdminHeader from '../../components/saas-admin/SaasAdminHeader';

const recentTenants = [
  { company: 'Apex Valuations', plan: 'Enterprise', status: 'Active', isPending: false },
  { company: 'Southern Advisors', plan: 'Pro', status: 'Pending', isPending: true },
  { company: 'Kaveri Finance', plan: 'Enterprise', status: 'Active', isPending: false },
  { company: 'Deccan Realty', plan: 'Pro', status: 'Active', isPending: false },
  { company: 'Metro Surveyors', plan: 'Pro', status: 'Pending', isPending: true },
];

export default function SaasAdminOverviewPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-surface text-on-surface font-body antialiased overflow-hidden">
      {/* Left Sidebar */}
      <SaasAdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Column */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <SaasAdminHeader
          title="SaaS Platform Overview"
          onMenuToggle={() => setSidebarOpen((prev) => !prev)}
        />

        {/* Main Workspace - scrollable on mobile, fitted on desktop */}
        <main className="p-3 sm:p-3.5 lg:p-4 flex-1 flex flex-col gap-3 overflow-y-auto lg:overflow-hidden lg:justify-between">
          {/* Top KPI Row (4 White Cards) */}
          <section aria-label="Platform Key Metrics" className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 items-stretch shrink-0">
            {/* Active Organizations */}
            <article className="bg-surface-container-lowest border border-outline-variant rounded-md p-2.5 sm:p-3 shadow-sm flex flex-col justify-between gap-1">
              <header className="flex items-center justify-between gap-1 sm:gap-2">
                <h2 className="font-label text-[10px] sm:text-[11px] text-on-surface-variant whitespace-nowrap">Active Organizations</h2>
                <span className="inline-flex items-center px-1 sm:px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-[9px] sm:text-[10px] tabular-nums shrink-0">
                  +12%
                </span>
              </header>
              <p className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-bold text-primary tabular-nums">142</p>
            </article>

            {/* Total Valuations Generated */}
            <article className="bg-surface-container-lowest border border-outline-variant rounded-md p-2.5 sm:p-3 shadow-sm flex flex-col justify-between gap-1">
              <header className="flex items-center justify-between gap-1 sm:gap-2">
                <h2 className="font-label text-[10px] sm:text-[11px] text-on-surface-variant whitespace-nowrap">Total Valuations</h2>
                <span className="material-symbols-outlined text-secondary text-[14px] sm:text-[16px] shrink-0">verified</span>
              </header>
              <p className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-bold text-primary tabular-nums">18,490</p>
            </article>

            {/* Monthly Recurring Revenue */}
            <article className="bg-surface-container-lowest border border-outline-variant rounded-md p-2.5 sm:p-3 shadow-sm flex flex-col justify-between gap-1">
              <header className="flex items-center justify-between gap-1 sm:gap-2">
                <h2 className="font-label text-[10px] sm:text-[11px] text-on-surface-variant whitespace-nowrap">Monthly Revenue</h2>
                <span className="material-symbols-outlined text-primary text-[14px] sm:text-[16px] shrink-0">payments</span>
              </header>
              <p className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-bold text-primary tabular-nums">₹14.8L</p>
            </article>

            {/* Active Valuer Seats */}
            <article className="bg-surface-container-lowest border border-outline-variant rounded-md p-2.5 sm:p-3 shadow-sm flex flex-col justify-between gap-1">
              <header className="flex items-center justify-between gap-1 sm:gap-2">
                <h2 className="font-label text-[10px] sm:text-[11px] text-on-surface-variant whitespace-nowrap">Active Valuer Seats</h2>
                <span className="material-symbols-outlined text-primary text-[14px] sm:text-[16px] shrink-0">group</span>
              </header>
              <p className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-bold text-primary tabular-nums">615</p>
            </article>
          </section>

          {/* Main Content Area: Chart + Onboarding Table */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch lg:flex-1 lg:min-h-0 lg:overflow-hidden">
            {/* Left (7 cols ~60%): Monthly Valuation Volume & Tenant Growth Card */}
            <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-md p-3 sm:p-3.5 shadow-sm flex flex-col justify-between gap-2 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 shrink-0">
                <div>
                  <h2 className="font-headline text-[12px] sm:text-[13px] font-semibold text-primary">Monthly Valuation Volume &amp; Tenant Growth</h2>
                  <p className="font-body text-[10px] sm:text-[11px] text-on-surface-variant">Last 8 months across all active multi-tenant organizations</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-sm bg-primary inline-block"></span>
                    <span className="font-label text-[10px] sm:text-[11px] text-on-surface-variant">Valuation Volume</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span>
                    <span className="font-label text-[10px] sm:text-[11px] text-on-surface-variant">Tenant Growth</span>
                  </div>
                </div>
              </div>

              {/* Crisp SVG Combo Bar & Line Chart */}
              <div className="w-full flex-1 flex items-center justify-center min-h-[150px] sm:min-h-[160px] lg:min-h-0 py-1">
                <svg
                  viewBox="0 0 720 280"
                  className="w-full h-auto max-h-[150px] sm:max-h-[175px] 2xl:max-h-[210px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Monthly Valuation Volume and Tenant Growth Chart"
                >
                  <line x1="48" y1="30" x2="700" y2="30" stroke="#E2E8F0" strokeDasharray="4 4" />
                  <line x1="48" y1="85" x2="700" y2="85" stroke="#E2E8F0" strokeDasharray="4 4" />
                  <line x1="48" y1="140" x2="700" y2="140" stroke="#E2E8F0" strokeDasharray="4 4" />
                  <line x1="48" y1="195" x2="700" y2="195" stroke="#E2E8F0" strokeDasharray="4 4" />
                  <line x1="48" y1="245" x2="700" y2="245" stroke="#CBD5E1" />

                  <text x="38" y="34" textAnchor="end" fill="#64748B" fontFamily="Reddit Sans, sans-serif" fontSize="11">3.5k</text>
                  <text x="38" y="89" textAnchor="end" fill="#64748B" fontFamily="Reddit Sans, sans-serif" fontSize="11">2.6k</text>
                  <text x="38" y="144" textAnchor="end" fill="#64748B" fontFamily="Reddit Sans, sans-serif" fontSize="11">1.8k</text>
                  <text x="38" y="199" textAnchor="end" fill="#64748B" fontFamily="Reddit Sans, sans-serif" fontSize="11">900</text>
                  <text x="38" y="248" textAnchor="end" fill="#64748B" fontFamily="Reddit Sans, sans-serif" fontSize="11">0</text>

                  <rect x="74" y="165" width="36" height="80" rx="4" fill="#0F294A" fillOpacity="0.88" />
                  <rect x="154" y="145" width="36" height="100" rx="4" fill="#0F294A" fillOpacity="0.88" />
                  <rect x="234" y="132" width="36" height="113" rx="4" fill="#0F294A" fillOpacity="0.88" />
                  <rect x="314" y="114" width="36" height="131" rx="4" fill="#0F294A" fillOpacity="0.88" />
                  <rect x="394" y="96" width="36" height="149" rx="4" fill="#0F294A" fillOpacity="0.88" />
                  <rect x="474" y="80" width="36" height="165" rx="4" fill="#0F294A" fillOpacity="0.88" />
                  <rect x="554" y="62" width="36" height="183" rx="4" fill="#0F294A" fillOpacity="0.88" />
                  <rect x="634" y="42" width="36" height="203" rx="4" fill="#0F294A" />

                  <path
                    d="M92 182 L172 164 L252 150 L332 132 L412 112 L492 94 L572 74 L652 52"
                    stroke="#2E8B57"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="92" cy="182" r="4.5" fill="#FFFFFF" stroke="#2E8B57" strokeWidth="2.5" />
                  <circle cx="172" cy="164" r="4.5" fill="#FFFFFF" stroke="#2E8B57" strokeWidth="2.5" />
                  <circle cx="252" cy="150" r="4.5" fill="#FFFFFF" stroke="#2E8B57" strokeWidth="2.5" />
                  <circle cx="332" cy="132" r="4.5" fill="#FFFFFF" stroke="#2E8B57" strokeWidth="2.5" />
                  <circle cx="412" cy="112" r="4.5" fill="#FFFFFF" stroke="#2E8B57" strokeWidth="2.5" />
                  <circle cx="492" cy="94" r="4.5" fill="#FFFFFF" stroke="#2E8B57" strokeWidth="2.5" />
                  <circle cx="572" cy="74" r="4.5" fill="#FFFFFF" stroke="#2E8B57" strokeWidth="2.5" />
                  <circle cx="652" cy="52" r="5" fill="#2E8B57" stroke="#FFFFFF" strokeWidth="2" />

                  <text x="92" y="268" textAnchor="middle" fill="#475569" fontFamily="Reddit Sans, sans-serif" fontSize="12">Apr</text>
                  <text x="172" y="268" textAnchor="middle" fill="#475569" fontFamily="Reddit Sans, sans-serif" fontSize="12">May</text>
                  <text x="252" y="268" textAnchor="middle" fill="#475569" fontFamily="Reddit Sans, sans-serif" fontSize="12">Jun</text>
                  <text x="332" y="268" textAnchor="middle" fill="#475569" fontFamily="Reddit Sans, sans-serif" fontSize="12">Jul</text>
                  <text x="412" y="268" textAnchor="middle" fill="#475569" fontFamily="Reddit Sans, sans-serif" fontSize="12">Aug</text>
                  <text x="492" y="268" textAnchor="middle" fill="#475569" fontFamily="Reddit Sans, sans-serif" fontSize="12">Sep</text>
                  <text x="572" y="268" textAnchor="middle" fill="#475569" fontFamily="Reddit Sans, sans-serif" fontSize="12">Oct</text>
                  <text x="652" y="268" textAnchor="middle" fill="#0F294A" fontWeight="600" fontFamily="Reddit Sans, sans-serif" fontSize="12">Nov</text>
                </svg>
              </div>
            </div>

            {/* Right (5 cols ~40%): Recent Tenant Onboarding Card */}
            <div className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-md p-3 sm:p-3.5 shadow-sm flex flex-col justify-between gap-2 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 shrink-0">
                <h2 className="font-headline text-[12px] sm:text-[13px] font-semibold text-primary whitespace-nowrap">Recent Tenant Onboarding</h2>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-1 px-2 sm:px-2.5 py-1 rounded bg-tertiary text-on-tertiary font-label text-[10px] sm:text-[11px] hover:opacity-95 transition-colors duration-state-change whitespace-nowrap shrink-0"
                >
                  <span className="material-symbols-outlined text-[13px] sm:text-[14px]" aria-hidden="true">add</span>
                  <span className="hidden xs:inline sm:inline">Add Organization</span>
                  <span className="xs:hidden sm:hidden">Add</span>
                </button>
              </div>

              {/* Table with compact row heights - horizontally scrollable on tiny screens */}
              <div className="border border-outline-variant rounded-md overflow-hidden flex-1 flex flex-col justify-between">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[280px]">
                    <thead className="bg-surface-container-low border-b border-outline-variant">
                      <tr>
                        <th scope="col" className="px-2 sm:px-3 py-1.5 font-label text-[10px] sm:text-[11px] text-on-surface-variant whitespace-nowrap">
                          Company Name
                        </th>
                        <th scope="col" className="px-2 sm:px-2.5 py-1.5 font-label text-[10px] sm:text-[11px] text-on-surface-variant whitespace-nowrap">
                          Plan Tier
                        </th>
                        <th scope="col" className="px-2 sm:px-3 py-1.5 font-label text-[10px] sm:text-[11px] text-on-surface-variant text-right whitespace-nowrap">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                      {recentTenants.map((tenant, idx) => (
                        <tr key={idx} className="hover:bg-surface-container-low/50">
                          <td className="px-2 sm:px-3 py-1.5 font-title text-[11px] sm:text-[12px] font-medium text-primary whitespace-nowrap">
                            {tenant.company}
                          </td>
                          <td className="px-2 sm:px-2.5 py-1.5 font-body text-[10px] sm:text-[11px] text-on-surface-variant whitespace-nowrap">
                            {tenant.plan}
                          </td>
                          <td className="px-2 sm:px-3 py-1.5 text-right whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-1.5 py-0.5 rounded-full font-label text-[9px] sm:text-[10px] ${
                                tenant.isPending
                                  ? 'bg-warning-container text-on-warning-container'
                                  : 'bg-secondary-container text-on-secondary-container'
                              }`}
                            >
                              {tenant.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
