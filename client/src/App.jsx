import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Register from './login_view/Register';
import Home_page from './home_page/Home_page';
import Quiz from './quiz/Quiz'
import Sidebar from './sidebar/Sidebar';
import UserProfile from './profile/Profile';
import Analytics from './analytics/Analytics';
import History from './History/history';
import 'bootstrap/dist/css/bootstrap.min.css';
import Display_quiz from './quiz/Display_quiz';
import Quiz_details from './quiz_details/quiz_details';
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
    // Clear localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('email'); // if you store email
    
    // Clear sessionStorage (if you use it)
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    
    // Clear all localStorage at once (alternative approach)
    localStorage.clear();
    
    // Update state
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Register onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <BrowserRouter>
      <div className="layout"> {/* Shared layout */}
        <Sidebar onLogout={handleLogout} /> {/* Always visible */}
        <div className="main-content">
          <Routes>
            {/* <Route path="/" element={<Navigate to="/home" />} /> */}
            <Route path="/" element={<Home_page />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/history" element={<History />} />
            <Route path="/display_quiz" element={<Display_quiz />} />
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/quiz/:quizId" element={ <Quiz_details />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
