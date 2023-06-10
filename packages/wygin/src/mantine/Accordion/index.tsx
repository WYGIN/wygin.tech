/** @jsxImportSource react */
import type {
  AccordionProps,
  AccordionControlProps,
  AccordionItemProps,
  AccordionPanelProps,
} from "@mantine/core";
import { Accordion as QwikAccordion } from "@mantine/core";
import { qwikify$ } from "@builder.io/qwik-react";

export const Accordion = qwikify$<AccordionProps>(QwikAccordion);
export const AccordionControl = qwikify$<AccordionControlProps>(
  QwikAccordion.Control
);
export const AccordionItem = qwikify$<AccordionItemProps>(QwikAccordion.Item, {
  eagerness: "visible",
});
export const AccordionPanel = qwikify$<AccordionPanelProps>(
  QwikAccordion.Panel,
  { eagerness: "visible" }
);
