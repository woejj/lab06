import { Task, TodoList } from '@logic/todo-list'

describe('To-do list functionality', () => {

  it('should correctly add a single new task to the to-do list', () => {
    // Arrange
    const todoList = new TodoList()
    const newTask = new Task('Test task')

    // Act
    todoList.addTask(newTask)
    
    // Assert
    // 💡 Tip: use toEqual() to compare arrays and objects, and toBe() to compare primitive values (like numbers or booleans)
    expect(todoList.tasks).toEqual([newTask])
  })

  it('should correctly add multiple new tasks to the to-do list', () => {
    const todoList = new TodoList()
    const testTask1 = new Task('Test task 1')
    const testTask2 = new Task('Test task 2')

    todoList.addTask(testTask1)
    todoList.addTask(testTask2)

    expect(todoList.tasks).toEqual([testTask1, testTask2])
  })

  it('should not add a task to a list if the task has no name', () => {
    const todoList = new TodoList()
    const testTask = new Task('')

    todoList.addTask(testTask)

    expect(todoList.tasks).toEqual([])
  })

  it('should correctly toggle the completion status of a task', () => {
    const testTask = new Task('Test task')

    expect(testTask.isComplete).toBe(false)

    testTask.toggleCompletion()
    expect(testTask.isComplete).toBe(true)

    testTask.toggleCompletion()
    expect(testTask.isComplete).toBe(false)
  })

  it('should correctly delete a task from a to-do list', () => {
    const todoList = new TodoList()
    const taskToDelete = new Task('Task to delete')
    const taskToKeep = new Task('Task to keep')
    todoList.addTask(taskToDelete)
    todoList.addTask(taskToKeep)

    todoList.deleteTask(taskToDelete)

    expect(todoList.tasks).toEqual([taskToKeep])
  })

  it('should count the correct number of total tasks in a to-do list', () => {
    const todoList = new TodoList()
    todoList.addTask(new Task('1'))
    todoList.addTask(new Task('2'))
    todoList.addTask(new Task('3'))

    const tasksCount = todoList.countTotalTasks()

    expect(tasksCount).toBe(3)
  })

  it('should count the correct number of incomplete tasks in a to-do list', () => {
    const todoList = new TodoList()
    todoList.addTask(new Task('1', false))
    todoList.addTask(new Task('2', false))
    todoList.addTask(new Task('3', true))

    const incompleteTasksCount = todoList.countIncompleteTasks()

    expect(incompleteTasksCount).toBe(2)
  })

  it('should count the correct number of complete tasks in a to-do list', () => {
    const todoList = new TodoList()
    todoList.addTask(new Task('1', true))
    todoList.addTask(new Task('2', false))
    todoList.addTask(new Task('3', false))

    const completeTasksCount = todoList.countCompleteTasks()

    expect(completeTasksCount).toBe(1)
  })

  it('should determine that a to-do list is not complete if there are no tasks in it', () => {
    const todoList = new TodoList()
    const isListComplete = todoList.checkIsEntireListComplete()
    expect(isListComplete).toBe(false)
  })

  it('should determine that a to-do list is not complete if it contains incomplete tasks', () => {
    const todoList = new TodoList()
    todoList.addTask(new Task('1', true))
    todoList.addTask(new Task('2', true))
    todoList.addTask(new Task('3', false))

    const isListComplete = todoList.checkIsEntireListComplete()

    expect(isListComplete).toBe(false)
  })

  it('should determine that a to-do list is complete if every task in it is complete', () => {
    const todoList = new TodoList()
    todoList.addTask(new Task('1', true))
    todoList.addTask(new Task('2', true))
    todoList.addTask(new Task('3', true))

    const isListComplete = todoList.checkIsEntireListComplete()

    expect(isListComplete).toBe(true)
  })
})
