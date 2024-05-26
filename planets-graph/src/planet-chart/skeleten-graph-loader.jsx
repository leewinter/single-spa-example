function SkeletonGraphLoader() {
  return (
    <div className="animate-pulse shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="flex-1 p-2 w-10">
        <div className="h-2 bg-white rounded"></div>
      </div>
      <div className=" flex space-x-4">
        <div className="rounded-full bg-white h-80 w-80"></div>
      </div>
    </div>
  );
}

export default SkeletonGraphLoader;
