import { ModalProps } from '../utils/types/common';

const Modal: React.FC<ModalProps> = ({ children, setModal, hiddenStyle }) => {
  return (
    <div
      onClick={() => setModal(false)}
      className={`fixed inset-0 z-10 bg-gray-400/50 transition-all duration-300 ${hiddenStyle} flex items-center justify-center`}>
      <div onClick={(e) => e.stopPropagation()} className="z-20 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default Modal;
