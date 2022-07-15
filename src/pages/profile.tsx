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

	const { data } = trpc.useQuery(["example.get-user-stats"]);

	if (!session) return null;

	return (
		<>
			<NavBar />
			<h1>Profile</h1>
			<p>{session.user?.name}</p>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</>
	);
};

export default Profile;
