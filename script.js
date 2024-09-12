import toggleTheme from "./scripts/darkTheme";
import { darkThemeToggleElement, inputElement, taskList } from "./scripts/elements";
//DArk Theme
darkThemeToggleElement.addEventListener("click", toggleTheme);
// Add Task
const addButton = document.querySelector(".TaskSearchBar__button");

const fetchData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : false;
};

const saveToDb = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const renderTaskList = (tasks) => {
  // render Tasks Ui
  let alltaskList = "";
  tasks.forEach((task) => {
    alltaskList += `<li class="TaskList__taskContent${
      task.isCompleted ? " TaskList__taskContent--isActive" : ""
    }" >
        <div class='TaskList__checkbox' tabindex="0" role="button">
          <img class='TaskList__checkboxImg' src="./assets/icon-checkmark.svg" alt="checkmark" />
        </div>
        <div class='TaskList__valueContent'>
          <p class='TaskList__value'>
            ${task.value}
          </p>
          <img src="./assets/icon-basket.svg"
               class='TaskList__deleteIcon'
               alt="basket-icon"
          />
        </div>
      </li>`;
  });
  taskList.innerHTML = alltaskList;
  inputElement.value = "";
  inputElement.focus();
};

// add task
const addTask = (e) => {
  e.preventDefault();

  let taskValue = inputElement.value;
  // test the value
  if (!taskValue) return;
  // task component
  const task = {
    value: taskValue,
    isCompleted: true,
  };

  //store & fetch the Tasks
  const tasks = fetchData("tasks") || [];

  tasks.push(task);
  saveToDb("tasks", tasks);

  renderTaskList(tasks);
};

// add task event
addButton.addEventListener("click", addTask);
