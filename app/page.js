import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import TodoLabel from "./_components/todo_label";
export default async function Home() {
	const getdata = await fetch("http://localhost:3000/api/todos", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	const result = await getdata.json();
	const todoList = result["todos"];

	return (
		<div className="flex flex-col justify-center items-center h-full">
			<div className="w-1/2 h-[500px] flex flex-col z-2 shadow-lg shadow-blue-600 rounded-lg bg-white">
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
							<div className="overflow-y-auto max-h-96">
								<table className="border border-collapse border-separate border-spacing-2 w-full">
									<thead className="bg-gray-400">
										<tr>
											<th className="text-start border border-slate-400">
												Todo Name
											</th>
											<th className="text-start border border-slate-400">
												Status
											</th>
											<th className="text-start border border-slate-400">
												Action
											</th>
										</tr>
									</thead>
									<tbody>
										{todoList != null &&
											todoList.map((todo) => {
												return (
													<TodoLabel
														key={todo.id}
														todo_name={todo.todo_name}
														todo_status={todo.todo_status}
														id={todo.id}
													/>
												);
											})}
									</tbody>
								</table>
							</div>
						</Suspense>
					</div>
				</div>
			</div>
		</div>
	);
}
