import admin from 'firebase-admin';
import { NextResponse } from 'next/server';

import { env } from '~/env';

import type { Message } from 'firebase-admin/messaging';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as
      | { url: string; firebaseToken: string }
      | undefined;

    const payload: Message = {
      notification: {
        title: 'Hello world',
        body: 'hELLO WORLD',
      },
      data: body?.url ? { url: body.url } : undefined,
      topic: '<TOPIC_NAME>',
    };

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    });

    await admin.messaging().send(payload);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error sending notification:', error);

    return NextResponse.json(
      { error: error.message, details: error }, // Log full error details
      { status: 500 },
    );
  }
}
