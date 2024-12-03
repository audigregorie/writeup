import { LiaTimesSolid } from 'react-icons/lia';
import { useState } from 'react';
import Modal from '../../components/Modal';
import AuthButton from './AuthButton';
import LogIn from './LogIn';
import Signup from './SignUp';
import { ModalProps } from '../../utils/types/common';
import { signInWithPopup } from 'firebase/auth';
import { auth, db, provider } from '../../../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { MdFacebook } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';

const Auth: React.FC<ModalProps> = ({ modal, setModal }) => {
  const [createUser, setCreateUser] = useState<boolean>(false);
  const [signRequest, setSignRequest] = useState<string>('');
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const newUser = userCredential.user;

      const docRef = doc(db, 'users', newUser.uid);
      const userDoc = await getDoc(docRef);

      if (!userDoc.exists()) {
        await setDoc(docRef, {
          userId: newUser.uid,
          username: newUser.displayName,
          email: newUser.email,
          userImg: newUser.photoURL,
          bio: ''
        });
      } else {
        toast.error('User already exisits');
      }

      navigate('/');
      toast.success('Signed in successfully!');
      setModal(false);
    } catch (err: any) {
      console.error('Error during Google sign in:', err);
      toast.error(`Failed to sign in with Google: ${err.message}`);
    }
  };

  const hidden = modal ? 'visible opacity-100' : 'invisible opacity-0';

  return (
    <Modal setModal={setModal} hiddenStyle={hidden}>
      <section className={`shadows fixed z-50 overflow-auto bg-white transition-all duration-300 ${hidden} px-12 pb-28`}>
        <button onClick={() => setModal(false)} className="absolute right-8 top-8 text-2xl hover:opacity-50">
          <LiaTimesSolid />
        </button>

        <div className="flex flex-col items-center justify-center gap-12">
          {signRequest === '' ? (
            <>
              <h2 className="pt-20 text-2xl">{createUser ? 'Join Medium' : 'Welcome Back'}</h2>
              <div className="flex flex-col gap-2">
                <AuthButton onClick={handleGoogleAuth} icon={<FcGoogle className="text-xl" />} text={`${createUser ? 'Sign Up' : 'Sign In'} With Google`} />
                <AuthButton
                  onClick={() => setSignRequest(createUser ? 'sign-up' : 'sign-in')}
                  icon={<MdFacebook className="text-xl text-blue-600" />}
                  text={`${createUser ? 'Sign Up' : 'Sign In'} With Facebook`}
                />
                <AuthButton
                  onClick={() => setSignRequest(createUser ? 'sign-up' : 'sign-in')}
                  icon={<AiOutlineMail className="text-xl" />}
                  text={`${createUser ? 'Sign Up' : 'Sign In'} With Email`}
                />
              </div>
              <p>
                {createUser ? 'Already have an account' : 'No Account'}
                <button onClick={() => setCreateUser(!createUser)} className="ml-1 font-bold text-green-600 hover:text-green-700">
                  {createUser ? 'Sign In' : 'Create one'}
                </button>
              </p>
            </>
          ) : signRequest === 'sign-in' ? (
            <LogIn setModal={setModal} setSignRequest={setSignRequest} />
          ) : signRequest === 'sign-up' ? (
            <Signup setModal={setModal} setSignRequest={setSignRequest} />
          ) : null}

          <p className="max-w-[30rem] text-center text-sm">
            {createUser
              ? "Click Sign Up to agree to Medium's Terms of Service and ackownledge that Medium's Privacy Policy applies to you."
              : "Click Sign In to agree to Medium's Terms of Service and ackownledge that Medium's Privacy Policy applies to you."}
          </p>
        </div>
      </section>
    </Modal>
  );
};

export default Auth;
