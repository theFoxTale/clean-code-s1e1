//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.getElementById('new-task');
const addButton = document.querySelector('.add-button');
const uncompletedTasksHolder = document.getElementById('uncompleted-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

//New task list item
const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');
  listItem.className = 'one-task';

  //input (checkbox)
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.className = 'task-checkbox';

  //label
  const label = document.createElement('label');
  label.innerText = taskString;
  label.className = 'task-label';

  //input (text)
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task-input';

  //button.edit
  const editButton = document.createElement('button');
  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit-button';

  //button.delete
  const deleteButtonImg = document.createElement('img');
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = 'remove-image';

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};


const taskIncomplete = function(){
  console.log('Incomplete Task...');
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #uncompleted-tasks.
  const listItem = this.parentNode;
  uncompletedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

//Mark task completed
const taskCompleted = function(){
  console.log('Complete Task...');

  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const addTask = function () {
  console.log('Add Task...');
  //Create a new list item with the text from the #new-task:
  if (!newTaskInput.value) return;
  const listItem = createNewTaskElement(newTaskInput.value);

  //Append listItem to incompleteTaskHolder
  uncompletedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  newTaskInput.value = '';
};

//Edit an existing task.
const editTask = function () {
  console.log('Edit Task...');
  console.log('Change "edit" to "save"');

  const listItem = this.parentNode;

  const editInput = listItem.querySelector('.task-input');
  const label = listItem.querySelector('.task-label');
  const editBtn = listItem.querySelector('.edit-button');
  const containsClass = listItem.classList.contains('edit-mode');

  //If class of the parent is .edit-mode
  if (containsClass) {
    //switch to .edit-mode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  //toggle .edit-mode on the parent.
  listItem.classList.toggle('edit-mode');
};

//Delete task.
const deleteTask = function () {
  console.log('Delete Task...');

  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
};


const ajaxRequest = function () {
  console.log('AJAX Request');
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

const bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  console.log('bind list item events');
//select ListItems children
  const checkBox = taskListItem.querySelector('.task-checkbox');
  const editButton = taskListItem.querySelector('.edit-button');
  const deleteButton = taskListItem.querySelector('.delete-button');

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < uncompletedTasksHolder.children.length; i++) {
  //bind events to list items children(tasksCompleted)
  bindTaskEvents(uncompletedTasksHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i= 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items children(tasksUncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.