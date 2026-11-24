import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SaasAdminSidebar from '../../components/saas-admin/SaasAdminSidebar';

const plansViewDataMap = {
  'PLN-PRO': {
    code: 'PLN-PRO',
    name: 'Pro Valuation Firm',
    status: 'Active',
    priceSummary: '₹7,999 / month',
    priceTerms: '18% GST • 14-day free trial',
    quotasSummary: '15 Users • 5 Branches',
    valuationSummary: '300 Valuations / month',
    adoptionCount: '18 Companies',
    mrr: '₹1,43,982 Monthly Recurring',
    cycle: 'Monthly',
    tagline: 'Growing multi-branch teams',
    basePrice: '₹7,999',
    gstRate: '18%',
    maxUsers: '15 Users',
    maxBranches: '5 Branches',
    features: [
      'Multi-Branch Approval Flow',
      'Bank-Grade Branded PDF Reports',
      'Market Rate Comp Intelligence',
      'GIS Parcel Boundary Pinning',
      'Guideline Rate Lookup',
      'Role-Based Access Control',
    ],
    subscribedCompanies: [
      {
        name: 'Southern Land Advisors',
        codeAndExpiry: 'CMP-003 • Expires 14 Dec 2026',
        status: 'Trial',
      },
      {
        name: 'Deccan Realty Audit',
        codeAndExpiry: 'CMP-004 • Expired 01 Nov 2026',
        status: 'Expired',
      },
    ],
  },
  'PLN-STR': {
    code: 'PLN-STR',
    name: 'Starter Valuer',
    status: 'Active',
    priceSummary: '₹2,499 / month',
    priceTerms: '18% GST • 14-day free trial',
    quotasSummary: '3 Users • 1 Branch',
    valuationSummary: '50 Valuations / month',
    adoptionCount: '42 Companies',
    mrr: '₹1,04,958 Monthly Recurring',
    cycle: 'Monthly',
    tagline: 'Solo practitioners and emerging practices',
    basePrice: '₹2,499',
    gstRate: '18%',
    maxUsers: '3 Users',
    maxBranches: '1 Branch',
    features: [
      'Single Branch Workflow',
      'Standard Valuation Reports',
      'Guideline Rate Lookup',
      'Email Support',
    ],
    subscribedCompanies: [
      {
        name: 'Metro Surveyors',
        codeAndExpiry: 'CMP-005 • Active Renewal 10 Jan 2027',
        status: 'Active',
      },
    ],
  },
  'PLN-ENT': {
    code: 'PLN-ENT',
    name: 'Enterprise / Bank',
    status: 'Active',
    priceSummary: '₹19,999 / month',
    priceTerms: '18% GST • 30-day onboarding',
    quotasSummary: 'Unlimited Users • Unlimited Branches',
    valuationSummary: 'Unlimited Valuations / month',
    adoptionCount: '82 Companies',
    mrr: '₹16,39,918 Monthly Recurring',
    cycle: 'Monthly',
    tagline: 'Large institutions and national valuation networks',
    basePrice: '₹19,999',
    gstRate: '18%',
    maxUsers: 'Unlimited',
    maxBranches: 'Unlimited',
    features: [
      'Multi-Branch Approval Flow',
      'Bank-Grade Branded PDF Reports',
      'Market Rate Comp Intelligence',
      'GIS Parcel Boundary Pinning',
      'Guideline Rate Lookup',
      'Role-Based Access Control',
      'Custom API & Core Banking Integration',
      'Dedicated Account Manager & 24/7 SLA',
    ],
    subscribedCompanies: [
      {
        name: 'Apex Valuation Associates',
        codeAndExpiry: 'CMP-001 • Expires 31 Dec 2027',
        status: 'Active',
      },
      {
        name: 'Kaveri Housing Finance',
        codeAndExpiry: 'CMP-002 • Expires 15 Oct 2027',
        status: 'Active',
      },
    ],
  },
};

export default function PlanViewPage() {
  const { code } = useParams();
  const plan = plansViewDataMap[code] || plansViewDataMap['PLN-PRO'];

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
      <SaasAdminSidebar />

      {/* Main Content Column */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        {/* Contextual Header */}
        <header className="bg-surface-container-lowest border-b border-outline-variant px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <Link
              to="/saas-admin/plan-master"
              className="inline-flex items-center gap-1.5 font-label text-label-sm text-tertiary hover:underline w-fit"
            >
              <span className="material-symbols-outlined text-title-sm" aria-hidden="true">
                arrow_back
              </span>
              <span>Back to Plan Master</span>
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-headline text-headline-md text-primary">{plan.name}</h1>
              <span className="font-mono text-mono-md text-primary bg-surface-container-low px-2.5 py-0.5 rounded border border-outline-variant">
                {plan.code}
              </span>
              {getStatusBadge(plan.status)}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={`/saas-admin/plan-master/edit/${plan.code}`}
              className="px-5 py-2 rounded bg-primary text-on-primary font-label text-label-md hover:opacity-95 transition-colors duration-state-change whitespace-nowrap"
            >
              <span>Edit Plan</span>
            </Link>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="p-6 lg:p-8 flex-1 flex flex-col gap-6 max-w-6xl">
          {/* Summary Metrics Row */}
          <section aria-label="Plan Summary Metrics" className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            <article className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm p-5 flex flex-col justify-between gap-2 h-full">
              <span className="font-label text-label-sm text-on-surface-variant">Subscription Price</span>
              <p className="font-headline text-headline-md text-primary tabular-nums">{plan.priceSummary}</p>
              <p className="font-body text-body-sm text-on-surface-variant tabular-nums">{plan.priceTerms}</p>
            </article>

            <article className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm p-5 flex flex-col justify-between gap-2 h-full">
              <span className="font-label text-label-sm text-on-surface-variant">Usage Quotas</span>
              <p className="font-headline text-headline-md text-primary tabular-nums">{plan.quotasSummary}</p>
              <p className="font-body text-body-sm text-on-surface-variant tabular-nums">{plan.valuationSummary}</p>
            </article>

            <article className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm p-5 flex flex-col justify-between gap-2 h-full">
              <span className="font-label text-label-sm text-on-surface-variant">Active Tenant Adoption</span>
              <p className="font-headline text-headline-md text-primary tabular-nums">{plan.adoptionCount}</p>
              <p className="font-body text-body-sm text-tertiary tabular-nums">{plan.mrr}</p>
            </article>
          </section>

          {/* Plan Details & Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Plan Configuration */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm p-6 flex flex-col gap-4 h-full">
              <div className="pb-3 border-b border-outline-variant">
                <h2 className="font-headline text-headline-sm text-primary">Plan Configuration</h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Billing parameters, tax rules, and quota thresholds
                </p>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <dt className="font-label text-label-sm text-on-surface-variant">Plan Code</dt>
                  <dd className="font-mono text-mono-md text-primary">{plan.code}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="font-label text-label-sm text-on-surface-variant">Billing Cycle</dt>
                  <dd className="font-body text-body-md text-on-surface">{plan.cycle}</dd>
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <dt className="font-label text-label-sm text-on-surface-variant">Tagline</dt>
                  <dd className="font-body text-body-md text-on-surface">{plan.tagline}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="font-label text-label-sm text-on-surface-variant">Base Price (INR)</dt>
                  <dd className="font-mono text-mono-md text-primary tabular-nums">{plan.basePrice}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="font-label text-label-sm text-on-surface-variant">GST Rate</dt>
                  <dd className="font-mono text-mono-md text-on-surface tabular-nums">{plan.gstRate}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="font-label text-label-sm text-on-surface-variant">Max User Seats</dt>
                  <dd className="font-mono text-mono-md text-on-surface tabular-nums">{plan.maxUsers}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="font-label text-label-sm text-on-surface-variant">Max Branches</dt>
                  <dd className="font-mono text-mono-md text-on-surface tabular-nums">{plan.maxBranches}</dd>
                </div>
              </dl>
            </section>

            {/* Included Plan Features */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm p-6 flex flex-col gap-4 h-full">
              <div className="pb-3 border-b border-outline-variant">
                <h2 className="font-headline text-headline-sm text-primary">Included Plan Features</h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Capabilities unlocked for tenants subscribed to this tier
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 font-body text-body-md text-on-surface">
                    <span
                      className="material-symbols-outlined text-secondary text-title-md shrink-0"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                      aria-hidden="true"
                    >
                      check_circle
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Recent Subscribed Companies */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm p-6 flex flex-col gap-4">
            <div className="pb-3 border-b border-outline-variant flex items-center justify-between gap-4">
              <div>
                <h2 className="font-headline text-headline-sm text-primary">Subscribed Companies</h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Tenants currently provisioned on {plan.name}
                </p>
              </div>
              <Link
                to="/saas-admin/company-master"
                className="font-label text-label-md text-tertiary hover:underline whitespace-nowrap"
              >
                View All Companies
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plan.subscribedCompanies.map((company, idx) => (
                <div
                  key={idx}
                  className="rounded bg-surface border border-outline-variant p-4 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-title text-title-sm text-primary">{company.name}</p>
                    <p className="font-body text-body-sm text-on-surface-variant tabular-nums">
                      {company.codeAndExpiry}
                    </p>
                  </div>
                  {getStatusBadge(company.status)}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
