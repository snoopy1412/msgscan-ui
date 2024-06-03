import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Network, NetworkMap } from "@/config/network";
import { Search } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 bg-background justify-between">
      <Link href="/">Logo</Link>
      <div className="flex gap-2 items-center">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a network" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={Network.Mainnet}>
              {NetworkMap[Network.Mainnet].title}
            </SelectItem>
            <SelectItem value={Network.Testnet}>
              {NetworkMap[Network.Testnet].title}
            </SelectItem>
          </SelectContent>
        </Select>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
