import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().trim().min(1, "Tên không được để trống"),
  price: z.number().min(1, "Giá tiền không được để trống"),
  detailDesc: z.string().trim().min(1, "Mô tả chi tiết không được để trống"),
  shortDesc: z.string().trim().min(1, "Mô tả ngắn không được để trống"),
  quantity: z.number().min(1, "Số lượng không được để trống"),
  factory: z.string().trim().min(1, "factory không được để trống"),
  target: z.string().trim().min(1, "target không được để trống"),


});


export type TProductSchema = z.infer<typeof ProductSchema>;