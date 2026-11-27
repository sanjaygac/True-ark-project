import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CompanyAdminSidebar from '../../components/company-admin/CompanyAdminSidebar';
import SearchableSelect from '../../components/common/SearchableSelect';
import BankSelectModal from '../../components/company-admin/BankSelectModal';

const statusFilterOptions = [
  { value: 'All Status', label: 'All Status' },
  { value: 'Certified', label: 'Certified' },
  { value: 'In Review', label: 'In Review' },
  { value: 'Draft', label: 'Draft' },
];

const initialValuations = [
  {
    id: 'TA-2026-089',
    code: '#TA-2026-089',
    property: 'Kelambakkam, S.No 142/3B',
    client: 'Raghavan Nair',
    landType: 'Residential Plot',
    extent: '4,800 Sq.ft',
    marketValue: '₹1,48,50,000',
    status: 'Certified',
  },
  {
    id: 'TA-2026-088',
    code: '#TA-2026-088',
    property: 'Sriperumbudur, S.No 88/1A',
    client: 'Sri Lakshmi Developers',
    landType: 'Commercial',
    extent: '12,400 Sq.ft',
    marketValue: '₹4,15,00,000',
    status: 'In Review',
  },
  {
    id: 'TA-2026-087',
    code: '#TA-2026-087',
    property: 'Pollachi, Patta No. 419',
    client: 'Karthik Sundaram',
    landType: 'Agricultural',
    extent: '3.45 Acres',
    marketValue: '₹96,60,000',
    status: 'Certified',
  },
  {
    id: 'TA-2026-086',
    code: '#TA-2026-086',
    property: 'Sarjapur Road, S.No 51/4',
    client: 'Meera Krishnan',
    landType: 'Residential Plot',
    extent: '3,600 Sq.ft',
    marketValue: '₹2,34,00,000',
    status: 'Draft',
  },
  {
    id: 'TA-2026-085',
    code: '#TA-2026-085',
    property: 'Oragadam, S.No 204/2C',
    client: 'Vanguard Auto Components',
    landType: 'Industrial',
    extent: '8,200 Sq.ft',
    marketValue: '₹1,92,70,000',
    status: 'Certified',
  },
  {
    id: 'TA-2026-084',
    code: '#TA-2026-084',
    property: 'Whitefield, Khata 712/9',
    client: 'Ananya Deshmukh',
    landType: 'Residential Plot',
    extent: '5,400 Sq.ft',
    marketValue: '₹3,18,60,000',
    status: 'In Review',
  },
];

export default function CompanyValuationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [bankModalOpen, setBankModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'Valuations — TrueArk';
  }, []);

  const filteredValuations = initialValuations.filter((item) => {
    const query = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !query ||
      item.code.toLowerCase().includes(query) ||
      item.property.toLowerCase().includes(query) ||
      item.client.toLowerCase().includes(query) ||
      item.landType.toLowerCase().includes(query);
    const matchesStatus =
      statusFilter === 'All Status' || item.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Certified':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-label-sm">
            Certified
          </span>
        );
      case 'In Review':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-warning-container text-on-warning-container font-label text-label-sm">
            In Review
          </span>
        );
      case 'Draft':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-label text-label-sm">
            {status}
          </span>
        );
    }
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
                Valuations
              </h1>
            </div>
            <p className="font-body text-body-sm text-on-surface-variant pl-10 lg:pl-0">
              Manage land &amp; property valuation assignments, inspections, and certified reports.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 w-full lg:w-auto shrink-0">
            {/* Quick-search input */}
            <div className="relative w-full sm:w-56 xl:w-64">
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
                placeholder="Search ID, Survey No., or Client..."
                className="w-full rounded border border-outline-variant bg-surface pl-9 pr-3 py-2 font-body text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
              {/* Searchable Status Filter Dropdown */}
              <div className="w-36 shrink-0">
                <SearchableSelect
                  value={statusFilter}
                  onChange={(val) => setStatusFilter(val)}
                  options={statusFilterOptions}
                  placeholder="All Status"
                  searchPlaceholder="Search status..."
                  ariaLabel="Filter by Status"
                />
              </div>

              {/* Prominent Emerald Green + Start New Valuation Button */}
              <button
                type="button"
                onClick={() => setBankModalOpen(true)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded bg-tertiary text-on-tertiary font-label text-label-md hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 transition-colors duration-state-change whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-title-sm" aria-hidden="true">
                  add
                </span>
                <span>Start New Valuation</span>
              </button>
            </div>
          </div>
        </header>

        {/* Bank Selection Dialog */}
        <BankSelectModal
          isOpen={bankModalOpen}
          onClose={() => setBankModalOpen(false)}
        />

        <main className="p-3 sm:p-4 flex-1 flex flex-col gap-3 min-w-0">
          {/* Valuations Table Card */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm overflow-hidden">
            <div className="px-3.5 sm:px-4 py-3 border-b border-outline-variant flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-headline text-headline-sm text-primary">All Valuation Assignments</h2>
              <span className="font-body text-body-sm text-on-surface-variant tabular-nums">
                Showing {filteredValuations.length} of 91 valuations
              </span>
            </div>

            <div className="w-full overflow-hidden">
              <table className="w-full table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[12%]" />
                  <col className="w-[21%]" />
                  <col className="w-[16%]" />
                  <col className="w-[13%]" />
                  <col className="w-[10%]" />
                  <col className="w-[11%]" />
                  <col className="w-[9%]" />
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
                      Land Type
                    </th>
                    <th scope="col" className="px-2 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap truncate">
                      Extent
                    </th>
                    <th scope="col" className="px-2 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap truncate">
                      Market Value
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
                  {filteredValuations.length > 0 ? (
                    filteredValuations.map((item) => (
                      <tr key={item.id} className="hover:bg-surface-container-low/50 transition-colors duration-state-change">
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 font-mono text-[11px] xl:text-[12px] text-primary whitespace-nowrap truncate" title={item.code}>
                          {item.code}
                        </td>
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 font-body text-body-sm text-on-surface truncate" title={item.property}>
                          {item.property}
                        </td>
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 font-body text-body-sm text-on-surface-variant truncate" title={item.client}>
                          {item.client}
                        </td>
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 font-body text-body-sm text-on-surface-variant truncate" title={item.landType}>
                          {item.landType}
                        </td>
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 font-body text-body-sm text-on-surface tabular-nums whitespace-nowrap truncate" title={item.extent}>
                          {item.extent}
                        </td>
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 font-label text-[12px] text-primary tabular-nums whitespace-nowrap truncate" title={item.marketValue}>
                          {item.marketValue}
                        </td>
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 whitespace-nowrap">
                          {getStatusBadge(item.status)}
                        </td>
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 text-right whitespace-nowrap">
                          <div className="inline-flex items-center justify-end gap-2 xl:gap-2.5">
                            <Link
                              to={`/company-admin/valuation/edit/${item.id}`}
                              className="font-label text-label-sm text-primary hover:underline"
                            >
                              Edit
                            </Link>
                            <Link
                              to={`/company-admin/reports/${item.id}`}
                              className="font-label text-label-sm text-tertiary hover:underline"
                            >
                              View
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-5 py-8 text-center font-body text-body-md text-outline">
                        No valuation assignments match your current filter criteria.
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
