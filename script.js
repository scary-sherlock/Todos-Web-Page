let container = document.getElementById("todoItemsContainer");
let input = document.getElementById("todoUserInput");
let todoList = JSON.parse(localStorage.getItem("todoList"));

let lst = null;
if(todoList) lst = todoList;
else lst = [];

function add(){
    if (input.value === ""){
        alert("Enter Valid Text.");
        return;
    } 
    
    let newTodo = {
        text: input.value,
        uniqueCode: new Date().getTime()
    };

    createTodo(newTodo);
    lst.push(newTodo);
    input.value = "";
}

function createTodo(todo){

    let checkboxId = "checkbox" + todo.uniqueCode;
    let labelId = "label" + todo.uniqueCode;
    let todoId = "todo" + todo.uniqueCode;
    
    let element = document.createElement("li");
    element.id = todoId;
    element.classList.add("todo-item-container", "d-flex");
    container.appendChild(element);

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList = ("checkbox-input");
    checkbox.id = checkboxId;
    element.appendChild(checkbox);

    checkbox.onclick = function(){document.getElementById(labelId).classList.toggle("checked") ;}

    let labelContainer = document.createElement("div");
    labelContainer.classList = "label-container d-flex";
    element.appendChild(labelContainer);

    let label = document.createElement("label");
    label.htmlFor = checkboxId;
    label.id = labelId;
    label.classList = "checkbox-label";
    label.textContent = todo.text;
    labelContainer.appendChild(label);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList = "delete-icon-container";
    labelContainer.appendChild(deleteContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList = "far fa-trash-alt delete-icon";
    deleteContainer.appendChild(deleteIcon);

    deleteIcon.onclick = function(){
        container.removeChild(document.getElementById(todoId));
        lst.splice(lst.indexOf(todo), 1);
        save();
    };

}

for(let item of lst) createTodo(item);

function save(){localStorage.setItem("todoList", JSON.stringify(lst));}