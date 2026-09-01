import { NextResponse } from "next/server";
import { title } from "process";
import { z } from "zod";


export const createTaskSchema = z.object({
  title: z.string().min(5),
});

const tasks=[
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

// export async function GET() {
//   return NextResponse.json(tasks, { status: 200 });
  
// }

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const completed = searchParams.get("completed");

  if (completed === "true") {
    return NextResponse.json(
      tasks.filter(task => task.completed)
    );
  }

  return NextResponse.json(tasks);
}
//so hon hasab el url baaref  el tasks el completed only or all tasks



// POST
export async function POST(req: Request) {
  const body= await req.json();
 const result = createTaskSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid task data" },
      { status: 400 }
    );
  }


  const newTask = {
    id: tasks.length ?tasks[tasks.length - 1].id + 1 : 1,//bzidu bi ekher el array 
    title: String(body.title).trim(),completed:false,createdAt:(body.createdAt).toISOString()

  };


if (newTask.title=="") return NextResponse.json(newTask, { status: 400 });//or use zod better 
 
 tasks.push(newTask);

  return NextResponse.json(newTask, { status: 201 });
}
//Add filtering with /api/tasks?completed=true
export async function GETCOMPLETED() {
//   const allTasks=GETALL();

const completed=tasks.filter(task=>task.completed)
 return NextResponse.json(completed, { status: 200 });
}
