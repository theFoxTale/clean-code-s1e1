//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.querySelector('.task-block__input_mode_new');
const addButton = document.querySelector('.task-block__button_type_add');
const uncompletedTasksHolder = document.querySelector('.task-block__list_type_uncompleted');
const completedTasksHolder = document.querySelector('.task-block__list_type_completed');

//New task list item
const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');
  listItem.className = 'task-block__item';

  const label = document.createElement('label');
  label.className = 'task-block__label';

  //input (checkbox)
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.className = 'task-block__checkbox';

  //label
  const span = document.createElement('span');
  span.innerText = taskString;
  span.className = 'task-block__text';

  //input (text)
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task-block__input task-block__input_mode_standard';

  //button.edit
  const editButton = document.createElement('button');
  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'task-block__button task-block__button_type_edit';

  //button.delete
  const deleteButtonImg = document.createElement('img');
  deleteButtonImg.src = './assets/remove.svg';
  deleteButtonImg.className = 'task-block__icon';
  deleteButtonImg.alt = 'delete this task';

  const deleteButton = document.createElement('button');
  deleteButton.className = 'task-block__button task-block__button_type_delete';
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  label.appendChild(checkBox);
  label.appendChild(span);
  label.appendChild(editInput);

  listItem.appendChild(label);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};


const taskUncompleted = function(){
  console.log('Incomplete Task...');
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the .task-block__list_type_uncompleted
  const listItem = this.closest('.task-block__item');

  const taskText = listItem.querySelector('.task-block__text');
  taskText.classList.remove('task-block__text_mode_complete');

  uncompletedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

//Mark task completed
const taskCompleted = function(){
  console.log('Complete Task...');

  //Append the task list item to the .task-block__list_type_uncompleted
  const listItem = this.closest('.task-block__item');

  const taskText = listItem.querySelector('.task-block__text');
  taskText.classList.add('task-block__text_mode_complete');

  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskUncompleted);
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

  const editInput = listItem.querySelector('.task-block__input');
  const taskText = listItem.querySelector('.task-block__text');
  const editBtn = listItem.querySelector('.task-block__button_type_edit');
  const containsClass = taskText.classList.contains('task-block__text_mode_edit');

  if (containsClass) {
    //edit mode: label becomes the inputs value.
    taskText.innerText = editInput.value;
    taskText.classList.remove('task-block__text_mode_edit');

    editInput.classList.remove('task-block__input_mode_edit');
    editInput.classList.add('task-block__input_mode_standard');

    editBtn.innerText = 'Edit';
  } else {
    editInput.value = taskText.innerText;
    editInput.classList.remove('task-block__input_mode_standard');
    editInput.classList.add('task-block__input_mode_edit');

    taskText.classList.add('task-block__text_mode_edit');

    editBtn.innerText = 'Save';
  }
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
  const checkBox = taskListItem.querySelector('.task-block__checkbox');
  const editButton = taskListItem.querySelector('.task-block__button_type_edit');
  const deleteButton = taskListItem.querySelector('.task-block__button_type_delete');

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
  bindTaskEvents(completedTasksHolder.children[i], taskUncompleted);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.