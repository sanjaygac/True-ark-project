import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

const initialFloors = [
  {
    id: 1,
    floor: 'Ground Floor (RCC)',
    area: 1750,
    glrRate: 1622,
    pmrRate: 2162,
    depreciatedGlr: 2625000,
    depreciatedPmr: 3500000,
  },
  {
    id: 2,
    floor: 'First Floor (RCC)',
    area: 1450,
    glrRate: 1622,
    pmrRate: 2162,
    depreciatedGlr: 2175000,
    depreciatedPmr: 2900000,
  },
];

export default function ValuationFormPartCPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const bankParam = searchParams.get('bank');
  const bankName = bankParam || 'Canara Bank — Hi Tech Agri Finance Branch';

  // Card 1: Building Specifications State
  const [constructionType, setConstructionType] = useState('RCC Framed Structure');
  const [numberOfFloors, setNumberOfFloors] = useState('Ground + First Floor (G+1)');
  const [yearOfConstruction, setYearOfConstruction] = useState(2021);
  const [presentAge, setPresentAge] = useState(5);
  const [residualLife, setResidualLife] = useState(55);
  const [condition, setCondition] = useState('Good (Well Maintained)');
  const [flooringStaircase, setFlooringStaircase] = useState('Vitrified Tiles & Granite Staircase');
  const [doorsWindows, setDoorsWindows] = useState('Teakwood Main Door & UPVC Windows');
  const [approvalNo, setApprovalNo] = useState('DTCP Permit #418/2021 (Approved)');

  // Card 2: Floor-Wise Table State
  const [floors, setFloors] = useState(initialFloors);

  // UI States
  const [draftSaved, setDraftSaved] = useState(false);
  const [showNextToast, setShowNextToast] = useState(false);

  useEffect(() => {
    document.title = `Valuation Form — Part C: Building — ${bankName} — TrueArk`;
  }, [bankName]);

  const formatINR = (val) => {
    const num = Math.round(Number(val) || 0);
    return '₹' + num.toLocaleString('en-IN');
  };

  const handleFloorChange = (id, field, value) => {
    setFloors((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const updated = { ...item, [field]: value };

        // Auto-calculate depreciated values if area or rates change
        if (field === 'area' || field === 'glrRate' || field === 'pmrRate') {
          const area = parseFloat(field === 'area' ? value : updated.area) || 0;
          const glr = parseFloat(field === 'glrRate' ? value : updated.glrRate) || 0;
          const pmr = parseFloat(field === 'pmrRate' ? value : updated.pmrRate) || 0;
          const depreciation = 0.075; // 7.5% depreciation for 5 years

          // Rounding to standard valuation increments
          updated.depreciatedGlr = Math.round((area * glr * (1 - depreciation)) / 1000) * 1000;
          updated.depreciatedPmr = Math.round((area * pmr * (1 - depreciation)) / 1000) * 1000;
        }

        return updated;
      })
    );
  };

  const handleAddFloor = () => {
    const newId = floors.length > 0 ? Math.max(...floors.map((f) => f.id)) + 1 : 1;
    setFloors([
      ...floors,
      {
        id: newId,
        floor: `Second Floor (RCC)`,
        area: 1200,
        glrRate: 1622,
        pmrRate: 2162,
        depreciatedGlr: 1800000,
        depreciatedPmr: 2400000,
      },
    ]);
  };

  const handleRemoveFloor = (id) => {
    if (floors.length <= 1) return;
    setFloors(floors.filter((f) => f.id !== id));
  };

  // Calculations
  const totalBuiltUp = floors.reduce((acc, f) => acc + (parseFloat(f.area) || 0), 0);
  const totalDepreciatedGlr = floors.reduce((acc, f) => acc + (parseFloat(f.depreciatedGlr) || 0), 0);
  const totalDepreciatedPmr = floors.reduce((acc, f) => acc + (parseFloat(f.depreciatedPmr) || 0), 0);

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  };

  const handleNextPartD = () => {
    setShowNextToast(true);
    setTimeout(() => {
      navigate(`/company-admin/valuation/new/part-d-e?bank=${encodeURIComponent(bankName)}`);
    }, 400);
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
              onClick={handleNextPartD}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded bg-tertiary text-on-tertiary font-label text-label-md hover:opacity-95 transition-colors duration-state-change whitespace-nowrap cursor-pointer shadow-xs"
            >
              <span>Next: Part D &amp; E Amenities</span>
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

              {/* Step 3: Active */}
              <li aria-current="step" className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-primary-container border border-primary">
                <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 font-label text-[11px] tabular-nums font-bold">
                  3
                </span>
                <span className="font-label text-[11px] sm:text-label-sm text-primary font-semibold leading-tight truncate">
                  3. Part C: Building
                </span>
              </li>

              {/* Step 4 */}
              <li className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-surface-container-lowest border border-outline-variant hover:border-primary/50 transition-colors">
                <Link
                  to={`/company-admin/valuation/new/part-d-e?bank=${encodeURIComponent(bankName)}`}
                  className="flex items-center gap-2 w-full"
                >
                  <span className="w-5 h-5 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center shrink-0 font-label text-[11px] tabular-nums">
                    4
                  </span>
                  <span className="font-label text-[11px] sm:text-label-sm text-on-surface-variant leading-tight truncate">
                    4. Part D &amp; E: Amenities
                  </span>
                </Link>
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
            Part C saved. Proceeding to Part D &amp; E: Amenities &amp; Services...
          </span>
        </div>
      )}

      {/* Main Form Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 flex flex-col gap-3">
        {/* Card 1: Building Specifications & Structural Details */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-md p-4 sm:p-5 shadow-xs flex flex-col gap-3.5 sm:gap-4">
          <div className="flex items-center gap-3 border-b border-outline-variant pb-3 sm:pb-3.5">
            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">apartment</span>
            </span>
            <div className="min-w-0">
              <h2 className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-primary truncate">
                Building Specifications &amp; Structural Details
              </h2>
              <p className="font-body text-body-sm text-on-surface-variant">
                Construction type, age, plan sanction compliance, and finishing specifications.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            {/* Type of Construction */}
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-sm sm:text-label-md text-on-surface">Type of Construction</span>
              <select
                value={constructionType}
                onChange={(e) => setConstructionType(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 sm:px-3.5 sm:py-2.5 font-body text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
              >
                <option value="RCC Framed Structure">RCC Framed Structure</option>
                <option value="Load-Bearing Brick Masonry">Load-Bearing Brick Masonry</option>
                <option value="Pre-Engineered Steel Shed">Pre-Engineered Steel Shed</option>
              </select>
            </label>

            {/* Number of Floors */}
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-sm sm:text-label-md text-on-surface">Number of Floors</span>
              <input
                type="text"
                value={numberOfFloors}
                onChange={(e) => setNumberOfFloors(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 sm:px-3.5 sm:py-2.5 font-body text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
              />
            </label>

            {/* Year of Construction */}
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-sm sm:text-label-md text-on-surface">Year of Construction</span>
              <input
                type="number"
                value={yearOfConstruction}
                onChange={(e) => {
                  const y = parseInt(e.target.value) || 0;
                  setYearOfConstruction(y);
                  const calculatedAge = Math.max(0, 2026 - y);
                  setPresentAge(calculatedAge);
                  setResidualLife(Math.max(0, 60 - calculatedAge));
                }}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 sm:px-3.5 sm:py-2.5 font-mono text-mono-md text-primary tabular-nums focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
              />
            </label>

            {/* Present Age of Building */}
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-sm sm:text-label-md text-on-surface">Present Age of Building (Years)</span>
              <input
                type="number"
                value={presentAge}
                onChange={(e) => {
                  const age = parseInt(e.target.value) || 0;
                  setPresentAge(age);
                  setResidualLife(Math.max(0, 60 - age));
                }}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 sm:px-3.5 sm:py-2.5 font-mono text-mono-md text-primary tabular-nums focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
              />
            </label>

            {/* Estimated Residual Life */}
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-sm sm:text-label-md text-on-surface">Estimated Residual Life (Years)</span>
              <input
                type="number"
                value={residualLife}
                onChange={(e) => setResidualLife(parseInt(e.target.value) || 0)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 sm:px-3.5 sm:py-2.5 font-mono text-mono-md text-primary tabular-nums focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
              />
            </label>

            {/* Condition of Exterior & Interior */}
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-sm sm:text-label-md text-on-surface">Condition of Exterior &amp; Interior</span>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 sm:px-3.5 sm:py-2.5 font-body text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
              >
                <option value="Good (Well Maintained)">Good (Well Maintained)</option>
                <option value="Very Good / Newly Constructed">Very Good / Newly Constructed</option>
                <option value="Fair / Needs Minor Repairs">Fair / Needs Minor Repairs</option>
                <option value="Poor / Dilapidated">Poor / Dilapidated</option>
              </select>
            </label>

            {/* Flooring & Staircase */}
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-sm sm:text-label-md text-on-surface">Flooring &amp; Staircase</span>
              <input
                type="text"
                value={flooringStaircase}
                onChange={(e) => setFlooringStaircase(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 sm:px-3.5 sm:py-2.5 font-body text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
              />
            </label>

            {/* Doors, Windows & Joinery */}
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-sm sm:text-label-md text-on-surface">Doors, Windows &amp; Joinery</span>
              <input
                type="text"
                value={doorsWindows}
                onChange={(e) => setDoorsWindows(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 sm:px-3.5 sm:py-2.5 font-body text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
              />
            </label>

            {/* Building Plan Approval No. */}
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-sm sm:text-label-md text-on-surface">Building Plan Approval No.</span>
              <input
                type="text"
                value={approvalNo}
                onChange={(e) => setApprovalNo(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 sm:px-3.5 sm:py-2.5 font-mono text-mono-md text-primary focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
              />
            </label>
          </div>
        </section>

        {/* Card 2: Floor-Wise Built-Up Area & Replacement Cost Table */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-md p-4 sm:p-5 shadow-xs flex flex-col gap-3.5 sm:gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant pb-3 sm:pb-3.5">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">calculate</span>
              </span>
              <div>
                <h2 className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-primary">
                  Floor-Wise Built-Up Area &amp; Depreciated Value
                </h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Replacement cost computed using PWD / CPWD plinth area rates less age depreciation (7.5% for 5 yrs).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant font-label text-label-md text-primary tabular-nums">
                Total Built-Up: {totalBuiltUp.toLocaleString('en-IN')} Sq.ft
              </span>
              <button
                type="button"
                onClick={handleAddFloor}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-lowest border border-outline-variant text-primary text-[12px] font-label hover:bg-surface-container-low transition-colors"
                title="Add Another Floor"
              >
                <span className="material-symbols-outlined text-[15px]">add</span>
                <span>Add Floor</span>
              </button>
            </div>
          </div>

          <div className="border border-outline-variant rounded-md overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead className="bg-surface-container-low border-b border-outline-variant">
                <tr>
                  <th scope="col" className="px-3.5 py-2 font-label text-label-sm text-on-surface-variant">
                    Floor / Component
                  </th>
                  <th scope="col" className="px-3.5 py-2 font-label text-label-sm text-on-surface-variant text-right">
                    Area (Sq.ft)
                  </th>
                  <th scope="col" className="px-3.5 py-2 font-label text-label-sm text-on-surface-variant text-right">
                    GLR Rate (₹)
                  </th>
                  <th scope="col" className="px-3.5 py-2 font-label text-label-sm text-on-surface-variant text-right">
                    PMR Rate (₹)
                  </th>
                  <th scope="col" className="px-3.5 py-2 font-label text-label-sm text-on-surface-variant text-right">
                    Depreciated GLR (₹)
                  </th>
                  <th scope="col" className="px-3.5 py-2 font-label text-label-sm text-on-surface-variant text-right">
                    Depreciated PMR (₹)
                  </th>
                  <th scope="col" className="px-2 py-2 w-10 text-center font-label text-label-sm text-on-surface-variant">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {floors.map((row) => (
                  <tr key={row.id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="px-3.5 py-1.5 sm:py-2 font-label text-[12px] sm:text-[13px] text-primary">
                      <input
                        type="text"
                        value={row.floor}
                        onChange={(e) => handleFloorChange(row.id, 'floor', e.target.value)}
                        className="w-full bg-transparent border-0 border-b border-transparent hover:border-outline-variant focus:border-primary px-1 py-0.5 text-primary font-label text-[12px] sm:text-[13px] font-medium focus:outline-none transition-colors"
                      />
                    </td>
                    <td className="px-3.5 py-1.5 sm:py-2 font-mono text-[12px] text-primary text-right tabular-nums">
                      <input
                        type="number"
                        value={row.area}
                        onChange={(e) => handleFloorChange(row.id, 'area', e.target.value)}
                        className="w-20 bg-transparent border-0 border-b border-transparent hover:border-outline-variant focus:border-primary px-1 py-0.5 text-right font-mono text-[12px] text-primary focus:outline-none transition-colors"
                      />
                    </td>
                    <td className="px-3.5 py-1.5 sm:py-2 font-mono text-[12px] text-on-surface-variant text-right tabular-nums">
                      <div className="inline-flex items-center justify-end">
                        <span className="text-on-surface-variant text-[11px] sm:text-[12px] mr-0.5">₹</span>
                        <input
                          type="number"
                          value={row.glrRate}
                          onChange={(e) => handleFloorChange(row.id, 'glrRate', e.target.value)}
                          className="w-16 sm:w-20 bg-transparent border-0 border-b border-transparent hover:border-outline-variant focus:border-primary px-1 py-0.5 text-right font-mono text-[12px] text-on-surface-variant focus:outline-none transition-colors"
                        />
                      </div>
                    </td>
                    <td className="px-3.5 py-1.5 sm:py-2 font-mono text-[12px] text-on-surface-variant text-right tabular-nums">
                      <div className="inline-flex items-center justify-end">
                        <span className="text-on-surface-variant text-[11px] sm:text-[12px] mr-0.5">₹</span>
                        <input
                          type="number"
                          value={row.pmrRate}
                          onChange={(e) => handleFloorChange(row.id, 'pmrRate', e.target.value)}
                          className="w-16 sm:w-20 bg-transparent border-0 border-b border-transparent hover:border-outline-variant focus:border-primary px-1 py-0.5 text-right font-mono text-[12px] text-on-surface-variant focus:outline-none transition-colors"
                        />
                      </div>
                    </td>
                    <td className="px-3.5 py-1.5 sm:py-2 font-label text-[12px] sm:text-[13px] text-primary text-right tabular-nums font-medium">
                      {formatINR(row.depreciatedGlr)}
                    </td>
                    <td className="px-3.5 py-1.5 sm:py-2 font-label text-[12px] sm:text-[13px] text-on-secondary-container text-right tabular-nums font-semibold">
                      {formatINR(row.depreciatedPmr)}
                    </td>
                    <td className="px-2 py-1.5 sm:py-2 text-center">
                      {floors.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveFloor(row.id)}
                          className="text-outline hover:text-error transition-colors p-1"
                          title="Remove row"
                        >
                          <span className="material-symbols-outlined text-[15px]">close</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}

                {/* Totals Row */}
                <tr className="bg-primary-container/40 border-t-2 border-primary/20">
                  <td className="px-3.5 py-2 font-label text-[12px] sm:text-[13px] text-primary font-semibold">
                    Total Part C (Building)
                  </td>
                  <td className="px-3.5 py-2 font-mono text-[12px] sm:text-[13px] text-primary text-right tabular-nums font-bold">
                    {totalBuiltUp.toLocaleString('en-IN')}
                  </td>
                  <td className="px-3.5 py-2 font-body text-body-sm text-on-surface-variant text-right">—</td>
                  <td className="px-3.5 py-2 font-body text-body-sm text-on-surface-variant text-right">—</td>
                  <td className="px-3.5 py-2 font-label text-[13px] sm:text-[14px] text-primary text-right tabular-nums font-bold">
                    {formatINR(totalDepreciatedGlr)}
                  </td>
                  <td className="px-3.5 py-2 font-label text-[13px] sm:text-[14px] text-on-secondary-container text-right tabular-nums font-bold">
                    {formatINR(totalDepreciatedPmr)}
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
            to={`/company-admin/valuation/new/part-b?bank=${encodeURIComponent(bankName)}`}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded bg-surface-container-lowest border border-outline-variant text-primary font-label text-label-md hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Previous: Part B Land</span>
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
              onClick={handleNextPartD}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-tertiary text-on-tertiary font-label text-label-md hover:opacity-95 transition-colors cursor-pointer shadow-sm"
            >
              <span>Next: Part D &amp; E Amenities</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
