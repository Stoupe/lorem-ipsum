import { createRouter } from "./context";
import { z } from "zod";
import { LoremIpsum } from "lorem-ipsum";

export const exampleRouter = createRouter()
	.query("getWords", {
		async resolve({ ctx }) {
			const words = new LoremIpsum().generateWords(3);
			return words;
		},
	})
	.query("get-user-stats", {
		resolve: async ({ ctx, input }) => {
			const session = ctx.session;
			if (!session?.user) {
				throw new Error("Not logged in");
			}
			return await ctx.prisma.user.findFirst({
				where: { id: session.user.id },
				select: {
					results: { select: { text: true, timeTaken: true, accuracy: true } },
				},
			});
		},
	})
	.mutation("delete-user-stats", {
		resolve: async ({ ctx, input }) => {
			const session = ctx.session;
			if (!session?.user) {
				throw new Error("Not logged in");
			}
			return await ctx.prisma.result.deleteMany({
				where: { userId: session.user.id },
			});
		},
	})
	.mutation("create-result", {
		input: z.object({
			userId: z.string(),
			text: z.string(),
			timeTaken: z.number(),
			accuracy: z.number(),
		}),
		resolve: async ({ ctx, input }) => {
			console.log("calling resolver");
			if (!ctx.session) {
				throw new Error("Not logged in");
			}
			const res = await ctx.prisma.result.create({
				data: {
					text: input.text,
					timeTaken: input.timeTaken,
					accuracy: input.accuracy,
					userId: input.userId,
				},
			});
			console.log(res);
		},
	});
