import { gql } from "graphql-request";

export const GET_MESSAGES = gql`
  query GetMessages($limit: Int, $orderBy: String, $orderDirection: String) {
    messages(
      limit: $limit
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      items {
        id
        protocol
        status
        payload
        params
        sourceChainId
        sourceBlockNumber
        sourceBlockTimestamp
        sourceTransactionHash
        sourceTransactionIndex
        sourceLogIndex
        sourceDappAddress
        sourcePortAddress
        targetChainId
        targetBlockNumber
        targetBlockTimestamp
        targetTransactionHash
        targetTransactionIndex
        targetLogIndex
        targetDappAddress
        targetPortAddress
        protocolInfoType
        protocolInfoId
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
  query GetMessage($id: String!) {
    message(id: $id) {
      id
      protocol
      status
      payload
      params
      sourceChainId
      sourceBlockNumber
      sourceBlockTimestamp
      sourceTransactionHash
      sourceTransactionIndex
      sourceLogIndex
      sourceDappAddress
      sourcePortAddress
      targetChainId
      targetBlockNumber
      targetBlockTimestamp
      targetTransactionHash
      targetTransactionIndex
      targetLogIndex
      targetDappAddress
      targetPortAddress
      protocolInfoType
      protocolInfoId
    }
  }
`;
