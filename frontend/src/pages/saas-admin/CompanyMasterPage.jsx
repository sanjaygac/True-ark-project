import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SaasAdminSidebar from '../../components/saas-admin/SaasAdminSidebar';

const initialCompanies = [
  {
    id: 'CMP-001',
    code: 'CMP-001',
    name: 'Apex Valuation Associates',
    location: 'Chennai, TN',
    plan: 'Enterprise',
    startDate: '01 Jan 2026',
    expiryDate: '31 Dec 2027',
    status: 'Active',
  },
  {
    id: 'CMP-002',
    code: 'CMP-002',
    name: 'Kaveri Housing Finance',
    location: 'Bengaluru, KA',
    plan: 'Enterprise',
    startDate: '16 Oct 2025',
    expiryDate: '15 Oct 2027',
    status: 'Active',
  },
  {
    id: 'CMP-003',
    code: 'CMP-003',
    name: 'Southern Land Advisors',
    location: 'Coimbatore, TN',
    plan: 'Pro',
    startDate: '15 Nov 2026',
    expiryDate: '14 Dec 2026',
    status: 'Trial',
  },
  {
    id: 'CMP-004',
    code: 'CMP-004',
    name: 'Deccan Realty Audit',
    location: 'Hyderabad, TS',
    plan: 'Pro',
    startDate: '02 Nov 2025',
    expiryDate: '01 Nov 2026',
    status: 'Expired',
  },
];

export default function CompanyMasterPage() {
  const [companies, setCompanies] = useState(initialCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [activeMenuId, setActiveMenuId] = useState(null);
  const tableRef = useRef(null);

  // Close open dropdown menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleRowMenu = (id) => {
    setActiveMenuId((prev) => (prev === id ? null : id));
  };

  const toggleStatus = (id) => {
    setCompanies((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === 'Active' ? 'Inactive' : 'Active';
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
    setActiveMenuId(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-label-sm">
            Active
          </span>
        );
      case 'Trial':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label text-label-sm">
            Trial
          </span>
        );
      case 'Expired':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label text-label-sm">
            Expired
          </span>
        );
      case 'Inactive':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-label text-label-sm">
            {status}
          </span>
        );
    }
  };

  const filteredCompanies = companies.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'All Status' || c.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-screen flex bg-surface text-on-surface font-body antialiased overflow-hidden relative">
      {/* Left Navigation Sidebar */}
      <SaasAdminSidebar />

      {/* Main Content Column */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        {/* Top Header */}
        <header className="bg-surface-container-lowest border-b border-outline-variant px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-headline text-headline-md text-primary">Company Master</h1>
            <p className="font-body text-body-sm text-on-surface-variant">
              Manage registered valuation firms, banks, and tenant subscriptions
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative w-72">
              <span
                aria-hidden="true"
                className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-title-md select-none"
              >
                search
              </span>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Company Name, Code, or GSTIN..."
                className="w-full rounded border border-outline-variant bg-surface pl-9 pr-3 py-2 font-body text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>

            {/* Status Filter Dropdown */}
            <select
              aria-label="Filter by Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-label text-label-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Trial">Trial</option>
              <option value="Expired">Expired</option>
              <option value="Inactive">Inactive</option>
            </select>

            {/* Primary Add Button */}
            <Link
              to="/saas-admin/company-master/add"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded bg-tertiary text-on-tertiary font-label text-label-md hover:opacity-95 transition-colors duration-state-change whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-title-sm" aria-hidden="true">
                add
              </span>
              <span>Add New Company</span>
            </Link>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="p-6 lg:p-8 flex-1" ref={tableRef}>
          {/* Main Data Table Card */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm overflow-visible">
            <div className="rounded-md overflow-x-auto lg:overflow-visible">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low border-b border-outline-variant">
                  <tr>
                    <th scope="col" className="px-4 py-3.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                      Code
                    </th>
                    <th scope="col" className="px-4 py-3.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                      Company Name
                    </th>
                    <th scope="col" className="px-4 py-3.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                      Location
                    </th>
                    <th scope="col" className="px-4 py-3.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                      Plan
                    </th>
                    <th scope="col" className="px-4 py-3.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                      Start Date
                    </th>
                    <th scope="col" className="px-4 py-3.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                      Expiry Date
                    </th>
                    <th scope="col" className="px-4 py-3.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3.5 font-label text-label-sm text-on-surface-variant text-right whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {filteredCompanies.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-4 py-8 text-center text-outline font-body text-body-md">
                        No companies match the selected criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredCompanies.map((company, index) => {
                      const isLastRow = index >= filteredCompanies.length - 1;
                      return (
                        <tr
                          key={company.id}
                          className="hover:bg-surface-container-low/50 transition-colors duration-state-change"
                        >
                          <td className="px-4 py-4 font-mono text-mono-md text-primary whitespace-nowrap">
                            {company.code}
                          </td>
                          <td className="px-4 py-4">
                            <p className="font-title text-title-sm text-primary whitespace-nowrap">
                              {company.name}
                            </p>
                          </td>
                          <td className="px-4 py-4 font-body text-body-sm text-on-surface whitespace-nowrap">
                            {company.location}
                          </td>
                          <td className="px-4 py-4 font-body text-body-sm text-on-surface whitespace-nowrap">
                            {company.plan}
                          </td>
                          <td className="px-4 py-4 font-body text-body-sm text-on-surface-variant tabular-nums whitespace-nowrap">
                            {company.startDate}
                          </td>
                          <td className="px-4 py-4 font-body text-body-sm text-on-surface-variant tabular-nums whitespace-nowrap">
                            {company.expiryDate}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {getStatusBadge(company.status)}
                          </td>
                          <td className="px-4 py-4 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-3">
                              <Link
                                to={`/saas-admin/company-master/edit/${company.id}`}
                                className="font-label text-label-sm text-primary hover:underline"
                              >
                                Edit
                              </Link>
                              <Link
                                to={`/saas-admin/company-master/view/${company.id}`}
                                className="font-label text-label-sm text-tertiary hover:underline"
                              >
                                View
                              </Link>
                              <div className="relative inline-block text-left">
                                <button
                                  type="button"
                                  onClick={() => toggleRowMenu(company.id)}
                                  aria-label={`More actions for ${company.name}`}
                                  className="w-7 h-7 rounded hover:bg-surface-container-low text-on-surface-variant hover:text-primary inline-flex items-center justify-center transition-colors duration-state-change"
                                >
                                  <span className="material-symbols-outlined text-title-md">
                                    more_vert
                                  </span>
                                </button>

                                {activeMenuId === company.id && (
                                  <div
                                    className={`absolute right-0 w-44 rounded-md bg-surface-container-lowest border border-outline-variant shadow-lg py-1 z-30 text-left ${
                                      isLastRow ? 'bottom-full mb-1' : 'mt-1'
                                    }`}
                                  >
                                    <button
                                      type="button"
                                      onClick={() => {
                                        console.log(`Exporting DB for ${company.name}`);
                                        setActiveMenuId(null);
                                      }}
                                      className="w-full px-3 py-2 flex items-center gap-2.5 font-body text-body-sm text-on-surface hover:bg-surface-container-low transition-colors duration-state-change"
                                    >
                                      <span
                                        className="material-symbols-outlined text-title-sm text-primary"
                                        aria-hidden="true"
                                      >
                                        database
                                      </span>
                                      <span>Export DB</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => toggleStatus(company.id)}
                                      className="w-full px-3 py-2 flex items-center gap-2.5 font-body text-body-sm text-on-surface hover:bg-surface-container-low transition-colors duration-state-change"
                                    >
                                      <span
                                        className="material-symbols-outlined text-title-sm text-tertiary"
                                        aria-hidden="true"
                                      >
                                        sync_alt
                                      </span>
                                      <span>Status Change</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })
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
