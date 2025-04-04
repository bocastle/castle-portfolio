import Divider from "@/common/Divider";
import WorkHistoryItem from "./components/WorkHistoryItem";
import data from "./data.json";
const WorkHistory = () => {
  const WorkHistoryList = data;

  return (
    <div>
      <h2>{WorkHistoryList.title}</h2>
      <Divider />
      <div className="flex flex-col gap-24">
        {[...WorkHistoryList.workHistory].reverse().map((item) => (
          <WorkHistoryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default WorkHistory;
