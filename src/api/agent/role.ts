import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '@/api/model/baseModel';
import { AgentRoleInfo, AgentRoleListResp } from './model/agentRoleModel';

enum Api {
  GetAgentRoleList = '/agent-api/agent/role/list',
}

/**
 * @description: Get role list
 */

export const getAgentRoleList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<AgentRoleListResp>>(
    { url: Api.GetAgentRoleList, params },
    { errorMessageMode: mode },
  );
};
