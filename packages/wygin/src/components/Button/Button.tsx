/** @jsxImportSource react */
import type { ButtonProps, ButtonGroupProps } from "@mantine/core";
import { Button as FbButton } from "@mantine/core";
import { qwikify$ } from "@builder.io/qwik-react";

export const Button = qwikify$<ButtonProps>(FbButton, { eagerness: "visible" });
export const ButtonGroup = qwikify$<ButtonGroupProps>(FbButton.Group, {
  eagerness: "visible",
});
