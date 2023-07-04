import request from 'supertest';
import app from './index';

describe('Starter Test', () => {
    test('GET /api', (done) => {
        request(app)
            .get('/api')
            .expect(
                'Content-Type',
                'application/json; charset=utf-8',
            )
            .expect(200)
            .expect((res) => {
                res.body.message = 'Welcome to rae-chat-api!';
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
});
