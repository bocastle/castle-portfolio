const NotFound = () => {
  return (
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-items-center items-center gap-8px"
      role="html"
    >
      <span>요청하신 페이지는 진행중입니다.</span>
      <span>coming soon...</span>
    </div>
  );
};

export default NotFound;
