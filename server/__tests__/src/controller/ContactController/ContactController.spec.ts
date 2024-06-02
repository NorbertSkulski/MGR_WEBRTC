import request from "supertest";
import server from "../../../../src/index";


describe("Test contact", () => {

    afterEach(()=>{
        server.close();
    })

    test("Test contactList no auth", async () => {
        const res = await request(server).get('/api/v1/contact/contactList');
        expect(res.status).toBe(401);
    })

    test("Test contactList auth", async () => {
        const authRes = await request(server).post('/api/v1/auth/login').send({ login: "nskulski", password: "admin" })
        const res = await request(server).get('/api/v1/contact/contactList').set("cookie",authRes.headers["set-cookie"][0]);

        expect(res.body.length).toBeGreaterThan(0);
        expect(res.status).toBe(200);
    })
})


