"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const constants_1 = require("../utils/constants");
describe('Auth admin (e2e)', () => {
    const app = constants_1.APP_URL;
    it('Login: /api/v1/auth/admin/email/login (POST)', () => {
        return request(app)
            .post('/api/v1/auth/admin/email/login')
            .send({ email: constants_1.ADMIN_EMAIL, password: constants_1.ADMIN_PASSWORD })
            .expect(200)
            .expect(({ body }) => {
            expect(body.token).toBeDefined();
            expect(body.user.email).toBeDefined();
        });
    });
    it('Login via user endpoint: /api/v1/auth/email/login (POST)', () => {
        return request(app)
            .post('/api/v1/auth/email/login')
            .send({ email: constants_1.ADMIN_EMAIL, password: constants_1.ADMIN_PASSWORD })
            .expect(422);
    });
});
//# sourceMappingURL=auth.e2e-spec.js.map