import FromAction from "@/app/_components/FromAction";
import Link from "next/link";
import { updateTodo } from "./action";

export default async function page({ params }) {
	const { id } = await params;
	return (
		<>
			<div className="w-full px-6 flex flex-rows justify-between">
				<Link href={"/"} className="relative w-[30px] h-[20px]">
					หน้าหลัก
				</Link>
				<p className="text-2xl font-bold">Todo list</p>
				<div></div>
			</div>
			<FromAction functionTodo={updateTodo} todoId={id} />
		</>
	);
}
