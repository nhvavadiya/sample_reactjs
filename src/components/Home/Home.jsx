import React, { useState } from 'react'
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom'
import validator from 'validator';

import { ReactComponent as PlusIcon } from '../../assets/plus.svg';
import ProjectIcon from '../../assets/project_icon.svg'

import "./Home.css"

import { errorNotification } from '../toast-notification/common-toast'

const Home = (props) => {
    const { theme } = props;
    let navigate = useNavigate();
    const [projectName, setProjectName] = useState("");

    const handleAdd = () => {
        navigate("/DraggableBoard")
    };
    const handleBack = () => {
        navigate("/")
    };

    let timeOfDay;
    const currentHours = new Date().getHours();

    if (currentHours < 12) {
        timeOfDay = 'Morning';
    } else if (currentHours >= 12 && currentHours < 17) {
        timeOfDay = 'Afternoon';
    } else if (currentHours >= 17 && currentHours < 20) {
        timeOfDay = 'Evening';
    } else {
        timeOfDay = 'Night';
    };

    const projectList = [
        {
            id: 1,
            name: "Decoration App"
        },
        {
            id: 2,
            name: "Pet Care Software"
        },
        {
            id: 3,
            name: "Fitness App"
        },
        {
            id: 4,
            name: "Decoration App"
        },
        {
            id: 5,
            name: "Fitness App"
        },
        {
            id: 6,
            name: "Mobile App"
        },
    ];

    // For Adding new project
    const handleAddNewProject = () => {
        if (validator.isEmpty(projectName)) {
            errorNotification('Please Enter Project Name.');
        }
        else {
            //Add Project API call here
            navigate("/DraggableBoard");
        }
    }

    return (
        <>
            <div className='home__section' data-theme={theme}>
                <button onClick={handleBack}>Back</button>
                <button onClick={handleAdd}>Add</button>
                <div className='header__section'>
                    <h5 style={{ textAlign: "center" }}>{moment(new Date()).format("dddd")}, {moment(new Date().getMonth()).format("MMMM")} {new Date().getDate(0)}</h5>
                    <h3 style={{ textAlign: "center" }}>Good {timeOfDay}, Jhon</h3>
                </div>
                <div className='project__section'>
                    <div className="create__section">
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <span className="create__icon">
                                <PlusIcon alt='plus icon' />
                            </span>
                            Create Project
                        </button>
                    </div>
                    <div className='listing__section'>
                        <div className='listing_title'>
                            <h5>Project List</h5>
                        </div>
                        <div className='project__list'>
                            {projectList.map((item, index) => {
                                return (
                                    <div className='project' key={index}>
                                        <span>
                                            <img src={ProjectIcon} alt="project icon" />
                                        </span>
                                        {item.name}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add New Project</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className='addproject__section'>
                                    <div style={{ position: 'relative' }}>
                                        <input type='text' placeholder='Enter Your Project Name' value={projectName} onChange={(e) => { setProjectName(e.target.value) }} />
                                        <span className='addproject__icon'><img src={ProjectIcon} alt='user icon' /></span>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-cancle" data-bs-dismiss="modal" onClick={() => { setProjectName("") }}>Cancle</button>
                                <button type="button" className="btn btn-create" data-bs-dismiss="modal" onClick={handleAddNewProject}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Home