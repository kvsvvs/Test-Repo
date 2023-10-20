// components/Navbar.js
"use client";
import { useSelector } from "react-redux";
import { Layout, Menu, Dropdown, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  // Fetch the user from the Redux store
  const user = useSelector((state) => state.user);

  // Dropdown menu for account icon
  const menu = (
    <Menu>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="settings">Settings</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ padding: "0 16px" }}>
      {/* App name on the left */}
      <Title level={2} style={{ margin: 0, float: "left", color: "white" }}>
        Trading App
      </Title>

      {/* Account icon and user's name on the right */}
      <div style={{ float: "right", display: "flex", alignItems: "center" }}>
        <Dropdown overlay={menu} trigger={["click"]}>
          <Avatar icon={<UserOutlined />} style={{ marginRight: "10px" }} />
        </Dropdown>
        <span style={{ color: "white" }}>{user?.name}</span>
      </div>
    </Header>
  );
};

export default Navbar;
