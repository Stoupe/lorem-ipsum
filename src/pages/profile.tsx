import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

const Profile: NextPage = () => {
	const { replace } = useRouter();
	const { data: session, status: sessionStatus } = useSession({
		required: true,
		onUnauthenticated: () => {
			replace("/");
		},
	});

	if (!session) return null;

	return (
		<>
			<NavBar />
			<h1>Profile</h1>
			<p>{session.user?.name}</p>
		</>
	);
};

export default Profile;
