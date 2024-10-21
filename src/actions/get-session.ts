'use server';

import { AUTH_COOKIE } from '@/app/(auth)/constant';
import { cookies } from 'next/headers';
import { Account, Client } from 'node-appwrite';

export async function getSession() {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = await cookies().get(AUTH_COOKIE);
    if (!session) {
      return null;
    }

    client.setSession(session.value);
    const account = new Account(client);

    return account.get();
  } catch {
    return null;
  }
}
