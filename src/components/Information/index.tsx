import Image from "next/image";

const Information = () => {
  return (
    <div className="justify-center justify-items-center gap-6 items-center md:flex max-sm:flex-col max-sm:justify-items-center">
      <div className="sm:flex sm:justify-center max-sm:flex max-sm:justify-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMG}/7nxjpqB/image.png`}
          width="200"
          height="200"
          alt={"회사명"}
          className="object-cover rounded-lg border-[1px] border-gray-400 border-solid w-24 h-24"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="leading-[1.15] md:text-5xl sm:text-3xl max-sm:text-3xl">
          안녕하세요,
          <br /> 꿈을 항해하는 개발자{" "}
          <span className="font-semibold">김보성</span>
          입니다.
        </h1>
      </div>
    </div>
  );
};

export default Information;
