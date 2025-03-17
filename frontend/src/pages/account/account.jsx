import React from 'react'
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import './account.css'
import { UserData } from '../../context/UserContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Account = ({user}) => {
  const {setIsAuth, setUser}=UserData();
  const navigate = useNavigate()
  const logoutHandler = ()=>{
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("logged out");
    navigate("/login");
  };
  return (
    <div>
       {user &&(
         <div className="profile">
         <h2>My Profile</h2>
         <div className="profile-info">
            <p>
                <strong>Name:</strong>{user.name}
            </p>
            <p>
                <strong>Email:</strong>{user.email}
            </p>

            <button className='common-btn'><MdSpaceDashboard />
            Dashboard</button>

            <button onClick={logoutHandler} className='common-btn'style={{background:'red'}}><IoIosLogOut /> Logout</button>
     </div>

 </div>
       )};
    </div>
  );
};

export default Account;