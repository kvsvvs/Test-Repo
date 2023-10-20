"use client";
import React, { useState } from "react";
// import { useRouter } from "next/router";
import { useConfirmation } from "../context/ConfirmationContext";
import { auth } from "../../utils/firebaseClient";
import { Form, Input, Button, notification, Modal } from "antd";
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  getAuth,
} from "firebase/auth";
import axios from "axios";
import { config } from "dotenv";

config();

const Signup = () => {
  // const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOtpModalVisible, setOtpModalVisible] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [serverUserId, setServerUserId] = useState(null);
  const [signupForm] = Form.useForm();
  const [otpForm] = Form.useForm();

  const handleSubmit = async (values) => {
    setLoading(true);

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

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/signup`,
        {
          name: values.name,
          username: values.username,
          password: values.password,
          phonenumber: phoneNumber,
          aadhar_card: values.aadhar_card,
          pan_card: values.pan_card,
        }
      );
      console.log(response.data);
      setServerUserId(response.data.userid);
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

      const userCredential = await confirmationResult.confirm(otp);
      const idToken = await userCredential.user.getIdToken();
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/verifyOtp`,
        {
          idToken: idToken,
          user_id: serverUserId,
        }
      );

      if (response.data.message === "User verified successfully.") {
        notification.success({
          message: "Verified",
          description: "Mobile number successfully verified!",
        });
      } else {
        notification.error({
          message: "Error",
          description: "Failed to verify OTP.",
        });
      }
      setOtpModalVisible(false);
      setLoading(false);
      // router.push("/signin");
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error.message || "Failed to verify OTP.",
      });
    }
  };

  const checkUsernameAvailability = async () => {
    const username = signupForm.getFieldValue("username");
    if (username) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/checkUsernameAvailability`,
          {
            params: {
              username: username,
            },
          }
        );
        if (!response.data.available) {
          signupForm.setFields([
            {
              name: "username",
              errors: [
                "This username is already taken! Please use another one.",
              ],
            },
          ]);
        }
      } catch (error) {
        console.log("Error checking username:", error);
      }
    }
  };

  const handleError = (errorInfo) => {
    console.log("Failed:", errorInfo);
    notification.error({
      message: "Error",
      description: "Signup failed!",
    });
  };
  return (
    <>
      <Form
        form={signupForm}
        name="signup"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={handleError}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username" onBlur={checkUsernameAvailability} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item
          name="aadhar_card"
          rules={[
            {
              required: true,
              message: "Please input your Aadhar card Number!",
            },
            {
              pattern: /^\d{12}$/,
              message: "Aadhar card Number should be 12 digits!",
            },
          ]}
        >
          <Input placeholder="Aadhar Card Number" maxLength={12} />
        </Form.Item>

        <Form.Item
          name="pan_card"
          rules={[
            { required: true, message: "Please input your PAN Card Number!" },
            {
              pattern: /^[A-Z]{5}\d{4}[A-Z]{1}$/,
              message: "Invalid PAN Card format!",
            },
          ]}
        >
          <Input placeholder="PAN Card Number" maxLength={10} />
        </Form.Item>

        <Form.Item
          name="phonenumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>
        <div id="recaptcha-container"></div>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={
              !signupForm.isFieldsTouched(true) ||
              signupForm.getFieldsError().filter(({ errors }) => errors.length)
                .length
            }
          >
            Signup
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="Verify OTP"
        open={isOtpModalVisible}
        footer={null}
        onCancel={() => setOtpModalVisible(false)}
      >
        <Form
          form={otpForm}
          name="otp_verification"
          onFinish={handleOtpVerification}
        >
          <Form.Item
            name="otp"
            rules={[
              {
                required: true,
                message: "Please input the OTP sent to your mobile!",
              },
            ]}
          >
            <Input placeholder="Enter OTP" maxLength={6} />
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

export default Signup;
