"use client";

export default function PopupAlert({ popupFunction }) {
	return (
		<div className="fixed inset-0 flex justify-center items-center">
			<div className="z-4 p-4 border border-red-400 w-48 h-[180px] rounded-lg text-white font-bold shadow-lg">
				<div className="flex flex-col items-center justify-center gap-4">
					<div className="bg-gay-400 animate-pop">
						<p className="text-4xl text-black">X</p>
					</div>
					<button
						onClick={popupFunction}
						className="p-2 bg-red-500 rounded-md text-white "
					>
						Closed
					</button>
				</div>
			</div>
		</div>
	);
}
