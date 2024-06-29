import ClipboardIconButton from '@/components/ClipboardIconButton';
import ExplorerLinkButton from '@/components/ExplorerLinkButton';
import { CodeFont } from '@/config/font';
import { cn } from '@/lib/utils';
import { CHAIN } from '@/types/chains';

interface AddressInfoProps {
  address?: string;
  chain?: CHAIN;
}
const AddressInfo = ({ address, chain }: AddressInfoProps) => {
  if (!address) return null;

  return (
    <div className="flex w-full items-center gap-[0.62rem]">
      <span className={cn('max-w-[calc(100vw-10rem)] truncate', CodeFont.className)}>
        {address}
      </span>
      <ClipboardIconButton text={address} size={16} />
      {chain ? (
        <ExplorerLinkButton url={`${chain?.blockExplorers?.default?.url}/address/${address}`} />
      ) : null}
    </div>
  );
};

export default AddressInfo;
