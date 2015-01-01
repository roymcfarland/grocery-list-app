///////////////////////////////////////
//////// GLOBAL VARIABLES /////////////
///////////////////////////////////////
var taskInput = document.getElementById('new-task');
var addButton = document.getElementsByTagName('button')[0];
var incompleteTasksHolder = document.getElementById('incomplete-tasks');
var completedTasksHolder = document.getElementById('completed-tasks');

// Create new task list item
var createNewTaskElement = function(taskString) {
    // List item
  var listItem = document.createElement('li');
    // input checkbox
  var checkBox = document.createElement('input'); // checkbox type
    // Label
  var label = document.createElement('label');
    // Input (text)
  var editInput = document.createElement('input');
    // Button.edit
  var editButton = document.createElement('button');
    // Button.delete
  var deleteButton = document.createElement('button');
    
    // Each of these elements will need to be modified
  
  checkBox.type = 'checkbox';
  editInput.type = 'text';
  
  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';
  
  label.innerText = taskInput.value;
  
    // Each of these elements will need to be appended to DOM
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem;
};

//////////////////////////////////////
/////////// FUNCTIONS ////////////////
//////////////////////////////////////
// Add a new task.
var addTask = function() {
  console.log('Add task...');
  // Create a new list item with the text from #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  // Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  
  taskInput.value = '';
};


// Edit an existing task.
var editTask = function() {
  console.log('Edit task...');

  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector('label');
  
  var containsClass = listItem.classList.contains('editMode');
  
  // If the class of the parent is class .editMode
  if(containsClass) {
  // Switch from .editMode
  // Make label text become the input's value
  label.innerText = editInput.value;
  } else {
  // Switch to .editMode
  // Input value becomes the label's text
  editInput.value = label.innerText;
  };
  
  // Toggle .editMode on the list item
  listItem.classList.toggle('editMode');

};


// Delete an existing task.
var deleteTask = function() {
  console.log('Delete task...');
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  // Remove the parent list item from the ul
  ul.removeChild(listItem);
};
  

// Mark a task as complete.
var taskCompleted = function() {
  console.log('Task complete...');
  var listItem = this.parentNode;
  // Append the task list item to the #completed-tasks
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

// Mark a task as incomplete.
var taskIncomplete = function() {
  console.log('Task incomplete...');
  var listItem = this.parentNode;
  // Append the task list item to the #incomplete-tasks
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log('Bind list item events');
  // Select list item's children
  var checkBox = taskListItem.querySelector('input[type=checkbox]');
  var editButton = taskListItem.querySelector('button.edit');
  var deleteButton = taskListItem.querySelector('button.delete');  
    
    // bind editTask to edit button
    editButton.onclick = editTask;
    
    // bind deleteTask to the delete button
    deleteButton.onclick = deleteTask;
    
    // bind checkBoxEventHandler to the check box
    checkBox.onchange = checkBoxEventHandler;
};

var ajaxRequest = function() {
  console.log('AJAX request');
};
addButton.onclick = ajaxRequest;

//////////////////////////////////////
////////// EVENT HANDLERS ////////////
//////////////////////////////////////

// Set the click hanlder to the addTask function
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

// Cycle over incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  // bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
};


// Cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  // bind events to list item's children (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
};
