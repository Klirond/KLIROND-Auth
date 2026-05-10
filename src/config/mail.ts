import nodemailer from "nodemailer";
import wrapper from "../middlewares/asyncWrapper.middleware.ts";
import { ServerError } from "../global/types.ts";
import logger from "../middlewares/logger.ts";

class Mailer {
  private mail: string | undefined = process.env.EMAIL;

  private transporter = nodemailer.createTransport({
    host: "smtp.zohomail.com",
    port: 587,
    secure: false,
    auth: {
      user: this.mail,
      pass: process.env.PASS,
    },
  });

  public async verificationMail(
    username: string,
    email: string,
    code: number,
  ): Promise<void> {
    try {
      const mail = await this.transporter.sendMail({
        from: this.mail,
        to: email,
        subject: "Email verification",
        html: /* html */ `
          <h3>Hello ${username},</h3>
          <p>Please click on this link to verify your account:<p>
          <a href="${process.env.FRONTEND_URL}/verify?token=${code}"
        `,
      });

      logger.info(`Email sent [ ${mail.messageId} ]`);
    } catch (err: unknown) {
      if (err instanceof ServerError) {
        logger.error({ status: err.statusCode, message: err.message });
        return;
      }

      if (err instanceof Error) {
        logger.error(err.message);
        return;
      }

      logger.error({ message: "An error occured", errorMessage: err });
    }
  }
}

export default Mailer;
