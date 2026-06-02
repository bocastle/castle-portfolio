import Divider from "@/common/Divider";
import data from "./data.json";
import ProjectItem from "./components/ProjectItem";
import { Project } from "./types";

const Projects = () => {
  const projects = data.projects as Project[];

  return (
    <section className="w-full">
      <h2>{data.title}</h2>
      <Divider />
      <div className="flex flex-col gap-20">
        {projects.map((project) => (
          <ProjectItem key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
