import React, { useEffect, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { MoreVertical } from "react-feather";

import "./Board.css";

import Card from "../Card/Card";
import Editable from "../Editable/Editable";
import Dropdown from "../Dropdown/Dropdown";

export default function Board(props) {
  const [show, setShow] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [showBorder, setShowBorder] = useState(true);

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.code === "Enter") setShow(false);
    });
    return () => {
      document.removeEventListener("keypress", (e) => {
        if (e.code === "Enter") setShow(false);
      });
    };

  });

  return (
    <Draggable
      key={props.id.toString()}
      draggableId={props.id.toString()}
      index={props.index}
    >
      {(provided) => (
        <div
          className="board"
          style={{ border: `${showBorder ? `1px solid rgba(0, 0, 0, 0)` : `1px solid rgba(0, 0, 0, 0.125)`}` }}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="board__top" id="board__top"
            onMouseEnter={() => setShowBorder(false)}
            onMouseLeave={() => setShowBorder(true)}
            {...provided.dragHandleProps}
          >
            {show ? (
              <div>
                <input
                  className="title__input"
                  type={"text"}
                  defaultValue={props.name}
                  onChange={(e) => {
                    props.setName(e.target.value, props.id);
                  }}
                />
              </div>
            ) : (
              <div>
                <h6
                  onClick={() => {
                    setShow(true);
                  }}
                  className="board__title"

                >
                  {props?.name || "Name of Board"}
                  <span className="total__cards">{props.card?.length}</span>
                </h6>
              </div>
            )}
            <div
              onClick={() => {
                setDropdown(true);
              }}
            >
              <MoreVertical size={20} />
              {dropdown && (
                <Dropdown
                  className="board__dropdown"
                  onClose={() => {
                    setDropdown(false);
                  }}
                >
                  <p className="m-0" onClick={() => props.removeBoard(props.id)}>Delete Board</p>
                </Dropdown>
              )}
            </div>
          </div>
          <Droppable droppableId={props.id.toString()} type="task">
            {(provided) => (

              <div
                className="board__cards"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >

                {props.card?.map((items, index) => (
                  <Card
                    bid={props.id}
                    id={items.id}
                    index={index}
                    key={items.id}
                    title={items.title}
                    tags={items.tags}
                    updateCard={props.updateCard}
                    removeCard={props.removeCard}
                    card={items}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="board__footer">
            <Editable
              name={"Add Task"}
              btnName={"Add Card"}
              placeholder={"Enter Card Title"}
              onSubmit={(value) => { props.addCard(value, props.id, props.selectedOptions, props.startDate) }}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
}
