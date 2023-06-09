/** @jsxImportSource react */
import type { AnchorProps } from "@mantine/core";
import { Anchor as QwikAnchor } from "@mantine/core";
import { qwikify$ } from "@builder.io/qwik-react";

export const Anchor = qwikify$<AnchorProps>(QwikAnchor);
