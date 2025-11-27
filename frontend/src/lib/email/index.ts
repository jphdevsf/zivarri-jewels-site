import nodemailer from 'nodemailer'
import type { FormData } from '@/types/content'
import fs from 'fs'
import path from 'path'

const sendEmail = async (data: FormData) => {
  const templatePath = path.join(process.cwd(), 'src/lib/email/email-template-submission.html')
  const emailTemplate = fs.readFileSync(templatePath, 'utf8')

  const useProductionTransporter = process.env.NODE_ENV !== 'development' || process.env.FORCE_PRODUCTION_SMTP === 'true'

  let transporter

  if (!useProductionTransporter) {
    // Ethereal for dev (per Nodemailer docs: https://nodemailer.com/usage/#ethereal-email)
    const testAccount = await nodemailer.createTestAccount()
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })
  } else {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })
  }

  const html = emailTemplate
    .replace('{{NAME}}', data.name)
    .replace('{{EMAIL}}', data.email)
    .replace('{{MESSAGE}}', data.message)

  const mailOptions = {
    from: `"Zivarri Jewels" <${process.env.SMTP_FROM}>`,
    to: process.env.CONTACT_EMAIL,
    replyTo: `"${data.name}" <${data.email}>`,
    subject: `Zivarri.com: New contact form submission from ${data.name}`,
    html
  }
  if (useProductionTransporter) await transporter.verify()
  const info = await transporter.sendMail(mailOptions)

  if (!useProductionTransporter) {
    console.log('Message sent: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  }
}

export { sendEmail }
