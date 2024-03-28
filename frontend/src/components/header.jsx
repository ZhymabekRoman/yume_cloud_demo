import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";
import { Link } from 'react-router-dom';

export default function HeaderPage() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Menu</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link to="/">Dashboard</Link>
          </MenubarItem>
          <MenubarItem>
            <Link to="/settings">Settings</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}