import Image from 'next/image';
import Link from 'next/link';

import { ModeToggle } from './ModeToggle';
import { APP_NAME } from '@/config/site';

import Logo from './icon/logo';
import SearchBar from './SearchBar';
import NetworkSwitcher from './NetworkSwitcher';

const Header = () => {
  return (
    <header className="fixed left-0 top-0 z-50 w-screen bg-background/50 backdrop-blur-sm">
      <div className="container flex h-[var(--header-height)] items-center justify-between gap-4">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt={APP_NAME}
            width={147}
            priority
            height={26}
            className="hidden lg:block"
          />
          <Logo className="block text-foreground dark:text-[#F2F3F5] lg:hidden" />
        </Link>
        <div className="flex items-center gap-[0.62rem]">
          <div className="hidden lg:block">
            <SearchBar />
          </div>
          <NetworkSwitcher />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
