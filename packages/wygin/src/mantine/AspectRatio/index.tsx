/** @jsxImportSource react */
import type { AspectRatioProps } from "@mantine/core";
import { AspectRatio as QwikAspectRatio } from "@mantine/core";
import { qwikify$ } from "@builder.io/qwik-react";

export const AspectRatio = qwikify$<AspectRatioProps>(QwikAspectRatio, {
  eagerness: "visible",
});
