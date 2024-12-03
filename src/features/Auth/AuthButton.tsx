import { AuthButtonProps } from '../../utils/types/common';

const AuthButton: React.FC<AuthButtonProps> = ({ icon, text, onClick }) => {
  return (
    <button onClick={onClick} className="flex cursor-pointer items-center gap-10 rounded-full border border-black px-6 py-2">
      {icon} {text}
    </button>
  );
};

export default AuthButton;
