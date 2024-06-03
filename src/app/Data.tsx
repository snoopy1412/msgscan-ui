"use client";

import { APP_BASE_API_URL } from "@/config/site";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request, gql } from "graphql-request";

function useMessages({
  limit = 10,
  orderBy = "sourceBlockTimestamp",
  orderDirection = "desc",
} = {}) {
  return useQuery({
    queryKey: ["messages", limit, orderBy, orderDirection],
    queryFn: async () => {
      const query = gql`
        query GetMessages(
          $limit: Int
          $orderBy: String
          $orderDirection: String
        ) {
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

      const variables = {
        limit,
        orderBy,
        orderDirection,
      };

      const data = await request(APP_BASE_API_URL, query, variables);
      return data;
    },
  });
}

const Data = () => {
  const { data: messages, status, error, isFetching } = useMessages();

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(messages);

  return (
    <div>12</div>
    // <div>
    //   <h1>Messages</h1>
    //   {status === "success" && (
    //     <ul>
    //       {messages.map((message) => (
    //         <li key={message.id}>
    //           Protocol: {message.protocol}, Status: {message.status}
    //           {/* 添加更多信息显示，根据需要 */}
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
  );
};
export default Data;
