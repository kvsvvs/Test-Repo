"use client";
import { useState } from "react";
import { Form, Input, Button, notification } from "antd";

const SessionValidation = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSessionValidation = async (values) => {
    setLoading(true);

    // Call your API to validate the session OTP here.
    setTimeout(() => {
      setLoading(false);
      notification.success({
        message: "Validated",
        description: "Session successfully validated!",
      });
      // Redirect to dashboard after successful validation
    }, 1000);
  };

  return (
    <Form
      form={form}
      name="session_validation"
      onFinish={handleSessionValidation}
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
          Validate Session
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SessionValidation;
