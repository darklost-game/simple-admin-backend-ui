import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';
import { updateAgentUser,getAgentUserList } from '@/api/agent/user';
import { Switch,Tag } from 'ant-design-vue';
import { h } from 'vue';
import { DefaultOptionType } from 'ant-design-vue/lib/select';
import { isString,isNumber,isNil } from '@/utils/is';
import { uploadApi } from '@/api/fms/cloudFile';

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
      if (isString(record.totpSecret)&&record.totpSecret.length>0) {
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
        ()=>totpSecretText,
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
          // const { createMessage } = useMessage();
          // if (record.id == 1) {
          //   createMessage.warn(t('sys.role.adminStatusChangeForbidden'));
          //   return;
          // }

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
  {
    field: 'lv',
    label: t('agent.user.lv'),
    component: 'DictionarySelect',
    // defaultValue: 0,
    componentProps: {
      dictionaryName: 'agentLv',
      onOpitions: (options?: DefaultOptionType[]) => { // Add type annotation to options parameter
    
        options?.map((item) => {
          item.value = Number(item.value);
         return item;
        });
        return options;
      }
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
  //   field: 'roleIds',
  //   label: t('agent.user.roleIds'),
  //   component: 'Input',
  //   colProps: { span: 8 },
  // },
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
  return lv === 1;
};
interface ParentUuidParams { 
  page: number;
  pageSize: number;
  lv?: number;

}
const parentUuidParams:ParentUuidParams = {
  page: 1,
  pageSize: 1000,
  lv:undefined,
};
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
    componentProps: {
      // api: getRoleList,
      params: {
        page: 1,
        pageSize: 100,
      },
      resultField: 'data.data',
      labelField: 'trans',
      valueField: 'id',
    },
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
  // {
  //   field: 'departmentId',
  //   label: t('agent.user.departmentId'),
  //   component: 'InputNumber',
  //   required: true,
  // },
  // {
  //   field: 'positionIds',
  //   label: t('agent.user.positionIds'),
  //   component: 'Input',
  //   required: true,
  // },
  // {
  //   field: 'totpSecret',
  //   label: t('agent.user.totpSecret'),
  //   component: 'Input',
  //   required: true,
  // },
  {
    field: 'lv',
    label: t('agent.user.lv'),
    component: 'DictionarySelect',
    // defaultValue: 0,
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      return {
        dictionaryName: 'agentLv',
        onOpitions: (options?: DefaultOptionType[]) => { // Add type annotation to options parameter
    
          options?.map((item) => {
            item.value = Number(item.value);
            return item;
          });
          return options;
        },
        onChange: (value,opitions) => {
          if (isNumber(value) && value > 1) {
            //查询上级代理
            parentUuidParams.lv = value - 1;
           
          } else { 
            parentUuidParams.lv = undefined;
          }
          
        },
      }
    },
    colProps: { span: 8 },
    required: true,
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
      }
    },
   
    required: true,
    ifShow: ({ values }) => !isLv1orNil(values.lv),
  },
  // {
  //   field: 'lv1Uuid',
  //   label: t('agent.user.lv1Uuid'),
  //   component: 'Input',
  //   required: true,
  // },
  // {
  //   field: 'lv2Uuid',
  //   label: t('agent.user.lv2Uuid'),
  //   component: 'Input',
  //   required: true,
  // },
  // {
  //   field: 'lv3Uuid',
  //   label: t('agent.user.lv3Uuid'),
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
