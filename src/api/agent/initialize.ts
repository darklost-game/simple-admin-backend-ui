import { defHttp } from '@/utils/http/axios';
import { BaseResp } from '@/api/model/baseModel';

enum Api {
  InitializeAgentDatabase = '/agent-api/core/init/database',
}

/**
 * @description: initialize the agent management service database
 */

export const initializeAgentDatabase = () => {
  return defHttp.get<BaseResp>({ url: Api.InitializeAgentDatabase });
};
