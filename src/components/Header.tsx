import Image from "next/image";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { NetworkMap } from "@/config/network";
import { Search } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { DEPLOY_ENV } from "@/types/env";
import { APP_NAME } from "@/config/site";

const Header = () => {
  return (
    <header className="flex h-[var(--header-height)] items-center gap-4 bg-background justify-between">
      <Link href="/">
        <Image src="/images/logo.svg" alt={APP_NAME} width={147} height={26} />
      </Link>
      <div className="flex gap-[0.62rem] items-center">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="SCAN Source Tx Hash or Msgld"
              className="pl-8 sm:w-[300px] md:w-[300px] lg:w-[600px]"
            />
          </div>
        </form>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a network" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={DEPLOY_ENV.MAINNET}>
              {NetworkMap[DEPLOY_ENV.MAINNET].title}
            </SelectItem>
            <SelectItem value={DEPLOY_ENV.TESTNET}>
              {NetworkMap[DEPLOY_ENV.TESTNET].title}
            </SelectItem>
          </SelectContent>
        </Select>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
