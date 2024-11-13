import nodemailer from 'nodemailer';
import { renderTemplate } from '../utils/templateEngine.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.NODE_ENV === 'production',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendEmail = async ({ to, subject, template, context }) => {
  const html = await renderTemplate(template, context);
  
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html
  });
};
