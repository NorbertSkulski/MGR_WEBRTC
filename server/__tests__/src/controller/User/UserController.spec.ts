import request from "supertest";
import server from "../../../../src/index";
import { randomBytes } from "crypto";


describe("Test user", () => {

    afterEach(()=>{
        server.close();
    })

    test("Test user registration", async () => {
        const newUserData = {
            email: `${randomBytes(10).toString('hex')}@test.com`,
            name: "TestUser",
            lastName: "Testowy",
            login: randomBytes(10).toString('hex'),
            password: "testPassword"         
        }

        const resRegistration = await request(server).post('/api/v1/user/registration').send(newUserData);
        expect(resRegistration.status).toBe(200);
        const res = await request(server).post('/api/v1/auth/login').send({login:newUserData.login, password:newUserData.password});
        expect(res.status).toBe(200);
        expect(res.body.login).toBe(newUserData.login)
    })
   
})