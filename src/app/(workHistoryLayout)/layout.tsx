import { ScrollProgress } from "@/components/ScrollProgressbar";
import Title from "@/components/titles";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ScrollProgress />
      <Title />
      {children}
    </div>
  );
}
