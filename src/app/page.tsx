import Information from "@/components/Information";
import ProfileTabs from "@/components/ProfileTabs";
import Projects from "@/components/Projects";
import { ScrollProgress } from "@/components/ScrollProgressbar";
import Title from "@/components/titles";
import WorkHistory from "@/components/WorkHistory";

export default function Home() {
  return (
    <div>
      <ScrollProgress />
      <Title />
      <div className="mx-auto my-4 mb-20 flex w-full min-w-0 max-w-full flex-col items-center gap-14 overflow-hidden px-6 py-8 sm:gap-16 sm:px-8 md:my-4 md:gap-20">
        <Information />
        <ProfileTabs projects={<Projects />} workHistory={<WorkHistory />} />
      </div>
    </div>
  );
}
