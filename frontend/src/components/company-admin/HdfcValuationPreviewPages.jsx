import React from 'react';

/**
 * 5-Page HDFC Bank Valuation Report Preview Component
 * Replicated with exact fidelity from the bank format PDF:
 * - Pages 1-4: Content tables with solid borders, gray headers, and crisp layout
 * - Page 5: Empty page reserved for attaching architectural drawings and layout plans
 */
export const HDFC_PAGE_DEFS = [
  { id: 'hdfc-page-1', title: 'Page 1: General Details & Locality', shortTitle: '1. General & Locality' },
  { id: 'hdfc-page-2', title: 'Page 2: Property, Boundaries & Structure', shortTitle: '2. Property & Structure' },
  { id: 'hdfc-page-3', title: 'Page 3: Specifications, Approvals & Flat Valuation', shortTitle: '3. Approvals & Flat Valuation' },
  { id: 'hdfc-page-4', title: 'Page 4: Land & Building Valuation, Declaration & Sign-Off', shortTitle: '4. Land/Bldg & Sign-Off' },
  { id: 'hdfc-page-5', title: 'Page 5: Drawings & Site Layout Plans (Empty Page)', shortTitle: '5. Drawings (Empty Page)' },
];

export function HdfcPageWrapper({ pageId, pageNumber, children }) {
  return (
    <div
      id={`bw-word-${pageId}`}
      className="w-full max-w-[850px] bg-white text-black shadow-xl border border-black p-6 sm:p-8 mb-8 text-[12px] leading-snug relative font-sans tabular-nums flex flex-col justify-between"
      style={{
        minHeight: '1100px',
        fontFamily: "Calibri, Arial, 'Segoe UI', sans-serif",
        fontVariantNumeric: 'lining-nums tabular-nums',
      }}
    >
      <div className="flex-1">{children}</div>
      <div className="text-right text-[11px] text-gray-500 pt-4 font-normal select-none">
        {pageNumber} | Page
      </div>
    </div>
  );
}

/* =========================================================================
   PAGE 1: GENERAL DETAILS & LOCALITY
   ========================================================================= */
export function HdfcPage1() {
  return (
    <div className="space-y-4">
      {/* Top Recipient & Date Box */}
      <div className="flex items-start justify-between border border-black p-3 bg-white">
        <div className="font-bold text-[12.5px] leading-relaxed">
          To,<br />
          The Credit Manager (Mortgages)<br />
          HDFC Bank Ltd., Patna Branch
        </div>
        <div className="text-right font-bold text-[12.5px] leading-relaxed">
          DATE - 11-11-2024<br />
          <span className="font-normal text-[11px] text-gray-600">Report Ref: HDFC/VAL/2024/PAT-089</span>
        </div>
      </div>

      {/* Table: GENERAL DETAILS */}
      <div className="border border-black">
        <div className="bg-slate-200 text-slate-900 font-bold px-3 py-1.5 text-[12.5px] border-b border-black uppercase tracking-wide">
          GENERAL DETAILS
        </div>
        <table className="w-full text-left border-collapse text-[11.5px]">
          <tbody>
            <tr className="border-b border-black">
              <td className="w-[28%] bg-slate-50 font-bold p-2 border-r border-black align-top">
                Type of property
              </td>
              <td colSpan={3} className="p-2 font-medium">
                <span className="font-bold text-black">[X] Residential</span> &nbsp;&nbsp;&nbsp;&nbsp;
                [ ] Commercial &nbsp;&nbsp;&nbsp;&nbsp;
                [ ] Residential cum commercial &nbsp;&nbsp;&nbsp;&nbsp;
                [ ] Industrial &nbsp;&nbsp;&nbsp;&nbsp;
                [ ] Vacant Plot
              </td>
            </tr>
            <tr className="border-b border-black">
              <td className="w-[28%] bg-slate-50 font-bold p-2 border-r border-black">Customer Name:</td>
              <td className="w-[32%] p-2 border-r border-black font-semibold">M/s TrueArk Infra Project / Mr. Rajesh Kumar</td>
              <td className="w-[20%] bg-slate-50 font-bold p-2 border-r border-black">Loan App No:</td>
              <td className="w-[20%] p-2 font-mono font-semibold">HDFC-HL-2026-9082</td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Property Address:</td>
              <td colSpan={3} className="p-2">
                Flat No. 302, 3rd Floor, Shanti Vihar Apartment, Boring Canal Road, Patna, Bihar - 800001
              </td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Landmark:</td>
              <td className="p-2 border-r border-black">Near Panchmukhi Hanuman Mandir</td>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Document Holder:</td>
              <td className="p-2">Self / Borrower</td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Legal Address:</td>
              <td colSpan={3} className="p-2">
                Holding No. 42/B, Ward No. 18, Circle No. 2, Boring Canal Road, Patna Municipal Corporation
              </td>
            </tr>
            <tr>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Date of Inspection:</td>
              <td colSpan={3} className="p-2">
                09-11-2024 (Inspected physically by certified valuer in presence of applicant)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Table: SURROUNDING LOCALITY DETAILS */}
      <div className="border border-black">
        <div className="bg-slate-200 text-slate-900 font-bold px-3 py-1.5 text-[12.5px] border-b border-black uppercase tracking-wide">
          SURROUNDING LOCALITY DETAILS
        </div>
        <table className="w-full text-left border-collapse text-[11.5px]">
          <tbody>
            <tr className="border-b border-black">
              <td className="w-[28%] bg-slate-50 font-bold p-2 border-r border-black align-top">
                Property Location:
              </td>
              <td colSpan={3} className="p-2">
                <span className="font-bold">[X] Within Municipal Limits</span> &nbsp;&nbsp;&nbsp;&nbsp;
                [ ] Outside Municipal Limits &nbsp;&nbsp;&nbsp;&nbsp;
                [ ] Gram Panchayat &nbsp;&nbsp;&nbsp;&nbsp;
                [ ] Urban Development Authority
              </td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black align-top">
                Plot Demarcated at site:
              </td>
              <td colSpan={3} className="p-2">
                <span className="font-bold">[X] Yes, fully demarcated on all 4 boundaries by compound wall</span><br />
                [ ] No, demarcated by stones/fencing
              </td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black align-top">
                Property Identification:
              </td>
              <td colSpan={3} className="p-2">
                <span className="font-bold">[X] Easily Identifiable through building name &amp; Flat No.</span><br />
                [ ] Identified with help of local residents / survey maps
              </td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black align-top">
                Connectivity / Infrastructure:
              </td>
              <td colSpan={3} className="p-2">
                <span className="font-bold">[X] Excellent</span> (Metalled bituminous road, street lights, piped drinking water, underground drainage)<br />
                [ ] Good &nbsp;&nbsp;&nbsp;&nbsp; [ ] Average &nbsp;&nbsp;&nbsp;&nbsp; [ ] Under Development
              </td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Railway Station:</td>
              <td className="p-2 border-r border-black">Patna Junction ~ 3.5 Km</td>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Bus Stop / Stand:</td>
              <td className="p-2">Boring Road Crossing ~ 400 Meters</td>
            </tr>
            <tr>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Hospital / Healthcare:</td>
              <td className="p-2 border-r border-black">Paras HMRI Hospital ~ 2.0 Km</td>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Airport / Terminal:</td>
              <td className="p-2">Jay Prakash Narayan Airport ~ 4.2 Km</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   PAGE 2: PROPERTY, BOUNDARIES & STRUCTURE
   ========================================================================= */
export function HdfcPage2() {
  return (
    <div className="space-y-4">
      {/* Table: PROPERTY DETAILS */}
      <div className="border border-black">
        <div className="bg-slate-200 text-slate-900 font-bold px-3 py-1.5 text-[12.5px] border-b border-black uppercase tracking-wide">
          PROPERTY DETAILS
        </div>
        <table className="w-full text-left border-collapse text-[11.5px]">
          <tbody>
            <tr className="border-b border-black">
              <td className="w-[28%] bg-slate-50 font-bold p-2 border-r border-black">Usage of property:</td>
              <td className="w-[32%] p-2 border-r border-black font-semibold">Residential (Used as private flat)</td>
              <td className="w-[20%] bg-slate-50 font-bold p-2 border-r border-black">Legal Status:</td>
              <td className="w-[20%] p-2 font-semibold">Freehold Clear Title</td>
            </tr>
            <tr>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Civic Amenities:</td>
              <td colSpan={3} className="p-2">
                Piped Drinking Water Supply, Underground Drainage, 3-Phase Electricity, Municipal Solid Waste Collection
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Table: SUBJECT PROPERTY DETAILS */}
      <div className="border border-black">
        <div className="bg-slate-200 text-slate-900 font-bold px-3 py-1.5 text-[12.5px] border-b border-black uppercase tracking-wide">
          SUBJECT PROPERTY DETAILS
        </div>
        <table className="w-full text-left border-collapse text-[11.5px]">
          <tbody>
            <tr className="border-b border-black">
              <td className="w-[28%] bg-slate-50 font-bold p-2 border-r border-black">Premises Type:</td>
              <td className="w-[32%] p-2 border-r border-black">Multi-Storey Residential Apartment</td>
              <td className="w-[20%] bg-slate-50 font-bold p-2 border-r border-black">Occupied By:</td>
              <td className="w-[20%] p-2 font-semibold">Owner Self-Occupied</td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Occupant Name:</td>
              <td className="p-2 border-r border-black font-semibold">Mr. Rajesh Kumar &amp; Family</td>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Relation with Applicant:</td>
              <td className="p-2">Self / Co-Applicant</td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Is Property Rented:</td>
              <td className="p-2 border-r border-black">No (Self Occupied)</td>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Renting Potential:</td>
              <td className="p-2 font-bold">[X] High &nbsp; [ ] Medium</td>
            </tr>
            <tr>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Property Taxation / Maint.:</td>
              <td className="p-2 border-r border-black">Municipal Tax Paid up to 2026-27</td>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Market Rentals/Sqft:</td>
              <td className="p-2 font-semibold">Rs. 24 - 28 / Sq.ft / Mo</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Table: BOUNDARY DETAILS */}
      <div className="border border-black">
        <div className="bg-slate-200 text-slate-900 font-bold px-3 py-1.5 text-[12.5px] border-b border-black uppercase tracking-wide">
          BOUNDARY DETAILS
        </div>
        <table className="w-full text-left border-collapse text-[11.5px]">
          <thead>
            <tr className="border-b border-black bg-slate-100 font-bold">
              <th className="w-[20%] p-2 border-r border-black">Direction</th>
              <th className="w-[40%] p-2 border-r border-black">As Per Documents / Title Deed</th>
              <th className="w-[40%] p-2">Actual Physical Status At Site</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-black">
              <td className="font-bold bg-slate-50 p-2 border-r border-black">North</td>
              <td className="p-2 border-r border-black">Flat No. 301 &amp; Common Lobby Corridor</td>
              <td className="p-2 text-slate-800">Flat No. 301 &amp; Common Lobby Corridor (Matching)</td>
            </tr>
            <tr className="border-b border-black">
              <td className="font-bold bg-slate-50 p-2 border-r border-black">South</td>
              <td className="p-2 border-r border-black">Open to Sky / 20 Ft Internal Building Setback</td>
              <td className="p-2 text-slate-800">Open to Sky / 20 Ft Driveway Setback (Matching)</td>
            </tr>
            <tr className="border-b border-black">
              <td className="font-bold bg-slate-50 p-2 border-r border-black">East</td>
              <td className="p-2 border-r border-black">Boring Canal Road (Main 60 Feet Road)</td>
              <td className="p-2 text-slate-800">Boring Canal Road (Wide Bituminous Road) (Matching)</td>
            </tr>
            <tr>
              <td className="font-bold bg-slate-50 p-2 border-r border-black">West</td>
              <td className="p-2 border-r border-black">Compound Wall &amp; Plot of Sri K. P. Singh</td>
              <td className="p-2 text-slate-800">Compound Wall &amp; Residential House (Matching)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Table: STRUCTURAL DETAILS */}
      <div className="border border-black">
        <div className="bg-slate-200 text-slate-900 font-bold px-3 py-1.5 text-[12.5px] border-b border-black uppercase tracking-wide">
          STRUCTURAL DETAILS
        </div>
        <table className="w-full text-left border-collapse text-[11.5px]">
          <tbody>
            <tr className="border-b border-black">
              <td className="w-[28%] bg-slate-50 font-bold p-2 border-r border-black">Type of Structure:</td>
              <td className="w-[32%] p-2 border-r border-black">RCC Framed Structure (Earthquake resistant)</td>
              <td className="w-[20%] bg-slate-50 font-bold p-2 border-r border-black">No. of Floors:</td>
              <td className="w-[20%] p-2 font-semibold">Basement + Ground + 5 Floors</td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black">No. of Wings / Blocks:</td>
              <td className="p-2 border-r border-black">Single Integrated Block ('A' Wing)</td>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Units per Floor:</td>
              <td className="p-2">4 Units per floor</td>
            </tr>
            <tr>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Internal Composition:</td>
              <td colSpan={3} className="p-2">
                3 Bedrooms + 1 Drawing/Dining Room + 1 Kitchen + 2 Toilets/Bathrooms + 2 Balconies
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   PAGE 3: SPECIFICATIONS, APPROVALS & FLAT VALUATION
   ========================================================================= */
export function HdfcPage3() {
  return (
    <div className="space-y-4">
      {/* Table: AGE, MAINTENANCE & SPECIFICATIONS */}
      <div className="border border-black">
        <div className="bg-slate-200 text-slate-900 font-bold px-3 py-1.5 text-[12.5px] border-b border-black uppercase tracking-wide">
          AGE, MAINTENANCE &amp; SPECIFICATIONS
        </div>
        <table className="w-full text-left border-collapse text-[11.5px]">
          <tbody>
            <tr className="border-b border-black">
              <td className="w-[28%] bg-slate-50 font-bold p-2 border-r border-black">No. of Lifts:</td>
              <td className="w-[32%] p-2 border-r border-black">2 High-Speed Passenger Lifts</td>
              <td className="w-[20%] bg-slate-50 font-bold p-2 border-r border-black">Age of Property:</td>
              <td className="w-[20%] p-2 font-semibold">Approx. 4 Years</td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Estimated Future Life:</td>
              <td className="p-2 border-r border-black font-semibold">56 Years (Total life 60 Years)</td>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Exteriors Quality:</td>
              <td className="p-2">Weather-proof exterior emulsion</td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Quality of Construction:</td>
              <td className="p-2 border-r border-black font-bold">[X] Excellent &nbsp; [ ] Good</td>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Appearance &amp; Maint:</td>
              <td className="p-2">Very Well Maintained Society</td>
            </tr>
            <tr>
              <td className="bg-slate-50 font-bold p-2 border-r border-black align-top">Interiors &amp; Finishes:</td>
              <td colSpan={3} className="p-2">
                Flooring: 800x800mm Vitrified Tiles; Toilets: Anti-skid ceramic tiles with premium Jaquar CP fittings; Doors: Teak wood frame with laminated flush doors; Windows: Powder coated UPVC sliding windows with mosquito mesh.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Table: PLAN APPROVALS & STATUTORY COMPLIANCE */}
      <div className="border border-black">
        <div className="bg-slate-200 text-slate-900 font-bold px-3 py-1.5 text-[12.5px] border-b border-black uppercase tracking-wide">
          PLAN APPROVALS &amp; STATUTORY COMPLIANCE
        </div>
        <table className="w-full text-left border-collapse text-[11.5px]">
          <tbody>
            <tr className="border-b border-black">
              <td className="w-[28%] bg-slate-50 font-bold p-2 border-r border-black">Sanctioned Authority:</td>
              <td className="w-[32%] p-2 border-r border-black">Patna Municipal Corporation (PMC)</td>
              <td className="w-[20%] bg-slate-50 font-bold p-2 border-r border-black">Approval Plan No:</td>
              <td className="w-[20%] p-2 font-mono font-semibold">PMC/BP/2020/782-A</td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Construction as per plan:</td>
              <td className="p-2 border-r border-black font-bold">[X] Yes, strictly conforms</td>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Deviations / Violations:</td>
              <td className="p-2 font-semibold">Nil / Within limits</td>
            </tr>
            <tr>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Latitude &amp; Longitude:</td>
              <td colSpan={3} className="p-2 font-mono">
                Lat: 25.612845° N, Long: 85.123910° E (Geo-tagged at site during physical inspection)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Table: VALUATION FOR INDIVIDUAL APARTMENTS / FLATS */}
      <div className="border border-black">
        <div className="bg-slate-200 text-slate-900 font-bold px-3 py-1.5 text-[12.5px] border-b border-black uppercase tracking-wide">
          VALUATION FOR INDIVIDUAL APARTMENTS / FLATS
        </div>
        <table className="w-full text-left border-collapse text-[11.5px]">
          <tbody>
            <tr className="border-b border-black">
              <td className="w-[28%] bg-slate-50 font-bold p-2 border-r border-black">Carpet Area (RERA):</td>
              <td className="w-[32%] p-2 border-r border-black font-semibold">1,240 Sq.ft</td>
              <td className="w-[20%] bg-slate-50 font-bold p-2 border-r border-black">Loading Factor (%):</td>
              <td className="w-[20%] p-2 font-semibold">25 %</td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Super Built-up Area:</td>
              <td className="p-2 border-r border-black font-bold">1,550 Sq.ft</td>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Approved Plinth Area:</td>
              <td className="p-2 font-semibold">1,380 Sq.ft</td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Govt Guideline Rate:</td>
              <td className="p-2 border-r border-black font-semibold">Rs. 6,800 / Sq.ft</td>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Market Rate:</td>
              <td className="p-2 font-bold text-slate-900">Rs. 9,500 / Sq.ft</td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Market Value of Flat:</td>
              <td className="p-2 border-r border-black font-bold text-slate-900">Rs. 1,47,25,000</td>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Forced Sale Disc (%):</td>
              <td className="p-2 font-semibold">15 %</td>
            </tr>
            <tr>
              <td className="bg-slate-100 font-bold p-2 border-r border-black">Forced Sale / Distress Value:</td>
              <td className="p-2 border-r border-black font-bold text-primary">Rs. 1,25,16,250</td>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Adopted Unit Rate:</td>
              <td className="p-2 font-bold">Rs. 9,500 / Sq.ft</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   PAGE 4: LAND & BUILDING VALUATION, DECLARATION & SIGN-OFF
   ========================================================================= */
export function HdfcPage4() {
  return (
    <div className="space-y-4">
      {/* Table: LAND AND BUILDING COMPREHENSIVE VALUATION */}
      <div className="border border-black">
        <div className="bg-slate-200 text-slate-900 font-bold px-3 py-1.5 text-[12.5px] border-b border-black uppercase tracking-wide">
          LAND AND BUILDING COMPREHENSIVE VALUATION (BREAK-UP)
        </div>
        <table className="w-full text-left border-collapse text-[11.5px]">
          <tbody>
            <tr className="border-b border-black">
              <td className="w-[30%] bg-slate-50 font-bold p-2 border-r border-black">Land Area as per Sale Deed:</td>
              <td className="w-[30%] p-2 border-r border-black font-semibold">3,600 Sq.ft (Undivided 450 Sq.ft UDS)</td>
              <td className="w-[20%] bg-slate-50 font-bold p-2 border-r border-black">Govt Rate (Land):</td>
              <td className="w-[20%] p-2 font-semibold">Rs. 9,000 / Sq.ft</td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Recommended Land Rate:</td>
              <td className="p-2 border-r border-black font-semibold">Rs. 14,000 / Sq.ft</td>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Assessed Land / UDS:</td>
              <td className="p-2 font-bold">Rs. 63,00,000</td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Actual Built-up Area:</td>
              <td className="p-2 border-r border-black font-semibold">1,550 Sq.ft</td>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Replacement Cost:</td>
              <td className="p-2 font-semibold">Rs. 2,400 / Sq.ft</td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Gross Replacement Cost:</td>
              <td className="p-2 border-r border-black font-semibold">Rs. 37,20,000</td>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Depreciation (4 yrs @ 1.5%):</td>
              <td className="p-2 font-semibold">6 % (Rs. 2,23,200)</td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Depreciated Building Value:</td>
              <td className="p-2 border-r border-black font-bold">Rs. 34,96,800</td>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Amenities &amp; Car Parking:</td>
              <td className="p-2 font-semibold">Rs. 8,00,000</td>
            </tr>
            <tr className="border-b border-black bg-slate-100">
              <td className="bg-slate-100 font-bold p-2 border-r border-black">TOTAL VALUATION (Land + Bldg):</td>
              <td className="p-2 border-r border-black font-bold text-primary">Rs. 1,05,96,800</td>
              <td className="bg-slate-100 font-bold p-2 border-r border-black">Adopted Market Value:</td>
              <td className="p-2 font-bold text-primary">Rs. 1,47,25,000</td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Forced Sale Discount (%):</td>
              <td className="p-2 border-r border-black font-semibold">15 %</td>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Forced Sale Value:</td>
              <td className="p-2 font-bold text-slate-900">Rs. 1,25,16,000</td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Forced Sale Value in Words:</td>
              <td colSpan={3} className="p-2 font-semibold italic text-slate-900">
                Rupees One Crore Twenty-Five Lakhs Sixteen Thousand Only
              </td>
            </tr>
            <tr className="border-b border-black">
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Marketability &amp; Liquidity:</td>
              <td className="p-2 border-r border-black font-bold">[X] Good / Readily Marketable</td>
              <td className="bg-slate-50 font-bold p-2 border-r border-black">Valuation Result:</td>
              <td className="p-2 font-bold text-green-700">Recommended for Mortgage</td>
            </tr>
            <tr>
              <td className="bg-slate-50 font-bold p-2 border-r border-black align-top">REMARKS &amp; RECOMMENDATIONS:</td>
              <td colSpan={3} className="p-2 leading-relaxed">
                The subject property is located in an established, high-demand residential neighborhood of Patna with excellent civic infrastructure. Boundaries inspected at site match completely with title deed documents. The building is structurally sound with an estimated balance life of 56 years. The property is recommended as sound and adequate mortgage security for HDFC Bank Ltd.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Table: DECLARATION & VALUER SIGN-OFF */}
      <div className="border border-black">
        <div className="bg-slate-200 text-slate-900 font-bold px-3 py-1.5 text-[12.5px] border-b border-black uppercase tracking-wide">
          STATUTORY VALUER DECLARATION &amp; CERTIFICATION
        </div>
        <div className="p-3 text-[11px] leading-relaxed border-b border-black space-y-1.5 text-slate-800">
          <p className="font-bold">I / We hereby solemnly declare and certify that:</p>
          <p>(i) I/We have personally inspected the subject property at Flat No. 302, Shanti Vihar Apartment, Boring Canal Road, Patna on 09-11-2024 and physically verified all measurements against title deeds and sanctioned maps.</p>
          <p>(ii) I/We have no direct, indirect, present or contemplated future interest in the subject property or with the borrower / loan applicant.</p>
          <p>(iii) The valuation figures arrived at herein represent my independent, unbiased, objective professional opinion based on prevailing open market rates and thorough inquiries.</p>
          <p>(iv) The report strictly complies with the guidelines of IBBI (Valuation) Rules and the Empanelment Policy of HDFC Bank Ltd.</p>
        </div>
        <div className="p-3 flex items-end justify-between bg-white text-[11.5px]">
          <div>
            <p><strong>Date of Declaration:</strong> 11-11-2024</p>
            <p><strong>Place of Signing:</strong> Patna, Bihar</p>
          </div>
          <div className="text-right leading-tight">
            <div className="h-10"></div>
            <p className="font-bold border-t border-black pt-1">Authorized Approved Valuer Signature &amp; Seal</p>
            <p className="font-semibold">Arjun Mehta, B.E. (Civil), FIV</p>
            <p className="text-[10.5px] text-gray-600 font-mono">IBBI Regn: IBBI/RV/05/2019/11482</p>
            <p className="text-[10.5px] text-gray-600">HDFC Empanelment: HDFC-PAT-VAL-2024-089</p>
            <p className="text-[10px] text-gray-500">TrueArk Infrastructure Valuations Pvt. Ltd.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   PAGE 5: DRAWINGS & SITE LAYOUT PLANS (EMPTY DRAWING SHEET)
   ========================================================================= */
export function HdfcPage5() {
  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Title Banner */}
      <div className="border border-black bg-slate-200 text-slate-900 font-bold px-4 py-2 text-[13.5px] text-center uppercase tracking-wide">
        DRAWINGS &amp; SITE LAYOUT PLANS
      </div>
      <p className="text-center text-[11.5px] italic text-slate-600">
        (Space reserved for attaching architectural drawings, approved floor plans, structural layouts and site sketches)
      </p>

      {/* Large Empty Box for Drawing Attachment */}
      <div className="flex-1 min-h-[750px] border-2 border-dashed border-slate-400 bg-slate-50/50 rounded-sm flex flex-col items-center justify-center p-8 text-center select-none">
        <span className="material-symbols-outlined text-slate-400 text-[64px] mb-3">
          architecture
        </span>
        <div className="font-bold text-[14px] text-slate-600 uppercase tracking-wider mb-2">
          [ ATTACH ARCHITECTURAL DRAWINGS &amp; APPROVED FLOOR PLANS HERE ]
        </div>
        <div className="text-[12px] text-slate-500 max-w-md leading-relaxed italic">
          Certified architectural drawings, floor plans, key plans, and site layout sketches to be manually or digitally inserted by the company.
        </div>
      </div>
    </div>
  );
}
