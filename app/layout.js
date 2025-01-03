import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900"
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900"
});

export const metadata = {
	title: "Next Todos",
	description: "Menage todos and list todos own"
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen bg-blue-800 overflow-hidden`}
			>
				<div className="fixed inset-0 flex flex-col justify-center items-center h-full">
					<div className="z-2 rounded-lg shadow-xl shadow-blue-400 w-[80%] h-[80%] py-4 flex flex-col gap-4 items-center bg-white">
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
