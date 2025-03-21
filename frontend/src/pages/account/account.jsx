import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import "./account.css";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser(null); // Changed from [] to null
    setIsAuth(false);
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <div>
      {user ? (
        <div className="profile">
          <h2>My Profile</h2>
          <div className="profile-info">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <button onClick = {()=>navigate(`/${user._id}/dashboard`)} className="common-btn">
              <MdSpaceDashboard /> Dashboard
            </button>

            <button
              onClick={logoutHandler}
              className="common-btn"
              style={{ background: "red" }}
            >
              <IoIosLogOut /> Logout
            </button>
          </div>
        </div>
      ) : (
        <p>User not logged in</p>
      )}
    </div>
  );
};

export default Account;