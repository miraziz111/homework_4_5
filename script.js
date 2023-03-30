"use strict"

let elForm = document.querySelector("#form");
let elList = document.querySelector("#list");


elForm.addEventListener("submit",evt =>{
  evt.preventDefault()
  let {todosInp}= evt.target.elements
  let newObj ={
    id: todosRes.length + 1,
    todo: todosInp.value.trim(),
    checkBox :false,
  }
  todosRes.unshift(newObj);
  todosInp.value = null;
  setLocalStorage(todosRes)
  renderFunc(todosRes,elList)
});
let todosRes =getLocalStorage()|| []


function renderFunc(array ,element) {
  element.innerHTML = null;
  for (let i = 0; i < array.length; i++) {
    let newLi = document.createElement("li");
    let checkInp = document.createElement("input");
    let newP = document.createElement("p");
    let newBtn = document.createElement("button");
    if(array[i].checkBox){
      checkInp.setAttribute("checked","true")
    }
    
    newLi.setAttribute("class", "item flex items-center gap-10 mb-4");
    checkInp.setAttribute("type", "checkbox");
    newP.setAttribute("class","text-white")
    newBtn.setAttribute("class", "bg-rose-700 px-6 text-yellow-500 rounded-2xl");
    newBtn.setAttribute("id","delBtn");
    newBtn.dataset.todoId = array[i].id;
    checkInp.dataset.todoId = array[i].id;

    newBtn.addEventListener("click", evt =>{
      evt.preventDefault()
      let li = newBtn.parentNode
      let ul = li.parentNode
      let todoBtn = evt.target.dataset.todoId;
      let foundIndex = todosRes.findIndex((item) => item.id ==todoBtn);
      todosRes.splice(foundIndex,1);
       setLocalStorage(todosRes);
       ul.removeChild(li)
      // renderFunc(todosRes,elList )
    })
    checkInp.addEventListener("click", evt =>{
      evt.preventDefault()
      let todoBtn = evt.target.dataset.todoId;
      let foundInp = todosRes.find((item) => item.id ==todoBtn);
      foundInp.checkBox = !foundInp.checkBox
      setLocalStorage(todosRes);
      renderFunc(todosRes,elList )
    })
    
    newP.textContent = array[i].todo;
    newBtn.textContent = "Delete";
    
    newLi.append(checkInp);
    newLi.append(newP);
    newLi.append(newBtn);
    element.append(newLi);
    
  }
  
}

renderFunc(todosRes,elList )

function setLocalStorage (value){
 return window.localStorage.setItem("todo",JSON.stringify(value))
}
function getLocalStorage (){
  return JSON.parse(window.localStorage.getItem("todo"))
 }


