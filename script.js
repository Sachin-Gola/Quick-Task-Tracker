const inputBox=document.getElementById('input-box');
const addbtn=document.getElementById('addbtn');
const todolist=document.getElementById('todolist');

let edittodo=null;

const addtodo=()=>{
    const inputText=inputBox.value.trim();
    if(inputText.length <=0){
        alert("You must enter")
        return; // Prevent adding empty tasks
    }
    if(addbtn.value==="Edit"){
        const oldvalue=edittodo.target.previousElementSibling.innerHTML;
        edittodo.target.previousElementSibling.innerHTML=inputText;
        editLocaltodos(inputText,oldvalue);
        addbtn.value="Add";
        inputBox.value="";
    }
    else{
        const li=document.createElement("li");
        const p=document.createElement("p");
        p.innerHTML=inputText;
        li.appendChild(p);

        // Edit button
        const editbtn=document.createElement("button");
        editbtn.innerText="Edit";
        editbtn.classList.add("btn","edit-button");
        li.appendChild(editbtn);

        // Delete button
        const deletebtn=document.createElement("button");
        deletebtn.innerText="Remove";
        deletebtn.classList.add("btn","delete-button");
        li.appendChild(deletebtn);

        // Complete button
        const completebtn=document.createElement("button");
        completebtn.innerText="Complete";
        completebtn.classList.add("btn","complete-button");
        li.appendChild(completebtn);

        todolist.append(li);
        inputBox.value="";
        saveLocaltodo({text: inputText, completed: false});
    }
}

const updatetodo=(e)=>{
    if(e.target.innerHTML==="Remove"){
        todolist.removeChild(e.target.parentElement);
        removelocaltodo(e.target.parentElement);
    }
    else if(e.target.innerHTML==="Edit"){
        inputBox.value=e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addbtn.value="Edit";
        edittodo=e;
    }
    else if(e.target.innerHTML==="Complete" || e.target.innerHTML==="Completed"){
        const li = e.target.parentElement;
        const p = li.querySelector("p");
        const isCompleted = e.target.innerHTML === "Completed";
        if(!isCompleted){
            p.style.textDecoration = "line-through";
            e.target.innerHTML = "Completed";
            updateCompleteStatus(p.innerHTML, true);
        } else {
            p.style.textDecoration = "none";
            e.target.innerHTML = "Complete";
            updateCompleteStatus(p.innerHTML, false);
        }
    }
}

const saveLocaltodo =(todo)=>{
    let todos = [];
    if(localStorage.getItem("todos")!==null){
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

const localtodo=()=>{
    let todos = [];
    if(localStorage.getItem("todos")!==null){
        todos=JSON.parse(localStorage.getItem("todos")) || [];
    }
    todos.forEach(todo => {
        const li=document.createElement("li");
        const p=document.createElement("p");
        p.innerHTML=todo.text || todo;
        if(todo.completed){
            p.style.textDecoration = "line-through";
        }
        li.appendChild(p);

        // Edit button
        const editbtn=document.createElement("button");
        editbtn.innerText="Edit";
        editbtn.classList.add("btn","edit-button");
        li.appendChild(editbtn);

        // Delete button
        const deletebtn=document.createElement("button");
        deletebtn.innerText="Remove";
        deletebtn.classList.add("btn","delete-button");
        li.appendChild(deletebtn);

        // Complete button
        const completebtn=document.createElement("button");
        completebtn.innerText=todo.completed ? "Completed" : "Complete";
        completebtn.classList.add("btn","complete-button");
        li.appendChild(completebtn);

        todolist.appendChild(li);
        inputBox.value="";
    });
}

const removelocaltodo=(todo)=>{
    let todos = [];
    if(localStorage.getItem("todos")!==null){
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    let todoText=todo.children[0].innerHTML;
    let todoIndex = todos.findIndex(t => (t.text || t) === todoText);
    if(todoIndex > -1){
        todos.splice(todoIndex,1);
        localStorage.setItem("todos",JSON.stringify(todos));
    }
}

const editLocaltodos=(todo,oldValue)=>{
    let todos=JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.findIndex(t => (t.text || t) === oldValue);
    if(todoIndex > -1){
        if(typeof todos[todoIndex] === "string"){
            todos[todoIndex] = {text: todo, completed: false};
        } else {
            todos[todoIndex].text = todo;
        }
        localStorage.setItem("todos",JSON.stringify(todos));
    }
    inputBox.value="";
}


const updateCompleteStatus = (text, completed) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let todoIndex = todos.findIndex(t => (t.text || t) === text);
    if(todoIndex > -1){
        if(typeof todos[todoIndex] === "string"){
            todos[todoIndex] = {text: text, completed: completed};
        } else {
            todos[todoIndex].completed = completed;
        }
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}

document.addEventListener('DOMContentLoaded',localtodo);
addbtn.addEventListener('click',addtodo);
todolist.addEventListener('click',updatetodo);


