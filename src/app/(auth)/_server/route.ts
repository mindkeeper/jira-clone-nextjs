import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { SigninSchema } from '../_schema/signin-schema';
import { SignupSchema } from '../_schema/signup-schema';
import { createAdminClient } from '@/lib/appwrite';
import { AppwriteException, ID } from 'node-appwrite';
import { setCookie } from 'hono/cookie';
import { AUTH_COOKIE } from '../constant';
import { StatusCode } from 'hono/utils/http-status';
const app = new Hono();

const routes = app
  .post('/sign-in', zValidator('json', SigninSchema), async (c) => {
    try {
      const { email, password } = c.req.valid('json');
      const { Account } = await createAdminClient();
      const session = await Account.createEmailPasswordSession(email, password);
      setCookie(c, AUTH_COOKIE, session.secret, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
      });
      return c.json(
        {
          success: true,
        },
        201
      );
    } catch (error: unknown) {
      const errorResponse = {
        message: 'An error occurred',
        statusCode: 500,
      };
      if (error instanceof AppwriteException && (error.code === 401 || error.code === 400)) {
        errorResponse.message = 'Invalid credentials';
        errorResponse.statusCode = 401;
      }
      return c.json(errorResponse, errorResponse.statusCode as StatusCode);
    }
  })
  .post('/sign-up', zValidator('json', SignupSchema), async (c) => {
    try {
      const { Account } = await createAdminClient();
      const { email, password, name } = c.req.valid('json');

      await Account.create(ID.unique(), email, password, name);
      const session = await Account.createEmailPasswordSession(email, password);
      setCookie(c, AUTH_COOKIE, session.secret, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
      });

      return c.json(
        {
          success: true,
        },
        201
      );
    } catch (error: unknown) {
      const errorResponse = {
        message: 'An error occurred',
        statusCode: 500,
      };
      if (error instanceof AppwriteException && error.code === 409) {
        errorResponse.message = 'Email already exists';
        errorResponse.statusCode = 409;
      }
      return c.json(errorResponse, errorResponse.statusCode as StatusCode);
    }
  });

export default routes;
