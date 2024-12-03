import HashLoader from 'react-spinners/HashLoader';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-30 grid place-items-center bg-white">
      <HashLoader size={100} color="rgb(255, 192, 23)" />
    </div>
  );
};

export default Loading;
