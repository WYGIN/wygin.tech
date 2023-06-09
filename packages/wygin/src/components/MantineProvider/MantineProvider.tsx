/** @jsxImportSource react */
import { type ReactNode } from 'react';
import { MantineProvider as Provider } from '@mantine/core';
import { qwikify$ } from '@builder.io/qwik-react';

function QwikProvider({ children }: { children?: ReactNode[] }) {
  return (<Provider>{children}</Provider>)
}

export const MantineProvider = qwikify$(QwikProvider, { eagerness: 'load' });