import { BaseListResp } from '@/api/model/baseModel';

/**
 *  @description: Agent Department info response
 */
export interface AgentDepartmentInfo {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  trans?: string;
  status?: number;
  sort?: number;
  name?: string;
  ancestors?: string;
  leader?: string;
  phone?: string;
  email?: string;
  remark?: string;
  parentId?: number;
}

/**
 *  @description: Agent Department list response
 */

export type AgentDepartmentListResp = BaseListResp<AgentDepartmentInfo>;
