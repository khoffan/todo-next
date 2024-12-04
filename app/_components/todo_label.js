"use client";

import Link from "next/link";
import { deleteTodo } from "../add-todo/actions";
export default function TodoLabel({ todo_name, todo_status, id }) {
	const handleDelete = () => {
		deleteTodo(id);
	};

	const statusClass =
		todo_status === "pending"
			? "text-blue-500"
			: todo_status === "Completed"
			? "text-green-500"
			: todo_status === "Closed"
			? "text-red-500"
			: todo_status === "In-procress"
			? "text-yellow-400"
			: "bg-gray-500 text-black";

	return (
		<tr className="hover:bg-gray-100 transition-all">
			<td className="px-4 py-2 text-xl font-medium text-gray-800 border border-slate-300">
				{todo_name}
			</td>
			<td
				className={`px-4 py-2 text-start font-bold border border-slate-300 rounded-md ${
					statusClass || "bg-gray-200 text-gray-600"
				}`}
			>
				{todo_status || "ไม่มีสถานะ"}
			</td>
			<td className="px-4 py-2 flex gap-2 justify-start items-center">
				{id ? (
					<>
						<Link
							href={`/edit-todo/${id}`}
							className="p-2 w-[80px] text-center bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all"
						>
							Edit
						</Link>
						<button
							onClick={handleDelete}
							className="p-2 w-[80px] text-center bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
						>
							Delete
						</button>
					</>
				) : (
					<p className="text-gray-500 italic">No ID available</p>
				)}
			</td>
		</tr>
	);
}
