"use client";

import { Center, Group, Anchor, Text } from "@mantine/core";

export function Footer() {
  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%', padding: '20px 0' }}>
      <Center>
        <Group>
          <Anchor href="https://t.me/eziyuan_1" target="_blank" c="dimmed" size="sm">
            TG频道：@eziyuan_1
          </Anchor>
          <Text c="dimmed" size="sm">|</Text>
          <Anchor href="https://t.me/bibipobibibi_bot" target="_blank" c="dimmed" size="sm">
            私聊|投稿|广告合作联系:@bibipobibibi_bot
          </Anchor>
          <Text c="dimmed" size="sm">|</Text>
          <Anchor href="mailto:8001693@gmail.com" c="dimmed" size="sm">
            联系链接
          </Anchor>
        </Group>
      </Center>
    </div>
  );
}
