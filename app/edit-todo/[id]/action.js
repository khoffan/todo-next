"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateTodo(todo_name, todo_status, todoId) {
	try {
		if ((todoId, todo_name, todo_status) != null) {
			const res = await fetch(`http://localhost:3000/api/todos/${todoId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					todo_name: todo_name,
					todo_status: todo_status
				})
			});
			const result = await res.json();
		}
	} catch (error) {
		console.log(error);
	} finally {
		redirect("/");
	}
}
