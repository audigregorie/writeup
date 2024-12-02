import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';
import HomeHeader from './page/Home/HomeHeader';
import DemoHomeHeader from './page/DemoHome/DemoHomeHeader';
import DemoHome from './page/DemoHome/DemoHome';
import Home from './page/Home/Home';

function App() {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser ? <HomeHeader /> : <DemoHomeHeader />}
      <Routes>
        {currentUser && <Route path="/" element={<Home />} />}
        {!currentUser && <Route path="/demo" element={<DemoHome />} />}
        <Route path="*" element={<Navigate to={!currentUser ? '/demo' : '/'} />} />
      </Routes>
    </>
  );
}

export default App;
