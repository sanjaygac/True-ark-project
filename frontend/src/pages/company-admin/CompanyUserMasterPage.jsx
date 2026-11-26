import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CompanyAdminSidebar from '../../components/company-admin/CompanyAdminSidebar';
import SearchableSelect from '../../components/common/SearchableSelect';

const statusFilterOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'Active', label: 'Active' },
  { value: 'Invited', label: 'Invited' },
  { value: 'Suspended', label: 'Suspended' },
];

const initialUsers = [
  {
    id: 'USR-001',
    name: 'Arjun Mehta',
    email: 'arjun.mehta@apexvaluations.in',
    company: 'Apex Valuation Associates',
    role: 'Lead Certified Valuer',
    status: 'Active',
  },
  {
    id: 'USR-002',
    name: 'Priya Nair',
    email: 'priya.nair@kaverihousing.in',
    company: 'Kaveri Housing Finance',
    role: 'Org Admin',
    status: 'Active',
  },
  {
    id: 'USR-003',
    name: 'Vikram Rao',
    email: 'vikram.rao@southernland.in',
    company: 'Southern Land Advisors',
    role: 'Field Valuer',
    status: 'Invited',
  },
  {
    id: 'USR-004',
    name: 'Deepak Menon',
    email: 'deepak.m@apexvaluations.in',
    company: 'Apex Valuation Associates',
    role: 'Senior Valuer',
    status: 'Active',
  },
  {
    id: 'USR-005',
    name: 'Kavitha Rajan',
    email: 'kavitha.r@deccanrealty.in',
    company: 'Deccan Realty Audit',
    role: 'Reviewer',
    status: 'Suspended',
  },
];

export default function CompanyUserMasterPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    document.title = 'User Master — TrueArk';
  }, []);

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

  const toggleRowStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
    setActiveMenuId(null);
  };

  const getStatusBadge = (status) => {
    if (status === 'Active') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-label-sm">
          Active
        </span>
      );
    }
    if (status === 'Invited') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label text-label-sm">
          Invited
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label text-label-sm">
        {status}
      </span>
    );
  };

  const filteredUsers = users.filter((u) => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      q === '' ||
      u.id.toLowerCase().includes(q) ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.company.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q) ||
      u.status.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-screen flex bg-surface text-on-surface font-body antialiased overflow-hidden relative">
      {/* Left Navigation Sidebar (Company Admin Portal Only) */}
      <CompanyAdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Column */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto overflow-x-hidden">
        {/* Top Header */}
        <header className="bg-surface-container-lowest border-b border-outline-variant px-3 sm:px-4 lg:px-5 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2.5 sm:gap-3 shrink-0">
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
                User Master
              </h1>
            </div>
            <p className="font-body text-body-sm text-on-surface-variant pl-10 lg:pl-0">
              Manage registered valuers, organization admins, and platform user accounts
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 w-full lg:w-auto shrink-0">
            {/* Search Input */}
            <div className="relative w-full sm:w-64 lg:w-72">
              <span
                aria-hidden="true"
                className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-title-md select-none"
              >
                search
              </span>
              <input
                id="user-search"
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Name, Email, or User ID..."
                className="w-full rounded border border-outline-variant bg-surface pl-9 pr-3 py-2 font-body text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
              {/* Searchable Status Filter Dropdown */}
              <div className="w-40 sm:w-44 shrink-0">
                <SearchableSelect
                  value={statusFilter}
                  onChange={(val) => setStatusFilter(val)}
                  options={statusFilterOptions}
                  placeholder="All Status"
                  searchPlaceholder="Search status..."
                  ariaLabel="Filter by Status"
                />
              </div>

              {/* Primary Add Button */}
              <Link
                to="/company-admin/masters/user/add"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded bg-tertiary text-on-tertiary font-label text-label-md hover:opacity-95 transition-colors duration-state-change whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-title-sm" aria-hidden="true">
                  add
                </span>
                <span>Add New User</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Workspace (same gap size as Company Master & Plan Master) */}
        <main className="p-3 sm:p-4 flex-1 flex flex-col gap-3 min-w-0" ref={tableRef}>
          {/* Main Data Table Card */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm overflow-visible">
            <div className="rounded-md overflow-x-auto lg:overflow-visible">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low border-b border-outline-variant">
                  <tr>
                    <th scope="col" className="px-2.5 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                      User ID
                    </th>
                    <th scope="col" className="px-2.5 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                      Full Name
                    </th>
                    <th scope="col" className="px-2.5 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                      Email
                    </th>
                    <th scope="col" className="px-2.5 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                      Company
                    </th>
                    <th scope="col" className="px-2.5 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                      Role
                    </th>
                    <th scope="col" className="px-2.5 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                      Status
                    </th>
                    <th scope="col" className="px-2.5 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant text-right whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-3 py-6 text-center text-outline font-body text-body-md">
                        No users match the selected criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user, index) => {
                      const openUpward = index >= filteredUsers.length - 2 && filteredUsers.length > 2;
                      return (
                        <tr
                          key={user.id}
                          className="user-row hover:bg-surface-container-low/50 transition-colors duration-state-change"
                        >
                          <td className="px-2.5 xl:px-3 py-2.5 font-mono text-[11px] xl:text-mono-md text-primary whitespace-nowrap">
                            {user.id}
                          </td>
                          <td className="px-2.5 xl:px-3 py-2.5">
                            <p className="font-title text-title-sm text-primary whitespace-nowrap">
                              {user.name}
                            </p>
                          </td>
                          <td className="px-2.5 xl:px-3 py-2.5 font-body text-body-sm text-on-surface-variant">
                            {user.email}
                          </td>
                          <td className="px-2.5 xl:px-3 py-2.5 font-body text-body-sm text-on-surface">
                            {user.company}
                          </td>
                          <td className="px-2.5 xl:px-3 py-2.5 font-body text-body-sm text-on-surface whitespace-nowrap">
                            {user.role}
                          </td>
                          <td className="px-2.5 xl:px-3 py-2.5 whitespace-nowrap">
                            {getStatusBadge(user.status)}
                          </td>
                          <td className="px-2.5 xl:px-3 py-2.5 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-2.5">
                              <Link
                                to={`/company-admin/masters/user/edit/${user.id}`}
                                className="font-label text-label-sm text-primary hover:underline"
                              >
                                Edit
                              </Link>
                              <Link
                                to={`/company-admin/masters/user/view/${user.id}`}
                                className="font-label text-label-sm text-tertiary hover:underline"
                              >
                                View
                              </Link>
                              <div className="relative inline-block text-left">
                                <button
                                  type="button"
                                  onClick={() => toggleRowMenu(user.id)}
                                  aria-label={`More actions for ${user.name}`}
                                  className="w-7 h-7 rounded hover:bg-surface-container-low text-on-surface-variant hover:text-primary inline-flex items-center justify-center transition-colors duration-state-change"
                                >
                                  <span className="material-symbols-outlined text-title-md">
                                    more_vert
                                  </span>
                                </button>

                                {activeMenuId === user.id && (
                                  <div
                                    className={`absolute right-0 w-44 rounded-md bg-surface-container-lowest border border-outline-variant shadow-lg py-1 z-30 text-left ${
                                      openUpward ? 'bottom-full mb-1' : 'mt-1'
                                    }`}
                                  >
                                    <button
                                      type="button"
                                      onClick={() => setActiveMenuId(null)}
                                      className="w-full px-3 py-2 flex items-center gap-2.5 font-body text-body-sm text-on-surface hover:bg-surface-container-low transition-colors duration-state-change"
                                    >
                                      <span
                                        className="material-symbols-outlined text-title-sm text-primary"
                                        aria-hidden="true"
                                      >
                                        lock_reset
                                      </span>
                                      <span>Reset Password</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => toggleRowStatus(user.id)}
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
