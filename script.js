import toggleTheme from "./scripts/darkTheme";
import { darkThemeToggleElement } from "./scripts/elements";
//DArk Theme
darkThemeToggleElement.addEventListener("click", toggleTheme);

// Add Task
const addButton = document.querySelector(".TaskSearchBar__button");

const fetchData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : false;
};

const addTask = (e) => {
  e.preventDefault();
  const inputElement = document.querySelector("#search-input");
  let taskValue = inputElement.value;

  if (!taskValue) return;

  const task = {
    value: taskValue,
    isCompleted: false,
  };

  const tasks = fetchData("tasks") || [];

  tasks.push(task);
  saveToDb("tasks", tasks);

  const taskList = document.querySelector(".TaskList__list");

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
};

const saveToDb = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

addButton.addEventListener("click", addTask);
