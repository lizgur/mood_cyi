const SkeletonDescription = () => {
  return (
    <div>
      <div className="border-b-2 border-border  flex gap-x-6">
        <div
          className={`w-[13%] border-t-2 border-l-2 border-r-2 border-b-0 border-border  animate-pulse bg-neutral-200  px-6 rounded-tl-md rounded-tr-md h-12`}
        />
        <div
          className={`w-[13%] border-t-2 border-l-2 border-r-2 border-border  border-b-0 animate-pulse bg-neutral-200  px-6 rounded-tl-md rounded-tr-md h-12`}
        />
      </div>
      <div className="border-l-2 border-r-2 border-b-2 border border-border  rounded-bl-md rounded-br-md p-6">
        <div className="h-10 mb-4 rounded-md animate-pulse bg-neutral-200 " />
        <div>
          <div className="h-10 mb-4 rounded-md animate-pulse bg-neutral-200 " />
        </div>
      </div>
    </div>
  );
};

export default SkeletonDescription;
