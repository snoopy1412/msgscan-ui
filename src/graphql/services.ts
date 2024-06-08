import { client } from './client';
import { GET_MESSAGES, GET_MESSAGE, GET_ORMP_INFO, GET_MESSAGES_INFOS } from './queries';
import type {
  MessagesQueryVariables,
  MessagesInfosQueryVariables,
  MessagesResponse,
  MessageResponse,
  OrmpInfoResponse,
  MessagesInfosResponse
} from './type';

export async function fetchMessages(
  variables: MessagesQueryVariables = {}
): Promise<MessagesResponse | null> {
  try {
    const response = await client.request<MessagesResponse, MessagesQueryVariables>(
      GET_MESSAGES,
      variables
    );
    return response;
  } catch (error) {
    console.error('messages request failed:', error);
    return null;
  }
}

export async function fetchMessage(id: string): Promise<MessageResponse | null> {
  try {
    const response = await client.request<MessageResponse>(GET_MESSAGE, { id });
    return response;
  } catch (error) {
    console.error('message request failed:', error);
    return null;
  }
}

export async function fetchOrmpInfo(id: string): Promise<OrmpInfoResponse | null> {
  try {
    const response = await client.request<OrmpInfoResponse>(GET_ORMP_INFO, { id });
    return response;
  } catch (error) {
    console.error('ormpInfo request failed:', error);
    return null;
  }
}

export async function fetchMessagesInfos(
  variables: MessagesInfosQueryVariables = {}
): Promise<MessagesInfosResponse | null> {
  try {
    const response = await client.request<MessagesInfosResponse, MessagesInfosQueryVariables>(
      GET_MESSAGES_INFOS,
      variables
    );
    return response;
  } catch (error) {
    console.error('messagesInfos request failed:', error);
    return null;
  }
}
