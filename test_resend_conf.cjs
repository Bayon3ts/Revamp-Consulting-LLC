const fs = require('fs');

async function testResendConfirmation() {
  const resendApiKey = 're_gT5FtEur_JXrDjmSJjHedM4mJWSEcbqs1';
  const emailData = {
    from: 'Revamp Consulting <notifications@revampconsult.com>',
    to: 'test-user-random-email-xyz@gmail.com', // Random unverified email
    subject: `Thank you for reaching out`,
    text: `Test confirmation email.`
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
      console.log('Resend confirmation success:', await response.json());
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

testResendConfirmation();
