import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SaasAdminSidebar from '../../components/saas-admin/SaasAdminSidebar';

const companyDetailsData = {
  'CMP-001': {
    code: 'CMP-001',
    name: 'Apex Valuation Associates',
    status: 'Active',
    plan: 'Enterprise',
    planFull: 'Enterprise (Monthly)',
    validity: '01 Jan 2026 – 31 Dec 2027',
    startDate: '01 Jan 2026',
    expiryDate: '31 Dec 2027',
    valuationsMonth: '184',
    valuationsGrowth: '+14% vs last month',
    branches: '4 Branches',
    seats: '25 / 50 Active Users',
    type: 'Valuation Firm',
    gstin: '33AABCA4812F1Z5',
    pan: 'AABCA4812F',
    email: 'ops@apexvaluations.in',
    phone: '+91 44 2815 4490',
    address: '42 Anna Salai, Teynampet',
    cityState: 'Chennai, Tamil Nadu',
    pincode: '600018',
    region: 'ap-south-1',
    dbStatus: 'DB Provisioned',
  },
  'CMP-002': {
    code: 'CMP-002',
    name: 'Kaveri Housing Finance',
    status: 'Active',
    plan: 'Enterprise',
    planFull: 'Enterprise (Monthly)',
    validity: '16 Oct 2025 – 15 Oct 2027',
    startDate: '16 Oct 2025',
    expiryDate: '15 Oct 2027',
    valuationsMonth: '240',
    valuationsGrowth: '+8% vs last month',
    branches: '6 Branches',
    seats: '42 / 50 Active Users',
    type: 'NBFC / Bank',
    gstin: '29AABCK3311D1Z2',
    pan: 'AABCK3311D',
    email: 'info@kaverihousing.in',
    phone: '+91 80 4123 7789',
    address: '88 MG Road, Ashok Nagar',
    cityState: 'Bengaluru, Karnataka',
    pincode: '560001',
    region: 'ap-south-1',
    dbStatus: 'DB Provisioned',
  },
  'CMP-003': {
    code: 'CMP-003',
    name: 'Southern Land Advisors',
    status: 'Trial',
    plan: 'Pro',
    planFull: 'Pro (Monthly)',
    validity: '15 Nov 2026 – 14 Dec 2026',
    startDate: '15 Nov 2026',
    expiryDate: '14 Dec 2026',
    valuationsMonth: '45',
    valuationsGrowth: '+22% vs last month',
    branches: '2 Branches',
    seats: '8 / 25 Active Users',
    type: 'Advisory / Legal',
    gstin: '33AABCS9912K1Z9',
    pan: 'AABCS9912K',
    email: 'contact@southernland.in',
    phone: '+91 422 254 1120',
    address: '14 Avinashi Road, Race Course',
    cityState: 'Coimbatore, Tamil Nadu',
    pincode: '641018',
    region: 'ap-south-1',
    dbStatus: 'DB Provisioned',
  },
  'CMP-004': {
    code: 'CMP-004',
    name: 'Deccan Realty Audit',
    status: 'Expired',
    plan: 'Pro',
    planFull: 'Pro (Annual)',
    validity: '02 Nov 2025 – 01 Nov 2026',
    startDate: '02 Nov 2025',
    expiryDate: '01 Nov 2026',
    valuationsMonth: '0',
    valuationsGrowth: '-100% vs last month',
    branches: '3 Branches',
    seats: '0 / 25 Active Users',
    type: 'Valuation Firm',
    gstin: '36AABCD1144J1Z8',
    pan: 'AABCD1144J',
    email: 'admin@deccanrealty.in',
    phone: '+91 40 2335 8890',
    address: '102 Banjara Hills, Road No 12',
    cityState: 'Hyderabad, Telangana',
    pincode: '500034',
    region: 'ap-south-1',
    dbStatus: 'DB Provisioned',
  },
};

export default function CompanyViewPage() {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const company = companyDetailsData[id] || companyDetailsData['CMP-001'];

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
      {/* Left Navigation Sidebar */}
      <SaasAdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Column */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        {/* Contextual Header */}
        <header className="bg-surface-container-lowest border-b border-outline-variant px-3 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <Link
              to="/saas-admin/company-master"
              className="inline-flex items-center gap-1.5 font-label text-label-sm text-tertiary hover:underline w-fit"
            >
              <span className="material-symbols-outlined text-title-sm" aria-hidden="true">
                arrow_back
              </span>
              <span>Back to Company Master</span>
            </Link>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen((prev) => !prev)}
                className="lg:hidden inline-flex items-center justify-center w-8 h-8 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors duration-state-change shrink-0"
                aria-label="Open sidebar menu"
              >
                <span className="material-symbols-outlined text-[20px]">menu</span>
              </button>
              <h1 className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-primary">{company.name}</h1>
              <span className="font-mono text-mono-md text-primary bg-surface-container-low px-2.5 py-0.5 rounded border border-outline-variant">
                {company.code}
              </span>
              {getStatusBadge(company.status)}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={`/saas-admin/company-master/edit/${company.code}`}
              className="px-5 py-2 rounded bg-primary text-on-primary font-label text-label-md hover:opacity-95 transition-colors duration-state-change whitespace-nowrap"
            >
              <span>Edit Company</span>
            </Link>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="p-6 lg:p-8 flex-1 flex flex-col gap-6 max-w-6xl">
          {/* Summary Metrics Row */}
          <section aria-label="Tenant Summary Metrics" className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            <article className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm p-5 flex flex-col justify-between gap-2 h-full">
              <span className="font-label text-label-sm text-on-surface-variant">Active Plan</span>
              <p className="font-headline text-headline-md text-primary">{company.plan}</p>
              <p className="font-body text-body-sm text-on-surface-variant tabular-nums">{company.validity}</p>
            </article>

            <article className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm p-5 flex flex-col justify-between gap-2 h-full">
              <span className="font-label text-label-sm text-on-surface-variant">Valuations This Month</span>
              <p className="font-headline text-headline-md text-primary tabular-nums">{company.valuationsMonth}</p>
              <p className="font-body text-body-sm text-tertiary tabular-nums">{company.valuationsGrowth}</p>
            </article>

            <article className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm p-5 flex flex-col justify-between gap-2 h-full">
              <span className="font-label text-label-sm text-on-surface-variant">Branches &amp; User Seats</span>
              <p className="font-headline text-headline-md text-primary tabular-nums">{company.branches}</p>
              <p className="font-body text-body-sm text-on-surface-variant tabular-nums">{company.seats}</p>
            </article>
          </section>

          {/* Identity & Contact Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Basic Identity & Statutory */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm p-6 flex flex-col gap-4 h-full">
              <div className="pb-3 border-b border-outline-variant">
                <h2 className="font-headline text-headline-sm text-primary">Identity &amp; Statutory</h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Registered corporate classification and compliance numbers
                </p>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <dt className="font-label text-label-sm text-on-surface-variant">Company Code</dt>
                  <dd className="font-mono text-mono-md text-primary">{company.code}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="font-label text-label-sm text-on-surface-variant">Company Type</dt>
                  <dd className="font-body text-body-md text-on-surface">{company.type}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="font-label text-label-sm text-on-surface-variant">GSTIN</dt>
                  <dd className="font-mono text-mono-md text-on-surface">{company.gstin}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="font-label text-label-sm text-on-surface-variant">PAN Number</dt>
                  <dd className="font-mono text-mono-md text-on-surface">{company.pan}</dd>
                </div>
              </dl>
            </section>

            {/* Contact & Registered Address */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm p-6 flex flex-col gap-4 h-full">
              <div className="pb-3 border-b border-outline-variant">
                <h2 className="font-headline text-headline-sm text-primary">Contact &amp; Address</h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Primary communication channels and office location
                </p>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <dt className="font-label text-label-sm text-on-surface-variant">Official Email</dt>
                  <dd className="font-body text-body-md text-on-surface">{company.email}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="font-label text-label-sm text-on-surface-variant">Phone Number</dt>
                  <dd className="font-body text-body-md text-on-surface tabular-nums">{company.phone}</dd>
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <dt className="font-label text-label-sm text-on-surface-variant">Registered Office Address</dt>
                  <dd className="font-body text-body-md text-on-surface">{company.address}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="font-label text-label-sm text-on-surface-variant">City &amp; State</dt>
                  <dd className="font-body text-body-md text-on-surface">{company.cityState}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="font-label text-label-sm text-on-surface-variant">Pincode</dt>
                  <dd className="font-mono text-mono-md text-on-surface tabular-nums">{company.pincode}</dd>
                </div>
              </dl>
            </section>
          </div>

          {/* Subscription & Database Info */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm p-6 flex flex-col gap-4">
            <div className="pb-3 border-b border-outline-variant flex items-center justify-between gap-4">
              <div>
                <h2 className="font-headline text-headline-sm text-primary">
                  Subscription &amp; Tenant Environment
                </h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Contract validity, billing tier, and isolated database status
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label text-label-sm">
                <span
                  className="material-symbols-outlined text-title-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  check_circle
                </span>
                <span>{company.dbStatus}</span>
              </span>
            </div>

            <dl className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1">
                <dt className="font-label text-label-sm text-on-surface-variant">Plan Tier</dt>
                <dd className="font-body text-body-md text-primary">{company.planFull}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-label text-label-sm text-on-surface-variant">Start Date</dt>
                <dd className="font-body text-body-md text-on-surface tabular-nums">{company.startDate}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-label text-label-sm text-on-surface-variant">Expiry Date</dt>
                <dd className="font-body text-body-md text-on-surface tabular-nums">{company.expiryDate}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-label text-label-sm text-on-surface-variant">Tenant Region</dt>
                <dd className="font-mono text-mono-md text-on-surface">{company.region}</dd>
              </div>
            </dl>
          </section>
        </main>
      </div>
    </div>
  );
}
