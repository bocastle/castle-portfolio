import Divider from "@/common/Divider";
import data from "./data.json";
import ProjectItem from "./components/ProjectItem";
import { Project } from "./types";

const Projects = () => {
  const projects = data.projects as Project[];

  return (
    <section id="projects" className="w-full scroll-mt-24">
      <p className="m-0 text-sm font-semibold text-teal-700 dark:text-teal-300">
        대표 프로젝트
      </p>
      <h2 className="py-1 text-3xl font-semibold md:text-4xl">
        {data.title}
      </h2>
      <p className="mt-2 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
        실무에서 다룬 운영, 권한, 외부 연동 경험을 개인 프로젝트와
        포트폴리오 개선 과정으로 확장하고, 테스트와 배포 확인까지
        기록했습니다.
      </p>
      <Divider />
      <div className="flex flex-col gap-8">
        {projects.map((project) => (
          <ProjectItem key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
