import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { CustomSelect as CS } from './@types';

const Select: CS.SelectType = ({
  keepDefault = true,
  className = '',
  classSelect = '',
  classOptions = '',
  classSelected = '',
  options = [],
  required = false,
  name = '',
}) => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // To change the selectedIndex
  const selectRef = useRef<HTMLSelectElement>(null);
  // To check if options is the current selected
  const divSelectRef = useRef<HTMLDivElement>(null);

  /* Creating the options for the hidden select. */
  const children = options.map(({ value, label }, i) => (
    <option key={i} value={value} />
  ));

  const handleOption = (optionIndex: number) => {
    if (!selectRef.current) return;

    selectRef.current.selectedIndex = optionIndex;
    setSelectedIndex(optionIndex);
  };

  const handleSelect = () => setOpen((open) => !open);

  const isSelectedIndex = (index: number) => selectedIndex === index;
  const itemSelected = options[selectedIndex].label;

  const closeAllSelect = ({ target: el }: MouseEvent) => {
    const div = (el as HTMLDivElement).closest('div');
    if (divSelectRef.current !== div) {
      setOpen(false);
    }
  };

  const onKeyDown = () => {};

  useEffect(() => {
    if (!divSelectRef.current || !selectRef.current) return;

    document.addEventListener('click', closeAllSelect);
    return () => document.removeEventListener('click', closeAllSelect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={twMerge(`relative`, className)}>
      {/* Hidden select */}
      <select
        className="hidden"
        ref={selectRef}
        name={name}
        required={required}>
        {children}
      </select>
      {/* Value displayed */}
      <OptionSelectedWithRef
        ref={divSelectRef}
        onClick={handleSelect}
        onKeyDown={onKeyDown}
        className={classSelect}
        open={open}>
        {itemSelected}
      </OptionSelectedWithRef>
      {/* Options list */}
      {open && (
        <div className={twMerge(`absolute top-full left-0 right-0 z-[99]`, '')}>
          {options.map(({ label }, i) => {
            if (!i && !keepDefault) return null;
            const last = options.length === i + 1 ? 'rounded-b-md' : '';
            return (
              <Option
                key={i}
                onClick={() => handleOption(i)}
                onKeyDown={onKeyDown}
                className={twMerge(
                  `${last}`,
                  classOptions,
                  isSelectedIndex(i) ? classSelected : ''
                )}>
                {label}
              </Option>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Option: CS.OptionType = ({ onClick, children, onKeyDown, className }) => {
  return (
    <div
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
      className={twMerge(
        `relative px-4 py-2 border border-transparent border-b-black/10 cursor-pointer text-white bg-sky-500 hover:bg-sky-500/80`,
        className
      )}>
      {/* <div className="pointer-events-none">{label}</div> */}
      {children}
    </div>
  );
};

// eslint-disable-next-line react/display-name
const OptionSelectedWithRef = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<CS.OptionSelectedProps>
>(({ open, className, onClick, onKeyDown, children }, ref) => {
  return (
    <div
      className={twMerge(
        `px-4 py-2 border border-transparent border-b-black/10 text-white bg-sky-500 cursor-pointer after:text-white after:absolute after:top-2/4 after:w-0 after:h-0 after:border-[6px] after:border-transparent after:right-2.5 ${
          open
            ? 'rounded-t-md after:-translate-y-3/4 after:border-b-white'
            : 'rounded-md after:-translate-y-1/4 after:border-t-white'
        }`,
        className
      )}
      ref={ref}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}>
      {children}
    </div>
  );
});

export default Select;
