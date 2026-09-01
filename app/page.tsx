
// "use client"


const tasks = [
    {
         id: 1,
  title: "Review Route Handlers",
  completed: true,
  createdAt: new Date().toISOString()
    },{
         id: 2,
  title: "checking implemented routes correctly ",
  completed: true,
  createdAt:new Date().toISOString()
    },{
         id: 3,
  title: "implementing crud functionalities ",
  completed: false,
  createdAt:new Date().toISOString()
    }
]

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/tasks");

  const tasks= await response.json();
  return (
    <main>
      <h1>My Tasks</h1>

      {tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>
            {task.completed ? "Completed" : "Not Completed"}
          </p>
         {/* <button
  onClick={() => fetch(`/api/tasks/${task.id}`, {
    method: "DELETE",
  })}
>
  Delete
</button>
          <button
  onClick={() => fetch(`/api/tasks/${task.id}`, {
    method: "PATCH",
  })}
>
  update 
</button> */}
        </div>
      ))}
              <button>add task </button>

    </main>
  );
}