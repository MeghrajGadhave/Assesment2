import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AddPeople from './AddPeople';
import Role from './Role';
import '../styles/Home.css';

// const Home = ({ loggedUser }) => {
//     const [activeTab, setActiveTab] = useState('home');
//     const [showLogoutPopup, setShowLogoutPopup] = useState(false);
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         navigate('/login');
//     };

//     return (
//         <div className="home-container">
//             <header className="home-header">
//                 <div className="logo-container">
//                     <img className="logo" src="https://digitalflake.com/wp-content/uploads/2023/04/DF_logo-transparent2.png" alt="DigitalFlake Logo" />
//                 </div>
//                 <div className="user-info">
//                     <span className="user-name"></span>
//                     <button className="logout-button" onClick={() => setShowLogoutPopup(true)}>Logout</button>
//                 </div>
//             </header>
//             <div className="home-body">
//                 <nav className="sidebar">
//                     <ul>
//                         <li className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>Home</li>
//                         <li className={activeTab === 'addPeople' ? 'active' : ''} onClick={() => setActiveTab('addPeople')}>Add People</li>
//                         <li className={activeTab === 'role' ? 'active' : ''} onClick={() => setActiveTab('role')}>Role</li>
//                     </ul>
//                 </nav>
//                 <div className="content">
//                     {activeTab === 'home' && (
//                         <div className="home-content">
//                             <img className="logo1" src="https://digitalflake.com/wp-content/uploads/2023/04/DF_logo-transparent2.png" alt="DigitalFlake Logo" />
//                             <h4>Welcome To Admin Panel</h4>
//                         </div>
//                     )}
//                     {activeTab === 'addPeople' && <AddPeople />}
//                     {activeTab === 'role' && <Role />}
//                 </div>
//             </div>

//             {showLogoutPopup && (
//                 <div  className="popup">
//                     <div className="popup-inner">
//                         <h3>Are you sure you want to logout?</h3>
//                         <button class="btn btn-primary updateBtn" onClick={handleLogout}>Yes</button>
//                         <button class="btn btn-danger" onClick={() => setShowLogoutPopup(false)}>No</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Home;

const Home = ({ loggedUser }) => {
    const [activeTab, setActiveTab] = useState('home');
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Added state for login status
    const navigate = useNavigate();

    useEffect(() => { // Added useEffect to check login status
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false); // Update login status
        navigate('/login');
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <div className="logo-container">
                    <img className="logo" src="https://digitalflake.com/wp-content/uploads/2023/04/DF_logo-transparent2.png" alt="DigitalFlake Logo" />
                </div>
<div className="user-info">
    {isLoggedIn ? (
        <>
            <span className="user-name">{loggedUser ? loggedUser.name : 'User'}</span>
            <button className="logout-button" onClick={() => setShowLogoutPopup(true)}>Logout</button>
        </>
    ) : (
        <>
            <button className="login-button" onClick={() => navigate('/login')}>Login</button>
            <button className="register-button" onClick={() => navigate('/register')}>Register</button>
        </>
    )}
</div>

            </header>
            <div className="home-body">
                <nav className="sidebar">
                    <ul>
                        <li className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>Home</li>
                        {isLoggedIn && (
    <>
        <li className={activeTab === 'addPeople' ? 'active' : ''} onClick={() => setActiveTab('addPeople')}>User</li>
        <li className={activeTab === 'role' ? 'active' : ''} onClick={() => setActiveTab('role')}>Role</li>
    </>
)}

                    </ul>
                </nav>
                <div className="content">
                    {activeTab === 'home' && (
                        <div className="home-content">
                            <img className="logo1" src="https://digitalflake.com/wp-content/uploads/2023/04/DF_logo-transparent2.png" alt="DigitalFlake Logo" />
                            <h4>Welcome To Admin Panel</h4>
                        </div>
                    )}
                    {activeTab === 'addPeople' && <AddPeople />}
                    {activeTab === 'role' && <Role />}
                </div>
            </div>

            {showLogoutPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <h3>Are you sure you want to logout?</h3>
                        <button className="btn btn-primary updateBtn" onClick={handleLogout}>Yes</button>
                        <button className="btn btn-danger" onClick={() => setShowLogoutPopup(false)}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;