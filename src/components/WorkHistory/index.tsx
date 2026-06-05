import Divider from "@/common/Divider";
import WorkHistoryItem from "./components/WorkHistoryItem";
import data from "./data.json";
const WorkHistory = () => {
  const WorkHistoryList = data;

  return (
    <section className="w-full">
      <h2 className="py-1 text-3xl font-semibold md:text-4xl">
        {WorkHistoryList.title}
      </h2>
      <p className="mt-2 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
        최근 경력인 소프트위즈와 직전 링크커넥션을 먼저 보여주고, 도메인,
        맡은 역할, 기술 스택과 운영/배포 경험을 함께 정리했습니다.
      </p>
      <Divider />
      <div className="flex flex-col gap-8">
        {[...WorkHistoryList.workHistory].reverse().map((item) => (
          <WorkHistoryItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default WorkHistory;
