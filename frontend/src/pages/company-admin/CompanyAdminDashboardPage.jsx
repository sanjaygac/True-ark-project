import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CompanyAdminSidebar from '../../components/company-admin/CompanyAdminSidebar';

const recentValuations = [
  {
    id: 'TA-2026-089',
    code: '#TA-2026-089',
    location: 'Kelambakkam, S.No 142/3B',
    landType: 'Residential Plot',
    extent: '4,800 Sq.ft',
    value: '₹1,48,50,000',
    status: 'Certified',
  },
  {
    id: 'TA-2026-088',
    code: '#TA-2026-088',
    location: 'Sriperumbudur, S.No 88/1A',
    landType: 'Commercial',
    extent: '12,400 Sq.ft',
    value: '₹4,15,00,000',
    status: 'In Review',
  },
  {
    id: 'TA-2026-087',
    code: '#TA-2026-087',
    location: 'Pollachi, Patta No. 419',
    landType: 'Agricultural',
    extent: '3.45 Acres',
    value: '₹96,60,000',
    status: 'Certified',
  },
  {
    id: 'TA-2026-086',
    code: '#TA-2026-086',
    location: 'Sarjapur Road, S.No 51/4',
    landType: 'Residential Plot',
    extent: '3,600 Sq.ft',
    value: '₹2,34,00,000',
    status: 'Draft',
  },
  {
    id: 'TA-2026-085',
    code: '#TA-2026-085',
    location: 'Oragadam, S.No 204/2C',
    landType: 'Commercial',
    extent: '8,200 Sq.ft',
    value: '₹1,92,70,000',
    status: 'Certified',
  },
];

export default function CompanyAdminDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = 'Valuation Dashboard — TrueArk';
  }, []);

  const filteredValuations = recentValuations.filter((item) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      item.code.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      item.landType.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query)
    );
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Certified':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-label-sm whitespace-nowrap">
            Certified
          </span>
        );
      case 'In Review':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-warning-container text-on-warning-container font-label text-label-sm whitespace-nowrap">
            In Review
          </span>
        );
      case 'Draft':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-label text-label-sm whitespace-nowrap">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="h-screen flex bg-surface text-on-surface font-body antialiased overflow-hidden relative">
      {/* Left Sidebar */}
      <CompanyAdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Workspace */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        {/* Top Action Bar */}
        <header className="bg-surface-container-lowest border-b border-outline-variant px-3 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 shrink-0">
          <div className="flex flex-col gap-1">
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
                Welcome back, Valuation Team
              </h1>
            </div>
            <p className="font-body text-body-sm text-on-surface-variant pl-10 lg:pl-0">
              Track parcel inspections, guideline benchmarks, and certified reports.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 w-full lg:w-auto">
            {/* Quick-search input */}
            <div className="relative w-full sm:w-72">
              <span
                aria-hidden="true"
                className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-title-md select-none"
              >
                search
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Survey No., Patta, or Location..."
                className="w-full rounded border border-outline-variant bg-surface pl-9 pr-3 py-2 font-body text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>

            {/* Prominent Emerald Green + Start New Valuation Button */}
            <Link
              to="/company-admin/valuation/new"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded bg-tertiary text-on-tertiary font-label text-label-md hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 transition-colors duration-state-change whitespace-nowrap shrink-0 shadow-xs"
            >
              <span className="material-symbols-outlined text-title-sm" aria-hidden="true">
                add
              </span>
              <span>Start New Valuation</span>
            </Link>
          </div>
        </header>

        <main className="p-3 sm:p-5 lg:p-6 flex-1 flex flex-col gap-4 sm:gap-5">
          {/* KPI Summary Row (4 Cards) */}
          <section aria-label="Valuation Summary Metrics" className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 items-stretch">
            <article className="h-full bg-surface-container-lowest border border-outline-variant rounded-md p-3 sm:p-4 shadow-sm flex flex-col justify-between gap-2">
              <header className="flex items-center justify-between gap-2">
                <h2 className="font-label text-[10px] sm:text-label-sm text-on-surface-variant whitespace-nowrap">
                  Completed Valuations
                </h2>
                <span className="material-symbols-outlined text-secondary text-title-md shrink-0" aria-hidden="true">
                  task_alt
                </span>
              </header>
              <p className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-bold text-primary tabular-nums">
                84
              </p>
            </article>

            <article className="h-full bg-surface-container-lowest border border-outline-variant rounded-md p-3 sm:p-4 shadow-sm flex flex-col justify-between gap-2">
              <header className="flex items-center justify-between gap-2">
                <h2 className="font-label text-[10px] sm:text-label-sm text-on-surface-variant whitespace-nowrap">
                  Pending Site Inspections
                </h2>
                <span className="material-symbols-outlined text-warning text-title-md shrink-0" aria-hidden="true">
                  pending_actions
                </span>
              </header>
              <p className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-bold text-primary tabular-nums">
                7
              </p>
            </article>

            <article className="h-full bg-surface-container-lowest border border-outline-variant rounded-md p-3 sm:p-4 shadow-sm flex flex-col justify-between gap-2">
              <header className="flex items-center justify-between gap-2">
                <h2 className="font-label text-[10px] sm:text-label-sm text-on-surface-variant whitespace-nowrap">
                  Total Assessed Land Value
                </h2>
                <span className="material-symbols-outlined text-primary text-title-md shrink-0" aria-hidden="true">
                  account_balance
                </span>
              </header>
              <p className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-bold text-primary tabular-nums">
                ₹124.5 Cr
              </p>
            </article>

            <article className="h-full bg-surface-container-lowest border border-outline-variant rounded-md p-3 sm:p-4 shadow-sm flex flex-col justify-between gap-2">
              <header className="flex items-center justify-between gap-2">
                <h2 className="font-label text-[10px] sm:text-label-sm text-on-surface-variant whitespace-nowrap">
                  Avg. Turnaround Time
                </h2>
                <span className="material-symbols-outlined text-secondary text-title-md shrink-0" aria-hidden="true">
                  schedule
                </span>
              </header>
              <p className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-bold text-primary tabular-nums">
                1.4 Days
              </p>
            </article>
          </section>

          {/* Recent Valuations Table */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm overflow-hidden">
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-outline-variant flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-headline text-headline-sm text-primary">Recent Valuations</h2>
              <span className="font-body text-body-sm text-on-surface-variant">
                Showing {filteredValuations.length} recent parcels
              </span>
            </div>

            <div className="rounded-md overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low border-b border-outline-variant">
                  <tr>
                    <th scope="col" className="px-4 sm:px-5 py-3 font-label text-label-md text-on-surface-variant whitespace-nowrap">
                      Property ID
                    </th>
                    <th scope="col" className="px-4 sm:px-5 py-3 font-label text-label-md text-on-surface-variant whitespace-nowrap">
                      Location / Survey No.
                    </th>
                    <th scope="col" className="px-4 sm:px-5 py-3 font-label text-label-md text-on-surface-variant whitespace-nowrap">
                      Land Type
                    </th>
                    <th scope="col" className="px-4 sm:px-5 py-3 font-label text-label-md text-on-surface-variant whitespace-nowrap">
                      Extent
                    </th>
                    <th scope="col" className="px-4 sm:px-5 py-3 font-label text-label-md text-on-surface-variant whitespace-nowrap">
                      Estimated Value
                    </th>
                    <th scope="col" className="px-4 sm:px-5 py-3 font-label text-label-md text-on-surface-variant whitespace-nowrap">
                      Status
                    </th>
                    <th scope="col" className="px-4 sm:px-5 py-3 font-label text-label-md text-on-surface-variant text-right whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {filteredValuations.length > 0 ? (
                    filteredValuations.map((item) => (
                      <tr key={item.id} className="hover:bg-surface-container-low/50 transition-colors duration-state-change">
                        <td className="px-4 sm:px-5 py-3.5 font-mono text-mono-md text-primary whitespace-nowrap">
                          {item.code}
                        </td>
                        <td className="px-4 sm:px-5 py-3.5 font-body text-body-md text-on-surface whitespace-nowrap">
                          {item.location}
                        </td>
                        <td className="px-4 sm:px-5 py-3.5 font-body text-body-md text-on-surface-variant whitespace-nowrap">
                          {item.landType}
                        </td>
                        <td className="px-4 sm:px-5 py-3.5 font-body text-body-md text-on-surface tabular-nums whitespace-nowrap">
                          {item.extent}
                        </td>
                        <td className="px-4 sm:px-5 py-3.5 font-label text-label-lg text-primary tabular-nums whitespace-nowrap">
                          {item.value}
                        </td>
                        <td className="px-4 sm:px-5 py-3.5 whitespace-nowrap">
                          {getStatusBadge(item.status)}
                        </td>
                        <td className="px-4 sm:px-5 py-3.5 text-right whitespace-nowrap">
                          <Link
                            to={`/company-admin/reports/${item.id}`}
                            className="font-label text-label-md text-tertiary hover:underline"
                          >
                            View Report
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-5 py-8 text-center font-body text-body-md text-outline">
                        No valuations match "{searchQuery}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
