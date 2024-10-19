import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import authRoutes from '../../(auth)/_server/route';

const app = new Hono().basePath('/api');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route('/auth', authRoutes);

// const routes
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export const OPTIONS = handle(app);

export type AppType = typeof routes;
