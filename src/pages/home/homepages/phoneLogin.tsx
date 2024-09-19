import React, { useState } from "react";
import { auth } from "../../../config/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const PhoneAuth: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [user, setUser] = useState<ConfirmationResult | null>(null);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const sendOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptcha
      );
      console.log(confirmation);
      setUser(confirmation);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await user?.confirm(otp);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div id="recaptcha"></div>
      {!user ? (
        <form onSubmit={sendOTP} className="phoneForm">
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button type="submit">Send Verification Code</button>
        </form>
      ) : (
        <form onSubmit={verifyOTP} className="phoneForm">
          <input
            type="text"
            placeholder="Enter verification code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="submit">Verify Code</button>
        </form>
      )}
    </div>
  );
};
