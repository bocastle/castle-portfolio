import BlogList from "@/components/BlogList";
import { notionDatabase } from "../api/notion";

export default async function BlogPage() {
  let db;

  try {
    if (!process.env.NOTION_DATABASE_ID) {
      throw new Error("데이터베이스 아이디가 없습니다.");
    }
    db = await notionDatabase.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      sorts: [
        {
          property: "list", // 정렬의 기준이 될 데이터베이스 속성
          direction: "descending", // 내림차순 : descending, 오름차순 : ascending
        },
      ],
    });
  } catch (error) {
    console.error("error:::::", error);
  }

  console.log("db?.results::::", db?.results);

  // const data = await getData("");
  // console.log("data", data);
  return (
    <div className="items-center mx-auto p-8 flex flex-col gap-28 my-4 mb-20 md:gap-32 md:my-4 sm:gap-5">
      <BlogList />
    </div>
  );
}
