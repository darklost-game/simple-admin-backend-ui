export enum AgentRoleEnum {
  // super admin
  SUPER = '001',
  //  '001': 0,
  //   '00201': 1,
  //   '00202': 2,
  //   '00203': 3,
  //   '0020301': 4,
  // agent lv1
  AGENT_LV1 = '00201',
  // agent lv2
  AGENT_LV2 = '00202',
  // agent lv3
  AGENT_LV3 = '00203',
  // agent lv3 customer service
  AGENT_LV3_CUSTOMER_SERVICE = '0020301',
}

// The agent role level is used to determine the agent level｜权限等级用于确定agent级别
export const AgentRoleEnumLv = {
  [AgentRoleEnum.SUPER]: 0,
  [AgentRoleEnum.AGENT_LV1]: 1,
  [AgentRoleEnum.AGENT_LV2]: 2,
  [AgentRoleEnum.AGENT_LV3]: 3,
  [AgentRoleEnum.AGENT_LV3_CUSTOMER_SERVICE]: 4,
};
