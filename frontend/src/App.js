import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AddPeople from './pages/AddPeople';
import Role from './pages/Role';
import "bootstrap/dist/css/bootstrap.css"

const App = () => {
    //const loggedUser = { name: "John Doe" }; // This should come from authentication logic

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />
                <Route path="/addpeople" element={<AddPeople />} />
                <Route path="/role" element={<Role />} />
            </Routes>
        </Router>
    );
};

export default App;
