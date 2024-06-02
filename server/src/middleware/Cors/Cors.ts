import cors from "cors";

export const innerCors = cors({
    origin: process.env.origin,
    credentials:process.env.NODE_ENV === 'development'
})