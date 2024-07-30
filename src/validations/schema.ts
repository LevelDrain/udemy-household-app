import { z } from "zod";

export const transitionSchema = z.object({
  type: z.enum(["income", "expense"]),
  date: z.string().min(1, { message: "日付は必須です" }),
  amount: z.number().min(1, { message: "金額は1円以上入力してください" }),
  content: z
    .string()
    .min(1, { message: "何かを入力してください" })
    .max(50, { message: "内容は50文字以内にしてください" }),
  category: z
    .union([
      z.enum(["食費", "日用品", "住居費", "交際費", "娯楽", "交通費", "雑費"]),
      z.enum(["給与", "副収入", "お小遣い"]),
      z.string().length(0), // 空文字
    ])
    .refine((val) => val !== "", {
      message: "カテゴリを選択してください",
    }),
});

export type Schema = z.infer<typeof transitionSchema>;
