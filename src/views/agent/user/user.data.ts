import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';
import { updateAgentUser, getAgentUserList } from '@/api/agent/user';
import { Switch, Tag } from 'ant-design-vue';
import { h } from 'vue';
import { isString, isNumber, isNil } from '@/utils/is';
import { uploadApi } from '@/api/fms/cloudFile';
import { getAgentRoleList } from '/@/api/agent/role';
import { getAgentDepartmentList } from '/@/api/agent/department';
import { getAgentPositionList } from '/@/api/agent/position';
import { AgentRoleInfo } from '/@/api/agent//model/agentRoleModel';
import { useMessage } from '/@/hooks/web/useMessage';
import { AgentRoleEnumLv } from '/@/enums/agentEnum';
const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('agent.user.username'),
    dataIndex: 'username',
    width: 100,
  },
  {
    title: t('agent.user.nickname'),
    dataIndex: 'nickname',
    width: 100,
  },
  // {
  //   title: t('agent.user.password'),
  //   dataIndex: 'password',
  //   width: 100,
  // },
  // {
  //   title: t('agent.user.description'),
  //   dataIndex: 'description',
  //   width: 100,
  // },
  // {
  //   title: t('agent.user.homePath'),
  //   dataIndex: 'homePath',
  //   width: 100,
  // },
  // {
  //   title: t('agent.user.roleIds'),
  //   dataIndex: 'roleIds',
  //   width: 100,
  // },
  // {
  //   title: t('agent.user.mobile'),
  //   dataIndex: 'mobile',
  //   width: 100,
  // },
  // {
  //   title: t('agent.user.email'),
  //   dataIndex: 'email',
  //   width: 100,
  // },
  // {
  //   title: t('agent.user.avatar'),
  //   dataIndex: 'avatar',
  //   width: 100,
  // },
  // {
  //   title: t('agent.user.departmentId'),
  //   dataIndex: 'departmentId',
  //   width: 100,
  // },
  // {
  //   title: t('agent.user.positionIds'),
  //   dataIndex: 'positionIds',
  //   width: 100,
  // },
  {
    title: t('agent.user.totpSecret'),
    dataIndex: 'totpSecret',
    width: 100,
    customRender: ({ record }) => {
      let totpSecretText = '';
      let totpSecretColor = 'red';
      if (isString(record.totpSecret) && record.totpSecret.length > 0) {
        totpSecretText = t('agent.user.totpSecretAreadyBind');
        totpSecretColor = 'green';
      } else {
        totpSecretText = t('agent.user.totpSecretNotBind');
        totpSecretColor = 'red';
      }
      return h(
        Tag,
        {
          color: totpSecretColor,
        },
        () => totpSecretText,
      );
    },
  },

  {
    title: t('agent.user.lv'),
    dataIndex: 'lv',
    width: 100,
  },
  {
    title: t('agent.user.parentUuid'),
    dataIndex: 'parentUuid',
    width: 100,
  },
  {
    title: t('agent.user.lv1Uuid'),
    dataIndex: 'lv1Uuid',
    width: 100,
  },
  {
    title: t('agent.user.lv2Uuid'),
    dataIndex: 'lv2Uuid',
    width: 100,
  },
  {
    title: t('agent.user.lv3Uuid'),
    dataIndex: 'lv3Uuid',
    width: 100,
  },
  {
    title: t('common.status'),
    dataIndex: 'status',
    width: 100,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: t('common.on'),
        unCheckedChildren: t('common.off'),
        loading: record.pendingStatus,
        onChange(checked, _) {
          const { createMessage } = useMessage();
          if (record.username === 'admin') {
            createMessage.warn(t('sys.role.adminStatusChangeForbidden'));
            return;
          }

          record.pendingStatus = true;
          const newStatus = checked ? 1 : 2;
          updateAgentUser({ id: record.id, status: newStatus })
            .then(() => {
              record.status = newStatus;
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createdAt',
    width: 100,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  // {
  //   field: 'lv',
  //   label: t('agent.user.lv'),
  //   component: 'DictionarySelect',
  //   // defaultValue: 0,
  //   componentProps: {
  //     dictionaryName: 'agentLv',
  //     onOpitions: (options?: DefaultOptionType[]) => {
  //       // Add type annotation to options parameter

  //       options?.map((item) => {
  //         item.value = Number(item.value);
  //         return item;
  //       });
  //       return options;
  //     },
  //   },
  //   colProps: { span: 8 },
  // },
  {
    field: 'roleIds',
    label: t('agent.user.roleIds'),
    component: 'ApiMultipleSelect',
    componentProps: {
      api: getAgentRoleList,
      params: {
        page: 1,
        pageSize: 100,
      },
      resultField: 'data.data',
      labelField: 'trans',
      valueField: 'id',
    },
    colProps: { span: 8 },
  },
  {
    field: 'parentUuid',
    label: t('agent.user.parentUuid'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'username',
    label: t('agent.user.username'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 20 }],
  },
  {
    field: 'lv1Uuid',
    label: t('agent.user.lv1Uuid'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'lv2Uuid',
    label: t('agent.user.lv2Uuid'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'lv3Uuid',
    label: t('agent.user.lv3Uuid'),
    component: 'Input',
    colProps: { span: 8 },
  },

  {
    field: 'nickname',
    label: t('agent.user.nickname'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 10 }],
  },
  {
    field: 'mobile',
    label: t('agent.user.mobile'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 18 }],
  },
  {
    field: 'email',
    label: t('agent.user.email'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 100 }],
  },

  // {
  //   field: 'departmentId',
  //   label: t('agent.user.departmentId'),
  //   component: 'Input',
  //   colProps: { span: 8 },
  // },
  // {
  //   field: 'positionId',
  //   label: t('agent.user.positionId'),
  //   component: 'Input',
  //   colProps: { span: 8 },
  // },
];
const isLv1orNil = (lv?: Number) => {
  if (isNil(lv)) {
    return true;
  }
  // if (lv === 0 || lv === 1) {
  //   return true;
  // }

  return false;
};
interface ParentUuidParams {
  page: number;
  pageSize: number;
  lv?: number;
}
const parentUuidParams: ParentUuidParams = {
  page: 1,
  pageSize: 1000,
  lv: undefined,
};

// const roleCode2LvMap = {
//   '001': 0,
//   '00201': 1,
//   '00202': 2,
//   '00203': 3,
//   '0020301': 4,
// };
export const formSchema: FormSchema[] = [
  {
    field: 'avatar',
    label: t('sys.user.avatar'),
    defaultValue: '',
    component: 'CropperAvatar',
    show: true,
    componentProps: {
      uploadApi: uploadApi,
      btnText: t('sys.user.changeAvatar'),
      width: 100,
      formValueType: 'string',
    },
  },
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'username',
    label: t('agent.user.username'),
    component: 'Input',
    required: true,
    rules: [{ max: 50 }],
  },
  {
    field: 'nickname',
    label: t('agent.user.nickname'),
    component: 'Input',
    required: true,
    rules: [{ max: 40 }],
  },
  {
    field: 'password',
    label: t('agent.user.password'),
    component: 'Input',
    required: true,
    rules: [{ min: 6 }],
  },
  {
    field: 'description',
    label: t('agent.user.description'),
    component: 'Input',
    required: true,
    rules: [{ max: 100 }],
  },
  {
    field: 'homePath',
    label: t('agent.user.homePath'),
    component: 'Input',
    defaultValue: '/dashboard',
    required: true,
    rules: [{ max: 70 }],
  },
  {
    field: 'roleIds',
    label: t('agent.user.roleIds'),
    required: true,
    component: 'ApiMultipleSelect',
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      return {
        api: getAgentRoleList,
        params: {
          page: 1,
          pageSize: 100,
        },
        resultField: 'data.data',
        labelField: 'trans',
        valueField: 'id',

        onSelect: (value: any, option: any) => {
          console.log('onSelect roleIds', value);
          console.log('onSelect roleIds', option);
          const roleInfo: AgentRoleInfo = option;
          let curLv: number | undefined = undefined;
          if (!isNil(roleInfo.code) && roleInfo.code in AgentRoleEnumLv) {
            console.log('onSelect roleIds roleInfo curLv ', AgentRoleEnumLv[roleInfo.code]);
            curLv = AgentRoleEnumLv[roleInfo.code];
          } else {
            console.log('onSelect roleIds roleInfo curLv not found', roleInfo.code);
            curLv = undefined;
          }
          formModel.lv = curLv;
          if (isNumber(curLv) && curLv > 1) {
            //查询上级代理
            parentUuidParams.lv = curLv - 1;
          } else {
            parentUuidParams.lv = undefined;
          }
        },
        onClear: () => {
          console.log('onClear roleIds');
          parentUuidParams.lv = undefined;
          formModel.lv = undefined;
        },
      };
    },
  },
  {
    field: 'lv',
    label: t('agent.user.lv'),
    component: 'InputNumber',
    colProps: { span: 8 },
    required: true,
    show: false,
  },
  {
    field: 'parentUuid',
    label: t('agent.user.parentUuid'),
    component: 'ApiSelect',
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      return {
        api: getAgentUserList,
        params: parentUuidParams,
        resultField: 'data.data',
        labelField: 'username',
        valueField: 'id',
        alwaysLoad: true,
        onSelect: (value: any, option: any) => {
          console.log('onSelect parentUuid', value);
          console.log('onSelect parentUuid', option);
          formModel.parentUuid = value;
          formModel.lv1Uuid = option.lv1Uuid;
          formModel.lv2Uuid = option.lv2Uuid;
          formModel.lv3Uuid = option.lv3Uuid;
          switch (formModel.lv) {
            case 0:
              break;
            case 1:
              formModel.lv1Uuid = undefined;
              formModel.lv2Uuid = undefined;
              formModel.lv3Uuid = undefined;
              break;
            case 2:
              formModel.lv1Uuid = value;
              formModel.lv2Uuid = undefined;
              formModel.lv3Uuid = undefined;
              break;
            case 3:
              formModel.lv2Uuid = value;
              formModel.lv3Uuid = undefined;
              break;
            case 4:
              formModel.lv3Uuid = value;
            default:
              break;
          }
        },
        onClear: () => {
          console.log('onClear parentUuid');
          formModel.parentUuid = undefined;
          formModel.lv1Uuid = undefined;
          formModel.lv2Uuid = undefined;
          formModel.lv3Uuid = undefined;
        },
      };
    },

    required: false,
    ifShow: ({ values }) => !isLv1orNil(values.lv),
  },

  {
    field: 'lv1Uuid',
    label: t('agent.user.lv1Uuid'),
    component: 'Input',
    required: false,
    show: false,
  },
  {
    field: 'lv2Uuid',
    label: t('agent.user.lv2Uuid'),
    component: 'Input',
    required: false,
    show: false,
  },
  {
    field: 'lv3Uuid',
    label: t('agent.user.lv3Uuid'),
    component: 'Input',
    required: false,
    show: false,
  },
  {
    field: 'mobile',
    label: t('agent.user.mobile'),
    component: 'Input',
    // required: true,
    rules: [{ max: 18 }],
  },
  {
    field: 'email',
    label: t('agent.user.email'),
    component: 'Input',
    required: true,
    rules: [{ max: 80 }],
  },
  {
    field: 'departmentId',
    label: t('sys.department.userDepartment'),
    component: 'ApiTreeSelect',
    required: true,
    componentProps: {
      api: getAgentDepartmentList,
      params: {
        page: 1,
        pageSize: 1000,
        name: '',
        leader: '',
      },
      resultField: 'data.data',
      labelField: 'trans',
      valueField: 'id',
    },
  },
  {
    field: 'positionId',
    label: t('sys.position.userPosition'),
    component: 'ApiMultipleSelect',
    required: true,
    componentProps: {
      api: getAgentPositionList,
      params: {
        page: 1,
        pageSize: 1000,
        name: '',
      },
      resultField: 'data.data',
      labelField: 'trans',
      valueField: 'id',
    },
  },
  // {
  //   field: 'totpSecret',
  //   label: t('agent.user.totpSecret'),
  //   component: 'Input',
  //   required: true,
  // },
  {
    field: 'status',
    label: t('agent.user.status'),
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: t('common.on'), value: 1 },
        { label: t('common.off'), value: 2 },
      ],
    },
  },
];
