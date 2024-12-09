import { LiaUserSolid } from 'react-icons/lia';
import { MdOutlineLocalLibrary } from 'react-icons/md';
import { BiSpreadsheet } from 'react-icons/bi';
import { HiOutlineChartBar } from 'react-icons/hi';
import { LiaEditSolid } from 'react-icons/lia';
import { UserModalProps } from '../utils/types/common';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import { secretEmail } from '../utils/helpers';

const UserModal = () => {
  const { currentUser } = useAuth();

  const userModal: UserModalProps[] = [
    {
      title: 'Profile',
      icon: <LiaUserSolid />,
      path: currentUser ? `/profile/${currentUser?.uid}` : '/profile'
    },
    {
      title: 'Library',
      icon: <MdOutlineLocalLibrary />,
      path: '/library'
    },
    {
      title: 'Stories',
      icon: <BiSpreadsheet />,
      path: '/stories'
    },
    {
      title: 'Stats',
      icon: <HiOutlineChartBar />,
      path: '/stats'
    }
  ];

  return (
    <section className="shadows absolute -right-10 top-4 z-50 w-[18rem] rounded-md bg-white p-6 text-gray-500">
      <Link to="/write" className="flex items-center gap-2 pb-3 text-gray-500 md:hidden">
        <span className="text-2xl md:text-3xl">
          <LiaEditSolid />
        </span>
        <p className="text-base">Write</p>
      </Link>
      <div className="flex flex-col gap-4 border-b border-gray-300 pb-5">
        {userModal.map((link, i) => (
          <Link to={link.path} key={i} className="flex items-center gap-2 text-gray-500 hover:text-black/70">
            <span className="text-2xl">{link.icon}</span>
            <h2 className="text-base">{link.title}</h2>
          </Link>
        ))}
      </div>
      <button className="flex cursor-pointer flex-col pt-5 hover:text-black/70">
        Sign Out
        <span className="text-sm">{secretEmail(currentUser!.email)}</span>
      </button>
    </section>
  );
};

export default UserModal;
