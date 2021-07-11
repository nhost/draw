import classNames from "classnames";

type TextFieldProps = {
  onChange: (e: any) => void;
  value: string;
  type: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
};

export function TextField(props: TextFieldProps) {
  const { onChange, value, className, type, placeholder, autoFocus } = props;

  const classes = classNames("rounded border shadow-md px-3 py-2 ", className);

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={classes}
      placeholder={placeholder}
      autoFocus={autoFocus}
    />
  );
}
