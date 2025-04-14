const deleteBtn = document.querySelectorAll('.del');
const todoItem = document.querySelectorAll('span.not');
const editBtn = document.querySelectorAll('.edit');
const todoComplete = document.querySelectorAll('span.completed')

// Adding event listeners for existing buttons on page load
Array.from(deleteBtn).forEach((el) => {
    el.addEventListener('click', deleteTodo);
});

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

Array.from(editBtn).forEach((el) => {
    el.addEventListener('click', function () {
        editTask(el.closest('li'));  // Passing the parent li of the edit button
    });
});

// Function for deleting todos
// Function for deleting todos
async function deleteTodo() {
    // find the closest <li> and grab its data-id
    const todoId = this.closest('li').dataset.id;
  
    try {
      const response = await fetch('/todos/delete', {
        method: 'DELETE',                       // match your route
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          todoIdFromJSFile: todoId              // same key your controller expects
        }),
      });
  
      if (response.ok) {
        // remove the <li> from the DOM so no reload is needed
        this.closest('li').remove();
      } else {
        console.error('Delete failed:', response.statusText);
      }
    } catch (err) {
      console.error(err);
    }
  }
  
  // Re-bind your delete handlers on page load
  document.querySelectorAll('.del').forEach(btn => {
    btn.addEventListener('click', deleteTodo);
  });

// Function for editing todos
function editTask(li) {
    let currentText = li.querySelector("span").textContent;
    let [currentTask, currentTime] = currentText.split(" @ ");

    // Create inputs for new task and time
    let newTaskInput = document.createElement("input");
    newTaskInput.type = "text";
    newTaskInput.value = currentTask;

    let newTimeInput = document.createElement("input");
    newTimeInput.type = "time";
    newTimeInput.value = currentTime;

    // Save button to save the changes
    let saveBtn = document.createElement("button");
    saveBtn.textContent = "💾 Save";
    saveBtn.style.marginLeft = "5px";
    saveBtn.style.cursor = "pointer";
    saveBtn.onclick = function () {
        saveTask(li, newTaskInput.value, newTimeInput.value);
    };

    li.innerHTML = ""; // Clear the li content
    li.appendChild(newTaskInput);
    li.appendChild(newTimeInput);
    li.appendChild(saveBtn);
}

// Function for saving edited task
function saveTask(li, newTask, newTime) {
    if (newTask.trim() !== "" && newTime !== "") {
        const id = li.getAttribute("data-id");

        // Send a PUT request to update the task
        fetch("/todos/edit", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                updatedTask: `${newTask} @ ${newTime}`,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                // After the update, display the updated task in the li element
                li.innerHTML = `<span>${newTask} @ ${newTime}</span>`;

                // Re-create and attach the edit and delete buttons after saving
                const editBtn = document.createElement("span");
                editBtn.classList.add("edit");
                editBtn.textContent = "Edit";
                editBtn.style.marginLeft = "10px";
                editBtn.style.cursor = "pointer";
                editBtn.addEventListener("click", function () {
                    editTask(li);
                });

                const deleteBtn = document.createElement("span");
                deleteBtn.classList.add("del");
                deleteBtn.textContent = "Delete";
                deleteBtn.style.marginLeft = "5px";
                deleteBtn.style.cursor = "pointer";
                deleteBtn.addEventListener("click", () => deleteTodo());

                // Append the buttons again
                li.appendChild(editBtn);
                li.appendChild(deleteBtn);
            })
            .catch((err) => console.error("Error updating task:", err));
    } else {
        alert("Task and time cannot be empty.");
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}