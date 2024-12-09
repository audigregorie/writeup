import { ModalProps } from '../utils/types/common';

const Modal: React.FC<ModalProps> = ({ children, modal, setModal, fullScreen = true }) => {
  return (
    <>
      {fullScreen ? (
        <>
          {/* Overlay */}
          <div
            onClick={() => setModal(false)}
            className={`fixed inset-0 z-10 bg-gray-400/50 transition-all ${modal ? 'visible opacity-100' : 'invisible opacity-0'}`}
          />
          {/* Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`fixed inset-0 z-20 flex items-center justify-center transition-all ${modal ? 'visible opacity-100' : 'invisible opacity-0'}`}>
            {children}
          </div>
        </>
      ) : (
        <>
          {/* Overlay */}
          <div
            onClick={() => setModal(false)}
            className={`fixed inset-0 z-10 bg-transparent transition-all ${modal ? 'visible opacity-100' : 'invisible opacity-0'}`}
          />
          {/* Content */}
          <div onClick={(e) => e.stopPropagation()} className={`absolute z-20 transition-all ${modal ? 'visible opacity-100' : 'invisible opacity-0'}`}>
            {children}
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
