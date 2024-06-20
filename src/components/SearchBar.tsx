'use client';
import { useState, useCallback, ChangeEventHandler } from 'react';
import { useDebounce } from 'react-use';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import Spin from './ui/spin';
import { useRouter } from 'next/navigation';
import { fetchMessage } from '@/graphql/services';

const SearchBar = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSearch = useCallback<ChangeEventHandler<HTMLInputElement>>(async (e) => {
    setKeyword(e.target.value);
  }, []);

  const isErrorMessage = keyword && (!keyword.startsWith('0x') || keyword.length < 3);

  const [, cancel] = useDebounce(
    async () => {
      if (!keyword || isErrorMessage) {
        cancel();
        return;
      }
      setLoading(true);
      const response = await fetchMessage(keyword); // 假设 fetchMessage 返回 IMessageResponse 或 null
      if (response?.message?.id) {
        router.push(`/message/${response.message.id}`);
        setKeyword('');
      }
      setLoading(false);
    },
    500,
    [keyword]
  );

  return (
    <form className="ml-auto flex-1 sm:flex-initial">
      <div className="relative">
        {loading ? (
          <Spin className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground" />
        ) : (
          <Search className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground" />
        )}
        <Input
          type="search"
          placeholder="SCAN Source Tx Hash or Msgld"
          className="pl-8 placeholder:text-xs sm:w-full lg:w-[600px]"
          value={keyword}
          onChange={handleSearch}
        />
        {isErrorMessage && (
          <p className="absolute left-0 top-full pt-2 text-xs leading-4 text-red-500 lg:text-sm">
            This is an invalid search string. Please check your input or try another search.
          </p>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
