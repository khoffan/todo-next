import FromAction from "@/app/_components/FromAction";
import Link from "next/link";
import { updateTodo } from "./action";

export default async function page({ params }) {
	const { id } = await params;
	return (
		<>
			<div className="w-full px-6 flex flex-rows justify-between">
				<Link
					href={"/"}
					className="w-0 h-0 border border-t-[10px] border-transparent border-b-[10px]  border-r-[25px] border-r-black hover:border-r-gray-500 hover:transition-all hover:duration-500 hover:-translate-x-[5px]"
				></Link>
				<p className="text-2xl font-bold">Todo list</p>
				<div></div>
			</div>
			<FromAction functionTodo={updateTodo} todoId={id} />
		</>
	);
}
