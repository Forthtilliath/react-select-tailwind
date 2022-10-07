export declare namespace CustomSelect {
  /** Type of data recieved */
  type TOption = {
    value: string | number;
    label: React.ReactNode;
  };

  /** Type of main component */
  type SelectType = React.FC<{
    keepDefault?: boolean;
    /** Classes of the container */
    className?: string;
    /** Classes of the select (the part always visible) */
    classSelect?: string;
    /** Classes of options (part only visible when open) */
    classOptions?: string;
    /** Classes of the option selected */
    classSelected?: string;
    /** Array of options */
    options?: TOption[];
    /** Is the select required ? */
    required?: boolean;
    /** Name of the input to access it when you submit */
    name?: string;
  }>;

  /** Type of options component */
  type OptionType = React.FC<
    React.PropsWithChildren<{
      onClick: React.MouseEventHandler<HTMLDivElement>;
      className?: string;
    }>
  >;

  /** Type of the selected component */
  type OptionSelectedProps = {
    onClick: React.MouseEventHandler<HTMLDivElement>;
    className?: string;
    open: boolean;
  };

  type OptionSelectedType = React.PropsWithChildren<OptionSelectedProps>;
}

export type FormValues = {
  car: { value: string | number };
};
