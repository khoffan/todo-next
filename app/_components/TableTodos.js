"use client";
import { useState } from "react";
import TodoLabel from "./todo_label";
import Swal from "sweetalert2";
import { deleteTodo } from "../add-todo/actions";
export default function TableTodos({ todoData }) {
	const handleDelete = (e, id) => {
		e.preventDefault();
		Swal.fire({
			text: "ลบ todo สำเร็จ",
			icon: "success",
			scrollbarPadding: false,
			allowOutsideClick: true,
			allowEscapeKey: true,
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timer: 3000
		});
		deleteTodo(id);
	};

	return (
		<>
			<div className="overflow-y-auto overflow-hidden-scroll max-h-96 p-4 bg-gray-50 rounded-lg shadow-md">
				<table className="table-auto border-collapse border border-gray-300 w-full text-sm">
					<thead>
						<tr className="bg-gray-500 text-white">
							<th className="px-4 py-2 text-left border border-gray-400">
								Todo Name
							</th>
							<th className="px-4 py-2 text-left border border-gray-400">Status</th>
							<th className="px-4 py-2 text-left border border-gray-400">
								CreatedAt
							</th>
							<th className="px-4 py-2 text-left border border-gray-400">Action</th>
						</tr>
					</thead>
					<tbody>
						{todoData != null && todoData.length > 0 ? (
							todoData.map((todo) => (
								<TodoLabel
									key={todo.id}
									todo_name={todo.todo_name}
									todo_status={todo.todo_status}
									created_at={todo.created_at}
									id={todo.id}
									handleDelete={(e) => handleDelete(e, todo.id)}
								/>
							))
						) : (
							<tr>
								<td colSpan="3" className="px-4 py-2 text-center text-gray-500">
									No todos available
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
}
