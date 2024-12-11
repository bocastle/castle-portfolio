import data from "./data.json";
const Title = () => {
  const number = Math.floor(Math.random() * (4 - 0 + 1) + 0);
  return (
    <div className="flex bg-violet-800 h-2 sticky top-0 justify-center items-center md:static md:h-20 md:flex sm:hidden max-sm:hidden">
      {data.title.map((item) => {
        if (item.id === number) {
          return (
            <span
              className="text-2xl hidden md:block font-semibold"
              key={item.id}
            >
              {item.content}
            </span>
          );
        }
      })}
    </div>
  );
};

export default Title;
