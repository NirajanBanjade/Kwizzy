import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './login_view/Register';
import Home_page from './home_page/Home_page';
import Quiz from './pages/Quiz';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // useEffect(() => {
  //   localStorage.clear();
  // }, []);
  

  useEffect(() => {
    // Check login status on mount
    const username = localStorage.getItem('username');
    setIsLoggedIn(!!username);
  }, []);

  const handleLoginSuccess = (username) => {
    localStorage.setItem('username', username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Register onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home_page onLogout={handleLogout} />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;