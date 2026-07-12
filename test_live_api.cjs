const https = require('https');

const data = JSON.stringify({
  type: 'confirmation',
  payload: {
    fullName: 'Test User',
    firstname: 'Test',
    lastname: 'User',
    companyName: 'Test Co',
    email: 'test-user-revamp@yopmail.com', // A disposable email
    phone: '1234567890',
    serviceInterestedIn: 'Web Development',
    businessChallenge: 'Testing the live API',
    submittedAt: new Date().toISOString(),
    pageUrl: 'https://www.revampconsult.com/'
  }
});

const options = {
  hostname: 'www.revampconsult.com',
  port: 443,
  path: '/api/send-email',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
