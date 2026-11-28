import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import CompanyAdminSidebar from '../../components/company-admin/CompanyAdminSidebar';
import WordDocumentPreviewModal from '../../components/company-admin/WordDocumentPreviewModal';

const bankDirectory = [
  {
    bank: 'Canara Bank',
    branches: [
      { branch: 'Hi Tech Agri Finance Branch', ifsc: 'CNRB0003841' },
      { branch: 'Anna Nagar Branch, Chennai', ifsc: 'CNRB0000912' },
      { branch: 'T. Nagar Commercial Branch, Chennai', ifsc: 'CNRB0001425' },
    ],
  },
  {
    bank: 'State Bank of India (SBI)',
    branches: [
      { branch: 'Commercial Credit Branch', ifsc: 'SBIN0004312' },
      { branch: 'SME Guindy Branch, Chennai', ifsc: 'SBIN0007128' },
      { branch: 'Mount Road Branch, Chennai', ifsc: 'SBIN0000800' },
    ],
  },
  {
    bank: 'HDFC Bank',
    branches: [
      { branch: 'Retail Asset & Mortgage Hub', ifsc: 'HDFC0001290' },
      { branch: 'Nungambakkam Branch, Chennai', ifsc: 'HDFC0000186' },
      { branch: 'Velachery Branch, Chennai', ifsc: 'HDFC0002419' },
    ],
  },
  {
    bank: 'ICICI Bank',
    branches: [
      { branch: 'Structured Mortgage Hub', ifsc: 'ICIC0000077' },
      { branch: 'Adyar Branch, Chennai', ifsc: 'ICIC0000391' },
    ],
  },
  {
    bank: 'Bank of Baroda',
    branches: [
      { branch: 'Zonal Valuation Cell', ifsc: 'BARB0CHMAIN' },
      { branch: 'Tambaram Branch, Chennai', ifsc: 'BARB0TAMBAR' },
    ],
  },
  {
    bank: 'Punjab National Bank (PNB)',
    branches: [
      { branch: 'Large Corporate Branch', ifsc: 'PUNB0441200' },
      { branch: 'Mylapore Branch, Chennai', ifsc: 'PUNB0032800' },
    ],
  },
  {
    bank: 'Axis Bank',
    branches: [
      { branch: 'Structured Lending Branch', ifsc: 'UTIB0000421' },
      { branch: 'OMR Sholinganallur Branch, Chennai', ifsc: 'UTIB0001924' },
    ],
  },
  {
    bank: 'Union Bank of India',
    branches: [
      { branch: 'Mid Corporate Branch', ifsc: 'UBIN0534218' },
      { branch: 'Egmore Branch, Chennai', ifsc: 'UBIN0530816' },
    ],
  },
  {
    bank: 'Indian Bank',
    branches: [
      { branch: 'Corporate & Retail Credit', ifsc: 'IDIB000H041' },
      { branch: 'Royapettah Branch, Chennai', ifsc: 'IDIB000R018' },
    ],
  },
];

function getInitialBankSelection(bankParam) {
  const fallback = bankDirectory[0];
  if (!bankParam) {
    return {
      bank: fallback.bank,
      branch: fallback.branches[0].branch,
      ifsc: fallback.branches[0].ifsc,
    };
  }
  const normalized = bankParam.toLowerCase();
  const matched = bankDirectory.find(
    (entry) =>
      normalized.includes(entry.bank.toLowerCase()) ||
      entry.branches.some((b) => normalized.includes(b.branch.toLowerCase()))
  );
  if (!matched) {
    return {
      bank: fallback.bank,
      branch: fallback.branches[0].branch,
      ifsc: fallback.branches[0].ifsc,
    };
  }
  const matchedBranch =
    matched.branches.find((b) => normalized.includes(b.branch.toLowerCase())) || matched.branches[0];
  return {
    bank: matched.bank,
    branch: matchedBranch.branch,
    ifsc: matchedBranch.ifsc,
  };
}

export default function ValuationFormDeclarationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const bankParam = searchParams.get('bank');
  const initialSelection = getInitialBankSelection(bankParam);
  const [selectedBank, setSelectedBank] = useState(initialSelection.bank);
  const [selectedBranch, setSelectedBranch] = useState(initialSelection.branch);
  const [selectedIfsc, setSelectedIfsc] = useState(initialSelection.ifsc);

  const activeBankEntry =
    bankDirectory.find((entry) => entry.bank === selectedBank) || bankDirectory[0];
  const branchOptions = activeBankEntry.branches;
  const bankName = `${selectedBank} — ${selectedBranch}`;

  const handleBankChange = (e) => {
    const newBank = e.target.value;
    setSelectedBank(newBank);
    const entry = bankDirectory.find((item) => item.bank === newBank) || bankDirectory[0];
    setSelectedBranch(entry.branches[0].branch);
    setSelectedIfsc(entry.branches[0].ifsc);
  };

  const handleBranchChange = (e) => {
    const newBranch = e.target.value;
    setSelectedBranch(newBranch);
    const matched = branchOptions.find((item) => item.branch === newBranch);
    if (matched) setSelectedIfsc(matched.ifsc);
  };

  const handleIfscChange = (e) => {
    const newIfsc = e.target.value;
    setSelectedIfsc(newIfsc);
    const matched = branchOptions.find((item) => item.ifsc === newIfsc);
    if (matched) setSelectedBranch(matched.branch);
  };

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
  const [showWordPreview, setShowWordPreview] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const handlePreviewWord = () => {
    setShowWordPreview(true);
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
              onClick={handlePreviewWord}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded bg-primary text-white font-label text-label-md hover:bg-primary/90 transition-colors duration-state-change whitespace-nowrap cursor-pointer shadow-xs font-semibold"
              title="Preview document in legal format before downloading as Word or PDF"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              <span>Preview Document</span>
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
        {/* Bank Selection Card */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-md p-4 sm:p-5 shadow-xs flex flex-col gap-3.5 sm:gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant pb-3 sm:pb-3.5">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">account_balance</span>
              </span>
              <div>
                <h2 className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-primary">
                  Bank &amp; Report Format
                </h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Select the bank template to apply for Document Preview and Certified Report export.
                </p>
              </div>
            </div>

            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label text-[12px] font-semibold">
              {/hdfc/i.test(bankName)
                ? 'HDFC Bank Format'
                : /state bank|sbi/i.test(bankName)
                  ? 'SBI Format'
                  : /canara/i.test(bankName)
                    ? 'Canara Bank Format'
                    : 'Standard Bank Format'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-sm text-on-surface font-semibold">Select Bank</span>
              <select
                value={selectedBank}
                onChange={handleBankChange}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
              >
                {bankDirectory.map((entry) => (
                  <option key={entry.bank} value={entry.bank}>
                    {entry.bank}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-sm text-on-surface font-semibold">Bank Branch</span>
              <select
                value={selectedBranch}
                onChange={handleBranchChange}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
              >
                {branchOptions.map((item) => (
                  <option key={item.branch} value={item.branch}>
                    {item.branch}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-sm text-on-surface font-semibold">IFSC No.</span>
              <select
                value={selectedIfsc}
                onChange={handleIfscChange}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-[12px] text-primary focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
              >
                {branchOptions.map((item) => (
                  <option key={item.ifsc} value={item.ifsc}>
                    {item.ifsc}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

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
                  onClick={handlePreviewWord}
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

            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowSuccessModal(false);
                    setShowWordPreview(true);
                  }}
                  className="flex-1 py-2 px-3 rounded bg-black text-white font-label text-label-md hover:bg-gray-800 transition-colors shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  <span>Preview Word File</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowSuccessModal(false);
                    setShowWordPreview(true);
                  }}
                  className="py-2 px-3 rounded border border-outline-variant bg-surface-container-lowest text-primary font-label text-label-md hover:bg-surface-container-low transition-colors flex items-center justify-center gap-1.5"
                  title="Download .doc file with custom page sequence"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Download .doc</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate('/company-admin/valuation')}
                  className="flex-1 py-1.5 px-3 rounded border border-outline-variant bg-surface text-on-surface-variant font-label text-label-sm hover:bg-surface-container-low transition-colors"
                >
                  Valuation Queue
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/company-admin/reports')}
                  className="flex-1 py-1.5 px-3 rounded bg-tertiary text-on-tertiary font-label text-label-sm hover:opacity-95 transition-colors shadow-xs"
                >
                  View Certified Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8-Page Word Document Preview Modal with Custom Re-ordering & Location Photo Attachment */}
      <WordDocumentPreviewModal
        isOpen={showWordPreview}
        onClose={() => setShowWordPreview(false)}
        bankName={bankName}
        valuerName={valuerName}
        ibbiRegNo={ibbiRegNo}
        empanelmentCode={empanelmentCode}
        dateOfDeclaration={dateOfDeclaration}
        dateOfInspection="13.05.2026"
        placeOfSigning={placeOfSigning}
      />
    </div>
  </div>
);
}
