import Link from "next/link";
import FromAction from "../_components/FromAction";
import { saveTodo } from "./actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Todo() {
	return (
		<>
			<div className="w-full px-6 flex flex-rows justify-between">
				<Link href={"/"} className="relative w-[30px] h-[20px]">
					<FontAwesomeIcon
						icon={faArrowLeft}
						className="text-2xl hover:text-blue-400 hover:transition-all duration-500"
					/>
				</Link>
				<p className="text-2xl font-bold">Todo list</p>
				<div></div>
			</div>
			<FromAction functionTodo={saveTodo} todoId={null} />
		</>
	);
}
