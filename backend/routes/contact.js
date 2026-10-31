import express from 'express';
import nodemailer from 'nodemailer';
import Message from '../models/Message.js';

const router = express.Router();

// Optional: send email notification to portfolio owner
async function sendEmailNotification({ name, email, subject, message }) {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) return;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: user,
    to: process.env.CONTACT_EMAIL || 'rakshachahan011@gmail.com',
    subject: `Portfolio: ${subject || `Message from ${name}`}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    replyTo: email,
  });
}

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ message: 'Name, email and message are required.' });
    }

    const doc = await Message.create({
      name: name.trim(),
      email: email.trim(),
      subject: (subject || '').trim(),
      message: message.trim(),
    });

    await sendEmailNotification({
      name: doc.name,
      email: doc.email,
      subject: doc.subject,
      message: doc.message,
    }).catch(() => {});

    res.status(201).json({ message: 'Message sent successfully.', id: doc._id });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ message: 'Failed to save message. Try again later.' });
  }
});

export default router;
