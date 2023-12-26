import { Resend } from "resend";
import { createHttpException } from "./exceptions";
import { HTTP_STATUS_CODE } from "../enums/HttpStatusCodes";
import { sendOtpCodeTemplate } from "./email-templates/sendOtpCodeTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * sendOtpCodeMail function is responsible for sending an email containing an OTP (One-Time Password) verification code to a user.
 */
export const sendOtpCodeMail = async (
  receiverEmail: string,
  otpVerificationCode: string,
  firstName: string
) => {
  try {
    return await resend.emails.send({
      from: "onboarding@resend.dev", //! change this email with you email domain
      to: receiverEmail,
      subject: "OTP verification code",
      html: sendOtpCodeTemplate(firstName, otpVerificationCode),
    });
  } catch (error) {
    const errorResponse = error as Error;
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      `[sendOtpCodeMail]: ${errorResponse.message}`
    );
  }
};
