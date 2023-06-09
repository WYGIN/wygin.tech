/** @jsxImportSource react */
import { AspectRatio as QwikAspectRatio, AspectRatioProps } from "@mantine/core";
import { qwikify$ } from "@builder.io/qwik-react";

export const AspectRatio = qwikify$<AspectRatioProps>(QwikAspectRatio, { eagerness: "visible" });
