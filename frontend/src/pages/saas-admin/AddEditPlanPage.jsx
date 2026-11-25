import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SaasAdminSidebar from '../../components/saas-admin/SaasAdminSidebar';

const plansDetailMap = {
  'PLN-STR': {
    code: 'PLN-STR',
    name: 'Starter Valuer',
    tagline: 'Solo practitioners and emerging practices',
    cycle: 'Monthly',
    price: '2499',
    gst: '18',
    trialDays: '14',
    maxUsers: '3',
    maxBranches: '1',
    quota: '50',
    isActive: true,
    features: [
      'Single Branch Workflow',
      'Standard Valuation Reports',
      'Email Support',
    ],
  },
  'PLN-PRO': {
    code: 'PLN-PRO',
    name: 'Pro Valuation Firm',
    tagline: 'Growing multi-branch teams',
    cycle: 'Monthly',
    price: '7999',
    gst: '18',
    trialDays: '14',
    maxUsers: '15',
    maxBranches: '5',
    quota: '300',
    isActive: true,
    features: [
      'Multi-Branch Approval Flow',
      'Bank-Grade Branded PDF',
      'Market Rate Comp Intelligence',
    ],
  },
  'PLN-ENT': {
    code: 'PLN-ENT',
    name: 'Enterprise / Bank',
    tagline: 'Large institutions and national valuation networks',
    cycle: 'Monthly',
    price: '19999',
    gst: '18',
    trialDays: '30',
    maxUsers: '100',
    maxBranches: '25',
    quota: '1000',
    isActive: true,
    features: [
      'Unlimited Branches & Users',
      'Custom API & Core Banking Integration',
      'Dedicated Account Manager & 24/7 SLA',
      'Automated Audit & Compliance Export',
    ],
  },
};

export default function AddEditPlanPage() {
  const navigate = useNavigate();
  const { code } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const initialPlan = (code && plansDetailMap[code]) || plansDetailMap['PLN-PRO'];

  // Form State
  const [planCode, setPlanCode] = useState(initialPlan.code);
  const [planName, setPlanName] = useState(initialPlan.name);
  const [tagline, setTagline] = useState(initialPlan.tagline);
  const [billingCycle, setBillingCycle] = useState(initialPlan.cycle);
  const [price, setPrice] = useState(initialPlan.price);
  const [gst, setGst] = useState(initialPlan.gst);
  const [trialDays, setTrialDays] = useState(initialPlan.trialDays);

  const [maxUsers, setMaxUsers] = useState(initialPlan.maxUsers);
  const [maxBranches, setMaxBranches] = useState(initialPlan.maxBranches);
  const [valuationQuota, setValuationQuota] = useState(initialPlan.quota);
  const [isActivePlan, setIsActivePlan] = useState(initialPlan.isActive);

  // Features List State
  const [features, setFeatures] = useState(initialPlan.features);
  const [newFeatureText, setNewFeatureText] = useState('');

  // Update if code param changes
  useEffect(() => {
    if (code && plansDetailMap[code]) {
      const p = plansDetailMap[code];
      setPlanCode(p.code);
      setPlanName(p.name);
      setTagline(p.tagline);
      setBillingCycle(p.cycle);
      setPrice(p.price);
      setGst(p.gst);
      setTrialDays(p.trialDays);
      setMaxUsers(p.maxUsers);
      setMaxBranches(p.maxBranches);
      setValuationQuota(p.quota);
      setIsActivePlan(p.isActive);
      setFeatures(p.features);
    }
  }, [code]);

  const handleAddFeature = (e) => {
    e.preventDefault();
    const trimmed = newFeatureText.trim();
    if (!trimmed) return;
    setFeatures((prev) => [...prev, trimmed]);
    setNewFeatureText('');
  };

  const handleRemoveFeature = (indexToRemove) => {
    setFeatures((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving subscription plan:', {
      planCode,
      planName,
      tagline,
      billingCycle,
      price,
      gst,
      trialDays,
      maxUsers,
      maxBranches,
      valuationQuota,
      isActivePlan,
      features,
    });

    navigate('/saas-admin/plan-master');
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
              to="/saas-admin/plan-master"
              className="inline-flex items-center gap-1.5 font-label text-label-sm text-tertiary hover:underline w-fit"
            >
              <span className="material-symbols-outlined text-title-sm" aria-hidden="true">
                arrow_back
              </span>
              <span>Back to Plan Master</span>
            </Link>
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
                {code ? 'Edit Subscription Plan' : 'Add Subscription Plan'}
              </h1>
            </div>
            <p className="font-body text-body-sm text-on-surface-variant pl-10 lg:pl-0">
              Configure pricing, usage limits, and included plan features
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
            <Link
              to="/saas-admin/plan-master"
              className="flex-1 sm:flex-none px-4 py-2 rounded bg-surface-container-lowest border border-outline-variant text-primary font-label text-label-md hover:bg-surface-container-low transition-colors duration-state-change whitespace-nowrap text-center"
            >
              <span>Cancel</span>
            </Link>

            <button
              type="submit"
              form="add-edit-plan-form"
              className="flex-1 sm:flex-none px-5 py-2 rounded bg-primary text-on-primary font-label text-label-md hover:opacity-95 transition-colors duration-state-change whitespace-nowrap text-center"
            >
              <span>Save Plan</span>
            </button>
          </div>
        </header>

        {/* Main Form Workspace */}
        <main className="p-6 lg:p-8 flex-1">
          <form id="add-edit-plan-form" className="max-w-5xl flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* 1. Plan Identity & Billing */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm p-6 flex flex-col gap-5">
              <div className="pb-3 border-b border-outline-variant">
                <h2 className="font-headline text-headline-sm text-primary">Plan Identity &amp; Billing</h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Tier identifier, display name, billing cadence, and pricing
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">Plan Code</span>
                  <input
                    type="text"
                    value={planCode}
                    onChange={(e) => setPlanCode(e.target.value)}
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-mono-md text-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>

                <label className="flex flex-col gap-1.5 md:col-span-2">
                  <span className="font-label text-label-sm text-on-surface">Plan Name</span>
                  <input
                    type="text"
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-sm text-on-surface">Tagline</span>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">Billing Cycle</span>
                  <select
                    value={billingCycle}
                    onChange={(e) => setBillingCycle(e.target.value)}
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">Price (INR)</span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-mono-md text-primary tabular-nums focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">GST %</span>
                  <input
                    type="number"
                    value={gst}
                    onChange={(e) => setGst(e.target.value)}
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-mono-md text-on-surface tabular-nums focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">Trial Days</span>
                  <input
                    type="number"
                    value={trialDays}
                    onChange={(e) => setTrialDays(e.target.value)}
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-mono-md text-on-surface tabular-nums focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              </div>
            </section>

            {/* 2. Usage Quotas & Limits */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm p-6 flex flex-col gap-5">
              <div className="pb-3 border-b border-outline-variant">
                <h2 className="font-headline text-headline-sm text-primary">Usage Quotas &amp; Limits</h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Seat allocation, branch caps, and monthly valuation volume
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">Max Users</span>
                  <input
                    type="number"
                    value={maxUsers}
                    onChange={(e) => setMaxUsers(e.target.value)}
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-mono-md text-on-surface tabular-nums focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">Max Branches</span>
                  <input
                    type="number"
                    value={maxBranches}
                    onChange={(e) => setMaxBranches(e.target.value)}
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-mono-md text-on-surface tabular-nums focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">Monthly Valuation Quota</span>
                  <input
                    type="number"
                    value={valuationQuota}
                    onChange={(e) => setValuationQuota(e.target.value)}
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-mono-md text-on-surface tabular-nums focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-outline-variant">
                <div>
                  <p className="font-label text-label-md text-on-surface">Active Plan Status</p>
                  <p className="font-body text-body-sm text-on-surface-variant">
                    Make this subscription tier available for new tenant onboarding
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActivePlan}
                    onChange={(e) => setIsActivePlan(e.target.checked)}
                    className="sr-only peer"
                    aria-label="Active Plan Status"
                  />
                  <div className="w-10 h-5 bg-surface-container rounded-full peer peer-checked:bg-secondary after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-surface-container-lowest after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:after:translate-x-5"></div>
                </label>
              </div>
            </section>

            {/* 3. Plan Features List Builder */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm p-6 flex flex-col gap-4">
              <div className="pb-3 border-b border-outline-variant">
                <h2 className="font-headline text-headline-sm text-primary">Plan Features</h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Add or remove capabilities displayed on the pricing card and tenant portal
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={newFeatureText}
                  onChange={(e) => setNewFeatureText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddFeature(e);
                    }
                  }}
                  placeholder="Type a plan feature (e.g., Custom Branded PDF Reports)..."
                  className="flex-1 min-w-0 rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-4 py-2 rounded bg-secondary-container text-on-secondary-container font-label text-label-md hover:opacity-90 whitespace-nowrap"
                >
                  + Add Feature
                </button>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between gap-2 rounded bg-surface px-3.5 py-2.5 border border-outline-variant"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="material-symbols-outlined text-secondary text-title-sm shrink-0"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                        aria-hidden="true"
                      >
                        check_circle
                      </span>
                      <span className="font-body text-body-sm text-on-surface truncate">{feature}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      aria-label={`Remove feature ${feature}`}
                      className="text-outline hover:text-error shrink-0"
                    >
                      <span className="material-symbols-outlined text-title-sm">close</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            {/* Bottom Action Bar */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Link
                to="/saas-admin/plan-master"
                className="px-4 py-2 rounded bg-surface-container-lowest border border-outline-variant text-primary font-label text-label-md hover:bg-surface-container-low transition-colors duration-state-change whitespace-nowrap"
              >
                <span>Cancel</span>
              </Link>

              <button
                type="submit"
                className="px-5 py-2 rounded bg-primary text-on-primary font-label text-label-md hover:opacity-95 transition-colors duration-state-change whitespace-nowrap"
              >
                <span>Save Plan</span>
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
