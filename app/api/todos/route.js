import { PrismaClient } from "@prisma/client";

const prima = new PrismaClient();

export async function GET(request) {
	try {
		const todos = await prima.todos.findMany();
		return Response.json({
			todos
		});
	} catch (error) {
		console.log(error);
	}
}

export async function POST(request) {
	const { todo_name, todo_status } = await request.json();

	await prima.todos.create({
		data: {
			todo_name,
			todo_status
		}
	});

	return Response.json({ result: "ok" });
}
