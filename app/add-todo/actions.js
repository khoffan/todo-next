"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveTodo(fromData) {
	const todo = fromData["todo_name"];
	const todo_status = fromData["todo_status"];
	console.log({
		todo,
		todo_status
	});
	if (!todo) {
		return { message: "ไม่มี todo", value: "" };
	}
	const dataObj = { todo_name: todo, todo_status: todo_status };
	try {
		const res = await fetch("http://localhost:3000/api/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(dataObj)
		});
		if (!res.ok) {
			return { message: "ไม่มีการเพิ่ม todo ใหม่" };
		}
		const result = await res.json();
		if (result) return { message: "เพิ่ม todo สำเร็จ", value: dataObj }; //return res.json;
	} catch (error) {
		console.log("error", error);
	} finally {
		redirect("/");
	}
}

export async function deleteTodo(todoId) {
	try {
		const res = await fetch(`http://localhost:3000/api/todos/${todoId}`, {
			method: "DELETE"
		});
		const result = await res.json();
		if (result) {
			revalidatePath("/");
			return result;
		}
	} catch (error) {
		console.log(error);
	}
}
