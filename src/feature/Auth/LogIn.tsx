import { MdKeyboardArrowLeft } from 'react-icons/md';
import Input from '../../components/Input';
import { AuthProps } from '../../utils/types/common';

const LogIn: React.FC<AuthProps> = ({ setSignRequest }) => {
  return (
    <div className="container mt-24 flex flex-col gap-6 text-center">
      <h2 className="text-3xl">Log in with email</h2>
      <p className="mx-auto w-full sm:w-[25rem]">Enter the email address associated with your account.</p>
      <form className="flex flex-col gap-4">
        <Input type="email" title="email" />
        <Input type="password" title="password" />
        <button className="mx-auto mt-4 rounded-full bg-green-700 px-12 py-2 text-sm text-white hover:bg-green-800">Log In</button>
      </form>
      <button onClick={() => setSignRequest('')} className="hover:text-greeen-700 mx-auto flex items-center text-sm text-green-600">
        <MdKeyboardArrowLeft /> All login options
      </button>
    </div>
  );
};

export default LogIn;
