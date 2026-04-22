import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { ColorSchemeScript, Container, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Footer } from "@/components/Footer";

// 更新这里的 title 和 description
export const metadata = {
  title: "EZI SUB",
  description: "EZI SUB - 订阅转换工具",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Notifications />
          <Container size="sm" my="lg">
            {children}
          </Container>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
