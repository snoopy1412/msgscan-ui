import { client } from './client';
import { GET_MESSAGES, GET_MESSAGE, GET_MESSAGES_INFO, GET_ORMP_INFO } from './queries';
import type { MessagesQueryVariables, MessagesResponse, MessageResponse } from './type';

export async function fetchMessages(
  variables: MessagesQueryVariables
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
