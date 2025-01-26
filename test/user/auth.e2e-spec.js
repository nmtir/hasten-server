"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const constants_1 = require("../utils/constants");
describe('Auth user (e2e)', () => {
    const app = constants_1.APP_URL;
    const mail = `http://${constants_1.MAIL_HOST}:${constants_1.MAIL_PORT}`;
    const newUserFirstName = `Tester${Date.now()}`;
    const newUserLastName = `E2E`;
    const newUserEmail = `User.${Date.now()}@example.com`;
    const newUserPassword = `secret`;
    it('Login: /api/v1/auth/email/login (POST)', () => {
        return request(app)
            .post('/api/v1/auth/email/login')
            .send({ email: constants_1.TESTER_EMAIL, password: constants_1.TESTER_PASSWORD })
            .expect(200)
            .expect(({ body }) => {
            expect(body.token).toBeDefined();
            expect(body.user.email).toBeDefined();
            expect(body.user.hash).not.toBeDefined();
            expect(body.user.password).not.toBeDefined();
            expect(body.user.previousPassword).not.toBeDefined();
        });
    });
    it('Login via admin endpoint: /api/v1/auth/admin/email/login (POST)', () => {
        return request(app)
            .post('/api/v1/auth/admin/email/login')
            .send({ email: constants_1.TESTER_EMAIL, password: constants_1.TESTER_PASSWORD })
            .expect(422);
    });
    it('Login via admin endpoint with extra spaced: /api/v1/auth/admin/email/login (POST)', () => {
        return request(app)
            .post('/api/v1/auth/admin/email/login')
            .send({ email: constants_1.TESTER_EMAIL + '  ', password: constants_1.TESTER_PASSWORD })
            .expect(422);
    });
    it('Do not allow register user with exists email: /api/v1/auth/email/register (POST)', () => {
        return request(app)
            .post('/api/v1/auth/email/register')
            .send({
            email: constants_1.TESTER_EMAIL,
            password: constants_1.TESTER_PASSWORD,
            firstName: 'Tester',
            lastName: 'E2E',
        })
            .expect(422)
            .expect(({ body }) => {
            expect(body.errors.email).toBeDefined();
        });
    });
    it('Register new user: /api/v1/auth/email/register (POST)', async () => {
        return request(app)
            .post('/api/v1/auth/email/register')
            .send({
            email: newUserEmail,
            password: newUserPassword,
            firstName: newUserFirstName,
            lastName: newUserLastName,
        })
            .expect(204);
    });
    it('Login unconfirmed user: /api/v1/auth/email/login (POST)', () => {
        return request(app)
            .post('/api/v1/auth/email/login')
            .send({ email: newUserEmail, password: newUserPassword })
            .expect(200)
            .expect(({ body }) => {
            expect(body.token).toBeDefined();
        });
    });
    it('Confirm email: /api/v1/auth/email/confirm (POST)', async () => {
        const hash = await request(mail)
            .get('/email')
            .then(({ body }) => {
            var _a;
            return (_a = body
                .find((letter) => letter.to[0].address.toLowerCase() ===
                newUserEmail.toLowerCase() &&
                /.*confirm\-email\/(\w+).*/g.test(letter.text))) === null || _a === void 0 ? void 0 : _a.text.replace(/.*confirm\-email\/(\w+).*/g, '$1');
        });
        return request(app)
            .post('/api/v1/auth/email/confirm')
            .send({
            hash,
        })
            .expect(204);
    });
    it('Can not confirm email with same link twice: /api/v1/auth/email/confirm (POST)', async () => {
        const hash = await request(mail)
            .get('/email')
            .then(({ body }) => {
            var _a;
            return (_a = body
                .find((letter) => letter.to[0].address.toLowerCase() ===
                newUserEmail.toLowerCase() &&
                /.*confirm\-email\/(\w+).*/g.test(letter.text))) === null || _a === void 0 ? void 0 : _a.text.replace(/.*confirm\-email\/(\w+).*/g, '$1');
        });
        return request(app)
            .post('/api/v1/auth/email/confirm')
            .send({
            hash,
        })
            .expect(404);
    });
    it('Login confirmed user: /api/v1/auth/email/login (POST)', () => {
        return request(app)
            .post('/api/v1/auth/email/login')
            .send({ email: newUserEmail, password: newUserPassword })
            .expect(200)
            .expect(({ body }) => {
            expect(body.token).toBeDefined();
            expect(body.user.email).toBeDefined();
        });
    });
    it('Confirmed user retrieve profile: /api/v1/auth/me (GET)', async () => {
        const newUserApiToken = await request(app)
            .post('/api/v1/auth/email/login')
            .send({ email: newUserEmail, password: newUserPassword })
            .then(({ body }) => body.token);
        await request(app)
            .get('/api/v1/auth/me')
            .auth(newUserApiToken, {
            type: 'bearer',
        })
            .send()
            .expect(({ body }) => {
            expect(body.provider).toBeDefined();
            expect(body.email).toBeDefined();
            expect(body.hash).not.toBeDefined();
            expect(body.password).not.toBeDefined();
            expect(body.previousPassword).not.toBeDefined();
        });
    });
    it('New user update profile: /api/v1/auth/me (PATCH)', async () => {
        const newUserNewName = Date.now();
        const newUserNewPassword = 'new-secret';
        const newUserApiToken = await request(app)
            .post('/api/v1/auth/email/login')
            .send({ email: newUserEmail, password: newUserPassword })
            .then(({ body }) => body.token);
        await request(app)
            .patch('/api/v1/auth/me')
            .auth(newUserApiToken, {
            type: 'bearer',
        })
            .send({
            firstName: newUserNewName,
            password: newUserNewPassword,
        })
            .expect(422);
        await request(app)
            .patch('/api/v1/auth/me')
            .auth(newUserApiToken, {
            type: 'bearer',
        })
            .send({
            firstName: newUserNewName,
            password: newUserNewPassword,
            oldPassword: newUserPassword,
        })
            .expect(200);
        await request(app)
            .post('/api/v1/auth/email/login')
            .send({ email: newUserEmail, password: newUserNewPassword })
            .expect(200)
            .expect(({ body }) => {
            expect(body.token).toBeDefined();
        });
        await request(app)
            .patch('/api/v1/auth/me')
            .auth(newUserApiToken, {
            type: 'bearer',
        })
            .send({ password: newUserPassword, oldPassword: newUserNewPassword })
            .expect(200);
    });
    it('New user delete profile: /api/v1/auth/me (DELETE)', async () => {
        const newUserApiToken = await request(app)
            .post('/api/v1/auth/email/login')
            .send({ email: newUserEmail, password: newUserPassword })
            .then(({ body }) => body.token);
        await request(app).delete('/api/v1/auth/me').auth(newUserApiToken, {
            type: 'bearer',
        });
        return request(app)
            .post('/api/v1/auth/email/login')
            .send({ email: newUserEmail, password: newUserPassword })
            .expect(422);
    });
});
//# sourceMappingURL=auth.e2e-spec.js.map