import Divider from "@/common/Divider";
import WorkHistoryItem from "./components/WorkHistoryItem";
import data from "./data.json";
const WorkHistory = () => {
  const WorkHistoryList = data;

  return (
    <section className="w-full">
      <p className="m-0 text-sm font-semibold text-teal-700 dark:text-teal-300">
        Recent Work Evidence
      </p>
      <h2 className="py-1 text-3xl font-semibold md:text-4xl">
        {WorkHistoryList.title}
      </h2>
      <p className="mt-2 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
        최신 경력은 도메인과 문제 해결 증거를 먼저 보여주고, 상세 업무
        내용은 아래에 이어서 정리했습니다.
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
