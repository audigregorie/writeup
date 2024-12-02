const Banner = () => {
  return (
    <div className="bg-banner border-b border-black">
      <div className="container flex flex-col items-start gap-12 py-24">
        <h1 className="font-title text-5xl font-normal sm:text-[4rem] md:text-8xl">Think Curious.</h1>
        <p className="w-full text-xl font-medium leading-7 md:w-[30rem] md:text-2xl">Discover stories, thinking, and expertise from writers on any topic.</p>
        <button className="btn bg-black1 rounded-full !px-6 !py-1 !text-xl text-white">Start reading</button>
      </div>
    </div>
  );
};

export default Banner;
