"use client";
import { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/Features/userSlice";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignin = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/signin`,
        {
          username: values.username,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.message === "Login successful.") {
        notification.success({
          message: "Success",
          description: "User signed in successfully!",
        });
        console.log(response.data.user);
        dispatch(setUser(response.data.user));
        router.push("/dashboard");
      } else {
        notification.error({
          message: "Error",
          description: response.data.message || "Signin failed!",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.response?.data?.message || "Signin failed!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleError = (errorInfo) => {
    console.log("Failed:", errorInfo);
    notification.error({
      message: "Error",
      description: "Signin failed!",
    });
  };

  return (
    <Form
      form={form}
      name="signin"
      initialValues={{ remember: true }}
      onFinish={handleSignin}
      onFinishFailed={handleError}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Signin
        </Button>
      </Form.Item>
      <Form.Item>
        <Link href="/forgotpassword">
          <Button type="link">Forgot Password?</Button>
        </Link>
      </Form.Item>
    </Form>
  );
};

export default Signin;
