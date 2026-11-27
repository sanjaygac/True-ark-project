import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CompanyAdminSidebar from '../../components/company-admin/CompanyAdminSidebar';
import SearchableSelect from '../../components/common/SearchableSelect';

const statusFilterOptions = [
  { value: 'all', label: 'All Queue' },
  { value: 'Pending Review', label: 'Pending Review' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Returned', label: 'Returned' },
];

const initialSubmissions = [
  {
    id: 'TA-2026-088',
    code: '#TA-2026-088',
    property: 'Sriperumbudur, S.No 88/1A',
    client: 'Sri Lakshmi Developers',
    submittedBy: 'Vikram Rao',
    assessedValue: '₹4,15,00,000',
    status: 'Pending Review',
  },
  {
    id: 'TA-2026-084',
    code: '#TA-2026-084',
    property: 'Whitefield, Khata 712/9',
    client: 'Ananya Deshmukh',
    submittedBy: 'Priya Nair',
    assessedValue: '₹3,18,60,000',
    status: 'Pending Review',
  },
  {
    id: 'TA-2026-083',
    code: '#TA-2026-083',
    property: 'Tambaram, S.No 309/2B',
    client: 'Suresh Venkataraman',
    submittedBy: 'Vikram Rao',
    assessedValue: '₹1,62,40,000',
    status: 'Pending Review',
  },
  {
    id: 'TA-2026-089',
    code: '#TA-2026-089',
    property: 'Kelambakkam, S.No 142/3B',
    client: 'Raghavan Nair',
    submittedBy: 'Deepak Menon',
    assessedValue: '₹1,48,50,000',
    status: 'Approved',
  },
  {
    id: 'TA-2026-085',
    code: '#TA-2026-085',
    property: 'Oragadam, S.No 204/2C',
    client: 'Vanguard Auto Components',
    submittedBy: 'Priya Nair',
    assessedValue: '₹1,92,70,000',
    status: 'Approved',
  },
  {
    id: 'TA-2026-081',
    code: '#TA-2026-081',
    property: 'Hosur, S.No 118/4D',
    client: 'Kaveri Logistics Park',
    submittedBy: 'Deepak Menon',
    assessedValue: '₹2,74,00,000',
    status: 'Returned',
    hasEditOnInit: true,
  },
];

export default function CompanyApprovalsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    document.title = 'Approvals — TrueArk';
  }, []);

  const handleDecision = (id, newStatus) => {
    setSubmissions((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: newStatus, hasEditOnInit: false }
          : item
      )
    );
  };

  const pendingCount = submissions.filter((s) => s.status === 'Pending Review').length;
  const approvedInTable = submissions.filter((s) => s.status === 'Approved').length;
  const returnedCount = submissions.filter((s) => s.status === 'Returned').length;
  const approvedThisMonth = 26 + approvedInTable;

  const filteredSubmissions = submissions.filter((item) => {
    const q = searchTerm.trim().toLowerCase();
    const matchesQuery =
      q === '' ||
      item.code.toLowerCase().includes(q) ||
      item.property.toLowerCase().includes(q) ||
      item.client.toLowerCase().includes(q) ||
      item.submittedBy.toLowerCase().includes(q) ||
      item.assessedValue.toLowerCase().includes(q) ||
      item.status.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const getStatusPill = (status) => {
    if (status === 'Approved') {
      return (
        <span className="status-pill inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-label-sm">
          Approved
        </span>
      );
    }
    if (status === 'Returned') {
      return (
        <span className="status-pill inline-flex items-center px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label text-label-sm">
          Returned
        </span>
      );
    }
    return (
      <span className="status-pill inline-flex items-center px-2.5 py-0.5 rounded-full bg-warning-container text-on-warning-container font-label text-label-sm">
        {status}
      </span>
    );
  };

  return (
    <div className="h-screen flex bg-surface text-on-surface font-body antialiased overflow-hidden relative">
      {/* Left Sidebar (Company Admin Portal Only) */}
      <CompanyAdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Workspace */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto overflow-x-hidden">
        {/* Top Action Bar */}
        <header className="bg-surface-container-lowest border-b border-outline-variant px-3 sm:px-5 lg:px-6 py-3.5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 shrink-0">
          <div className="flex flex-col gap-0.5 min-w-0">
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
                Valuation Approvals
              </h1>
            </div>
            <p className="font-body text-body-sm text-on-surface-variant pl-10 lg:pl-0">
              Review submitted land &amp; property valuations, verify assessed values, and certify final reports.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full lg:w-auto shrink-0">
            {/* Quick-search input */}
            <div className="relative w-full sm:w-64">
              <span
                aria-hidden="true"
                className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-title-md select-none"
              >
                search
              </span>
              <input
                id="approval-search"
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search ID, Survey No., or Client..."
                className="w-full rounded border border-outline-variant bg-surface pl-9 pr-3 py-2 font-body text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>

            {/* Searchable Status Filter Dropdown */}
            <div className="w-full sm:w-44 shrink-0">
              <SearchableSelect
                value={statusFilter}
                onChange={(val) => setStatusFilter(val)}
                options={statusFilterOptions}
                placeholder="All Queue"
                searchPlaceholder="Search status..."
                ariaLabel="Filter by Status"
              />
            </div>
          </div>
        </header>

        <main className="p-3 sm:p-4 flex-1 flex flex-col gap-3 min-w-0">
          {/* KPI Summary Row (3 Cards) */}
          <section aria-label="Approval Summary Metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch">
            <article className="h-full bg-surface-container-lowest border border-outline-variant rounded-md p-3.5 sm:p-4 shadow-sm flex flex-col justify-between gap-2">
              <header className="flex items-center justify-between gap-2">
                <h2 className="font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                  Pending Review
                </h2>
                <span className="material-symbols-outlined text-warning text-title-md shrink-0" aria-hidden="true">
                  pending_actions
                </span>
              </header>
              <p className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-bold text-primary tabular-nums">
                {pendingCount}
              </p>
            </article>

            <article className="h-full bg-surface-container-lowest border border-outline-variant rounded-md p-3.5 sm:p-4 shadow-sm flex flex-col justify-between gap-2">
              <header className="flex items-center justify-between gap-2">
                <h2 className="font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                  Approved This Month
                </h2>
                <span className="material-symbols-outlined text-secondary text-title-md shrink-0" aria-hidden="true">
                  verified
                </span>
              </header>
              <p className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-bold text-primary tabular-nums">
                {approvedThisMonth}
              </p>
            </article>

            <article className="h-full bg-surface-container-lowest border border-outline-variant rounded-md p-3.5 sm:p-4 shadow-sm flex flex-col justify-between gap-2">
              <header className="flex items-center justify-between gap-2">
                <h2 className="font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                  Returned for Revision
                </h2>
                <span className="material-symbols-outlined text-error text-title-md shrink-0" aria-hidden="true">
                  assignment_return
                </span>
              </header>
              <p className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-bold text-primary tabular-nums">
                {returnedCount}
              </p>
            </article>
          </section>

          {/* Sign-Off Queue Table Card */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm overflow-hidden">
            <div className="px-3.5 sm:px-4 py-3 border-b border-outline-variant flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-headline text-headline-sm text-primary">Sign-Off Queue</h2>
              <span className="font-body text-body-sm text-on-surface-variant tabular-nums">
                Showing {filteredSubmissions.length} {filteredSubmissions.length === 1 ? 'submission' : 'submissions'}
              </span>
            </div>

            <div className="w-full overflow-hidden">
              <table className="w-full table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[13%]" />
                  <col className="w-[24%]" />
                  <col className="w-[18%]" />
                  <col className="w-[15%]" />
                  <col className="w-[12%]" />
                  <col className="w-[10%]" />
                  <col className="w-[8%]" />
                </colgroup>
                <thead className="bg-surface-container-low border-b border-outline-variant">
                  <tr>
                    <th scope="col" className="px-2 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap truncate">
                      Valuation ID
                    </th>
                    <th scope="col" className="px-2 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap truncate">
                      Property / Survey No.
                    </th>
                    <th scope="col" className="px-2 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap truncate">
                      Client
                    </th>
                    <th scope="col" className="px-2 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap truncate">
                      Submitted By
                    </th>
                    <th scope="col" className="px-2 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap truncate">
                      Assessed Value
                    </th>
                    <th scope="col" className="px-2 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap truncate">
                      Status
                    </th>
                    <th scope="col" className="px-2 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant text-right whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {filteredSubmissions.length > 0 ? (
                    filteredSubmissions.map((item) => (
                      <tr key={item.id} className="approval-row hover:bg-surface-container-low/50 transition-colors duration-state-change">
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 font-mono text-[11px] xl:text-[12px] text-primary whitespace-nowrap truncate" title={item.code}>
                          {item.code}
                        </td>
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 font-body text-body-sm text-on-surface truncate" title={item.property}>
                          {item.property}
                        </td>
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 font-body text-body-sm text-on-surface-variant truncate" title={item.client}>
                          {item.client}
                        </td>
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 font-body text-body-sm text-on-surface-variant whitespace-nowrap truncate" title={item.submittedBy}>
                          {item.submittedBy}
                        </td>
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 font-label text-[12px] text-primary tabular-nums whitespace-nowrap truncate" title={item.assessedValue}>
                          {item.assessedValue}
                        </td>
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 whitespace-nowrap">
                          {getStatusPill(item.status)}
                        </td>
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 text-right whitespace-nowrap">
                          <div className="inline-flex items-center justify-end gap-2 xl:gap-2.5">
                            {item.status === 'Pending Review' && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleDecision(item.id, 'Approved')}
                                  className="approve-btn font-label text-label-sm text-tertiary hover:underline"
                                >
                                  Approve
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDecision(item.id, 'Returned')}
                                  className="reject-btn font-label text-label-sm text-error hover:underline"
                                >
                                  Return
                                </button>
                              </>
                            )}
                            {item.status === 'Returned' && item.hasEditOnInit && (
                              <Link
                                to={`/company-admin/valuation/edit/${item.id}`}
                                className="font-label text-label-sm text-primary hover:underline"
                              >
                                Edit
                              </Link>
                            )}
                            <Link
                              to={`/company-admin/reports/${item.id}`}
                              className={`font-label text-label-sm hover:underline ${
                                item.status === 'Returned' && item.hasEditOnInit ? 'text-tertiary' : 'text-primary'
                              }`}
                            >
                              View
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-5 py-8 text-center font-body text-body-md text-outline">
                        No submissions match your search or status filter.
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
