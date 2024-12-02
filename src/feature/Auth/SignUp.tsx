import { MdKeyboardArrowLeft } from 'react-icons/md';
import Input from '../../components/Input';
import { AuthProps } from '../../utils/types/common';

const Signup: React.FC<AuthProps> = ({ setSignRequest }) => {
  return (
    <div className="container mt-24 flex flex-col gap-6 text-center">
      <h2 className="text-3xl">Sign up with email</h2>
      <p className="mx-auto w-full sm:w-[25rem]">Enter the email address associated with your account, and we'll send a magic link to your inbox.</p>
      <form className="flex flex-col gap-4">
        <Input type="text" title="Username" />
        <Input type="email" title="Email" />
        <Input type="password" title="Password" />
        <Input type="password" title="Confirm Password" />
        <button className="mx-auto mt-4 rounded-full bg-green-700 px-12 py-2 text-sm text-white hover:bg-green-800">Sign Up</button>
      </form>
      <button onClick={() => setSignRequest('')} className="hover:text-greeen-700 mx-auto flex items-center text-sm text-green-600">
        <MdKeyboardArrowLeft /> All sign up options
      </button>
    </div>
  );
};

export default Signup;
