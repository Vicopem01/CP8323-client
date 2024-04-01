const CircleLoader = () => {
  return (
    <div className="relative h-6 w-6 bg-transparent p-3">
      <div className="absolute top-2/4 left-2/4 box-content h-5 w-5 -translate-y-2/4 -translate-x-2/4 animate-roll rounded-full border-[4px] border-white border-t-transparent"></div>
    </div>
  );
};

export default CircleLoader;
