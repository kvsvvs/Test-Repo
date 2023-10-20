"use client";
import React, { useState } from "react";
// import { useRouter } from "next/router";
import { Form, Input, Button, notification, Modal } from "antd";
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  getAuth,
} from "firebase/auth";
import { auth } from "../../utils/firebaseClient";
import axios from "axios";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [isOtpModalVisible, setOtpModalVisible] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [forgotForm] = Form.useForm();
  const [otpForm] = Form.useForm();
  // const router = useRouter();
  const [mobphoneNumber, setPhoneNumber] = useState(null);

  const handleForgotPassword = async (values) => {
    setLoading(true);
    setPhoneNumber(values.phonenumber);
    const phoneNumber = values.phonenumber;
    const auth = getAuth();
    const appVerifier = (window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
        "expired-callback": () => {},
      }
    ));

    try {
      const receivedConfirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setConfirmationResult(receivedConfirmationResult);

      setLoading(false);
      notification.success({
        message: "Success",
        description: "OTP sent successfully!",
      });

      setOtpModalVisible(true);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error.message,
      });
      console.log(error);
    }
  };

  const handleOtpVerification = async (values) => {
    setLoading(true);

    try {
      const otp = values.otp;

      await confirmationResult.confirm(otp);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/generate-token`,
        { mobphoneNumber },
        {
          withCredentials: true,
        }
      );
      setLoading(false);

      // router.push("/changepassword");
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error.message || "Failed to verify OTP.",
      });
    }
  };

  return (
    <>
      <Form
        form={forgotForm}
        name="forgotpassword"
        onFinish={handleForgotPassword}
      >
        <Form.Item
          name="phonenumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Send OTP
          </Button>
        </Form.Item>
      </Form>
      <div id="recaptcha-container"></div>
      <Modal
        title="Verify OTP"
        open={isOtpModalVisible}
        onCancel={() => setOtpModalVisible(false)}
        footer={null}
      >
        <Form form={otpForm} name="otpform" onFinish={handleOtpVerification}>
          <Form.Item
            name="otp"
            rules={[{ required: true, message: "Please input the OTP!" }]}
          >
            <Input placeholder="OTP" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Verify OTP
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ForgotPassword;
