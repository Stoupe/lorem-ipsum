import { createRouter } from "./context";
import { z } from "zod";
import { LoremIpsum } from "lorem-ipsum";

export const exampleRouter = createRouter()
	.query("getWords", {
		async resolve({ ctx }) {
			const words = new LoremIpsum().generateParagraphs(1);
			return words;
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
