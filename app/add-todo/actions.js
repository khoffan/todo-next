"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveTodo(todos) {
	if (!todos) {
		return { message: "ไม่มี todo", value: "" };
	}
	//const dataObj = { todo_name: todo, todo_status: todo_status };
	try {
		const res = await fetch(`${process.env.URL}/api/todos`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(todos)
		});
		if (!res.ok) {
			return { message: "ไม่มีการเพิ่ม todo ใหม่" };
		}
		const result = await res.json();
		if (result) return { message: "เพิ่ม todo สำเร็จ" }; //return res.json;
	} catch (error) {
		console.log("error", error);
	} finally {
		redirect("/");
	}
}

export async function deleteTodo(todoId) {
	try {
		const res = await fetch(`${process.env.URL}/api/todos/${todoId}`, {
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
