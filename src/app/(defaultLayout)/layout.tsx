export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* <Title /> */}
      {children}
    </div>
  );
}
