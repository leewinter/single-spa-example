function SkeletonGraphLoader({ chartType = "pie" }) {
  return (
    <div className="animate-pulse shadow rounded-md p-4 max-w-sm w-full mx-auto">
      {chartType === "pie" ? (
        <>
          <div className="flex-1 pb-3 w-10 mx-auto">
            <div className="h-2 bg-white rounded"></div>
          </div>
          <div className=" flex space-x-4">
            <div className="rounded-full bg-white h-80 w-80"></div>
          </div>
        </>
      ) : null}
      {chartType === "bar" ? (
        <>
          <div className="flex-1 pb-3 w-10 mx-auto">
            <div className="h-2 bg-white rounded"></div>
          </div>
          <div className=" flex space-x-4">
            <div className="bg-white h-80 w-80"></div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default SkeletonGraphLoader;
