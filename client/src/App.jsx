import { useState, useEffect } from 'react';
import './App.css';
import Register from './login_view/Register';
import Home_page from './home_page/Home_page';
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

  return (
    <>
      {isLoggedIn ? (
        <Home_page onLogout={handleLogout} />
      ) : (
        <Register onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}

export default App;