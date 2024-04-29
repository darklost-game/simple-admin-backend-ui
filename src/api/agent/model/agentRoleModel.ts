import { BaseListResp } from '@/api/model/baseModel';

/**
 *  @description: AgentRole info response
 */
export interface AgentRoleInfo {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  trans?: string;
  status?: number;
  name?: string;
  code?: string;
  defaultRouter?: string;
  remark?: string;
  sort?: number;
}

/**
 *  @description: AgentRole list response
 */

export type AgentRoleListResp = BaseListResp<AgentRoleInfo>;
