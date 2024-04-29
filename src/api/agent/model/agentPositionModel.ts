import { BaseListResp } from '@/api/model/baseModel';

/**
 *  @description: Agent Position info response
 */
export interface AgentPositionInfo {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  trans?: string;
  status?: number;
  sort?: number;
  name?: string;
  code?: string;
  remark?: string;
}

/**
 *  @description: Agent Position list response
 */

export type AgentPositionListResp = BaseListResp<AgentPositionInfo>;
