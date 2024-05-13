import { BaseListResp } from '@/api/model/baseModel';

/**
 *  @description: Agent Token info response
 */
export interface AgentTokenInfo {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  status?: number;
  uuid?: string;
  token?: string;
  source?: string;
  username?: string;
  expiredAt?: number;
}

/**
 *  @description: Agent Token list response
 */

export type AgentTokenListResp = BaseListResp<AgentTokenInfo>;
