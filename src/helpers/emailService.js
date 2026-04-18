import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import transporter from "../config/mail.js";

export const sendMail = async (email, subject, view, data) => {
  const templatePath = path.resolve(`src/views/mail/${view}.hbs`);
  const templateSource = fs.readFileSync(templatePath, "utf8");
  const template = handlebars.compile(templateSource);
  const html = template(data);

  await transporter.sendMail({
    from: `"Ticket App" <${process.env.MAIL_FROM}>`,
    to: email,
    subject,
    html,
  });
};