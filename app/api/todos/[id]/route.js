import { PrismaClient } from "@prisma/client";

const prima = new PrismaClient();
const now = new Date();
export async function PUT(request, { params }) {
	try {
		const { todo_name, todo_status } = await request.json();
		const todoId = (await params).id;
		if (todoId) {
			const update_todo = await prima.todos.update({
				where: { id: todoId },
				data: {
					todo_name,
					todo_status,
					updated_at: now
				}
			});
			return Response.json(update_todo);
		}
	} catch (error) {
		console.log(error);
	}
}

export async function DELETE(request, { params }) {
	try {
		const todoId = (await params).id;
		if (todoId) {
			await prima.todos.delete({
				where: { id: todoId }
			});
			return Response.json({ message: "delete successfully" });
		}
	} catch (error) {
		console.log(error);
	}
}
