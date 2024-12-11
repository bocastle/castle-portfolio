import Information from "@/components/Information";
import WorkHistory from "@/components/WorkHistory";

export default function Home() {
  return (
    <div className="items-center mx-auto p-8 flex flex-col gap-28 md:gap-32 md:my-20 my-4 mb-20 sm:gap-5">
      <Information />
      <WorkHistory />
    </div>
  );
}
