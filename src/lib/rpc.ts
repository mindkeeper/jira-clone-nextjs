import { hc } from 'hono/client';
import { AppType } from '@/app/api/[[...route]]/route';

const host = process.env.NEXT_PUBLIC_API_URL!;
export const client = hc<AppType>(host);
