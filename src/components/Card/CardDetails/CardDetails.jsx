import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { X } from "react-feather";
import { v4 as uuidv4 } from "uuid";

import { ReactComponent as TickSquare } from '../../../assets/tick-square.svg';
import { ReactComponent as TrashIcon } from '../../../assets/trash.svg';
import { ReactComponent as TagIcon } from '../../../assets/tag.svg';
import { ReactComponent as UserIcon } from '../../../assets/user-icon.svg';

import "./CardDetails.css";
import "react-datepicker/dist/react-datepicker.css";

import Modal from "../../Modal/Modal";
import Label from "../../Label/Label";
import Editable from "../../Editable/Editable";
import { errorNotification } from "../../toast-notification/common-toast";

export default function CardDetails(props) {
  // const { theme } = props;
  const colors = ["#61bd4f", "#f2d600", "#ff9f1a", "#eb5a46", "#c377e0"];

  const [values, setValues] = useState({ ...props.card });
  const [input, setInput] = useState(false);
  const [text, setText] = useState(values.title);
  const [labelShow, setLabelShow] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [carddescription, setCardDescription] = useState("")
  const [cmtData, setCmtdata] = useState("")
  // const [markComplete, setMarkComplete] = useState(values?.status ? values.status : false)
  const [comment, setComment] = useState([{
    userName: "Jemin Kukadiya",
    comment: "Drag and Drop Reorder functionality of photos in photos Tab",
    addTime: ""
  }])


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

  // For task title
  const Input = (props) => {
    return (
      <div className="modal__title">
        <input
          autoFocus
          defaultValue={text}
          type={"text"}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
    );
  };

  // For adding new task in Card
  const addTask = (value) => {
    values.task.push({
      id: uuidv4(),
      task: value,
      completed: false,
    });
    setValues({ ...values });
  };

  // For remove single sub-task from Card
  const removeTask = (id) => {
    const remaningTask = values.task.filter((item) => item.id !== id);
    setValues({ ...values, task: remaningTask });
  };

  // For remove all sun-task from Card
  const deleteAllTask = () => {
    setValues({
      ...values,
      task: [],
    });
  };


  // For update task
  const updateTask = (id) => {
    const taskIndex = values.task.findIndex((item) => item.id === id);
    values.task[taskIndex].completed = !values.task[taskIndex].completed;
    setValues({ ...values });
  };
  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };

  // For calculate complete sub-task percantage
  const calculatePercent = () => {
    const totalTask = values.task.length;
    const completedTask = values.task.filter(
      (item) => item.completed === true
    ).length;

    return Math.floor((completedTask * 100) / totalTask) || 0;
  };

  // For remove tag from card 
  const removeTag = (id) => {
    const tempTag = values.tags.filter((item) => item.id !== id);
    setValues({
      ...values,
      tags: tempTag,
    });
  };

  // For add new tag in card
  const addTag = (value, color) => {
    values.tags.push({
      id: uuidv4(),
      tagName: value,
      color: color,
    });

    setValues({ ...values });
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

  // For set task due-date
  const handleStartDate = (value) => {
    setStartDate(value)
    setValues({ ...values, duedate: value })
  }

  // for add card description
  const handleCarddesc = (value) => {
    setCardDescription(value)
    setValues({ ...values, carddesc: value })
  }

  // For add comment in on task
  const handleAddcomment = () => {
    if (cmtData === "") {
      errorNotification("Please Enter Comment");
    }
    else {
      let timeago = JSON.stringify(new Date());
      setComment([...comment, { userName: "Jemin Kukadiya", comment: cmtData, addTime: timeago }])
      setCmtdata("")
      if (values.comments != null) {
        var totalcmt = [...values.comments, comment[comment.length - 1]]
        setValues({ ...values, comments: totalcmt })
      } else {
        setValues({ ...values, comments: [{ userName: "Jemin Kukadiya", comment: cmtData, addTime: timeago }] })
      }
    }
  }

  // For enter key press
  const handleKeyPress = (e) => {
    if (e.which === 13) {
      if (cmtData !== "") {
        handleAddcomment();
        setCmtdata("")
      }
      else {
        errorNotification("Please Enter Comment");
      }
    }
  }

  // For enter key press for board name
  const handelClickListner = (e) => {
    if (e.code === "Enter") {
      setInput(false);
      updateTitle(text === "" ? values.title : text);
    } else return;
  };

  // const handleMarkComplete = () => {
  //   setValues({ ...values, status: markComplete })
  //   setMarkComplete(!markComplete)
  // }

  const optionList = [
    { value: "assignee", label: "Select Assignee" },
    { value: "jemin", label: "Jemin Kukadiya" },
    { value: "tejas", label: "Tejas Patoliya" },
    { value: "yash", label: "Yash Bhanvadiya" },
    { value: "maulik", label: "Maulik Vaghasiya" },
    { value: "mayank", label: "Mayank Vora" }
  ];

  // const timeago = moment(comment.created_at).fromNow();

  useEffect(() => {
    document.addEventListener("keypress", handelClickListner);
    return () => {
      document.removeEventListener("keypress", handelClickListner);
    };
  });
  useEffect(() => {
    if (props.updateCard) props.updateCard(props.bid, values.id, values);
  }, [values]);

  return (
    <Modal onClose={props.onClose}>
      <div className="local__bootstrap">
        <div
          className="container"
          style={{ minWidth: "650px", position: "relative" }}
        >
          <div className="row pb-4">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div style={{ width: "100%" }}>
                  {/* <CreditCard className="icon__md" /> */}
                  {input ? (
                    <Input title={values.title} style={{ border: "none" }} />
                  ) : (
                    <h5
                      style={{ cursor: "pointer" }}
                      onClick={() => setInput(true)}
                    >
                      {values.title}
                    </h5>
                  )}
                </div>
                <div style={{ position: "absolute", right: "-5px", top: "-5px" }}>
                  <X
                    onClick={() => props.onClose(false)}
                    style={{ cursor: "pointer", width: "24px", height: "24px" }}
                  />
                </div>
                {/* <div className="complete__btn">
                  <button onClick={() => handleMarkComplete(true)} style={{ backgroundColor: `${markComplete ? "#e0f4ec" : "transparent"}`, border: `1px solid ${markComplete ? "#58a182" : "#cfcbcb"}` }}>
                    <span className="icon__sm">
                      <TrueSign />
                    </span>
                    {markComplete ? "Completed" : "Mark complete"}
                  </button>
                </div> */}
              </div>
            </div>
            <div className="cmt__section" id="cmt__section">
              <textarea
                placeholder="what is this task about?"
                className="task__textarea"
                value={values.carddesc ? values.carddesc : carddescription}
                onChange={(e) => handleCarddesc(e.target.value)} />
            </div>
            <div className="row">
              <div className="col-6">
                <div className="row">
                  <div className="col-4 assignee__data">
                    <p>Assignee</p>
                  </div>
                  <div className="col-8">
                    <Select
                      styles={colorStyles}
                      options={optionList}
                      placeholder="Select assignee"
                      value={values.assignee ? values.assignee : selectedOptions}
                      onChange={(e) => setAssignee(e)}
                      // onChange={(e) => setValues([...values, {"assignee": e.target}])}
                      isSearchable={true}
                      className='select__assignee'
                    // isMulti
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-4">
                    <p>Due Date</p>
                  </div>
                  <div className="col-8">

                    <DatePicker
                      className="datetime__picker"
                      selected={values.duedate ? new Date(values.duedate) : startDate}
                      onChange={(date) => handleStartDate(date)}
                      minDate={moment().toDate()}
                    // timeInputLabel="Time:"
                    // dateFormat="MM/dd/yyyy h:mm aa"
                    // showTimeInput
                    />

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
          </div>
          <div className="check__list mt-2">
            <div className="d-flex align-items-end  justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <TickSquare className="icon__md" />
                <h6 className="m-0">Check List</h6>
              </div>
              <div className="card__action__btn">
                <button onClick={() => deleteAllTask()}>
                  <span className="icon__sm">
                    <TrashIcon />
                  </span>
                  Delete all tasks
                </button>
              </div>
            </div>
            <div className="progress__bar mt-2 mb-2">
              <div className="progress flex-1">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: calculatePercent() + "%" }}
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {calculatePercent() + "%"}
                </div>
              </div>
            </div>

            <div className="my-2 subtask__section">
              {values.task.length !== 0 ? (
                values.task.map((item, index) => (
                  <div className="task__list d-flex align-items-start gap-2" key={index}>
                    <input
                      className="task__checkbox"
                      type="checkbox"
                      defaultChecked={item.completed}
                      onChange={() => {
                        updateTask(item.id);
                      }}
                    />

                    <h6
                      className={`flex-grow-1 ${item.completed === true ? "strike-through" : ""
                        }`}
                    >
                      {item.task}
                    </h6>
                    <TrashIcon
                      onClick={() => {
                        removeTask(item.id);
                      }}
                      style={{
                        cursor: "pointer",
                        widht: "18px",
                        height: "18px",
                      }}
                    />
                  </div>
                ))
              ) : (
                <></>
              )}

            </div>
            <Editable
              parentClass={"task__editable"}
              name={"Add subtask"}
              btnName={"Add task"}
              onSubmit={addTask}
            />
          </div>
          <hr />
          <div className="row">
            <div className="col-8">
              <h6 className="text-justify task__labels">Label</h6>
              <div
                className="d-flex label__color flex-wrap"
                style={{ width: "500px", paddingRight: "10px" }}
              >
                {values.tags.length !== 0 ? (
                  values.tags.map((item, index) => (
                    <span
                      className="d-flex justify-content-between align-items-center gap-2"
                      style={{ backgroundColor: item.color }}
                      key={index}
                    >
                      {item.tagName.length > 10
                        ? item.tagName.slice(0, 6) + "..."
                        : item.tagName}
                      <X
                        onClick={() => removeTag(item.id)}
                        style={{ width: "15px", height: "15px" }}
                      />
                    </span>
                  ))
                ) : (
                  <span
                    style={{ color: "#ccc" }}
                    className="d-flex justify-content-between align-items-center gap-2"
                  >
                    <i> No Labels</i>
                  </span>
                )}
              </div>
              {/* <div className="check__list mt-2">
                <div className="d-flex align-items-end  justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <CheckSquare className="icon__md" />
                    <h6>Check List</h6>
                  </div>
                  <div className="card__action__btn">
                    <button onClick={() => deleteAllTask()}>
                      Delete all tasks
                    </button>
                  </div>
                </div>
                <div className="progress__bar mt-2 mb-2">
                  <div className="progress flex-1">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: calculatePercent() + "%" }}
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {calculatePercent() + "%"}
                    </div>
                  </div>
                </div>

                <div className="my-2">
                  {values.task.length !== 0 ? (
                    values.task.map((item, index) => (
                      <div className="task__list d-flex align-items-start gap-2">
                        <input
                          className="task__checkbox"
                          type="checkbox"
                          defaultChecked={item.completed}
                          onChange={() => {
                            updateTask(item.id);
                          }}
                        />

                        <h6
                          className={`flex-grow-1 ${
                            item.completed === true ? "strike-through" : ""
                          }`}
                        >
                          {item.task}
                        </h6>
                        <Trash
                          onClick={() => {
                            removeTask(item.id);
                          }}
                          style={{
                            cursor: "pointer",
                            widht: "18px",
                            height: "18px",
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <></>
                  )}

                  <Editable
                    parentClass={"task__editable"}
                    name={"Add Task"}
                    btnName={"Add task"}
                    onSubmit={addTask}
                  />
                </div>
              </div> */}
            </div>
            <div className="col-4">
              <div className="d-flex card__action__btn gap-2">
                {labelShow && (
                  <Label
                    color={colors}
                    addTag={addTag}
                    tags={values.tags}
                    onClose={setLabelShow}
                  />
                )}
                <button onClick={() => setLabelShow(true)}>
                  <span className="icon__sm">
                    <TagIcon className="change__icon" />
                  </span>
                  Add Label
                </button>
                {/* <button>
                  <span className="icon__sm">
                    <Clock />
                  </span>
                  Date
                </button> */}

                <button onClick={() => props.removeCard(props.bid, values.id)}>
                  <span className="icon__sm">
                    <TrashIcon />
                  </span>
                  Delete Card
                </button>
              </div>
            </div>
          </div>
          <div className="mt-3">
            {values.comments ? values.comments.map((item, index) => {
              return <div className="d-flex mt-2 mb-2" key={index}>
                <div className="cmt__user__icon">
                  <UserIcon size={18} />
                </div>
                <div className="ps-2">
                  <div className="d-flex align-items-center mb-1">
                    <h6 className="m-0" style={{ fontSize: "14px", fontWeight: "600" }}>{item.userName}</h6>
                    {/* <h6 className="cmt__time">{moment(new Date()).fromNow()}</h6> */}
                    <h6 className="cmt__time">{item?.addTime && moment(JSON.parse(item?.addTime)).fromNow()}</h6>
                  </div>
                  <div style={{ fontSize: "14px" }}>
                    {item.comment}
                  </div>
                </div>
              </div>
            }) :
              ""}
          </div>
          <div className="all__cmt mt-3">
          </div>
          <div className="cmt__section">
            <input
              placeholder="ask a question or post an update..."
              className="cmt__textarea"
              value={cmtData}
              onChange={(e) => setCmtdata(e.target.value)}
              onKeyDown={(e) => { handleKeyPress(e) }} />
            <div className="card__action__btn">
              <button className="comment__btn" onClick={handleAddcomment}>
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
