import Image from "next/image";
import { Badge } from "@/components/ui/badge";

import { MESSAGE_STATUS } from "@/types/message";

interface MessageStatusProps {
  status: MESSAGE_STATUS;
}

const MessageStatus = ({ status }: MessageStatusProps) => {
  switch (status) {
    case MESSAGE_STATUS.PENDING:
      return (
        <Badge className="bg-[hsl(var(--inflight))] hover:bg-[hsl(var(--inflight))]/80 gap-[0.19rem]">
          <Image
            src="/images/message-status/inflight.svg"
            width={14}
            height={15}
            alt="Inflight"
          />
          Inflight
        </Badge>
      );

    case MESSAGE_STATUS.SUCCESS:
      return (
        <Badge className="bg-[hsl(var(--success))] hover:bg-[hsl(var(--success))]/80 gap-[0.19rem]">
          <Image
            src="/images/message-status/success.svg"
            width={14}
            height={15}
            alt="Success"
          />
          Success
        </Badge>
      );
    case MESSAGE_STATUS.FAILED:
      return (
        <Badge className="bg-[hsl(var(--failure))] hover:bg-[hsl(var(--failure))]/80 gap-[0.19rem]">
          <Image
            src="/images/message-status/failed.svg"
            width={14}
            height={15}
            alt="Failed"
          />
          Failed
        </Badge>
      );

    default:
      return null;
  }
};

export default MessageStatus;
