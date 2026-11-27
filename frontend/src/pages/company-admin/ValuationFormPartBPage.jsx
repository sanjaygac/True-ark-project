import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

const initialDimensions = [
  {
    direction: 'North',
    deed: '60.0 ft — 30 ft Main Road',
    actual: '60.0 ft — 30 ft Main Road',
    tslr: '18.3 m — Municipal Road',
  },
  {
    direction: 'South',
    deed: '60.0 ft — S.No. 142/3C',
    actual: '60.0 ft — Vacant Plot',
    tslr: '18.3 m — S.No. 142/3C',
  },
  {
    direction: 'East',
    deed: '80.0 ft — S.No. 142/4',
    actual: '80.0 ft — Residential House',
    tslr: '24.4 m — S.No. 142/4',
  },
  {
    direction: 'West',
    deed: '80.0 ft — S.No. 142/3A',
    actual: '80.0 ft — Compound Wall',
    tslr: '24.4 m — S.No. 142/3A',
  },
];

const initialAdjacentTransactions = [
  { deed: 'Doc #1482 • S.No 142/2A', date: '14 Jan 2026', rate: '₹3,050' },
  { deed: 'Doc #2190 • S.No 143/1', date: '02 Feb 2026', rate: '₹3,180' },
];

export default function ValuationFormPartBPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const bankParam = searchParams.get('bank');
  const bankName = bankParam || 'Canara Bank — Hi Tech Agri Finance Branch';

  // Card 1: Dimensions & Plot Extent State
  const [plotExtent, setPlotExtent] = useState(4800);
  const [plotUnit, setPlotUnit] = useState('Sq.ft');
  const [dimensions, setDimensions] = useState(initialDimensions);

  // Card 2: 14 Site Characteristics State
  const [localityCharacter, setLocalityCharacter] = useState('Developing Residential');
  const [classification, setClassification] = useState('High'); // High | Middle | Poor
  const [flooding, setFlooding] = useState('No Risk'); // No Risk | Prone
  const [civicAmenities, setCivicAmenities] = useState('All Available Within 1 km');
  const [topography, setTopography] = useState('Level & Above Road Grade');
  const [landShape, setLandShape] = useState('Regular Rectangular');
  const [tpApproved, setTpApproved] = useState('Yes (DTCP / CMDA)'); // Yes (DTCP / CMDA) | Unapproved
  const [plotType, setPlotType] = useState('Intermittent Plot (Single Frontage)');
  const [roadWidth, setRoadWidth] = useState('Above 20 ft'); // Below 20 ft | Above 20 ft
  const [landlocked, setLandlocked] = useState('No (Direct Access)'); // No (Direct Access) | Yes (Landlocked)
  const [waterPotentiality, setWaterPotentiality] = useState('Good (Municipal + Borewell at 85 ft)');
  const [powerSupply, setPowerSupply] = useState('3-Phase EB Line Available');
  const [crzRemarks, setCrzRemarks] = useState(
    'Outside CRZ limits; no pending highway or metro land acquisition notices.'
  );
  const [accessibility, setAccessibility] = useState('Tarred 30 ft Public Road');

  // Card 3: GLR & PMR Calculation State
  const [glrRate, setGlrRate] = useState(1850);
  const [pmrRate, setPmrRate] = useState(3100);
  const [sroFileName, setSroFileName] = useState('SRO_Kelambakkam_GLR_2026.pdf');
  const sroUploadRef = useRef(null);

  // UI Feedback States
  const [draftSaved, setDraftSaved] = useState(false);
  const [nextStepToast, setNextStepToast] = useState(false);

  useEffect(() => {
    document.title = `Valuation Form — Part B: Land & GLR/PMR — ${bankName} — TrueArk`;
  }, [bankName]);

  // Conversion helper to Sq.ft
  const getExtentInSqft = () => {
    const raw = parseFloat(plotExtent) || 0;
    if (plotUnit === 'Cent') return raw * 435.6;
    if (plotUnit === 'Acre') return raw * 43560;
    return raw;
  };

  const formatINR = (num) => {
    const val = Math.round(Number(num) || 0);
    return '₹' + val.toLocaleString('en-IN');
  };

  const currentSqft = getExtentInSqft();
  const calculatedGlrTotal = currentSqft * (parseFloat(glrRate) || 0);
  const calculatedPmrTotal = currentSqft * (parseFloat(pmrRate) || 0);

  const formattedSqftLabel = Math.round(currentSqft).toLocaleString('en-IN') + ' Sq.ft';
  const glrFormula = `${formattedSqftLabel} × ${formatINR(glrRate)} / Sq.ft`;
  const pmrFormula = `${formattedSqftLabel} × ${formatINR(pmrRate)} / Sq.ft`;

  const handleDimensionChange = (index, field, value) => {
    setDimensions((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSroFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSroFileName(e.target.files[0].name);
    }
  };

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  };

  const handleNextPartC = () => {
    setNextStepToast(true);
    setTimeout(() => {
      navigate(`/company-admin/valuation/new/part-c?bank=${encodeURIComponent(bankName)}`);
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
              onClick={handleNextPartC}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded bg-tertiary text-on-tertiary font-label text-label-md hover:opacity-95 transition-colors duration-state-change whitespace-nowrap cursor-pointer shadow-xs"
            >
              <span>Next: Part C Building</span>
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

              {/* Step 2: Active */}
              <li aria-current="step" className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-primary-container border border-primary">
                <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 font-label text-[11px] font-bold tabular-nums">
                  2
                </span>
                <span className="font-label text-[11px] sm:text-label-sm text-primary font-semibold leading-tight truncate">
                  2. Part B: Land & GLR
                </span>
              </li>

              {/* Step 3 */}
              <li className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-surface-container-lowest border border-outline-variant hover:border-primary/50 transition-colors">
                <Link
                  to={`/company-admin/valuation/new/part-c?bank=${encodeURIComponent(bankName)}`}
                  className="flex items-center gap-2 w-full"
                >
                  <span className="w-5 h-5 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center shrink-0 font-label text-[11px] tabular-nums">
                    3
                  </span>
                  <span className="font-label text-[11px] sm:text-label-sm text-on-surface-variant leading-tight truncate">
                    3. Part C: Building
                  </span>
                </Link>
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
                    4. Part D &amp; E: Services
                  </span>
                </Link>
              </li>

              {/* Step 5 */}
              <li className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-surface-container-lowest border border-outline-variant hover:border-primary/50 transition-colors">
                <Link
                  to={`/company-admin/valuation/new/part-f?bank=${encodeURIComponent(bankName)}`}
                  className="flex items-center gap-2 w-full"
                >
                  <span className="w-5 h-5 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center shrink-0 font-label text-[11px] tabular-nums">
                    5
                  </span>
                  <span className="font-label text-[11px] sm:text-label-sm text-on-surface-variant leading-tight truncate">
                    5. Part F: Summary
                  </span>
                </Link>
              </li>

              {/* Step 6 */}
              <li className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-surface-container-lowest border border-outline-variant hover:border-primary/50 transition-colors">
                <Link
                  to={`/company-admin/valuation/new/form-a?bank=${encodeURIComponent(bankName)}`}
                  className="flex items-center gap-2 w-full"
                >
                  <span className="w-5 h-5 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center shrink-0 font-label text-[11px] tabular-nums">
                    6
                  </span>
                  <span className="font-label text-[11px] sm:text-label-sm text-on-surface-variant leading-tight truncate">
                    6. Form-A: Declaration
                  </span>
                </Link>
              </li>
            </ol>
          </div>
        </nav>
      </header>

      {/* Part C Toast */}
      {nextStepToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-primary text-on-primary px-4 py-3 rounded-md shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-3 duration-200">
          <span className="material-symbols-outlined text-[20px] text-secondary">check_circle</span>
          <span className="font-body text-body-sm">
            Part B saved. Proceeding to Part C: Building Valuation...
          </span>
        </div>
      )}

      {/* Main Form Content (same gap size as Company Master & Plan Master) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 flex flex-col gap-3">
        {/* Card 1: Site Dimensions Comparison Table */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-md p-4 sm:p-5 shadow-sm flex flex-col gap-3.5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant pb-2.5">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-primary-container text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-title-md">straighten</span>
              </span>
              <div>
                <h2 className="font-headline text-headline-sm text-primary">Site Dimensions Comparison Table</h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Compare linear measurements across registered deed, physical site inspection, and revenue TSLR extract.
                </p>
              </div>
            </div>

            {/* Total Plot Extent + Unit Selector */}
            <div className="flex items-center gap-2.5 bg-surface-container-low border border-outline-variant rounded px-3 py-1.5">
              <label htmlFor="plot-extent-input" className="font-label text-label-md text-primary whitespace-nowrap">
                Total Plot Extent:
              </label>
              <input
                id="plot-extent-input"
                type="number"
                min="0"
                value={plotExtent}
                onChange={(e) => setPlotExtent(e.target.value)}
                className="w-24 rounded border border-outline-variant bg-surface-container-lowest px-2.5 py-1 font-mono text-[13px] text-primary tabular-nums focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
              <select
                id="plot-unit-select"
                aria-label="Plot Extent Unit"
                value={plotUnit}
                onChange={(e) => setPlotUnit(e.target.value)}
                className="rounded border border-outline-variant bg-surface-container-lowest px-2 py-1 font-label text-label-sm text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none cursor-pointer"
              >
                <option value="Sq.ft">Sq.ft</option>
                <option value="Cent">Cent</option>
                <option value="Acre">Acre</option>
              </select>
            </div>
          </div>

          <div className="border border-outline-variant rounded-md overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low border-b border-outline-variant">
                <tr>
                  <th scope="col" className="px-3.5 py-2.5 font-label text-label-sm text-on-surface-variant w-1/5 whitespace-nowrap">
                    Direction
                  </th>
                  <th scope="col" className="px-3.5 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                    As per Deed (A)
                  </th>
                  <th scope="col" className="px-3.5 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                    As per Actual (B)
                  </th>
                  <th scope="col" className="px-3.5 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                    As per TSLR Extract (C)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {dimensions.map((row, idx) => (
                  <tr key={row.direction} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-3.5 py-2.5 font-label text-label-md text-primary font-semibold">
                      {row.direction}
                    </td>
                    <td className="px-3.5 py-2">
                      <input
                        type="text"
                        value={row.deed}
                        onChange={(e) => handleDimensionChange(idx, 'deed', e.target.value)}
                        aria-label={`${row.direction} As per Deed`}
                        className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-1.5 font-body text-body-sm text-on-surface tabular-nums focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                      />
                    </td>
                    <td className="px-3.5 py-2">
                      <input
                        type="text"
                        value={row.actual}
                        onChange={(e) => handleDimensionChange(idx, 'actual', e.target.value)}
                        aria-label={`${row.direction} As per Actual`}
                        className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-1.5 font-body text-body-sm text-on-surface tabular-nums focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                      />
                    </td>
                    <td className="px-3.5 py-2">
                      <input
                        type="text"
                        value={row.tslr}
                        onChange={(e) => handleDimensionChange(idx, 'tslr', e.target.value)}
                        aria-label={`${row.direction} As per TSLR Extract`}
                        className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-1.5 font-body text-body-sm text-on-surface tabular-nums focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                      />
                    </td>
                  </tr>
                ))}
                <tr className="bg-primary-container/40 font-label">
                  <td className="px-3.5 py-2.5 font-label text-label-md text-primary font-bold">
                    Total
                  </td>
                  <td className="px-3.5 py-2.5 font-mono text-[13px] text-primary tabular-nums font-semibold">
                    {formattedSqftLabel} (60 × 80 ft)
                  </td>
                  <td className="px-3.5 py-2.5 font-mono text-[13px] text-primary tabular-nums font-semibold">
                    {formattedSqftLabel} (Verified)
                  </td>
                  <td className="px-3.5 py-2.5 font-mono text-[13px] text-on-secondary-container tabular-nums font-semibold">
                    {(currentSqft * 0.092903).toFixed(1)} Sq.m ({formattedSqftLabel})
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Card 2: Site Characteristics Grid (14 Parameters) */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-md p-4 sm:p-5 shadow-sm flex flex-col gap-3.5">
          <div className="flex items-center gap-3 border-b border-outline-variant pb-2.5">
            <span className="w-8 h-8 rounded bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-title-md">fact_check</span>
            </span>
            <div>
              <h2 className="font-headline text-headline-sm text-primary">Site Characteristics</h2>
              <p className="font-body text-body-sm text-on-surface-variant">
                Physical, statutory, and civic infrastructure parameters observed during site inspection.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            {/* 1. Locality Character */}
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Locality Character</span>
              <select
                value={localityCharacter}
                onChange={(e) => setLocalityCharacter(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                <option>Developing Residential</option>
                <option>Prime Commercial</option>
                <option>Mixed Residential &amp; Commercial</option>
                <option>Industrial / Warehouse</option>
                <option>Agricultural / Semi-Urban</option>
              </select>
            </label>

            {/* 2. Classification Toggle */}
            <div className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Classification</span>
              <div className="grid grid-cols-3 gap-1 p-1 rounded bg-surface-container-low border border-outline-variant" role="group" aria-label="Classification">
                {['High', 'Middle', 'Poor'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setClassification(opt)}
                    className={`px-2 py-1.5 rounded font-label text-label-sm transition-colors duration-state-change cursor-pointer ${
                      classification === opt
                        ? 'bg-primary text-on-primary font-semibold shadow-xs'
                        : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Flooding Possibility Toggle */}
            <div className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Flooding Possibility</span>
              <div className="grid grid-cols-2 gap-1 p-1 rounded bg-surface-container-low border border-outline-variant" role="group" aria-label="Flooding Possibility">
                {['No Risk', 'Prone'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFlooding(opt)}
                    className={`px-3 py-1.5 rounded font-label text-label-sm transition-colors duration-state-change cursor-pointer ${
                      flooding === opt
                        ? 'bg-secondary-container text-on-secondary-container border border-secondary/30 font-semibold shadow-xs'
                        : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Civic Amenities */}
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Civic Amenities</span>
              <select
                value={civicAmenities}
                onChange={(e) => setCivicAmenities(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                <option>All Available Within 1 km</option>
                <option>Available Within 2–3 km</option>
                <option>Basic Amenities Only</option>
                <option>Limited / Distant</option>
              </select>
            </label>

            {/* 5. Topography */}
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Topography</span>
              <select
                value={topography}
                onChange={(e) => setTopography(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                <option>Level &amp; Above Road Grade</option>
                <option>Level with Road</option>
                <option>Low-Lying (Needs Filling)</option>
                <option>Sloping / Undulated</option>
              </select>
            </label>

            {/* 6. Land Shape */}
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Land Shape</span>
              <select
                value={landShape}
                onChange={(e) => setLandShape(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                <option>Regular Rectangular</option>
                <option>Square</option>
                <option>Trapezoidal</option>
                <option>Irregular / L-Shaped</option>
              </select>
            </label>

            {/* 7. Town-Planning Approved Layout Toggle */}
            <div className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Town-Planning Approved Layout</span>
              <div className="grid grid-cols-2 gap-1 p-1 rounded bg-surface-container-low border border-outline-variant" role="group" aria-label="Town-Planning Approved Layout">
                {['Yes (DTCP / CMDA)', 'Unapproved'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setTpApproved(opt)}
                    className={`px-2 py-1.5 rounded font-label text-label-sm transition-colors duration-state-change cursor-pointer ${
                      tpApproved === opt
                        ? 'bg-secondary-container text-on-secondary-container border border-secondary/30 font-semibold shadow-xs'
                        : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 8. Corner / Intermittent Plot */}
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Corner / Intermittent Plot</span>
              <select
                value={plotType}
                onChange={(e) => setPlotType(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                <option>Intermittent Plot (Single Frontage)</option>
                <option>Corner Plot (Two-Side Road)</option>
                <option>Through Plot (Front &amp; Rear Road)</option>
              </select>
            </label>

            {/* 9. Road Width Toggle */}
            <div className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Road Width</span>
              <div className="grid grid-cols-2 gap-1 p-1 rounded bg-surface-container-low border border-outline-variant" role="group" aria-label="Road Width">
                {['Below 20 ft', 'Above 20 ft'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setRoadWidth(opt)}
                    className={`px-3 py-1.5 rounded font-label text-label-sm transition-colors duration-state-change cursor-pointer ${
                      roadWidth === opt
                        ? 'bg-primary text-on-primary font-semibold shadow-xs'
                        : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 10. Landlocked Status Toggle */}
            <div className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Landlocked Status</span>
              <div className="grid grid-cols-2 gap-1 p-1 rounded bg-surface-container-low border border-outline-variant" role="group" aria-label="Landlocked Status">
                {['No (Direct Access)', 'Yes (Landlocked)'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setLandlocked(opt)}
                    className={`px-3 py-1.5 rounded font-label text-label-sm transition-colors duration-state-change cursor-pointer ${
                      landlocked === opt
                        ? 'bg-secondary-container text-on-secondary-container border border-secondary/30 font-semibold shadow-xs'
                        : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 11. Water Potentiality */}
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Water Potentiality</span>
              <select
                value={waterPotentiality}
                onChange={(e) => setWaterPotentiality(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                <option>Good (Municipal + Borewell at 85 ft)</option>
                <option>Moderate (Borewell Only)</option>
                <option>Scarce / Tanker Dependent</option>
              </select>
            </label>

            {/* 12. Power Supply */}
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Power Supply</span>
              <select
                value={powerSupply}
                onChange={(e) => setPowerSupply(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                <option>3-Phase EB Line Available</option>
                <option>Single-Phase EB Line</option>
                <option>Pole Extension Required</option>
              </select>
            </label>

            {/* 13. CRZ / Acquisition Remarks */}
            <label className="flex flex-col gap-1.5 md:col-span-2">
              <span className="font-label text-label-md text-on-surface">CRZ / Acquisition Remarks</span>
              <input
                type="text"
                value={crzRemarks}
                onChange={(e) => setCrzRemarks(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </label>

            {/* 14. Accessibility */}
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Accessibility</span>
              <select
                value={accessibility}
                onChange={(e) => setAccessibility(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                <option>Tarred 30 ft Public Road</option>
                <option>Concrete 24 ft Layout Road</option>
                <option>WBM / Mud Road</option>
                <option>Private Right of Way</option>
              </select>
            </label>
          </div>
        </section>

        {/* Card 3: GLR & PMR Land Valuation */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-md p-4 sm:p-5 shadow-sm flex flex-col gap-3.5">
          <div className="flex items-center gap-3 border-b border-outline-variant pb-2.5">
            <span className="w-8 h-8 rounded bg-primary-container text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-title-md">calculate</span>
            </span>
            <div>
              <h2 className="font-headline text-headline-sm text-primary">GLR &amp; PMR Land Valuation</h2>
              <p className="font-body text-body-sm text-on-surface-variant">
                Compare Sub-Registrar Guideline Rate (GLR) against Prevailing Market Rate (PMR) backed by adjacent sale deeds.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
            {/* Left Box: Guideline Rate (GLR) */}
            <div className="rounded-md bg-surface border border-outline-variant p-4 sm:p-5 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-title text-[15px] sm:text-[16px] font-semibold text-primary">
                    Guideline Rate (GLR)
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-surface-container-lowest border border-outline-variant font-label text-[11px] font-semibold text-primary">
                    SRO Statutory
                  </span>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-md text-primary font-medium">
                    Guideline Rate (₹ per Sq.ft)
                  </span>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 font-label text-label-md text-primary font-semibold">₹</span>
                    <input
                      id="glr-rate-input"
                      type="number"
                      min="0"
                      value={glrRate}
                      onChange={(e) => setGlrRate(e.target.value)}
                      className="w-full rounded border border-outline-variant bg-surface-container-lowest pl-8 pr-3.5 py-2 font-mono text-[14px] text-primary tabular-nums font-semibold focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    />
                  </div>
                </label>

                <div className="flex flex-col gap-1.5">
                  <span className="font-label text-label-md text-primary font-medium">SRO Evidence Upload</span>
                  <label className="flex items-center justify-between gap-3 rounded border border-dashed border-outline-variant bg-surface-container-lowest px-3.5 py-2.5 cursor-pointer hover:bg-surface-container-low transition-colors duration-state-change">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="material-symbols-outlined text-primary text-[20px] shrink-0">upload_file</span>
                      <div className="min-w-0">
                        <p id="sro-file-name" className="font-label text-label-sm text-primary truncate font-medium">
                          {sroFileName}
                        </p>
                        <p className="font-body text-[11px] text-on-surface-variant">
                          Verified Sub-Registrar Extract • 420 KB
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-[10px] font-semibold">
                      Uploaded
                    </span>
                    <input
                      ref={sroUploadRef}
                      id="sro-upload-input"
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handleSroFileChange}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-3.5 border-t border-outline-variant flex items-center justify-between gap-4">
                <div>
                  <p className="font-label text-label-sm text-primary font-medium">Auto-Calculated GLR Land Value</p>
                  <p id="glr-formula" className="font-body text-body-sm text-on-surface-variant tabular-nums">
                    {glrFormula}
                  </p>
                </div>
                <p id="glr-total-value" className="font-headline text-[18px] sm:text-[20px] font-bold text-primary tabular-nums">
                  {formatINR(calculatedGlrTotal)}
                </p>
              </div>
            </div>

            {/* Right Box: Prevailing Market Rate (PMR) */}
            <div className="rounded-md bg-surface border border-outline-variant p-4 sm:p-5 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-title text-[15px] sm:text-[16px] font-semibold text-primary">
                    Prevailing Market Rate (PMR)
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-surface-container-lowest border border-outline-variant font-label text-[11px] font-semibold text-on-secondary-container">
                    Market Adopted
                  </span>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-md text-primary font-medium">
                    Adopted Market Rate (₹ per Sq.ft)
                  </span>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 font-label text-label-md text-primary font-semibold">₹</span>
                    <input
                      id="pmr-rate-input"
                      type="number"
                      min="0"
                      value={pmrRate}
                      onChange={(e) => setPmrRate(e.target.value)}
                      className="w-full rounded border border-outline-variant bg-surface-container-lowest pl-8 pr-3.5 py-2 font-mono text-[14px] text-primary tabular-nums font-semibold focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                    />
                  </div>
                </label>

                <div className="flex flex-col gap-1.5">
                  <span className="font-label text-label-md text-primary font-medium">Adjacent Property Transactions</span>
                  <div className="rounded border border-outline-variant bg-surface-container-lowest overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-surface-container-low border-b border-outline-variant">
                        <tr>
                          <th scope="col" className="px-3 py-1.5 font-label text-label-sm text-on-surface-variant">
                            Deed / Survey Ref
                          </th>
                          <th scope="col" className="px-3 py-1.5 font-label text-label-sm text-on-surface-variant">
                            Date
                          </th>
                          <th scope="col" className="px-3 py-1.5 font-label text-label-sm text-on-surface-variant text-right">
                            Rate / Sq.ft
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant">
                        {initialAdjacentTransactions.map((tx, i) => (
                          <tr key={i} className="hover:bg-surface-container-low/50 transition-colors">
                            <td className="px-3 py-1.5 font-mono text-[12px] text-primary">{tx.deed}</td>
                            <td className="px-3 py-1.5 font-body text-body-sm text-on-surface-variant tabular-nums">
                              {tx.date}
                            </td>
                            <td className="px-3 py-1.5 font-label text-label-sm text-on-secondary-container text-right tabular-nums font-semibold">
                              {tx.rate}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="pt-3.5 border-t border-outline-variant flex items-center justify-between gap-4">
                <div>
                  <p className="font-label text-label-sm text-primary font-medium">Adopted PMR Land Value</p>
                  <p id="pmr-formula" className="font-body text-body-sm text-on-surface-variant tabular-nums">
                    {pmrFormula}
                  </p>
                </div>
                <p id="pmr-total-value" className="font-headline text-[18px] sm:text-[20px] font-bold text-on-secondary-container tabular-nums">
                  {formatINR(calculatedPmrTotal)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Navigation Actions */}
        <div className="flex items-center justify-between gap-3 pt-1 pb-4">
          <Link
            to={`/company-admin/valuation/new?bank=${encodeURIComponent(bankName)}`}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded bg-surface-container-lowest border border-outline-variant text-primary font-label text-label-md hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Previous: Part A General</span>
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
              onClick={handleNextPartC}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-tertiary text-on-tertiary font-label text-label-md hover:opacity-95 transition-colors cursor-pointer shadow-sm"
            >
              <span>Next: Part C Building</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
