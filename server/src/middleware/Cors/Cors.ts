import cors from "cors";

export const innerCors = cors({
    origin: process.env.origin,
    // credentials:true
})