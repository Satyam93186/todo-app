function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") return;

  const li = document.createElement("li");
  li.textContent = taskText;
  
  li.addEventListener("click", () => {
    li.classList.toggle("done");
    saveTasks();
  });

  li.addEventListener("dblclick", () => {
    li.remove();
    saveTasks();
  });

  document.getElementById("taskList").appendChild(li);
  input.value = "";
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("li").forEach(li => {
    tasks.push({ text: li.textContent, done: li.classList.contains("done") });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) li.classList.add("done");
    li.addEventListener("click", () => {
      li.classList.toggle("done");
      saveTasks();
    });
    li.addEventListener("dblclick", () => {
      li.remove();
      saveTasks();
    });
    document.getElementById("taskList").appendChild(li);
  });
}

loadTasks();
