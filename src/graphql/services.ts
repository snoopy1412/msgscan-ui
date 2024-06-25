import { client } from './client';
import { GET_ORMP_INFO, GET_MESSAGE_FULL, GET_MESSAGE_PROGRESS } from './queries';
import type {
  OrmpInfoResponse,
  MessageFullQueryParams,
  MessageFullResponse,
  MessageProgressResponse
} from './type';

export async function fetchOrmpInfo(id: string): Promise<OrmpInfoResponse | null> {
  try {
    const response = await client.request<OrmpInfoResponse>(GET_ORMP_INFO, { id });
    return response;
  } catch (error) {
    console.error('ormpInfo request failed:', error);
    return null;
  }
}

export async function fetchMessageFull(
  variables: MessageFullQueryParams = {}
): Promise<MessageFullResponse | null> {
  try {
    const response = await client.request<MessageFullResponse, MessageFullQueryParams>(
      GET_MESSAGE_FULL,
      variables
    );
    return response;
  } catch (error) {
    console.error('messageFull request failed:', error);
    return null;
  }
}

export async function fetchMessage(
  id: string
): Promise<MessageFullResponse['MessageFull']['0'] | null> {
  try {
    const response = await client.request<MessageFullResponse, MessageFullQueryParams>(
      GET_MESSAGE_FULL,
      {
        where: {
          _or: [
            {
              id: {
                _eq: id
              }
            },
            {
              sourceTransactionHash: {
                _eq: id
              }
            }
          ]
        }
      }
    );
    return response?.MessageFull?.[0];
  } catch (error) {
    console.error('message request failed:', error);
    return null;
  }
}

export async function fetchMessageProgress(): Promise<MessageProgressResponse | null> {
  try {
    const response = await client.request<MessageProgressResponse>(GET_MESSAGE_PROGRESS);
    return response;
  } catch (error) {
    console.error('messageProgress request failed:', error);
    return null;
  }
}
