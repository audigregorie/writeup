import Banner from '../../components/Banner';
import Discover from '../../components/Discover';
import Trending from '../../components/Trending';
import Posts from '../../features/Posts/Posts';

const DemoHome = () => {
  return (
    <>
      <Banner />
      <Trending />
      <div className="container flex flex-col-reverse gap-28 py-7 md:flex-row">
        <div className="flex-[1.5]">
          <Posts />
        </div>
        <div className="relative flex-1">
          <Discover />
        </div>
      </div>
    </>
  );
};

export default DemoHome;
