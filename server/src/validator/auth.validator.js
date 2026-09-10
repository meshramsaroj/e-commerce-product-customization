import { z } from "zod"

 export const createUserSchema = z.object({
    firstName: z.string().min(2, "First Name must be atleast 2 character"),
    lastName: z.string().min(1, "Lst Name must be atleast 1 character"),
    password: z.string().min(8, "Password must be atleast 8 character"),
    email: z.string().email("Please provide valide email address").toLowerCase().trim()
 })

 export const loginUserSchema =  z.object({
   email: z.string().email("Please provide valid email address"),
   password: z.string().min(8, "Password must be atlease 8 character")
 })
