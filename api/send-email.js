export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { type, payload } = req.body;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return res.status(500).json({ ok: false, error: 'Missing RESEND_API_KEY environment variable' });
  }

  try {
    let emailData;

    if (type === 'internal') {
      emailData = {
        from: 'Revamp Consulting <kunleolusanya2020@gmail.com>',
        to: 'kunleolusanya2020@gmail.com',
        subject: `New Lead: ${payload.fullName} — ${payload.serviceInterestedIn}`,
        text: `New consultation request received.
  
NAME:     ${payload.fullName}
COMPANY:  ${payload.companyName || '—'}
EMAIL:    ${payload.email}
PHONE:    ${payload.phone || '—'}
SERVICE:  ${payload.serviceInterestedIn}
  
MESSAGE:
${payload.businessChallenge || ''}
  
Submitted: ${payload.submittedAt}
Page: ${payload.pageUrl}`
      };
    } else if (type === 'confirmation') {
      emailData = {
        from: 'Revamp Consulting <kunleolusanya2020@gmail.com>',
        to: payload.email,
        subject: 'Thank you for reaching out to Revamp Consulting',
        text: `Hi ${payload.firstname},

Thank you for getting in touch with Revamp Consulting LLC.

We've received your inquiry regarding ${payload.serviceInterestedIn} and a member of our team will be in touch within one business day.

Warm regards,
Adekunle Olusanya
Managing Partner, Revamp Consulting LLC
+234 802 2221 589`
      };
    } else {
      return res.status(400).json({ ok: false, error: 'Invalid email type' });
    }

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
      throw new Error(`Resend API error: ${errorResponse}`);
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error sending email via Resend:', error);
    return res.status(500).json({ ok: false, error: error.message });
  }
}
