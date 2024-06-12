import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'; // 假设shadcn已经提供了Tooltip组件
import { cn } from '@/lib/utils';
import { CHAIN } from '@/types/chains';
import { toShortText } from '@/utils';

interface ChainTxDisplayProps {
  chain?: CHAIN;
  value: string;
  isLink?: boolean;
  isFullText?: boolean;
  rootClassName?: string;
  className?: string;
  iconClassName?: string;
}

const ChainTxDisplay = ({
  chain,
  value,
  isLink = true,
  isFullText = false,
  rootClassName,
  className,
  iconClassName,
  children
}: React.PropsWithChildren<ChainTxDisplayProps>) => {
  const renderContent = () => {
    const txLink = `${chain?.blockExplorers?.default?.url}/tx/${value}`;
    if (isLink) {
      return (
        <Link
          href={txLink}
          className={cn('truncate hover:underline', className)}
          title={value}
          target="_blank"
          rel="noreferrer noopener"
        >
          {isFullText ? value : toShortText(value, 6, 4)}
        </Link>
      );
    } else {
      return (
        <span className={cn('truncate', className)} title={value}>
          {isFullText ? value : toShortText(value, 6, 4)}
        </span>
      );
    }
  };

  return (
    <div className={cn('flex items-center gap-[0.31rem]', rootClassName)}>
      {chain ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Image
              width={20}
              height={20}
              alt=""
              src={chain.iconUrl}
              className={cn('rounded-full', iconClassName)}
            />
          </TooltipTrigger>
          <TooltipContent>{chain?.name}</TooltipContent>
        </Tooltip>
      ) : null}
      {renderContent()}
      {children}
    </div>
  );
};

export default ChainTxDisplay;
