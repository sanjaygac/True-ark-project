import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SaasAdminSidebar from '../../components/saas-admin/SaasAdminSidebar';
import SaasAdminHeader from '../../components/saas-admin/SaasAdminHeader';

const recentTenants = [
  { company: 'Apex Valuations', plan: 'Enterprise', quota: 'Unlimited', date: '24 Nov 2026', status: 'Active', isPending: false },
  { company: 'Southern Advisors', plan: 'Pro', quota: '300 / mo', date: '22 Nov 2026', status: 'Pending', isPending: true },
  { company: 'Kaveri Finance', plan: 'Enterprise', quota: 'Unlimited', date: '19 Nov 2026', status: 'Active', isPending: false },
  { company: 'Deccan Realty', plan: 'Pro', quota: '300 / mo', date: '14 Nov 2026', status: 'Active', isPending: false },
  { company: 'Metro Surveyors', plan: 'Pro', quota: '300 / mo', date: '10 Nov 2026', status: 'Pending', isPending: true },
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

        {/* Main Workspace - fitted cleanly on desktop, scrollable on mobile */}
        <main className="p-3 sm:p-3.5 lg:p-4 flex-1 flex flex-col gap-2.5 sm:gap-3 overflow-y-auto lg:overflow-hidden lg:justify-between">
          {/* Top KPI Row (4 Compact Cards) */}
          <section aria-label="Platform Key Metrics" className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 items-stretch shrink-0">
            {/* Active Organizations */}
            <article className="bg-surface-container-lowest border border-outline-variant rounded-md p-2.5 sm:p-3 shadow-sm flex flex-col justify-between gap-1">
              <header className="flex items-center justify-between gap-1 sm:gap-2">
                <h2 className="font-label text-[10px] sm:text-[11px] text-on-surface-variant whitespace-nowrap">Active Organizations</h2>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-[9px] sm:text-[10px] tabular-nums shrink-0">
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

          {/* Analytical Charts Row: Valuation Volume & Sales Growth side by side */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 sm:gap-3 items-stretch shrink-0">
            {/* Chart 1: Monthly Valuation Volume & Tenant Growth */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-md p-2.5 sm:p-3 shadow-sm flex flex-col gap-1.5 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 shrink-0">
                <div>
                  <h2 className="font-headline text-[12px] sm:text-[13px] font-semibold text-primary">Monthly Valuation Volume &amp; Tenant Growth</h2>
                  <p className="font-body text-[10px] sm:text-[11px] text-on-surface-variant">Last 8 months across all active organizations</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-sm bg-primary inline-block"></span>
                    <span className="font-label text-[10px] sm:text-[11px] text-on-surface-variant">Valuation Vol</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span>
                    <span className="font-label text-[10px] sm:text-[11px] text-on-surface-variant">Tenants</span>
                  </div>
                </div>
              </div>

              {/* Crisp SVG Combo Bar & Line Chart without empty top gap */}
              <div className="w-full h-[145px] sm:h-[155px] lg:h-[150px] flex items-center justify-center">
                <svg
                  viewBox="0 0 580 145"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Monthly Valuation Volume and Tenant Growth Chart"
                >
                  {/* Grid Lines */}
                  <line x1="42" y1="18" x2="565" y2="18" stroke="#E2E8F0" strokeDasharray="3 3" />
                  <line x1="42" y1="46" x2="565" y2="46" stroke="#E2E8F0" strokeDasharray="3 3" />
                  <line x1="42" y1="74" x2="565" y2="74" stroke="#E2E8F0" strokeDasharray="3 3" />
                  <line x1="42" y1="102" x2="565" y2="102" stroke="#E2E8F0" strokeDasharray="3 3" />
                  <line x1="42" y1="126" x2="565" y2="126" stroke="#CBD5E1" />

                  {/* Y-Axis Labels */}
                  <text x="34" y="21" textAnchor="end" fill="#64748B" fontFamily="Reddit Sans, sans-serif" fontSize="10">3.5k</text>
                  <text x="34" y="49" textAnchor="end" fill="#64748B" fontFamily="Reddit Sans, sans-serif" fontSize="10">2.6k</text>
                  <text x="34" y="77" textAnchor="end" fill="#64748B" fontFamily="Reddit Sans, sans-serif" fontSize="10">1.8k</text>
                  <text x="34" y="105" textAnchor="end" fill="#64748B" fontFamily="Reddit Sans, sans-serif" fontSize="10">900</text>
                  <text x="34" y="129" textAnchor="end" fill="#64748B" fontFamily="Reddit Sans, sans-serif" fontSize="10">0</text>

                  {/* Valuation Volume Bars */}
                  <rect x="62" y="80" width="28" height="46" rx="3" fill="#0F294A" fillOpacity="0.88" />
                  <rect x="126" y="68" width="28" height="58" rx="3" fill="#0F294A" fillOpacity="0.88" />
                  <rect x="190" y="60" width="28" height="66" rx="3" fill="#0F294A" fillOpacity="0.88" />
                  <rect x="254" y="50" width="28" height="76" rx="3" fill="#0F294A" fillOpacity="0.88" />
                  <rect x="318" y="40" width="28" height="86" rx="3" fill="#0F294A" fillOpacity="0.88" />
                  <rect x="382" y="32" width="28" height="94" rx="3" fill="#0F294A" fillOpacity="0.88" />
                  <rect x="446" y="24" width="28" height="102" rx="3" fill="#0F294A" fillOpacity="0.88" />
                  <rect x="510" y="18" width="28" height="108" rx="3" fill="#0F294A" />

                  {/* Tenant Growth Trend Line */}
                  <path
                    d="M76 88 L140 78 L204 70 L268 59 L332 49 L396 40 L460 30 L524 20"
                    stroke="#2E8B57"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="76" cy="88" r="3.5" fill="#FFFFFF" stroke="#2E8B57" strokeWidth="2" />
                  <circle cx="140" cy="78" r="3.5" fill="#FFFFFF" stroke="#2E8B57" strokeWidth="2" />
                  <circle cx="204" cy="70" r="3.5" fill="#FFFFFF" stroke="#2E8B57" strokeWidth="2" />
                  <circle cx="268" cy="59" r="3.5" fill="#FFFFFF" stroke="#2E8B57" strokeWidth="2" />
                  <circle cx="332" cy="49" r="3.5" fill="#FFFFFF" stroke="#2E8B57" strokeWidth="2" />
                  <circle cx="396" cy="40" r="3.5" fill="#FFFFFF" stroke="#2E8B57" strokeWidth="2" />
                  <circle cx="460" cy="30" r="3.5" fill="#FFFFFF" stroke="#2E8B57" strokeWidth="2" />
                  <circle cx="524" cy="20" r="4.5" fill="#2E8B57" stroke="#FFFFFF" strokeWidth="1.5" />

                  {/* X-Axis Month Labels */}
                  <text x="76" y="140" textAnchor="middle" fill="#475569" fontFamily="Reddit Sans, sans-serif" fontSize="10">Apr</text>
                  <text x="140" y="140" textAnchor="middle" fill="#475569" fontFamily="Reddit Sans, sans-serif" fontSize="10">May</text>
                  <text x="204" y="140" textAnchor="middle" fill="#475569" fontFamily="Reddit Sans, sans-serif" fontSize="10">Jun</text>
                  <text x="268" y="140" textAnchor="middle" fill="#475569" fontFamily="Reddit Sans, sans-serif" fontSize="10">Jul</text>
                  <text x="332" y="140" textAnchor="middle" fill="#475569" fontFamily="Reddit Sans, sans-serif" fontSize="10">Aug</text>
                  <text x="396" y="140" textAnchor="middle" fill="#475569" fontFamily="Reddit Sans, sans-serif" fontSize="10">Sep</text>
                  <text x="460" y="140" textAnchor="middle" fill="#475569" fontFamily="Reddit Sans, sans-serif" fontSize="10">Oct</text>
                  <text x="524" y="140" textAnchor="middle" fill="#0F294A" fontWeight="600" fontFamily="Reddit Sans, sans-serif" fontSize="10">Nov</text>
                </svg>
              </div>
            </div>

            {/* Chart 2: Sales Growth (MRR & Subscription Sales Trajectory) */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-md p-2.5 sm:p-3 shadow-sm flex flex-col gap-1.5 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 shrink-0">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-headline text-[12px] sm:text-[13px] font-semibold text-primary">Sales &amp; Revenue Growth</h2>
                    <span className="inline-flex items-center px-1.5 py-0.2 rounded bg-secondary-container text-on-secondary-container font-label text-[9px] font-semibold">
                      +18.4% MRR
                    </span>
                  </div>
                  <p className="font-body text-[10px] sm:text-[11px] text-on-surface-variant">Monthly recurring subscription sales (in ₹ Lakhs)</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span>
                    <span className="font-label text-[10px] sm:text-[11px] text-on-surface-variant">Actual MRR</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-0.5 bg-outline inline-block"></span>
                    <span className="font-label text-[10px] sm:text-[11px] text-on-surface-variant">Target (₹16L)</span>
                  </div>
                </div>
              </div>

              {/* Crisp SVG Gradient Area & Trend Chart */}
              <div className="w-full h-[145px] sm:h-[155px] lg:h-[150px] flex items-center justify-center">
                <svg
                  viewBox="0 0 580 145"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Sales and MRR Growth Trajectory Chart"
                >
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2E8B57" stopOpacity="0.32" />
                      <stop offset="85%" stopColor="#2E8B57" stopOpacity="0.04" />
                      <stop offset="100%" stopColor="#2E8B57" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1="42" y1="18" x2="565" y2="18" stroke="#E2E8F0" strokeDasharray="3 3" />
                  <line x1="42" y1="46" x2="565" y2="46" stroke="#E2E8F0" strokeDasharray="3 3" />
                  <line x1="42" y1="74" x2="565" y2="74" stroke="#E2E8F0" strokeDasharray="3 3" />
                  <line x1="42" y1="102" x2="565" y2="102" stroke="#E2E8F0" strokeDasharray="3 3" />
                  <line x1="42" y1="126" x2="565" y2="126" stroke="#CBD5E1" />

                  {/* Y-Axis Labels */}
                  <text x="34" y="21" textAnchor="end" fill="#64748B" fontFamily="Reddit Sans, sans-serif" fontSize="10">₹18L</text>
                  <text x="34" y="49" textAnchor="end" fill="#64748B" fontFamily="Reddit Sans, sans-serif" fontSize="10">₹14L</text>
                  <text x="34" y="77" textAnchor="end" fill="#64748B" fontFamily="Reddit Sans, sans-serif" fontSize="10">₹10L</text>
                  <text x="34" y="105" textAnchor="end" fill="#64748B" fontFamily="Reddit Sans, sans-serif" fontSize="10">₹6L</text>
                  <text x="34" y="129" textAnchor="end" fill="#64748B" fontFamily="Reddit Sans, sans-serif" fontSize="10">₹0</text>

                  {/* Target Benchmark Line (Dashed) */}
                  <line x1="76" y1="92" x2="524" y2="28" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 4" />

                  {/* Area Fill Under Sales Curve */}
                  <path
                    d="M76 100 Q140 88 204 78 T332 58 T460 38 L524 24 L524 126 L76 126 Z"
                    fill="url(#salesGradient)"
                  />

                  {/* Main Sales Trend Curve */}
                  <path
                    d="M76 100 Q140 88 204 78 T332 58 T460 38 L524 24"
                    stroke="#2E8B57"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data Points */}
                  <circle cx="76" cy="100" r="3.5" fill="#FFFFFF" stroke="#2E8B57" strokeWidth="2" />
                  <circle cx="140" cy="90" r="3.5" fill="#FFFFFF" stroke="#2E8B57" strokeWidth="2" />
                  <circle cx="204" cy="78" r="3.5" fill="#FFFFFF" stroke="#2E8B57" strokeWidth="2" />
                  <circle cx="268" cy="68" r="3.5" fill="#FFFFFF" stroke="#2E8B57" strokeWidth="2" />
                  <circle cx="332" cy="58" r="3.5" fill="#FFFFFF" stroke="#2E8B57" strokeWidth="2" />
                  <circle cx="396" cy="48" r="3.5" fill="#FFFFFF" stroke="#2E8B57" strokeWidth="2" />
                  <circle cx="460" cy="38" r="3.5" fill="#FFFFFF" stroke="#2E8B57" strokeWidth="2" />
                  <circle cx="524" cy="24" r="5" fill="#2E8B57" stroke="#FFFFFF" strokeWidth="2" />

                  {/* Highlight Badge for Current Month Nov */}
                  <rect x="494" y="6" width="60" height="15" rx="3" fill="#0F294A" />
                  <text x="524" y="17" textAnchor="middle" fill="#FFFFFF" fontWeight="700" fontFamily="Reddit Sans, sans-serif" fontSize="9">₹14.8L</text>

                  {/* X-Axis Month Labels */}
                  <text x="76" y="140" textAnchor="middle" fill="#475569" fontFamily="Reddit Sans, sans-serif" fontSize="10">Apr</text>
                  <text x="140" y="140" textAnchor="middle" fill="#475569" fontFamily="Reddit Sans, sans-serif" fontSize="10">May</text>
                  <text x="204" y="140" textAnchor="middle" fill="#475569" fontFamily="Reddit Sans, sans-serif" fontSize="10">Jun</text>
                  <text x="268" y="140" textAnchor="middle" fill="#475569" fontFamily="Reddit Sans, sans-serif" fontSize="10">Jul</text>
                  <text x="332" y="140" textAnchor="middle" fill="#475569" fontFamily="Reddit Sans, sans-serif" fontSize="10">Aug</text>
                  <text x="396" y="140" textAnchor="middle" fill="#475569" fontFamily="Reddit Sans, sans-serif" fontSize="10">Sep</text>
                  <text x="460" y="140" textAnchor="middle" fill="#475569" fontFamily="Reddit Sans, sans-serif" fontSize="10">Oct</text>
                  <text x="524" y="140" textAnchor="middle" fill="#0F294A" fontWeight="600" fontFamily="Reddit Sans, sans-serif" fontSize="10">Nov</text>
                </svg>
              </div>
            </div>
          </section>

          {/* Bottom Area: Recent Tenant Onboarding Table */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-md p-2.5 sm:p-3 shadow-sm flex flex-col justify-between gap-2 overflow-hidden flex-1 min-h-[160px] lg:min-h-0">
            <div className="flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div>
                <h2 className="font-headline text-[12px] sm:text-[13px] font-semibold text-primary whitespace-nowrap">Recent Tenant Onboarding</h2>
                <p className="font-body text-[10px] sm:text-[11px] text-on-surface-variant">Latest valuation firms and banks provisioned on TrueArk</p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to="/saas-admin/company-master"
                  className="font-label text-[10px] sm:text-[11px] text-tertiary hover:underline"
                >
                  View All Companies →
                </Link>
                <Link
                  to="/saas-admin/company-master/add"
                  className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded bg-tertiary text-on-tertiary font-label text-[10px] sm:text-[11px] hover:opacity-95 transition-colors duration-state-change whitespace-nowrap shrink-0"
                >
                  <span className="material-symbols-outlined text-[13px] sm:text-[14px]" aria-hidden="true">add</span>
                  <span>Add Organization</span>
                </Link>
              </div>
            </div>

            {/* Compact Table */}
            <div className="border border-outline-variant rounded-md overflow-hidden flex-1 flex flex-col justify-between min-h-0">
              <div className="overflow-x-auto h-full">
                <table className="w-full text-left border-collapse min-w-[540px]">
                  <thead className="bg-surface-container-low border-b border-outline-variant">
                    <tr>
                      <th scope="col" className="px-3 py-1.5 font-label text-[10px] sm:text-[11px] text-on-surface-variant whitespace-nowrap">
                        Company Name
                      </th>
                      <th scope="col" className="px-2.5 py-1.5 font-label text-[10px] sm:text-[11px] text-on-surface-variant whitespace-nowrap">
                        Plan Tier
                      </th>
                      <th scope="col" className="px-2.5 py-1.5 font-label text-[10px] sm:text-[11px] text-on-surface-variant whitespace-nowrap">
                        Valuation Quota
                      </th>
                      <th scope="col" className="px-2.5 py-1.5 font-label text-[10px] sm:text-[11px] text-on-surface-variant whitespace-nowrap">
                        Onboarded Date
                      </th>
                      <th scope="col" className="px-3 py-1.5 font-label text-[10px] sm:text-[11px] text-on-surface-variant text-right whitespace-nowrap">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {recentTenants.map((tenant, idx) => (
                      <tr key={idx} className="hover:bg-surface-container-low/50">
                        <td className="px-3 py-1.5 font-title text-[11px] sm:text-[12px] font-medium text-primary whitespace-nowrap">
                          {tenant.company}
                        </td>
                        <td className="px-2.5 py-1.5 font-body text-[10px] sm:text-[11px] text-on-surface-variant whitespace-nowrap">
                          {tenant.plan}
                        </td>
                        <td className="px-2.5 py-1.5 font-body text-[10px] sm:text-[11px] text-on-surface-variant whitespace-nowrap">
                          {tenant.quota}
                        </td>
                        <td className="px-2.5 py-1.5 font-body text-[10px] sm:text-[11px] text-on-surface-variant whitespace-nowrap">
                          {tenant.date}
                        </td>
                        <td className="px-3 py-1.5 text-right whitespace-nowrap">
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
          </section>
        </main>
      </div>
    </div>
  );
}

