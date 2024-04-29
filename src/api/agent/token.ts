import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {
  BaseDataResp,
  BaseListReq,
  BaseResp,
  BaseUUIDsReq,
  BaseUUIDReq,
} from '@/api/model/baseModel';
import { AgentTokenInfo, AgentTokenListResp } from './model/agentTokenModel';

enum Api {
  CreateAgentToken = '/agent-api/agent/token/create',
  UpdateAgentToken = '/agent-api/agent/token/update',
  GetAgentTokenList = '/agent-api/agent/token/list',
  DeleteAgentToken = '/agent-api/agent/token/delete',
  GetAgentTokenById = '/agent-api/agent/token',
  AgentLogout = '/agent-api/agent/token/logout',
}

/**
 * @description: Get token list
 */

export const getAgentTokenList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<AgentTokenListResp>>(
    { url: Api.GetAgentTokenList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new token
 */
export const createAgentToken = (params: AgentTokenInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateAgentToken, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the token
 */
export const updateAgentToken = (params: AgentTokenInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateAgentToken, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete tokens
 */
export const deleteAgentToken = (params: BaseUUIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteAgentToken, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get token By ID
 */
export const getAgentTokenById = (params: BaseUUIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<AgentTokenInfo>>(
    { url: Api.GetAgentTokenById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: Agent logout
 */
export const agentLogout = (id: string, mode: ErrorMessageMode = 'notice') =>
  defHttp.post(
    { url: Api.AgentLogout, params: { id: id } },
    { errorMessageMode: mode, successMessageMode: mode },
  );
