/** @jsxImportSource react */
import type { AlertProps } from "@mantine/core";
import { Alert as QwikAlert } from "@mantine/core";
import { qwikify$ } from "@builder.io/qwik-react";

export const Alert = qwikify$<AlertProps>(QwikAlert, { eagerness: "visible" });
