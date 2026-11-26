import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CompanyAdminSidebar from '../../components/company-admin/CompanyAdminSidebar';
import SearchableSelect from '../../components/common/SearchableSelect';

const roleOptions = [
  { value: 'Lead Certified Valuer', label: 'Lead Certified Valuer', subtitle: 'Full valuation & sign-off authority' },
  { value: 'Org Admin', label: 'Org Admin', subtitle: 'Organization & user administration' },
  { value: 'Senior Valuer', label: 'Senior Valuer', subtitle: 'Advanced property valuation & review' },
  { value: 'Field Valuer', label: 'Field Valuer', subtitle: 'On-site inspection & field data capture' },
  { value: 'Reviewer', label: 'Reviewer', subtitle: 'Report quality audit & verification' },
  { value: 'Viewer', label: 'Viewer', subtitle: 'Read-only report & dashboard access' },
];

const branchOptions = [
  { value: 'Chennai — Head Office', label: 'Chennai — Head Office', subtitle: 'Primary Regional HQ' },
  { value: 'Bengaluru — South', label: 'Bengaluru — South', subtitle: 'South Tech Corridor' },
  { value: 'Coimbatore', label: 'Coimbatore', subtitle: 'West Tamil Nadu Branch' },
  { value: 'Hyderabad', label: 'Hyderabad', subtitle: 'Telangana & AP Operations' },
];

export default function AddNewUserPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auto-generated Employee Code / User ID
  const [userId] = useState('USR-006');

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Lead Certified Valuer');
  const [primaryBranch, setPrimaryBranch] = useState('Chennai — Head Office');
  const [temporaryPassword, setTemporaryPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isActive, setIsActive] = useState(true);

  // Photo State
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFileName, setAvatarFileName] = useState('');

  // Banner Feedback State
  const [bannerVisible, setBannerVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Add New User — TrueArk';
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setAvatarFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatarPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setAvatarPreview(null);
    setAvatarFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBannerVisible(true);

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Simulate saving and then redirect to User Master
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/company-admin/masters/user');
    }, 1500);
  };

  return (
    <div className="h-screen flex bg-surface text-on-surface font-body antialiased overflow-hidden relative">
      {/* Left Navigation Sidebar (Company Admin Portal Only) */}
      <CompanyAdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Column */}
      <div
        ref={scrollContainerRef}
        className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto overflow-x-hidden"
      >
        {/* Top Contextual Header (matching compact spacing of Company & Plan Master) */}
        <header className="bg-surface-container-lowest border-b border-outline-variant px-3 sm:px-4 lg:px-5 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex flex-col gap-1 min-w-0">
            <Link
              to="/company-admin/masters/user"
              className="inline-flex items-center gap-1.5 font-label text-label-sm text-tertiary hover:underline w-fit"
            >
              <span className="material-symbols-outlined text-title-sm" aria-hidden="true">
                arrow_back
              </span>
              <span>Back to User Master</span>
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSidebarOpen((prev) => !prev)}
                className="lg:hidden inline-flex items-center justify-center w-8 h-8 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors duration-state-change shrink-0"
                aria-label="Open sidebar menu"
              >
                <span className="material-symbols-outlined text-[20px]">menu</span>
              </button>
              <h1 className="font-headline text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-primary">
                Add New User
              </h1>
            </div>
            <p className="font-body text-body-sm text-on-surface-variant pl-10 lg:pl-0">
              Create a platform user account, assign organization role, and configure portal access
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end shrink-0">
            <Link
              to="/company-admin/masters/user"
              className="flex-1 sm:flex-none px-4 py-2 rounded bg-surface-container-lowest border border-outline-variant text-primary font-label text-label-md hover:bg-surface-container-low transition-colors duration-state-change whitespace-nowrap text-center"
            >
              <span>Cancel</span>
            </Link>

            <button
              type="submit"
              form="add-user-form"
              disabled={isSubmitting}
              className="flex-1 sm:flex-none px-5 py-2 rounded bg-primary text-on-primary font-label text-label-md hover:opacity-95 transition-colors duration-state-change whitespace-nowrap text-center disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save User</span>
              )}
            </button>
          </div>
        </header>

        {/* Main Workspace (same gap size as Company Master & Plan Master) */}
        <main className="p-3 sm:p-4 flex-1 flex flex-col gap-3 min-w-0">
          <form id="add-user-form" className="max-w-4xl flex flex-col gap-3" onSubmit={handleSubmit}>
            {/* Save Feedback Banner */}
            {bannerVisible && (
              <div
                role="status"
                aria-live="polite"
                className="flex items-center justify-between gap-3 px-4 py-3 rounded bg-secondary-container border border-secondary/20 text-on-secondary-container transition-all duration-surface-enter"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-title-md text-secondary shrink-0" aria-hidden="true">
                    check_circle
                  </span>
                  <span className="font-label text-label-md truncate">
                    User account created and invitation sent successfully.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setBannerVisible(false)}
                  className="font-label text-label-sm text-on-secondary-container hover:underline shrink-0"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* 1. User Identity Section */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm p-4 sm:p-5 flex flex-col gap-3.5">
              <div className="pb-2.5 border-b border-outline-variant flex items-center justify-between gap-2">
                <div>
                  <h2 className="font-headline text-headline-sm text-primary">User Identity</h2>
                  <p className="font-body text-body-sm text-on-surface-variant">
                    Profile photo, unique user identifier, display name, and primary contact details
                  </p>
                </div>
              </div>

              {/* Profile Photo */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label text-label-sm text-on-surface">Profile Photo</span>
                <div className="flex flex-wrap items-center gap-4">
                  {/* Avatar Preview */}
                  <div
                    className="w-14 h-14 rounded-full bg-primary-container text-primary border border-outline-variant flex items-center justify-center shrink-0 overflow-hidden shadow-inner"
                    aria-label="User profile photo preview"
                  >
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-headline-md" aria-hidden="true">
                        person
                      </span>
                    )}
                  </div>

                  {/* Upload Box */}
                  <div className="flex-1 min-w-[260px] border border-dashed border-outline-variant rounded bg-surface px-4 py-2.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="material-symbols-outlined text-secondary text-title-md shrink-0" aria-hidden="true">
                        cloud_upload
                      </span>
                      <span className="font-body text-body-sm text-on-surface-variant truncate">
                        {avatarFileName || 'Upload JPG, PNG, or WEBP (max 2MB)'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {avatarPreview && (
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="font-label text-label-sm text-error hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      )}
                      <label
                        htmlFor="profile-photo-input"
                        className="font-label text-label-sm text-primary hover:underline cursor-pointer whitespace-nowrap"
                      >
                        Browse Photo
                      </label>
                      <input
                        ref={fileInputRef}
                        id="profile-photo-input"
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handlePhotoChange}
                        className="sr-only"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Auto-Generated User ID & Full Name */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
                <label className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-label text-label-sm text-on-surface">Employee Code / User ID</span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-[10px] font-semibold tracking-wide uppercase">
                      <span className="material-symbols-outlined text-[11px]" aria-hidden="true">
                        auto_awesome
                      </span>
                      Auto-generated
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={userId}
                      readOnly
                      title="Employee Code is automatically generated by the system"
                      className="w-full rounded border border-outline-variant bg-surface-container-low px-3 py-2 font-mono text-[13px] text-primary cursor-not-allowed select-all font-semibold focus:outline-none"
                    />
                    <span
                      className="material-symbols-outlined text-outline text-[16px] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none select-none"
                      aria-hidden="true"
                    >
                      lock
                    </span>
                  </div>
                  <p className="font-body text-[11px] text-on-surface-variant">
                    System-assigned sequential identifier
                  </p>
                </label>

                <label className="flex flex-col gap-1.5 md:col-span-2">
                  <div className="flex items-center gap-1">
                    <span className="font-label text-label-sm text-on-surface">Full Name</span>
                    <span className="text-error font-body text-body-sm">*</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Siddharth Menon"
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  />
                </label>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                <label className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1">
                    <span className="font-label text-label-sm text-on-surface">Email Address</span>
                    <span className="text-error font-body text-body-sm">*</span>
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="siddharth.m@apexvaluations.in"
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="font-label text-label-sm text-on-surface">Phone Number</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98401 44210"
                    className="rounded border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body text-body-md text-on-surface tabular-nums placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  />
                </label>
              </div>
            </section>

            {/* 2. Role & Branch Assignment */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm p-4 sm:p-5 flex flex-col gap-3.5">
              <div className="pb-2.5 border-b border-outline-variant">
                <h2 className="font-headline text-headline-sm text-primary">Role &amp; Branch Assignment</h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Assign operational permissions and primary office branch
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1">
                    <span className="font-label text-label-sm text-on-surface">Role</span>
                    <span className="text-error font-body text-body-sm">*</span>
                  </div>
                  <SearchableSelect
                    value={role}
                    onChange={(val) => setRole(val)}
                    options={roleOptions}
                    placeholder="Select Role"
                    searchPlaceholder="Search role..."
                    ariaLabel="Select Role"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1">
                    <span className="font-label text-label-sm text-on-surface">Primary Branch</span>
                    <span className="text-error font-body text-body-sm">*</span>
                  </div>
                  <SearchableSelect
                    value={primaryBranch}
                    onChange={(val) => setPrimaryBranch(val)}
                    options={branchOptions}
                    placeholder="Select Branch"
                    searchPlaceholder="Search branch..."
                    ariaLabel="Select Branch"
                  />
                </div>
              </div>
            </section>

            {/* 3. Credentials & Status */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-md shadow-sm p-4 sm:p-5 flex flex-col gap-3.5">
              <div className="pb-2.5 border-b border-outline-variant">
                <h2 className="font-headline text-headline-sm text-primary">Credentials</h2>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Initial password and login access status
                </p>
              </div>

              <label className="flex flex-col gap-1.5 max-w-md">
                <span className="font-label text-label-sm text-on-surface">Temporary Password (Optional)</span>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={temporaryPassword}
                    onChange={(e) => setTemporaryPassword(e.target.value)}
                    placeholder="Auto-generated if left blank"
                    className="w-full rounded border border-outline-variant bg-surface-container-lowest pl-3 pr-10 py-2 font-body text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                <p className="font-body text-[11px] text-on-surface-variant">
                  If left blank, a secure one-time login link will be emailed to the user.
                </p>
              </label>

              <div className="flex items-center justify-between pt-2.5 border-t border-outline-variant">
                <div>
                  <p className="font-label text-label-md text-on-surface">Active User Status</p>
                  <p className="font-body text-body-sm text-on-surface-variant">
                    Enable immediate portal access for this user once created
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="sr-only peer"
                    aria-label="Active User Status"
                  />
                  <div className="w-10 h-5 bg-surface-container rounded-full peer peer-checked:bg-secondary after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-surface-container-lowest after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:after:translate-x-5"></div>
                </label>
              </div>
            </section>

            {/* Bottom Action Bar */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Link
                to="/company-admin/masters/user"
                className="px-4 py-2 rounded bg-surface-container-lowest border border-outline-variant text-primary font-label text-label-md hover:bg-surface-container-low transition-colors duration-state-change whitespace-nowrap text-center"
              >
                <span>Cancel</span>
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded bg-primary text-on-primary font-label text-label-md hover:opacity-95 transition-colors duration-state-change whitespace-nowrap text-center disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save User</span>
                )}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
