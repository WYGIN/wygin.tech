/** @jsxImportSource react */
import { 
   createStyles, 
   Header, 
   HoverCard, 
   Group, 
   Button, 
   UnstyledButton, 
   Text, 
   SimpleGrid, 
   ThemeIcon, 
   Anchor, 
   Divider, 
   Center, 
   Box, 
   Burger, 
   Drawer, 
   Collapse, 
   ScrollArea, 
   rem, 
 } from '@mantine/core'; 
 import { MantineLogo } from '@mantine/ds'; 
 import { useDisclosure } from '@mantine/hooks'; 
 import { 
   IconNotification, 
   IconCode, 
   IconBook, 
   IconChartPie3, 
   IconFingerprint, 
   IconCoin, 
   IconChevronDown, 
 } from '@tabler/icons-react'; 
 import { qwikify$ } from '@builder.io/qwik-react';

export interface MegaNavbarLayoutProps {
  navLinks: { 
    icon: HTMLElement & SVGElement; 
    href: string; 
    label: string; 
    megaMenu?: { 
      viewAll: { 
        label: string; 
        href: string; 
      } 
      getStartedLabel: string; 
      getStartedDescription: string; 
      getStartedButtonLabel: string; 
      megaMenuItems: { 
        icon: HTMLElement & SVGElement; 
        title: string; 
        description: string; 
      }[]; 
    }; 
  }[];
}

export const MegaNavbar = ({ navLinks }: MegaNavbarLayoutProps) => {
  const SubNavItem = (navLink) => (
      { 
        navLink.megaMenu.megaMenuItems.map((megaMenuItem) => ( 
          <UnstyledButton className={classes.subLink} key={megaMenuItem.title}> 
            <Group noWrap align="flex-start"> 
              <ThemeIcon size={34} variant="default" radius="md"> 
                <megaMenuItem.icon size={rem(22)} color={theme.fn.primaryColor()} /> 
              </ThemeIcon> 
              <div> 
                <Text size="sm" fw={500}> 
                  {megaMenuItem.title} 
                </Text> 
                <Text size="xs" color="dimmed"> 
                  {megaMenuItem.description} 
                </Text> 
              </div> 
            </Group> 
          </UnstyledButton> 
        )); 
      }
    );
    const MegaNavLinksElement = navLinks.map((navLink) => ( 
     { 
       navLink?.megaMenu 
       ? ( 
           <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal> 
             <HoverCard.Target> 
               <a href={navLink.href} className={classes.link}> 
                 <Center inline> 
                   <Box component="span" mr={5}> 
                     {navLink.label} 
                   </Box> 
                   <IconChevronDown size={16} color={theme.fn.primaryColor()} /> 
                 </Center> 
               </a> 
             </HoverCard.Target> 
  
             <HoverCard.Dropdown sx={{ overflow: 'hidden' }}> 
               <Group position="apart" px="md"> 
                 <Text fw={500}>{navLink.label}</Text> 
                 <Anchor href={navLink.megaMenu.viewAll.href} fz="xs"> 
                   {navLink.megaMenu.viewAll.label} 
                 </Anchor> 
               </Group> 
  
               <Divider 
                 my="sm" 
                 mx="-md" 
                 color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} 
               /> 
  
               <SimpleGrid cols={2} spacing={0}> 
                 {SubNavItem(navLink)}
               </SimpleGrid> 
  
               <div className={classes.dropdownFooter}> 
                 <Group position="apart"> 
                   <div> 
                     <Text fw={500} fz="sm"> 
                       {navLink.megaMenu.getStartedLabel} 
                     </Text> 
                     <Text size="xs" color="dimmed"> 
                       {navLink.megaMenu.getStartedDescription} 
                     </Text> 
                   </div> 
                   <Button variant="default">{navLink.megaMenu.getStartedButtonLabel}</Button> 
                 </Group> 
               </div> 
             </HoverCard.Dropdown> 
           </HoverCard> 
         ) 
       : <a href={navLink.href} key={navLink.href} className={classes.link}>{navLink.label}</a> 
     } 
   ));

  return(MegaNavLinksElement);
}

export const MegaNavBarLayout = qwikify$<MegaNavbarLayoutProps>(MegaNavbar);
