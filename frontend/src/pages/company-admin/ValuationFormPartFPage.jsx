import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import CompanyAdminSidebar from '../../components/company-admin/CompanyAdminSidebar';
import WordDocumentPreviewModal from '../../components/company-admin/WordDocumentPreviewModal';

const abstractRows = [
  {
    part: 'Part B',
    desc: 'Land Valuation (4,800 Sq.ft • GLR ₹1,850/Sq.ft vs PMR ₹3,100/Sq.ft)',
    glrValue: 8880000,
    pmrValue: 14880000,
  },
  {
    part: 'Part C',
    desc: 'Building Superstructure (G+1 RCC Framed, 3,200 Sq.ft Built-Up)',
    glrValue: 4800000,
    pmrValue: 6400000,
  },
  {
    part: 'Part D',
    desc: 'Amenities & Extra Items (Compound Wall, Sump, Interlock Paving)',
    glrValue: 420000,
    pmrValue: 550000,
  },
  {
    part: 'Part E',
    desc: 'Services (3-Phase Electrical, Sanitary, Solar & Rainwater Harvesting)',
    glrValue: 350000,
    pmrValue: 470000,
  },
];

const initialEnclosures = [
  {
    id: 1,
    title: 'Site Plan',
    fileName: 'DTCP_Site_Plan_142_3B.pdf',
    icon: 'map',
    uploaded: true,
  },
  {
    id: 2,
    title: 'Property Photos (Inner, Elevation, Road)',
    fileName: 'Site_Photos_6_Angles.zip',
    icon: 'photo_library',
    uploaded: true,
  },
  {
    id: 3,
    title: 'Google Map',
    fileName: 'GIS_Pin_12.7894N_80.2215E.png',
    icon: 'location_on',
    uploaded: true,
  },
  {
    id: 4,
    title: 'Guideline Value Sheet',
    fileName: 'TNREGINET_GLR_Extract.pdf',
    icon: 'description',
    uploaded: true,
  },
  {
    id: 5,
    title: 'TSLR Extract',
    fileName: 'TSLR_Town_Survey_142_3B.pdf',
    icon: 'article',
    uploaded: true,
  },
  {
    id: 6,
    title: 'Property Tax Receipt',
    fileName: 'Panchayat_Tax_FY2025_26.pdf',
    icon: 'receipt_long',
    uploaded: true,
  },
];

export default function ValuationFormPartFPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const bankParam = searchParams.get('bank');
  const bankName = bankParam || 'Canara Bank — Hi Tech Agri Finance Branch';

  // Middle Split: Adjustments State
  const [additionalValue, setAdditionalValue] = useState(450000);
  const [lessValue, setLessValue] = useState(150000);
  const [valuationApproach, setValuationApproach] = useState(
    'Land & Building Method (Composite Approach) adopting prevailing local market rates for land and depreciated PWD replacement cost for the G+1 RCC superstructure.'
  );
  const [salability, setSalability] = useState(
    'High — Located on a 30 ft tarred municipal road in a fast-developing residential corridor with clear DTCP approval and strong end-user demand.'
  );
  const [futureRental, setFutureRental] = useState(
    'Estimated gross rental yield of ₹42,000 – ₹48,000/month across G+1 residential units, with steady 6–8% annual appreciation near IT corridor.'
  );

  // Bottom Card: Enclosures State
  const [enclosures, setEnclosures] = useState(initialEnclosures);

  // UI Feedback States
  const [draftSaved, setDraftSaved] = useState(false);
  const [showNextToast, setShowNextToast] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWordPreview, setShowWordPreview] = useState(false);

  useEffect(() => {
    document.title = `Valuation Form — Part F: Abstract & Summary — ${bankName} — TrueArk`;
  }, [bankName]);

  const formatINR = (val) => {
    const num = Math.round(Number(val) || 0);
    return '₹' + num.toLocaleString('en-IN');
  };

  // Calculations
  const grossGlr = abstractRows.reduce((acc, row) => acc + row.glrValue, 0); // 1,44,50,000
  const grossPmr = abstractRows.reduce((acc, row) => acc + row.pmrValue, 0); // 2,23,00,000

  const addVal = parseFloat(additionalValue) || 0;
  const lessVal = parseFloat(lessValue) || 0;

  const fmv = Math.max(0, grossPmr + addVal - lessVal); // ₹2,26,00,000
  const realizableValue = Math.round(fmv * 0.9); // ₹2,03,40,000
  const distressValue = Math.round(fmv * 0.85); // ₹1,92,10,000
  const guidelineValue = grossGlr; // ₹1,44,50,000

  const uploadedCount = enclosures.filter((e) => e.uploaded).length;

  const handleFileUpload = (id, e) => {
    const file = e.target.files?.[0];
    if (file) {
      setEnclosures((prev) =>
        prev.map((item) => (item.id === id ? { ...item, fileName: file.name, uploaded: true } : item))
      );
    }
  };

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  };

  const handleProceedDeclaration = () => {
    setShowNextToast(true);
    setTimeout(() => {
      navigate(`/company-admin/valuation/new/form-a?bank=${encodeURIComponent(bankName)}`);
    }, 400);
  };

  return (
    <div className="h-screen flex bg-surface text-on-surface font-body antialiased overflow-hidden relative">
      {/* Left Sidebar (Company Admin Portal) */}
      <CompanyAdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Workspace */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto overflow-x-hidden">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-30 bg-surface-container-lowest border-b border-outline-variant shadow-xs shrink-0">
          <div className="px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <button
                type="button"
                onClick={() => setSidebarOpen((prev) => !prev)}
                className="lg:hidden inline-flex items-center justify-center w-8 h-8 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors shrink-0 cursor-pointer"
                aria-label="Open sidebar menu"
              >
                <span className="material-symbols-outlined text-[20px]">menu</span>
              </button>
              <Link
                to="/company-admin/valuation"
                className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-primary text-[13px] font-medium transition-colors shrink-0"
                title="Back to Valuations list"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <span className="hidden sm:inline">Valuations</span>
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
              id="preview-doc-btn"
              type="button"
              onClick={() => setShowWordPreview(true)}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded bg-primary text-white font-label text-label-md hover:bg-primary/90 transition-colors duration-state-change whitespace-nowrap cursor-pointer shadow-xs font-semibold"
              title="Preview document in legal format before downloading as Word or PDF"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              <span>Preview Document</span>
            </button>

            <button
              type="button"
              onClick={handleProceedDeclaration}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded bg-tertiary text-on-tertiary font-label text-label-md hover:opacity-95 transition-colors duration-state-change whitespace-nowrap cursor-pointer shadow-xs"
            >
              <span>Proceed to Form-A Declaration</span>
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

              {/* Step 4: Completed */}
              <li>
                <Link
                  to={`/company-admin/valuation/new/part-d-e?bank=${encodeURIComponent(bankName)}`}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-surface-container-lowest border border-secondary/40 hover:bg-surface-container-low transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  </span>
                  <span className="font-label text-[11px] sm:text-label-sm text-on-secondary-container leading-tight truncate">
                    4. Part D &amp; E: Amenities
                  </span>
                </Link>
              </li>

              {/* Step 5: Active */}
              <li aria-current="step" className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-primary-container border border-primary">
                <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 font-label text-[11px] tabular-nums font-bold">
                  5
                </span>
                <span className="font-label text-[11px] sm:text-label-sm text-primary font-semibold leading-tight truncate">
                  5. Part F: Summary
                </span>
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

      {/* Toast Feedback */}
      {showNextToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-primary text-on-primary px-4 py-3 rounded-md shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-3 duration-200">
          <span className="material-symbols-outlined text-[20px] text-secondary">check_circle</span>
          <span className="font-body text-body-sm">
            Part F saved. Proceeding to Form-A: Declaration...
          </span>
        </div>
      )}

      {/* Main Form Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 flex flex-col gap-3">
        {/* Top Summary Card: Abstract Valuation Table */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-md p-4 sm:p-5 shadow-xs flex flex-col gap-3.5 sm:gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant pb-3 sm:pb-3.5">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">account_balance_wallet</span>
              </span>
              <div>
                <h2 className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-primary">
                  Abstract Valuation Table
                </h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Consolidated component-wise valuation comparing statutory Guideline Rate (GLR) and Prevailing Market Rate (PMR).
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label text-[12px] font-medium">
              <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <span>Auto-Calculated from Parts B–E</span>
            </span>
          </div>

          <div className="border border-outline-variant rounded-md overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead className="bg-surface-container-low border-b border-outline-variant">
                <tr>
                  <th scope="col" className="px-3.5 py-2 font-label text-label-sm text-on-surface-variant w-24">
                    Part
                  </th>
                  <th scope="col" className="px-3.5 py-2 font-label text-label-sm text-on-surface-variant">
                    Description
                  </th>
                  <th scope="col" className="px-3.5 py-2 font-label text-label-sm text-on-surface-variant text-right">
                    Value Adopting GLR (₹)
                  </th>
                  <th scope="col" className="px-3.5 py-2 font-label text-label-sm text-on-surface-variant text-right">
                    Value Adopting PMR (₹)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {abstractRows.map((row) => (
                  <tr key={row.part} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="px-3.5 py-2 font-mono text-[12px] text-primary font-semibold">
                      {row.part}
                    </td>
                    <td className="px-3.5 py-2 font-body text-body-sm text-on-surface">
                      {row.desc}
                    </td>
                    <td className="px-3.5 py-2 font-label text-[12px] sm:text-[13px] text-primary text-right tabular-nums font-medium">
                      {formatINR(row.glrValue)}
                    </td>
                    <td className="px-3.5 py-2 font-label text-[12px] sm:text-[13px] text-on-secondary-container text-right tabular-nums font-semibold">
                      {formatINR(row.pmrValue)}
                    </td>
                  </tr>
                ))}

                {/* Total Gross Row */}
                <tr className="bg-primary-container/40 border-t-2 border-primary/20">
                  <td className="px-3.5 py-2 font-label text-[12px] sm:text-[13px] text-primary font-bold">
                    Total
                  </td>
                  <td className="px-3.5 py-2 font-label text-[12px] sm:text-[13px] text-primary font-semibold">
                    Total Gross Value (Parts B + C + D + E)
                  </td>
                  <td className="px-3.5 py-2 font-label text-[13px] sm:text-[14px] text-primary text-right tabular-nums font-bold">
                    {formatINR(grossGlr)}
                  </td>
                  <td className="px-3.5 py-2 font-label text-[13px] sm:text-[14px] text-on-secondary-container text-right tabular-nums font-bold">
                    {formatINR(grossPmr)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Middle Split Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-3.5 items-stretch">
          {/* Left Card: Adjustments & Marketability Notes */}
          <article className="bg-surface-container-lowest border border-outline-variant rounded-md p-4 sm:p-5 shadow-xs flex flex-col gap-3.5 h-full">
            <div className="flex items-center gap-3 border-b border-outline-variant pb-3 sm:pb-3.5">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">tune</span>
              </span>
              <div>
                <h2 className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-primary">
                  Adjustments &amp; Marketability Notes
                </h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Factor in site-specific value additions, deductions, and valuer observations.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-sm text-on-secondary-container font-semibold">
                  Factors Favouring Additional Value (+ ₹)
                </span>
                <div className="relative flex items-center">
                  <span className="absolute left-3 font-label text-[12px] text-on-secondary-container font-semibold">
                    + ₹
                  </span>
                  <input
                    type="number"
                    value={additionalValue}
                    min="0"
                    onChange={(e) => setAdditionalValue(parseFloat(e.target.value) || 0)}
                    className="w-full rounded border border-secondary/35 bg-secondary-container/20 pl-9 pr-3 py-1.5 sm:py-2 font-mono text-[12px] text-primary tabular-nums focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-colors"
                  />
                </div>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-sm text-on-warning-container font-semibold">
                  Factors Favouring Less Value (- ₹)
                </span>
                <div className="relative flex items-center">
                  <span className="absolute left-3 font-label text-[12px] text-on-warning-container font-semibold">
                    - ₹
                  </span>
                  <input
                    type="number"
                    value={lessValue}
                    min="0"
                    onChange={(e) => setLessValue(parseFloat(e.target.value) || 0)}
                    className="w-full rounded border border-warning/35 bg-warning-container/20 pl-9 pr-3 py-1.5 sm:py-2 font-mono text-[12px] text-primary tabular-nums focus:border-warning focus:ring-1 focus:ring-warning focus:outline-none transition-colors"
                  />
                </div>
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-sm text-on-surface">Valuation Approach</span>
              <textarea
                rows={2}
                value={valuationApproach}
                onChange={(e) => setValuationApproach(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-sm text-on-surface">Salability</span>
              <textarea
                rows={2}
                value={salability}
                onChange={(e) => setSalability(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-sm text-on-surface">Future Rental Potential</span>
              <textarea
                rows={2}
                value={futureRental}
                onChange={(e) => setFutureRental(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
              />
            </label>
          </article>

          {/* Right Card: Highlighted Valuation Output Box */}
          <article className="bg-surface-container-lowest border border-outline-variant rounded-md p-4 sm:p-5 shadow-xs flex flex-col justify-between gap-3.5 sm:gap-4 h-full">
            <div className="flex items-center justify-between gap-3 border-b border-outline-variant pb-3 sm:pb-3.5">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px] sm:text-[20px]">analytics</span>
                </span>
                <div>
                  <h2 className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-primary">
                    Highlighted Valuation Output
                  </h2>
                  <p className="font-body text-body-sm text-on-surface-variant">
                    Final certified figures auto-derived from Gross PMR ± Adjustments.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
              {/* KPI 1: Present Fair Market Value */}
              <div className="sm:col-span-2 rounded-md bg-primary-container/70 border border-primary/20 p-3.5 sm:p-4 flex flex-col justify-between gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-label text-label-sm sm:text-label-md text-primary font-semibold">
                    Present Fair Market Value
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-lowest border border-primary/20 font-label text-[11px] text-primary">
                    100% FMV
                  </span>
                </div>
                <p className="font-headline text-[24px] sm:text-[28px] font-bold text-primary tabular-nums tracking-tight">
                  {formatINR(fmv)}
                </p>
                <p className="font-body text-[11px] sm:text-body-sm text-on-surface-variant tabular-nums">
                  Gross PMR ({formatINR(grossPmr)}) + {formatINR(addVal)} − {formatINR(lessVal)}
                </p>
              </div>

              {/* KPI 2: Realizable Sale Value (90%) */}
              <div className="rounded-md bg-secondary-container/70 border border-secondary/30 p-3 sm:p-3.5 flex flex-col justify-between gap-1">
                <span className="font-label text-[11px] sm:text-label-sm text-on-secondary-container font-semibold">
                  Realizable Sale Value (90%)
                </span>
                <p className="font-headline text-[18px] sm:text-[20px] font-bold text-secondary tabular-nums">
                  {formatINR(realizableValue)}
                </p>
                <span className="font-body text-[11px] text-on-secondary-container">
                  Recommended Bank Lending Base
                </span>
              </div>

              {/* KPI 3: Forced / Distress Sale Value (85%) */}
              <div className="rounded-md bg-surface-container-low border border-outline-variant p-3 sm:p-3.5 flex flex-col justify-between gap-1">
                <span className="font-label text-[11px] sm:text-label-sm text-on-surface-variant font-semibold">
                  Forced / Distress Sale Value (85%)
                </span>
                <p className="font-headline text-[18px] sm:text-[20px] font-bold text-primary tabular-nums">
                  {formatINR(distressValue)}
                </p>
                <span className="font-body text-[11px] text-on-surface-variant">
                  Immediate Auction Floor
                </span>
              </div>

              {/* KPI 4: Guideline Value */}
              <div className="sm:col-span-2 rounded-md bg-surface-container-low border border-outline-variant p-3 sm:p-3.5 flex items-center justify-between gap-3">
                <div>
                  <p className="font-label text-[12px] sm:text-label-sm text-primary font-semibold">
                    Guideline Value (Statutory Total)
                  </p>
                  <p className="font-body text-[11px] text-on-surface-variant">
                    Total Gross Value adopting SRO Guideline Rate
                  </p>
                </div>
                <p className="font-headline text-[16px] sm:text-[18px] font-bold text-primary tabular-nums">
                  {formatINR(guidelineValue)}
                </p>
              </div>
            </div>
          </article>
        </section>

        {/* Bottom Card: Mandatory Enclosures Checklist */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-md p-4 sm:p-5 shadow-xs flex flex-col gap-3.5 sm:gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant pb-3 sm:pb-3.5">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">folder_check</span>
              </span>
              <div>
                <h2 className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-primary">
                  Mandatory Enclosures Checklist
                </h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  All 6 statutory and photographic enclosures required before Form-A sign-off.
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label text-[12px] font-medium tabular-nums">
              {uploadedCount} / {enclosures.length} Uploaded
            </span>
          </div>

          {/* 6-Slot Visual File Upload Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {enclosures.map((slot) => (
              <label
                key={slot.id}
                className="rounded-md border border-outline-variant bg-surface p-3 flex flex-col gap-2 cursor-pointer hover:border-secondary transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-8 h-8 rounded bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">{slot.icon}</span>
                    </span>
                    <div className="min-w-0">
                      <p className="font-label text-label-sm text-primary truncate" title={slot.title}>
                        {slot.title}
                      </p>
                      <p className="font-body text-[11px] text-on-surface-variant truncate" title={slot.fileName}>
                        {slot.fileName}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-[10px] font-semibold">
                    {slot.uploaded ? 'Uploaded' : 'Upload'}
                  </span>
                </div>
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(slot.id, e)}
                  className="sr-only"
                />
              </label>
            ))}
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-2 border-t border-outline-variant flex flex-wrap items-center justify-between gap-3">
            <Link
              to={`/company-admin/valuation/new/part-d-e?bank=${encodeURIComponent(bankName)}`}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded bg-surface-container-lowest border border-outline-variant text-primary font-label text-label-md hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Previous: Part D &amp; E Amenities</span>
            </Link>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowWordPreview(true)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded bg-surface-container-lowest border border-primary text-primary font-label text-label-md hover:bg-surface-container-low transition-colors cursor-pointer font-semibold"
                title="Preview document in legal format before submitting"
              >
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                <span>Preview Document</span>
              </button>

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
                onClick={handleProceedDeclaration}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-primary text-on-primary font-label text-label-md hover:opacity-95 transition-colors cursor-pointer shadow-sm"
              >
                <span>Proceed to Form-A Declaration</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Word Document Preview Modal with Multi-Bank Support */}
      <WordDocumentPreviewModal
        isOpen={showWordPreview}
        onClose={() => setShowWordPreview(false)}
        bankName={bankName}
        valuerName="Vr. R. Ramasamy"
        ibbiRegNo="IBBI/RV/05/2019/11482"
        empanelmentCode="CAN-TN-2024-089"
        dateOfDeclaration="14.05.2026"
        dateOfInspection="13.05.2026"
        placeOfSigning="Chennai, Tamil Nadu"
      />
    </div>
  </div>
);
}
