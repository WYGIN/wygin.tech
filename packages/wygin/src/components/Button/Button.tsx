/** @jsxImportSource react */
import { type ReactNode } from 'react';
//import { Button as FbButton } from "flowbite-react";
import { Button as FbButton } from '@mantine/core';
import { qwikify$ } from "@builder.io/qwik-react";

function QwikButton({ children }: { children?: ReactNode[] }) {
  return(<FbButton>{children}</FbButton>)
}

export const Button = qwikify$(QwikButton);
