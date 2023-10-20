"use client";
import { useState } from "react";
// import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useConfirmation } from "../context/ConfirmationContext";
import { Form, Input, Button, notification } from "antd";

const OtpVerification = () => {
  // const router = useRouter();
  const { confirmationResult } = useConfirmation();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOtpVerification = async (values) => {
    setLoading(true);

    try {
      const otp = values.otp;
      // Retrieve the stored confirmationResult
      console.log(confirmationResult);
      const userCredential = await confirmationResult.confirm(otp);
      console.log(userCredential);
      const idToken = await userCredential.user.getIdToken();
      const userId = router.query.userId;

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/verifyOtp`,
        {
          idToken: idToken,
          user_id: userId,
        }
      );

      if (response.data.message === "User verified successfully.") {
        notification.success({
          message: "Verified",
          description: "Mobile number successfully verified!",
        });
        // Redirect to dashboard or login page after successful verification
      } else {
        notification.error({
          message: "Error",
          description: "Failed to verify OTP.",
        });
      }
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error.message || "Failed to verify OTP.",
      });
    }
  };

  return (
    <Form form={form} name="otp_verification" onFinish={handleOtpVerification}>
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
  );
};

export default OtpVerification;
