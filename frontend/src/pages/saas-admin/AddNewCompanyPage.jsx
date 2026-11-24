import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SaasAdminSidebar from '../../components/saas-admin/SaasAdminSidebar';

export default function AddNewCompanyPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Form State
  const [companyCode, setCompanyCode] = useState('CMP-005');
  const [legalName, setLegalName] = useState('');
  const [companyType, setCompanyType] = useState('Valuation Firm');
  const [logoFile, setLogoFile] = useState(null);

  const [registrationNo, setRegistrationNo] = useState('');
  const [gstin, setGstin] = useState('');
  const [panNumber, setPanNumber] = useState('');

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const [planTier, setPlanTier] = useState('Enterprise');
  const [maxSeats, setMaxSeats] = useState('25');
  const [startDate, setStartDate] = useState('01 Dec 2026');
  const [expiryDate, setExpiryDate] = useState('30 Nov 2027');
  const [isActive, setIsActive] = useState(true);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting new company:', {
      companyCode,
      legalName,
      companyType,
      logoFile,
      registrationNo,
      gstin,
      panNumber,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      planTier,
      maxSeats,
      startDate,
      expiryDate,
      isActive,
    });

    // In a real flow, you'll persist this to the backend API or state
    navigate('/saas-admin/company-master');
  };

  return (
    <div className="h-screen flex bg-surface text-on-surface font-body antialiased overflow-hidden relative">
      {/* Left Navigation Sidebar */}
      <SaasAdminSidebar />

      {/* Main Content Column */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        {/* Contextual Header */}
        <header className="bg-surface-container-lowest border-b border-outline-variant px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <Link
              to="/saas-admin/company-master"
              className="inline-flex items-center gap-1.5 font-label text-label-sm text-tertiary hover:underline w-fit"
            >
              <span className="material-symbols-outlined text-title-sm" aria-hidden="true">
                arrow_back
              </span>
              <span>Back to Company Master</span>
            </Link>
            <h1 className="font-headline text-headline-md text-primary">Add New Company</h1>
            <p className="font-body text-body-sm text-on-surface-variant">
              Register a valuation firm, bank, or NBFC tenant and configure subscription limits
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/saas-admin/company-master"
              className="px-4 py-2 rounded bg-surface-container-lowest border border-outline-variant text-primary font-label text-label-md hover:bg-surface-container-low transition-colors duration-state-change whitespace-nowrap"
            >
              <span>Cancel</span>
            </Link>

            <button
              type="submit"
              form="add-company-form"
              className="px-5 py-2 rounded bg-primary text-on-primary font-label text-label-md hover:opacity-95 transition-colors duration-state-change whitespace-nowrap"
            >
              <span>Save Company</span>
            </button>
          </div>
        </header>

        {/* Main Form Workspace */}
        <main className="p-6 lg:p-8 flex-1">
          <form id="add-company-form" className="max-w-5xl flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* 1. Basic Identity */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm p-6 flex flex-col gap-5">
              <div className="pb-3 border-b border-outline-variant">
                <h2 className="font-headline text-headline-sm text-primary">Basic Identity</h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Tenant identifier, organization classification, and brand mark
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">Company Code</span>
                  <input
                    type="text"
                    value={companyCode}
                    onChange={(e) => setCompanyCode(e.target.value)}
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-mono-md text-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>

                <label className="flex flex-col gap-1.5 md:col-span-2">
                  <span className="font-label text-label-sm text-on-surface">Legal Company Name</span>
                  <input
                    type="text"
                    value={legalName}
                    onChange={(e) => setLegalName(e.target.value)}
                    placeholder="e.g., Meridian Property Valuers LLP"
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">Company Type</span>
                  <select
                    value={companyType}
                    onChange={(e) => setCompanyType(e.target.value)}
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Valuation Firm">Valuation Firm</option>
                    <option value="NBFC / Bank">NBFC / Bank</option>
                    <option value="Advisory / Legal">Advisory / Legal</option>
                  </select>
                </label>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <span className="font-label text-label-sm text-on-surface">Company Logo</span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/png, image/svg+xml"
                    className="hidden"
                  />
                  <div className="border border-dashed border-outline-variant rounded bg-surface px-4 py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="material-symbols-outlined text-secondary text-title-md shrink-0" aria-hidden="true">
                        cloud_upload
                      </span>
                      <span className="font-body text-body-sm text-on-surface-variant truncate">
                        {logoFile || 'Upload PNG or SVG (max 2MB)'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      className="font-label text-label-sm text-primary hover:underline shrink-0"
                    >
                      Browse File
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Statutory & Tax */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm p-6 flex flex-col gap-5">
              <div className="pb-3 border-b border-outline-variant">
                <h2 className="font-headline text-headline-sm text-primary">Statutory &amp; Tax</h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Regulatory registration and tax compliance identifiers
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">IBBI / RERA Registration No.</span>
                  <input
                    type="text"
                    value={registrationNo}
                    onChange={(e) => setRegistrationNo(e.target.value)}
                    placeholder="IBBI/RV/05/2024/18412"
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-mono-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">GSTIN</span>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    placeholder="33AABCM9124K1Z4"
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-mono-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">PAN Number</span>
                  <input
                    type="text"
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value)}
                    placeholder="AABCM9124K"
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-mono-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              </div>
            </section>

            {/* 3. Contact & Address */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm p-6 flex flex-col gap-5">
              <div className="pb-3 border-b border-outline-variant">
                <h2 className="font-headline text-headline-sm text-primary">Contact &amp; Address</h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Primary communication channels and registered office location
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">Official Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operations@meridianvaluers.in"
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">Phone Number</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 44 2815 9020"
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface tabular-nums placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="font-label text-label-sm text-on-surface">Registered Office Address</span>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="18 Cathedral Road, Gopalapuram"
                  className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">City</span>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Chennai"
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">State</span>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Tamil Nadu"
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">Pincode</span>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="600086"
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-mono-md text-on-surface tabular-nums placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              </div>
            </section>

            {/* 4. Subscription & Limits */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm p-6 flex flex-col gap-5">
              <div className="pb-3 border-b border-outline-variant">
                <h2 className="font-headline text-headline-sm text-primary">Subscription &amp; Limits</h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Plan tier, user seat allocation, and contract validity
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">Plan Tier</span>
                  <select
                    value={planTier}
                    onChange={(e) => setPlanTier(e.target.value)}
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Enterprise">Enterprise</option>
                    <option value="Pro">Pro</option>
                    <option value="Starter">Starter</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">Max User Seats</span>
                  <input
                    type="number"
                    value={maxSeats}
                    onChange={(e) => setMaxSeats(e.target.value)}
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-mono text-mono-md text-primary tabular-nums focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">Start Date</span>
                  <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface tabular-nums focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">Expiry Date</span>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface tabular-nums focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-outline-variant">
                <div>
                  <p className="font-label text-label-md text-on-surface">Active Tenant Status</p>
                  <p className="font-body text-body-sm text-on-surface-variant">
                    Enable immediate portal access for company administrators and valuers
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="sr-only peer"
                    aria-label="Active Tenant Status"
                  />
                  <div className="w-10 h-5 bg-surface-container rounded-full peer peer-checked:bg-secondary after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-surface-container-lowest after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:after:translate-x-5"></div>
                </label>
              </div>
            </section>

            {/* Bottom Action Bar */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Link
                to="/saas-admin/company-master"
                className="px-4 py-2 rounded bg-surface-container-lowest border border-outline-variant text-primary font-label text-label-md hover:bg-surface-container-low transition-colors duration-state-change whitespace-nowrap"
              >
                <span>Cancel</span>
              </Link>

              <button
                type="submit"
                className="px-5 py-2 rounded bg-primary text-on-primary font-label text-label-md hover:opacity-95 transition-colors duration-state-change whitespace-nowrap"
              >
                <span>Save Company</span>
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
