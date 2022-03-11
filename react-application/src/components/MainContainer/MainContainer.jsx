import React, { useState } from 'react';
import './mainContainer.css';
import { Images } from '../../assets/index';
const MainContainer = () => {
  const [taskList, setTaskList] = useState([]);

  const Task = ({ content, taskIdx }) => (
    <div className="task cursor-pointer flex items-center justify-between">
      <div className="task-content-container flex items-center">
        <div className="task-check-circle w-16 flex items-center justify-center">
          <div className="completed-circle rounded-full w-6 h-6 cursor-pointer"></div>
        </div>

        <div className="flex items-center h-full task-content">
          <h3>{content}</h3>
        </div>
      </div>

      <div
        onClick={() => {
          let tempCurList = [...taskList];
          tempCurList.splice(taskIdx, 1);
          setTaskList(tempCurList);
        }}
        className="delete-task-cross px-5 cursor-pointer hidden"
      >
        <img src={Images.crossIcon} alt="delete cross task" />
      </div>
    </div>
  );

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      if (event.target.value.length <= 40) {
        // Cancel the default action, if needed
        event.preventDefault();
        setTaskList([...taskList, event.target.value]);
        event.target.value = '';
      } else {
        alert('Task content is too long (40 characters only)');
      }
    }
  };

  return (
    <div className="main-container">
      <div className="card-container">
        {/* main title */}
        <div className="card-image">
          <h2>TODO</h2>
          <div className="image cursor-pointer">
            <img src={Images.sunIcon} alt="A sun icon" />
          </div>
        </div>

        {/* new item input and items list */}
        <div className="items-container flex flex-col items-center space-y-7 flex-1">
          {/* input to create */}
          <div className="items-container__create w-full flex rounded-md overflow-hidden">
            {/* complete circle container */}
            <div className="completed-circle-container w-16 h-16 flex items-center justify-center">
              <div className="completed-circle-no-anim w-6 h-6 rounded-full"></div>
            </div>

            {/* input for new task */}
            <div className="items-container__create-content flex-1">
              <input
                onKeyUp={(e) => handleEnter(e)}
                className="w-full h-full outline-none pr-5"
                placeholder="What's on your mind?"
                type="text"
              />
            </div>
          </div>

          {/* items list */}
          <div className="items-container__list shadow-lg w-full flex flex-col justify-between flex-1 rounded-md overflow-hidden">
            <div className="list-container flex flex-col overflow-scroll">
              {taskList?.map((task, idx) => (
                <Task key={task} taskIdx={idx} content={task} />
              ))}
            </div>

            <div className="list-control">
              <h3>{taskList?.length} items left</h3>
              <div className="list-control-status">
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
              </div>

              <button>Clear completed</button>
            </div>
          </div>
        </div>

        {/* drag and drop msg */}
        <div className="bg-transparent flex items-center justify-center py-11">
          <h3 className="drag-drop-msg text-xs font-bold opacity-50">
            Drag and drop to reorder list
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
