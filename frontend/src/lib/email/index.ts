import nodemailer from 'nodemailer'
import type { FormData } from '@/types/content'
import fs from 'fs'
import path from 'path'

const sendEmail = async (data: FormData) => {
  const templatePath = path.join(process.cwd(), 'src/lib/email/email-template-submission.html')
  const emailTemplate = fs.readFileSync(templatePath, 'utf8')

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  const html = emailTemplate
    .replace('{{NAME}}', data.name)
    .replace('{{EMAIL}}', data.email)
    .replace('{{MESSAGE}}', data.message)

  const mailOptions = {
    from: `"${data.name}" <${process.env.SMTP_FROM}>`,
    to: process.env.CONTACT_EMAIL,
    subject: `Zivarri.com: New contact form submission from ${data.name}`,
    html
  }
  await transporter.verify()
  await transporter.sendMail(mailOptions)
}

export { sendEmail }
