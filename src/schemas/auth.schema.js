import z from "zod";

const passwordSchema = z.string().regex(/^[0-9a-zA-Z]{6,}$/);

export const registerSchema = z
  .object({
    email: z.email(),
    passwordHash: passwordSchema,
    name: z.string().optional(),
  })

  //   .transform((value) => ({ email: value.email, password: value.password })); //ปรับ value ให้เป็น email,password
  .transform(({ confirm, ...data }) => data); //สั่งว่าให้เอา confirm ออก
