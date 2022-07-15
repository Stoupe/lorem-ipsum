import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import { trpc } from "../utils/trpc";

const Profile: NextPage = () => {
	const { replace } = useRouter();
	const { data: session, status: sessionStatus } = useSession({
		required: true,
		onUnauthenticated: () => {
			replace("/");
		},
	});

	const { data: userStats } = trpc.useQuery(["example.get-user-stats"]);
	const { mutate: deleteUserStats } = trpc.useMutation(
		"example.delete-user-stats"
	);

	if (!session) return null;

	return (
		<>
			<NavBar />
			<h1>Profile</h1>
			<p>{session.user?.name}</p>
			<button
				className="btn"
				onClick={async () => {
					deleteUserStats();
				}}
			>
				Delete all results
			</button>
			<pre>{JSON.stringify(userStats, null, 2)}</pre>
		</>
	);
};

export default Profile;
