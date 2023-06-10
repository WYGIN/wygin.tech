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

export const AppShell = qwikify$<AppShellProps>(QwikAppShell, {
  eagerness: "visible",
});
export const Navbar = qwikify$<NavbarProps>(QwikNavbar, {
  eagerness: "visible",
});
export const NavbarSection = qwikify$<SectionProps>(QwikNavbar.Section, {
  eagerness: "visible",
});
export const Header = qwikify$<HeaderProps>(QwikHeader, {
  eagerness: "visible",
});
export const Footer = qwikify$<FooterProps>(QwikFooter, {
  eagerness: "visible",
});
export const Aside = qwikify$<AsideProps>(QwikAside, { eagerness: "visible" });
export const AsideSection = qwikify$<SectionProps>(QwikAside.Section, {
  eagerness: "visible",
});
