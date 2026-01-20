const tasks = [
  {
    id: 1,
    title: "submit report",
    status: "completed",
    priority: 2,
    dueDate: "2025-01-10",
  },
  {
    id: 2,
    title: "fix login bug",
    status: "pending",
    priority: 1,
    dueDate: "2025-01-05",
  },
  {
    id: 3,
    title: "update docs",
    status: "pending",
    priority: 3,
    dueDate: "2025-01-20",
  },
];

// Problem 3: Task Tracker with Prototypes
/*
QUESTIONS
1.	Model tasks correctly
    a.	Create tasks using a constructor function.
    b.	Attach shared methods using prototypes.
2.	Add shared functionality
    a.	Detect whether a task is overdue.
    b.	Format task titles consistently.
3.	Analyze tasks
    a.	Sort tasks by priority.
    b.	Check whether some tasks are overdue.
    c.	Check whether all tasks have valid titles.
*/

function Task(id, title, status, priority, dueDate) {
  this.id = id;
  this.title = title;
  this.status = status;
  this.priority = priority;
  this.dueDate = dueDate;
}

Task.prototype.isOverdue = function () {
  const currentDate = new Date();
  const dueDate = new Date(this.dueDate);

  // only pending tasks can be overdue
  return this.status.toLowerCase() !== "completed" && currentDate > dueDate;
};

Task.prototype.formatTitle = function () {
  this.title = this.title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  console.log(this.title);
};

//task instances
const taskInstances = tasks.map(
  (t) => new Task(t.id, t.title, t.status, t.priority, t.dueDate),
);

// adding shared functionality to it

taskInstances.forEach((task) => {
  (task.formatTitle(), (task.overdue = task.isOverdue()));
});

// sorting by priority
const sortedTasks = [...taskInstances].sort((a, b) => a.priority - b.priority);

// / Analyze tasks
const someTasksOverdue = sortedTasks.some((task) => task.overdue);
const allTitlesValid = sortedTasks.every(
  (task) => task.title && task.title.trim() !== "",
);

// Display results
console.log("Are some tasks overdue?", someTasksOverdue ? "YES" : "NO");
console.log("Are all titles valid?", allTitlesValid ? "YES" : "NO");

console.log("\nSorted Task List:");
sortedTasks.forEach((task) => {
  console.log(`
Task ID: ${task.id}
Title: ${task.title}
Status: ${task.status}
Due Date: ${task.dueDate}
Priority: ${task.priority}
Overdue: ${task.overdue}
    `);
});
