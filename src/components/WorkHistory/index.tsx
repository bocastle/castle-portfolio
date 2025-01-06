import Divider from "@/common/Divider";
import WorkHistoryItem from "./components/WorkHistoryItem";
import data from "./data.json";
const WorkHistory = () => {
  const WorkHistoryList = data;

  return (
    <div>
      <h2 className="text-white">{WorkHistoryList.title}</h2>
      <Divider />
      <div className="flex flex-col gap-24">
        {[...WorkHistoryList.workHistory].reverse().map((item, index) => (
          <WorkHistoryItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default WorkHistory;
