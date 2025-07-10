import dayjs from "dayjs";
import { emailTemplates } from "./email.template.js";
import transporter, { accountEmail } from "../config/nodemailer.js";

export const sendReminderEmail = async ({ to, type, subscription }) => {
  if (!to || !type) throw new Error("Missing required parameters");

  const template = emailTemplates.find((temp) => temp.label === type);

  if (!template) throw new Error("Invalid email type");

  const mailInfo = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format("MMM D, YYYY"),
    planName: subscription.name,
    price: `${subscription.curreny} ${subscription.price} (${subscription.frequency})`,
    paymentMethod: subscription.paymentMethod,
  };

  const message = template.generateBody(mailInfo);
  const subject = template.generateBody(mailInfo);

  const mailOptions = {
    from: accountEmail,
    to,
    subject,
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error, "Error while sending email");

    console.log("Email sent:" + info.response);
  });
};
