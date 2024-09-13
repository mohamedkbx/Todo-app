import {
  darkThemeToggleElement,
  inputElement,
  taskList,
  addButton,
  getDeletButtons,
  appElement,
  getCheckboxElements,
  TaskListLink,
} from "./scripts/elements";
//DArk Theme
const renderEmptyState = (tasks) => {
  if (!tasks.length) {
    taskList.innerHTML = `<li class='EmptyList'>
    <img class='EmptyList__img' src="./assets/icon-empty.svg" alt="list is empty" />
    <p>قائمة المهام فارغة</p>
  </li>`;
  }
};

function toggleTheme() {
  appElement.classList.toggle("App--isDark");
  saveToDb("darkModeFlag", appElement.classList.contains("App--isDark"));
}
darkThemeToggleElement.addEventListener("click", toggleTheme);

const fetchData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : false;
};

export const saveToDb = (key, data) => {
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
  renderEmptyState(tasks);
};

const initTasks = () => {
  getDeletButtons().forEach((icon, index) => {
    icon.addEventListener("click", () => deletTask(index));
  });
  getCheckboxElements().forEach((box, indx) => {
    box.addEventListener("click", (e) => toggleTask(e, indx));
  });
};

// Delet Task

const deletTask = (index) => {
  const anwser = confirm("Are you sure you want to delete");
  if (!anwser) return;

  const tasks = fetchData("tasks");
  tasks.splice(index, 1);
  saveToDb("tasks", tasks);
  renderTaskList(tasks);
  initTasks();
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
    isCompleted: false,
  };

  //store & fetch the Tasks
  const tasks = fetchData("tasks") || [];

  tasks.push(task);
  saveToDb("tasks", tasks);

  renderTaskList(tasks);
  initTasks();
};

// add task event
addButton.addEventListener("click", addTask);

const initDataONStartup = () => {
  fetchData("darkModeFlag") && toggleTheme();
  renderTaskList(fetchData("tasks"));
};

initDataONStartup();

const toggleTask = (e, index) => {
  const tasks = fetchData("tasks");

  e.currentTarget.parentElement.classList.toggle("TaskList__taskContent--isActive");
  tasks[index].isCompleted = !tasks[index].isCompleted;
  saveToDb("tasks", tasks);
};

TaskListLink.addEventListener("click", () => {
  taskList.classList.toggle("TaskList__list--hideCompleted");
  TaskListLink.classList.toggle("TaskList__link--isActive");
});
