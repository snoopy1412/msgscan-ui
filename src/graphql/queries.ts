import { gql } from 'graphql-request';

export const GET_ORMP_INFO = gql`
  query GetOrmpInfo($id: String!) {
    ormpInfo(id: $id) {
      id
      chainId
      blockNumber
      blockTimestamp
      transactionHash
      transactionIndex
      logIndex
      msgHash
      messageChannel
      messageIndex
      messageFromChainId
      messageFrom
      messageToChainId
      messageTo
      messageGasLimit
      messageEncoded
      msgId
    }
  }
`;

export const GET_MESSAGE_FULL = gql`
  query GetMessageFull(
    $distinctOn: [MessageFull_select_column!]
    $limit: Int
    $offset: Int
    $orderBy: [MessageFull_order_by!]
    $where: MessageFull_bool_exp
  ) {
    MessageFull(
      distinct_on: $distinctOn
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      id
      db_write_timestamp
      params
      payload
      protocol
      sourceBlockNumber
      sourceBlockTimestamp
      sourceChainId
      sourceDappAddress
      sourceLogIndex
      sourcePortAddress
      sourceTransactionHash
      sourceTransactionIndex
      status
      targetBlockNumber
      targetBlockTimestamp
      targetChainId
      targetDappAddress
      targetLogIndex
      targetPortAddress
      targetTransactionHash
      targetTransactionIndex
    }
  }
`;

export const GET_MESSAGE_PROGRESS = gql`
  query GetMessageProgress {
    MessageProgress {
      db_write_timestamp
      id
      inflight
      total
    }
  }
`;

export const GET_ORMP_MESSAGE_ACCEPTED = gql`
  query ORMPInfo($id: String!) {
    ORMP_MessageAccepted(where: { id: { _eq: $id } }) {
      blockNumber
      channel
      db_write_timestamp
      encoded
      eventsSummary
      from
      fromChainId
      gasLimit
      id
      index
      msgHash
      oracle
      oracleAssigned
      oracleAssignedFee
      relayer
      relayerAssigned
      relayerAssignedFee
      to
      toChainId
      transactionHash
    }
  }
`;
