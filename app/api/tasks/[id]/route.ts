import { NextResponse } from "next/server";



// export const createTaskSchema = z.object({
//   title: z.string().min(5),
// });
import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  completed: z.boolean().optional(),
});

const tasks=[
    {
         id: 1,
  title: "Review Route Handlers",
  completed: true,
    createdAt:new Date().toISOString()

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


export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await req.json();
  const { id: idParam } = await params;
  const id = Number(idParam);

  const task = tasks.find((u) => u.id === id);

  if (!task) {
    return NextResponse.json({ message: "task  not found" }, { status: 404 });
  }
if(body.title)
  task.title = String(body.title).trim();
  if(body.completed!==undefined)
  task.completed =body.completed;
if (task.createdAt) task.createdAt =body.createdAt;

if (task.title===" " || String(task.completed )==="" ||task.createdAt==="")
          return NextResponse.json({ message: "unable to update task please fill correctly the fields" }, { status: 204 });


const result = updateTaskSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid task data" },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Updated", task  });
}

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);

 

  const index = tasks.findIndex((u) => u.id === id);

  if (index === -1) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const deletedTask = tasks.splice(index, 1)[0];

  return NextResponse.json({ message: "Deleted", user: deletedTask });
}

// GET one. Read the dynamic id. Return the task if it exists. Return 404 if it does not.
// export async function READONE(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id: idParam } = await params;
//   const id = Number(idParam);

 

//   const task = tasks.findIndex((u) => u.id === id);

//   if (task === -1) {
//     return NextResponse.json({ message: "task not found" }, { status: 404 });
//   }
  
// return NextResponse.json(task, { status: 200 });
 // }
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return NextResponse.json(
      { message: "Task not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(task);
}