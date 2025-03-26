import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/header/header';
import Login from './pages/auth/login';
import Registration from './pages/auth/Registration';
import Verify from './pages/auth/Verify';
import Footer from './components/footer/footer';
import About from './pages/about/about';
import Account from './pages/account/account';
import { UserData } from './context/UserContext';
import Loading from './components/loading/Loading';
import Courses from './pages/courses/Courses';
import CourseDescription from './pages/coursedescription/CourseDescription';
import PaymentSuccess from './pages/paymentsuccess/PaymentSuccess';
import ContactPage from './pages/contact/Contact';
import Dashboard from './pages/dashboard/Dashboard';
import Coursestudy from './pages/coursestudy/Coursestudy';
import Lecture from './pages/lecture/Lecture';


const App = () => {
  const { isAuth, user, loading } = UserData();
  
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Header isAuth={isAuth} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/account" element={isAuth ? <Account user={user} /> : <Login />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route path="/register" element={isAuth ? <Home /> : <Registration />} />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
            <Route path="/course/:id" element={isAuth ? <CourseDescription user={user} /> : <Login />} />
            <Route path="/payment-success/:id" element={isAuth ? <PaymentSuccess user={user} /> : <Login />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/:id/dashboard" element={isAuth ? <Dashboard user={user} /> : <Login />} />
            <Route path="/course/study/:id" element={isAuth ? <Coursestudy user={user} /> : <Login />} />
            <Route path="/lectures/:id" element={isAuth ? <Lecture user={user} /> : <Login />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
