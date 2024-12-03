export default function Loading() {
	return (
		<div className="relative top-1/2 -translate-y-1/2 w-full flex justify-center items-center">
			<div className="flex items-center space-x-2">
				<div className="w-8 h-8 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
			</div>
		</div>
	);
}
