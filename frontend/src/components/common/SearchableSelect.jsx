import React, { useState, useRef, useEffect } from 'react';

export default function SearchableSelect({
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  searchPlaceholder = 'Search options...',
  className = '',
  disabled = false,
  ariaLabel = 'Select option',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Normalize options to { value, label } format
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'object' && opt !== null) {
      return {
        value: opt.value ?? opt.label,
        label: opt.label ?? String(opt.value),
        subtitle: opt.subtitle,
      };
    }
    return { value: opt, label: String(opt) };
  });

  // Current selected label
  const selectedOption = normalizedOptions.find(
    (opt) => String(opt.value).toLowerCase() === String(value).toLowerCase()
  );

  // Filter options by search term
  const filteredOptions = normalizedOptions.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (opt.subtitle && opt.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Auto focus search input when opened
  useEffect(() => {
    if (isOpen) {
      // Short delay to ensure DOM is painted
      const timer = setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (optValue) => {
    onChange(optValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div ref={containerRef} className={`relative select-none ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        className={`w-full rounded border bg-surface-container-lowest px-3 py-2 flex items-center justify-between gap-2 text-left font-body text-body-md transition-colors duration-state-change focus:outline-none focus:ring-2 focus:ring-primary/20 ${
          isOpen ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant hover:border-primary/50'
        } ${disabled ? 'opacity-60 cursor-not-allowed bg-surface-container-low' : 'cursor-pointer'}`}
      >
        <span className={`truncate ${selectedOption ? 'text-on-surface font-medium' : 'text-outline'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span
          className={`material-symbols-outlined text-[18px] text-outline transition-transform duration-state-change shrink-0 ${
            isOpen ? 'rotate-180 text-primary' : ''
          }`}
          aria-hidden="true"
        >
          expand_more
        </span>
      </button>

      {/* Dropdown Menu Panel with Embedded Search Bar */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute z-50 mt-1 w-full min-w-[200px] rounded-md border border-outline-variant bg-surface-container-lowest shadow-lg shadow-shadow/10 py-1.5 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-100"
        >
          {/* Search Bar Input Header */}
          <div className="px-2 pb-1.5 border-b border-outline-variant">
            <div className="relative flex items-center">
              <span
                className="material-symbols-outlined absolute left-2 text-[16px] text-outline select-none pointer-events-none"
                aria-hidden="true"
              >
                search
              </span>
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded border border-outline-variant bg-surface pl-7 pr-7 py-1 text-[12px] font-body text-on-surface placeholder:text-outline focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && filteredOptions.length > 0) {
                    e.preventDefault();
                    handleSelect(filteredOptions[0].value);
                  }
                }}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchTerm('');
                    searchInputRef.current?.focus();
                  }}
                  className="absolute right-1.5 p-0.5 rounded text-outline hover:text-on-surface"
                  aria-label="Clear search"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              )}
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-52 overflow-y-auto px-1 py-0.5 flex flex-col gap-0.5">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected =
                  selectedOption &&
                  String(selectedOption.value).toLowerCase() === String(opt.value).toLowerCase();

                return (
                  <button
                    key={String(opt.value)}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full px-2.5 py-1.5 rounded flex items-center justify-between text-left text-[12px] sm:text-[13px] font-body transition-colors duration-state-change ${
                      isSelected
                        ? 'bg-primary-container text-primary font-semibold'
                        : 'text-on-surface hover:bg-surface-container-low hover:text-primary'
                    }`}
                  >
                    <div className="flex flex-col truncate">
                      <span className="truncate">{opt.label}</span>
                      {opt.subtitle && (
                        <span className="text-[10px] text-on-surface-variant font-normal truncate">
                          {opt.subtitle}
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <span
                        className="material-symbols-outlined text-[16px] text-primary shrink-0 ml-2"
                        aria-hidden="true"
                      >
                        check
                      </span>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-3 text-center text-outline text-[12px] font-body">
                No matching options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
