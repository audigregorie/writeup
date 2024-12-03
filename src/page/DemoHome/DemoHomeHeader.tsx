import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { navItems } from '../../utils/constants';
import Auth from '../../features/Auth/Auth';

const DemoHomeHeader = () => {
  const [isActive, setIsActive] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      window.scrollY > 50 ? setIsActive(true) : setIsActive(false);
    };

    window.addEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b border-black ${isActive ? 'bg-white' : 'bg-banner'} transition-all duration-300`}>
      <div className="container flex h-[70px] items-center justify-between">
        <Link to={'/'}>
          <h1 className="text-2xl font-semibold">Writeup</h1>
        </Link>
        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-5 text-sm sm:flex">
            {navItems.map((link, i) => (
              <Link key={i} to={link.path}>
                {link.title}
              </Link>
            ))}
          </div>

          <div className="relative">
            <button onClick={() => setModal(true)} className="hidden items-center gap-5 text-sm sm:flex">
              Sign In
            </button>
            <Auth modal={modal} setModal={setModal} />
          </div>

          <button onClick={() => setModal(true)} className={`btn rounded-full bg-black1 text-white ${isActive ? 'bg-green-700' : 'bg-black'}`}>
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default DemoHomeHeader;
