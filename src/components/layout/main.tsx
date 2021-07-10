type MainProps = {
  children: React.ReactNode;
};

export function Main({ children }: MainProps) {
  return <div className="container mx-auto my-3">{children}</div>;
}
