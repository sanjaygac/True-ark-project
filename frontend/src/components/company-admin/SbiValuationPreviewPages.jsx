import React from 'react';

/**
 * 8-Page State Bank of India (SBI) Valuation Report Preview Component
 * Replicated with exact fidelity from the bank format PDF.
 */
export const SBI_PAGE_DEFS = [
  { id: 'sbi-page-1', title: 'Page 1: I - GENERAL (01-09)' },
  { id: 'sbi-page-2', title: 'Page 2: I - GENERAL (10-18) & II - CHARACTERISTICS (01)' },
  { id: 'sbi-page-3', title: 'Page 3: II - CHARACTERISTICS (02-22)' },
  { id: 'sbi-page-4', title: 'Page 4: PART - B (Building Details & Specs 01-04)' },
  { id: 'sbi-page-5', title: 'Page 5: Specs (05-10), Compound, Elec, Plumb, Valuation Table (GF)' },
  { id: 'sbi-page-6', title: 'Page 6: Valuation Table (FF/Total), Part C, Part D, Part E' },
  { id: 'sbi-page-7', title: 'Page 7: Part E, Part F, Total Abstract & Notes' },
  { id: 'sbi-page-8', title: 'Page 8: Realizable Estimation, Approach & Sign-Off' },
];

export function SbiPageWrapper({ pageId, pageNumber, children }) {
  return (
    <div
      id={`bw-word-${pageId}`}
      className="w-full max-w-[850px] bg-white text-black shadow-xl border border-black p-8 sm:p-12 mb-8 text-[12.5px] leading-relaxed relative font-sans tabular-nums flex flex-col justify-between"
      style={{
        minHeight: '1100px',
        fontFamily: "Arial, Calibri, 'Segoe UI', sans-serif",
        fontVariantNumeric: 'lining-nums tabular-nums',
      }}
    >
      <div className="flex-1">{children}</div>
      <div className="text-right text-[11px] text-black pt-4 font-normal select-none">
        {pageNumber}
      </div>
    </div>
  );
}

// Reusable 2-column field row for vertical colon alignment
function SbiFieldRow({ label, colon = ':', isBold = false, isUnderline = false }) {
  return (
    <div className="flex items-start justify-between py-[2px] text-[12px]">
      <div className={`w-[58%] pr-2 ${isBold ? 'font-bold' : ''} ${isUnderline ? 'underline' : ''}`}>
        {label}
      </div>
      <div className="w-[42%] flex items-start">
        {colon && <span className="mr-2 font-normal">:</span>}
      </div>
    </div>
  );
}

/* =========================================================================
   PAGE 1
   ========================================================================= */
export function SbiPage1() {
  return (
    <div className="space-y-3">
      <div className="text-right font-bold text-[12px]">Date: ......................</div>

      <div className="text-center font-bold text-[13.5px] uppercase tracking-wide underline pb-1 pt-2">
        FORMAT FOR VALUATION REPORT FOR STATE BANK OF INDIA
      </div>

      <div className="font-bold text-[12.5px] uppercase pt-1">I - GENERAL</div>

      <div className="space-y-[1px]">
        <SbiFieldRow label="01. Purpose for which the valuation is made" />
        <SbiFieldRow label="02. a) Date of inspection" />
        <SbiFieldRow label="    b) Date on which the valuation is made" />
        <SbiFieldRow label="    c) Documents as proof of visit" />
        <div className="pl-6 text-[11px] text-gray-700">(e.g. photographs of the asset in situ)</div>
        <SbiFieldRow
          label={
            <span>
              03. Name of the legal owner (s) and his/their<br />
              &nbsp;&nbsp;&nbsp;&nbsp;address(es) with Phone No.<br />
              &nbsp;&nbsp;&nbsp;&nbsp;(Details of share of each owner in case of joint<br />
              &nbsp;&nbsp;&nbsp;&nbsp;ownership).
            </span>
          }
        />
        <SbiFieldRow
          label={
            <span>
              04. List of documents produced in support of<br />
              &nbsp;&nbsp;&nbsp;&nbsp;submitted data for perusal (e.g. ownership<br />
              &nbsp;&nbsp;&nbsp;&nbsp;document, plan etc.)
            </span>
          }
        />
        <SbiFieldRow label="    i)" colon="" />
        <SbiFieldRow label="    ii)" colon="" />
        <SbiFieldRow label="    iii)" colon="" />
        <SbiFieldRow label="    Shortcomings, if any in the documents." colon="" isUnderline={true} />
        <SbiFieldRow label="05. Brief description of the property/ asset" />
        <SbiFieldRow label="06. Location of the property/asset" colon="" />
        <SbiFieldRow label="    a. Plot No./Survey No." />
        <SbiFieldRow label="    b. Door No." />
        <SbiFieldRow label="    c. T.S. No./Village" />
        <SbiFieldRow label="    d. Ward / Taluka" />
        <SbiFieldRow label="    e. Mandal/District" />
        <SbiFieldRow label="07. Postal Address of the property/asset" />
        <SbiFieldRow
          label={
            <span>
              08. City/Town<br />
              &nbsp;&nbsp;&nbsp;&nbsp;Map of the location to be attached.
            </span>
          }
        />
        <SbiFieldRow label="09. Classification of the area" />
        <div className="pl-6 text-[12px]">i) Residential area commercial area/</div>
      </div>
    </div>
  );
}

/* =========================================================================
   PAGE 2
   ========================================================================= */
export function SbiPage2() {
  return (
    <div className="space-y-3">
      <div className="space-y-[1px]">
        <div className="pl-6 text-[12px] pb-1">Industrial area.</div>
        <SbiFieldRow label="    ii.) High income / Middle/Poor" />
        <SbiFieldRow
          label={
            <span>
              10. Coming under Corporation limit/Village<br />
              &nbsp;&nbsp;&nbsp;&nbsp;Panchayat/Municipality
            </span>
          }
        />
        <SbiFieldRow
          label={
            <span>
              11. Whether covered under any State/Central Govt. :<br />
              &nbsp;&nbsp;&nbsp;&nbsp;enactment's (e.g. Urban Land Ceiling Act) or<br />
              &nbsp;&nbsp;&nbsp;&nbsp;notified under agency area/scheduled area/<br />
              &nbsp;&nbsp;&nbsp;&nbsp;cantonment area.
            </span>
          }
          colon=""
        />
        <SbiFieldRow
          label={
            <span>
              12. Type of Property - Agricultural / Industrial/<br />
              &nbsp;&nbsp;&nbsp;&nbsp;Residential / Commercial / Institutional any<br />
              &nbsp;&nbsp;&nbsp;&nbsp;Other.
            </span>
          }
        />
        <SbiFieldRow label="13. Year of the acquisition." />
        <SbiFieldRow label="14. Value/purchase price paid." />
        <SbiFieldRow
          label={
            <span>
              15. In case it is agricultural land, any conversion to :<br />
              &nbsp;&nbsp;&nbsp;&nbsp;the house/ site plots is contemplated/ approved :
            </span>
          }
          colon=""
        />
        <SbiFieldRow label="16. Boundaries and dimensions of the property." colon="" />

        {/* Boundaries mini-table */}
        <div className="py-2 pl-6">
          <table className="w-full text-[12px] border-collapse">
            <thead>
              <tr>
                <th className="w-1/3 text-left pb-1"></th>
                <th className="w-1/3 text-left font-bold pb-1">a. As per the Deed</th>
                <th className="w-1/3 text-left font-bold pb-1">b. Actuals</th>
              </tr>
            </thead>
            <tbody>
              {['North', 'South', 'East', 'West'].map((b) => (
                <tr key={b}>
                  <td className="py-1">{b}</td>
                  <td className="py-1"></td>
                  <td className="py-1"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <SbiFieldRow label="17. Extent of the site considered for Valuation" />
        <SbiFieldRow
          label={
            <span>
              18. Whether occupied by the owner/tenant. If<br />
              &nbsp;&nbsp;&nbsp;&nbsp;occupied by tenant since how long ?<br />
              &nbsp;&nbsp;&nbsp;&nbsp;Rent received per month.
            </span>
          }
        />
      </div>

      <div className="font-bold text-[12.5px] uppercase pt-3">
        II.- CHARACTERISTICS OF THE SITE
      </div>

      <div className="space-y-[1px]">
        <SbiFieldRow
          label={
            <span>
              01. Development of surrounding areas Distance<br />
              &nbsp;&nbsp;&nbsp;&nbsp;from civic amenities :
            </span>
          }
        />
        <SbiFieldRow label="    School." />
        <SbiFieldRow label="    College." />
      </div>
    </div>
  );
}

/* =========================================================================
   PAGE 3
   ========================================================================= */
export function SbiPage3() {
  const p3Fields = [
    '    Market.',
    '    Nursing Home.',
    '    Bus Stop.',
    '    Railway Station.',
    '02. Possibility of frequent flooding',
    '03. Level of land with topographical conditions',
    '04. Shape of land.',
    '05. Area of land',
    '06. Any usage restriction',
    '07. Is plot in Town Planning approved layout ?',
    '08. Corner plot or inside plot ?',
    '09. Road facilities',
    '10. Does it have a proper approach road ?',
    '11. Type of road available at present',
    '12. Width of road -Is it below 20 ft. or more than 20 ft. :',
    '13. Water Potential',
    '14. Underground sewerage system',
    '15. Power supply availability in the site',
    '16. Advantages of the site',
    '17. Disadvantages of the site',
    '18. General remarks, if any',
    '19. Prevailing market rate',
    '20. Guideline rate obtained from the Collector\'s\n    Registrar\'s Office (an evidence thereof to be\n    Enclosed).',
    '21. Assessed/adopted rate of valuation',
    '22. Estimated value of land',
  ];

  return (
    <div className="space-y-[1px]">
      {p3Fields.map((f, i) => (
        <SbiFieldRow
          key={i}
          label={<span className="whitespace-pre-line">{f}</span>}
          colon={f.includes('12. Width of road') ? '' : ':'}
        />
      ))}
    </div>
  );
}

/* =========================================================================
   PAGE 4
   ========================================================================= */
export function SbiPage4() {
  return (
    <div className="space-y-2">
      <div className="font-bold text-[12.5px] uppercase">PART - B (Valuation of Building)</div>
      <div className="font-bold text-[12px] uppercase">01-TECHNICAL DETAILS OF THE BUILDING -</div>

      <div className="space-y-[1px]">
        <SbiFieldRow label="a) Type of Building\n   (Residential/Commercial/Industrial)" />
        <SbiFieldRow label="b) Type of Construction\n   (Load bearing/RCC/Steel Framed)" />
        <SbiFieldRow label="c) Year of construction." />
        <SbiFieldRow label="d) Number of floors & height of each floor\n   including basement, if any." />
        <SbiFieldRow label="e) Plinth Area of the Building." />
        <SbiFieldRow label="f). Plinth area floor -wise" />
        <SbiFieldRow label="g) Condition of the building." />
        <SbiFieldRow label="   i) Exterior - Excellent, Good ---" />
        <SbiFieldRow label="   ii) Interior - Excellent, Good, Normal, Poor" />
        <SbiFieldRow label="-Details of approval" />
        <SbiFieldRow label="-Constructed Area with details of construction" />
        <SbiFieldRow label="-Service items available like lift, bore-wells, pump\n and embedded motors, D.G. Sets, Water Supply\n and sanitary system, waste disposal, etc." />
        <SbiFieldRow label="- Details of Corporation Tax - Year in which\n  assessed, If tax paid, amount and date." />
        <SbiFieldRow label="- Restrictive Clause if any as regards the use." />
        <SbiFieldRow label="- Annual Rent" />
        <SbiFieldRow label="- In case of Building, is it constructed strictly\n  according to the sanctioned plan,\n  If not, what are the deviations ?" />
      </div>

      <div className="font-bold text-[12px] uppercase pt-2">
        -SPECIFICATION OF CONSTRUCTION (FLOOR WISE) IN RESPECT OF
      </div>

      <table className="w-full border-collapse border border-black text-[11px] mt-1">
        <thead>
          <tr className="border-b border-black font-bold">
            <th className="border-r border-black p-1 text-center w-12">S. No.</th>
            <th className="border-r border-black p-1 text-left w-1/2">Description</th>
            <th className="border-r border-black p-1 text-center">Ground Floor</th>
            <th className="p-1 text-center">Other Floors</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['01.', 'Foundation'],
            ['02.', 'Basement'],
            ['03.', 'Superstructure'],
            ['04.', 'Joinery/Doors & Windows (please\nfurnish details about size of frames,\nshutters, glazing, fitting etc, and\nspecify the species of timber)'],
          ].map(([sno, desc], i) => (
            <tr key={i} className="border-b border-black">
              <td className="border-r border-black p-1 text-center align-top">{sno}</td>
              <td className="border-r border-black p-1 whitespace-pre-line align-top">{desc}</td>
              <td className="border-r border-black p-1"></td>
              <td className="p-1"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* =========================================================================
   PAGE 5
   ========================================================================= */
export function SbiPage5() {
  return (
    <div className="space-y-3">
      {/* Specification Table Part 2 */}
      <table className="w-full border-collapse border border-black text-[11px]">
        <tbody>
          {[
            ['05.', 'RCC Works'],
            ['06.', 'Plastering'],
            ['07.', 'Flooring, skirting, dadoing'],
            ['08.', 'Special finish as marble, granite,\nwooden paneling drills etc.'],
            ['09.', 'Roofing including weather proof\ncourse'],
            ['10.', 'Drainage'],
          ].map(([sno, desc], i) => (
            <tr key={i} className="border-b border-black">
              <td className="border-r border-black p-1 text-center w-12 align-top">{sno}</td>
              <td className="border-r border-black p-1 w-1/2 whitespace-pre-line align-top">{desc}</td>
              <td className="border-r border-black p-1 w-1/4"></td>
              <td className="p-1 w-1/4"></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="space-y-1">
        <div className="font-bold text-[12px] uppercase">02- COMPOUND WALL :</div>
        <SbiFieldRow label="Height" />
        <SbiFieldRow label="Length" />
        <SbiFieldRow label="Type of construction" />
      </div>

      <div className="space-y-1">
        <div className="font-bold text-[12px] uppercase">03- ELECTRICAL INSTALLATION :</div>
        <SbiFieldRow label="Type of wiring" />
        <SbiFieldRow label="Class of fittings -\n(Superior/Ordinary/Poor)" />
        <SbiFieldRow label="Number of Light Points" />
        <SbiFieldRow label="Fan points" />
        <SbiFieldRow label="Spare plug points" />
        <SbiFieldRow label="Any other item" />
      </div>

      <div className="space-y-1">
        <div className="font-bold text-[12px] uppercase">04- PLUMBING INSTALLATION :</div>
        <SbiFieldRow label="a) No. of toilets and their type" />
        <SbiFieldRow label="b) No. of wash basins" />
        <SbiFieldRow label="c) Water meters, taps etc." />
        <SbiFieldRow label="d) Any other fixtures" />
      </div>

      <div className="font-bold text-[12px] uppercase pt-1">DETAILS OF VALUATION</div>

      <table className="w-full border-collapse border border-black text-[10px]">
        <thead>
          <tr className="border-b border-black font-bold">
            <th className="border-r border-black p-1 text-center">Sl.<br />No.</th>
            <th className="border-r border-black p-1 text-left">Particulars<br />of item</th>
            <th className="border-r border-black p-1 text-center">Plinth<br />Area</th>
            <th className="border-r border-black p-1 text-center">Roof<br />Ht.</th>
            <th className="border-r border-black p-1 text-center">Age of<br />Building</th>
            <th className="border-r border-black p-1 text-center">Estimated<br />replacement<br />rate of<br />construction<br />Rs.</th>
            <th className="border-r border-black p-1 text-center">Replacement<br />Cost<br /><br />Rs.</th>
            <th className="border-r border-black p-1 text-center">Depre-<br />ciation<br /><br />Rs.</th>
            <th className="p-1 text-center">Net Value<br />after<br />depreciation<br />Rs.</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-black">
            <td className="border-r border-black p-1 text-center"></td>
            <td className="border-r border-black p-1 font-medium">Ground Floor</td>
            <td className="border-r border-black p-1"></td>
            <td className="border-r border-black p-1"></td>
            <td className="border-r border-black p-1"></td>
            <td className="border-r border-black p-1"></td>
            <td className="border-r border-black p-1"></td>
            <td className="border-r border-black p-1"></td>
            <td className="p-1"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* =========================================================================
   PAGE 6
   ========================================================================= */
export function SbiPage6() {
  return (
    <div className="space-y-3">
      {/* Valuation Table Part 2 */}
      <table className="w-full border-collapse border border-black text-[10px]">
        <tbody>
          <tr className="border-b border-black">
            <td className="border-r border-black p-1 text-center w-8"></td>
            <td className="border-r border-black p-1 font-medium w-28">First Floor</td>
            <td className="border-r border-black p-1"></td>
            <td className="border-r border-black p-1"></td>
            <td className="border-r border-black p-1"></td>
            <td className="border-r border-black p-1"></td>
            <td className="border-r border-black p-1"></td>
            <td className="border-r border-black p-1"></td>
            <td className="p-1"></td>
          </tr>
          <tr className="border-b border-black">
            <td className="border-r border-black p-1 text-center"></td>
            <td className="border-r border-black p-1 font-medium">Other<br />Floors, if<br />any</td>
            <td className="border-r border-black p-1"></td>
            <td className="border-r border-black p-1"></td>
            <td className="border-r border-black p-1"></td>
            <td className="border-r border-black p-1"></td>
            <td className="border-r border-black p-1"></td>
            <td className="border-r border-black p-1"></td>
            <td className="p-1"></td>
          </tr>
          <tr className="border-b border-black font-bold">
            <td className="border-r border-black p-1 text-center"></td>
            <td className="border-r border-black p-1">Total</td>
            <td className="border-r border-black p-1"></td>
            <td className="border-r border-black p-1"></td>
            <td className="border-r border-black p-1"></td>
            <td className="border-r border-black p-1"></td>
            <td className="border-r border-black p-1"></td>
            <td className="border-r border-black p-1"></td>
            <td className="p-1"></td>
          </tr>
        </tbody>
      </table>

      <div className="space-y-1">
        <div className="font-bold text-[12px] uppercase">PART C (Extra Items) :</div>
        <SbiFieldRow label="01-Portico" />
        <SbiFieldRow label="02-Ornamental front door" />
        <SbiFieldRow label="03-Sitout/Verandah with steel grills" />
        <SbiFieldRow label="04-Overhead Water Tank" />
        <SbiFieldRow label="05-Extra steel/collapsible gates" />
        <SbiFieldRow label="- TOTAL" colon="" isBold={true} />
      </div>

      <div className="space-y-1">
        <div className="font-bold text-[12px] uppercase">PART D (amenities) :</div>
        <SbiFieldRow label="01- Wardrobes" />
        <SbiFieldRow label="02- Glazed tiles" />
        <SbiFieldRow label="03- Extra sinks and bath tub" />
        <SbiFieldRow label="04- Marble/ceramic tiles flooring" />
        <SbiFieldRow label="05- Interior decorations" />
        <SbiFieldRow label="06- Architectural elevation works" />
        <SbiFieldRow label="07- Paneling Works" />
        <SbiFieldRow label="08- Aluminum works" />
        <SbiFieldRow label="09- Aluminum hand rails" />
        <SbiFieldRow label="10- False Ceiling" />
        <SbiFieldRow label="-Total" isBold={true} />
      </div>

      <div className="space-y-1">
        <div className="font-bold text-[12px] uppercase">PART E (Miscellaneous) :</div>
        <SbiFieldRow label="01- Separate toilet room" />
        <SbiFieldRow label="02- Separate lumber room" />
      </div>
    </div>
  );
}

/* =========================================================================
   PAGE 7
   ========================================================================= */
export function SbiPage7() {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <SbiFieldRow label="03- Separate water tank/sump" />
        <SbiFieldRow label="04- Trees, gardening" />
        <SbiFieldRow label="-Total" colon="" isBold={true} />
      </div>

      <div className="space-y-1">
        <div className="font-bold text-[12px] uppercase">PART F (Services) :</div>
        <SbiFieldRow label="01- Water supply arrangements" />
        <SbiFieldRow label="02- Drainage arrangements" />
        <SbiFieldRow label="03- Compound Wall" />
        <SbiFieldRow label="04- C. B. deposits, fittings etc." />
        <SbiFieldRow label="05- Pavement" />
        <SbiFieldRow label="- Total" colon="" isBold={true} />
      </div>

      <div className="space-y-1">
        <div className="font-bold text-[12.5px] uppercase pt-1">
          TOTAL ABSTRACT OF THE ENTIRE PROPERTY
        </div>
        <SbiFieldRow label="Part - Land" />
        <SbiFieldRow label="Govt. Valuation" />
        <SbiFieldRow label="Prevailing Market Rate" />
        <SbiFieldRow label="Part B-Building" />
        <SbiFieldRow label="Part C-Extra items" />
        <SbiFieldRow label="Part D-Amenities" />
        <SbiFieldRow label="Part E-Miscellaneous" />
        <SbiFieldRow label="Part F-Services" />
        <SbiFieldRow label="-Total" colon="" isBold={true} />
      </div>

      <div className="space-y-1 pt-2">
        <SbiFieldRow
          label={
            <span>
              Was the property valued earlier ? If so, the<br />
              Purpose of Valuation, Date and the details of the<br />
              Previous Valuer with Value.
            </span>
          }
        />
      </div>

      <div className="font-bold text-[12px] uppercase pt-2">- NOTES ON VALUATION</div>

      <div className="font-bold text-[12.5px] uppercase underline pt-1">
        REALIZABLE ESTIMATION
      </div>
    </div>
  );
}

/* =========================================================================
   PAGE 8
   ========================================================================= */
export function SbiPage8() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <SbiFieldRow label="-Favorable features of the property" isBold={true} />
        <SbiFieldRow label="-Adverse features of the property" isBold={true} />
        <SbiFieldRow label="-Realizable estimation of the property" isBold={true} />
      </div>

      <div className="text-[12px] font-bold leading-relaxed pt-2">
        (Valuation : Here the approved valuer should discuss in detail his approach to valuation of property and
        indicate how the value has been arrived at, supported by necessary calculations. Also such aspects as
        i)salability ii) likely rental values in future and iii) any likely income it may generate may be discussed).
      </div>

      <div className="text-[12px] leading-relaxed pt-3">
        As a result of my appraisal and analysis it is my considered opinion that the present market value of the
        above property in the prevailing condition with aforesaid specifications is Rs. _________________________________Rupees
        __________________________________________________________________ Only.
      </div>

      <div className="pt-24 text-center ml-auto w-64">
        <div className="text-[12px]">Signature</div>
        <div className="text-[12px] font-bold underline mt-1">Panel Valuer</div>
      </div>
    </div>
  );
}
