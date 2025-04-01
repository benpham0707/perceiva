import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // We'll create this file

export async function POST(req: Request) {
  // Get the headers - headers() returns headers directly in App Router
  const headersList = headers();
  const svix_id = headersList.get('svix-id');
  const svix_timestamp = headersList.get('svix-timestamp');
  const svix_signature = headersList.get('svix-signature');

  // If there are no headers, return error
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Error: Missing svix headers', {
      status: 400
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

  let evt: WebhookEvent;

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new NextResponse('Error verifying webhook', {
      status: 400
    });
  }

  // Handle the webhook event
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;
    
    // Create a new user in your database
    try {
      await db.user.create({
        data: {
          id: id,
          email: email_addresses[0]?.email_address,
          firstName: first_name,
          lastName: last_name,
          username: username || '',
          imageUrl: image_url,
        },
      });
      
      return NextResponse.json({ message: 'User created' }, { status: 201 });
    } catch (error) {
      console.error('Error creating user:', error);
      return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;
    
    // Update the user in your database
    try {
      await db.user.update({
        where: { id: id },
        data: {
          email: email_addresses[0]?.email_address,
          firstName: first_name,
          lastName: last_name,
          username: username || '',
          imageUrl: image_url,
        },
      });
      
      return NextResponse.json({ message: 'User updated' }, { status: 200 });
    } catch (error) {
      console.error('Error updating user:', error);
      return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;
    
    // Delete the user from your database
    try {
      await db.user.delete({
        where: { id: id },
      });
      
      return NextResponse.json({ message: 'User deleted' }, { status: 200 });
    } catch (error) {
      console.error('Error deleting user:', error);
      return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
    }
  }

  // Return a 200 response for any other event types
  return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
}
