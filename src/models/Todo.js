class Todo {
  constructor(title, desc, dueDate, priority) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

export default Todo;