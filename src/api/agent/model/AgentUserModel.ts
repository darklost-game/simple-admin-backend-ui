import { BaseListResp } from '@/api/model/baseModel';

/**
 *  @description: Agent User info response
 */
export interface AgentUserInfo {
  id?: string;
  createdAt?: number;
  updatedAt?: number;
  status?: number;
  username?: string;
  nickname?: string;
  password?: string;
  description?: string;
  homePath?: string;
  roleIds?: number[];
  mobile?: string;
  email?: string;
  avatar?: string;
  departmentId?: number;
  positionIds?: number[];
  totpSecret?: string;
  lv?: number;
  parentUuid?: string;
  lv1Uuid?: string;
  lv2Uuid?: string;
  lv3Uuid?: string;
}

/**
 *  @description: AgentUser list response
 */

export type AgentUserListResp = BaseListResp<AgentUserInfo>;
