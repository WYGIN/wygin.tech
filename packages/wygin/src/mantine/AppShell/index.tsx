/** @jsxImportSource react */
import type {
  AppShellProps,
  NavbarProps,
  HeaderProps,
  FooterProps,
  AsideProps,
} from "@mantine/core";
import {
  AppShell as QwikAppShell,
  Navbar as QwikNavbar,
  Header as QwikHeader,
  Footer as QwikFooter,
  Aside as QwikAside,
} from "@mantine/core";
import type { SectionProps } from "@mantine/core/lib/AppShell/HorizontalSection/Section/Section";
import { qwikify$ } from "@builder.io/qwik-react";

export const AppShell = qwikify$<AppShellProps>(QwikAppShell);
export const Navbar = qwikify$<NavbarProps>(QwikNavbar);
export const NavbarSection = qwikify$<SectionProps>(QwikNavbar.Section);
export const Header = qwikify$<HeaderProps>(QwikHeader);
export const Footer = qwikify$<FooterProps>(QwikFooter);
export const Aside = qwikify$<AsideProps>(QwikAside);
export const AsideSection = qwikify$<SectionProps>(QwikAside.Section);
