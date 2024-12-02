import { discoverActions, discoverCategories } from '../utils/constants';

const Discover = () => {
  return (
    <div className="sticky top-24">
      <div className="border-b border-gray-400 pb-7">
        <h2 className="font-semibold"> Discover more of what matters to you </h2>
        <div className="my-2 flex flex-wrap items-center gap-3">
          {discoverCategories.map((item, i) => (
            <button key={i} className="rounded-full bg-gray-200 px-3 py-2 text-sm">
              {item}
            </button>
          ))}
        </div>
        <button className="hover:text-black1 py-3 text-sm text-green-600">See more topics</button>
      </div>
      <div className="flex flex-wrap items-center gap-3 pt-8 leading-3">
        {discoverActions.map((item, i) => (
          <button key={i} className="text-md text-black1">
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Discover;
