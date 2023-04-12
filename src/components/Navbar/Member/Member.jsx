import React, { useState } from "react";
import { X } from "react-feather";
import Select from "react-select";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Modal from '../../Modal/Modal';

import userImg from '../../../assets/userimg.svg';
import userImg1 from '../../../assets/userimg1.svg';
import userImg2 from '../../../assets/userimg2.svg';
import userImg3 from '../../../assets/userimg3.svg';
import './Member.css'



const Member = (props) => {
    const [values, setValues] = useState({ ...props.card });
    const [selectedOptions, setSelectedOptions] = useState();

    const optionList = [
        { value: "assignee", label: "Select Assignee" },
        { value: "jemin", label: "Jemin Kukadiya" },
        { value: "tejas", label: "Tejas Patoliya" },
        { value: "yash", label: "Yash Bhanvadiya" },
        { value: "maulik", label: "Maulik Vaghasiya" },
        { value: "mayank", label: "Mayank Vora" }
    ];

    const permissionList = [
        {value: "edit", label: "Can edit"},
        {value: "edit", label: "Can view"},
        {value: "edit", label: "Remove from project"}
    ]
    const defaultOption = permissionList[0];

    const userData = [{ id: 1, userImg: userImg1, name: "Yash Bhanvadiya", email: "yash@gmail.com" },
    { id: 2, userImg: userImg2, name: "Tejas Patoliya", email: "tejas@gmail.com" },
    { id: 3, userImg: userImg3, name: "Jemin Kukadiya", email: "jemin@gmail.com" },
    { id: 4, userImg: userImg1, name: "Priya", email: "priya@gmail.com" },
    { id: 5, userImg: userImg1, name: "Maulik Vaghasiya", email: "Maulik@gmail.com" },
    { id: 6, userImg: userImg1, name: "Maulik Vaghasiya", email: "Maulik@gmail.com" },
    { id: 7, userImg: userImg1, name: "Maulik Vaghasiya", email: "Maulik@gmail.com" },
    { id: 8, userImg: userImg1, name: "Tejas", email: "tejas@gmail.com" }]

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

    // For set assigneee value
    const setAssignee = (value) => {
        if (value.value === "assignee") {
            setSelectedOptions("")
            setValues({ ...values, assignee: "" })
        } else {
            setSelectedOptions(value)
            setValues({ ...values, assignee: value })
        }
    }

    return (
        <div className='project__member'>
            <Modal onClose={props.onClose}>
                <div className='p-4'>
                    <div className="d-flex justify-content-between pb-4">
                        <h4 className="text-center ms-0">
                            <b>Share Project</b>
                        </h4>
                        <X
                            onClick={() => props.onClose(false)}
                            style={{ cursor: "pointer", width: "24px", height: "24px" }}
                        />
                    </div>
                    <h5>Invite with email</h5>
                    <div className='row mb-3'>
                        <div className='col-10'>
                            <Select
                                styles={colorStyles}
                                options={optionList}
                                placeholder="Add members by name or email..."
                                value={values.assignee ? values.assignee : selectedOptions}
                                onChange={(e) => setAssignee(e)}
                                // onChange={(e) => setValues([...values, {"assignee": e.target}])}
                                isSearchable={true}
                                className='w-100 select__invite__member'
                            // isMulti
                            />
                        </div>
                        <div className='col-2'>
                            <button className='invite__btn'>invite</button>
                        </div>
                    </div>
                </div>
                <hr />
                <h5 className="mt-4">Members ({userData.length})</h5>

                <div className='p-4'>
                    {userData.map((item, index) => {
                        return <>
                            <div className="row member__permission">
                                <div key={index} className='d-flex align-items-center mt-3 mb-3 col-10'>
                                    <img src={item.userImg} className="member__profile" alt='user-img' />
                                    <div className='ms-2'>
                                        <h6 className='m-0'>{item.name}</h6>
                                        <p className='m-0'>{item.email}</p>
                                    </div>
                                </div>
                                <div className="col-2">
                                <Dropdown options={permissionList} value={defaultOption} placeholder="Select an option" />
                                    {/* <Select
                                        styles={colorStyles}
                                        options={permissionList}
                                        placeholder="can edit"
                                        //   value={values.assignee ? values.assignee : selectedOptions}
                                        //   onChange={(e) => setAssignee(e)}F
                                        // onChange={(e) => setValues([...values, {"assignee": e.target}])}
                                        isSearchable={true}
                                        className='select__assignee'
                                    // isMulti
                                    /> */}
                                </div>
                            </div>
                        </>
                    })}
                </div>
            </Modal>
        </div>
    )
}

export default Member