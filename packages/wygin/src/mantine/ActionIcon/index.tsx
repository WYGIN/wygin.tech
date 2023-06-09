/** @jsxImportSource react */
import type { ActionIconProps } from "@mantine/core";
import { ActionIcon as QwikActionIcon } from "@mantine/core";
import { qwikify$ } from "@builder.io/qwik-react";

export const ActionIcon = qwikify$<ActionIconProps>(QwikActionIcon);
