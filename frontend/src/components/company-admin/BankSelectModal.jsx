import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const defaultBanks = [
  {
    id: 'canara',
    name: 'Canara Bank — Hi Tech Agri Finance Branch',
    shortName: 'Canara Bank',
    branch: 'Hi Tech Agri Finance Branch',
    category: 'Public Sector Bank',
    code: 'CB-HTAF',
    badge: 'Empanelled',
  },
  {
    id: 'sbi',
    name: 'State Bank of India — Commercial Credit Branch',
    shortName: 'State Bank of India (SBI)',
    branch: 'Commercial Credit Hub',
    category: 'Public Sector Bank',
    code: 'SBI-CCB',
    badge: 'Empanelled',
  },
  {
    id: 'hdfc',
    name: 'HDFC Bank — Retail Asset & Mortgage Hub',
    shortName: 'HDFC Bank',
    branch: 'Retail Asset Center',
    category: 'Private Sector Bank',
    code: 'HDFC-RAMH',
    badge: 'Empanelled',
  },
  {
    id: 'icici',
    name: 'ICICI Bank — Structured Mortgage Hub',
    shortName: 'ICICI Bank',
    branch: 'Mortgage Hub',
    category: 'Private Sector Bank',
    code: 'ICICI-SMH',
    badge: 'Empanelled',
  },
  {
    id: 'bob',
    name: 'Bank of Baroda — Zonal Valuation Cell',
    shortName: 'Bank of Baroda',
    branch: 'Zonal Valuation Cell',
    category: 'Public Sector Bank',
    code: 'BOB-ZVC',
    badge: 'Active Format',
  },
  {
    id: 'pnb',
    name: 'Punjab National Bank — Large Corporate Branch',
    shortName: 'Punjab National Bank (PNB)',
    branch: 'Large Corporate Branch',
    category: 'Public Sector Bank',
    code: 'PNB-LCB',
    badge: 'Active Format',
  },
  {
    id: 'axis',
    name: 'Axis Bank — Structured Lending Branch',
    shortName: 'Axis Bank',
    branch: 'Structured Lending',
    category: 'Private Sector Bank',
    code: 'AXIS-SLB',
    badge: 'Active Format',
  },
  {
    id: 'union',
    name: 'Union Bank of India — Mid Corporate Branch',
    shortName: 'Union Bank of India',
    branch: 'Mid Corporate Branch',
    category: 'Public Sector Bank',
    code: 'UBI-MCB',
    badge: 'Active Format',
  },
  {
    id: 'indian',
    name: 'Indian Bank — Corporate & Retail Credit',
    shortName: 'Indian Bank',
    branch: 'Corporate & Retail Credit',
    category: 'Public Sector Bank',
    code: 'INDB-CRC',
    badge: 'Active Format',
  },
];

export default function BankSelectModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setTimeout(() => {
        if (searchInputRef.current) searchInputRef.current.focus();
      }, 80);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredBanks = defaultBanks.filter((bank) => {
    const q = searchQuery.trim().toLowerCase();
    return (
      !q ||
      bank.name.toLowerCase().includes(q) ||
      bank.shortName.toLowerCase().includes(q) ||
      bank.branch.toLowerCase().includes(q) ||
      bank.category.toLowerCase().includes(q)
    );
  });

  const handleSelectBank = (bank) => {
    onClose();
    navigate(`/company-admin/valuation/new?bank=${encodeURIComponent(bank.name)}`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="select-bank-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-lg bg-surface-container-lowest border border-outline-variant rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-outline-variant flex items-center justify-between gap-3 bg-surface-container-lowest shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded bg-primary-container text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-title-md">account_balance</span>
            </span>
            <div>
              <h2 id="select-bank-title" className="font-headline text-[16px] sm:text-[17px] font-semibold text-primary leading-tight">
                Which Bank is this Valuation for?
              </h2>
              <p className="font-body text-body-sm text-on-surface-variant mt-0.5">
                Select a bank to initialize its customized Part A valuation template
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors flex items-center justify-center shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-outline-variant bg-surface shrink-0">
          <div className="relative">
            <span
              aria-hidden="true"
              className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-title-md select-none"
            >
              search
            </span>
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bank name or branch..."
              className="w-full rounded border border-outline-variant bg-surface-container-lowest pl-9 pr-3 py-2 font-body text-body-sm text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
        </div>

        {/* Bank List */}
        <div className="overflow-y-auto p-3 flex flex-col gap-1.5 flex-1 divide-y divide-outline-variant/40">
          {filteredBanks.length > 0 ? (
            filteredBanks.map((bank) => (
              <button
                key={bank.id}
                type="button"
                onClick={() => handleSelectBank(bank)}
                className="w-full text-left p-3 rounded-md hover:bg-primary-container/40 hover:border-primary/20 border border-transparent transition-all duration-state-change flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded bg-surface-container-low border border-outline-variant text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined text-[18px]">account_balance</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-label text-label-md text-primary font-semibold truncate group-hover:text-primary">
                        {bank.shortName}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-surface-container-low text-on-surface-variant font-mono">
                        {bank.code}
                      </span>
                    </div>
                    <p className="font-body text-body-sm text-on-surface-variant truncate">
                      {bank.branch}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-[10px] font-medium">
                    {bank.badge}
                  </span>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary group-hover:translate-x-0.5 transition-all text-title-sm">
                    arrow_forward
                  </span>
                </div>
              </button>
            ))
          ) : (
            <div className="py-8 text-center">
              <span className="material-symbols-outlined text-outline text-headline-md block mb-1">
                account_balance_wallet
              </span>
              <p className="font-body text-body-md text-on-surface-variant">
                No bank matches "{searchQuery}"
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-2 font-label text-label-sm text-tertiary hover:underline cursor-pointer"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-outline-variant bg-surface-container-low/50 flex items-center justify-between gap-3 text-on-surface-variant font-body text-body-sm shrink-0">
          <span>{filteredBanks.length} banking templates available</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded border border-outline-variant bg-surface-container-lowest text-primary font-label text-label-sm hover:bg-surface-container-low transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
