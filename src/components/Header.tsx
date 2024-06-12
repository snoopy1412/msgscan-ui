import Image from 'next/image';
import Link from 'next/link';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { NetworkMap } from '@/config/network';
import { ModeToggle } from './ModeToggle';
import { DEPLOY_ENV } from '@/types/env';
import { APP_NAME } from '@/config/site';

import Logo from './icon/logo';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <header className="bg-background">
      <div className="container flex h-[var(--header-height)] items-center justify-between gap-4">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt={APP_NAME}
            width={147}
            height={26}
            className="hidden lg:block"
          />
          <Logo className="block text-foreground dark:text-[#F2F3F5] lg:hidden" />
        </Link>
        <div className="flex items-center gap-[0.62rem]">
          <div className="hidden lg:block">
            <SearchBar />
          </div>
          <Select>
            <SelectTrigger className="h-[1.625rem] p-[0.62rem] lg:h-[2.625rem] lg:px-[0.62rem]">
              <SelectValue placeholder="Select a network" className="text-[0.875rem]" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={DEPLOY_ENV.MAINNET} className="text-[0.875rem]">
                {NetworkMap[DEPLOY_ENV.MAINNET].title}
              </SelectItem>
              <SelectItem value={DEPLOY_ENV.TESTNET} className="text-[0.875rem]">
                {NetworkMap[DEPLOY_ENV.TESTNET].title}
              </SelectItem>
            </SelectContent>
          </Select>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
