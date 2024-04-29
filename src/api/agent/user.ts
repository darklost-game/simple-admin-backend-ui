import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseUUIDsReq, BaseUUIDReq } from '@/api/model/baseModel';
import { AgentUserInfo, AgentUserListResp } from './model/agentUserModel';

enum Api {
  CreateAgentUser = '/agent-api/agent/user/create',
  UpdateAgentUser = '/agent-api/agent/user/update',
  GetAgentUserList = '/agent-api/agent/user/list',
  DeleteAgentUser = '/agent-api/agent/user/delete',
  GetAgentUserById = '/agent-api/agent/user',
}

/**
 * @description: Get agent user list
 */

export const getAgentUserList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<AgentUserListResp>>(
    { url: Api.GetAgentUserList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new agent user
 */
export const createAgentUser = (params: AgentUserInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateAgentUser, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the agent user
 */
export const updateAgentUser = (params: AgentUserInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateAgentUser, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete agent users
 */
export const deleteAgentUser = (params: BaseUUIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteAgentUser, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get  agent user By ID
 */
export const getAgentUserById = (params: BaseUUIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<AgentUserInfo>>(
    { url: Api.GetAgentUserById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
