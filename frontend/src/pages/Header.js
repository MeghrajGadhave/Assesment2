// // Header.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/Header.css'; // Make sure to import your CSS file

// const Header = ({ user }) => {
//     const [showLogoutPopup, setShowLogoutPopup] = useState(false);
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         setShowLogoutPopup(true);
//     };

//     const confirmLogout = () => {
//         localStorage.removeItem('token');
//         navigate('/login');
//     };

//     const cancelLogout = () => {
//         setShowLogoutPopup(false);
//     };

//     return (
//         <div className="header">
//             <img className="logo" src="https://digitalflake.com/wp-content/uploads/2023/04/DF_logo-transparent2.png" alt="DigitalFlake Logo" />
//             <div className="header-right">
//                 <span>{user.name}</span>
//                 <button onClick={handleLogout} className="logout-button">Logout</button>
//             </div>
//             {showLogoutPopup && (
//                 <div className="logout-popup">
//                     <p>Are you sure you want to logout?</p>
//                     <button onClick={confirmLogout} className="confirm-button">Yes</button>
//                     <button onClick={cancelLogout} className="cancel-button">No</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Header;
