import { PrismaClient } from "@prisma/client";

const prima = new PrismaClient();

export async function GET(request) {
	try {
		const todos = await prima.todos.findMany();
		return Response.json(todos);
	} catch (error) {
		console.log(error);
	}
}

export async function POST(request) {
	try {
		const todoDatas = await request.json();
		await prima.todos.createMany({
			data: todoDatas,
			skipDuplicates: true
		});
		console.log({ result: "ok" });

		return Response.json({ result: "ok" });
	} catch (error) {
		console.log(error);
	}
}
