import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import CompanyAdminSidebar from '../../components/company-admin/CompanyAdminSidebar';
import WordDocumentPreviewModal from '../../components/company-admin/WordDocumentPreviewModal';
import { getStoredProperties } from '../../utils/propertyStore';
import { reverseGeocodeLocation, parseCoordinates, formatLat, formatLon } from '../../utils/geoUtils';

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

  // Property Master integration state
  const [availableProperties, setAvailableProperties] = useState(() => getStoredProperties());
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [propertyNotice, setPropertyNotice] = useState('');
  const [isGeoResolving, setIsGeoResolving] = useState(false);

  // Card 3: Documents Verified State
  const [verifiedDocs] = useState(initialVerifiedDocs);
  const [remarks, setRemarks] = useState(
    'Property boundaries on site match Sale Deed Doc No. 3841/2019 and TSLR extract. Title is clear, marketable, and free from prior encumbrances.'
  );

  // UI Feedback States
  const [draftSaved, setDraftSaved] = useState(false);
  const [showNextToast, setShowNextToast] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWordPreview, setShowWordPreview] = useState(false);

  useEffect(() => {
    document.title = `Valuation Form — Part A — ${bankName} — TrueArk`;
  }, [bankName]);

  // Refresh available properties when window regains focus (e.g. after adding property in another tab)
  useEffect(() => {
    const handleFocus = () => {
      setAvailableProperties(getStoredProperties());
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Handle Selection of a property from Property Master
  const handleSelectPropertyFromMaster = async (propId) => {
    setSelectedPropertyId(propId);
    if (!propId) return;

    const prop = availableProperties.find((p) => p.id === propId || p.code === propId);
    if (!prop) return;

    // 1. Owner & Applicant particulars
    if (prop.owner) {
      setOwnerName(prop.owner);
      setPersonMetAtSite(`Mr. ${prop.owner} (Owner)`);
    }

    // 2. Revenue & cadastral survey
    if (prop.surveyNo) setSurveyNo(prop.surveyNo);
    else if (prop.property) {
      const match = prop.property.match(/S\.?No\.?\s*([0-9/A-Za-z]+)/i);
      if (match) setSurveyNo(match[1]);
    }
    if (prop.subDivision) setSubDivision(prop.subDivision);
    if (prop.tsNo) setTsNo(prop.tsNo);
    if (prop.sroOffice) setSroOffice(prop.sroOffice);
    if (prop.tenure) setTenure(prop.tenure);

    // 3. Classification
    if (prop.propertyType) {
      const ptLower = prop.propertyType.toLowerCase();
      if (ptLower.includes('plot') || ptLower.includes('vacant')) {
        setClassification('Vacant Residential Plot');
      } else if (ptLower.includes('commercial')) {
        setClassification('Commercial Complex');
      } else if (ptLower.includes('industrial')) {
        setClassification('Industrial Shed & Land');
      } else {
        setClassification('Residential Land & Building (G+1)');
      }
    }

    // 4. Coordinates
    const latVal = prop.latitude || (prop.coordinates ? prop.coordinates.split(',')[0].trim() : '');
    const lonVal = prop.longitude || (prop.coordinates ? prop.coordinates.split(',')[1]?.trim() : '');
    if (latVal) setLatitude(latVal);
    if (lonVal) setLongitude(lonVal);

    // 5. Postal Address, District, Taluk, Village, Local Body
    if (prop.postalAddress) setPostalAddress(prop.postalAddress);
    if (prop.district) setSelectedDistrict(prop.district);
    if (prop.taluk) setSelectedTaluk(prop.taluk);
    if (prop.village) setSelectedVillage(prop.village);
    if (prop.localBody) setLocalBody(prop.localBody);

    // 6. Reverse-geocode if any address or local body detail is missing or needs coordinate synchronization
    if (latVal && lonVal && (!prop.postalAddress || !prop.district || !prop.localBody)) {
      try {
        setIsGeoResolving(true);
        const resolved = await reverseGeocodeLocation(latVal, lonVal);
        if (resolved) {
          if (!prop.postalAddress && resolved.postalAddress) setPostalAddress(resolved.postalAddress);
          if (!prop.district && resolved.district) setSelectedDistrict(resolved.district);
          if (!prop.taluk && resolved.taluk) setSelectedTaluk(resolved.taluk);
          if (!prop.village && resolved.village) setSelectedVillage(resolved.village);
          if (!prop.localBody && resolved.localBody) setLocalBody(resolved.localBody);
        }
      } catch (err) {
        console.error('Reverse geocode error:', err);
      } finally {
        setIsGeoResolving(false);
      }
    }

    setPropertyNotice(`Selected ${prop.code} (${prop.property}) — Location details auto-filled from GPS coordinates.`);
    setTimeout(() => setPropertyNotice(''), 5500);
  };

  // Reverse geocode from current or entered Lat & Lon in Part A
  const handleReverseGeocodePartA = async (latInput, lonInput) => {
    const latToUse = latInput !== undefined ? latInput : latitude;
    const lonToUse = lonInput !== undefined ? lonInput : longitude;

    if (!String(latToUse).trim() || !String(lonToUse).trim()) {
      setPropertyNotice('Please enter both Latitude and Longitude to auto-fill location.');
      setTimeout(() => setPropertyNotice(''), 4000);
      return;
    }

    try {
      setIsGeoResolving(true);
      setPropertyNotice('Resolving location details from GPS coordinates...');
      const resolved = await reverseGeocodeLocation(latToUse, lonToUse);

      if (resolved) {
        if (resolved.postalAddress) setPostalAddress(resolved.postalAddress);
        if (resolved.district) setSelectedDistrict(resolved.district);
        if (resolved.taluk) setSelectedTaluk(resolved.taluk);
        if (resolved.village) setSelectedVillage(resolved.village);
        if (resolved.localBody) setLocalBody(resolved.localBody);
        if (resolved.latitudeFormatted) setLatitude(resolved.latitudeFormatted);
        if (resolved.longitudeFormatted) setLongitude(resolved.longitudeFormatted);
        if (resolved.sroOffice && !sroOffice) setSroOffice(resolved.sroOffice);

        setPropertyNotice(`Location auto-filled successfully from coordinates (${resolved.source || 'GPS Intelligence'})!`);
      } else {
        setPropertyNotice('Coordinates registered. You can adjust the location fields if needed.');
      }
    } catch (err) {
      setPropertyNotice('Could not reach online geocoding. Fallback values applied.');
    } finally {
      setIsGeoResolving(false);
      setTimeout(() => setPropertyNotice(''), 5500);
    }
  };
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

  const districts = useMemo(() => {
    const list = Object.keys(locationData);
    if (selectedDistrict && !list.includes(selectedDistrict)) {
      return [selectedDistrict, ...list];
    }
    return list;
  }, [selectedDistrict]);

  const taluks = useMemo(() => {
    const list = Object.keys(locationData[selectedDistrict] || {});
    if (selectedTaluk && !list.includes(selectedTaluk)) {
      return [selectedTaluk, ...list];
    }
    return list;
  }, [selectedDistrict, selectedTaluk]);

  const villages = useMemo(() => {
    const list = (locationData[selectedDistrict] && locationData[selectedDistrict][selectedTaluk]) || [];
    if (selectedVillage && !list.includes(selectedVillage)) {
      return [selectedVillage, ...list];
    }
    return list;
  }, [selectedDistrict, selectedTaluk, selectedVillage]);

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
          <div className="flex items-center justify-between border-b border-outline-variant pb-2.5 flex-wrap gap-2">
            <div className="flex items-center gap-3">
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

            <Link
              to="/company-admin/masters/property"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline px-2.5 py-1 rounded bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors"
              title="Open Property Master in a new tab"
            >
              <span className="material-symbols-outlined text-[15px]">real_estate_agent</span>
              <span>Open Property Master</span>
              <span className="material-symbols-outlined text-[13px]">open_in_new</span>
            </Link>
          </div>

          {/* Select Property from Property Master Banner */}
          <div className="bg-surface-container-low/70 border border-primary/25 rounded-lg p-3 sm:p-3.5 flex flex-col gap-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">domain</span>
                <label htmlFor="property-master-select" className="font-headline text-[13px] sm:text-[14px] font-semibold text-primary cursor-pointer">
                  Select Property from Property Master
                </label>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-secondary-container text-on-secondary-container">
                  GPS Auto-Fill
                </span>
              </div>
              <span className="text-[12px] text-on-surface-variant">
                Select a registered property to autofill its coordinates &amp; location details
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="relative flex-1">
                <select
                  id="property-master-select"
                  value={selectedPropertyId}
                  onChange={(e) => handleSelectPropertyFromMaster(e.target.value)}
                  className="w-full rounded border border-outline-variant bg-surface-container-lowest pl-3 pr-9 py-2 font-body text-body-sm text-on-surface font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none cursor-pointer"
                >
                  <option value="">-- Select Property from Property Master --</option>
                  {availableProperties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.code} — {p.property} ({p.owner}) • {p.district}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[20px]">
                  unfold_more
                </span>
              </div>

              {selectedPropertyId && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPropertyId('');
                    setPropertyNotice('Selection cleared. You can manually enter or edit property data.');
                    setTimeout(() => setPropertyNotice(''), 3000);
                  }}
                  className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded border border-outline-variant hover:bg-surface-container-low text-on-surface-variant text-[12px] font-medium cursor-pointer transition-colors"
                >
                  <span className="material-symbols-outlined text-[15px]">close</span>
                  <span>Clear Selection</span>
                </button>
              )}
            </div>

            {propertyNotice && (
              <div className="p-2 sm:px-3 rounded bg-secondary-container/60 border border-secondary/30 text-on-secondary-container font-medium text-[12px] flex items-center gap-2 animate-in fade-in duration-150">
                <span className={`material-symbols-outlined text-[17px] text-secondary ${isGeoResolving ? 'animate-spin' : ''}`}>
                  {isGeoResolving ? 'sync' : 'verified'}
                </span>
                <span className="flex-1">{propertyNotice}</span>
              </div>
            )}
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

            {/* Row 1 of Image: Postal Address of Property (3 columns) */}
            <label className="flex flex-col gap-1.5 md:col-span-3">
              <span className="font-label text-label-md text-on-surface">Postal Address of Property</span>
              <input
                type="text"
                value={postalAddress}
                onChange={(e) => setPostalAddress(e.target.value)}
                placeholder="Plot No., Street Name, Locality, City/District — PIN"
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </label>

            {/* Row 2 of Image: Cascading Location Selectors - District, Taluk, Village */}
            <label className="flex flex-col gap-1.5">
              <span className="font-label text-label-md text-on-surface">District</span>
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none cursor-pointer"
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
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none cursor-pointer"
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
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none cursor-pointer"
              >
                {villages.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>

            {/* Row 3 of Image: Latitude, Longitude, Local Body Jurisdiction */}
            <label className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-label text-label-md text-on-surface">Latitude</span>
                <span className="text-[11px] font-mono text-gray-400">e.g. 12.7894° N</span>
              </div>
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                onBlur={() => {
                  if (latitude && longitude && (!postalAddress || !localBody)) {
                    handleReverseGeocodePartA();
                  }
                }}
                placeholder="12.7894° N"
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-[13px] text-primary tabular-nums focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-label text-label-md text-on-surface">Longitude</span>
                <span className="text-[11px] font-mono text-gray-400">e.g. 80.2215° E</span>
              </div>
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                onBlur={() => {
                  if (latitude && longitude && (!postalAddress || !localBody)) {
                    handleReverseGeocodePartA();
                  }
                }}
                placeholder="80.2215° E"
                className="w-full rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-[13px] text-primary tabular-nums focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-label text-label-md text-on-surface">Local Body Jurisdiction</span>
                <button
                  type="button"
                  onClick={() => handleReverseGeocodePartA()}
                  disabled={isGeoResolving}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline cursor-pointer disabled:opacity-50"
                  title="Auto-fill location details from coordinates"
                >
                  <span className={`material-symbols-outlined text-[13px] ${isGeoResolving ? 'animate-spin' : ''}`}>
                    {isGeoResolving ? 'sync' : 'auto_fix_high'}
                  </span>
                  <span>{isGeoResolving ? 'Resolving...' : 'Auto-fill'}</span>
                </button>
              </div>
              <input
                type="text"
                value={localBody}
                onChange={(e) => setLocalBody(e.target.value)}
                placeholder="e.g. Kelambakkam Town Panchayat"
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
              onClick={handleNextPart}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-tertiary text-on-tertiary font-label text-label-md hover:opacity-95 transition-colors cursor-pointer shadow-sm"
            >
              <span>Next: Part B Land</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
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
        dateOfInspection={inspectionDate || "13.05.2026"}
        placeOfSigning="Chennai, Tamil Nadu"
      />
    </div>
  </div>
);
}
