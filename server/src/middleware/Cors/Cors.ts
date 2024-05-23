import cors from "cors";

export const innerCors = cors({
    origin: process.env.origin?.split(','),
    credentials:true
})