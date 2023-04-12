import React, { useState } from "react";
import { Plus, X } from "react-feather";

import "./Editable.css";
import "react-datepicker/dist/react-datepicker.css";

// import Select from "react-select";
// import CardDetails from "../Card/CardDetails/CardDetails";
// import DatePicker from "react-datepicker";

const Editable = (props) => {
  const [show, setShow] = useState(props?.handler || false);
  const [text, setText] = useState(props.defaultValue || "");
  const [selectedOptions, setSelectedOptions] = useState();
  const [startDate, setStartDate] = useState(new Date());
  // const [modalShow, setModalShow] = useState(false);

  // For submit name of card, board etc.
  const handleOnSubmit = (e) => {
    if (text && props.onSubmit) {
      setText("");
      setSelectedOptions("");
      setStartDate("");
      props.onSubmit(text, selectedOptions, startDate);
    }
    e.preventDefault();
    setShow(false);
  };

  const handleKeyPress = (e) => {
    if (e.which === 13) {
      handleOnSubmit(e);
    }
  }

  return (
    <>
      {/* {modalShow && (
      <CardDetails
        updateCard={props.updateCard}
        onClose={setModalShow}
        card={props.card}
        bid={props.bid}
        removeCard={props.removeCard}
      />
    )} */}
      <div className={`editable ${props.parentClass}`}>
        {show ? (
          <form onSubmit={handleOnSubmit}>
            <div className={`editable__input ${props.class}`}>
              <div className="textarea_select">
                <textarea
                  placeholder={props.placeholder}
                  autoFocus
                  id={"edit-input"}
                  type={"text"}
                  onChange={(e) => setText(e.target.value)}
                  // onChange={(e) => handleText(e)}
                  onKeyDown={(e) => { handleKeyPress(e) }}
                />
                {/* <Select
              options={optionList}
              placeholder="Select assignee"
              value={selectedOptions}
              onChange={(e) => setSelectedOptions(e.target)}
              isSearchable={true}
              className='select__assignee'
              // isMulti
            />
            <div className="datetime__picker">
              <DatePicker 
                selected={startDate} 
                onChange={(date) => setStartDate(date)}
                // timeInputLabel="Time:"
                // dateFormat="MM/dd/yyyy h:mm aa"
                // showTimeInput
                />
            </div> */}
              </div>

              <div className="btn__control">
                <button className="add__btn" type="submit">
                  {`${props.btnName}` || "Add"}
                </button>
                <X
                  className="close"
                  onClick={() => {
                    setShow(false);
                    props?.setHandler(false);
                  }}
                />
              </div>
            </div>
          </form>
        ) : (
          <p
            onClick={() => {
              setShow(true);
            }}
            style={{ width: `${props.name === "Add Board" ? "150px" : "90%"}` }}
          >
            {props.defaultValue === undefined ? <Plus size={18} /> : <></>}
            {props?.name || "Add"}
          </p>
        )}
      </div>
    </>
  );
};

export default Editable;
