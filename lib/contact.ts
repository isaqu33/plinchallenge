import { z } from "zod";

export const MAX_ATTACHMENT_BYTES = 2 * 1024 * 1024;

export const contactSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome."),
  email: z.string().trim().email("E-mail inválido."),
  motivo: z.string().trim().min(10, "Descreva o motivo (mínimo 10 caracteres)."),
  anexo: z
    .custom<FileList | undefined>()
    .optional()
    .refine((f) => !f || f.length === 0 || f[0].type === "application/pdf", "O anexo deve ser um PDF.")
    .refine((f) => !f || f.length === 0 || f[0].size <= MAX_ATTACHMENT_BYTES, "O PDF deve ter até 2 MB."),
});

export type ContactForm = z.infer<typeof contactSchema>;
