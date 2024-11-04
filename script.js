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

//creating a var for the cancel buttons
const cancelProjectBtn = document.getElementById('cancelProject')
const cancelTaskBtn = document.getElementById('cancelTask')

let projects = []
let currentProject = null

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
        projectDialog.style.display = 'none'
        updateProject()
    }
})

//creatng each project
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

//to add a new tas when the submt button s clced
taskForm.addEventListener('submit' , function(e){
    e.preventDefault()
    const taskName = taskInput.value.trim()
    if (taskName && currentProject){
        currentProject.tasks.push(taskName)
        updateTask()
        taskDialog.style.display = 'none'
    } 
})


function updateTask (){
    taskTab.innerHTML = ''
    currentProject.tasks.forEach(task => {
        const li = document.createElement("li")
        li.textContent = task
        taskTab.appendChild(li)
    })
}