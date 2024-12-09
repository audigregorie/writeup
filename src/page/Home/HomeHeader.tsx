import { Link } from 'react-router-dom';
import { LiaEditSolid } from 'react-icons/lia';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Search from '../../components/Search';
import { Avatar } from '@mui/material';
import Modal from '../../components/Modal';
import { useEffect, useState } from 'react';
import UserModal from '../../components/UserModal';
import { useAuth } from '../../context/AuthProvider';
import { CiSearch } from 'react-icons/ci';

const HomeHeader = () => {
  const [modal, setModal] = useState(false);
  const [searchModal, setSearchModal] = useState(true);
  const { currentUser } = useAuth();

  const getAvatarContent = () => {
    if (currentUser?.photoURL) {
      return currentUser.photoURL;
    } else if (currentUser?.displayName) {
      return currentUser.displayName[0].toUpperCase();
    } else {
      return currentUser?.email![0].toUpperCase();
    }
  };

  useEffect(() => {
    // Media query for the Tailwind 'sm:' breakpoint (640px)
    const mediaQuery = window.matchMedia('(min-width: 640px)');

    const handleMediaChange = () => {
      setSearchModal(mediaQuery.matches);
    };

    handleMediaChange();

    mediaQuery.addEventListener('change', handleMediaChange);

    // Cleanup listener on component unmount
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  return (
    <header className="border border-gray-200">
      <div className="container flex h-[60px] items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-7">
          <Link to={'/'}>
            <h1 className="text-2xl font-semibold">Writeup</h1>
          </Link>
          <Search modal={searchModal} setModal={setSearchModal} />
        </div>
        <div className="flex items-center gap-3 sm:gap-7">
          <span onClick={() => setSearchModal(true)} className="flex cursor-pointer text-3xl text-gray-300 sm:hidden">
            <CiSearch />
          </span>
          <Link to="/write" className="hidden items-center gap-1 text-gray-500 sm:flex">
            <span className="text-3xl">
              <LiaEditSolid />
            </span>
            <p className="mt-2 text-sm">Write</p>
          </Link>
          <span>
            <IoMdNotificationsOutline className="cursor-pointer text-3xl text-gray-500" />
          </span>
          <div className="relative flex items-center">
            <Avatar onClick={() => setModal(true)} className="!h-8 !w-8 cursor-pointer bg-white font-bold text-black">
              {getAvatarContent()}
            </Avatar>
            <span onClick={() => setModal(true)} className="cursor-pointer text-gray-500">
              <MdKeyboardArrowDown />
            </span>
            {modal && (
              <Modal modal={modal} setModal={setModal} fullScreen={false}>
                <UserModal />
              </Modal>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
