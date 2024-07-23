import { z } from "zod";

export const transitionSchema = z.object({
  type: z.enum(["income", "expense"]),
});
