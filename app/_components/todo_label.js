"use client";

import Link from "next/link";
import { deleteTodo } from "../add-todo/actions";
export default function TodoLabel({ todo_name, todo_status, id }) {
	const handleDelte = async () => {
		deleteTodo(id);
	};

	const statusClass =
		todo_status === "pending"
			? "bg-blue-500 text-white"
			: todo_status === "Completed"
			? "bg-green-500 text-white"
			: todo_status === "closed"
			? "bg-red-500 text-white"
			: todo_status === "In-procress"
			? "bg-yellow-400 text-white"
			: "bg-gray-500 text-black";

	return (
		<tr className="">
			<td className="text-xl font-base text-start border border-slate-400">{todo_name}</td>
			<td className={`p-2 text-start border border-slate-400 rounded-lg ${statusClass}`}>
				{todo_status || "ไม่มีสถานะ"}
			</td>
			<td className="flex ">
				{id ? (
					<>
						<Link
							href={`/edit-todo/${id}`}
							className="block p-2 w-[60px] bg-yellow-600 text-white rounded-lg mx-2"
						>
							Edit
						</Link>
						<button
							onClick={(e) => handleDelte()}
							className="block p-2 w-[60px] bg-red-600 text-white rounded-lg"
						>
							Delete
						</button>
					</>
				) : (
					<p>No ID available</p>
				)}
			</td>
		</tr>
	);
}
