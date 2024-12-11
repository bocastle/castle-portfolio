"use client";

import Image from "next/image";
import usePlatform from "../../hooks/usePlatform";
const Information = () => {
  const platform = usePlatform();

  if (platform === "desktop") {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex md:flex items-center md:items-center mr-4 gap-6">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG}/7nxjpqB/image.png`}
            width="200"
            height="200"
            alt={"회사명"}
            className="object-cover rounded-lg border-[1px] border-gray-400 border-solid w-24 h-24"
          />
          <div className="flex flex-col gap-2">
            <h1 className="leading-[1.15]">
              안녕하세요,
              <br /> 꿈을 항해하는 개발자{" "}
              <span className="font-semibold">김보성</span>
              입니다.
            </h1>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center flex-col">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMG}/7nxjpqB/image.png`}
            width="200"
            height="200"
            alt={"회사명"}
            className="object-cover rounded-lg border-[1px] border-gray-400 border-solid w-24 h-24"
          />
          <div className="flex flex-col gap-2">
            <h1 className="leading-[1.15] sm: text-2xl">
              안녕하세요,
              <br /> 꿈을 항해하는 개발자{" "}
              <span className="font-semibold">김보성</span>
              입니다.
            </h1>
          </div>
        </div>
      </div>
    );
  }
};

export default Information;
