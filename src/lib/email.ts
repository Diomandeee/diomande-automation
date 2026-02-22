import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendLeadNotification(lead: {
  name: string;
  email: string;
  company?: string;
  message?: string;
  tier?: string;
}) {
  return getResend().emails.send({
    from: "Diomande Automation <notifications@diomandeautomation.com>",
    to: "mo@diomandeautomation.com",
    subject: `New Lead: ${lead.name} (${lead.company || "No company"})`,
    html: `
      <h2>New Lead Submission</h2>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Company:</strong> ${lead.company || "N/A"}</p>
      <p><strong>Interest:</strong> ${lead.tier || "starter"}</p>
      <p><strong>Message:</strong> ${lead.message || "N/A"}</p>
    `,
  });
}

export async function sendLeadConfirmation(email: string, name: string) {
  return getResend().emails.send({
    from: "Diomande Automation <hello@diomandeautomation.com>",
    to: email,
    subject: "Thanks for reaching out — Diomande Automation",
    html: `
      <h2>Hi ${name},</h2>
      <p>Thanks for your interest in Diomande Automation. We've received your message and will be in touch within 24 hours.</p>
      <p>In the meantime, feel free to check out our <a href="https://diomandeautomation.com/docs">documentation</a> to learn more about what we offer.</p>
      <br>
      <p>— Mo Diomande</p>
    `,
  });
}
