import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ButtonProps, buttonVariants } from '@/components/ui/button';
import Spin from './spin';
import { omit } from 'lodash-es';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
  )
);
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn('', className)} {...props} />
);
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>;

const PaginationLink = ({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size
      }),
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

type PaginationPreviousProps = React.ComponentProps<typeof PaginationLink> & {
  loading?: boolean;
};
const PaginationPrevious = ({ className, ...props }: PaginationPreviousProps) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn('gap-1 pl-2.5', className, props.loading ? 'cursor-not-allowed' : '')}
    {...omit(props, 'loading')}
    onClick={props.loading ? undefined : props?.onClick}
  >
    {props?.loading ? (
      <>
        <ChevronLeft className="h-4 w-4 text-muted-foreground" />
        <Spin className="size-4 text-muted-foreground" />
      </>
    ) : (
      <>
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </>
    )}
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

type PaginationNextProps = React.ComponentProps<typeof PaginationLink> & {
  loading?: boolean;
};
const PaginationNext = ({ className, ...props }: PaginationNextProps) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn('gap-1 pr-2.5', className, props.loading ? 'cursor-not-allowed' : '')}
    {...omit(props, 'loading')}
    onClick={props.loading ? undefined : props?.onClick}
  >
    {props?.loading ? (
      <>
        <Spin className="size-4 text-muted-foreground" />
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </>
    ) : (
      <>
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
      </>
    )}
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
};
