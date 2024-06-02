import request from "supertest";
import server from "../../../../src/index";


describe("Test auth", () => {

    afterEach(()=>{
        server.close();
    })

    test("Test login", async () => {
        const res = await request(server).post('/api/v1/auth/login').send({ login: "nskulski", password: "admin" })
        expect(res.body.name).toBe("Norbert");
    })

    test("Test logout", async() => {
        const res = await request(server).post('/api/v1/auth/logout');
        expect(res.status).toBe(200);
    })
})