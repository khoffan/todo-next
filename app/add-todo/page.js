import Link from "next/link";
import FromAction from "../_components/FromAction";
import { saveTodo } from "./actions";

export default function Todo() {
	return (
		<>
			<div className="w-full px-6 flex flex-rows justify-between">
				<Link href={"/"} className="relative w-[30px] h-[20px]">
					หน้าหลัก
				</Link>
				<p className="text-2xl font-bold">Add Todo list</p>
				<div></div>
			</div>
			<FromAction functionTodo={saveTodo} todoId={null} />
		</>
	);
}
