import classNames from "classnames";

type ButtonProps = {
  onClick?: () => void;
  className?: string;
  type: string;
  disabled: boolean;
  children: React.ReactNode;
};

export function Button(props: ButtonProps) {
  const { onClick, className, children } = props;

  const classes = classNames(
    "rounded border shadow-md  font-bold px-3 py-2",
    className
  );

  return (
    <button type="submit" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
