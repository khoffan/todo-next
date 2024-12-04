import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import TableTodos from "./_components/TableTodos";

let todoList = [];
export default async function Home() {
	try {
		const res = await fetch(`${process.env.API_URL}/api/todos`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		const result = await res.json();
		todoList = result;
	} catch (error) {
		console.log(error);
	}
	return (
		<div className="w-full divide-y-2">
			<div className="flex justify-between px-6 mt-4 items-center">
				<p className="text-2xl text-center cursor-default font-bold">Todo List</p>
				<Link
					href="/add-todo"
					className="p-2 bg-blue-400 text-white text-center rounded-lg hover:bg-blue-600 transition-all duration-500 hover:-translate-y-2"
				>
					เพิม Todo
				</Link>
			</div>
			<div className="mt-2 p-2 flex flex-col justify-center">
				<p className="text-3xl cursor-default text-center font-bold mb-2 text-blue-800">
					รายการ Todo ทั้งหมด
				</p>
				<Suspense fallback={<Loading />}>
					{todoList != null && <TableTodos todoData={todoList} />}
				</Suspense>
			</div>
		</div>
	);
}
