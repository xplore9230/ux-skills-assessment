import nodemailer from "nodemailer";

type PremiumPurchaseEmailParams = {
  to: string;
  amount?: number | null;
  currency?: string | null;
  resultsUrl?: string | null;
  supportEmail?: string | null;
};

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (transporter) return transporter;

  const host = process.env.EMAIL_SMTP_HOST;
  const portRaw = process.env.EMAIL_SMTP_PORT;
  const user = process.env.EMAIL_SMTP_USER;
  const pass = process.env.EMAIL_SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn(
      "⚠️  Email SMTP environment not fully configured. Premium emails will be logged but not sent.",
    );
    return null;
  }

  const port = portRaw ? Number(portRaw) : 587;

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

export async function sendPremiumPurchaseEmail(
  params: PremiumPurchaseEmailParams,
): Promise<void> {
  const { to, amount, currency, resultsUrl, supportEmail } = params;

  const transport = getTransporter();

  const from =
    process.env.EMAIL_FROM ||
    supportEmail ||
    "no-reply@uxlevel.app";

  // Build simple, clear copy
  const niceCurrency = (currency || "usd").toUpperCase();
  const niceAmount =
    typeof amount === "number"
      ? (amount / 100).toFixed(2)
      : undefined;

  const priceLine =
    niceAmount != null
      ? `Payment: ${niceAmount} ${niceCurrency}`
      : `Payment: confirmed (${niceCurrency})`;

  const linkLine = resultsUrl
    ? `\nYour personalised results and premium content are available here:\n${resultsUrl}\n`
    : "";

  const supportLine = supportEmail
    ? `\nIf you ever get stuck, just reply to this email or write to ${supportEmail}.`
    : "\nIf you ever get stuck, just reply to this email.";

  const text = `Thanks for unlocking UXLevel Pro 🎉

${priceLine}
${linkLine}
What you now have access to:
- A personalised UX diagnosis based on your current stage
- A 3-week action plan that tells you what to do first
- Detailed skill ladders so you know how to move towards senior/lead roles
- Curated resources picked for your exact gaps

Save this email so you can always get back to your premium results.
${supportLine}
`;

  const html = `<p>Thanks for unlocking <strong>UXLevel Pro</strong> 🎉</p>
<p>${priceLine}</p>
${resultsUrl ? `<p>Your personalised results and premium content are available here:<br/><a href="${resultsUrl}">${resultsUrl}</a></p>` : ""}
<p><strong>What you now have access to:</strong></p>
<ul>
  <li>Personalised UX diagnosis based on your current stage</li>
  <li>3-week action plan with clear, finishable tasks</li>
  <li>Skill ladders that show what “good” looks like at each level</li>
  <li>Curated resources picked for your exact gaps</li>
</ul>
<p>Save this email so you can always get back to your premium results.</p>
<p>${supportLine}</p>`;

  if (!transport) {
    // In local/dev or when SMTP is not set up, just log the email payload
    console.log("[Email][DRY-RUN] Premium purchase email:", {
      to,
      from,
      subject: "Your UXLevel Pro access & results link",
      text,
    });
    return;
  }

  await transport.sendMail({
    from,
    to,
    subject: "Your UXLevel Pro access & results link",
    text,
    html,
  });
}


