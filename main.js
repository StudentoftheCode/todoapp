document.getElementById('addTask').addEventListener('click', button)

function button(){
    console.log('Hello')
    let time = document.getElementById("time").value
    let task = document.getElementById("task").value

    if(task.trim() !== "" && time !== ""){
        let li = document.createElement("li")
        li.innerHTML = `<span>${task} @ ${time}</span>`

        let editBtn = document.createElement("button")
        editBtn.textContent = "📝 Edit"
        editBtn.style.marginLeft = "2%"
        editBtn.style.cursor = "pointer"
        editBtn.onclick = function(){
            editTask(li)
        }

        let deleteBtn = document.createElement("button")
        deleteBtn.textContent = "❌"
        deleteBtn.style.marginLeft = "2%"
        deleteBtn.style.cursor = "pointer"
        deleteBtn.onclick = function(){
            li.remove()
        }
        li.appendChild(editBtn)
        li.appendChild(deleteBtn)
        document.getElementById("taskList").appendChild(li)
        document.getElementById("time").value = ""
        document.getElementById("task").value = ""
    }else{
        alert('Please enter both a task and a time')
    }
}

function editTask(li) {
    let currentText = li.querySelector("span").textContent;
    let [currentTask, currentTime] = currentText.split(" @ ");
   
    let newTaskInput = document.createElement("input");
    newTaskInput.type = "text";
    newTaskInput.value = currentTask;

    let newTimeInput = document.createElement("input");
    newTimeInput.type = "time";
    newTimeInput.value = currentTime;

 
    let saveBtn = document.createElement("button");
    saveBtn.textContent = "💾 Save";
    saveBtn.style.marginLeft = "5px";
    saveBtn.style.cursor = "pointer";
    saveBtn.onclick = function() {
        saveTask(li, newTaskInput.value, newTimeInput.value);
    };

    
    li.innerHTML = "";
    li.appendChild(newTaskInput);
    li.appendChild(newTimeInput);
    li.appendChild(saveBtn);
}


function saveTask(li, newTask, newTime) {
    if (newTask.trim() !== "" && newTime !== "") {
        li.innerHTML = `<span>${newTask} @ ${newTime}</span>`;

      
        let editBtn = document.createElement("button");
        editBtn.textContent = "📝 Edit";
        editBtn.style.marginLeft = "10px";
        editBtn.style.cursor = "pointer";
        editBtn.onclick = function() {
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.style.marginLeft = "5px";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.onclick = function() {
            li.remove();
        };

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
    } else {
        alert("Task and time cannot be empty.");
    }
}