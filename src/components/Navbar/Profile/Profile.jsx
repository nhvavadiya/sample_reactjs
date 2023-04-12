import React, { useState } from 'react'
import { X } from "react-feather";
import Select from "react-select";
import validator from 'validator';

import fileProfileCircle from '../../../assets/profile-circle.svg';
import { ReactComponent as CloseEye } from '../../../assets/close_eye.svg';
import { ReactComponent as OpenEye } from '../../../assets/open_eye.svg';
import { ReactComponent as LockIcon } from '../../../assets/password.svg';

import './Profile.css'

import Modal from "../../Modal/Modal";
import { errorNotification, successNotification } from '../../toast-notification/common-toast';

const Profile = (props) => {
    const [file, setFile] = useState(null);
    const [pause, setPause] = useState(false);
    const [fullName, setFullName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [about, setAbout] = useState("");
    const [selectedOptions, setSelectedOptions] = useState();
    const [values, setValues] = useState({
        currentpassword: "",
        showCurrentPassword: false,
    });

    const [newvalues, setNewValues] = useState({
        newPassword: "",
        showNewPassword: false,
    });

    const [confirmvalues, setConfirmValues] = useState({
        confirmPassword: "",
        showConfirmPassword: false,
    });

    const optionList = [
        { value: "default", label: "System Default" },
        { value: "dark", label: "Dark" },
        { value: "light", label: "Light" },
    ];

    // For select assignee style
    const colorStyles = {
        option: (styles) => {
            return {
                ...styles,
                // color: "var(--dropdown-background-color)",
                color: "black",
            };
        }
    };

    // For save user profile picture
    function handleChange(e) {
        // console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const handleNotification = (e) => {
        console.log("e---->", e.target.value)
        setPause(!pause)

    }

    // For take input of current password
    const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // For take input of new password
    const handleNewPasswordChange = (props) => (event) => {
        setNewValues({ ...newvalues, [props]: event.target.value });
    }

    // For take input of confirm password
    const handleConfirmPasswordChange = (props) => (event) => {
        setConfirmValues({ ...confirmvalues, [props]: event.target.value })
    }

    // For hide and show current password
    const handleClickShowPassword = () => {
        setValues({ ...values, showCurrentPassword: !values.showCurrentPassword });
    };

    // For hide and show new password
    const handleClickNewShowPassword = () => {
        setNewValues({ ...newvalues, showNewPassword: !newvalues.showNewPassword });
    }

    // For hide and show confirm password
    const handleClickConfirmShowPassword = () => {
        setConfirmValues({ ...confirmvalues, showConfirmPassword: !confirmvalues.showConfirmPassword })
    }

    //For remove all the input value
    const handleCancel = () => {
        setValues({ ...values, currentpassword: "" });
        setNewValues({ ...newvalues, newPassword: "" })
        setConfirmValues({ ...confirmvalues, confirmPassword: "" })
    }

    // For set theme value
    const setAssignee = (value) => {
        console.log("type==>", typeof props.theme, typeof value)
        if(value.value !== props.theme){
        setSelectedOptions(value)
            props.switchTheme()
        }
        // setValues({ ...values, assignee: value })
    }

    // For save changes of user profile
    const handleSaveChanges = (e) => {
        e.preventDefault();
        // Save profile API call here
    }

    // For Update Password
    const handleUpdatedPassword = () => {
        if (validator.isEmpty(values.currentpassword)) {
            errorNotification('Please Enter Current Password.');
        }
        else if (validator.isEmpty(newvalues.newPassword)) {
            errorNotification('Please Enter New Password.');
        }
        else if (!validator.isStrongPassword(newvalues.newPassword)) {
            errorNotification('Your New Password is not Strong enough.');
        }
        else if (validator.isEmpty(confirmvalues.confirmPassword)) {
            errorNotification('Please Enter Confirm Password.');
        }
        else if (!validator.equals(values.currentpassword, confirmvalues.confirmPassword)) {
            errorNotification('Password and Confirm Password are must be same.');
        }
        else {
            //Update Password API call here
            successNotification("Your Password is Updated Successfully!");
            setValues({ ...values, currentpassword: "" });
            setNewValues({ ...newvalues, newPassword: "" })
            setConfirmValues({ ...confirmvalues, confirmPassword: "" })
        }
    }

    return (
        <>
            <Modal onClose={props.onClose}>
                <div className='main__profile__section'>
                    <div className="d-flex justify-content-between pb-4">
                        <h4 className="text-center ms-0">
                            <b>My Profile</b>
                        </h4>
                        <X
                            onClick={() => props.onClose(false)}
                            style={{ cursor: "pointer", width: "24px", height: "24px" }}
                        />
                    </div>
                    <div className='profile__tab'>
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Profile</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Notification</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Account</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-display-tab" data-bs-toggle="pill" data-bs-target="#pills-display" type="button" role="tab" aria-controls="pills-display" aria-selected="false">Display</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                <div>
                                    <img src={fileProfileCircle} alt='profile-img' />
                                    {/* {
                                        file ?
                                            <img src={file} alt="user-img" /> :
                                            <fileProfileCircle />
                                    } */}
                                    {
                                        file ?
                                            <img src={file} alt='selected-profile' /> :
                                            <>
                                                <label for="img" className="btn btn-info upload-btn">Upload Photo</label>
                                                <input type="file" id="img" style={{ display: "none" }} onChange={handleChange}></input>
                                            </>
                                    }

                                    <form className="row g-3 mt-3 profile__form">
                                        <div className="col-md-6">
                                            <label for="inputEmail4" className="form-label">Full Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputEmail4"
                                                placeholder="Enter Full Name"
                                                value={fullName}
                                                onChange={(e) => { setFullName(e.target.value) }}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="inputPassword4" className="form-label">Job Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputPassword4"
                                                placeholder="Enter Job Title"
                                                value={jobTitle}
                                                onChange={(e) => { setJobTitle(e.target.value) }}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="inputEmail4" className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="inputEmail4"
                                                placeholder="Enter Email"
                                                value={email}
                                                onChange={(e) => { setEmail(e.target.value) }}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="inputPassword4" className="form-label">Department or Team</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputPassword4"
                                                placeholder="Enter Department or Team"
                                                value={department}
                                                onChange={(e) => { setDepartment(e.target.value) }}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label for="inputAddress2" className="form-label">About Me</label>
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                id="inputAddress2" rows={3}
                                                placeholder="we are exicted to know abot you..."
                                                value={about}
                                                onChange={(e) => { setAbout(e.target.value) }}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <button className="btn save__change__btn" onClick={(e) => handleSaveChanges(e)}>Save Changes</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                <div className='d-flex justify-content-evenly align-items-center'>
                                    <h5>Notification</h5>
                                    <div>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            id="checkbox"
                                            style={{ transition: "all 200ms" }}
                                            onChange={handleNotification}
                                            checked={pause ? true : false}
                                        />
                                        <label htmlFor="checkbox" className="label">
                                            <div className="ball" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                <div className='profile__pwd__section'>
                                    <h5 className='ms-0'>Update Password</h5>
                                    <div className='mt-3'>
                                        <span>Current Password</span>
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <input type={values.showCurrentPassword ? "text" : "password"}
                                            onChange={handlePasswordChange("currentpassword")}
                                            value={values.currentpassword}
                                            placeholder='Enter Password'
                                        />
                                        <span className='lock__icon'><LockIcon alt='lock icon' /></span>
                                        <span className='eye__icons' onClick={handleClickShowPassword}>{values.showCurrentPassword ? <OpenEye alt='open-eye' /> : <CloseEye alt='close-eye' />}</span>
                                    </div>

                                    <div className='mt-4'>
                                        <span>New Password</span>
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <input type={newvalues.showNewPassword ? "text" : "password"}
                                            onChange={handleNewPasswordChange("newPassword")}
                                            value={newvalues.newPassword}
                                            placeholder='Enter Password'
                                        />
                                        <span className='lock__icon'><LockIcon alt='lock icon' /></span>
                                        <span className='eye__icons' onClick={handleClickNewShowPassword}>{newvalues.showNewPassword ? <OpenEye alt='open-eye' /> : <CloseEye alt='close-eye' />}</span>
                                    </div>

                                    <div className='mt-4'>
                                        <span>Confirm New Password</span>
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <input type={confirmvalues.showConfirmPassword ? "text" : "password"}
                                            onChange={handleConfirmPasswordChange("confirmPassword")}
                                            value={confirmvalues.confirmPassword}
                                            placeholder='Enter Password'
                                        />
                                        <span className='lock__icon'><LockIcon alt='lock icon' /></span>
                                        <span className='eye__icons' onClick={handleClickConfirmShowPassword}>{confirmvalues.showConfirmPassword ? <OpenEye alt='open-eye' /> : <CloseEye alt='close-eye' />}</span>
                                    </div>
                                </div>
                                <div className="d-flex mt-4">
                                    <button type="submit" className="btn save__change__btn" style={{ width: "110px" }} onClick={handleUpdatedPassword}>Save</button>
                                    <button className="btn cancel__btn" onClick={handleCancel}>Cancel</button>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-display" role="tabpanel" aria-labelledby="pills-display-tab">
                                <div className='select__theme'>
                                    <h6>Theme</h6>
                                    <Select
                                        styles={colorStyles}
                                        options={optionList}
                                        placeholder="Select theme"
                                        value={props.theme === "dark" ? {value: "dark", label:"Dark"} : {value: "light", label:"Light"}}
                                        onChange={(e) => setAssignee(e)}
                                        // onChange={(e) => setValues([...values, {"assignee": e.target}])}
                                        isSearchable={true}
                                        className='select__assignee mt-3'
                                    // isMulti
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Profile