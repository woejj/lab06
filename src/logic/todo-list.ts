// Represents an individual task
export class Task {
  name: string
  isComplete: boolean

  constructor(name: string, isComplete=false) {
    this.name = name
    this.isComplete = isComplete
  }

  toggleCompletion() {
    this.isComplete = !this.isComplete
  }
}

// Represents a list of tasks
export class TodoList {
  tasks: Task[]

  constructor() {
    this.tasks = []
  }

  addTask(taskToAdd: Task) {
    if (taskToAdd.name) {
      this.tasks.push(taskToAdd)
    }
  }

  deleteTask(taskToRemove: Task) {
    const indexToRemove = this.tasks.indexOf(taskToRemove);
    if (indexToRemove !== -1) {
      this.tasks.splice(indexToRemove, 1);
    }
  }
  
  countTotalTasks() {
    return this.tasks.length
  }

  countIncompleteTasks() {
    return this.tasks
      .filter((task) => !task.isComplete)
      .length
  }

  countCompleteTasks() {
    return this.tasks
      .filter((task) => task.isComplete)
      .length
  }

  checkIsEntireListComplete() {
    const listHasTasks = this.tasks.length > 0
    const allTasksAreCompleted = this.countTotalTasks() === this.countCompleteTasks()
    return listHasTasks && allTasksAreCompleted
  }
}