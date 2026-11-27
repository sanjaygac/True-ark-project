import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import CompanyAdminSidebar from '../../components/company-admin/CompanyAdminSidebar';

const reportsDataMap = {
  'TA-2026-089': {
    id: 'TA-2026-089',
    code: '#TA-2026-089',
    statusBadge: 'Verified',
    date: '23 Nov 2026',
    purpose: 'Bank Collateral',
    surveyNo: '142/3B (Patta #884)',
    location: 'Kelambakkam, Tiruporur Tk, Chengalpattu',
    classification: 'DTCP Approved Residential Plot',
    extent: '4,800 Sq.ft (60 ft × 80 ft, Corner)',
    frontage: '30 ft Blacktop Main Road (North)',
    gisLabel: 'S.No 142/3B',
    comparables: [
      { parcel: 'S.No 140/1A — Kelambakkam', distance: '180 m', extent: '2,400 Sq.ft', regDate: 'Sep 2026', rate: '₹2,790' },
      { parcel: 'S.No 145/2B — Padur Link Rd', distance: '340 m', extent: '3,600 Sq.ft', regDate: 'Oct 2026', rate: '₹2,850' },
      { parcel: 'S.No 139/4C — OMR Service Rd', distance: '410 m', extent: '4,200 Sq.ft', regDate: 'Aug 2026', rate: '₹2,795' },
    ],
    marketValue: '₹1,48,50,000',
    realizableValue: '₹1,33,65,000',
    distressValue: '₹1,18,80,000',
  },
  'TA-2026-088': {
    id: 'TA-2026-088',
    code: '#TA-2026-088',
    statusBadge: 'In Review',
    date: '21 Nov 2026',
    purpose: 'Term Loan Mortgage',
    surveyNo: '88/1A (Patta #312)',
    location: 'Sriperumbudur, SIPCOT Corridor, Kancheepuram',
    classification: 'Industrial & Commercial Zone',
    extent: '12,400 Sq.ft (100 ft × 124 ft)',
    frontage: '60 ft NH-48 Service Road (East)',
    gisLabel: 'S.No 88/1A',
    comparables: [
      { parcel: 'S.No 86/2C — Sriperumbudur', distance: '220 m', extent: '10,000 Sq.ft', regDate: 'Oct 2026', rate: '₹3,310' },
      { parcel: 'S.No 91/1B — Irungattukottai', distance: '490 m', extent: '15,200 Sq.ft', regDate: 'Sep 2026', rate: '₹3,390' },
      { parcel: 'S.No 84/3A — Pennalur Rd', distance: '610 m', extent: '8,500 Sq.ft', regDate: 'Aug 2026', rate: '₹3,280' },
    ],
    marketValue: '₹4,15,00,000',
    realizableValue: '₹3,73,50,000',
    distressValue: '₹3,32,00,000',
  },
  'TA-2026-087': {
    id: 'TA-2026-087',
    code: '#TA-2026-087',
    statusBadge: 'Verified',
    date: '19 Nov 2026',
    purpose: 'Agri Credit Facility',
    surveyNo: 'Patta No. 419 (S.No 62/4)',
    location: 'Pollachi, Coimbatore District, TN',
    classification: 'Irrigated Agricultural Land (Nanjai)',
    extent: '3.45 Acres (1,50,282 Sq.ft)',
    frontage: '24 ft Panchayat Tar Road (South)',
    gisLabel: 'Patta #419',
    comparables: [
      { parcel: 'S.No 60/2 — Pollachi East', distance: '310 m', extent: '2.80 Acres', regDate: 'Oct 2026', rate: '₹27.8L / Ac' },
      { parcel: 'S.No 65/1A — Anaimalai Rd', distance: '540 m', extent: '4.10 Acres', regDate: 'Sep 2026', rate: '₹28.2L / Ac' },
      { parcel: 'S.No 58/3B — Sethumadai Rd', distance: '720 m', extent: '3.00 Acres', regDate: 'Jul 2026', rate: '₹27.5L / Ac' },
    ],
    marketValue: '₹96,60,000',
    realizableValue: '₹86,94,000',
    distressValue: '₹77,28,000',
  },
  'TA-2026-086': {
    id: 'TA-2026-086',
    code: '#TA-2026-086',
    statusBadge: 'Draft',
    date: '17 Nov 2026',
    purpose: 'Private Wealth Appraisal',
    surveyNo: '51/4 (Khata #1192)',
    location: 'Sarjapur Road, Carmelaram, Bengaluru',
    classification: 'BBMP A-Khata Residential Plot',
    extent: '3,600 Sq.ft (60 ft × 60 ft)',
    frontage: '40 ft Asphalted Avenue Road (West)',
    gisLabel: 'S.No 51/4',
    comparables: [
      { parcel: 'S.No 50/2 — Doddakannelli', distance: '190 m', extent: '2,400 Sq.ft', regDate: 'Oct 2026', rate: '₹6,450' },
      { parcel: 'S.No 53/1C — Kaikondrahalli', distance: '430 m', extent: '4,000 Sq.ft', regDate: 'Sep 2026', rate: '₹6,580' },
      { parcel: 'S.No 49/8 — Hadosiddapura', distance: '520 m', extent: '3,000 Sq.ft', regDate: 'Aug 2026', rate: '₹6,410' },
    ],
    marketValue: '₹2,34,00,000',
    realizableValue: '₹2,10,60,000',
    distressValue: '₹1,87,20,000',
  },
  'TA-2026-085': {
    id: 'TA-2026-085',
    code: '#TA-2026-085',
    statusBadge: 'Verified',
    date: '15 Nov 2026',
    purpose: 'NBFC Asset Backing',
    surveyNo: '204/2C (Patta #609)',
    location: 'Oragadam Industrial Corridor, Sriperumbudur',
    classification: 'Commercial Mixed-Use Parcel',
    extent: '8,200 Sq.ft (82 ft × 100 ft)',
    frontage: '45 ft State Highway Link Road (North)',
    gisLabel: 'S.No 204/2C',
    comparables: [
      { parcel: 'S.No 201/1B — Oragadam', distance: '260 m', extent: '6,000 Sq.ft', regDate: 'Oct 2026', rate: '₹2,340' },
      { parcel: 'S.No 208/4A — Vadakkupattu', distance: '480 m', extent: '9,600 Sq.ft', regDate: 'Sep 2026', rate: '₹2,380' },
      { parcel: 'S.No 199/3D — Walajabad Rd', distance: '630 m', extent: '7,400 Sq.ft', regDate: 'Aug 2026', rate: '₹2,310' },
    ],
    marketValue: '₹1,92,70,000',
    realizableValue: '₹1,73,43,000',
    distressValue: '₹1,54,16,000',
  },
  'TA-2026-084': {
    id: 'TA-2026-084',
    code: '#TA-2026-084',
    statusBadge: 'In Review',
    date: '12 Nov 2026',
    purpose: 'Housing Finance Collateral',
    surveyNo: 'Khata 712/9 (Sy.No 94/2)',
    location: 'Whitefield Main Rd, Mahadevapura, Bengaluru',
    classification: 'BBMP A-Khata Residential Plot',
    extent: '5,400 Sq.ft (60 ft × 90 ft)',
    frontage: '40 ft Asphalted Corporation Road (East)',
    gisLabel: 'Khata 712/9',
    comparables: [
      { parcel: 'Khata 710/4 — Whitefield', distance: '210 m', extent: '4,800 Sq.ft', regDate: 'Oct 2026', rate: '₹5,880' },
      { parcel: 'Khata 715/2 — Brookefield', distance: '390 m', extent: '5,000 Sq.ft', regDate: 'Sep 2026', rate: '₹5,950' },
      { parcel: 'Khata 708/1 — ITPL Backgate', distance: '540 m', extent: '6,000 Sq.ft', regDate: 'Aug 2026', rate: '₹5,840' },
    ],
    marketValue: '₹3,18,60,000',
    realizableValue: '₹2,86,74,000',
    distressValue: '₹2,54,88,000',
  },
  'TA-2026-083': {
    id: 'TA-2026-083',
    code: '#TA-2026-083',
    statusBadge: 'In Review',
    date: '10 Nov 2026',
    purpose: 'Home Equity Collateral',
    surveyNo: '309/2B (Patta #721)',
    location: 'Tambaram West, Chengalpattu District',
    classification: 'CMDA Approved Residential Plot',
    extent: '3,200 Sq.ft (40 ft × 80 ft)',
    frontage: '30 ft Municipal Link Road (West)',
    gisLabel: 'S.No 309/2B',
    comparables: [
      { parcel: 'S.No 307/1A — Tambaram West', distance: '240 m', extent: '2,800 Sq.ft', regDate: 'Oct 2026', rate: '₹5,050' },
      { parcel: 'S.No 312/4C — Mudichur Rd', distance: '380 m', extent: '3,600 Sq.ft', regDate: 'Sep 2026', rate: '₹5,120' },
      { parcel: 'S.No 305/2D — Perungalathur', distance: '520 m', extent: '3,000 Sq.ft', regDate: 'Aug 2026', rate: '₹4,980' },
    ],
    marketValue: '₹1,62,40,000',
    realizableValue: '₹1,46,16,000',
    distressValue: '₹1,29,92,000',
  },
  'TA-2026-081': {
    id: 'TA-2026-081',
    code: '#TA-2026-081',
    statusBadge: 'Draft',
    date: '06 Nov 2026',
    purpose: 'Logistics Warehouse Financing',
    surveyNo: '118/4D (Patta #214)',
    location: 'Hosur SIPCOT Phase II, Krishnagiri',
    classification: 'Industrial & Warehousing Corridor',
    extent: '18,500 Sq.ft (100 ft × 185 ft)',
    frontage: '60 ft NH-44 Service Road (South)',
    gisLabel: 'S.No 118/4D',
    comparables: [
      { parcel: 'S.No 115/2A — Hosur Phase II', distance: '310 m', extent: '15,000 Sq.ft', regDate: 'Oct 2026', rate: '₹1,470' },
      { parcel: 'S.No 121/3B — Zuzuvadi', distance: '490 m', extent: '20,000 Sq.ft', regDate: 'Sep 2026', rate: '₹1,510' },
      { parcel: 'S.No 114/1C — Mookandapalli', distance: '670 m', extent: '16,500 Sq.ft', regDate: 'Aug 2026', rate: '₹1,440' },
    ],
    marketValue: '₹2,74,00,000',
    realizableValue: '₹2,46,60,000',
    distressValue: '₹2,19,20,000',
  },
};

export default function CompanyReportViewPage() {
  const { id } = useParams();
  const report = reportsDataMap[id] || reportsDataMap['TA-2026-089'];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(report.statusBadge);
  const [isDownloading, setIsDownloading] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [isEditingInputs, setIsEditingInputs] = useState(false);
  const [purposeInput, setPurposeInput] = useState(report.purpose);
  const [extMapFailed, setExtMapFailed] = useState(false);

  const reportRef = useRef(null);

  useEffect(() => {
    document.title = `Certified Land Valuation Report — ${report.code}`;
    setPurposeInput(report.purpose);
    setCurrentStatus(report.statusBadge);
  }, [report.code, report.purpose, report.statusBadge]);

  const handleShareLink = async () => {
    try {
      if (navigator.clipboard && window.location) {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      // Fallback gracefully if clipboard permission is unavailable
    }
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2200);
  };

  const handleDownloadPdf = async () => {
    if (!reportRef.current || isDownloading) return;
    setIsDownloading(true);

    const renderCanvas = async (skipExternalImg) => {
      return html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#FFFFFF',
        logging: false,
        ignoreElements: skipExternalImg
          ? (el) => el?.dataset?.externalMapImg === 'true'
          : undefined,
      });
    };

    try {
      let canvas;
      try {
        canvas = await renderCanvas(extMapFailed);
      } catch {
        // Retry without external cross-origin image if tainted
        canvas = await renderCanvas(true);
      }

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 8;
      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - margin * 2;

      let imgWidth = availableWidth;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (imgHeight > availableHeight) {
        const ratio = availableHeight / imgHeight;
        imgHeight = availableHeight;
        imgWidth = imgWidth * ratio;
      }

      const xOffset = (pageWidth - imgWidth) / 2;
      const yOffset = margin;

      pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight, undefined, 'FAST');
      pdf.save(`Certified-Valuation-Report-${report.id}.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'In Review') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-warning-container text-on-warning-container font-label text-label-sm shrink-0">
          <span className="material-symbols-outlined text-body-sm" aria-hidden="true">
            pending
          </span>
          In Review
        </span>
      );
    }
    if (status === 'Draft') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-label text-label-sm shrink-0">
          <span className="material-symbols-outlined text-body-sm" aria-hidden="true">
            edit_note
          </span>
          Draft
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-label-sm shrink-0">
        <span
          className="material-symbols-outlined text-body-sm"
          style={{ fontVariationSettings: "'FILL' 1" }}
          aria-hidden="true"
        >
          verified
        </span>
        Verified
      </span>
    );
  };

  return (
    <div className="h-screen flex bg-surface-container-low text-on-surface font-body antialiased overflow-hidden relative">
      {/* Left Sidebar (Company Admin Portal Only) */}
      <CompanyAdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Column */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        {/* Top Sticky Toolbar */}
        <header className="sticky top-0 z-20 bg-surface-container-lowest border-b border-outline-variant px-3 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 sm:gap-4 shrink-0">
          <div className="flex flex-col gap-1 min-w-0">
            <Link
              to="/company-admin"
              className="inline-flex items-center gap-1.5 font-label text-label-sm text-tertiary hover:underline w-fit"
            >
              <span className="material-symbols-outlined text-title-sm" aria-hidden="true">
                arrow_back
              </span>
              <span>Back to Valuation Dashboard</span>
            </Link>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setSidebarOpen((prev) => !prev)}
                className="lg:hidden inline-flex items-center justify-center w-8 h-8 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors duration-state-change shrink-0"
                aria-label="Open sidebar menu"
              >
                <span className="material-symbols-outlined text-[20px]">menu</span>
              </button>
              <h1 className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-primary truncate">
                Certified Land Valuation Report — {report.code}
              </h1>
              {getStatusBadge(currentStatus)}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {currentStatus === 'In Review' && (
              <button
                type="button"
                onClick={() => setCurrentStatus('Verified')}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded bg-tertiary text-on-tertiary font-label text-label-md hover:opacity-95 transition-colors duration-state-change whitespace-nowrap shadow-sm"
              >
                <span className="material-symbols-outlined text-title-sm" aria-hidden="true">
                  verified
                </span>
                <span>Approve Valuation</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsEditingInputs((prev) => !prev)}
              className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded bg-surface-container-lowest border border-outline-variant text-primary font-label text-label-md hover:bg-surface-container-low transition-colors duration-state-change whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-title-sm" aria-hidden="true">
                {isEditingInputs ? 'check' : 'edit'}
              </span>
              <span>{isEditingInputs ? 'Done Editing' : 'Edit Inputs'}</span>
            </button>

            <button
              type="button"
              onClick={handleShareLink}
              className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded bg-surface-container-lowest border border-outline-variant text-primary font-label text-label-md hover:bg-surface-container-low transition-colors duration-state-change whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-title-sm" aria-hidden="true">
                {shareCopied ? 'check_circle' : 'share'}
              </span>
              <span>{shareCopied ? 'Link Copied' : 'Share Client Link'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded bg-primary text-on-primary font-label text-label-md hover:opacity-95 disabled:opacity-70 transition-colors duration-state-change whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-title-sm" aria-hidden="true">
                {isDownloading ? 'hourglass_top' : 'download'}
              </span>
              <span>{isDownloading ? 'Generating PDF...' : 'Download Official PDF'}</span>
            </button>
          </div>
        </header>

        {/* Inline Edit Inputs Bar (when Edit Inputs clicked) */}
        {isEditingInputs && (
          <div className="bg-primary-container/60 border-b border-outline-variant px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-center gap-3">
            <span className="font-label text-label-sm text-primary">Report Purpose:</span>
            <input
              type="text"
              value={purposeInput}
              onChange={(e) => setPurposeInput(e.target.value)}
              className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-1 font-body text-body-sm text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none w-56"
            />
          </div>
        )}

        {/* Center Canvas: Realistic White A4 Document Preview */}
        <main className="flex-1 py-6 sm:py-8 lg:py-10 px-3 sm:px-6 flex justify-center items-start">
          <article
            ref={reportRef}
            className="w-full max-w-[820px] bg-surface-container-lowest border border-outline-variant rounded-sm shadow-xl shadow-shadow/10 p-6 sm:p-10 md:p-12 flex flex-col gap-8"
          >
            {/* A4 Document Header */}
            <header className="flex flex-col sm:flex-row items-start justify-between gap-6 pb-6 border-b-2 border-primary">
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <img
                    src="/company-logo.png"
                    alt="TrueArk"
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <p className="font-label text-label-md text-on-surface-variant">
                  Certified Land &amp; Property Valuation Report
                </p>
                <p className="font-body text-body-sm text-outline">
                  Issued by Apex Valuation Associates (IBBI Reg. No. IBBI/RV/05/2021/14209)
                </p>
              </div>

              {/* Report Metadata + QR Verification Code */}
              <div className="flex items-start gap-4 self-end sm:self-auto">
                <div className="text-right flex flex-col gap-1">
                  <p className="font-mono text-mono-md text-primary">Ref: {report.code}</p>
                  <p className="font-body text-body-sm text-on-surface-variant tabular-nums">
                    Date: {report.date}
                  </p>
                  <p className="font-body text-body-sm text-on-surface-variant">
                    Purpose: {purposeInput}
                  </p>
                </div>
                {/* Crisp Vector QR Verification Code */}
                <div
                  className="p-1.5 border border-outline-variant rounded bg-surface-container-lowest shrink-0"
                  aria-label="QR Verification Code"
                >
                  <svg
                    className="w-16 h-16"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="4" y="4" width="18" height="18" stroke="#0F294A" strokeWidth="4" />
                    <rect x="10" y="10" width="6" height="6" fill="#0F294A" />
                    <rect x="42" y="4" width="18" height="18" stroke="#0F294A" strokeWidth="4" />
                    <rect x="48" y="10" width="6" height="6" fill="#0F294A" />
                    <rect x="4" y="42" width="18" height="18" stroke="#0F294A" strokeWidth="4" />
                    <rect x="10" y="48" width="6" height="6" fill="#0F294A" />
                    <rect x="28" y="6" width="4" height="8" fill="#0F294A" />
                    <rect x="28" y="20" width="8" height="4" fill="#2E8B57" />
                    <rect x="28" y="28" width="8" height="8" fill="#0F294A" />
                    <rect x="42" y="28" width="8" height="4" fill="#0F294A" />
                    <rect x="54" y="28" width="6" height="10" fill="#2E8B57" />
                    <rect x="28" y="42" width="10" height="6" fill="#0F294A" />
                    <rect x="44" y="44" width="6" height="14" fill="#0F294A" />
                    <rect x="54" y="50" width="6" height="8" fill="#0F294A" />
                  </svg>
                </div>
              </div>
            </header>

            {/* Section 1 & 2: Property Identification & GIS Boundary Snapshot */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-7 flex flex-col gap-3">
                <h2 className="font-headline text-title-md text-primary uppercase tracking-wider">
                  1. Property Identification
                </h2>
                <div className="border border-outline-variant rounded overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <tbody className="divide-y divide-outline-variant">
                      <tr>
                        <th
                          scope="row"
                          className="bg-surface-container-low px-3.5 py-2 font-label text-label-sm text-on-surface-variant w-36 sm:w-40"
                        >
                          Survey / Sub-Div No.
                        </th>
                        <td className="px-3.5 py-2 font-mono text-mono-md text-primary">
                          {report.surveyNo}
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="bg-surface-container-low px-3.5 py-2 font-label text-label-sm text-on-surface-variant"
                        >
                          Location
                        </th>
                        <td className="px-3.5 py-2 font-body text-body-sm text-on-surface">
                          {report.location}
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="bg-surface-container-low px-3.5 py-2 font-label text-label-sm text-on-surface-variant"
                        >
                          Classification
                        </th>
                        <td className="px-3.5 py-2 font-body text-body-sm text-on-surface">
                          {report.classification}
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="bg-surface-container-low px-3.5 py-2 font-label text-label-sm text-on-surface-variant"
                        >
                          Extent &amp; Dimensions
                        </th>
                        <td className="px-3.5 py-2 font-body text-body-sm text-on-surface tabular-nums">
                          {report.extent}
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="bg-surface-container-low px-3.5 py-2 font-label text-label-sm text-on-surface-variant"
                        >
                          Road Frontage
                        </th>
                        <td className="px-3.5 py-2 font-body text-body-sm text-on-surface">
                          {report.frontage}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col gap-3">
                <h2 className="font-headline text-title-md text-primary uppercase tracking-wider">
                  2. GIS Boundary Snapshot
                </h2>
                <div className="relative rounded border border-outline-variant overflow-hidden h-48 bg-surface-container-low">
                  {/* Vector cadastral parcel backdrop (always crisp in PDF export) */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 300 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect width="300" height="200" fill="#E8F0EB" />
                    <path d="M0 36 L300 26" stroke="#CBD5E1" strokeWidth="10" />
                    <path d="M0 168 L300 158" stroke="#CBD5E1" strokeWidth="6" />
                    <path d="M55 0 L62 200" stroke="#CBD5E1" strokeWidth="8" />
                    <path d="M248 0 L256 200" stroke="#CBD5E1" strokeWidth="6" />
                    <rect x="14" y="54" width="32" height="92" rx="2" fill="#DCE5DF" stroke="#CBD5E1" />
                    <rect x="256" y="48" width="34" height="96" rx="2" fill="#DCE5DF" stroke="#CBD5E1" />
                  </svg>

                  {!extMapFailed && (
                    <img
                      data-external-map-img="true"
                      crossOrigin="anonymous"
                      src="https://lh3.googleusercontent.com/aida/ALJJyrDSF0P8bpoPbvOBgoVJ-lEsen44fMQQqF3fS74M-TKAU9MicvGgpy5OZq1jR-Mgt3xmSsXV2D1Z-zMTkRaKsgrc4ExzPJKrEm-RoYoPiK7V_5h5e3D8oVLTswUBb0W5AW4ED-fHeDo8MhbtBLW5_0mQN2S83i132K6oijKEnY3IoQQL6BSPGQ__jsF6nw4Ub8_5O4QHBocdgI81hUO0a4SNQprhztp9WeZLrhjdqow8Ibr5X8bm_MTygZrvEx0"
                      alt={`GIS Boundary Snapshot for ${report.surveyNo}`}
                      onError={() => setExtMapFailed(true)}
                      className="relative w-full h-full object-cover"
                    />
                  )}

                  {/* Highlighted Parcel Polygon + Survey Label Overlay */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 300 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polygon
                      points="85,48 215,42 222,145 92,152"
                      fill="#2E8B57"
                      fillOpacity="0.32"
                      stroke="#2E8B57"
                      strokeWidth="2.5"
                    />
                    <rect x="108" y="88" width="90" height="22" rx="4" fill="#FFFFFF" fillOpacity="0.92" />
                    <text
                      x="153"
                      y="103"
                      textAnchor="middle"
                      fill="#0F294A"
                      fontFamily="Source Code Pro, monospace"
                      fontWeight="600"
                      fontSize="11"
                    >
                      {report.gisLabel}
                    </text>
                  </svg>
                </div>
              </div>
            </section>

            {/* Section 3: Comparable Sales Analysis (3 Nearby Plots) */}
            <section className="flex flex-col gap-3">
              <h2 className="font-headline text-title-md text-primary uppercase tracking-wider">
                3. Comparable Sales Analysis
              </h2>
              <div className="border border-outline-variant rounded overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container-low border-b border-outline-variant">
                    <tr>
                      <th scope="col" className="px-4 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                        Comparable Parcel
                      </th>
                      <th scope="col" className="px-4 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                        Distance
                      </th>
                      <th scope="col" className="px-4 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                        Extent
                      </th>
                      <th scope="col" className="px-4 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap">
                        Reg. Date
                      </th>
                      <th scope="col" className="px-4 py-2.5 font-label text-label-sm text-on-surface-variant text-right whitespace-nowrap">
                        Rate / Sq.ft
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {report.comparables.map((comp, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2.5 font-body text-body-sm text-on-surface whitespace-nowrap">
                          {comp.parcel}
                        </td>
                        <td className="px-4 py-2.5 font-body text-body-sm text-on-surface-variant tabular-nums whitespace-nowrap">
                          {comp.distance}
                        </td>
                        <td className="px-4 py-2.5 font-body text-body-sm text-on-surface-variant tabular-nums whitespace-nowrap">
                          {comp.extent}
                        </td>
                        <td className="px-4 py-2.5 font-body text-body-sm text-on-surface-variant tabular-nums whitespace-nowrap">
                          {comp.regDate}
                        </td>
                        <td className="px-4 py-2.5 font-label text-label-md text-primary text-right tabular-nums whitespace-nowrap">
                          {comp.rate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 4: Prominent Emerald Green Bordered Summary Box */}
            <section className="rounded-md border-2 border-secondary bg-secondary-container/60 p-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="font-label text-label-sm text-on-secondary-container uppercase">
                    Assessed Market Value
                  </p>
                  <p className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-bold text-primary tabular-nums mt-1">
                    {report.marketValue}
                  </p>
                  <p className="font-body text-body-sm text-on-surface-variant mt-0.5">
                    100% Fair Market Basis
                  </p>
                </div>
                <div className="md:border-l md:border-secondary/30 md:pl-6">
                  <p className="font-label text-label-sm text-on-secondary-container uppercase">
                    Realizable Value (90%)
                  </p>
                  <p className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-bold text-primary tabular-nums mt-1">
                    {report.realizableValue}
                  </p>
                  <p className="font-body text-body-sm text-on-surface-variant mt-0.5">
                    Standard 90-day liquidation
                  </p>
                </div>
                <div className="md:border-l md:border-secondary/30 md:pl-6">
                  <p className="font-label text-label-sm text-on-secondary-container uppercase">
                    Distress Sale Value (80%)
                  </p>
                  <p className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-bold text-primary tabular-nums mt-1">
                    {report.distressValue}
                  </p>
                  <p className="font-body text-body-sm text-on-surface-variant mt-0.5">
                    Forced auction benchmark
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Authorized Valuer Signature Blocks */}
            <footer className="pt-6 border-t border-outline-variant grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <div className="h-12 flex items-end pb-1 border-b border-outline-variant">
                  <span className="font-headline text-title-md text-primary italic">Arjun Mehta</span>
                </div>
                <p className="font-label text-label-md text-primary">Arjun Mehta, FIV</p>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Lead Registered Valuer • Reg. #CAT-I/4482
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-12 flex items-end pb-1 border-b border-outline-variant">
                  <span className="font-label text-label-sm text-tertiary flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-title-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                      aria-hidden="true"
                    >
                      verified
                    </span>
                    Digitally Countersigned via TrueArk PKI
                  </span>
                </div>
                <p className="font-label text-label-md text-primary">Apex Valuation Associates</p>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Authorized Signatory &amp; Corporate Seal
                </p>
              </div>
            </footer>
          </article>
        </main>
      </div>
    </div>
  );
}
