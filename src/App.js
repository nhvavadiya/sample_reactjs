import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "use-local-storage";

import { ReactComponent as PlusIcon } from '../src/assets/plus-project.svg';

import 'font-awesome/css/font-awesome.min.css';
import "./bootstrap.css";
import "./App.css";

import Editable from "./components/Editable/Editable";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Board from "./components/Board/Board";

// import data from '../data'
// import axios from 'axios'

function App() {
  const [data, setData] = useState(
    localStorage.getItem("kanban-board")
      ? JSON.parse(localStorage.getItem("kanban-board"))
      : []
  );

  const defaultDark = window.matchMedia(
    "(prefers-colors-scheme: dark)"
  ).matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const setName = (title, bid, selectedOptions) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].boardName = title;
    setData(tempData);
  };

  // For drag and drop cards in different column
  const dragCardInBoard = (source, destination) => {
    let tempData = [...data];
    const destinationBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === destination.droppableId
    );
    const sourceBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === source.droppableId
    );
    tempData[destinationBoardIdx].card.splice(
      destination.index,
      0,
      tempData[sourceBoardIdx].card[source.index]
    );
    tempData[sourceBoardIdx].card.splice(source.index, 1);

    return tempData;
  };

  // For drag and drop cards in same column
  const dragCardInSameBoard = (source, destination) => {
    let tempData = Array.from(data)
    const index = tempData.findIndex(
      (item) => item.id.toString() === source.droppableId
    );
    console.log("tempdtaa-=->", data, tempData[-1])
    let [removedCard] = tempData[index].card.splice(source.index, 1);
    tempData[index].card.splice(destination.index, 0, removedCard);
    return tempData
  };

  // For drag columns
  const dragColumn = (source, destination) => {
    const newColumOrder = Array.from(data);
    const removedData = newColumOrder.splice(source.index, 1);
    newColumOrder.splice(destination.index, 0, ...removedData);
    return newColumOrder
    //   setData(newColumOrder)
  }

  // For adding new Card
  const addCard = (title, bid, selectedOptions, startDate) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].card.push({
      id: uuidv4(),
      title: title,
      selectedOptions: selectedOptions,
      startDate: startDate,
      tags: [],
      task: [],
    });
    setData(tempData);
  };

  // For remove the card
  const removeCard = (boardId, cardId) => {
    const index = data.findIndex((item) => item.id === boardId);
    const tempData = [...data];
    const cardIndex = data[index].card.findIndex((item) => item.id === cardId);

    tempData[index].card.splice(cardIndex, 1);
    setData(tempData);
  };

  // For add new column
  const addBoard = (title) => {
    const tempData = [...data];
    tempData.push({
      id: uuidv4(),
      boardName: title,
      card: [],
    });
    setData(tempData);
  };

  // For remove column
  const removeBoard = (bid) => {
    const tempData = [...data];
    const index = data.findIndex((item) => item.id === bid);
    tempData.splice(index, 1);
    setData(tempData);
  };

  // For drag card
  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) return;

    if (type === 'column') {
      setData(dragColumn(source, destination));
      return;
    }

    if (source.droppableId === destination.droppableId) {
      setData(dragCardInSameBoard(source, destination));
    } else {
      setData(dragCardInBoard(source, destination));
      let firstCol = data?.filter((item) => { return item.id === source.droppableId })[0].boardName;
      let secondCol = data?.filter((item) => { return item.id === destination.droppableId })[0].boardName;
      let targetCard = result.draggableId;

      console.log("User moved " + targetCard + " from " + firstCol + " To " + secondCol);
    }
  };


  // For updating card details
  const updateCard = (bid, cid, card) => {
    const index = data.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...data];
    const cards = tempBoards[index].card;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].card[cardIndex] = card;
    setData(tempBoards);
  };

  useEffect(() => {
    localStorage.setItem("kanban-board", JSON.stringify(data));
  }, [data]);

  return (
    <>
      {/* <DragDropContext onDragEnd={onDragEnd}>
    <div className="App" data-theme={theme}>
      <Navbar switchTheme={switchTheme} />
      <div className="app_outer">
        <div className="app_boards">
          {data.map((item) => (
            <Board
              key={item.id}
              id={item.id}
              name={item.boardName}
              card={item.card}
              setName={setName}
              addCard={addCard}
              removeCard={removeCard}
              removeBoard={removeBoard}
              updateCard={updateCard}
            />
          ))}
          <Editable
            class={"add__board"}
            name={"Add Board"}
            btnName={"Add Board"}
            onSubmit={addBoard}
            placeholder={"Enter Board  Title"}
          />
        </div>
      </div>
    </div>
      </DragDropContext> */}

      <Routes>
        <Route path="/" element={<Login theme={theme} />} />
        <Route path="/signup" element={<Signup theme={theme} />} />
        <Route path="/home" element={<Home theme={theme} />} />
        <Route path="/DraggableBoard" element={
          <DraggableBoard
            onDragEnd={onDragEnd}
            theme={theme}
            switchTheme={switchTheme}
            data={data}
            setName={setName}
            addBoard={addBoard}
            addCard={addCard}
            removeCard={removeCard}
            removeBoard={removeBoard}
            updateCard={updateCard}
          />
        } />
      </Routes>
    </>
  );
}

export const DraggableBoard = (props) => {
  const { onDragEnd, theme, switchTheme, data, setName, addBoard, addCard, removeCard, removeBoard, updateCard } = props;

  const Imgarray = [{ id: 1, projectname: "Decoration App", backColor: "#DBC0CC" },
  { id: 2, projectname: "Fitness App", backColor: "#C6C0DB" },
  { id: 3, projectname: "Mobile App", backColor: "#BBD9C2" }]

  // useEffect(() => {
  //   setInterval(() => {
  //     getAPI();
  //   }, 1000);
  // }, []);

  // const getAPI = () => {
  //   axios.get("http://localhost:3005/posts").then((res) => {
  //   })
  // }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="App" data-theme={theme}>
          <Navbar switchTheme={switchTheme} theme={theme} />
          <div className="app__section">
            <div>
              <div className="sidebar__section">
                {Imgarray.map((item, index) => {
                  const intials = item.projectname?.split(' ').map(name => name[0]).join('').toUpperCase();
                  return <div className="project__list" key={index}>
                    <p className="project__latter" style={{ backgroundColor: `${item.backColor}` }}>{intials}</p>
                    <div className="project__tooltip" style={{ backgroundColor: `${item.backColor}` }}>
                      {item.projectname}
                      <div className="arr" style={{ borderRight: `10px solid ${item.backColor}` }}></div>
                    </div>
                  </div>
                })}
                <div className="add__project">
                  <div>
                    <PlusIcon className='plus__icon' />
                  </div>
                </div>
              </div>
            </div>
            <div className="app_outer">
              <div className="board__project__name">
                <h5>Decoration App</h5>
              </div>
              <Droppable droppableId="all-columns" direction="horizontal" type="column">
                {(provided) => (
                  <div
                    className="app_boards"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {data.map((item, index) => (
                      <Board
                        key={item.id}
                        id={item.id}
                        name={item.boardName}
                        card={item.card}
                        setName={setName}
                        addCard={addCard}
                        removeCard={removeCard}
                        removeBoard={removeBoard}
                        updateCard={updateCard}
                        index={index}
                      />
                    ))}
                    <Editable
                      class={"add__board"}
                      name={"Add Board"}
                      btnName={"Add Board"}
                      onSubmit={addBoard}
                      placeholder={"Enter Board  Title"}
                    />
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>
      </DragDropContext>

    </>
  )
}

export default App;
