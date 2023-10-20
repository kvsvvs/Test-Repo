"use client";
import Link from "next/link";
import styles from "../styles/Homepage.module.css";
import { Layout, Typography, Button, Carousel } from "antd";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
export default function Home() {
  return (
    <>
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <div className={styles.logo}>Virtual Trader</div>
          <nav className={styles.nav}>
            <Link href="/about">About</Link>
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/signin" className={styles.signinButton}>
              Sign In
            </Link>
            <Link href="/signup" className={styles.signupButton}>
              Sign Up
            </Link>
          </nav>
        </Header>

        <Content className={styles.content}>
          <Carousel autoplay className={styles.carousel}>
            <div>
              <Title>Trade Like a Pro</Title>
              <Paragraph>
                Experience the thrill of stock trading without the risks. Your
                gateway to mastering the stock market.
              </Paragraph>
            </div>
            <div>
              <Title>Unlimited Possibilities</Title>
              <Paragraph>
                With 1 billion virtual coins, the sky's the limit. How will you
                grow your portfolio?
              </Paragraph>
            </div>
            <div>
              <Title>Learn, Practice, Conquer</Title>
              <Paragraph>
                From beginner to pro, we've got you covered. Learn the ropes,
                test strategies, and conquer the market.
              </Paragraph>
            </div>
          </Carousel>

          <section className={styles.features}>
            <div>
              <img src="/path-to-icon1.svg" alt="Feature 1" />
              <Text>Real-time Data</Text>
            </div>
            <div>
              <img src="/path-to-icon2.svg" alt="Feature 2" />
              <Text>Advanced Analysis Tools</Text>
            </div>
            <div>
              <img src="/path-to-icon3.svg" alt="Feature 3" />
              <Text>Community Insights</Text>
            </div>
          </section>
        </Content>

        <Footer className={styles.footer}>
          <section className={styles.footerContent}>
            <div>
              <Title level={3}>VirtualTrader</Title>
              <Paragraph>Experience trading like never before.</Paragraph>
            </div>
            <nav>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/faq">FAQ</Link>
            </nav>
          </section>
          <section className={styles.footerBar}>
            © 2023 VirtualTrader. All rights reserved.
          </section>
        </Footer>
      </Layout>
    </>
  );
}
