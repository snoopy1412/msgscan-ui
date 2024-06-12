'use client';
import Image from 'next/image';
import Link from 'next/link';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from './ui/input';
import { NetworkMap } from '@/config/network';
import { useDebounce } from 'react-use';
import { Search } from 'lucide-react';
import { ModeToggle } from './ModeToggle';
import { DEPLOY_ENV } from '@/types/env';
import { APP_NAME } from '@/config/site';
import { ChangeEventHandler, useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchMessage } from '@/graphql/services';
import Spin from './ui/spin';
import Logo from './icon/logo';

const Header = () => {
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleSearch = useCallback<ChangeEventHandler<HTMLInputElement>>(async (e) => {
    setKeyword(e.target.value);
  }, []);

  const isErrorMessage = useMemo(() => {
    return keyword && !keyword?.startsWith('0x') && keyword?.length < 3;
  }, [keyword]);

  const [, cancel] = useDebounce(
    async () => {
      if (keyword) {
        if (isErrorMessage) {
          return;
        }
        setLoading(true);
        const response = await fetchMessage(keyword);
        if (response?.message?.id) {
          router.push(`/tx/${response.message.id}`);
          setKeyword('');
        }
        setLoading(false);
      } else {
        cancel();
      }
    },
    500,
    [keyword, isErrorMessage]
  );

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
          <form className="ml-auto hidden flex-1 sm:flex-initial lg:block">
            <div className="relative">
              {loading ? (
                <Spin className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground" />
              ) : (
                <Search className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground" />
              )}
              <Input
                type="search"
                placeholder="SCAN Source Tx Hash or Msgld"
                className="pl-8 sm:w-[300px] md:w-[300px] lg:w-[600px]"
                value={keyword}
                onChange={handleSearch}
              />
              {isErrorMessage ? (
                <p className="absolute left-0 top-full pt-2 text-sm leading-4 text-red-500">
                  This is an invalid search string. Please check your input or try another search.
                </p>
              ) : null}
            </div>
          </form>
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
