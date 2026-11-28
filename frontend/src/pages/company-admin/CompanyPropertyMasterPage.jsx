import React, { useState, useEffect } from 'react';
import CompanyAdminSidebar from '../../components/company-admin/CompanyAdminSidebar';
import SearchableSelect from '../../components/common/SearchableSelect';
import { getStoredProperties, saveStoredProperties } from '../../utils/propertyStore';
import { reverseGeocodeLocation, parseCoordinates, formatLat, formatLon } from '../../utils/geoUtils';

const statusFilterOptions = [
  { value: 'All Status', label: 'All Status' },
  { value: 'Verified', label: 'Verified' },
  { value: 'In Review', label: 'In Review' },
  { value: 'Draft', label: 'Draft' },
];

const typeFilterOptions = [
  { value: 'All Types', label: 'All Types' },
  { value: 'Residential Plot', label: 'Residential Plot' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Agricultural', label: 'Agricultural' },
  { value: 'Industrial', label: 'Industrial' },
  { value: 'Residential Building', label: 'Residential Building' },
];

export default function CompanyPropertyMasterPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [properties, setProperties] = useState(() => getStoredProperties());

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [geoNotice, setGeoNotice] = useState('');

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    property: '',
    owner: '',
    propertyType: 'Residential Plot',
    extentRaw: '',
    unit: 'Sq.ft',
    marketValueRaw: '',
    status: 'Verified',
    district: '',
    taluk: '',
    village: '',
    latitude: '',
    longitude: '',
    postalAddress: '',
    localBody: '',
    landmark: '',
  });

  useEffect(() => {
    document.title = 'Property Master — TrueArk';
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const filteredProperties = properties.filter((item) => {
    const query = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !query ||
      item.code.toLowerCase().includes(query) ||
      item.property.toLowerCase().includes(query) ||
      item.owner.toLowerCase().includes(query) ||
      item.propertyType.toLowerCase().includes(query) ||
      item.district.toLowerCase().includes(query) ||
      (item.latitude && item.latitude.toLowerCase().includes(query)) ||
      (item.longitude && item.longitude.toLowerCase().includes(query));

    const matchesStatus =
      statusFilter === 'All Status' || item.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesType =
      typeFilter === 'All Types' || item.propertyType.toLowerCase() === typeFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Verified':
      case 'Certified':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-label-sm">
            {status}
          </span>
        );
      case 'In Review':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-warning-container text-on-warning-container font-label text-label-sm">
            In Review
          </span>
        );
      case 'Draft':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-label text-label-sm">
            {status}
          </span>
        );
    }
  };

  const handleOpenAddModal = () => {
    setFormData({
      property: '',
      owner: '',
      propertyType: 'Residential Plot',
      extentRaw: '',
      unit: 'Sq.ft',
      marketValueRaw: '',
      status: 'Verified',
      district: '',
      taluk: '',
      village: '',
      latitude: '',
      longitude: '',
      postalAddress: '',
      localBody: '',
      landmark: '',
    });
    setGeoNotice('');
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (prop) => {
    setSelectedProperty(prop);
    setFormData({
      property: prop.property,
      owner: prop.owner,
      propertyType: prop.propertyType,
      extentRaw: prop.extentRaw || '',
      unit: prop.unit || 'Sq.ft',
      marketValueRaw: prop.marketValueRaw || '',
      status: prop.status,
      district: prop.district || '',
      taluk: prop.taluk || '',
      village: prop.village || '',
      latitude: prop.latitude || (prop.coordinates ? prop.coordinates.split(',')[0].trim() : ''),
      longitude: prop.longitude || (prop.coordinates ? prop.coordinates.split(',')[1]?.trim() : ''),
      postalAddress: prop.postalAddress || '',
      localBody: prop.localBody || '',
      landmark: prop.landmark || '',
    });
    setGeoNotice('');
    setIsEditModalOpen(true);
  };

  const handleOpenViewModal = (prop) => {
    setSelectedProperty(prop);
    setIsViewModalOpen(true);
  };

  // Trigger reverse geocoding from Latitude & Longitude
  const handleAutoFillFromCoordinates = async (latOverride, lonOverride) => {
    const latToUse = latOverride !== undefined ? latOverride : formData.latitude;
    const lonToUse = lonOverride !== undefined ? lonOverride : formData.longitude;

    if (!String(latToUse).trim() || !String(lonToUse).trim()) {
      setGeoNotice('Please enter both Latitude and Longitude first to autofill location.');
      return;
    }

    try {
      setIsGeoLoading(true);
      setGeoNotice('Resolving address from coordinates...');
      const resolved = await reverseGeocodeLocation(latToUse, lonToUse);

      if (resolved) {
        setFormData((prev) => ({
          ...prev,
          district: resolved.district || prev.district,
          taluk: resolved.taluk || prev.taluk,
          village: resolved.village || prev.village,
          postalAddress: resolved.postalAddress || prev.postalAddress,
          localBody: resolved.localBody || prev.localBody,
          latitude: resolved.latitudeFormatted || prev.latitude,
          longitude: resolved.longitudeFormatted || prev.longitude,
          landmark: prev.landmark || `Near ${resolved.village} Main Road`,
        }));
        setGeoNotice(`Autofilled from coordinates via ${resolved.source || 'Geo Resolver'}!`);
      } else {
        setGeoNotice('Coordinates resolved. You can refine the address details below.');
      }
    } catch (err) {
      setGeoNotice('Could not reach remote reverse-geocoding service. Default location applied.');
    } finally {
      setIsGeoLoading(false);
    }
  };

  const handleSaveNewProperty = (e) => {
    e.preventDefault();
    if (!formData.property.trim()) {
      alert('Property / Survey No. is required.');
      return;
    }
    if (!formData.owner.trim()) {
      alert('Owner / Title Holder Name is required.');
      return;
    }
    if (!String(formData.latitude).trim() || !String(formData.longitude).trim()) {
      alert('Latitude and Longitude are mandatory for registering property coordinates.');
      return;
    }

    const nextNum = properties.length + 90;
    const newCode = `#PR-2026-0${nextNum}`;
    const formattedExtent = formData.extentRaw
      ? `${Number(formData.extentRaw).toLocaleString('en-IN')} ${formData.unit}`
      : `4,000 ${formData.unit}`;
    const formattedValue = formData.marketValueRaw
      ? `₹${Number(formData.marketValueRaw).toLocaleString('en-IN')}`
      : '₹1,50,00,000';

    const cleanLat = formData.latitude.includes('°')
      ? formData.latitude
      : formatLat(parseCoordinates(formData.latitude, null).lat);
    const cleanLon = formData.longitude.includes('°')
      ? formData.longitude
      : formatLon(parseCoordinates(null, formData.longitude).lon);

    const newProp = {
      id: `PR-2026-0${nextNum}`,
      code: newCode,
      property: formData.property,
      owner: formData.owner,
      propertyType: formData.propertyType,
      extent: formattedExtent,
      extentRaw: Number(formData.extentRaw) || 0,
      unit: formData.unit,
      marketValue: formattedValue,
      marketValueRaw: Number(formData.marketValueRaw) || 0,
      status: formData.status,
      district: formData.district || 'Chengalpattu',
      taluk: formData.taluk || 'Thiruporur',
      village: formData.village || 'Kelambakkam',
      latitude: cleanLat || formData.latitude,
      longitude: cleanLon || formData.longitude,
      coordinates: `${cleanLat || formData.latitude}, ${cleanLon || formData.longitude}`,
      postalAddress: formData.postalAddress || `${formData.property}, ${formData.village || 'Kelambakkam'}, ${formData.district || 'Chengalpattu'}`,
      localBody: formData.localBody || `${formData.village || 'Town'} Panchayat`,
      landmark: formData.landmark || 'Main Road Junction',
      createdDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };

    const updated = [newProp, ...properties];
    setProperties(updated);
    saveStoredProperties(updated);
    setIsAddModalOpen(false);
    showToast(`Property ${newCode} successfully created with coordinates!`);
  };

  const handleUpdateProperty = (e) => {
    e.preventDefault();
    if (!selectedProperty) return;

    if (!String(formData.latitude).trim() || !String(formData.longitude).trim()) {
      alert('Latitude and Longitude are mandatory.');
      return;
    }

    const formattedExtent = formData.extentRaw
      ? `${Number(formData.extentRaw).toLocaleString('en-IN')} ${formData.unit}`
      : selectedProperty.extent;
    const formattedValue = formData.marketValueRaw
      ? `₹${Number(formData.marketValueRaw).toLocaleString('en-IN')}`
      : selectedProperty.marketValue;

    const cleanLat = formData.latitude.includes('°')
      ? formData.latitude
      : formatLat(parseCoordinates(formData.latitude, null).lat);
    const cleanLon = formData.longitude.includes('°')
      ? formData.longitude
      : formatLon(parseCoordinates(null, formData.longitude).lon);

    const updated = properties.map((p) => {
      if (p.id === selectedProperty.id) {
        return {
          ...p,
          property: formData.property,
          owner: formData.owner,
          propertyType: formData.propertyType,
          extent: formattedExtent,
          extentRaw: Number(formData.extentRaw) || p.extentRaw,
          unit: formData.unit,
          marketValue: formattedValue,
          marketValueRaw: Number(formData.marketValueRaw) || p.marketValueRaw,
          status: formData.status,
          district: formData.district,
          taluk: formData.taluk,
          village: formData.village,
          latitude: cleanLat || formData.latitude,
          longitude: cleanLon || formData.longitude,
          coordinates: `${cleanLat || formData.latitude}, ${cleanLon || formData.longitude}`,
          postalAddress: formData.postalAddress,
          localBody: formData.localBody,
          landmark: formData.landmark,
        };
      }
      return p;
    });

    setProperties(updated);
    saveStoredProperties(updated);
    setIsEditModalOpen(false);
    showToast(`Property ${selectedProperty.code} updated successfully!`);
  };

  return (
    <div className="h-screen flex bg-surface text-on-surface font-body antialiased overflow-hidden relative">
      {/* Left Sidebar (Company Admin Portal) */}
      <CompanyAdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Workspace */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto overflow-x-hidden">
        {/* Top Action Bar (Exact Styling as Valuation Page) */}
        <header className="bg-surface-container-lowest border-b border-outline-variant px-3 sm:px-5 lg:px-6 py-3.5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 shrink-0">
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSidebarOpen((prev) => !prev)}
                className="lg:hidden inline-flex items-center justify-center w-8 h-8 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors duration-state-change shrink-0 cursor-pointer"
                aria-label="Open sidebar menu"
              >
                <span className="material-symbols-outlined text-[20px]">menu</span>
              </button>
              <h1 className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-primary">
                Property Master
              </h1>
            </div>
            <p className="font-body text-body-sm text-on-surface-variant pl-10 lg:pl-0">
              Manage registered property assets, cadastral survey numbers, and GPS coordinates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 w-full lg:w-auto shrink-0">
            {/* Quick-search input */}
            <div className="relative w-full sm:w-56 xl:w-64">
              <span
                aria-hidden="true"
                className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-title-md select-none"
              >
                search
              </span>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Property, Survey No., or Lat/Long..."
                className="w-full rounded border border-outline-variant bg-surface pl-9 pr-3 py-2 font-body text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
              {/* Searchable Status Filter Dropdown */}
              <div className="w-32 shrink-0">
                <SearchableSelect
                  value={statusFilter}
                  onChange={(val) => setStatusFilter(val)}
                  options={statusFilterOptions}
                  placeholder="All Status"
                  searchPlaceholder="Search status..."
                  ariaLabel="Filter by Status"
                />
              </div>

              {/* Searchable Type Filter Dropdown */}
              <div className="w-36 shrink-0 hidden md:block">
                <SearchableSelect
                  value={typeFilter}
                  onChange={(val) => setTypeFilter(val)}
                  options={typeFilterOptions}
                  placeholder="All Types"
                  searchPlaceholder="Search type..."
                  ariaLabel="Filter by Property Type"
                />
              </div>

              {/* Prominent Emerald Green + Add New Property Button */}
              <button
                type="button"
                onClick={handleOpenAddModal}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded bg-tertiary text-on-tertiary font-label text-label-md hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 transition-colors duration-state-change whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-title-sm" aria-hidden="true">
                  add
                </span>
                <span>Add New Property</span>
              </button>
            </div>
          </div>
        </header>

        {/* Toast Feedback */}
        {toastMessage && (
          <div className="fixed top-4 right-4 z-50 bg-secondary text-on-secondary px-4 py-2.5 rounded shadow-lg text-[13px] font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top duration-200">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{toastMessage}</span>
          </div>
        )}

        <main className="p-3 sm:p-4 flex-1 flex flex-col gap-3 min-w-0">
          {/* Properties Table Card */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm overflow-hidden">
            <div className="px-3.5 sm:px-4 py-3 border-b border-outline-variant flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-headline text-headline-sm text-primary">All Registered Properties</h2>
              <span className="font-body text-body-sm text-on-surface-variant tabular-nums">
                Showing {filteredProperties.length} of {properties.length} properties
              </span>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[880px] table-fixed text-left border-collapse">
                <colgroup>
                  <col className="w-[12%]" />
                  <col className="w-[20%]" />
                  <col className="w-[15%]" />
                  <col className="w-[12%]" />
                  <col className="w-[10%]" />
                  <col className="w-[11%]" />
                  <col className="w-[12%]" />
                  <col className="w-[8%]" />
                </colgroup>
                <thead className="bg-surface-container-low border-b border-outline-variant">
                  <tr>
                    <th scope="col" className="px-2 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap truncate">
                      Property ID
                    </th>
                    <th scope="col" className="px-2 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap truncate">
                      Property / Survey No.
                    </th>
                    <th scope="col" className="px-2 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap truncate">
                      Owner / Title Holder
                    </th>
                    <th scope="col" className="px-2 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap truncate">
                      Property Type
                    </th>
                    <th scope="col" className="px-2 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap truncate">
                      Extent
                    </th>
                    <th scope="col" className="px-2 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap truncate">
                      Market Value
                    </th>
                    <th scope="col" className="px-2 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant whitespace-nowrap truncate">
                      GPS Coordinates
                    </th>
                    <th scope="col" className="px-2 xl:px-3 py-2.5 font-label text-label-sm text-on-surface-variant text-right whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {filteredProperties.length > 0 ? (
                    filteredProperties.map((item) => (
                      <tr key={item.id} className="hover:bg-surface-container-low/50 transition-colors duration-state-change">
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 font-mono text-[11px] xl:text-[12px] text-primary whitespace-nowrap truncate" title={item.code}>
                          {item.code}
                        </td>
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 font-body text-body-sm text-on-surface truncate" title={item.property}>
                          <span className="font-medium text-primary block truncate">{item.property}</span>
                          <span className="text-[11px] text-on-surface-variant truncate block">{item.village}, {item.district}</span>
                        </td>
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 font-body text-body-sm text-on-surface-variant truncate" title={item.owner}>
                          {item.owner}
                        </td>
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 font-body text-body-sm text-on-surface-variant truncate" title={item.propertyType}>
                          {item.propertyType}
                        </td>
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 font-body text-body-sm text-on-surface tabular-nums whitespace-nowrap truncate" title={item.extent}>
                          {item.extent}
                        </td>
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 font-label text-[12px] text-primary tabular-nums whitespace-nowrap truncate" title={item.marketValue}>
                          {item.marketValue}
                        </td>
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 font-mono text-[11px] text-slate-700 whitespace-nowrap truncate" title={item.coordinates || `${item.latitude}, ${item.longitude}`}>
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-secondary">explore</span>
                            <span>{item.latitude || item.coordinates?.split(',')[0]}</span>
                          </div>
                          <span className="text-[10px] text-gray-500 block pl-4.5">{item.longitude || item.coordinates?.split(',')[1]}</span>
                        </td>
                        <td className="px-2 xl:px-3 py-2.5 sm:py-3 text-right whitespace-nowrap">
                          <div className="inline-flex items-center justify-end gap-2 xl:gap-2.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(item)}
                              className="font-label text-label-sm text-primary hover:underline cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenViewModal(item)}
                              className="font-label text-label-sm text-tertiary hover:underline cursor-pointer"
                            >
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-5 py-8 text-center font-body text-body-md text-outline">
                        No property records match your current search and filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {/* =========================================================================
          MODAL: ADD NEW PROPERTY RECORD (WITH MANDATORY LATITUDE & LONGITUDE)
         ========================================================================= */}
      {isAddModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div
            className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-outline-variant flex items-center justify-between gap-3 bg-surface-container-lowest shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded bg-primary-container text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-title-md">home_work</span>
                </span>
                <div>
                  <h3 className="font-headline text-[16px] sm:text-[17px] font-semibold text-primary leading-tight">
                    Add New Property Record
                  </h3>
                  <p className="font-body text-body-sm text-on-surface-variant mt-0.5">
                    Enter mandatory GPS coordinates to autofill postal address, revenue district, and taluk
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors flex items-center justify-center shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveNewProperty} className="flex-1 overflow-y-auto p-5 space-y-4 text-[13px]">
              {/* GPS Coordinates Header Card (Mandatory Lat & Long with Autofill) */}
              <div className="p-3.5 rounded-lg border border-primary/30 bg-primary-container/15 flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 text-primary font-semibold text-[13px]">
                    <span className="material-symbols-outlined text-[19px]">explore</span>
                    <span>GPS Coordinates (Mandatory) &amp; Auto-Fill</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAutoFillFromCoordinates()}
                    disabled={isGeoLoading}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-primary text-white text-[12px] font-semibold hover:bg-primary/90 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    <span className={`material-symbols-outlined text-[16px] ${isGeoLoading ? 'animate-spin' : ''}`}>
                      {isGeoLoading ? 'sync' : 'auto_fix_high'}
                    </span>
                    <span>{isGeoLoading ? 'Resolving...' : 'Auto-fill Location from Lat/Long'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Latitude * */}
                  <div>
                    <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                      Latitude <span className="text-red-600 font-bold">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. 12.7894° N or 12.7894"
                        value={formData.latitude}
                        onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                        onBlur={() => {
                          if (formData.latitude && formData.longitude && !formData.district) {
                            handleAutoFillFromCoordinates();
                          }
                        }}
                        className="w-full rounded border border-outline-variant bg-surface pl-3 pr-8 py-2 font-mono text-[13px] text-primary focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[12px] font-mono">
                        LAT
                      </span>
                    </div>
                  </div>

                  {/* Longitude * */}
                  <div>
                    <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                      Longitude <span className="text-red-600 font-bold">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. 80.2215° E or 80.2215"
                        value={formData.longitude}
                        onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                        onBlur={() => {
                          if (formData.latitude && formData.longitude && !formData.district) {
                            handleAutoFillFromCoordinates();
                          }
                        }}
                        className="w-full rounded border border-outline-variant bg-surface pl-3 pr-8 py-2 font-mono text-[13px] text-primary focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[12px] font-mono">
                        LON
                      </span>
                    </div>
                  </div>
                </div>

                {geoNotice && (
                  <p className="text-[12px] font-medium text-primary flex items-center gap-1.5 animate-in fade-in">
                    <span className="material-symbols-outlined text-[16px]">info</span>
                    <span>{geoNotice}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Property / Survey No. */}
                <div className="sm:col-span-2">
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    Property / Survey No. <span className="text-red-600 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kelambakkam, S.No 142/3B (Plot No. 14)"
                    value={formData.property}
                    onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                    className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                {/* Owner / Title Holder */}
                <div>
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    Owner / Title Holder <span className="text-red-600 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Raghavan Nair"
                    value={formData.owner}
                    onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                    className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                {/* Property Type */}
                <div>
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    Property Type
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer"
                  >
                    <option value="Residential Plot">Residential Plot</option>
                    <option value="Residential Building">Residential Building</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Agricultural">Agricultural</option>
                  </select>
                </div>

                {/* Postal Address of Property (Auto-filled by Lat/Long) */}
                <div className="sm:col-span-2">
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    Postal Address of Property <span className="text-gray-400 font-normal">(Autofilled from Lat &amp; Long)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Plot No. 14, Sri Sai Nagar Main Road, Kelambakkam, Chengalpattu — 603103"
                    value={formData.postalAddress}
                    onChange={(e) => setFormData({ ...formData, postalAddress: e.target.value })}
                    className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                {/* District (Autofilled) */}
                <div>
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    District <span className="text-gray-400 font-normal">(Autofilled)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chengalpattu"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                {/* Taluk / Village (Autofilled) */}
                <div>
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    Taluk
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Thiruporur"
                    value={formData.taluk}
                    onChange={(e) => setFormData({ ...formData, taluk: e.target.value })}
                    className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                {/* Village */}
                <div>
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    Village
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kelambakkam"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                {/* Local Body Jurisdiction */}
                <div>
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    Local Body Jurisdiction
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kelambakkam Town Panchayat"
                    value={formData.localBody}
                    onChange={(e) => setFormData({ ...formData, localBody: e.target.value })}
                    className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                {/* Extent & Unit */}
                <div>
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    Extent Area
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="any"
                      placeholder="e.g. 4800"
                      value={formData.extentRaw}
                      onChange={(e) => setFormData({ ...formData, extentRaw: e.target.value })}
                      className="flex-1 rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                    <select
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="w-24 rounded border border-outline-variant bg-surface px-2 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer"
                    >
                      <option value="Sq.ft">Sq.ft</option>
                      <option value="Acres">Acres</option>
                      <option value="Cent">Cent</option>
                      <option value="Sq.yd">Sq.yd</option>
                    </select>
                  </div>
                </div>

                {/* Estimated Market / Guideline Value */}
                <div>
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    Estimated / Market Value (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 14850000"
                    value={formData.marketValueRaw}
                    onChange={(e) => setFormData({ ...formData, marketValueRaw: e.target.value })}
                    className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    Verification Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer"
                  >
                    <option value="Verified">Verified</option>
                    <option value="In Review">In Review</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                {/* Landmark */}
                <div className="sm:col-span-2">
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    Landmark &amp; Connectivity Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Adjacent to OMR road, 30 ft black top municipal road"
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-outline-variant flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded border border-outline-variant bg-surface text-primary font-label text-label-sm hover:bg-surface-container-low transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-tertiary text-on-tertiary font-label text-label-sm hover:opacity-95 font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  Save Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: EDIT PROPERTY (WITH MANDATORY LATITUDE & LONGITUDE)
         ========================================================================= */}
      {isEditModalOpen && selectedProperty && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div
            className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-outline-variant flex items-center justify-between gap-3 bg-surface-container-lowest shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded bg-primary-container text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-title-md">edit_location_alt</span>
                </span>
                <div>
                  <h3 className="font-headline text-[16px] sm:text-[17px] font-semibold text-primary leading-tight">
                    Edit Property Record — {selectedProperty.code}
                  </h3>
                  <p className="font-body text-body-sm text-on-surface-variant mt-0.5">
                    Update property identification, measurements, and GPS coordinates
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors flex items-center justify-center shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleUpdateProperty} className="flex-1 overflow-y-auto p-5 space-y-4 text-[13px]">
              {/* GPS Coordinates Header Card */}
              <div className="p-3.5 rounded-lg border border-primary/30 bg-primary-container/15 flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 text-primary font-semibold text-[13px]">
                    <span className="material-symbols-outlined text-[19px]">explore</span>
                    <span>GPS Coordinates (Mandatory) &amp; Auto-Fill</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAutoFillFromCoordinates()}
                    disabled={isGeoLoading}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-primary text-white text-[12px] font-semibold hover:bg-primary/90 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    <span className={`material-symbols-outlined text-[16px] ${isGeoLoading ? 'animate-spin' : ''}`}>
                      {isGeoLoading ? 'sync' : 'auto_fix_high'}
                    </span>
                    <span>{isGeoLoading ? 'Resolving...' : 'Auto-fill Location from Lat/Long'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                      Latitude <span className="text-red-600 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 12.7894° N"
                      value={formData.latitude}
                      onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                      className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-mono text-[13px] text-primary focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                      Longitude <span className="text-red-600 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 80.2215° E"
                      value={formData.longitude}
                      onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                      className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-mono text-[13px] text-primary focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                {geoNotice && (
                  <p className="text-[12px] font-medium text-primary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">info</span>
                    <span>{geoNotice}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    Property / Survey No. <span className="text-red-600 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.property}
                    onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                    className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    Owner / Title Holder <span className="text-red-600 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.owner}
                    onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                    className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    Property Type
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer"
                  >
                    <option value="Residential Plot">Residential Plot</option>
                    <option value="Residential Building">Residential Building</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Agricultural">Agricultural</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    Postal Address of Property
                  </label>
                  <input
                    type="text"
                    value={formData.postalAddress}
                    onChange={(e) => setFormData({ ...formData, postalAddress: e.target.value })}
                    className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    District
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    Taluk
                  </label>
                  <input
                    type="text"
                    value={formData.taluk}
                    onChange={(e) => setFormData({ ...formData, taluk: e.target.value })}
                    className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    Village
                  </label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    Local Body Jurisdiction
                  </label>
                  <input
                    type="text"
                    value={formData.localBody}
                    onChange={(e) => setFormData({ ...formData, localBody: e.target.value })}
                    className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    Extent Area
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="any"
                      value={formData.extentRaw}
                      onChange={(e) => setFormData({ ...formData, extentRaw: e.target.value })}
                      className="flex-1 rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    />
                    <select
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="w-24 rounded border border-outline-variant bg-surface px-2 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer"
                    >
                      <option value="Sq.ft">Sq.ft</option>
                      <option value="Acres">Acres</option>
                      <option value="Cent">Cent</option>
                      <option value="Sq.yd">Sq.yd</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    Estimated / Market Value (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.marketValueRaw}
                    onChange={(e) => setFormData({ ...formData, marketValueRaw: e.target.value })}
                    className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    Verification Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer"
                  >
                    <option value="Verified">Verified</option>
                    <option value="In Review">In Review</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-label text-label-sm text-on-surface font-semibold mb-1">
                    Landmark &amp; Notes
                  </label>
                  <input
                    type="text"
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    className="w-full rounded border border-outline-variant bg-surface px-3 py-2 font-body text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-outline-variant flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded border border-outline-variant bg-surface text-primary font-label text-label-sm hover:bg-surface-container-low transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-primary text-on-primary font-label text-label-sm hover:opacity-95 font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  Update Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: VIEW PROPERTY DETAILS
         ========================================================================= */}
      {isViewModalOpen && selectedProperty && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div
            className="w-full max-w-lg bg-surface-container-lowest border border-outline-variant rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-outline-variant flex items-center justify-between gap-3 bg-surface-container-lowest shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded bg-secondary-container text-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-title-md">description</span>
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline text-[16px] sm:text-[17px] font-semibold text-primary leading-tight">
                      {selectedProperty.code}
                    </h3>
                    {getStatusBadge(selectedProperty.status)}
                  </div>
                  <p className="font-body text-body-sm text-on-surface-variant mt-0.5">
                    Property Record Specifications
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsViewModalOpen(false)}
                className="w-8 h-8 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors flex items-center justify-center shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-5 overflow-y-auto space-y-3.5 text-[13px]">
              <div className="p-3 rounded bg-surface-container-low border border-outline-variant flex flex-col gap-1.5">
                <span className="text-on-surface-variant text-[11px] font-medium uppercase tracking-wider">
                  Property Description &amp; Title
                </span>
                <span className="font-bold text-[14px] text-primary">{selectedProperty.property}</span>
                <span className="text-on-surface-variant">Owner: <strong className="text-on-surface">{selectedProperty.owner}</strong></span>
              </div>

              {/* Geo-Coordinates Box */}
              <div className="p-3 rounded border border-primary/30 bg-primary-container/20 flex items-center justify-between gap-2">
                <div>
                  <span className="block text-[11px] font-semibold text-primary uppercase">Mandatory GPS Coordinates</span>
                  <span className="font-mono text-[13px] font-bold text-primary">
                    Lat: {selectedProperty.latitude || selectedProperty.coordinates?.split(',')[0]} &nbsp;|&nbsp; Lon: {selectedProperty.longitude || selectedProperty.coordinates?.split(',')[1]}
                  </span>
                </div>
                <span className="material-symbols-outlined text-primary text-[24px]">pin_drop</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded border border-outline-variant bg-surface">
                  <span className="block text-[11px] text-on-surface-variant font-medium">Property Type</span>
                  <span className="font-semibold text-primary">{selectedProperty.propertyType}</span>
                </div>
                <div className="p-2.5 rounded border border-outline-variant bg-surface">
                  <span className="block text-[11px] text-on-surface-variant font-medium">Extent Area</span>
                  <span className="font-semibold text-primary tabular-nums">{selectedProperty.extent}</span>
                </div>
                <div className="p-2.5 rounded border border-outline-variant bg-surface">
                  <span className="block text-[11px] text-on-surface-variant font-medium">Assessed Market Value</span>
                  <span className="font-bold text-on-secondary-container tabular-nums">{selectedProperty.marketValue}</span>
                </div>
                <div className="p-2.5 rounded border border-outline-variant bg-surface">
                  <span className="block text-[11px] text-on-surface-variant font-medium">Jurisdiction District</span>
                  <span className="font-semibold text-primary">{selectedProperty.district || 'Chengalpattu'}</span>
                </div>
              </div>

              <div className="space-y-2 border-t border-outline-variant pt-3 text-[12.5px]">
                <div className="flex justify-between py-1 border-b border-outline-variant/40">
                  <span className="text-on-surface-variant">Postal Address:</span>
                  <span className="font-medium text-on-surface text-right max-w-[280px]">{selectedProperty.postalAddress || selectedProperty.property}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-outline-variant/40">
                  <span className="text-on-surface-variant">Taluk / Village:</span>
                  <span className="font-medium text-on-surface">{selectedProperty.taluk || 'Thiruporur'} / {selectedProperty.village || 'Kelambakkam'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-outline-variant/40">
                  <span className="text-on-surface-variant">Local Body:</span>
                  <span className="font-medium text-on-surface">{selectedProperty.localBody || 'Town Panchayat'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-outline-variant/40">
                  <span className="text-on-surface-variant">Landmark:</span>
                  <span className="text-on-surface text-right max-w-[240px] truncate">{selectedProperty.landmark || 'Main Road'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-on-surface-variant">Registration Date:</span>
                  <span className="font-medium text-on-surface">{selectedProperty.createdDate}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-outline-variant bg-surface-container-low/50 flex items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleOpenEditModal(selectedProperty);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-outline-variant bg-surface text-primary font-label text-label-sm hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">edit</span>
                <span>Edit Property</span>
              </button>

              <button
                type="button"
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-1.5 rounded bg-primary text-on-primary font-label text-label-sm hover:opacity-95 transition-colors cursor-pointer font-semibold shadow-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
