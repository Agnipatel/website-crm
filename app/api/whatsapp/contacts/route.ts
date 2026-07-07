import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiUrl = process.env.WHATAPI_URL;
    const apiKey = process.env.WHATAPI_KEY;

    if (!apiUrl || !apiKey) {
      return NextResponse.json({ error: 'WhatsApp API credentials are not configured' }, { status: 500 });
    }

    // Mock Data using the exact JSON format provided
    const mockContacts = [
      {
        "name": "AGNI PATEL",
        "phone": "6386026426",
        "whatsapp": "6386026426",
        "email": "patelagni239@gmail.com",
        "channel": "WhatsApp",
        "createdAt": "2026-07-07",
        "lastSeen": "2026-07-07",
        "tags": ["Lead"]
      },
      {
        "name": "NEHA SHAH",
        "phone": "9179902644",
        "whatsapp": "9179902644",
        "email": "neha@example.com",
        "channel": "WhatsApp",
        "createdAt": "2026-05-14",
        "lastSeen": "2026-05-14",
        "tags": ["NEW"]
      },
      {
        "name": "VIPUL GOYAL",
        "phone": "9198124901",
        "whatsapp": "9198124901",
        "email": "vipul@example.com",
        "channel": "WhatsApp",
        "createdAt": "2026-04-04",
        "lastSeen": "2026-04-04",
        "tags": ["NEW"]
      }
    ];

    return NextResponse.json({ success: true, data: mockContacts });
  } catch (error) {
    console.error('WhatsApp API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
