//creating a var for the project tab and task tab
const projectTab = document.getElementById('projectList')
const taskTab = document.getElementById('taskList')
const addProjectBtn = document.getElementById('add-project-btn')
const addTaskBtn = document.getElementById('add-task-btn')
const projectTitle = document.querySelector('.projectTitle')

//creatng a var for the dialog 
const projectDialog = document.getElementById('projectDialog')
const taskDialog = document.getElementById('taskDialog')
const projectForm = document.getElementById('projectForm')
const taskForm = document.getElementById('taskForm')

//creating a var for the input
const projectInput = document.getElementById('projectName')
const taskInput = document.getElementById('taskName')
const dateInput = document.getElementById('dateInput')
const priorityInput = document.getElementById('priorityInput')
//creating a var for the cancel buttons
const cancelProjectBtn = document.getElementById('cancelProject')
const cancelTaskBtn = document.getElementById('cancelTask')

let projects = JSON.parse(localStorage.getItem('projects')) || []
let currentProject = null

// to save the project in the local storge
function saveProjects(){
    localStorage.setItem('projects',JSON.stringify(projects))
}

document.addEventListener('DOMContentLoaded',() => {
    updateProject()
})

//to display the task dialog
addTaskBtn.addEventListener('click',function(){
    taskDialog.style.display = 'block'
    taskInput.value = ''
})

//to display the the project dialog
addProjectBtn.addEventListener('click',function(){
    projectDialog.style.display = 'block'
    projectInput.value = ''
})

//to hide the project dialog
cancelProjectBtn.addEventListener('click',function(){
    projectDialog.style.display = 'none'
})

//to hide the task dialog
cancelTaskBtn.addEventListener('click',function(){
    taskDialog.style.display = 'none'
})

saveProjects()
//to add a new project when the submit button is clicked 

projectForm.addEventListener('submit', function(e){
    e.preventDefault()
    const projectName = projectInput.value.trim()
    if (projectName){
        const newProject = {
            name : projectName,
            tasks : []
        }
        projects.push(newProject)
        saveProjects()
        projectDialog.style.display = 'none'
        updateProject()
    }
})

//creating each project
function updateProject (){
    projectTab.innerHTML = ''
    projects.forEach (project=>{
        const li = document.createElement("li")
        li.textContent = project.name
        li.addEventListener('click', function(){
            currentProject = project
            projectTitle.textContent = project.name
            updateTask()
        }) 
        projectTab.append(li)
    } )
}

saveProjects()

//to add a new task when the submit button is clicked
taskForm.addEventListener('submit' , function(e){
    e.preventDefault()
    const taskName = taskInput.value.trim()
    const dateName = dateInput.value.trim()
    const priorityName = priorityInput.value.trim()
    if (taskName && currentProject){
        const newTask = {
            name: taskName,
            date: dateName,
            priority: priorityName,

        }
        currentProject.tasks.push(newTask)
        saveProjects()
        updateTask()
        taskDialog.style.display = 'none'
    } 
})

//creating each task
function updateTask (){
    taskTab.innerHTML = ''
    currentProject.tasks.forEach(task => {
        const li = document.createElement("li")
        li.textContent = `${task.name} ${task.date} ${task.priority}`
        taskTab.appendChild(li)
    })
}