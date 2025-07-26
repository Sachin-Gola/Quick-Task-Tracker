const inputBox=document.getElementById('input-box');
const addbtn=document.getElementById('addbtn');
const todolist=document.getElementById('todolist');

let edittodo=null;

const addtodo=()=>{
    const inputText=inputBox.value.trim();
    
    if(inputText.length <=0){
        alert("You must enter")
    }
    if(addbtn.value==="Edit"){
        const oldvalue=edittodo.target.previousElementSibling.innerHTML;
        edittodo.target.previousElementSibling.innerHTML=inputText;
        editLocaltodos(inputText,oldvalue);
        addbtn.value="Add";
        inputBox.value="";
    }
    else{
        const li=document.createElement("li");  // important- basic of dom manipulation
        const p=document.createElement("p");
        p.innerHTML=inputText;
        li.appendChild(p);
        todolist.appendChild(li);

        // creating edit button
        const editbtn=document.createElement("button");
        editbtn.innerText="Edit";
        editbtn.classList.add("btn","edit-button");
        li.appendChild(editbtn);

         // creating delete button
        const deletebtn=document.createElement("button");
        deletebtn.innerText="Remove";
        li.appendChild(deletebtn);
        deletebtn.classList.add("btn","delete-button");

        todolist.append(li);
        inputBox.value="";
        saveLocaltodo(inputText);
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
}

const saveLocaltodo =(todo)=>{
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
    
}

const localtodo=()=>{
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos")) || [];
        todos.forEach(todo => {
             const li=document.createElement("li");  // important- basic of dom manipulation
             const p=document.createElement("p");
             p.innerHTML=todo;
             li.appendChild(p);
             todolist.appendChild(li);
     
             // creating edit button
             const editbtn=document.createElement("button");
             editbtn.innerText="Edit";
             editbtn.classList.add("btn","edit-button");
             li.appendChild(editbtn);
     
              // creating delete button
             const deletebtn=document.createElement("button");
             deletebtn.innerText="Remove";
             li.appendChild(deletebtn);
             deletebtn.classList.add("btn","delete-button");

             inputBox.value="";
        });
    }
}

const removelocaltodo=(todo)=>{
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    let todoText=todo.children[0].innerHTML;
    let todoIndex=todos.indexOf(todoText);
    
    todos.splice(todoIndex,1);
    localStorage.setItem("todos",JSON.stringify(todos))
    console.log(todoText);

    
    
    
}

const editLocaltodos=(todo,oldValue)=>{
    let todos=JSON.parse(localStorage.getItem("todos"));
    let todoIndex=todos.indexOf(oldValue);
    todos[todoIndex]=todo;
    localStorage.setItem("todos",JSON.stringify(todos));
    inputBox.value="";
}

document.addEventListener('DOMContentLoaded',localtodo);
addbtn.addEventListener('click',addtodo);
todolist.addEventListener('click',updatetodo);


