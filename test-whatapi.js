async function testAuth(authHeader) {
  try {
    const res = await fetch('https://crmapi1.whatapi.in/api/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader
      },
      body: JSON.stringify({
        to: "918217794751",
        message: "test",
        number: "918217794751",
        text: "test"
      })
    });
    const text = await res.text();
    console.log(`Auth: ${JSON.stringify(authHeader)} -> Status: ${res.status}, Body: ${text.substring(0, 100)}`);
  } catch (e) {}
}

async function run() {
  const token = "bXVyYWxpbmVlbGFsdUBnbWFpbC5jb20";
  await testAuth({ 'Authorization': `Bearer ${token}` });
  await testAuth({ 'Authorization': token });
  await testAuth({ 'Authorization': `Token ${token}` });
  await testAuth({ 'Authorization': `Basic ${token}` });
  await testAuth({ 'x-api-key': token });
  await testAuth({ 'apikey': token });
  
  // also try as url param
  const res = await fetch(`https://crmapi1.whatapi.in/api/v1/messages?token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to: "918217794751", message: "test" })
  });
  console.log(`URL token -> Status: ${res.status}, Body: ${await res.text()}`);
}

run();
