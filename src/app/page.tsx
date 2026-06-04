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
      <div className="mx-auto my-4 mb-20 flex w-full min-w-0 max-w-full flex-col items-center gap-28 overflow-hidden p-8 md:my-4 md:gap-32 sm:gap-5">
        <Information />
        <ProfileTabs projects={<Projects />} workHistory={<WorkHistory />} />
      </div>
    </div>
  );
}
