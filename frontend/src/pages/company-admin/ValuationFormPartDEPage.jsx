import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

const initialAmenities = [
  {
    id: 1,
    name: 'Compound Wall & MS Gate',
    spec: '280 Rft Brick Wall (6 ft height) + Heavy MS Sliding Gate',
    glrValue: 190000,
    pmrValue: 245000,
  },
  {
    id: 2,
    name: 'Borewell & Submersible Motor',
    spec: '220 ft Deep 6" Borewell with 1.5 HP Texmo Pump',
    glrValue: 85000,
    pmrValue: 115000,
  },
  {
    id: 3,
    name: 'Underground RCC Sump & OHT',
    spec: '12,000 Litre RCC Sump + 2,000 Litre Sintex OHT',
    glrValue: 95000,
    pmrValue: 120000,
  },
  {
    id: 4,
    name: 'Interlock Paver Driveway',
    spec: '850 Sq.ft Heavy-Duty 60mm Concrete Pavers',
    glrValue: 50000,
    pmrValue: 70000,
  },
];

const initialServices = [
  {
    id: 1,
    category: '3-Phase Concealed Electrical',
    make: 'Finolex FRLS Wiring, Legrand Modular DB & Earthing',
    glrValue: 135000,
    pmrValue: 175000,
  },
  {
    id: 2,
    category: 'Sanitary & CPVC Plumbing',
    make: 'Jaquar CP Fittings, Hindware Sanitaryware (4 Bathrooms)',
    glrValue: 115000,
    pmrValue: 155000,
  },
  {
    id: 3,
    category: 'Rooftop Solar & Inverter Backup',
    make: '3 kW On-Grid Solar Panels + Luminous Hybrid Inverter',
    glrValue: 75000,
    pmrValue: 105000,
  },
  {
    id: 4,
    category: 'Rainwater Harvesting & Septic',
    make: '2 Percolation Pits + 10-User RCC Septic Tank',
    glrValue: 25000,
    pmrValue: 35000,
  },
];

export default function ValuationFormPartDEPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const bankParam = searchParams.get('bank');
  const bankName = bankParam || 'Canara Bank — Hi Tech Agri Finance Branch';

  // Part D: Amenities State
  const [amenities, setAmenities] = useState(initialAmenities);

  // Part E: Services State
  const [services, setServices] = useState(initialServices);

  // UI Feedback States
  const [draftSaved, setDraftSaved] = useState(false);
  const [showNextToast, setShowNextToast] = useState(false);

  useEffect(() => {
    document.title = `Valuation Form — Part D & E: Amenities & Services — ${bankName} — TrueArk`;
  }, [bankName]);

  const formatINR = (val) => {
    const num = Math.round(Number(val) || 0);
    return '₹' + num.toLocaleString('en-IN');
  };

  // Handlers for Part D (Amenities)
  const handleAmenityChange = (id, field, value) => {
    setAmenities((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleAddAmenity = () => {
    const newId = amenities.length > 0 ? Math.max(...amenities.map((a) => a.id)) + 1 : 1;
    setAmenities([
      ...amenities,
      {
        id: newId,
        name: 'Landscaping & Garden Lightings',
        spec: 'Lawn Area with Automated Sprinklers',
        glrValue: 40000,
        pmrValue: 60000,
      },
    ]);
  };

  const handleRemoveAmenity = (id) => {
    if (amenities.length <= 1) return;
    setAmenities(amenities.filter((a) => a.id !== id));
  };

  // Handlers for Part E (Services)
  const handleServiceChange = (id, field, value) => {
    setServices((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleAddService = () => {
    const newId = services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1;
    setServices([
      ...services,
      {
        id: newId,
        category: 'CCTV Surveillance & Security',
        make: '8-Channel 4MP IP Cameras with 2TB NVR',
        glrValue: 30000,
        pmrValue: 45000,
      },
    ]);
  };

  const handleRemoveService = (id) => {
    if (services.length <= 1) return;
    setServices(services.filter((s) => s.id !== id));
  };

  // Auto-calculated totals
  const totalGlrPartD = amenities.reduce((acc, a) => acc + (parseFloat(a.glrValue) || 0), 0);
  const totalPmrPartD = amenities.reduce((acc, a) => acc + (parseFloat(a.pmrValue) || 0), 0);

  const totalGlrPartE = services.reduce((acc, s) => acc + (parseFloat(s.glrValue) || 0), 0);
  const totalPmrPartE = services.reduce((acc, s) => acc + (parseFloat(s.pmrValue) || 0), 0);

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  };

  const handleNextPartF = () => {
    setShowNextToast(true);
    setTimeout(() => {
      setShowNextToast(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body antialiased">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-30 bg-surface-container-lowest border-b border-outline-variant shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <Link
              to="/company-admin/valuation"
              className="shrink-0 flex items-center hover:opacity-90 transition-opacity"
              title="Back to Valuations"
            >
              <img
                src="/company-logo.png"
                alt="TrueArk"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>
            <span className="h-5 sm:h-6 w-px bg-outline-variant shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                <h1 className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-primary truncate">
                  Bank Valuation Form — {bankName}
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-surface-container-low border border-outline-variant font-mono text-[11px] sm:text-[12px] text-on-surface-variant tabular-nums">
                  #TA-2026-089
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              id="save-draft-btn"
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded bg-surface-container-lowest border border-outline-variant text-primary font-label text-label-md hover:bg-surface-container-low transition-colors duration-state-change whitespace-nowrap cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                {draftSaved ? 'check_circle' : 'save'}
              </span>
              <span>{draftSaved ? 'Draft Saved' : 'Save Draft'}</span>
            </button>

            <button
              type="button"
              onClick={handleNextPartF}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded bg-tertiary text-on-tertiary font-label text-label-md hover:opacity-95 transition-colors duration-state-change whitespace-nowrap cursor-pointer shadow-xs"
            >
              <span>Next: Part F Summary</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* 6-Step Horizontal Progress Stepper */}
        <nav aria-label="Valuation Form Steps" className="bg-surface border-t border-outline-variant overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-2.5">
            <ol className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 min-w-[620px] lg:min-w-0">
              {/* Step 1: Completed */}
              <li>
                <Link
                  to={`/company-admin/valuation/new?bank=${encodeURIComponent(bankName)}`}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-surface-container-lowest border border-secondary/40 hover:bg-surface-container-low transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  </span>
                  <span className="font-label text-[11px] sm:text-label-sm text-on-secondary-container leading-tight truncate">
                    1. Part A: General
                  </span>
                </Link>
              </li>

              {/* Step 2: Completed */}
              <li>
                <Link
                  to={`/company-admin/valuation/new/part-b?bank=${encodeURIComponent(bankName)}`}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-surface-container-lowest border border-secondary/40 hover:bg-surface-container-low transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  </span>
                  <span className="font-label text-[11px] sm:text-label-sm text-on-secondary-container leading-tight truncate">
                    2. Part B: Land &amp; GLR
                  </span>
                </Link>
              </li>

              {/* Step 3: Completed */}
              <li>
                <Link
                  to={`/company-admin/valuation/new/part-c?bank=${encodeURIComponent(bankName)}`}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-surface-container-lowest border border-secondary/40 hover:bg-surface-container-low transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  </span>
                  <span className="font-label text-[11px] sm:text-label-sm text-on-secondary-container leading-tight truncate">
                    3. Part C: Building
                  </span>
                </Link>
              </li>

              {/* Step 4: Active */}
              <li aria-current="step" className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-primary-container border border-primary">
                <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 font-label text-[11px] tabular-nums font-bold">
                  4
                </span>
                <span className="font-label text-[11px] sm:text-label-sm text-primary font-semibold leading-tight truncate">
                  4. Part D &amp; E: Amenities
                </span>
              </li>

              {/* Step 5: Pending */}
              <li className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-surface-container-lowest border border-outline-variant opacity-80">
                <span className="w-5 h-5 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center shrink-0 font-label text-[11px] tabular-nums">
                  5
                </span>
                <span className="font-label text-[11px] sm:text-label-sm text-on-surface-variant leading-tight truncate">
                  5. Part F: Summary
                </span>
              </li>

              {/* Step 6: Pending */}
              <li className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-surface-container-lowest border border-outline-variant opacity-80">
                <span className="w-5 h-5 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center shrink-0 font-label text-[11px] tabular-nums">
                  6
                </span>
                <span className="font-label text-[11px] sm:text-label-sm text-on-surface-variant leading-tight truncate">
                  6. Form-A: Declaration
                </span>
              </li>
            </ol>
          </div>
        </nav>
      </header>

      {/* Next Step Info Toast */}
      {showNextToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-primary text-on-primary px-4 py-3 rounded-md shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-3 duration-200">
          <span className="material-symbols-outlined text-[20px] text-secondary">check_circle</span>
          <span className="font-body text-body-sm">
            Part D &amp; E saved. Proceeding to Part F: Abstract &amp; Summary...
          </span>
        </div>
      )}

      {/* Main Form Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 flex flex-col gap-3">
        {/* Card 1: Part D — Amenities & Extra Items */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-md p-4 sm:p-5 shadow-xs flex flex-col gap-3.5 sm:gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant pb-3 sm:pb-3.5">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">deck</span>
              </span>
              <div>
                <h2 className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-primary">
                  Part D — Amenities &amp; Extra Items
                </h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Boundary compound wall, borewell, underground sump, and external site paving.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant font-label text-label-md text-primary tabular-nums">
                Part D PMR: {formatINR(totalPmrPartD)}
              </span>
              <button
                type="button"
                onClick={handleAddAmenity}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-lowest border border-outline-variant text-primary text-[12px] font-label hover:bg-surface-container-low transition-colors"
                title="Add Extra Amenity"
              >
                <span className="material-symbols-outlined text-[15px]">add</span>
                <span>Add Item</span>
              </button>
            </div>
          </div>

          <div className="border border-outline-variant rounded-md overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead className="bg-surface-container-low border-b border-outline-variant">
                <tr>
                  <th scope="col" className="px-3.5 py-2.5 font-label text-label-md text-on-surface-variant">
                    Amenity / Extra Item
                  </th>
                  <th scope="col" className="px-3.5 py-2.5 font-label text-label-md text-on-surface-variant">
                    Specification / Quantity
                  </th>
                  <th scope="col" className="px-3.5 py-2.5 font-label text-label-md text-on-surface-variant text-right">
                    GLR Value (₹)
                  </th>
                  <th scope="col" className="px-3.5 py-2.5 font-label text-label-md text-on-surface-variant text-right">
                    PMR Value (₹)
                  </th>
                  <th scope="col" className="px-2 py-2.5 w-10 text-center font-label text-label-md text-on-surface-variant">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {amenities.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="px-3.5 py-2.5 font-label text-label-md text-primary font-medium">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleAmenityChange(item.id, 'name', e.target.value)}
                        className="w-full bg-transparent border-0 border-b border-transparent hover:border-outline-variant focus:border-primary px-1 py-0.5 text-primary font-medium focus:outline-none transition-colors"
                      />
                    </td>
                    <td className="px-3.5 py-2.5 font-body text-body-md text-on-surface-variant">
                      <input
                        type="text"
                        value={item.spec}
                        onChange={(e) => handleAmenityChange(item.id, 'spec', e.target.value)}
                        className="w-full bg-transparent border-0 border-b border-transparent hover:border-outline-variant focus:border-primary px-1 py-0.5 text-on-surface-variant focus:outline-none transition-colors"
                      />
                    </td>
                    <td className="px-3.5 py-2.5 font-mono text-mono-md text-primary text-right tabular-nums">
                      <div className="inline-flex items-center justify-end">
                        <span className="text-on-surface-variant mr-0.5">₹</span>
                        <input
                          type="number"
                          value={item.glrValue}
                          onChange={(e) => handleAmenityChange(item.id, 'glrValue', parseFloat(e.target.value) || 0)}
                          className="w-24 bg-transparent border-0 border-b border-transparent hover:border-outline-variant focus:border-primary px-1 py-0.5 text-right font-mono text-mono-md text-primary focus:outline-none transition-colors"
                        />
                      </div>
                    </td>
                    <td className="px-3.5 py-2.5 font-label text-label-lg text-on-secondary-container text-right tabular-nums font-semibold">
                      <div className="inline-flex items-center justify-end">
                        <span className="text-on-secondary-container mr-0.5">₹</span>
                        <input
                          type="number"
                          value={item.pmrValue}
                          onChange={(e) => handleAmenityChange(item.id, 'pmrValue', parseFloat(e.target.value) || 0)}
                          className="w-24 bg-transparent border-0 border-b border-transparent hover:border-outline-variant focus:border-primary px-1 py-0.5 text-right font-label text-label-lg text-on-secondary-container font-semibold focus:outline-none transition-colors"
                        />
                      </div>
                    </td>
                    <td className="px-2 py-2.5 text-center">
                      {amenities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveAmenity(item.id)}
                          className="text-outline hover:text-error transition-colors p-1"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}

                {/* Total Row Part D */}
                <tr className="bg-primary-container/40 border-t-2 border-primary/20">
                  <td colSpan={2} className="px-3.5 py-3 font-headline text-title-md text-primary font-semibold">
                    Total Part D (Amenities &amp; Extra Items)
                  </td>
                  <td className="px-3.5 py-3 font-headline text-headline-sm text-primary text-right tabular-nums font-bold">
                    {formatINR(totalGlrPartD)}
                  </td>
                  <td className="px-3.5 py-3 font-headline text-headline-sm text-on-secondary-container text-right tabular-nums font-bold">
                    {formatINR(totalPmrPartD)}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Card 2: Part E — Building Services */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-md p-4 sm:p-5 shadow-xs flex flex-col gap-3.5 sm:gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant pb-3 sm:pb-3.5">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">electrical_services</span>
              </span>
              <div>
                <h2 className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-primary">
                  Part E — Building Services &amp; Utilities
                </h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Electrical installations, sanitary plumbing, solar backup, and rainwater harvesting.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant font-label text-label-md text-primary tabular-nums">
                Part E PMR: {formatINR(totalPmrPartE)}
              </span>
              <button
                type="button"
                onClick={handleAddService}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-lowest border border-outline-variant text-primary text-[12px] font-label hover:bg-surface-container-low transition-colors"
                title="Add Extra Service"
              >
                <span className="material-symbols-outlined text-[15px]">add</span>
                <span>Add Item</span>
              </button>
            </div>
          </div>

          <div className="border border-outline-variant rounded-md overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead className="bg-surface-container-low border-b border-outline-variant">
                <tr>
                  <th scope="col" className="px-3.5 py-2.5 font-label text-label-md text-on-surface-variant">
                    Service Category
                  </th>
                  <th scope="col" className="px-3.5 py-2.5 font-label text-label-md text-on-surface-variant">
                    Installed Capacity / Make
                  </th>
                  <th scope="col" className="px-3.5 py-2.5 font-label text-label-md text-on-surface-variant text-right">
                    GLR Value (₹)
                  </th>
                  <th scope="col" className="px-3.5 py-2.5 font-label text-label-md text-on-surface-variant text-right">
                    PMR Value (₹)
                  </th>
                  <th scope="col" className="px-2 py-2.5 w-10 text-center font-label text-label-md text-on-surface-variant">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="px-3.5 py-2.5 font-label text-label-md text-primary font-medium">
                      <input
                        type="text"
                        value={service.category}
                        onChange={(e) => handleServiceChange(service.id, 'category', e.target.value)}
                        className="w-full bg-transparent border-0 border-b border-transparent hover:border-outline-variant focus:border-primary px-1 py-0.5 text-primary font-medium focus:outline-none transition-colors"
                      />
                    </td>
                    <td className="px-3.5 py-2.5 font-body text-body-md text-on-surface-variant">
                      <input
                        type="text"
                        value={service.make}
                        onChange={(e) => handleServiceChange(service.id, 'make', e.target.value)}
                        className="w-full bg-transparent border-0 border-b border-transparent hover:border-outline-variant focus:border-primary px-1 py-0.5 text-on-surface-variant focus:outline-none transition-colors"
                      />
                    </td>
                    <td className="px-3.5 py-2.5 font-mono text-mono-md text-primary text-right tabular-nums">
                      <div className="inline-flex items-center justify-end">
                        <span className="text-on-surface-variant mr-0.5">₹</span>
                        <input
                          type="number"
                          value={service.glrValue}
                          onChange={(e) => handleServiceChange(service.id, 'glrValue', parseFloat(e.target.value) || 0)}
                          className="w-24 bg-transparent border-0 border-b border-transparent hover:border-outline-variant focus:border-primary px-1 py-0.5 text-right font-mono text-mono-md text-primary focus:outline-none transition-colors"
                        />
                      </div>
                    </td>
                    <td className="px-3.5 py-2.5 font-label text-label-lg text-on-secondary-container text-right tabular-nums font-semibold">
                      <div className="inline-flex items-center justify-end">
                        <span className="text-on-secondary-container mr-0.5">₹</span>
                        <input
                          type="number"
                          value={service.pmrValue}
                          onChange={(e) => handleServiceChange(service.id, 'pmrValue', parseFloat(e.target.value) || 0)}
                          className="w-24 bg-transparent border-0 border-b border-transparent hover:border-outline-variant focus:border-primary px-1 py-0.5 text-right font-label text-label-lg text-on-secondary-container font-semibold focus:outline-none transition-colors"
                        />
                      </div>
                    </td>
                    <td className="px-2 py-2.5 text-center">
                      {services.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveService(service.id)}
                          className="text-outline hover:text-error transition-colors p-1"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}

                {/* Total Row Part E */}
                <tr className="bg-primary-container/40 border-t-2 border-primary/20">
                  <td colSpan={2} className="px-3.5 py-3 font-headline text-title-md text-primary font-semibold">
                    Total Part E (Building Services)
                  </td>
                  <td className="px-3.5 py-3 font-headline text-headline-sm text-primary text-right tabular-nums font-bold">
                    {formatINR(totalGlrPartE)}
                  </td>
                  <td className="px-3.5 py-3 font-headline text-headline-sm text-on-secondary-container text-right tabular-nums font-bold">
                    {formatINR(totalPmrPartE)}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom Navigation Actions */}
        <div className="flex items-center justify-between gap-3 pt-1 pb-4">
          <Link
            to={`/company-admin/valuation/new/part-c?bank=${encodeURIComponent(bankName)}`}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded bg-surface-container-lowest border border-outline-variant text-primary font-label text-label-md hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Previous: Part C Building</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded bg-surface-container-lowest border border-outline-variant text-primary font-label text-label-md hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                {draftSaved ? 'check_circle' : 'save'}
              </span>
              <span>{draftSaved ? 'Draft Saved' : 'Save Draft'}</span>
            </button>

            <button
              type="button"
              onClick={handleNextPartF}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-tertiary text-on-tertiary font-label text-label-md hover:opacity-95 transition-colors cursor-pointer shadow-sm"
            >
              <span>Next: Part F Summary</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
