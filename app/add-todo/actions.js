"use server";

import { revalidatePath } from "next/cache";

export async function saveTodo(fromData) {
	const todo = fromData.get("todo");
	const todo_status = fromData.get("status");
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
		if (result) return { message: "เพิ่ม todo สำเร็จ", value: dataObj };
		revalidatePath("/");
		//return res.json;
	} catch (error) {
		console.log("error", error);
	}
}
