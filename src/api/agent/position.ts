import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '@/api/model/baseModel';
import { AgentPositionInfo, AgentPositionListResp } from './model/agentPositionModel';

enum Api {
  GetAgentPositionList = '/agent-api/position/list',
}

/**
 * @description: Get position list
 */

export const getAgentPositionList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<AgentPositionListResp>>(
    { url: Api.GetAgentPositionList, params },
    { errorMessageMode: mode },
  );
};
