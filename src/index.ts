import { TodoList, Task } from '@logic/todo-list'
import './styles.css'

let tasksList = new TodoList()

document.getElementById('task-form')?.addEventListener('submit', handleSubmitTask)
render(tasksList)

function handleSubmitTask(e: SubmitEvent) {
  e.preventDefault()
  const taskNameInputField = <HTMLInputElement>document.getElementById('input-task-name')
  const newTask = new Task(taskNameInputField?.value)

  tasksList.addTask(newTask)
  render(tasksList)
  taskNameInputField.value = ''
}

function render(list: TodoList) {
  const todoListElement = <HTMLUListElement>document.getElementById('todo-list')
  todoListElement.innerHTML = ''
  for (const task of list.tasks) {
    const taskElement = document.createElement('li')
    const label = document.createElement('label')
    const checkbox = document.createElement('input')
    const deleteButton = document.createElement('button')

    checkbox.type = 'checkbox'
    checkbox.name = 'isComplete'
    checkbox.checked = !!task.isComplete
    checkbox.addEventListener('change', () => { task.toggleCompletion(); render(list) })

    deleteButton.textContent = '⨉'
    deleteButton.addEventListener('click', () => { list.deleteTask(task); render(list) })

    taskElement.appendChild(label)
    label.appendChild(checkbox)
    label.appendChild(document.createTextNode(task.name))
    taskElement.appendChild(deleteButton)
    todoListElement.appendChild(taskElement)
  }

  document.getElementById('total-tasks-count')!.textContent = list.countTotalTasks().toString()
  document.getElementById('complete-tasks-count')!.textContent = list.countCompleteTasks().toString()
  document.getElementById('incomplete-tasks-count')!.textContent = list.countIncompleteTasks().toString()

  const isListComplete = list.checkIsEntireListComplete()

  document.getElementById('stats-section-title')!.textContent = isListComplete ? 'All done!' : 'Progress'
  document.getElementById('stats-section')!.setAttribute('data-complete', isListComplete.toString())
}