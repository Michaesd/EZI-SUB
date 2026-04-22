"use client";

import { useEffect } from "react";
import { useForm } from "@mantine/form";
import { useSetState } from "@mantine/hooks";

type Props = {
  initialValue: string;
};

export function TLL({ initialValue }: Props) {
  useForm({
    initialValues: {
      tll: initialValue,
    },
  });
  useSetState({ tll: "" });
  useEffect(() => {}, []);
  return null;
}
