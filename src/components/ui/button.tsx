import classNames from "classnames";

type ButtonProps = {
  onClick?: () => void;
  className?: string;
  type: string;
  loading: boolean;
  disabled: boolean;
  children: React.ReactNode;
};

export function Button({
  onClick,
  className,
  type,
  loading,
  disabled,
  children,
}: ButtonProps) {
  const classes = classNames(
    "rounded border shadow-md  font-bold px-3 py-2",
    className
  );

  return (
    <button type="submit" onClick={onClick} className={classes}>
      <div className="flex items-center">
        {loading && <span>loading...</span>}
        {children}
      </div>
    </button>
  );
}

Button.defaultProps = {
  type: "submit",
  loading: false,
  disabled: false,
};
