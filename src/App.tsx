import { Navigate, Route, Routes } from 'react-router-dom';
import DemoHome from './pages/DemoHome/DemoHome';
import DemoHomeHeader from './pages/DemoHome/DemoHomeHeader';
import Home from './pages/Home/Home';
import HomeHeader from './pages/Home/HomeHeader';
import { useAuth } from './context/AuthProvider';

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
