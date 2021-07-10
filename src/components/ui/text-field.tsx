import classNames from "classnames";

type TextFieldProps = {
  onChange: (e: any) => void;
  value: string;
  type: string;
  className?: string;
  disabled?: boolean;
};

export function TextField(props: TextFieldProps) {
  const { onChange, value, className, type } = props;

  const classes = classNames(
    "rounded border shadow-md  font-bold px-3 py-2 ",
    className
  );

  return (
    <input type={type} value={value} onChange={onChange} className={classes} />
  );
}
