import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

const locationData = {
  Chengalpattu: {
    Thiruporur: ['Kelambakkam', 'Padur', 'Thaiyur', 'Kovalam', 'Siruseri', 'Navallur', 'Thiruporur', 'Muttukadu'],
    Chengalpattu: ['Chengalpattu', 'Singaperumal Koil', 'Maraimalai Nagar', 'Pulipakkam', 'Vallam', 'Venbakkam'],
    Tambaram: ['Tambaram', 'Selaiyur', 'Sembakkam', 'Madambakkam', 'Perungalathur', 'Peerkankaranai'],
    Pallavaram: ['Pallavaram', 'Chromepet', 'Keelkattalai', 'Pozhichalur', 'Pammal', 'Anakaputhur'],
    Vandalur: ['Vandalur', 'Urapakkam', 'Guduvanchery', 'Mannivakkam', 'Nedunkundram', 'Kolapakkam'],
    Madurantakam: ['Madurantakam', 'Karunguzhi', 'Padalam', 'Mamandur', 'Lakshminarayanapuram'],
    Thirukalukundram: ['Thirukalukundram', 'Mahabalipuram', 'Pudupattinam', 'Sadras', 'Manamai'],
  },
  Chennai: {
    Sholinganallur: ['Sholinganallur', 'Karapakkam', 'Perungudi', 'Thoraipakkam', 'Pallikaranai', 'Medavakkam'],
    Guindy: ['Guindy', 'Adyar', 'Velachery', 'St. Thomas Mount', 'Alwarpet'],
    Mylapore: ['Mylapore', 'Triplicane', 'Santhome', 'Teynampet', 'Mandaveli'],
    Ambattur: ['Ambattur', 'Mogappair', 'Korattur', 'Padi', 'Athipattu'],
    Madhavaram: ['Madhavaram', 'Puzhal', 'Manali', 'Mathur', 'Kathivakkam'],
  },
  Kancheepuram: {
    Kancheepuram: ['Kancheepuram', 'Enadur', 'Orikkai', 'Sevilimedu', 'Ayyampettai'],
    Sriperumbudur: ['Sriperumbudur', 'Irungattukottai', 'Oragadam', 'Sunguvarchatram', 'Vallakottai'],
    Kundrathur: ['Kundrathur', 'Mangadu', 'Kovur', 'Somangalam', 'Gerugambakkam'],
    Walajabad: ['Walajabad', 'Thenneri', 'Ayyampettai', 'Uthiramerur Road'],
  },
  Tiruvallur: {
    Avadi: ['Avadi', 'Pattabiram', 'Thirumullaivoyal', 'Paruthipattu', 'Vellanur'],
    Poonamallee: ['Poonamallee', 'Kattupakkam', 'Sennerkuppam', 'Nazarathpettai', 'Thirumazhisai'],
    Ponneri: ['Ponneri', 'Minjur', 'Gummidipoondi', 'Pazhaverkadu', 'Andarkuppam'],
    Tiruvallur: ['Tiruvallur', 'Kakkalur', 'Putlur', 'Sevvapet', 'Vengal'],
  },
  Coimbatore: {
    'Coimbatore South': ['Peelamedu', 'Singanallur', 'Uppilipalayam', 'Sowripalayam', 'Ondipudur'],
    'Coimbatore North': ['Saravanampatti', 'Thudiyalur', 'Kurudampalayam', 'Kalapatti', 'Vilankurichi'],
    Pollachi: ['Pollachi', 'Zamin Uthukuli', 'Achipatti', 'Suleeswaranpatti', 'Kinathukadavu'],
    Mettupalayam: ['Mettupalayam', 'Karamadai', 'Sirumugai', 'Odanthurai'],
  },
  Madurai: {
    'Madurai North': ['Anna Nagar', 'K. Pudur', 'Othakadai', 'Y. Othakadai', 'Karuppayurani'],
    'Madurai South': ['Tirupparankundram', 'Avaniyapuram', 'Villapuram', 'Pasumalai'],
    Melur: ['Melur', 'Keelavalavu', 'Kottampatti', 'Vellalur'],
  },
  Tiruchirappalli: {
    Srirangam: ['Srirangam', 'Thiruvanaikoil', 'Somarasampettai', 'Jeeyapuram'],
    'Tiruchirappalli East': ['Thillai Nagar', 'K.K. Nagar', 'Ariyamangalam', 'Ponmalai'],
    Lalgudi: ['Lalgudi', 'Poovalur', 'Pullambadi', 'Manachanallur'],
  },
  Salem: {
    Salem: ['Hasthampatti', 'Fairlands', 'Ammapet', 'Kondalampatti'],
    Yercaud: ['Yercaud', 'Nagalur', 'Vellakadai', 'Semmanatham'],
    Attur: ['Attur', 'Thalaivasal', 'Pethanaickenpalayam'],
  },
  Vellore: {
    Vellore: ['Katpadi', 'Sathuvachari', 'Bagayam', 'Thorapadi'],
    Gudiyatham: ['Gudiyatham', 'Pernambut', 'Melpatti'],
  },
  Erode: {
    Erode: ['Perundurai', 'Chithode', 'Veerappanchatram', 'Surampatti'],
    Gobichettipalayam: ['Gobichettipalayam', 'Sathyamangalam', 'Nambiyur'],
  },
};

const initialVerifiedDocs = [
  {
    type: 'Registered Sale Deed',
    refNo: 'Doc No. 3841 / 2019',
    date: '18 Jul 2019',
    authority: 'SRO Thiruporur',
    status: 'Verified',
  },
  {
    type: 'Patta / TSLR Extract',
    refNo: 'Patta No. 1924',
    date: '09 Oct 2026',
    authority: 'Tahsildar, Thiruporur',
    status: 'Verified',
  },
  {
    type: 'Encumbrance Certificate (EC)',
    refNo: 'EC/2026/88412',
    date: '20 Nov 2026',
    authority: 'TNREGINET (15 Years)',
    status: 'Nil Encumbrance',
  },
];

export default function ValuationFormPartAPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Selected Bank Name from query parameters or default
  const bankParam = searchParams.get('bank');
  const bankName = bankParam || 'Canara Bank — Hi Tech Agri Finance Branch';

  // Card 1: Purpose & Bank Reference State
  const [purpose, setPurpose] = useState('Mortgage / Collateral Security');
  const [inspectionDate, setInspectionDate] = useState('2026-11-24');
  const [reportDate, setReportDate] = useState('2026-11-26');
  const [bankBranch, setBankBranch] = useState(bankName);
  const [loanRefNo, setLoanRefNo] = useState('CB/HTAF/2026/LN-4418');
  const [borrowerName, setBorrowerName] = useState('Raghavan & Sons Agro Enterprises Pvt. Ltd.');
  const [ownerName, setOwnerName] = useState('Mr. Karthik Raghavan S/o Late V. Raghavan');
  const [personMetAtSite, setPersonMetAtSite] = useState('Mr. Karthik Raghavan (Owner)');

  // Card 2: Property Identification & Location State
  const [classification, setClassification] = useState('Residential Land & Building (G+1)');
  const [tenure, setTenure] = useState('Freehold (Absolute Title)');
  const [sroOffice, setSroOffice] = useState('SRO Thiruporur');
  const [surveyNo, setSurveyNo] = useState('142');
  const [subDivision, setSubDivision] = useState('3B (Plot No. 14)');
  const [tsNo, setTsNo] = useState('TS-142/3B');
  const [postalAddress, setPostalAddress] = useState(
    'Plot No. 14, Sri Sai Nagar Main Road, Kelambakkam, Chengalpattu — 603103'
  );

  // Cascading Location Dropdowns State
  const [selectedDistrict, setSelectedDistrict] = useState('Chengalpattu');
  const [selectedTaluk, setSelectedTaluk] = useState('Thiruporur');
  const [selectedVillage, setSelectedVillage] = useState('Kelambakkam');

  const [latitude, setLatitude] = useState('12.7894° N');
  const [longitude, setLongitude] = useState('80.2215° E');
  const [localBody, setLocalBody] = useState('Kelambakkam Town Panchayat');

  // Card 3: Documents Verified State
  const [verifiedDocs] = useState(initialVerifiedDocs);
  const [remarks, setRemarks] = useState(
    'Property boundaries on site match Sale Deed Doc No. 3841/2019 and TSLR extract. Title is clear, marketable, and free from prior encumbrances.'
  );

  // UI Feedback States
  const [draftSaved, setDraftSaved] = useState(false);
  const [showNextToast, setShowNextToast] = useState(false);

  useEffect(() => {
    document.title = `Valuation Form — Part A — ${bankName} — TrueArk`;
  }, [bankName]);

  // Update bank branch when bankParam changes
  useEffect(() => {
    if (bankParam) {
      setBankBranch(bankParam);
    }
  }, [bankParam]);

  // Handle District Change
  const handleDistrictChange = (e) => {
    const newDistrict = e.target.value;
    setSelectedDistrict(newDistrict);
    const taluks = Object.keys(locationData[newDistrict] || {});
    const defaultTaluk = taluks[0] || '';
    setSelectedTaluk(defaultTaluk);
    const villages = (locationData[newDistrict] && locationData[newDistrict][defaultTaluk]) || [];
    setSelectedVillage(villages[0] || '');
  };

  // Handle Taluk Change
  const handleTalukChange = (e) => {
    const newTaluk = e.target.value;
    setSelectedTaluk(newTaluk);
    const villages = (locationData[selectedDistrict] && locationData[selectedDistrict][newTaluk]) || [];
    setSelectedVillage(villages[0] || '');
  };

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  };

  const handleNextPart = () => {
    setShowNextToast(true);
    setTimeout(() => {
      navigate(`/company-admin/valuation/new/part-b?bank=${encodeURIComponent(bankName)}`);
    }, 400);
  };

  const districts = Object.keys(locationData);
  const taluks = Object.keys(locationData[selectedDistrict] || {});
  const villages = (locationData[selectedDistrict] && locationData[selectedDistrict][selectedTaluk]) || [];

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
              onClick={handleNextPart}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded bg-tertiary text-on-tertiary font-label text-label-md hover:opacity-95 transition-colors duration-state-change whitespace-nowrap cursor-pointer shadow-xs"
            >
              <span>Next: Part B Land</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* 6-Step Horizontal Progress Stepper */}
        <nav aria-label="Valuation Form Steps" className="bg-surface border-t border-outline-variant overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-2.5">
            <ol className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 min-w-[620px] lg:min-w-0">
              {/* Step 1: Active */}
              <li aria-current="step" className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-primary-container border border-primary">
                <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 font-label text-[11px] tabular-nums font-bold">
                  1
                </span>
                <span className="font-label text-[11px] sm:text-label-sm text-primary font-semibold leading-tight truncate">
                  1. Part A: General
                </span>
              </li>

              {/* Step 2 */}
              <li className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-surface-container-lowest border border-outline-variant hover:border-primary/50 transition-colors">
                <Link
                  to={`/company-admin/valuation/new/part-b?bank=${encodeURIComponent(bankName)}`}
                  className="flex items-center gap-2 w-full"
                >
                  <span className="w-5 h-5 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center shrink-0 font-label text-[11px] tabular-nums">
                    2
                  </span>
                  <span className="font-label text-[11px] sm:text-label-sm text-on-surface-variant leading-tight truncate">
                    2. Part B: Land & GLR
                  </span>
                </Link>
              </li>

              {/* Step 3 */}
              <li className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-surface-container-lowest border border-outline-variant opacity-80">
                <span className="w-5 h-5 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center shrink-0 font-label text-[11px] tabular-nums">
                  3
                </span>
                <span className="font-label text-[11px] sm:text-label-sm text-on-surface-variant leading-tight truncate">
                  3. Part C: Building
                </span>
              </li>

              {/* Step 4 */}
              <li className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-surface-container-lowest border border-outline-variant opacity-80">
                <span className="w-5 h-5 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center shrink-0 font-label text-[11px] tabular-nums">
                  4
                </span>
                <span className="font-label text-[11px] sm:text-label-sm text-on-surface-variant leading-tight truncate">
                  4. Part D & E: Services
                </span>
              </li>

              {/* Step 5 */}
              <li className="flex items-center gap-2 px-2.5 py-1.5 rounded bg-surface-container-lowest border border-outline-variant opacity-80">
                <span className="w-5 h-5 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center shrink-0 font-label text-[11px] tabular-nums">
                  5
                </span>
                <span className="font-label text-[11px] sm:text-label-sm text-on-surface-variant leading-tight truncate">
                  5. Part F: Summary
                </span>
              </li>

              {/* Step 6 */}
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
            Part A saved. Proceeding to Part B: Land & GLR/PMR...
          </span>
        </div>
      )}

      {/* Main Form Content (same gap size as Company Master & Plan Master) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 flex flex-col gap-3">
        {/* Card 1: Purpose & Bank Reference */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-md p-4 sm:p-5 shadow-sm flex flex-col gap-3.5">
          <div className="flex items-center gap-3 border-b border-outline-variant pb-2.5">
            <span className="w-8 h-8 rounded bg-primary-container text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-title-md">account_balance</span>
            </span>
            <div>
              <h2 className="font-headline text-headline-sm text-primary">Purpose &amp; Bank Reference</h2>
              <p className="font-body text-body-sm text-on-surface-variant">
                Mandate details, inspection dates, borrower identity, and title holder particulars.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Purpose of Valuation</span>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                <option>Mortgage / Collateral Security</option>
                <option>Term Loan Renewal / Revaluation</option>
                <option>NPA / SARFAESI Reserve Price</option>
                <option>Capital Gains / Fair Market Assessment</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Date of Site Inspection</span>
              <input
                type="date"
                value={inspectionDate}
                onChange={(e) => setInspectionDate(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-[13px] text-on-surface tabular-nums focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Date of Valuation Report</span>
              <input
                type="date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-[13px] text-on-surface tabular-nums focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Bank &amp; Branch Name</span>
              <input
                type="text"
                value={bankBranch}
                onChange={(e) => setBankBranch(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Bank Loan Reference No.</span>
              <input
                type="text"
                value={loanRefNo}
                onChange={(e) => setLoanRefNo(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-[13px] text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Borrower / Applicant Name</span>
              <input
                type="text"
                value={borrowerName}
                onChange={(e) => setBorrowerName(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5 md:col-span-2">
              <span className="font-label text-label-md text-on-surface">Registered Owner Name(s) as per Title Deed</span>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Person Met at Site</span>
              <input
                type="text"
                value={personMetAtSite}
                onChange={(e) => setPersonMetAtSite(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </label>
          </div>
        </section>

        {/* Card 2: Property Identification & Location */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-md p-4 sm:p-5 shadow-sm flex flex-col gap-3.5">
          <div className="flex items-center gap-3 border-b border-outline-variant pb-2.5">
            <span className="w-8 h-8 rounded bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-title-md">pin_drop</span>
            </span>
            <div>
              <h2 className="font-headline text-headline-sm text-primary">Property Identification &amp; Location</h2>
              <p className="font-body text-body-sm text-on-surface-variant">
                Revenue survey references, municipal address, SRO jurisdiction, and GIS coordinates.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Property Classification</span>
              <select
                value={classification}
                onChange={(e) => setClassification(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                <option>Residential Land &amp; Building (G+1)</option>
                <option>Vacant Residential Plot</option>
                <option>Commercial Complex</option>
                <option>Industrial Shed &amp; Land</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Tenure / Ownership Type</span>
              <select
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                <option>Freehold (Absolute Title)</option>
                <option>Leasehold</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Sub-Registrar Office (SRO)</span>
              <input
                type="text"
                value={sroOffice}
                onChange={(e) => setSroOffice(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Survey No.</span>
              <input
                type="text"
                value={surveyNo}
                onChange={(e) => setSurveyNo(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-[13px] text-primary tabular-nums focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Sub-Division</span>
              <input
                type="text"
                value={subDivision}
                onChange={(e) => setSubDivision(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-[13px] text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">T.S. No.</span>
              <input
                type="text"
                value={tsNo}
                onChange={(e) => setTsNo(e.target.value)}
                placeholder="e.g., TS-142/3B"
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-[13px] text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5 md:col-span-3">
              <span className="font-label text-label-md text-on-surface">Postal Address of Property</span>
              <input
                type="text"
                value={postalAddress}
                onChange={(e) => setPostalAddress(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </label>

            {/* Cascading Location Selectors */}
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">District</span>
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Taluk</span>
              <select
                value={selectedTaluk}
                onChange={handleTalukChange}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                {taluks.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Village</span>
              <select
                value={selectedVillage}
                onChange={(e) => setSelectedVillage(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                {villages.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Latitude</span>
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-[13px] text-primary tabular-nums focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Longitude</span>
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-[13px] text-primary tabular-nums focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">Local Body Jurisdiction</span>
              <input
                type="text"
                value={localBody}
                onChange={(e) => setLocalBody(e.target.value)}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </label>
          </div>
        </section>

        {/* Card 3: Legal & Title Documents Verified */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-md p-4 sm:p-5 shadow-sm flex flex-col gap-3.5">
          <div className="flex items-center gap-3 border-b border-outline-variant pb-2.5">
            <span className="w-8 h-8 rounded bg-primary-container text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-title-md">gavel</span>
            </span>
            <div>
              <h2 className="font-headline text-headline-sm text-primary">Legal &amp; Title Documents Verified</h2>
              <p className="font-body text-body-sm text-on-surface-variant">
                Perused original/photocopy title deeds, revenue extracts, and encumbrance records.
              </p>
            </div>
          </div>

          <div className="border border-outline-variant rounded-md overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low border-b border-outline-variant">
                <tr>
                  <th scope="col" className="px-3.5 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                    Document Type
                  </th>
                  <th scope="col" className="px-3.5 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                    Registration / Ref No.
                  </th>
                  <th scope="col" className="px-3.5 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                    Date
                  </th>
                  <th scope="col" className="px-3.5 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                    Issuing Authority
                  </th>
                  <th scope="col" className="px-3.5 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {verifiedDocs.map((doc, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-3.5 py-3 font-label text-label-md text-primary whitespace-nowrap">
                      {doc.type}
                    </td>
                    <td className="px-3.5 py-3 font-mono text-[13px] text-primary whitespace-nowrap">
                      {doc.refNo}
                    </td>
                    <td className="px-3.5 py-3 font-body text-body-sm text-on-surface-variant tabular-nums whitespace-nowrap">
                      {doc.date}
                    </td>
                    <td className="px-3.5 py-3 font-body text-body-sm text-on-surface whitespace-nowrap">
                      {doc.authority}
                    </td>
                    <td className="px-3.5 py-3 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-label-sm">
                        {doc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="font-label text-label-md text-on-surface">Title &amp; Boundary Consistency Remarks</span>
            <textarea
              rows={2}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </label>
        </section>

        {/* Bottom Navigation Actions */}
        <div className="flex items-center justify-between gap-3 pt-1 pb-4">
          <Link
            to="/company-admin/valuation"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded bg-surface-container-lowest border border-outline-variant text-primary font-label text-label-md hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Valuations</span>
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
              onClick={handleNextPart}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-tertiary text-on-tertiary font-label text-label-md hover:opacity-95 transition-colors cursor-pointer shadow-sm"
            >
              <span>Next: Part B Land</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
