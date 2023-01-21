//Получение со страницы
const elements = {
  TEXT_INPUT_HIGH: document.getElementById("blogInputHigh"),
  TEXT_INPUT_LOW: document.getElementById("blogInputLow"),
  HIGH_LIST: document.querySelector(".todosListHigh"),
  LOW_LIST: document.querySelector(".todoslistLow"),
  BUTTON: document.querySelectorAll(".btn__img"),
  FORMS: document.querySelectorAll(".form"),
};

//Хранилише
const list = JSON.parse(localStorage.getItem("tasks")) || [];

eventList();

function eventList() {
  document.addEventListener("DOMContentLoaded", () => {
    renderALLTasks();
  });
}

//обьект с приоритетами
const PRIORITY = {
  HIGH: "High",
  LOW: "Low",
};

//обьект со статусами
const STATUS = {
  TODO: "ToDo",
  DONE: "Done",
};

//обработчики событий
elements.FORMS.forEach((form) => {
  form.addEventListener("submit", onFormSubmitHandler);
});

elements.BUTTON.forEach((button) => {
  button.addEventListener("click", onFormSubmitHandler);
});

//обработчик форм,инпутов
function onFormSubmitHandler(event) {
  event.preventDefault(); //отменяем стандартное поведение браузера
  //Получаем инпуты
  const HighValue = elements.TEXT_INPUT_HIGH.value;
  const LowValue = elements.TEXT_INPUT_LOW.value;

  if (!HighValue || !LowValue) {
    alert("Пожалуйста введите Задачу");
    return;
  }

  AddTask(HighValue, STATUS.TODO, PRIORITY.HIGH);
  AddTask(LowValue, STATUS.TODO, PRIORITY.LOW);

  renderALLTasks();
}

//добавление таска
function AddTask(name, status, priority) {
  const newTask = {
    name: name,
    status: status,
    priority: priority,
  };
  list.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(list));
}

//создание элемента form
function listItemTemplate(taskList, newTask) {
  const form = document.createElement("form");
  const input = document.createElement("input");
  const div = document.createElement("div");
  const a = document.createElement("a");
  const closeBtn = document.createElement("img");

  form.classList.add("completed");
  input.classList.add("check");
  input.type = "radio";
  div.classList.add("inputCompleted");
  a.classList.add("BtnClose");
  closeBtn.classList.add("logo__close");
  closeBtn.src = "img/close.png";

  div.textContent = newTask.name; //получаем с помошью свойства обьекта

  taskList.append(form); //tasklist  это обертка
  form.append(input);
  form.append(div);
  form.append(a);
  form.append(closeBtn);

  input.addEventListener("click", (event) => {
    form.classList.toggle("checked");
    if (event.target.classList.contains("checked")) {
      event.target.classList.remove("checked");
      changeStatus(newTask, STATUS.TODO);
    } else {
      event.target.classList.add("checked");
      changeStatus(newTask, STATUS.DONE);
    }
  });

  closeBtn.addEventListener("click", () => {
    form.remove();
    DeleteTask(list);
  });

  return form;
}
//вывод задач на страницу
function renderALLTasks() {
  //удаляет не нужные дубликаты тасок
  document
    .querySelectorAll(".completed")
    .forEach((newTask) => newTask.remove());

  //перебирает таски реедерит от приоритета
  list.map((newTask) => {
    if (newTask.priority === PRIORITY.HIGH) {
      listItemTemplate(elements.HIGH_LIST, newTask);
    } else {
      listItemTemplate(elements.LOW_LIST, newTask);
    }
  });
}

//Удаление таска
function DeleteTask(newTask) {
  let index = list.findIndex((item) => item.name === newTask.name);
  list.splice(index, 1);
}

//смена статуса
function changeStatus(newTask, status) {
  const result = list.find((item) => item.name === newTask.name);

  return (result.status = status);
}
