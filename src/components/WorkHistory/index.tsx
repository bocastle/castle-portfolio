import Divider from "@/common/Divider";
import fs from "fs";
import WorkHistoryItem from "./components/WorkHistoryItem";
import data from "./data.json";
const WorkHistory = () => {
  let filePath = `./public/markdown/workHistory/0.md`;
  const file = fs.readFileSync(filePath, "utf8");
  const WorkHistoryList = data;

  return (
    <div>
      <h2>{WorkHistoryList.title}</h2>
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
