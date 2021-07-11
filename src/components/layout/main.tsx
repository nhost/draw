type MainProps = {
  children: React.ReactNode;
};

export function Main({ children }: MainProps) {
  return (
    <div className="container mx-auto my-3 max-w-screen-lg">
      <div className="mx-5">{children}</div>
    </div>
  );
}
