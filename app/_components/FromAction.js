"use client";
import React, { useRef, useState } from "react";

export default function FromAction({ saveTodo }) {
	const ref = useRef();
	const [currentData, setCurrentData] = useState(null);
	const selectRef = useRef(null);

	const handleSelectChange = (event) => {
		const value = event.target.value;

		// กำหนดสีพื้นหลังของ select ตาม value ที่เลือก
		if (selectRef.current) {
			switch (value) {
				case "pending":
					selectRef.current.style.color = "blue";
					break;
				case "In-procress":
					selectRef.current.style.color = "gold";
					break;
				case "Completed":
					selectRef.current.style.color = "green";
					break;
				case "Closed":
					selectRef.current.style.color = "red";
					break;
				default:
					selectRef.current.style.color = "#f9f9f9";
					break;
			}
		}
	};

	return (
		<>
			<form
				ref={ref}
				onSubmit={async (event) => {
					event.preventDefault();

					const fromData = new FormData(event.target);
					ref.current?.reset("");
					await saveTodo(fromData);
				}}
				className="w-full flex gap-4 justify-center"
			>
				<input
					type="text"
					name="todo"
					placeholder="todo"
					required
					className="bg-inherit w-1/2 rounded-md border border-2 border-blue-700 pl-2"
				/>
				<select
					name="status"
					id="status"
					defaultValue=""
					ref={selectRef}
					required
					onChange={handleSelectChange}
					className="bg-inherit appearance-none w-[150px] p-2 border border-2 border-blue-500 cursor-pointer hover:ring-blue-600 focus:outline-none "
				>
					<option value="" disabled className="text-gray-400 bg-gray-200">
						สถานะ
					</option>
					<option value="pending" className="bg-white text-blue-500">
						Pending
					</option>
					<option value="In-procress" className="bg-white text-yellow-500">
						In Process
					</option>
					<option value="Completed" className="bg-white text-green-500">
						Completed
					</option>
					<option value="Closed" className="bg-white text-red-500">
						Closed
					</option>
				</select>
				<button
					type="submit"
					className="px-4 py-2 w-[80px] bg-blue-400 text-white rounded-lg "
				>
					Add
				</button>
			</form>
			{/* แสดงข้อมูลที่เพิ่มเข้าไป */}
			<div>{currentData != null && <p>{currentData.todo_name}</p>}</div>
		</>
	);
}
