import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const NavBar: NextPage = () => {
	const { data: session, status } = useSession();
	return (
		<header className="navbar bg-base-200 gap-4">
			<div className="flex-1">
				<Link href={"/"}>
					<h1 className="btn btn-ghost normal-case text-xl">
						Lorem Ipsum Typer
					</h1>
				</Link>
			</div>
			{status === "authenticated" ? (
				<>
					<Link href={"/profile"}>Profile</Link>
					<button onClick={() => signOut()}>Logout</button>
				</>
			) : (
				<button onClick={() => signIn()}>Login</button>
			)}

			<div className="flex-none">
				<button className="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block w-5 h-5 stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
						></path>
					</svg>
				</button>
			</div>
		</header>
	);
};

export default NavBar;
