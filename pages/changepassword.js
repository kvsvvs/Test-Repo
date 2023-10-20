"use client";
import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import axios from "axios";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (values) => {
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) {
      notification.error({
        message: "Error",
        description: "Password and Confirm Password do not match!",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/change-password`,
        { password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        notification.success({
          message: "Success",
          description: "Password changed successfully!",
        });
        form.resetFields();
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description:
          error.response?.data?.message || "Failed to change password.",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} name="changePassword" onFinish={handlePasswordChange}>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your new password!" }]}
      >
        <Input.Password placeholder="New Password" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        rules={[
          { required: true, message: "Please confirm your new password!" },
        ]}
      >
        <Input.Password placeholder="Confirm New Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Change Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePassword;
