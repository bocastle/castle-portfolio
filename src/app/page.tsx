import BuildLog from "@/components/BuildLog";
import FeaturedWriting from "@/components/FeaturedWriting";
import Information from "@/components/Information";
import Projects from "@/components/Projects";
import { ScrollProgress } from "@/components/ScrollProgressbar";
import WorkHistory from "@/components/WorkHistory";

export default function Home() {
  return (
    <div>
      <ScrollProgress />
      <div className="mx-auto my-4 mb-20 flex w-full min-w-0 max-w-full flex-col items-center gap-14 px-6 py-8 sm:gap-16 sm:px-8 md:my-4 md:gap-20">
        <Information />
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 md:gap-20">
          <WorkHistory />
          <Projects />
        </div>
        <BuildLog />
        <FeaturedWriting />
      </div>
    </div>
  );
}
