const fs = require('fs');

async function testResend() {
  const resendApiKey = 're_gT5FtEur_JXrDjmSJjHedM4mJWSEcbqs1';
  const emailData = {
    from: 'Revamp Consulting <notifications@revampconsult.com>',
    to: 'kunleolusanya2020@gmail.com', // Internal alert
    subject: `New Lead Test`,
    text: `New consultation request received.`
  };

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      console.error(`Resend API error: ${errorResponse}`);
    } else {
      console.log('Resend success:', await response.json());
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

async function testHubspot() {
  const HUBSPOT_PORTAL_ID = '148366428';
  const HUBSPOT_FORM_GUID = '798a259f-91bb-495b-9758-c93b9c4b1be5';
  
  const hubspotPayload = {
      fields: [
          { name: 'firstname',             value: 'Test' },
          { name: 'lastname',              value: 'User' },
          { name: 'email',                 value: 'test@example.com' },
          { name: 'company',               value: 'Test Company' },
          { name: 'phone',                 value: '1234567890' },
          { name: 'service_interested_in', value: 'Web Development' },
          { name: 'business_challenge',    value: 'Testing the form submission' },
      ],
      context: {
          pageUri: 'http://localhost',
          pageName: 'Test'
      }
  };

  try {
    const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(hubspotPayload),
    });

    const rawText = await response.text();
    if (response.ok) {
        console.log('HubSpot success:', rawText);
    } else {
        console.error(`HubSpot error (${response.status}):`, rawText);
    }
  } catch (err) {
      console.error('HubSpot fetch failed:', err);
  }
}

async function main() {
  await testResend();
  await testHubspot();
}

main();
