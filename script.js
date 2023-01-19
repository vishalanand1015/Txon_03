let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let msg = document.getElementById("msg");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");


let c = console.log.bind();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (textInput.value === "") {
        console.log("failure");
        msg.innerHTML = "text cannot be blank";
        msg.style.color = "red";
    } else {
        c("success");
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        //IIFE
        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })()


    }
};

let data = [];


let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value
    })
    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
    createTask();
};

let createTask = () => {
    tasks.innerHTML = ""
    data.map((x, y) => {
        return tasks.innerHTML +=
            ` <div id=${y}>
        <span class="fw-bold">${x.text}</span>
        <span class="small text-secondary ">${x.date}</span>
        <p>${x.description}</p>

        <span class="options">
          <i onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
          <i onclick="deleteTask(this);createTask()" class="fas fa-trash-alt"></i>
        </span>
      </div>
  `
   })
    restfrom();
};


let deleteTask = (e) => {
    e.parentElement.parentElement.remove()
    data.splice(e.parentElement.parentElement.id, 1)
    console.log(e.parentElement.parentElement.id);
}

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML
    dateInput.value = selectedTask.children[1].innerHTML
    textarea.value = selectedTask.children[2].innerHTML
    deleteTask(e)
}

let restfrom = () => {
    textInput.value = ""
    dateInput.value = ""
    textarea.value = ""
}

//IEFFE

(() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    createTask()
    console.log(data)
})()
