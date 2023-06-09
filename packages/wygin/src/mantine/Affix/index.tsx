/** @jsxImportSource react */
import type { AffixProps } from "@mantine/core";
import { Affix as QwikAffix } from "@mantine/core";
import { qwikify$ } from "@builder.io/qwik-react";

export const Affix = qwikify$<AffixProps>(QwikAffix);
