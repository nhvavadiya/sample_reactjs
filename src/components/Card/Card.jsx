import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import moment from "moment";

import { ReactComponent as TickSquare } from '../../assets/tick-square.svg';
import { ReactComponent as CmtIcon } from '../../assets/comment.svg';

import "./Card.css";

import Tag from "../Tags/Tag";
import CardDetails from "./CardDetails/CardDetails";

// import Dropdown from "../Dropdown/Dropdown";
// import Modal from "../Modal/Modal";

const Card = (props) => {
  // const [dropdown, setDropdown] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [values, setValues] = useState({ ...props.card });

  const fullName = props?.card?.assignee?.label
  const intials = fullName?.split(' ').map(name => name[0]).join('').toUpperCase();
  useEffect(() => {
    if (props.updateCard) props.updateCard(props.bid, values.id, values);
  }, [values]);

  return (
    <Draggable
      key={props.id.toString()}
      draggableId={props.id.toString()}
      index={props.index}
    >
      {(provided) => (
        <>
          {modalShow && (
            <CardDetails
              updateCard={props.updateCard}
              onClose={setModalShow}
              card={props.card}
              bid={props.bid}
              removeCard={props.removeCard}
            />
          )}

          <div
            className="custom__card"
            onClick={() => {
              setModalShow(true);
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="card__text">
              <p>{props.title}</p>
              {/* <MoreVertical
                className="car__more"
                onClick={() => {
                  setDropdown(true);
                }}
              /> */}
            </div>

            <div className="card__submenu">
              {props.card.assignee ?
                <p className="data__latter" style={{ backgroundColor: "rgb(187, 217, 194)" }}>{intials}</p>
                : ""}
              {props.card.duedate ?
                <p>{moment(props.card.duedate).format('ll')}</p>
                : ""}
            </div>

            <div className="card__tags">
              {props.tags?.map((item, index) => (
                <Tag key={index} tagName={item.tagName} color={item.color} />
              ))}
            </div>

            <div className="checklist__card">
              <div className="card__footer">
                {/* <div className="time">
                    <Clock />
                    <span>Sun 12:30</span>
                  </div> */}
                {props.card.task.length !== 0 && (
                  <div className="task">
                    <TickSquare />
                    <span>
                      {props.card.task.length !== 0
                        ? `${(props.card.task?.filter(
                          (item) => item.completed === true
                        )).length
                        } / ${props.card.task.length}`
                        : `${"0/0"}`}
                    </span>
                  </div>
                )}
              </div>
              {values.comments ?
                <div className="cmt_icon"><CmtIcon /></div>
                : ""
              }
            </div>

            {provided.placeholder}
          </div>
        </>
      )}
    </Draggable>
  );
};

export default Card;
