import React, { useState } from "react";
import Member from "./Member/Member";
import { ChevronDown } from "react-feather";
import { useNavigate } from "react-router-dom";


import SearchIcon from '../../assets/search.svg';
import userImg from '../../assets/userimg.svg';
import userImg1 from '../../assets/userimg1.svg';
import userImg2 from '../../assets/userimg2.svg';
import userImg3 from '../../assets/userimg3.svg';
import { ReactComponent as SettingIcon } from '../../assets/setting.svg';
import { ReactComponent as ProfileCircleIcon } from '../../assets/profilecircle.svg';
import { ReactComponent as PrivacyIcon } from '../../assets/privacy-policy.svg';
import { ReactComponent as LogoutIcon } from '../../assets/logout.svg';

import "./Navbar.css";

import Profile from "./Profile/Profile";

export default function Navbar(props) {
  let navigate = useNavigate()
  const [modalShow, setModalShow] = useState(false);
  const [assigneeModal, setAssigneeModal] = useState(false)

  const userData = [{ id: 1, userImg: userImg1, name: "Yash Bhanvadiya" },
  { id: 2, userImg: userImg2, name: "Tejas Patoliya" },
  { id: 3, userImg: userImg3, name: "Jemin Kukadiya" },
  { id: 4, userImg: userImg1, name: "Priya" },
  { id: 5, userImg: userImg1, name: "Maulik Vaghasiya" },
  { id: 6, userImg: userImg1, name: "Maulik Vaghasiya" },
  { id: 7, userImg: userImg1, name: "Maulik Vaghasiya" },
  { id: 8, userImg: userImg1, name: "Tejas" }]

  // For Logout 
  const handleLogout = () => {
    navigate("/")
  }
  return (
    <>
      <div className="navbar">
        <h2>Kanban Board</h2>
        <div className="nav__searchbar d-none">
          <img src={SearchIcon} alt="search icon" />
          <input placeholder="Search task" />
        </div>

        <div className="user__profile__section">
         {assigneeModal && <Member onClose={setAssigneeModal} theme={props.theme} switchTheme={props.switchTheme} /> }
          <div className="responsible__section" onClick={() => {
                  setAssigneeModal(true);
                }}>
            {userData.length >= 2 && userData.map((item, index) => {
              return (
                index <= 2 ?
                  <div className="res__user" key={index}>
                    <img src={item.userImg} alt="user icon" />
                  </div> : ""
              )
            })
            }
            <div className="other__user btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" type="button">+{userData.length - 3}</div>
           
          </div>

          <div className="profile__section">
            <img src={userImg} className='user__icon' alt="user icon" />
            <h5>Jhon K</h5>
            <div className="btn-group">
              <button className="more__icon btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><ChevronDown /></button>
              {modalShow && <Profile onClose={setModalShow} theme={props.theme} switchTheme={props.switchTheme} />}
              <ul className="dropdown-menu">
                <li onClick={() => {
                  setModalShow(true);
                }}><ProfileCircleIcon className="nav__icon" /> My Profile</li>
                <hr />
                <li><SettingIcon className="nav__icon" /> My Settings</li>
                <hr />
                <li><PrivacyIcon className="nav__icon" /> Privacy Policy</li>
                <hr />
                <li onClick={handleLogout}><LogoutIcon className="nav__icon" /> Logout</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            style={{ transition: "all 200ms" }}
            onChange={props.switchTheme}
            checked={props.theme === "dark" ? true : false}
          />
          <label htmlFor="checkbox" className="label">
            <i className="fas fa-moon fa-sm"></i>
            <i className="fas fa-sun fa-sm"></i>
            <div className="ball" />
          </label>
        </div>
        {/* <button>Switch theme</button> */}
      </div>

    </>
  );
}
