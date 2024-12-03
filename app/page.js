import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import TodoLabel from "./_components/todo_label";
import { resolve } from "styled-jsx/css";
let todoList = [];
export default async function Home() {
	await new Promise((resolve) => setInterval(resolve, 1000));

	try {
		const res = await fetch("http://localhost:3000/api/todos", {
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
				<p className="text-2xl text-center font-bold">Todo List</p>
				<Link
					href="/add-todo"
					className="p-2 bg-blue-400 text-white text-center rounded-lg hover:bg-blue-600 transition-all duration-500 hover:-translate-y-2"
				>
					เพิม Todo
				</Link>
			</div>
			<div className="mt-2 p-2 flex flex-col justify-center">
				<p className="text-3xl text-center font-bold mb-2 text-blue-800">
					รายการ Todo ทั้งหมด
				</p>
				<Suspense fallback={<Loading />}>
					<div className="overflow-y-auto overflow-hidden-scroll max-h-96 p-4 bg-gray-50 rounded-lg shadow-md">
						<table className="table-auto border-collapse border border-gray-300 w-full text-sm">
							<thead>
								<tr className="bg-gray-500 text-white">
									<th className="px-4 py-2 text-left border border-gray-400">
										Todo Name
									</th>
									<th className="px-4 py-2 text-left border border-gray-400">
										Status
									</th>
									<th className="px-4 py-2 text-left border border-gray-400">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{todoList != null && todoList.length > 0 ? (
									todoList.map((todo) => (
										<TodoLabel
											key={todo.id}
											todo_name={todo.todo_name}
											todo_status={todo.todo_status}
											id={todo.id}
										/>
									))
								) : (
									<tr>
										<td
											colSpan="3"
											className="px-4 py-2 text-center text-gray-500"
										>
											No todos available
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</Suspense>
			</div>
		</div>
	);
}
