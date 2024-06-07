import { gql } from 'graphql-request';
import { MESSAGE_FIELDS } from './fragments';

export const GET_MESSAGES = gql`
  ${MESSAGE_FIELDS}
  query GetMessages(
    $where: MessageFilter
    $orderBy: String
    $orderDirection: String
    $before: String
    $after: String
    $limit: Int
  ) {
    messages(
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
      before: $before
      after: $after
      limit: $limit
    ) {
      items {
        ...MessageFields
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const GET_MESSAGE = gql`
  ${MESSAGE_FIELDS}
  query GetMessage($id: String!) {
    message(id: $id) {
      ...MessageFields
    }
  }
`;

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

export const GET_MESSAGES_INFO = gql`
  query MessagesInfoQuery {
    messagesInfos {
      items {
        id
        value
      }
    }
  }
`;
