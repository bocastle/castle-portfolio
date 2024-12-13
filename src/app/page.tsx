import Information from "@/components/Information";
import WorkHistory from "@/components/WorkHistory";

export default function Home() {
  return (
    <div className="items-center mx-auto p-8 flex flex-col gap-28 my-4 mb-20 md:gap-32 md:my-4 sm:gap-5">
      <Information />
      <WorkHistory />
    </div>
  );
}
