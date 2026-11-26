import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SaasAdminSidebar from '../../components/saas-admin/SaasAdminSidebar';

const plansData = [
  {
    code: 'PLN-STR',
    name: 'Starter Valuer',
    limits: '3 Users / 1 Branch',
    status: 'Active',
    monthly: {
      price: '₹2,499',
      cycle: 'Monthly',
      quota: '50 / month',
    },
    yearly: {
      price: '₹24,990',
      cycle: 'Yearly',
      quota: '600 / year',
    },
  },
  {
    code: 'PLN-PRO',
    name: 'Pro Valuation Firm',
    limits: '15 Users / 5 Branches',
    status: 'Active',
    monthly: {
      price: '₹7,999',
      cycle: 'Monthly',
      quota: '300 / month',
    },
    yearly: {
      price: '₹79,990',
      cycle: 'Yearly',
      quota: '3,600 / year',
    },
  },
  {
    code: 'PLN-ENT',
    name: 'Enterprise / Bank',
    limits: 'Unlimited',
    status: 'Active',
    monthly: {
      price: '₹19,999',
      cycle: 'Monthly',
      quota: 'Unlimited',
    },
    yearly: {
      price: '₹1,99,990',
      cycle: 'Yearly',
      quota: 'Unlimited',
    },
  },
];

export default function PlanMasterPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-surface text-on-surface font-body antialiased overflow-hidden relative">
      {/* Left Navigation Sidebar */}
      <SaasAdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Column */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        {/* Top Header */}
        <header className="bg-surface-container-lowest border-b border-outline-variant px-3 sm:px-4 lg:px-5 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-3">
          <div className="flex flex-col gap-0.5">
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
                Plan Master
              </h1>
            </div>
            <p className="font-body text-body-sm text-on-surface-variant pl-10 lg:pl-0">
              Configure SaaS subscription tiers, valuation quotas, and included plan features
            </p>
          </div>

          {/* Action buttons in a single row */}
          <div className="flex items-center gap-2 sm:gap-2.5 w-full sm:w-auto justify-between sm:justify-start">
            {/* Billing Cycle Toggle Pill */}
            <div
              className="inline-flex items-center rounded-full bg-surface-container-low p-1 border border-outline-variant shrink-0"
              role="group"
              aria-label="Billing Cycle"
            >
              <button
                type="button"
                id="btn-monthly"
                onClick={() => setBillingCycle('monthly')}
                className={`px-3 sm:px-3.5 py-1.5 rounded-full font-label text-label-sm transition-colors duration-state-change whitespace-nowrap ${
                  billingCycle === 'monthly'
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                id="btn-yearly"
                onClick={() => setBillingCycle('yearly')}
                className={`px-3 sm:px-3.5 py-1.5 rounded-full font-label text-label-sm transition-colors duration-state-change whitespace-nowrap ${
                  billingCycle === 'yearly'
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Yearly
              </button>
            </div>

            {/* Primary Create Button */}
            <Link
              to="/saas-admin/plan-master/add"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded bg-tertiary text-on-tertiary font-label text-label-md hover:opacity-95 transition-colors duration-state-change whitespace-nowrap shrink-0"
            >
              <span className="material-symbols-outlined text-title-sm" aria-hidden="true">
                add
              </span>
              <span>Create New Plan</span>
            </Link>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="p-3 sm:p-4 flex-1 flex flex-col gap-3">
          {/* Bottom Plan Master Table */}
          <section
            aria-label="All Subscription Plans"
            className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm overflow-hidden"
          >
            <div className="px-3.5 py-3 border-b border-outline-variant flex items-center justify-between gap-3">
              <h2 className="font-headline text-headline-sm text-primary">All Subscription Plans</h2>
              <span className="font-body text-body-sm text-on-surface-variant tabular-nums">
                {plansData.length} Active Plans
              </span>
            </div>

            <div className="rounded-md overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low border-b border-outline-variant">
                  <tr>
                    <th scope="col" className="px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                      Plan Code
                    </th>
                    <th scope="col" className="px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                      Plan Name
                    </th>
                    <th scope="col" className="px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                      Billing Cycle
                    </th>
                    <th scope="col" className="px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                      Price (INR)
                    </th>
                    <th scope="col" className="px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                      User &amp; Branch Limits
                    </th>
                    <th scope="col" className="px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                      Valuation Quota
                    </th>
                    <th scope="col" className="px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-2.5 font-label text-label-sm text-on-surface-variant text-right whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {plansData.map((plan) => {
                    const currentPlan = billingCycle === 'yearly' ? plan.yearly : plan.monthly;
                    return (
                      <tr
                        key={plan.code}
                        className="hover:bg-surface-container-low/50 transition-colors duration-state-change"
                      >
                        <td className="px-3 py-2.5 font-mono text-mono-md text-primary whitespace-nowrap">
                          {plan.code}
                        </td>
                        <td className="px-3 py-2.5 font-title text-title-sm text-primary whitespace-nowrap">
                          {plan.name}
                        </td>
                        <td className="px-3 py-2.5 font-body text-body-sm text-on-surface-variant whitespace-nowrap capitalize">
                          {currentPlan.cycle}
                        </td>
                        <td className="px-3 py-2.5 font-body text-body-sm text-primary tabular-nums whitespace-nowrap">
                          {currentPlan.price}
                        </td>
                        <td className="px-3 py-2.5 font-body text-body-sm text-on-surface whitespace-nowrap">
                          {plan.limits}
                        </td>
                        <td className="px-3 py-2.5 font-body text-body-sm text-on-surface-variant tabular-nums whitespace-nowrap">
                          {currentPlan.quota}
                        </td>
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-label-sm">
                            {plan.status}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-3">
                            <Link
                              to={`/saas-admin/plan-master/edit/${plan.code}`}
                              className="font-label text-label-sm text-primary hover:underline"
                            >
                              Edit
                            </Link>
                            <Link
                              to={`/saas-admin/plan-master/view/${plan.code}`}
                              className="font-label text-label-sm text-tertiary hover:underline"
                            >
                              View
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
