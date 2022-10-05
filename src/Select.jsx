import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const Select = ({
  keepDefault = true,
  /** Classes of the container */
  className = '',
  /** Classes of the select (the part always visible) */
  classSelect = '',
  /** Classes of options (part only visible when open) */
  classOptions = '',
  /** Classes of the option selected */
  classSelected = '',
  /** Array of options */
  options = [],
  required = false,
  name = '',
}) => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // To change the selectedIndex
  const selectRef = useRef();
  // To check if options is the current selected
  const divSelectRef = useRef();

  /* Creating the options for the hidden select. */
  const children = options.map(({ value, label }, i) => (
    <option key={i} value={value} />
  ));

  /* When user click on a option */
  const handleOption = (optionIndex, option) => {
    selectRef.current.selectedIndex = optionIndex;
    // divSelectRef.current.innerHTML = option.innerHTML;
    setSelectedIndex(optionIndex);
    // console.log(options[optionIndex]);
  };

  const isSelectedIndex = (index) => selectedIndex === index;

  const handleSelect = (e) => {
    // console.log('handleSelect', e.target);
    setOpen((open) => !open);
  };

  const closeAllSelect = ({ target: el }) => {
    const div = el.closest('div');
    if (divSelectRef.current !== div) {
      setOpen(false);
    }
  };

  const onKeyDown = () => {};

  const itemSelected = useMemo(
    () => options[selectedIndex].label,
    [selectedIndex, options]
  );

  // useEffect(() => console.log({ itemSelected }), [itemSelected]);

  // useEffect(() => console.log({ open }), [open]);

  useEffect(() => {
    divSelectRef.current.innerHTML =
      options[selectRef.current.selectedIndex].label;

    document.addEventListener('click', closeAllSelect);
    return () => document.removeEventListener('click', closeAllSelect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={twMerge(`relative`, className)}>
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
                onClick={(e) => handleOption(i, e.target)}
                label={label}
                onKeyDown={onKeyDown}
                className={twMerge(
                  `${last}`,
                  classOptions,
                  selectedIndex === i ? classSelected : ''
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const Option = ({ onClick, label, onKeyDown, className }) => {
  return (
    <div
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex="0"
      className={twMerge(
        `relative px-4 py-2 border border-transparent border-b-black/10 cursor-pointer text-white bg-sky-500 hover:bg-sky-500/80`,
        className
      )}>
      {/* <div className="pointer-events-none">{label}</div> */}
      {label}
    </div>
  );
};

const OptionSelected = (
  { open, className, onClick, onKeyDown, children },
  ref
) => {
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
      tabIndex="0">
      {/* pointer-events-none */}
      {children}
    </div>
  );
};
const OptionSelectedWithRef = forwardRef(OptionSelected);

// const OptionSelected = ({
//   open,
//   divSelectRef,
//   className,
//   handleSelect,
//   onKeyDown,
// }) => {
//   return (
//     <div
//       className={twMerge(
//         `px-4 py-2 border border-transparent border-b-black/10 text-white bg-sky-500 cursor-pointer after:text-white after:absolute after:top-2/4 after:w-0 after:h-0 after:border-[6px] after:border-transparent after:right-2.5 ${
//           open
//             ? 'rounded-t-md after:-translate-y-3/4 after:border-b-white'
//             : 'rounded-md after:-translate-y-1/4 after:border-t-white'
//         }`,
//         className
//       )}
//       ref={divSelectRef}
//       onClick={handleSelect}
//       onKeyDown={onKeyDown}
//       role="button"
//       tabIndex="0"
//     />
//   );
// };

export default Select;
