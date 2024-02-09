window.addEventListener('load', () => {
    if (localStorage.getItem('toDotasks')) {
        todoTasks.innerHTML = localStorage.getItem('toDotasks');
    }
    if(localStorage.getItem('completedTasks')){
        completedTasks.innerHTML = localStorage.getItem('completedTasks');
    }

    initaializeEventListeners();
});

function saveTasksToLocalStorage() {
    localStorage.setItem('toDotasks', todoTasks.innerHTML);
    localStorage.setItem('completedTasks', completedTasks.innerHTML);
}

function updateLocalStorage() {
    saveTasksToLocalStorage();
}

const todoTasks  = document.getElementById("todo");
const completedTasks  = document.getElementById("completed");
const createTaskbtn = document.getElementById("createTask");
let count = 1;

// Create Task Function
function createTask(){
    let taskInput = document.getElementById("taskInput");
    if(taskInput.value === ""){
        window.alert("Please enter task name");
        return;
    }

    //Creating newTask
    let newTask = document.createElement("div");
    newTask.innerHTML=`<img src="./Assets/unchecked.png" class="image" alt="Delete Task">
                       <span>${taskInput.value}</span>
                       <div class="btns">
                       <button class="editbtn" id="editbtn${count}"><img src="./Assets/edit.png" alt="Edit Task"></button>
                       <button class="deletebtn" id="deletebtn${count}"><img src="./Assets/delete.png" alt="Delete Task"></button>
                       </div>`


    newTask.classList.add("task"); // adding class to newTask
    newTask.setAttribute('id',`task${count}`);
    todoTasks.appendChild(newTask); // Appending newTask inside Todo List

    let editbtn = document.getElementById(`editbtn${count}`);
    let deletebtn = document.getElementById(`deletebtn${count}`);

    // Setting Custom attribute to Acess the task on which User clicked
    editbtn.setAttribute('taskId',`task${count}`);
    deletebtn.setAttribute('taskId',`task${count}`);


    taskInput.value="";//making input to null after adding newTask
    count++;
    updateLocalStorage();
    
}

//Edit Task Function
function editTask(editbtn){
let taskId = editbtn.getAttribute("taskId");
let span = document.getElementById(taskId).querySelector("span");
span.contentEditable=true;
span.focus();

    span.addEventListener('blur', function() { // Add event listener to blur event on the span element, When the span loses focus, set contentEditable to false
    span.contentEditable = false;
    })

    updateLocalStorage();
}

// Delete task function
function deleteTask(deletebtn){

    let taskId = deletebtn.getAttribute("taskId");
    if(confirm("Do you want to delete this task")){
    document.getElementById(taskId).remove();
    }

    updateLocalStorage();
}

// Completed Task Functionality
function moveToCompleted(taskId){
    console.log(taskId);
    let task = document.getElementById(taskId);

    let image=task.querySelector(".image");
    image.src= "./Assets/checked.png";

    let editbtn = task.querySelector(".editbtn");
    editbtn.remove();

    completedTasks.appendChild(task);
    updateLocalStorage();
}

// clearAll Completed tasks functionality
function clearCompleted(){
    let tasksToDelete = completedTasks.querySelectorAll(".task");
    for(let i=0;i<tasksToDelete.length;i++){
        tasksToDelete[i].remove();
    }
    updateLocalStorage();
}

//Adding event Listener on ToDo Task Container

function initaializeEventListeners(){

    const todoTasks  = document.getElementById("todo");
    const completedTasks  = document.getElementById("completed");
    const createTaskbtn = document.getElementById("createTask");
    let count = 1;


    createTaskbtn.addEventListener("click", createTask);
    taskInput.addEventListener("keydown", (e) => {
    if(e.key == "Enter"){
        createTask();
    }
})


    todoTasks.addEventListener("click", (e) => {
        if(e.target.parentNode.classList.contains("editbtn")){ // if event is triggered by pressing EDIT button
            editTask(e.target.parentNode);  
        }
        else if(e.target.parentNode.classList.contains("deletebtn")){
           deleteTask(e.target.parentNode)
        }
        else if(e.target.classList.contains("image")){
            moveToCompleted(e.target.parentNode.getAttribute("id"));
        }
    })
    
    completedTasks.addEventListener("click", (e) => {
        if(e.target.parentNode.classList.contains("deletebtn")){
            deleteTask(e.target.parentNode);
        }
    })
    
    let clearCompletedTasks=document.getElementById("clear");
    clearCompletedTasks.addEventListener("click" , () => {
        if(confirm("Do you want to clear all Completed Tasks?")){
            
            clearCompleted();
        }
    })
}




