import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '@/api/model/baseModel';
import { AgentDepartmentInfo, AgentDepartmentListResp } from './model/agentDepartmentModel';

enum Api {
  GetAgentDepartmentList = '/agent-api/agent/department/list',
}

/**
 * @description: Get department list
 */

export const getAgentDepartmentList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<AgentDepartmentListResp>>(
    { url: Api.GetAgentDepartmentList, params },
    { errorMessageMode: mode },
  );
};
