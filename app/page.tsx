"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { Button, Card, CopyButton, Group, Stack, Text, Textarea, Image } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { TLL } from "@/components/TLL";

const schema = z.object({
  source: z.string().min(1, "订阅链接不能为空"),
});

export default function Page() {
  const searchParams = useSearchParams();
  const form = useForm({
    initialValues: {
      source: searchParams.get("source") || "",
    },
    validate: zodResolver(schema),
  });

  const target = useMemo(() => {
    if (form.values.source.length === 0) {
      return "";
    }
    const url = new URL(window.location.href);
    url.search = "";
    url.pathname = "/api/sub";
    url.searchParams.set("source", form.values.source);
    return url.href;
  }, [form.values.source]);

  const handleReset = () => {
    form.reset();
  };

  return (
    <Stack>
      <Group justify="center">
        {/* 将 'new-logo.png' 替换成您的LOGO文件名 */}
        <Image src="/new-logo.png" alt="Custom Logo" h={60} w="auto" />
      </Group>

      <TLL initialValue="zh-CN" />
      <Card withBorder radius="md">
        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <Textarea
              label="订阅链接"
              description="支持多个订阅，换行分割"
              autosize
              minRows={4}
              {...form.getInputProps("source")}
            />
            <Group justify="right">
              <Button variant="default" onClick={handleReset}>
                重置
              </Button>
            </Group>
          </Stack>
        </form>
      </Card>

      <Card withBorder radius="md">
        <Stack>
          <Textarea
            label="生成结果"
            description="点击下方按钮复制"
            readOnly
            autosize
            minRows={4}
            value={target}
          />
          <Group justify="right">
            <CopyButton value={target}>
              {({ copied, copy }) => (
                <Button
                  color={copied ? "teal" : "blue"}
                  onClick={() => {
                    copy();
                    notifications.show({
                      title: "复制成功",
                      message: "已将生成的链接复制到剪贴板",
                      color: "green",
                    });
                  }}
                >
                  {copied ? "复制成功" : "复制链接"}
                </Button>
              )}
            </CopyButton>
          </Group>
        </Stack>
      </Card>
    </Stack>
  );
}
