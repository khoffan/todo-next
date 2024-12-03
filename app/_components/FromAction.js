"use client";

import React, { useRef, useState, useEffect } from "react";

export default function FromAction({ functionTodo, todoId }) {
	const [currentData, setCurrentData] = useState({
		todo_name: "",
		todo_status: "",
		color: "black"
	});
	const [previews, setPreviews] = useState([]);
	const [isEdit, setIsedit] = useState(false);
	const selectRef = useRef(null);

	const fetchData = async (id) => {
		const res = await fetch(`${process.env.URL}/api/todos/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		const result = await res.json();
		setCurrentData(result);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCurrentData((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	const handleUpdatePreview = (e) => {
		e.preventDefault();
		try {
			let todo_name = currentData.todo_name;
			let todo_status = currentData.todo_status;
			const todoObj = {
				todo_name,
				todo_status
			};

			localStorage.setItem("edit-todo", JSON.stringify([todoObj]));
			const storeEditTodo = JSON.parse(localStorage.getItem("edit-todo")) || [];
			setPreviews(storeEditTodo);
			setCurrentData({
				todo_name: "",
				todo_status: ""
			});
			//functionTodo(updateTodo, todoId);
			//alert("update สำเร็จ");
		} catch (error) {
			alert("update ไม่สำเร็จ");
		}
	};

	const handleSetTodo = (event) => {
		event.preventDefault();

		try {
			const fromData = {
				todo_name: currentData.todo_name,
				todo_status: currentData.todo_status
			};

			const storeLocal = JSON.parse(localStorage.getItem("todos")) || [];

			const updateTodo = [...storeLocal, fromData];

			localStorage.setItem("todos", JSON.stringify(updateTodo));
			setPreviews(updateTodo);
			setCurrentData({
				todo_name: "",
				todo_status: ""
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleSetTodos = (e) => {
		e.preventDefault();
		try {
			localStorage.removeItem("todos");
			functionTodo(previews);
			setPreviews([]);
		} catch (error) {
			console.log(error);
		}
	};

	const handlePatchTodo = (e) => {
		e.preventDefault();
		try {
			localStorage.removeItem("edit-todo");
			functionTodo(previews, todoId);
			setPreviews([]);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteTodo = (index) => {
		try {
			const storeTodo = JSON.parse(localStorage.getItem("todos")) || [];

			const updateAndDelete = storeTodo.filter((_, i) => i !== index);

			localStorage.setItem("todos", JSON.stringify(updateAndDelete));

			setPreviews(updateAndDelete);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSelectChange = (event) => {
		const { name, value } = event.target;

		// กำหนดสีตามสถานะ
		let color;

		switch (value || currentData.todo_status) {
			case "pending":
				color = "blue";
				break;
			case "In-procress":
				color = "gold";
				break;
			case "Completed":
				color = "green";
				break;
			case "Closed":
				color = "red";
				break;
			default:
				color = "#f9f9f9";
				break;
		}
		if (selectRef.current) {
			selectRef.current.style.color = color;
		}

		// อัปเดต state
		setCurrentData((prevState) => ({
			...prevState,
			[name]: value,
			color // อัปเดตสีใน state
		}));
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "Completed":
				return "text-green-500"; // สีเขียวสำหรับสถานะเสร็จสิ้น
			case "In-progress":
				return "text-blue-500"; // สีน้ำเงินสำหรับสถานะกำลังทำ
			case "pending":
				return "text-yellow-500"; // สีเหลืองสำหรับสถานะรอดำเนินการ
			case "Closed":
				return "text-red-500"; // สีเหลืองสำหรับสถานะรอดำเนินการ
			default:
				return "text-gray-500"; // สีเทาสำหรับสถานะอื่นๆ
		}
	};

	useEffect(() => {
		if (todoId && previews.length === 0) {
			fetchData(todoId);
		}
		if (todoId) {
			setIsedit(true);
		}
	}, [todoId]);

	useEffect(() => {
		if (todoId) {
			const storeEditTodo = JSON.parse(localStorage.getItem("edit-todo")) || [];
			if (storeEditTodo.length > 0) {
				setPreviews(storeEditTodo); // โหลดข้อมูลเข้า state เมื่อ component mount
				setCurrentData({
					todo_name: "",
					todo_status: ""
				});
			}
		} else {
			const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];

			setPreviews(storedTodos); // โหลดข้อมูลเข้า state เมื่อ component mount
		}
	}, [todoId]);
	console.log(previews);
	return (
		<>
			<form
				onSubmit={isEdit ? handleUpdatePreview : handleSetTodo}
				className="w-full flex gap-4 justify-center"
			>
				<input
					type="text"
					name="todo_name"
					placeholder="todo"
					value={currentData.todo_name || ""}
					onChange={handleInputChange}
					required
					className="bg-inherit w-1/2 rounded-md border border-2 border-blue-700 pl-2"
				/>
				<select
					name="todo_status"
					id="status"
					value={currentData.todo_status || ""}
					required
					onChange={handleSelectChange}
					style={{ color: currentData.color }}
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
					className="px-4 py-2 w-[80px] bg-blue-400 text-white rounded-lg hover:bg-blue-600 hover:trasition-all hover:duration-700"
				>
					{isEdit ? "Update" : "Add"}
				</button>
			</form>
			<div className="flex justify-center w-full min-h-[370px] overflow-auto my-2">
				<table className="w-[90%] rounded-lg shadow-lg border-collapse overflow-hidden">
					<thead className="bg-blue-600 text-white">
						<tr>
							<th className="p-4 text-left">Todo Name</th>
							<th className="p-4 text-left">Todo Status</th>
							<th className="p-4 text-left">Actions</th>
						</tr>
					</thead>
					<tbody className="bg-gray-50">
						{previews.length > 0 ? (
							previews.map((preview, index) => (
								<tr
									key={index}
									className="border-t border-gray-300 hover:bg-gray-100"
								>
									<td className="p-4">{preview.todo_name}</td>
									<td className={`p-4 ${getStatusColor(preview.todo_status)}`}>
										{preview.todo_status}
									</td>
									<td className="p-4 text-center">
										<button
											onClick={() => handleDeleteTodo(index)}
											className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
										>
											Delete
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="3" className="p-4 text-center text-gray-500">
									ไม่มีการเพิ่มข้อมูล
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<div className="px-3 w-[80%] flex items-center justify-end">
				<button
					onClick={isEdit ? handlePatchTodo : handleSetTodos}
					className="p-3 bg-blue-500 text-white outline-2 ouline-blue-700 rounded-lg"
				>
					{isEdit ? "Update Todo" : "Add todos"}
				</button>
			</div>
		</>
	);
}
