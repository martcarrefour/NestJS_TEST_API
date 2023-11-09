import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from '../src/auth/auth.constants';

const loginDtoSuccess: AuthDto = {
	login: 'a@a.com',
	password: '1',
};
const loginDtoFailPassword: AuthDto = {
	login: 'a@a.com',
	password: '2',
};
const loginDtoFailUser: AuthDto = {
	login: 'aa@a.com',
	password: '1',
};

describe('AuthController (e2e)', () => {
	let app: INestApplication;
	let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) - success', () => {
		return request(app.getHttpServer())
			.post('/auth/login/')
			.send(loginDtoSuccess)

			.expect(200)

			.then(({ body }: request.Response) => {
				token = body.access_token;
				expect(token).toBeDefined;
			});
	});

	it('/auth/login (POST) - fail password', () => {
		return request(app.getHttpServer())
			.post('/auth/login/')
			.send(loginDtoFailPassword)

			.expect(401, { message: WRONG_PASSWORD_ERROR, error: 'Unauthorized', statusCode: 401 });
	});
	it('/auth/login (POST) - fail', () => {
		return request(app.getHttpServer())
			.post('/auth/login/')
			.send(loginDtoFailUser)

			.expect(401, { message: USER_NOT_FOUND_ERROR, error: 'Unauthorized', statusCode: 401 });
	});

	afterAll(() => {
		disconnect();
	});
});
