import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { to, message } = await req.json();

    if (!to || !message) {
      return NextResponse.json({ error: 'Missing "to" or "message" field' }, { status: 400 });
    }

    const apiUrl = process.env.WHATAPI_URL;
    const apiKey = process.env.WHATAPI_KEY;

    if (!apiUrl || !apiKey) {
      return NextResponse.json({ error: 'WhatsApp API credentials are not configured' }, { status: 500 });
    }

    // Replace with the exact endpoint path from WhatAPI documentation
    const endpoint = `${apiUrl}/api/v1/messages`; // Adjust this path if WhatAPI uses a different one

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
        // Or if they use a custom header: 'x-api-key': apiKey
      },
      body: JSON.stringify({
        to: to,
        message: message,
        number: to, // Adding these just in case the API expects number/text instead of to/message
        text: message
      }),
    });

    const data = await response.json().catch(() => null) || await response.text();

    if (!response.ok) {
      console.error('WhatsApp API response error:', response.status, data);
      return NextResponse.json({ error: 'Failed to send message', details: data }, { status: response.status });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('WhatsApp API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
