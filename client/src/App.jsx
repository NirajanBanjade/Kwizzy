import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Register from './login_view/Register';
import Home_page from './home_page/home_page';
import Quiz from './pages/Quiz';
import SidebarLayout from "./sidebar/Sidebarlayout";
import UserProfile from './profile/Profile';  // create if missing
import Analytics from './analytics/Analytics';      // create if missing
import History from './History/history';          // create if missing
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('username');
    setIsLoggedIn(!!username);
  }, []);

  const handleLoginSuccess = (username) => {
    localStorage.setItem('username', username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Register onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <BrowserRouter>
<Routes>
  <Route path="/" element={<SidebarLayout />}>
    <Route index element={<Navigate to="/home" />} />
    <Route path="home" element={<Home_page />} />
    <Route path="quiz" element={<Quiz />} />
    <Route path="userprofile" element={<UserProfile />} />
    <Route path="analytics" element={<Analytics />} />
    <Route path="history" element={<History />} />
    <Route path="*" element={<Navigate to="/home" />} />
  </Route>
</Routes>

    </BrowserRouter>
  );
}

export default App;
