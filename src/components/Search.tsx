import { CiSearch } from 'react-icons/ci';
import Modal from './Modal';
import { ModalProps } from '../utils/types/common';

const Search: React.FC<ModalProps> = ({ modal, setModal }) => {
  return (
    <>
      <Modal modal={modal} setModal={setModal} fullScreen={false}>
        <div className="absolute left-4 right-4 top-[4rem] sm:relative sm:left-0 sm:top-0">
          <div className="relative flex w-64 items-center gap-1 rounded-full bg-gray-100 px-2 sm:ml-28">
            <span className="text-2xl text-gray-400">
              <CiSearch />
            </span>
            <input type="text" placeholder="Search Writeup" className="w-full bg-transparent py-[0.5rem] text-sm outline-none" />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Search;
