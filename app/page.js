import Link from "next/link";

export default async function Home() {
	const getdata = await fetch("http://localhost:3000/api/todos", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});
	const result = await getdata.json();
	console.log(result);
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
					<div className="mt-2 p-2 ">
						<p>รายการ Todo ทั้งหมด</p>
						<div className="overflow-auto w-full ">
							<ul>
								{todoList.map((todo) => {
									return (
										<li key={todo.id}>
											{todo.todo_name}
											{todo.todo_status}
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
