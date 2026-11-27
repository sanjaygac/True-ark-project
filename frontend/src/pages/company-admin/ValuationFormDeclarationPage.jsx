import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

export default function ValuationFormDeclarationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const bankParam = searchParams.get('bank');
  const bankName = bankParam || 'Canara Bank — Hi Tech Agri Finance Branch';

  // Card 1: 3 Statutory Declarations
  const [decl1, setDecl1] = useState(true);
  const [decl2, setDecl2] = useState(true);
  const [decl3, setDecl3] = useState(true);

  // Card 2: Credentials & Sign-Off
  const [valuerName, setValuerName] = useState('Arjun Mehta, B.E. (Civil), FIV');
  const [ibbiRegNo, setIbbiRegNo] = useState('IBBI/RV/05/2019/11482');
  const [empanelmentCode, setEmpanelmentCode] = useState('CAN-TN-2024-089');
  const [placeOfSigning, setPlaceOfSigning] = useState('Chennai, Tamil Nadu');
  const [dateOfDeclaration, setDateOfDeclaration] = useState('2026-11-26');
  const [dscReady, setDscReady] = useState(true);

  // UI Feedback States
  const [draftSaved, setDraftSaved] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    document.title = `Valuation Form — Form-A: Declaration — ${bankName} — TrueArk`;
  }, [bankName]);

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  };

  const handleCertifySubmit = (e) => {
    e.preventDefault();
    if (!decl1 || !decl2 || !decl3) {
      alert('Please check and confirm all mandatory statutory declarations before certifying the report.');
      return;
    }
    setShowSuccessModal(true);
  };

  const handleGeneratePdf = () => {
    navigate('/company-admin/reports');
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
              onClick={handleGeneratePdf}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded bg-tertiary text-on-tertiary font-label text-label-md hover:opacity-95 transition-colors duration-state-change whitespace-nowrap cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
              <span>Generate Official PDF</span>
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

              {/* Step 5: Completed */}
              <li>
                <Link
                  to={`/company-admin/valuation/new/part-f?bank=${encodeURIComponent(bankName)}`}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-surface-container-lowest border border-secondary/40 hover:bg-surface-container-low transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  </span>
                  <span className="font-label text-[11px] sm:text-label-sm text-on-secondary-container leading-tight truncate">
                    5. Part F: Summary
                  </span>
                </Link>
              </li>

              {/* Step 6: Active */}
              <li aria-current="step" className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-primary-container border border-primary">
                <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 font-label text-[11px] tabular-nums font-bold">
                  6
                </span>
                <span className="font-label text-[11px] sm:text-label-sm text-primary font-semibold leading-tight truncate">
                  6. Form-A: Declaration
                </span>
              </li>
            </ol>
          </div>
        </nav>
      </header>

      {/* Main Form Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 flex flex-col gap-3">
        {/* Card 1: Statutory Form-A Declaration */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-md p-4 sm:p-5 shadow-xs flex flex-col gap-3.5 sm:gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant pb-3 sm:pb-3.5">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">verified_user</span>
              </span>
              <div>
                <h2 className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-primary">
                  Form-A — Statutory Valuer Declaration
                </h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Mandatory declaration under Wealth Tax Rule 8D / IBBI (Valuation) Rules for bank collateral certification.
                </p>
              </div>
            </div>

            <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label text-[12px] font-semibold tabular-nums">
              Certified FMV: ₹2,26,00,000
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {/* Declaration Item 1 */}
            <label className="flex items-start gap-3 p-3 sm:p-3.5 rounded border border-outline-variant bg-surface cursor-pointer hover:border-primary/50 transition-colors">
              <input
                type="checkbox"
                checked={decl1}
                onChange={(e) => setDecl1(e.target.checked)}
                className="mt-0.5 rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer"
              />
              <span className="font-body text-body-sm text-on-surface leading-relaxed">
                I hereby declare that I have personally inspected the property at S.No. 142/3B, Kelambakkam on 24 Nov 2026 and verified physical measurements against the title deed and TSLR extract.
              </span>
            </label>

            {/* Declaration Item 2 */}
            <label className="flex items-start gap-3 p-3 sm:p-3.5 rounded border border-outline-variant bg-surface cursor-pointer hover:border-primary/50 transition-colors">
              <input
                type="checkbox"
                checked={decl2}
                onChange={(e) => setDecl2(e.target.checked)}
                className="mt-0.5 rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer"
              />
              <span className="font-body text-body-sm text-on-surface leading-relaxed">
                I have no direct or indirect financial interest in the property valued, nor any relationship with the borrower or title holder.
              </span>
            </label>

            {/* Declaration Item 3 */}
            <label className="flex items-start gap-3 p-3 sm:p-3.5 rounded border border-outline-variant bg-surface cursor-pointer hover:border-primary/50 transition-colors">
              <input
                type="checkbox"
                checked={decl3}
                onChange={(e) => setDecl3(e.target.checked)}
                className="mt-0.5 rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer"
              />
              <span className="font-body text-body-sm text-on-surface leading-relaxed">
                The Present Fair Market Value (₹2,26,00,000), Realizable Sale Value (₹2,03,40,000), and Distress Value (₹1,92,10,000) stated herein are true and fair to the best of my professional knowledge.
              </span>
            </label>
          </div>
        </section>

        {/* Card 2: Certifying Valuer Credentials & Sign-Off */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-md p-4 sm:p-5 shadow-xs flex flex-col gap-3.5 sm:gap-4">
          <div className="flex items-center gap-3 border-b border-outline-variant pb-3 sm:pb-3.5">
            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">draw</span>
            </span>
            <div>
              <h2 className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-primary">
                Certifying Valuer Credentials &amp; Sign-Off
              </h2>
              <p className="font-body text-body-sm text-on-surface-variant">
                Empaneled valuer registration, digital signature, and official seal details.
              </p>
            </div>
          </div>

          <form onSubmit={handleCertifySubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
              {/* Approved Valuer Name */}
              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-sm text-on-surface font-semibold">Approved Valuer Name</span>
                <input
                  type="text"
                  value={valuerName}
                  onChange={(e) => setValuerName(e.target.value)}
                  className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                />
              </label>

              {/* IBBI Registration No. */}
              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-sm text-on-surface font-semibold">IBBI Registration No.</span>
                <input
                  type="text"
                  value={ibbiRegNo}
                  onChange={(e) => setIbbiRegNo(e.target.value)}
                  className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-[12px] text-primary focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                />
              </label>

              {/* Empanelment Code */}
              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-sm text-on-surface font-semibold">Bank Empanelment Code</span>
                <input
                  type="text"
                  value={empanelmentCode}
                  onChange={(e) => setEmpanelmentCode(e.target.value)}
                  className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-[12px] text-primary focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                />
              </label>

              {/* Place of Signing */}
              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-sm text-on-surface font-semibold">Place of Signing</span>
                <input
                  type="text"
                  value={placeOfSigning}
                  onChange={(e) => setPlaceOfSigning(e.target.value)}
                  className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                />
              </label>

              {/* Date of Declaration */}
              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-sm text-on-surface font-semibold">Date of Declaration</span>
                <input
                  type="date"
                  value={dateOfDeclaration}
                  onChange={(e) => setDateOfDeclaration(e.target.value)}
                  className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-[12px] text-on-surface tabular-nums focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                />
              </label>

              {/* Digital Signature & Seal */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label text-label-sm text-on-surface font-semibold">Digital Signature &amp; Seal</span>
                <div
                  onClick={() => setDscReady(!dscReady)}
                  className="flex items-center justify-between gap-3 rounded border border-outline-variant bg-surface px-3 py-2 cursor-pointer hover:border-secondary transition-colors"
                  title="Click to toggle DSC status"
                >
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-[18px] ${dscReady ? 'text-secondary' : 'text-outline'}`}>
                      verified
                    </span>
                    <span className="font-body text-body-sm text-on-surface">
                      {dscReady ? 'DSC Token Attached' : 'No Token Attached'}
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-label text-[11px] font-medium ${
                      dscReady
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-surface-container-low text-on-surface-variant'
                    }`}
                  >
                    {dscReady ? 'Ready' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-3 border-t border-outline-variant flex flex-wrap items-center justify-between gap-3">
              <Link
                to={`/company-admin/valuation/new/part-f?bank=${encodeURIComponent(bankName)}`}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded bg-surface-container-lowest border border-outline-variant text-primary font-label text-label-md hover:bg-surface-container-low transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <span>Previous: Part F Summary</span>
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
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-primary text-on-primary font-label text-label-md hover:opacity-95 transition-colors cursor-pointer shadow-sm font-semibold"
                >
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Certify &amp; Submit Report</span>
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-lg bg-surface-container-lowest p-6 shadow-xl border border-outline-variant flex flex-col gap-4 text-center">
            <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                task_alt
              </span>
            </div>

            <div>
              <h3 className="font-headline text-[18px] font-bold text-primary">
                Valuation Report Certified
              </h3>
              <p className="font-body text-body-sm text-on-surface-variant mt-1">
                Assignment <span className="font-mono text-primary font-semibold">#TA-2026-089</span> has been certified with Form-A declaration and signed with DSC.
              </p>
            </div>

            <div className="p-3 rounded bg-surface-container-low border border-outline-variant text-left flex flex-col gap-1 text-[12px]">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Bank:</span>
                <span className="font-semibold text-primary truncate max-w-[240px]">{bankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Assessed FMV:</span>
                <span className="font-bold text-on-secondary-container">₹2,26,00,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Valuer:</span>
                <span className="font-medium text-primary">{valuerName}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/company-admin/valuation')}
                className="flex-1 py-2 px-3 rounded border border-outline-variant bg-surface-container-lowest text-primary font-label text-label-md hover:bg-surface-container-low transition-colors"
              >
                Valuation Queue
              </button>
              <button
                type="button"
                onClick={() => navigate('/company-admin/reports')}
                className="flex-1 py-2 px-3 rounded bg-tertiary text-on-tertiary font-label text-label-md hover:opacity-95 transition-colors shadow-xs"
              >
                View Certified Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
