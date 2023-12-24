import { createTransport } from "nodemailer";

export const sendMail = async (text) => {
  const transporter = createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    auth: {
      user: process.env.SMPT_USER,
      pass: process.env.SMPT_PASSWORD,
    },
  });
//  hear  mail to  --> which person in to i add my my personal email and from --> who send mail   
  await transporter.sendMail({
    subject: "CONTACT REQUEST FROM  BURGER KING 🍔",
    to: process.env.MYMAIL,
    from: process.env.MYMAIL, // hear both of place i add my mail for tasting purpose
    text, // this is mail text  mean which text is written by user for contract us page . simply i  passed (text) on line 3 so basically it will be text : text but we know when left and right will be same word then , you write any one and it`s mean say both are ok .[[[text : text === text]]]
  });
};

