const taskInput = document.querySelector(".task-input input"),
taskAdd = document.getElementById("add-btn"),

filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear-btn"),
taskBox = document.querySelector(".task-box");
console.log(taskAdd);
let editId,
isEditTask = false,


todos = JSON.parse(localStorage.getItem("todo-list"));
var completed =0;
var pending =0;
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
        showNumberOfPending();
        showNumberOfCompleted();
    });
});
function showTodo(filter) {
    let liTag = "";
    showNumberOfPending();
    showNumberOfCompleted();
    
    if(todos) {
        showNumberOfPending();
        showNumberOfCompleted();
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all") {
                liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu">
                                    <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
            }
        });
    }
   
    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
    showNumberOfPending();
    showNumberOfCompleted();
    
   
}
showTodo("all");
showNumberOfPending();
showNumberOfCompleted();
function showMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}
function updateStatus(selectedTask) {

    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";

    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
    showNumberOfPending();
    showNumberOfCompleted();
}
function editTask(taskId, textName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = textName;
    // taskInput.focus();
    taskInput.classList.add("active");
     showNumberOfPending();
    showNumberOfCompleted();
}
function deleteTask(deleteId, filter) {
    isEditTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filter);
    showNumberOfPending();
    showNumberOfCompleted();
}
clearAll.addEventListener("click", () => {
    sum = 0;
    sum2 = 0;
    isEditTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo()
   document.getElementById("sp1").innerHTML=String(sum);
   document.getElementById("sp2").innerHTML=String(sum2);
});
function takAdded(){
    
        console.log('add');
        let userTask = taskInput.value.trim();
        if(userTask) {
            if(!isEditTask) {
                todos = !todos ? [] : todos;
                let taskInfo = {name: userTask, status: "pending"};
                todos.push(taskInfo);
            } else {
                isEditTask = false;
                todos[editId].name = userTask;
            }
            taskInput.value = "";
            localStorage.setItem("todo-list", JSON.stringify(todos));
            showTodo(document.querySelector("span.active").id);
            showNumberOfPending();
            showNumberOfCompleted();
        }
        else{
              alert('Enter Task Please');
        }
    
}



function showNumberOfPending(){
    sum =0;
    for (let index = 0; index < todos.length; index++) {
        
        if(todos[index].status == "pending"){sum++;}
        
        
       
    }
    document.getElementById("sp1").innerHTML=String(sum);
}
function showNumberOfCompleted(){
    sum2 =0;
    for (let index = 0; index < todos.length; index++) {
       
        if(todos[index].status == "completed"){sum2++;}
        console.log(sum2);
        
        
    }
    document.getElementById("sp2").innerHTML=String(sum2);
  
}
