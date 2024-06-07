export interface ApiResponse<T> {
  data: T;
}
interface Message {
  id: string;
  protocol: string;
  payload?: string; // 由于payload后面没有感叹号，表示它是可选的
  params?: string;
  status: number;
  sourceChainId?: string;
  sourceBlockNumber?: string;
  sourceBlockTimestamp?: string;
  sourceTransactionHash?: string;
  sourceTransactionIndex?: number;
  sourceLogIndex?: number;
  sourceDappAddress?: string;
  sourcePortAddress?: string;
  targetChainId?: string;
  targetBlockNumber?: string;
  targetBlockTimestamp?: string;
  targetTransactionHash?: string;
  targetTransactionIndex?: number;
  targetLogIndex?: number;
  targetDappAddress?: string;
  targetPortAddress?: string;
  protocolInfoType?: string;
  protocolInfoId?: string;
}
export interface MessageResponse {
  message: Message;
}

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface MessagePage {
  items: Message[];
  pageInfo: PageInfo;
}

export interface MessagesResponse {
  messages: MessagePage;
}
export interface MessageFilter {
  AND?: MessageFilter[];
  OR?: MessageFilter[];
  id?: string;
  id_not?: string;
  id_in?: string[];
  id_not_in?: string[];
  id_contains?: string;
  id_not_contains?: string;
  id_starts_with?: string;
  id_ends_with?: string;
  id_not_starts_with?: string;
  id_not_ends_with?: string;
  protocol?: string;
  protocol_not?: string;
  protocol_in?: string[];
  protocol_not_in?: string[];
  protocol_contains?: string;
  protocol_not_contains?: string;
  protocol_starts_with?: string;
  protocol_ends_with?: string;
  protocol_not_starts_with?: string;
  protocol_not_ends_with?: string;
  payload?: string;
  payload_not?: string;
  payload_in?: string[];
  payload_not_in?: string[];
  payload_contains?: string;
  payload_not_contains?: string;
  payload_starts_with?: string;
  payload_ends_with?: string;
  payload_not_starts_with?: string;
  payload_not_ends_with?: string;
  params?: string;
  params_not?: string;
  params_in?: string[];
  params_not_in?: string[];
  params_contains?: string;
  params_not_contains?: string;
  params_starts_with?: string;
  params_ends_with?: string;
  params_not_starts_with?: string;
  params_not_ends_with?: string;
  status?: number;
  status_not?: number;
  status_in?: number[];
  status_not_in?: number[];
  status_gt?: number;
  status_lt?: number;
  status_gte?: number;
  status_lte?: number;
  sourceChainId?: bigint;
  sourceChainId_not?: bigint;
  sourceChainId_in?: bigint[];
  sourceChainId_not_in?: bigint[];
  sourceChainId_gt?: bigint;
  sourceChainId_lt?: bigint;
  sourceChainId_gte?: bigint;
  sourceChainId_lte?: bigint;
  sourceBlockNumber?: bigint;
  sourceBlockNumber_not?: bigint;
  sourceBlockNumber_in?: bigint[];
  sourceBlockNumber_not_in?: bigint[];
  sourceBlockNumber_gt?: bigint;
  sourceBlockNumber_lt?: bigint;
  sourceBlockNumber_gte?: bigint;
  sourceBlockNumber_lte?: bigint;
  sourceBlockTimestamp?: bigint;
  sourceBlockTimestamp_not?: bigint;
  sourceBlockTimestamp_in?: bigint[];
  sourceBlockTimestamp_not_in?: bigint[];
  sourceBlockTimestamp_gt?: bigint;
  sourceBlockTimestamp_lt?: bigint;
  sourceBlockTimestamp_gte?: bigint;
  sourceBlockTimestamp_lte?: bigint;
  sourceTransactionHash?: string;
  sourceTransactionHash_not?: string;
  sourceTransactionHash_in?: string[];
  sourceTransactionHash_not_in?: string[];
  sourceTransactionHash_contains?: string;
  sourceTransactionHash_not_contains?: string;
  sourceTransactionHash_starts_with?: string;
  sourceTransactionHash_ends_with?: string;
  sourceTransactionHash_not_starts_with?: string;
  sourceTransactionHash_not_ends_with?: string;
  sourceTransactionIndex?: number;
  sourceTransactionIndex_not?: number;
  sourceTransactionIndex_in?: number[];
  sourceTransactionIndex_not_in?: number[];
  sourceTransactionIndex_gt?: number;
  sourceTransactionIndex_lt?: number;
  sourceTransactionIndex_gte?: number;
  sourceTransactionIndex_lte?: number;
  sourceLogIndex?: number;
  sourceLogIndex_not?: number;
  sourceLogIndex_in?: number[];
  sourceLogIndex_not_in?: number[];
  sourceLogIndex_gt?: number;
  sourceLogIndex_lt?: number;
  sourceLogIndex_gte?: number;
  sourceLogIndex_lte?: number;
  sourceDappAddress?: string;
  sourceDappAddress_not?: string;
  sourceDappAddress_in?: string[];
  sourceDappAddress_not_in?: string[];
  sourceDappAddress_contains?: string;
  sourceDappAddress_not_contains?: string;
  sourceDappAddress_starts_with?: string;
  sourceDappAddress_ends_with?: string;
  sourceDappAddress_not_starts_with?: string;
  sourceDappAddress_not_ends_with?: string;
  sourcePortAddress?: string;
  sourcePortAddress_not?: string;
  sourcePortAddress_in?: string[];
  sourcePortAddress_not_in?: string[];
  sourcePortAddress_contains?: string;
  sourcePortAddress_not_contains?: string;
  sourcePortAddress_starts_with?: string;
  sourcePortAddress_ends_with?: string;
  sourcePortAddress_not_starts_with?: string;
  sourcePortAddress_not_ends_with?: string;
  targetChainId?: bigint;
  targetChainId_not?: bigint;
  targetChainId_in?: bigint[];
  targetChainId_not_in?: bigint[];
  targetChainId_gt?: bigint;
  targetChainId_lt?: bigint;
  targetChainId_gte?: bigint;
  targetChainId_lte?: bigint;
  targetBlockNumber?: bigint;
  targetBlockNumber_not?: bigint;
  targetBlockNumber_in?: bigint[];
  targetBlockNumber_not_in?: bigint[];
  targetBlockNumber_gt?: bigint;
  targetBlockNumber_lt?: bigint;
  targetBlockNumber_gte?: bigint;
  targetBlockNumber_lte?: bigint;
  targetBlockTimestamp?: bigint;
  targetBlockTimestamp_not?: bigint;
  targetBlockTimestamp_in?: bigint[];
  targetBlockTimestamp_not_in?: bigint[];
  targetBlockTimestamp_gt?: bigint;
  targetBlockTimestamp_lt?: bigint;
  targetBlockTimestamp_gte?: bigint;
  targetBlockTimestamp_lte?: bigint;
  targetTransactionHash?: string;
  targetTransactionHash_not?: string;
  targetTransactionHash_in?: string[];
  targetTransactionHash_not_in?: string[];
  targetTransactionHash_contains?: string;
  targetTransactionHash_not_contains?: string;
  targetTransactionHash_starts_with?: string;
  targetTransactionHash_ends_with?: string;
  targetTransactionHash_not_starts_with?: string;
  targetTransactionHash_not_ends_with?: string;
  targetTransactionIndex?: number;
  targetTransactionIndex_not?: number;
  targetTransactionIndex_in?: number[];
  targetTransactionIndex_not_in?: number[];
  targetTransactionIndex_gt?: number;
  targetTransactionIndex_lt?: number;
  targetTransactionIndex_gte?: number;
  targetTransactionIndex_lte?: number;
  targetLogIndex?: number;
  targetLogIndex_not?: number;
  targetLogIndex_in?: number[];
  targetLogIndex_not_in?: number[];
  targetLogIndex_gt?: number;
  targetLogIndex_lt?: number;
  targetLogIndex_gte?: number;
  targetLogIndex_lte?: number;
  targetDappAddress?: string;
  targetDappAddress_not?: string;
  targetDappAddress_in?: string[];
  targetDappAddress_not_in?: string[];
  targetDappAddress_contains?: string;
  targetDappAddress_not_contains?: string;
  targetDappAddress_starts_with?: string;
  targetDappAddress_ends_with?: string;
  targetDappAddress_not_starts_with?: string;
  targetDappAddress_not_ends_with?: string;
  targetPortAddress?: string;
  targetPortAddress_not?: string;
  targetPortAddress_in?: string[];
  targetPortAddress_not_in?: string[];
  targetPortAddress_contains?: string;
  targetPortAddress_not_contains?: string;
  targetPortAddress_starts_with?: string;
  targetPortAddress_ends_with?: string;
  targetPortAddress_not_starts_with?: string;
  targetPortAddress_not_ends_with?: string;
  protocolInfoType?: string;
  protocolInfoType_not?: string;
  protocolInfoType_in?: string[];
  protocolInfoType_not_in?: string[];
  protocolInfoType_contains?: string;
  protocolInfoType_not_contains?: string;
  protocolInfoType_starts_with?: string;
  protocolInfoType_ends_with?: string;
  protocolInfoType_not_starts_with?: string;
  protocolInfoType_not_ends_with?: string;
  protocolInfoId?: string;
  protocolInfoId_not?: string;
  protocolInfoId_in?: string[];
  protocolInfoId_not_in?: string[];
  protocolInfoId_contains?: string;
  protocolInfoId_not_contains?: string;
  protocolInfoId_starts_with?: string;
  protocolInfoId_ends_with?: string;
  protocolInfoId_not_starts_with?: string;
  protocolInfoId_not_ends_with?: string;
}

export interface MessagesQueryVariables {
  where?: MessageFilter;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  before?: string;
  after?: string;
  limit?: number;
}

interface OrmpInfo {
  id: string;
  chainId: bigint;
  blockNumber: bigint;
  blockTimestamp: bigint;
  transactionHash: string;
  transactionIndex: number;
  logIndex: number;
  msgHash: string;
  messageChannel: string;
  messageIndex: bigint;
  messageFromChainId: bigint;
  messageFrom: string;
  messageToChainId: bigint;
  messageTo: string;
  messageGasLimit: bigint;
  messageEncoded: string;
  msgId?: string;
}
export interface OrmpInfoResponse {
  ormpInfo: OrmpInfo;
}

type MessagesInfoFilter = {
  AND?: MessagesInfoFilter[];
  OR?: MessagesInfoFilter[];
  id?: string;
  id_not?: string;
  id_in?: string[];
  id_not_in?: string[];
  id_contains?: string;
  id_not_contains?: string;
  id_starts_with?: string;
  id_ends_with?: string;
  id_not_starts_with?: string;
  id_not_ends_with?: string;
  value?: string;
  value_not?: string;
  value_in?: string[];
  value_not_in?: string[];
  value_contains?: string;
  value_not_contains?: string;
  value_starts_with?: string;
  value_ends_with?: string;
  value_not_starts_with?: string;
  value_not_ends_with?: string;
};

interface MessagesInfo {
  id: string;
  value: string;
}

interface MessagesInfoPage {
  items: MessagesInfo[];
  pageInfo: PageInfo;
}

interface MessagesInfosQueryVariables {
  where?: MessagesInfoFilter;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  before?: string;
  after?: string;
  limit?: number;
}

interface MessagesInfosResponse {
  messagesInfos: MessagesInfoPage;
}
