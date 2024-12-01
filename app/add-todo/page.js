import FromAction from "../_components/FromAction";
import { saveTodo } from "./actions";

export default async function Todo() {
	return (
		<div className="flex flex-col justify-center items-center h-full">
			<div className="z-2 rounded-lg shadow-xl shadow-blue-400 w-1/2 h-[500px] py-4 flex flex-col gap-4 items-center bg-white">
				<p className="text-2xl font-bold">Todo list</p>
				<FromAction saveTodo={saveTodo} />
			</div>
		</div>
	);
}
