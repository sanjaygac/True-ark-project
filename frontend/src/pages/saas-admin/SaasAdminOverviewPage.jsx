import React from 'react';
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
  return (
    <div className="min-h-screen flex bg-surface text-on-surface font-body antialiased">
      {/* Left Sidebar */}
      <SaasAdminSidebar />

      {/* Main Content Column */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Header */}
        <SaasAdminHeader title="SaaS Platform Overview" />

        {/* Main Workspace */}
        <main className="p-6 lg:p-8 flex flex-col gap-6">
          {/* Top KPI Row (4 White Cards) */}
          <section aria-label="Platform Key Metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {/* Active Organizations */}
            <article className="h-full bg-surface-container-lowest border border-outline-variant rounded-md p-5 shadow-sm flex flex-col justify-between gap-3">
              <header className="flex items-center justify-between gap-2">
                <h2 className="font-label text-label-sm text-on-surface-variant whitespace-nowrap">Active Organizations</h2>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-label-sm tabular-nums shrink-0">
                  +12%
                </span>
              </header>
              <p className="font-headline text-headline-lg text-primary tabular-nums">142</p>
            </article>

            {/* Total Valuations Generated */}
            <article className="h-full bg-surface-container-lowest border border-outline-variant rounded-md p-5 shadow-sm flex flex-col justify-between gap-3">
              <header className="flex items-center justify-between gap-2">
                <h2 className="font-label text-label-sm text-on-surface-variant whitespace-nowrap">Total Valuations Generated</h2>
                <span className="material-symbols-outlined text-secondary text-title-md shrink-0">verified</span>
              </header>
              <p className="font-headline text-headline-lg text-primary tabular-nums">18,490</p>
            </article>

            {/* Monthly Recurring Revenue */}
            <article className="h-full bg-surface-container-lowest border border-outline-variant rounded-md p-5 shadow-sm flex flex-col justify-between gap-3">
              <header className="flex items-center justify-between gap-2">
                <h2 className="font-label text-label-sm text-on-surface-variant whitespace-nowrap">Monthly Recurring Revenue</h2>
                <span className="material-symbols-outlined text-primary text-title-md shrink-0">payments</span>
              </header>
              <p className="font-headline text-headline-lg text-primary tabular-nums">₹14.8L</p>
            </article>

            {/* Active Valuer Seats */}
            <article className="h-full bg-surface-container-lowest border border-outline-variant rounded-md p-5 shadow-sm flex flex-col justify-between gap-3">
              <header className="flex items-center justify-between gap-2">
                <h2 className="font-label text-label-sm text-on-surface-variant whitespace-nowrap">Active Valuer Seats</h2>
                <span className="material-symbols-outlined text-primary text-title-md shrink-0">group</span>
              </header>
              <p className="font-headline text-headline-lg text-primary tabular-nums">615</p>
            </article>
          </section>

          {/* Main Content Area: Left Chart / Right Onboarding Table */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left (7 cols ~60%): Monthly Valuation Volume & Tenant Growth */}
            <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-md p-6 shadow-sm flex flex-col justify-between gap-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-headline text-headline-sm text-primary">Monthly Valuation Volume &amp; Tenant Growth</h2>
                  <p className="font-body text-body-sm text-on-surface-variant">Last 8 months across all active multi-tenant organizations</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-primary inline-block"></span>
                    <span className="font-label text-label-sm text-on-surface-variant">Valuation Volume</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-secondary inline-block"></span>
                    <span className="font-label text-label-sm text-on-surface-variant">Tenant Growth</span>
                  </div>
                </div>
              </div>

              {/* Crisp SVG Combo Bar & Line Chart */}
              <div className="w-full">
                <svg
                  viewBox="0 0 720 280"
                  className="w-full h-auto"
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

            {/* Right (5 cols ~40%): Recent Tenant Onboarding */}
            <div className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-md p-6 shadow-sm flex flex-col justify-between gap-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-headline text-headline-sm text-primary whitespace-nowrap">Recent Tenant Onboarding</h2>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-tertiary text-on-tertiary font-label text-label-sm hover:opacity-95 transition-colors duration-state-change whitespace-nowrap shrink-0"
                >
                  <span className="material-symbols-outlined text-title-sm" aria-hidden="true">add</span>
                  <span>Add Organization</span>
                </button>
              </div>

              {/* Table */}
              <div className="border border-outline-variant rounded-md overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container-low border-b border-outline-variant">
                    <tr>
                      <th scope="col" className="px-3.5 py-3 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                        Company Name
                      </th>
                      <th scope="col" className="px-3 py-3 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                        Plan Tier
                      </th>
                      <th scope="col" className="px-3.5 py-3 font-label text-label-sm text-on-surface-variant text-right whitespace-nowrap">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {recentTenants.map((tenant, idx) => (
                      <tr key={idx} className="hover:bg-surface-container-low/50">
                        <td className="px-3.5 py-3.5 font-title text-title-sm text-primary whitespace-nowrap">
                          {tenant.company}
                        </td>
                        <td className="px-3 py-3.5 font-body text-body-sm text-on-surface-variant whitespace-nowrap">
                          {tenant.plan}
                        </td>
                        <td className="px-3.5 py-3.5 text-right whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-label text-label-sm ${
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
          </section>
        </main>
      </div>
    </div>
  );
}
