import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import {
  SBI_PAGE_DEFS,
  SbiPageWrapper,
  SbiPage1,
  SbiPage2,
  SbiPage3,
  SbiPage4,
  SbiPage5,
  SbiPage6,
  SbiPage7,
  SbiPage8,
} from './SbiValuationPreviewPages';
import {
  HDFC_PAGE_DEFS,
  HdfcPageWrapper,
  HdfcPage1,
  HdfcPage2,
  HdfcPage3,
  HdfcPage4,
  HdfcPage5,
} from './HdfcValuationPreviewPages';

// Exactly 19 Pages (18 Content Pages + Page 19 Empty for manual image attachment)
const DEFAULT_PAGE_DEFS = [
  { id: 'page-1', title: 'Page 1: Header & Part A – I. General', shortTitle: '1. Part A: I. General' },
  { id: 'page-2', title: 'Page 2: Part A – II. Description of Property (1-7)', shortTitle: '2. Part A: Description (1-7)' },
  { id: 'page-3', title: 'Page 3: Part A – II. Description (8-14) & III. Procedure', shortTitle: '3. Part A: Description & Procedure' },
  { id: 'page-4', title: 'Page 4: Part B – 1. Dimensions & 2. Extent of Site', shortTitle: '4. Part B: Dimensions & Extent' },
  { id: 'page-5', title: 'Page 5: Part B – 3. Characteristics of Site (Part 1)', shortTitle: '5. Part B: Characteristics (Part 1)' },
  { id: 'page-6', title: 'Page 6: Part B – 3. Characteristics of Site (Part 2)', shortTitle: '6. Part B: Characteristics (Part 2)' },
  { id: 'page-7', title: 'Page 7: Part B – 4. Value adopting GLR & 5. PMR', shortTitle: '7. Part B: GLR & PMR Valuation' },
  { id: 'page-8', title: 'Page 8: Part C – 1 to 6 & Floor Plinth Area Schedule', shortTitle: '8. Part C: Plinth Area Schedule' },
  { id: 'page-9', title: 'Page 9: Part C – 7. Drawing Approval & 8. Valuation Method', shortTitle: '9. Part C: Approvals & Method' },
  { id: 'page-10', title: 'Page 10: Part C – Valuation of Building Specifications', shortTitle: '10. Part C: Specifications & Depr' },
  { id: 'page-11', title: 'Page 11: Part C – Itemized Plinth Construction Schedule', shortTitle: '11. Part C: Itemized Cost Schedule' },
  { id: 'page-12', title: 'Page 12: Part D – Amenities & Extra Items (1-16)', shortTitle: '12. Part D: Amenities & Extra Items' },
  { id: 'page-13', title: 'Page 13: Part E – Services & Utilities (1-9)', shortTitle: '13. Part E: Services & Utilities' },
  { id: 'page-14', title: 'Page 14: Part F – Abstract Valuation Table & Factors', shortTitle: '14. Part F: Abstract Valuation' },
  { id: 'page-15', title: 'Page 15: Part F – Any Other Details & Enclosures', shortTitle: '15. Part F: Notes & Enclosures' },
  { id: 'page-16', title: 'Page 16: Part F – Valuer Certification (Points 1-5)', shortTitle: '16. Part F: Valuer Certification' },
  { id: 'page-17', title: 'Page 17: Format-A – Declaration from Valuers (1-10)', shortTitle: '17. Format-A: Declarations (1-10)' },
  { id: 'page-18', title: 'Page 18: Format-A – Questionnaire & Code of Conduct', shortTitle: '18. Questionnaire & Code of Conduct' },
  { id: 'page-19', title: 'Page 19: Annexure – Site & Location Images (Empty)', shortTitle: '19. Location Images (Empty Page)' },
];

export default function WordDocumentPreviewModal({
  isOpen,
  onClose,
  bankName = 'Canara Bank, Hi Tech Agri Finance Branch, Chennai',
  valuerName = 'Vr. R. Ramasamy',
  dateOfDeclaration = '14.05.2026',
  dateOfInspection = '13.05.2026',
  placeOfSigning = 'Karur',
}) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfProgress, setPdfProgress] = useState('');

  const isHdfcBank = /hdfc/i.test(bankName);
  const isSbiBank = !isHdfcBank && /state bank|sbi/i.test(bankName);
  const activePageDefs = isHdfcBank
    ? HDFC_PAGE_DEFS
    : isSbiBank
    ? SBI_PAGE_DEFS
    : DEFAULT_PAGE_DEFS;
  const targetDocx = isHdfcBank
    ? '/HDFC_Format.docx'
    : isSbiBank
    ? '/SBI_Format.docx'
    : '/Format.docx';
  const downloadFileName = isHdfcBank
    ? 'HDFC_Valuation_Report_#TA-2026-089.docx'
    : isSbiBank
    ? 'SBI_Valuation_Report_#TA-2026-089.docx'
    : 'Valuation_Report_#TA-2026-089.docx';
  const downloadPdfName = isHdfcBank
    ? 'HDFC_Valuation_Report_#TA-2026-089.pdf'
    : isSbiBank
    ? 'SBI_Valuation_Report_#TA-2026-089.pdf'
    : 'Valuation_Report_#TA-2026-089.pdf';

  if (!isOpen) return null;

  // Download real, authentic Microsoft Word Document (.docx) matching selected bank format 100%
  const downloadWordDoc = async () => {
    try {
      const response = await fetch(targetDocx);
      if (!response.ok) throw new Error(`${targetDocx} not found`);
      const arrayBuffer = await response.arrayBuffer();

      const zip = await JSZip.loadAsync(arrayBuffer);
      let docXml = await zip.file('word/document.xml').async('text');

      if (!isSbiBank && !isHdfcBank) {
        // Update parameters in document.xml dynamically if customized:
        if (bankName && !bankName.includes('Canara Bank')) {
          docXml = docXml.replace(/Canara Bank/g, bankName);
        }
        if (valuerName && valuerName !== 'Vr. R. Ramasamy') {
          docXml = docXml.replace(/Vr\.R\.Ramasamy/g, valuerName);
        }
        if (dateOfDeclaration) {
          docXml = docXml.replace(/14\.05\.2026/g, dateOfDeclaration);
        }
        if (dateOfInspection) {
          docXml = docXml.replace(/13\.05\.2026/g, dateOfInspection);
        }
        if (placeOfSigning) {
          docXml = docXml.replace(/Karur/g, placeOfSigning);
        }
      } else if (isHdfcBank) {
        if (valuerName && valuerName !== 'Arjun Mehta, B.E. (Civil), FIV') {
          docXml = docXml.replace(/Arjun Mehta, B\.E\. \(Civil\), FIV/g, valuerName);
        }
        if (dateOfDeclaration) {
          docXml = docXml.replace(/11-11-2024/g, dateOfDeclaration);
        }
        if (dateOfInspection) {
          docXml = docXml.replace(/09-11-2024/g, dateOfInspection);
        }
        if (placeOfSigning) {
          docXml = docXml.replace(/Patna, Bihar/g, placeOfSigning);
        }
      }

      zip.file('word/document.xml', docXml);

      const generatedBlob = await zip.generateAsync({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        compression: 'DEFLATE',
        compressionOptions: { level: 9 },
      });

      const url = URL.createObjectURL(generatedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = downloadFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading docx:', err);
      // Direct file fallback
      const link = document.createElement('a');
      link.href = targetDocx;
      link.download = downloadFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Download PDF file respecting clean B&W legal layout and no branding text
  const downloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      setPdfProgress('Initializing PDF...');

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pdfWidth = 210;
      const pdfHeight = 297;

      for (let i = 0; i < activePageDefs.length; i++) {
        const pageId = activePageDefs[i].id;
        setPdfProgress(`Rendering Page ${i + 1} of ${activePageDefs.length}...`);
        const pageElement = document.getElementById(`bw-word-${pageId}`);
        if (!pageElement) continue;

        const canvas = await html2canvas(pageElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          windowWidth: 1000,
          ignoreElements: (node) => {
            return (
              (node.getAttribute && node.getAttribute('data-html2canvas-ignore') === 'true') ||
              node.classList?.contains('no-print')
            );
          },
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);

        if (i > 0) {
          pdf.addPage([pdfWidth, pdfHeight], 'portrait');
        }

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      }

      setPdfProgress('Saving PDF...');
      pdf.save(downloadPdfName);
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Could not automatically compile PDF. Opening system print dialog to save as PDF...');
      window.print();
    } finally {
      setIsGeneratingPdf(false);
      setPdfProgress('');
    }
  };

  // Helper class for editable right-hand fields

  // Render individual page
  const renderPage = (pageId, pageNumber) => {
    if (isHdfcBank) {
      return (
        <HdfcPageWrapper key={pageId} pageId={pageId} pageNumber={pageNumber}>
          {pageId === 'hdfc-page-1' && <HdfcPage1 />}
          {pageId === 'hdfc-page-2' && <HdfcPage2 />}
          {pageId === 'hdfc-page-3' && <HdfcPage3 />}
          {pageId === 'hdfc-page-4' && <HdfcPage4 />}
          {pageId === 'hdfc-page-5' && <HdfcPage5 />}
        </HdfcPageWrapper>
      );
    }

    if (isSbiBank) {
      return (
        <SbiPageWrapper key={pageId} pageId={pageId} pageNumber={pageNumber}>
          {pageId === 'sbi-page-1' && <SbiPage1 />}
          {pageId === 'sbi-page-2' && <SbiPage2 />}
          {pageId === 'sbi-page-3' && <SbiPage3 />}
          {pageId === 'sbi-page-4' && <SbiPage4 />}
          {pageId === 'sbi-page-5' && <SbiPage5 />}
          {pageId === 'sbi-page-6' && <SbiPage6 />}
          {pageId === 'sbi-page-7' && <SbiPage7 />}
          {pageId === 'sbi-page-8' && <SbiPage8 />}
        </SbiPageWrapper>
      );
    }

    return (
      <div
        key={pageId}
        id={`bw-word-${pageId}`}
        className="w-full max-w-[850px] bg-white text-black shadow-xl border border-black p-8 sm:p-12 mb-8 text-[13px] leading-relaxed relative font-sans tabular-nums"
        style={{
          fontFamily: "Calibri, Arial, 'Segoe UI', sans-serif",
          fontVariantNumeric: 'lining-nums tabular-nums',
          fontFeatureSettings: '"lnum" 1, "tnum" 1',
        }}
      >
        {/* Page Content Selector */}
        {pageId === 'page-1' && renderPage1()}
        {pageId === 'page-2' && renderPage2()}
        {pageId === 'page-3' && renderPage3()}
        {pageId === 'page-4' && renderPage4()}
        {pageId === 'page-5' && renderPage5()}
        {pageId === 'page-6' && renderPage6()}
        {pageId === 'page-7' && renderPage7()}
        {pageId === 'page-8' && renderPage8()}
        {pageId === 'page-9' && renderPage9()}
        {pageId === 'page-10' && renderPage10()}
        {pageId === 'page-11' && renderPage11()}
        {pageId === 'page-12' && renderPage12()}
        {pageId === 'page-13' && renderPage13()}
        {pageId === 'page-14' && renderPage14()}
        {pageId === 'page-15' && renderPage15()}
        {pageId === 'page-16' && renderPage16()}
        {pageId === 'page-17' && renderPage17()}
        {pageId === 'page-18' && renderPage18()}
        {pageId === 'page-19' && renderPage19()}

        {/* Clean Page Footer (Removed branding text) */}
        <div className="border-t border-black pt-2 mt-6 flex justify-end text-[10px] text-gray-700 font-sans">
          <span>Page {pageNumber}</span>
        </div>
      </div>
    );
  };

  /* =========================================================================
     PAGE 1: HEADER & PART A – I. GENERAL
     ========================================================================= */
  const renderPage1 = () => (
    <div className="space-y-4">
      <div className="text-center font-bold text-[15px] uppercase tracking-wide border-b border-black pb-2">
        VALUATION OF PROPERTY (LAND &amp; BUILDING)
      </div>

      <div className="text-[12px] leading-snug">
        <p className="font-bold">TO,</p>
        <div className="ml-4">
          <p className="font-bold">BRANCH :- The Branch Manager,</p>
          <p className="ml-16 font-bold">Canara Bank,</p>
          <p className="ml-16">Hi Tech Agri Finance Branch,</p>
          <p className="ml-16">Chennai.,</p>
        </div>
      </div>

      <div className="text-center font-bold text-[14px] uppercase tracking-wide border-y border-black py-1">
        PART A – BASIC DATA
      </div>

      <div>
        <div className="font-bold text-[12.5px] uppercase mb-1.5">I. GENERAL:</div>
        <table className="w-full border-collapse border border-black text-[11.5px]">
          <tbody>
            <tr>
              <td className="border border-black p-1 w-8 text-center font-bold">1.</td>
              <td className="border border-black p-1 w-1/3">Purpose of valuation</td>
              <td className="border border-black p-1 w-4 text-center">:</td>
              <td
                className={`border border-black p-1 font-medium`}
              >
                To assess the present market value
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">2.</td>
              <td className="border border-black p-1">
                Date of Inspection<br />
                Date on which the valuation is made
              </td>
              <td className="border border-black p-1 text-center">: :</td>
              <td
                className={`border border-black p-1`}
              >
                {dateOfInspection}<br />
                {dateOfDeclaration}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">3.</td>
              <td className="border border-black p-1" colSpan={3}>
                <div className="font-bold mb-1">
                  Name of the reported owner with present address and phone number:
                </div>
                <div
                  className=""
                >
                  Raghavan Nair, Plot No. 12, Kelambakkam Village, Chengalpattu District. Ph: +91 98401 22345
                </div>
                <div className="text-[10.5px] text-gray-700 mt-1">
                  Name of the owner(s) and his/their addresses(es) with Phone No. (details of share of each owner in case of joint ownership): Sole Owner (100% share)
                </div>
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">4.</td>
              <td className="border border-black p-1">Documents produced for perusal:</td>
              <td className="border border-black p-1 text-center">:</td>
              <td
                className={`border border-black p-1`}
              >
                1. Sale Deed Doc No. 3841/2019 registered at SRO Thiruporur<br />
                2. Patta No. 1924 issued by Tahsildar, Thiruporur<br />
                3. TSLR Extract &amp; DTCP Approved Layout Permit #418/2021<br />
                4. Property Tax Receipt &amp; EB Card
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">5.</td>
              <td className="border border-black p-1">
                Brief description of the property taken for valuation (Including leasehold/free hold etc)
              </td>
              <td className="border border-black p-1 text-center">:</td>
              <td
                className={`border border-black p-1`}
              >
                Freehold Residential Land measuring 4,800 Sq.ft with Ground + First Floor (G+1) RCC Framed Residential Building
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">6.</td>
              <td className="border border-black p-1">Scope of valuation</td>
              <td className="border border-black p-1 text-center">:</td>
              <td
                className={`border border-black p-1 font-bold`}
              >
                To assess the present market value
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">7.</td>
              <td className="border border-black p-1">
                If this report is to be used for any bank purpose, state the name of the bank and branch, if known
              </td>
              <td className="border border-black p-1 text-center">:</td>
              <td
                className={`border border-black p-1 font-bold`}
              >
                The Branch Manager, Canara Bank Ltd, Hi Tech Agri Finance Branch, Chennai.,
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  /* =========================================================================
     PAGE 2: PART A – II. DESCRIPTION OF THE PROPERTY (1-7)
     ========================================================================= */
  const renderPage2 = () => (
    <div className="space-y-4">

      <div>
        <div className="font-bold text-[12.5px] uppercase mb-1.5">
          II. DESCRIPTION OF THE PROPERTY:
        </div>
        <table className="w-full border-collapse border border-black text-[11.5px]">
          <tbody>
            <tr>
              <td className="border border-black p-1 w-8 text-center font-bold">1.</td>
              <td className="border border-black p-1 w-1/3">Postal address of the property with Pin code</td>
              <td className="border border-black p-1 w-4 text-center">:</td>
              <td
                className={`border border-black p-1`}
              >
                Plot No. 12, Kelambakkam, Thiruporur Taluk, Chengalpattu District, Tamil Nadu - 603103
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">2.</td>
              <td className="border border-black p-1">
                City/Town<br />
                Residential Area<br />
                Commercial Area<br />
                Industrial Area
              </td>
              <td className="border border-black p-1 text-center">:</td>
              <td
                className={`border border-black p-1`}
              >
                Kelambakkam<br />
                : Yes<br />
                : No<br />
                : No
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">3.</td>
              <td className="border border-black p-1">Classification of the Area</td>
              <td className="border border-black p-1 text-center">:</td>
              <td
                className={`border border-black p-1`}
              >
                High / <strong>Middle</strong> / Poor &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp; Urban / <strong>Semi Urban</strong> / Rural
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">4.</td>
              <td className="border border-black p-1">Coming under Corporation Limit / Village Panchayat / Municipality</td>
              <td className="border border-black p-1 text-center">:</td>
              <td
                className={`border border-black p-1`}
              >
                Village Panchayat (Kelambakkam Panchayat)
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">5.</td>
              <td className="border border-black p-1">
                Whether covered under any State/Central Govt. enactments (e.g. Urban Land Ceiling Act) or notified under agency area/scheduled area/cantonment area
              </td>
              <td className="border border-black p-1 text-center">:</td>
              <td
                className={`border border-black p-1`}
              >
                No
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">6.</td>
              <td className="border border-black p-1">
                In case it is an agricultural land, any conversion to house site plots is contemplated
              </td>
              <td className="border border-black p-1 text-center">:</td>
              <td
                className={`border border-black p-1`}
              >
                NA (Approved Residential House Site Layout)
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">7.</td>
              <td className="border border-black p-1">
                Location of the property<br />
                Plot No. / Nagar / Survey No.<br />
                Door No.<br />
                S.F. No. / T.S. No. / R.S. No.<br />
                Village / Block<br />
                Taluk / Ward<br />
                Mandal / District / Municipality / Corporation
              </td>
              <td className="border border-black p-1 text-center">:</td>
              <td
                className={`border border-black p-1`}
              >
                <br />
                : Plot No. 12 / S.No. 142/3B<br />
                : New Door No. 14<br />
                : T.S. No. 42/1<br />
                : Kelambakkam Village<br />
                : Thiruporur Taluk<br />
                : Chengalpattu District
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  /* =========================================================================
     PAGE 3: PART A – II. DESCRIPTION (8-14) & III. PROCEDURE
     ========================================================================= */
  const renderPage3 = () => (
    <div className="space-y-4">

      <table className="w-full border-collapse border border-black text-[11.5px]">
        <tbody>
          {/* 8. Boundaries of the property */}
          <tr>
            <td className="border border-black p-1 w-8 text-center font-bold">8.</td>
            <td className="border border-black p-1" colSpan={2}>Boundaries of the property</td>
            <td className="border border-black p-1 font-bold underline">As per deed</td>
          </tr>
          <tr>
            <td className="border border-black p-1"></td>
            <td className="border border-black p-1 pl-4" colSpan={2}>North by</td>
            <td className="border border-black p-1">30 ft Wide Road (60'-0")</td>
          </tr>
          <tr>
            <td className="border border-black p-1"></td>
            <td className="border border-black p-1 pl-4" colSpan={2}>South by</td>
            <td className="border border-black p-1">S.No 142/3C (60'-0")</td>
          </tr>
          <tr>
            <td className="border border-black p-1"></td>
            <td className="border border-black p-1 pl-4" colSpan={2}>East by</td>
            <td className="border border-black p-1">S.No 142/4 (80'-0")</td>
          </tr>
          <tr>
            <td className="border border-black p-1"></td>
            <td className="border border-black p-1 pl-4" colSpan={2}>West by</td>
            <td className="border border-black p-1">S.No 142/3A (80'-0")</td>
          </tr>
          <tr>
            <td className="border border-black p-1"></td>
            <td className="border border-black p-1" colSpan={2}></td>
            <td className="border border-black p-1 font-bold underline">As per Actual</td>
          </tr>
          <tr>
            <td className="border border-black p-1"></td>
            <td className="border border-black p-1 pl-4" colSpan={2}>North</td>
            <td className="border border-black p-1">30 ft Wide Panchayat Tar Road (60'-0")</td>
          </tr>
          <tr>
            <td className="border border-black p-1"></td>
            <td className="border border-black p-1 pl-4" colSpan={2}>South</td>
            <td className="border border-black p-1">Vacant Land in S.No 142/3C (60'-0")</td>
          </tr>
          <tr>
            <td className="border border-black p-1"></td>
            <td className="border border-black p-1 pl-4" colSpan={2}>East</td>
            <td className="border border-black p-1">Plot No. 11 with Compound Wall (80'-0")</td>
          </tr>
          <tr>
            <td className="border border-black p-1"></td>
            <td className="border border-black p-1 pl-4" colSpan={2}>West</td>
            <td className="border border-black p-1">Plot No. 13 with Compound Wall (80'-0")</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">9.</td>
            <td className="border border-black p-1 w-1/3">Latitude, Longitude and Coordinates of the site</td>
            <td className="border border-black p-1 w-4 text-center">:</td>
            <td
              className={`border border-black p-1`}
            >
              Latitude : 12.7844° N &nbsp;&nbsp;&nbsp;&nbsp; Longitude : 80.2201° E
            </td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">10.</td>
            <td className="border border-black p-1">
              Property tax receipt referred<br />
              Receipt Number<br />
              amount<br />
              Receipt in the name of
            </td>
            <td className="border border-black p-1 text-center">:</td>
            <td
              className={`border border-black p-1`}
            >
              <br />
              : 84920 / 2025-26<br />
              : ₹2,450 /-<br />
              : Raghavan Nair
            </td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">11.</td>
            <td className="border border-black p-1">
              Electricity service connection consumer number<br />
              In the name of<br />
              Other details, if any
            </td>
            <td className="border border-black p-1 text-center">:</td>
            <td
              className={`border border-black p-1`}
            >
              : 04-182-005-912<br />
              : Raghavan Nair<br />
              : 3-Phase Domestic Service Connection
            </td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">12.</td>
            <td className="border border-black p-1">Property is presently occupied by</td>
            <td className="border border-black p-1 text-center">:</td>
            <td
              className={`border border-black p-1 font-bold`}
            >
              Occupied by Owner
            </td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">13.</td>
            <td className="border border-black p-1">If tenanted fully, What is the gross monthly rent?</td>
            <td className="border border-black p-1 text-center">:</td>
            <td
              className={`border border-black p-1`}
            >
              Nil
            </td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">14.</td>
            <td className="border border-black p-1" colSpan={3}>
              <div>If occupied by both / By assuming the entire building is let out:</div>
              <div
                className={`grid grid-cols-2 mt-1`}
              >
                <div>What is the probable monthly rent? : <strong>₹35,000 /-</strong></div>
                <div>What is the advance amount? : <strong>₹3,50,000 /-</strong></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <div className="font-bold text-[12.5px] uppercase mb-1.5">
          III. PROCEDURE OF VALUATION:
        </div>
        <table className="w-full border-collapse border border-black text-[11.5px]">
          <tbody>
            <tr>
              <td className="border border-black p-1 w-1/3">Valuation Details</td>
              <td className="border border-black p-1 w-4 text-center">:</td>
              <td
                className={`border border-black p-1 font-bold`}
              >
                Discussed in Part B, C, D, E &amp; F
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1">1. F.S.I.</td>
              <td className="border border-black p-1 text-center">:</td>
              <td
                className={`border border-black p-1`}
              >
                Allowed : <strong>2.0</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Plot Coverage : <strong>65%</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  /* =========================================================================
     PAGE 4: PART B – 1. DIMENSIONS & 2. EXTENT OF SITE
     ========================================================================= */
  const renderPage4 = () => (
    <div className="space-y-4">
      <div className="text-center font-bold text-[14px] uppercase tracking-wide border-y border-black py-1">
        PART B – LAND
      </div>

      <div>
        <div className="font-bold text-[12px] uppercase mb-1">
          1. Dimension of the site
        </div>
        <table className="w-full border-collapse border border-black text-[11.5px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black p-1 w-8 text-center font-bold">1.</th>
              <th className="border border-black p-1 text-left">Dimension of the site</th>
              <th className="border border-black p-1 text-center">A (as per Deed)</th>
              <th className="border border-black p-1 text-center">B (As per Actual)</th>
              <th className="border border-black p-1 text-center">C (As per TSLR Extract)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1"></td>
              <td className="border border-black p-1 font-bold">North</td>
              <td className={`border border-black p-1 text-center`}>60'-0"</td>
              <td className={`border border-black p-1 text-center`}>60'-0"</td>
              <td className={`border border-black p-1 text-center`}>60'-0"</td>
            </tr>
            <tr>
              <td className="border border-black p-1"></td>
              <td className="border border-black p-1 font-bold">South</td>
              <td className={`border border-black p-1 text-center`}>60'-0"</td>
              <td className={`border border-black p-1 text-center`}>60'-0"</td>
              <td className={`border border-black p-1 text-center`}>60'-0"</td>
            </tr>
            <tr>
              <td className="border border-black p-1"></td>
              <td className="border border-black p-1 font-bold">East</td>
              <td className={`border border-black p-1 text-center`}>80'-0"</td>
              <td className={`border border-black p-1 text-center`}>80'-0"</td>
              <td className={`border border-black p-1 text-center`}>80'-0"</td>
            </tr>
            <tr>
              <td className="border border-black p-1"></td>
              <td className="border border-black p-1 font-bold">West</td>
              <td className={`border border-black p-1 text-center`}>80'-0"</td>
              <td className={`border border-black p-1 text-center`}>80'-0"</td>
              <td className={`border border-black p-1 text-center`}>80'-0"</td>
            </tr>
            <tr className="font-bold bg-gray-50">
              <td className="border border-black p-1"></td>
              <td className="border border-black p-1">Total Extent</td>
              <td className={`border border-black p-1 text-center`}>4,800 Sq.ft</td>
              <td className={`border border-black p-1 text-center`}>4,800 Sq.ft</td>
              <td className={`border border-black p-1 text-center`}>4,800 Sq.ft</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <div className="font-bold text-[12px] uppercase mb-1">
          2. Extent of site
        </div>
        <table className="w-full border-collapse border border-black text-[11.5px]">
          <tbody>
            <tr>
              <td className="border border-black p-1 w-8 text-center font-bold">2.</td>
              <td className="border border-black p-1 w-1/3">Extent of site (As per TSLR Extract)</td>
              <td className="border border-black p-1 w-4 text-center">:</td>
              <td
                className={`border border-black p-1 font-bold`}
              >
                4,800 Sq.ft (11.02 Cents / 2.00 Grounds)
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1"></td>
              <td className="border border-black p-1">Size of the Plot</td>
              <td className="border border-black p-1 text-center">:</td>
              <td
                className={`border border-black p-1`}
              >
                60'-0" x 80'-0"
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1"></td>
              <td className="border border-black p-1">North &amp; South</td>
              <td className="border border-black p-1 text-center">:</td>
              <td
                className={`border border-black p-1`}
              >
                60'-0"
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1"></td>
              <td className="border border-black p-1">East &amp; West</td>
              <td className="border border-black p-1 text-center">:</td>
              <td
                className={`border border-black p-1`}
              >
                80'-0"
              </td>
            </tr>
            <tr className="font-bold bg-gray-50">
              <td className="border border-black p-1"></td>
              <td className="border border-black p-1">Total Extent of the Plot</td>
              <td className="border border-black p-1 text-center">:</td>
              <td
                className={`border border-black p-1`}
              >
                4,800 Sq.ft
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  /* =========================================================================
     PAGE 5: PART B – 3. CHARACTERISTICS OF THE SITE (PART 1)
     ========================================================================= */
  const renderPage5 = () => (
    <div className="space-y-4">

      <div>
        <div className="font-bold text-[12px] uppercase mb-1">
          3. Characteristics of the site (Items 1 to 11):
        </div>
        <table className="w-full border-collapse border border-black text-[11.5px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black p-1 w-8 text-center font-bold">Sl</th>
              <th className="border border-black p-1 text-left w-1/2">Checklist Parameter</th>
              <th className="border border-black p-1 text-left">Valuer Observation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1 text-center">i</td>
              <td className="border border-black p-1">What is the character of the locality?</td>
              <td className={`border border-black p-1`}>Developing Residential Layout</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center">ii</td>
              <td className="border border-black p-1">What is the classification of the locality?</td>
              <td className={`border border-black p-1`}>Middle Class Residential Area</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center">iii</td>
              <td className="border border-black p-1">Development of surrounding areas</td>
              <td className={`border border-black p-1`}>Good, fully developed with modern residential houses</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center">iv</td>
              <td className="border border-black p-1">Possibility of frequent flooding / submerging</td>
              <td className={`border border-black p-1`}>No / Free from flooding</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center">v</td>
              <td className="border border-black p-1">Feasibility to Civic amenities (school, hospital, bus stop, market)</td>
              <td className={`border border-black p-1`}>Available within 1 to 2 kms radius</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center">vi</td>
              <td className="border border-black p-1">Level of land with topographical conditions</td>
              <td className={`border border-black p-1`}>Plain land, on par with adjacent road level</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center">vii</td>
              <td className="border border-black p-1">Shape of land</td>
              <td className={`border border-black p-1`}>Regular Rectangular Plot</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center">viii</td>
              <td className="border border-black p-1">Type of use to which it can be put</td>
              <td className={`border border-black p-1`}>Residential Purpose</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center">ix</td>
              <td className="border border-black p-1">Any usage restriction</td>
              <td className={`border border-black p-1`}>As per local Panchayat / Planning Authority rules</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center">x</td>
              <td className="border border-black p-1">Is plot in town planning approved layout?</td>
              <td className={`border border-black p-1 font-bold`}>Yes (DTCP Approved Layout Permit #418/2021)</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center">xi</td>
              <td className="border border-black p-1">Corner Plot or Intermittent Plot?</td>
              <td className={`border border-black p-1`}>Intermittent Plot</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  /* =========================================================================
     PAGE 6: PART B – 3. CHARACTERISTICS OF THE SITE (PART 2)
     ========================================================================= */
  const renderPage6 = () => (
    <div className="space-y-4">

      <div>
        <div className="font-bold text-[12px] uppercase mb-1">
          3. Characteristics of the site (Items 12 to 23):
        </div>
        <table className="w-full border-collapse border border-black text-[11.5px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black p-1 w-8 text-center font-bold">Sl</th>
              <th className="border border-black p-1 text-left w-1/2">Checklist Parameter</th>
              <th className="border border-black p-1 text-left">Valuer Observation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1 text-center">xii</td>
              <td className="border border-black p-1">Type of road available at present</td>
              <td className={`border border-black p-1`}>Tar / Bitumen Road</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center">xiii</td>
              <td className="border border-black p-1">Road facilities are available?</td>
              <td className={`border border-black p-1`}>Yes, direct public road frontage available</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center">xiv</td>
              <td className="border border-black p-1">Is it a land – locked land?</td>
              <td className={`border border-black p-1 font-bold`}>No</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center">xv</td>
              <td className="border border-black p-1">Water Potentiality</td>
              <td className={`border border-black p-1`}>Good potable ground water available</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center">xvi</td>
              <td className="border border-black p-1">What is the width of the Road?</td>
              <td className={`border border-black p-1 font-bold`}>30'-0" Wide Road</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center">xvii</td>
              <td className="border border-black p-1">Width of road – is it below 20ft or more than 20 ft.</td>
              <td className={`border border-black p-1`}>More than 20 ft</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center">xviii</td>
              <td className="border border-black p-1">Underground sewerage system</td>
              <td className={`border border-black p-1`}>Septic tank arrangement (Underground planned)</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center">xix</td>
              <td className="border border-black p-1">Is power supply available at the site?</td>
              <td className={`border border-black p-1`}>Yes, TANGEDCO 3-phase grid available</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center">xx</td>
              <td className="border border-black p-1">Advantage of the site</td>
              <td className={`border border-black p-1`}>Close to OMR IT Corridor &amp; Kelambakkam Junction</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center">xxi</td>
              <td className="border border-black p-1">Special remarks, if any (threat of acquisition, road widening, CRZ)</td>
              <td className={`border border-black p-1`}>Nil. No acquisition threat or CRZ restriction (&gt;15 km from coast)</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center">xxii</td>
              <td className="border border-black p-1">Any factors which affect the marketability of the land?</td>
              <td className={`border border-black p-1`}>Nil. Good marketability and high residential demand</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center">xxiii</td>
              <td className="border border-black p-1">Accessibility</td>
              <td className={`border border-black p-1`}>Accessible by 30 ft wide bitumen road connecting main highway</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  /* =========================================================================
     PAGE 7: PART B – 4. VALUE ADOPTING GLR & 5. VALUE ADOPTING PMR
     ========================================================================= */
  const renderPage7 = () => (
    <div className="space-y-4">

      <table className="w-full border-collapse border border-black text-[11.5px]">
        <tbody>
          <tr>
            <td className="border border-black p-1 w-8 text-center font-bold">4.</td>
            <td className="border border-black p-1 w-1/3">
              <strong>Value on adopting GLR (Guideline Rate)</strong><br />
              Guideline rate as obtained from the Registrar’s office (an evidence thereof to be enclosed)<br />
              <strong>Value of land by adopting GLR</strong>
            </td>
            <td className="border border-black p-1 w-4 text-center">:</td>
            <td
              className={`border border-black p-1`}
            >
              <br />
              : ₹1,850 /- per Sq.ft (SRO Thiruporur Guideline Benchmark)<br />
              : <span className="font-bold text-[12px]">₹88,80,000 /-</span> (4,800 Sq.ft @ ₹1,850/Sq.ft)
            </td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">5.</td>
            <td className="border border-black p-1">
              <strong>i) Value by adopting PMR (Prevailing Market Rate)</strong><br />
              ii) Prevailing market rate (details of at least two latest deals/transactions with respect to adjacent properties in the areas)<br />
              iii) Unit rate adopted in this valuation after considering characteristics of the subject plot<br />
              <strong>Value of land by adopting PMR</strong>
            </td>
            <td className="border border-black p-1 text-center">:</td>
            <td
              className={`border border-black p-1`}
            >
              <br />
              : Ref 1: S.No 142/2 sold @ ₹3,150/Sq.ft (Doc 1240/2026)<br />
              &nbsp;&nbsp;Ref 2: S.No 143/1 sold @ ₹3,050/Sq.ft (Doc 892/2026)<br />
              : ₹3,100 /- per Sq.ft<br />
              : <span className="font-bold text-[12px]">₹1,48,80,000 /-</span> (4,800 Sq.ft @ ₹3,100/Sq.ft)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  /* =========================================================================
     PAGE 8: PART C – 1 TO 6 & FLOOR PLINTH AREA SCHEDULE
     ========================================================================= */
  const renderPage8 = () => (
    <div className="space-y-4">
      <div className="text-center font-bold text-[14px] uppercase tracking-wide border-y border-black py-1">
        PART C – BUILDINGS
      </div>

      <table className="w-full border-collapse border border-black text-[11.5px]">
        <tbody>
          <tr>
            <td className="border border-black p-1 w-8 text-center font-bold"></td>
            <td className="border border-black p-1 w-1/3 font-bold">Type of Building</td>
            <td className="border border-black p-1 w-4 text-center">:</td>
            <td className={`border border-black p-1 font-bold`}>Residential Independent Building (G+1 Floor)</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">1.</td>
            <td className="border border-black p-1">Type of construction</td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1`}>RCC Framed Structure</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">2.</td>
            <td className="border border-black p-1">Quality of construction</td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1`}>Good</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">3.</td>
            <td className="border border-black p-1">Appearance of Building</td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1`}>Good</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">4.</td>
            <td className="border border-black p-1">Maintenance / Condition of the Building</td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1`}>Exterior : Good &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Interior : Good</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">5.</td>
            <td className="border border-black p-1">Plinth Area</td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1 font-bold`}>As per IS 3861 – 1975</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">6.</td>
            <td className="border border-black p-1">Number of floors and height of each floor including basement, if any</td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1`}>Ground + First Floor (10'-0" height each floor). No basement.</td>
          </tr>
        </tbody>
      </table>

      <div>
        <div className="font-bold text-[11.5px] uppercase mb-1">
          Floor Plinth Area Schedule (As per Approved Plan &amp; Actual at Site):
        </div>
        <table className="w-full border-collapse border border-black text-[11.5px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black p-1 text-left">Floor</th>
              <th className="border border-black p-1 text-center">Year of Construction</th>
              <th className="border border-black p-1 text-center">Roof</th>
              <th className="border border-black p-1 text-center">Main Portion A</th>
              <th className="border border-black p-1 text-center">Cantilevered Portion B</th>
              <th className="border border-black p-1 text-center">Total A + 50% of B</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1 font-bold">Ground Floor</td>
              <td className={`border border-black p-1 text-center`}>2021 (As per deed &amp; site)</td>
              <td className={`border border-black p-1 text-center`}>RCC</td>
              <td className={`border border-black p-1 text-center`}>1,650 Sq.ft</td>
              <td className={`border border-black p-1 text-center`}>200 Sq.ft</td>
              <td className={`border border-black p-1 text-center font-bold`}>1,750 Sq.ft</td>
            </tr>
            <tr>
              <td className="border border-black p-1 font-bold">First Floor</td>
              <td className={`border border-black p-1 text-center`}>2021 (As per deed &amp; site)</td>
              <td className={`border border-black p-1 text-center`}>RCC</td>
              <td className={`border border-black p-1 text-center`}>1,350 Sq.ft</td>
              <td className={`border border-black p-1 text-center`}>200 Sq.ft</td>
              <td className={`border border-black p-1 text-center font-bold`}>1,450 Sq.ft</td>
            </tr>
            <tr className="bg-gray-50 font-bold">
              <td className="border border-black p-1" colSpan={3}>Total Plinth Area</td>
              <td className={`border border-black p-1 text-center`}>3,000 Sq.ft</td>
              <td className={`border border-black p-1 text-center`}>400 Sq.ft</td>
              <td className={`border border-black p-1 text-center text-[12px]`}>3,200 Sq.ft</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  /* =========================================================================
     PAGE 9: PART C – 7. DRAWING APPROVAL & 8. VALUATION METHOD
     ========================================================================= */
  const renderPage9 = () => (
    <div className="space-y-4">

      <div className="text-[12px] space-y-2">
        <div className="font-bold underline uppercase">7. Drawing Approvals &amp; Building Sanctions:</div>
        <p>
          <strong>a. Drawing approval - Date of issue and validity of layout of Approved map /plan :</strong><br />
          <span className="">
            BL/0192/2020 dated 14.10.2020
          </span>
        </p>
        <p>
          <strong>b. Approved map/plan issuing authority :</strong><br />
          <span className="">
            Thiruporur Panchayat Union / Local Authority
          </span>
        </p>
        <p>
          <strong>c. Whether genuineness or authentic of approved map/plan is verified? :</strong><br />
          <span className="">
            Yes, verified with sanctioned plan copy
          </span>
        </p>
        <p>
          <strong>d. Any other comments by our empanelled valuers on authentic of approved plan? :</strong><br />
          <span className="">
            Nil
          </span>
        </p>
        <p>
          <strong>e. (Discuss on the building approval, reference, violations observed, consequences of violation etc.) :</strong><br />
          <span className="">
            Nil violations observed. The building construction conforms strictly to the sanctioned plan without structural deviations.
          </span>
        </p>
        <div className="pt-2 border-t border-black italic text-gray-800">
          <strong>8.</strong> Value of building is estimated by adopting suitable unit plinth area rate depending upon the specifications. Depreciation is calculated by straight-line method assuming a salvage value of 10% for RCC Roof.
        </div>
      </div>
    </div>
  );

  /* =========================================================================
     PAGE 10: PART C – VALUATION OF BUILDING SPECIFICATIONS & DEPRECIATION
     ========================================================================= */
  const renderPage10 = () => (
    <div className="space-y-4">

      <div>
        <div className="font-bold text-[12px] uppercase mb-1 underline">
          VALUATION OF BUILDING:
        </div>
        <table className="w-full border-collapse border border-black text-[11px]">
          <tbody>
            <tr>
              <td className="border border-black p-1 w-1/3 font-bold">Specification</td>
              <td className={`border border-black p-1`}>
                <strong>Floor finish:</strong> Vitrified tile flooring in all rooms; granite in staircase.<br />
                <strong>Superstructure:</strong> Brick masonry in cement mortar 1:6 with cement plastering.<br />
                <strong>Roof:</strong> RCC roof slab 1:1.5:3 mix 5" thickness.<br />
                <strong>Doors:</strong> Teak wood frame with carved panel shutter for main door; flush doors for rooms.<br />
                <strong>Windows:</strong> UPVC sliding glazed windows with MS security grills.<br />
                <strong>Weathering course:</strong> Brick jelly lime concrete with pressed terracotta tiles.
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 font-bold">Plinth area</td>
              <td className={`border border-black p-1`}>3,200 Sq.ft</td>
            </tr>
            <tr>
              <td className="border border-black p-1 font-bold">Year of construction (as reported / observed/ as per deed)</td>
              <td className={`border border-black p-1`}>Year 2021</td>
            </tr>
            <tr>
              <td className="border border-black p-1 font-bold">Age of the building</td>
              <td className={`border border-black p-1`}>5 Years</td>
            </tr>
            <tr>
              <td className="border border-black p-1 font-bold">If the age is not exactly known, further life expected</td>
              <td className={`border border-black p-1`}>55 Years</td>
            </tr>
            <tr>
              <td className="border border-black p-1 font-bold">Total life of the building estimated</td>
              <td className={`border border-black p-1`}>60 Years</td>
            </tr>
            <tr>
              <td className="border border-black p-1 font-bold">Depreciation percentage</td>
              <td className={`border border-black p-1`}>7.5% (Straight line method with 10% salvage value)</td>
            </tr>
            <tr>
              <td className="border border-black p-1 font-bold">Replacement rate of construction with existing conditions</td>
              <td className={`border border-black p-1`}>₹2,160 /- per Sq.ft</td>
            </tr>
            <tr>
              <td className="border border-black p-1 font-bold">Replacement Value</td>
              <td className={`border border-black p-1`}>₹69,18,900 /-</td>
            </tr>
            <tr>
              <td className="border border-black p-1 font-bold">Depreciation Value at the rate of</td>
              <td className={`border border-black p-1`}>₹5,18,900 /-</td>
            </tr>
            <tr className="bg-gray-50 font-bold">
              <td className="border border-black p-1">Present value of building</td>
              <td className={`border border-black p-1`}>₹64,00,000 /-</td>
            </tr>
            <tr className="bg-gray-100 font-bold text-[12px]">
              <td className="border border-black p-1">Total value of the building</td>
              <td className={`border border-black p-1`}>₹64,00,000 /- (Rupees Sixty-Four Lakhs Only)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  /* =========================================================================
     PAGE 11: PART C – ITEMIZED PLINTH CONSTRUCTION SCHEDULE
     ========================================================================= */
  const renderPage11 = () => (
    <div className="space-y-4">

      <div>
        <div className="font-bold text-[12px] uppercase mb-1">
          Itemized Plinth Area Construction Cost Table:
        </div>
        <table className="w-full border-collapse border border-black text-[10.5px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black p-1 text-center w-6">Sl No</th>
              <th className="border border-black p-1 text-left">Particulars of items</th>
              <th className="border border-black p-1 text-center">Plinth Area</th>
              <th className="border border-black p-1 text-center">Roof Height</th>
              <th className="border border-black p-1 text-center">Age of bldg</th>
              <th className="border border-black p-1 text-right">Est. Repl. Rate</th>
              <th className="border border-black p-1 text-right">Replacement Cost</th>
              <th className="border border-black p-1 text-right">Depreciation</th>
              <th className="border border-black p-1 text-right">Net Value after Dep.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1 text-center">1</td>
              <td className="border border-black p-1">Ground Floor Residential Portion</td>
              <td className={`border border-black p-1 text-center`}>1,750 Sq.ft</td>
              <td className={`border border-black p-1 text-center`}>10'-0"</td>
              <td className={`border border-black p-1 text-center`}>5 Yrs</td>
              <td className={`border border-black p-1 text-right`}>₹2,200</td>
              <td className={`border border-black p-1 text-right`}>₹38,50,000</td>
              <td className={`border border-black p-1 text-right`}>₹2,88,750</td>
              <td className={`border border-black p-1 text-right font-bold`}>₹35,61,250</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center">2</td>
              <td className="border border-black p-1">First Floor Residential Portion</td>
              <td className={`border border-black p-1 text-center`}>1,450 Sq.ft</td>
              <td className={`border border-black p-1 text-center`}>10'-0"</td>
              <td className={`border border-black p-1 text-center`}>5 Yrs</td>
              <td className={`border border-black p-1 text-right`}>₹2,116</td>
              <td className={`border border-black p-1 text-right`}>₹30,68,900</td>
              <td className={`border border-black p-1 text-right`}>₹2,30,150</td>
              <td className={`border border-black p-1 text-right font-bold`}>₹28,38,750</td>
            </tr>
            <tr className="bg-gray-100 font-bold">
              <td className="border border-black p-1 text-center" colSpan={2}>Total Superstructure</td>
              <td className={`border border-black p-1 text-center`}>3,200 Sq.ft</td>
              <td className="border border-black p-1 text-center">-</td>
              <td className="border border-black p-1 text-center">-</td>
              <td className="border border-black p-1 text-right">-</td>
              <td className={`border border-black p-1 text-right`}>₹69,18,900</td>
              <td className={`border border-black p-1 text-right`}>₹5,18,900</td>
              <td className={`border border-black p-1 text-right`}>₹64,00,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  /* =========================================================================
     PAGE 12: PART D – AMENITIES & EXTRA ITEMS (1-16)
     ========================================================================= */
  const renderPage12 = () => (
    <div className="space-y-4">
      <div className="text-center font-bold text-[14px] uppercase tracking-wide border-y border-black py-1">
        PART D – AMENITIES &amp; EXTRA ITEMS (Value after Depreciation)
      </div>

      <table className="w-full border-collapse border border-black text-[11.5px]">
        <tbody>
          <tr>
            <td className="border border-black p-1 w-8 text-center font-bold">1.</td>
            <td className="border border-black p-1 w-2/3">Portico</td>
            <td className="border border-black p-1 w-4 text-center">:</td>
            <td className={`border border-black p-1 text-right`}>Nil</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">2.</td>
            <td className="border border-black p-1">Ornamental Front / Pooja door</td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1 text-right`}>₹45,000 /-</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">3.</td>
            <td className="border border-black p-1">Sit out/Verandah with Steel grills</td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1 text-right`}>₹35,000 /-</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">4.</td>
            <td className="border border-black p-1">Extra Steel/collapsible gates</td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1 text-right`}>₹40,000 /-</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">5.</td>
            <td className="border border-black p-1">Cupboard work at G.F &amp; F.F Hall, Kitchen and bedrooms arrangements</td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1 text-right`}>₹2,50,000 /-</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">6.</td>
            <td className="border border-black p-1">Staircase arrangement at G.F to S.F (SS Handrail &amp; safety gate)</td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1 text-right`}>₹60,000 /-</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">7.</td>
            <td className="border border-black p-1">Marble/ceramic tiles flooring</td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1 text-right`}>Nil</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">8.</td>
            <td className="border border-black p-1">Interior decorations in Pooja Kitchen &amp; Home Theater</td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1 text-right`}>₹75,000 /-</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">9.</td>
            <td className="border border-black p-1">Architectural Elevation works</td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1 text-right`}>₹45,000 /-</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">10.</td>
            <td className="border border-black p-1">False ceiling wood &amp; Glass work arrangement</td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1 text-right`}>Nil</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">16.</td>
            <td className="border border-black p-1">Solar work arrangement</td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1 text-right`}>Nil</td>
          </tr>
          <tr className="bg-gray-100 font-bold text-[12px]">
            <td className="border border-black p-1"></td>
            <td className="border border-black p-1">Total (Part D)</td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1 text-right`}>
              ₹5,50,000 /- (PMR) &nbsp;|&nbsp; ₹4,20,000 /- (GLR)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  /* =========================================================================
     PAGE 13: PART E – SERVICES & UTILITIES (1-9)
     ========================================================================= */
  const renderPage13 = () => (
    <div className="space-y-4">
      <div className="text-center font-bold text-[14px] uppercase tracking-wide border-y border-black py-1">
        E – SERVICES (Value after Depreciation)
      </div>

      <table className="w-full border-collapse border border-black text-[11.5px]">
        <tbody>
          <tr>
            <td className="border border-black p-1 w-8 text-center font-bold">1.</td>
            <td className="border border-black p-1 w-2/3">
              <strong>Water supply arrangements:</strong><br />
              Open Well / Bore well depth 220 ft with compressor motor arrangements<br />
              Masonry sump 12,000L arrangement / RCC OHT 2,000L Capacity Arrangement
            </td>
            <td className="border border-black p-1 w-4 text-center">:</td>
            <td className={`border border-black p-1 text-right align-bottom`}>₹1,60,000 /-</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">2.</td>
            <td className="border border-black p-1">
              <strong>Drainage arrangements:</strong><br />
              Septic Tank with soak pit arrangement / Underground sewerage: Nil
            </td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1 text-right align-bottom`}>₹60,000 /-</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">3.</td>
            <td className="border border-black p-1">Compound wall arrangement (280 Rft brick masonry with plastering and paint)</td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1 text-right`}>₹1,20,000 /-</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">4.</td>
            <td className="border border-black p-1">Water Connection - 1 No (Panchayat water tap)</td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1 text-right`}>₹15,000 /-</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">5.</td>
            <td className="border border-black p-1">EB Connection (3-Phase Domestic Service Connection)</td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1 text-right`}>₹35,000 /-</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">6.</td>
            <td className="border border-black p-1">
              <strong>Electrical fittings &amp; others:</strong><br />
              Type of wiring : Concealed copper wiring<br />
              Class of fittings (superior/Ordinary/Poor) : Ordinary / Standard Modular<br />
              Number of light Points : 20 Nos Approximate.<br />
              Fan Points : 10 Nos Approximate.<br />
              Spare Plug Points : 15 Nos Approximate.<br />
              Any other item : Nil
            </td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1 text-right align-bottom`}>₹45,000 /-</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">8.</td>
            <td className="border border-black p-1">
              <strong>Plumbing installation:</strong><br />
              No. of water closets and their type : 04 Nos (EWC with dual flush)<br />
              No. of wash basins : 02 Nos ceramic<br />
              No. of bath tubs : Nil.<br />
              Water meter, taps etc : CPVC pipes &amp; brass taps<br />
              Any other fixtures : Nil
            </td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1 text-right align-bottom`}>₹35,000 /-</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">9.</td>
            <td className="border border-black p-1">Any other item</td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1 text-right`}>Nil</td>
          </tr>
          <tr className="bg-gray-100 font-bold text-[12px]">
            <td className="border border-black p-1"></td>
            <td className="border border-black p-1">Total (Part E)</td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1 text-right`}>
              ₹4,70,000 /- (PMR) &nbsp;|&nbsp; ₹3,50,000 /- (GLR)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  /* =========================================================================
     PAGE 14: PART F – ABSTRACT VALUATION TABLE & FACTORS
     ========================================================================= */
  const renderPage14 = () => (
    <div className="space-y-4">
      <div className="text-center font-bold text-[14px] uppercase tracking-wide border-y border-black py-1">
        PART F – ABSTRACT VALUE
      </div>

      <table className="w-full border-collapse border border-black text-[11.5px]">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black p-1 text-center w-12">Part</th>
            <th className="border border-black p-1 text-left">Description</th>
            <th className="border border-black p-1 text-right">Value adopting GLR Rs.</th>
            <th className="border border-black p-1 text-right">Value adopting PMR Rs.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-1 text-center font-bold">B</td>
            <td className="border border-black p-1">Land (4,800 Sq.ft)</td>
            <td className={`border border-black p-1 text-right`}>₹88,80,000</td>
            <td className={`border border-black p-1 text-right font-bold`}>₹1,48,80,000</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">C</td>
            <td className="border border-black p-1">Building Superstructure (3,200 Sq.ft G+1)</td>
            <td className={`border border-black p-1 text-right`}>₹48,00,000</td>
            <td className={`border border-black p-1 text-right font-bold`}>₹64,00,000</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">D</td>
            <td className="border border-black p-1">Amenities &amp; Extra Items</td>
            <td className={`border border-black p-1 text-right`}>₹4,20,000</td>
            <td className={`border border-black p-1 text-right font-bold`}>₹5,50,000</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-center font-bold">E</td>
            <td className="border border-black p-1">Services &amp; Utilities</td>
            <td className={`border border-black p-1 text-right`}>₹3,50,000</td>
            <td className={`border border-black p-1 text-right font-bold`}>₹4,70,000</td>
          </tr>
          <tr className="bg-gray-50 font-bold">
            <td className="border border-black p-1 text-center" colSpan={2}>Total Gross Value</td>
            <td className={`border border-black p-1 text-right`}>₹1,44,50,000</td>
            <td className={`border border-black p-1 text-right`}>₹2,23,00,000</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-left" colSpan={2}>
              <strong>Factors favouring for an additional value:</strong><br />
              1. Prime location near OMR IT Corridor &amp; prominent frontage<br />
              2. Superior architectural finish &amp; good maintenance
            </td>
            <td className="border border-black p-1 text-center">Add (+)</td>
            <td className={`border border-black p-1 text-right font-bold`}>₹3,00,000</td>
          </tr>
          <tr>
            <td className="border border-black p-1 text-left" colSpan={2}>
              <strong>Factors favouring for less value:</strong><br />
              1. Nil
            </td>
            <td className="border border-black p-1 text-center">Less (-)</td>
            <td className={`border border-black p-1 text-right font-bold`}>₹0</td>
          </tr>
          <tr className="bg-gray-100 font-bold text-[12.5px]">
            <td className="border border-black p-1 text-left" colSpan={2}>
              PRESENT FAIR MARKET VALUE (Adopted)
            </td>
            <td className="border border-black p-1 text-center">:</td>
            <td className={`border border-black p-1 text-right text-[13px]`}>
              ₹2,26,00,000 /-
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  /* =========================================================================
     PAGE 15: PART F – ANY OTHER DETAILS & ENCLOSURES
     ========================================================================= */
  const renderPage15 = () => (
    <div className="space-y-4">

      <div className="text-[11.5px] space-y-2">
        <div className="font-bold underline uppercase">ANY OTHER DETAILS:</div>
        <p className="italic text-gray-700">
          (Valuation: Here the approved valuer should discuss in detail his approach to valuation of property and indicate how the value has been arrived at, supported by necessary calculations. Also, such aspects as i) Salability ii) Likely rental valuers in future in iii) Any likely income it may generate, may be discussed).
        </p>
        <p className="">
          As a result of my appraisal and analysis, it is my considered opinion that the present fair market value of the above property in the prevailing condition with aforesaid specifications is <strong>₹2,26,00,000 /-</strong> (Rupees Two Crore Twenty-Six Lakhs Only). The book value of the above property as of date is <strong>₹1,44,50,000 /-</strong> and the distress value is <strong>₹1,92,10,000 /-</strong>.
        </p>
        <div className="flex justify-between items-center pt-2 font-bold">
          <span>Place: {placeOfSigning}</span>
          <span>Signature: __________________________</span>
        </div>
      </div>

      <div className="border border-black p-3 text-[11.5px] mt-4">
        <div className="font-bold underline mb-2">Enclosures Attached to this Valuation Report:</div>
        <div className="grid grid-cols-2 gap-2">
          <div>[✔] Site Plan</div>
          <div>[✔] Photos (Inner, Elevation &amp; Road View)</div>
          <div>[✔] Google Map Location</div>
          <div>[✔] Guideline Value sheet (SRO)</div>
          <div>[✔] TSLR Extract</div>
          <div>[✔] Property Tax Receipt</div>
        </div>
      </div>
    </div>
  );

  /* =========================================================================
     PAGE 16: PART F – VALUER CERTIFICATION (POINTS 1-5)
     ========================================================================= */
  const renderPage16 = () => (
    <div className="space-y-4">
      <div className="text-center font-bold text-[14px] uppercase tracking-wide border-b border-black pb-1">
        PART F – VALUER CERTIFICATE
      </div>

      <div className="text-[11.5px] space-y-2 border border-black p-4">
        <div className="font-bold text-[12px] underline mb-1">
          It is hereby certified that in my opinion:
        </div>
        <ol className="list-decimal ml-5 space-y-1.5 leading-relaxed">
          <li className="">
            The present market value of the property discussed in the report (above) by adopting prevailing market rate for land is <strong>₹2,26,00,000 /-</strong>
          </li>
          <li className="">
            The Forced sale value of the property is estimated as 15 % less than the present market value is <strong>₹1,92,10,000 /-</strong>
          </li>
          <li className="">
            The Realizable sale value of the property is estimated as 10% less than the present market is <strong>₹2,03,40,000 /-</strong>
          </li>
          <li className="">
            The Guideline value of the above property is <strong>₹1,44,50,000 /-</strong>
          </li>
          <li className="">
            Number of title deed(s) involved in this property is one. The relevant document for the subject property in the opinion of this valuer is Doc No. 3841/2019.
          </li>
          <li className="">
            If this property is offered as collateral security, the concerned financial institution is requested to verify the extent of land shown in this valuation report with respect to the latest sale deed.
          </li>
          <li className="">
            Value varies with the purpose and date of valuation. This report is not to be referred if the purpose is different other than mentioned in I(1).
          </li>
          <li className="">
            3. The property was inspected on {dateOfInspection} in the presence of Owner’s representative.
          </li>
          <li className="">
            4. The legal aspects were not considered in this valuation.
          </li>
          <li className="">
            5. This valuation work was undertaken by the valuer based upon the request from <strong>Canara Bank, Hi Tech Agri Finance Branch, Chennai.</strong>
          </li>
        </ol>

        <div className="flex justify-between items-end pt-6 font-bold text-[12px]">
          <div>
            <div>Place : {placeOfSigning}</div>
            <div>Date &nbsp;: {dateOfDeclaration}</div>
          </div>
          <div className="text-right">
            <div>__________________________________</div>
            <div>(Panel Valuer)</div>
            <div className="text-[11px] font-normal">{valuerName}</div>
          </div>
        </div>
      </div>
    </div>
  );

  /* =========================================================================
     PAGE 17: FORMAT-A – DECLARATION FROM VALUERS (1-10)
     ========================================================================= */
  const renderPage17 = () => (
    <div className="space-y-4">
      <div className="text-center font-bold text-[14px] uppercase tracking-wide border-y border-black py-1">
        FOMAT-A: DECLARATION FROM VALUERS
      </div>

      <div className="text-[11.5px] leading-relaxed space-y-1.5 border border-black p-4">
        <div className="font-bold underline mb-1">I hereby declare that-</div>
        <p className="">
          1. The information furnished in my valuation report dated {dateOfDeclaration} is true and correct to the best of my knowledge and belief and I have made an impartial and true valuation of the property.
        </p>
        <p className="">
          2. I have no direct or indirect interest in the property valued;
        </p>
        <p className="">
          3. I have personally inspected the property on {dateOfInspection} The work is not sub-contracted to any other valuer and carried out by myself.
        </p>
        <p className="">
          4. I have not been convicted of any offence and sentenced to a term of Imprisonment;
        </p>
        <p className="">
          5. I have not been found guilty of misconduct in my professional capacity.
        </p>
        <p className="">
          6. I have read the Handbook on Policy, Standards and procedure for Real Estate Valuation, 2011 of the IBA and this report is in conformity to the “Standards” enshrined for valuation in the Part-B of the above handbook to the best of my ability.
        </p>
        <p className="">
          7. I have read the International Valuation Standards (IVS) and the report submitted to the Bank for the respective asset class is in conformity to the “Standards” as enshrined for valuation in the IVS in “General Standards” and “Asset Standards” as applicable.
        </p>
        <p className="">
          8. I abide by the Model Code of Conduct for empanelment of valuer in the Bank. (Annexure III- A signed copy of same to be taken and kept along with this declaration)
        </p>
        <p className="">
          9. I am registered under Section 34 AB of the Wealth Tax Act, 1957.
        </p>
        <p className="">
          10. I am the proprietor / partner / authorized official of the firm / company, who is competent to sign this valuation report.
        </p>
      </div>
    </div>
  );

  /* =========================================================================
     PAGE 18: FORMAT-A – QUESTIONNAIRE & MODEL CODE OF CONDUCT
     ========================================================================= */
  const renderPage18 = () => (
    <div className="space-y-4">
      <div className="text-center font-bold text-[14px] uppercase tracking-wide border-b border-black pb-1">
        FOMAT-A: VALUER QUESTIONNAIRE &amp; CODE OF CONDUCT
      </div>

      <div>
        <div className="font-bold text-[11px] mb-1">Further, I hereby provide the following information:</div>
        <table className="w-full border-collapse border border-black text-[10.5px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black p-1 text-center w-8">S.No</th>
              <th className="border border-black p-1 text-left w-1/3">Particulars</th>
              <th className="border border-black p-1 text-left">Valuer comment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1 text-center font-bold">1</td>
              <td className="border border-black p-1">background information of the asset being valued;</td>
              <td className={`border border-black p-1`}>
                Residential Land and Building situated at Plot No. 12, S.No 142/3B, Kelambakkam Village, Chengalpattu District.
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">2</td>
              <td className="border border-black p-1">purpose of valuation and appointing authority</td>
              <td className={`border border-black p-1 font-bold`}>
                To assess the present market value, Realizable value, Distress Value
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">3</td>
              <td className="border border-black p-1">identity of the valuer and any other experts involved in the valuation;</td>
              <td className={`border border-black p-1 font-bold`}>
                Vr. R. Ramasamy (No Experts Involved)
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">4</td>
              <td className="border border-black p-1">disclosure of valuer interest or conflict, if any;</td>
              <td className={`border border-black p-1`}>Nil</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">5</td>
              <td className="border border-black p-1">date of appointment, valuation date and date of report;</td>
              <td className={`border border-black p-1`}>
                Date of Inspection : {dateOfInspection} &nbsp;|&nbsp; Date of Valuation : {dateOfDeclaration}
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">6</td>
              <td className="border border-black p-1">inspections and/or investigations undertaken;</td>
              <td className={`border border-black p-1`}>Valuer {valuerName}</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">7</td>
              <td className="border border-black p-1">nature and sources of the information used or relied upon;</td>
              <td className={`border border-black p-1`}>
                Real estate brokers and nearby site enquiry and the valuation standards of IVS
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">8</td>
              <td className="border border-black p-1">procedures adopted in carrying out the valuation and valuation standards followed;</td>
              <td className={`border border-black p-1`}>
                The site was inspected by the valuer with owner records, details are observed from him. Necessary measurement and specification are noted. For land value local enquires are done with the real estate agents in this area. For Building valuation the specification are noted and the cost of construction is calculated with suitable Depreciation as per Standards (IVS in "General standards" and "Asset Standards").
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">9</td>
              <td className="border border-black p-1">restrictions on use of the report, if any;</td>
              <td className={`border border-black p-1 font-bold`}>
                Canara Bank Loan Purpose Only
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">10</td>
              <td className="border border-black p-1">major factors that were taken into account during the valuation;</td>
              <td className={`border border-black p-1`}>
                Location, Road Width, DTCP Approval, Quality of Construction, Depreciation
              </td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">11</td>
              <td className="border border-black p-1">major factors that were taken into account during the valuation;</td>
              <td className={`border border-black p-1`}>Nil</td>
            </tr>
            <tr>
              <td className="border border-black p-1 text-center font-bold">12</td>
              <td className="border border-black p-1">Caveats, limitations and disclaimers to the extent they explain or elucidate limitations;</td>
              <td className={`border border-black p-1`}>Nil</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="border-t border-black pt-3">
        <div className="font-bold text-[12px] uppercase">MODEL CODE OF CONDUCT FOR VALUERS</div>
        <div className="text-[10px] text-gray-700 italic mb-1.5">
          &#123;Adopted in line with Companies (Registered Valuers and Valuation Rules, 2017)&#125;
        </div>
        <p className="text-[10.5px] leading-relaxed">
          All valuers empanelled with bank strictly adhere to high standards of <strong>Integrity and Fairness</strong>, <strong>Professional Competence and Due Care</strong>, <strong>Independence and Disclosure of Interest</strong>, <strong>Confidentiality</strong>, and <strong>Information Management</strong> without conflict of interest.
        </p>

        <div className="flex justify-between items-end pt-4 font-bold text-[11px]">
          <div>
            <div>Date &nbsp;: {dateOfDeclaration}</div>
            <div>Place : {placeOfSigning}</div>
          </div>
          <div className="text-right">
            <div>________________________________________</div>
            <div>Signature</div>
          </div>
        </div>
      </div>
    </div>
  );

  /* =========================================================================
     PAGE 19: ANNEXURE – SITE & LOCATION PHOTOGRAPHS (EMPTY PAGE)
     ========================================================================= */
  const renderPage19 = () => (
    <div className="h-full flex flex-col justify-between min-h-[750px]">
      <div>
        <div className="text-center font-bold text-[14px] uppercase tracking-wide border-b border-black pb-2 mb-4">
          ANNEXURE: SITE &amp; LOCATION PHOTOGRAPHS
        </div>

        <div className="text-[11.5px] border border-black p-3 bg-gray-50 flex justify-between items-center mb-6">
          <div>
            <strong>Property :</strong> Plot No. 12, S.No. 142/3B, Kelambakkam Village, Thiruporur Taluk<br />
            <strong>Applicant:</strong> Raghavan Nair &nbsp;|&nbsp; <strong>Bank:</strong> {bankName}
          </div>
          <div className="text-right">
            <strong>Inspection Date:</strong> {dateOfInspection}<br />
            <strong>Coordinates:</strong> 12.7844° N, 80.2201° E
          </div>
        </div>

        {/* Clean Empty Sheet Boundary for Manual Attachment */}
        <div className="w-full h-[520px] border-2 border-dashed border-gray-400 rounded flex flex-col items-center justify-center text-center p-8 bg-gray-50/50">
          <span className="material-symbols-outlined text-[48px] text-gray-400 mb-2">
            photo_library
          </span>
          <h4 className="font-bold text-[14px] text-gray-700 uppercase tracking-wide">
            Page 19: Location &amp; Property Photographs
          </h4>
          <p className="text-[12px] text-gray-500 max-w-md mt-1 leading-relaxed">
            This page is kept blank for attaching site photographs, front elevation, road view, and Google Maps location.
          </p>
          <div className="text-[11px] text-gray-400 mt-4 border border-gray-300 px-3 py-1 rounded">
            Manual Attachment Area • Company will affix physical / digital photographs here
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end pt-4 font-bold text-[11px] border-t border-black mt-6">
        <div>
          <div>Date: {dateOfInspection}</div>
          <div>Place: {placeOfSigning}</div>
        </div>
        <div className="text-right">
          <div>________________________________________</div>
          <div>Signature of Empaneled Valuer</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/80 backdrop-blur-xs overflow-hidden animate-in fade-in duration-150">
      {/* Top Application Bar */}
      <header className="bg-black text-white px-4 py-2.5 flex items-center justify-between gap-3 shadow-md shrink-0 border-b border-gray-700">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded bg-white text-black font-bold flex items-center justify-center shrink-0 shadow-xs text-[15px] font-sans">
            W
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="font-sans font-semibold text-[14px] sm:text-[15px] truncate">
                {downloadFileName}
              </h2>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded bg-white/20 text-[11px] font-mono">
                {isHdfcBank
                  ? '5 Pages • HDFC Bank Format'
                  : isSbiBank
                  ? '8 Pages • B&W Legal Format'
                  : '19 Pages • B&W Legal Format'}
              </span>
            </div>
            <p className="text-[11px] text-gray-300 truncate">
              {isHdfcBank
                ? `${bankName} • 4 Content Pages + Page 5 (Empty for Drawings)`
                : isSbiBank
                ? `${bankName} • 8 Pages (Parts A, B, C, D, E, F & Notes on Valuation)`
                : `${bankName} • 18 Content Pages + Page 19 (Empty for Manual Photos)`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Download as PDF */}
          <button
            type="button"
            onClick={downloadPdf}
            disabled={isGeneratingPdf}
            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-label text-[13px] font-semibold transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            title="Download as official high-resolution PDF document"
          >
            {isGeneratingPdf ? (
              <>
                <span className="material-symbols-outlined text-[17px] animate-spin">sync</span>
                <span className="truncate max-w-[130px]">{pdfProgress || 'Generating PDF...'}</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[17px]">picture_as_pdf</span>
                <span>Download as PDF</span>
              </>
            )}
          </button>

          {/* Download Word Document */}
          <button
            type="button"
            onClick={downloadWordDoc}
            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 rounded bg-white text-black hover:bg-gray-200 font-label text-[13px] font-semibold transition-colors shadow-sm cursor-pointer"
            title="Download official Microsoft Word document (.docx) matching format"
          >
            <span className="material-symbols-outlined text-[17px]">description</span>
            <span className="hidden sm:inline">Download as</span> Word (.docx)
          </button>

          {/* Print Button */}
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center justify-center p-1.5 sm:px-3 sm:py-1.5 rounded bg-white/10 hover:bg-white/20 text-white font-label text-[13px] transition-colors cursor-pointer border border-white/30"
            title="Print Document"
          >
            <span className="material-symbols-outlined text-[17px]">print</span>
            <span className="hidden sm:inline ml-1.5">Print</span>
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer ml-1"
            title="Close Preview"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </header>

      {/* Main Container: Document Viewer */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Scrollable Document Canvas */}
        <main className="flex-1 bg-gray-300 overflow-y-auto p-4 sm:p-8 flex flex-col items-center">
          {activePageDefs.map((def, idx) => renderPage(def.id, idx + 1))}
        </main>
      </div>
    </div>
  );
}
