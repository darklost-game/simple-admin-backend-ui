import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';
import { updateAgentToken } from '@/api/agent/token';
import { Switch } from 'ant-design-vue';
import { h } from 'vue';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('agent.token.uid'),
    dataIndex: 'uid',
    width: 100,
  },
  {
    title: t('agent.token.token'),
    dataIndex: 'token',
    width: 100,
  },
  {
    title: t('agent.token.source'),
    dataIndex: 'source',
    width: 100,
  },
  {
    title: t('agent.token.username'),
    dataIndex: 'username',
    width: 100,
  },
  {
    title: t('agent.token.expiredAt'),
    dataIndex: 'expiredAt',
    width: 100,
  },
  {
    title: t('common.status'),
    dataIndex: 'status',
    width: 50,
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
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 2;
          updateAgentToken({ id: record.id, status: newStatus })
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
    width: 70,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: t('agent.token.username'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: t('agent.user.nickname'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'email',
    label: t('agent.user.email'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'uid',
    label: t('agent.token.uid'),
    component: 'InputNumber',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'uid',
    label: t('agent.token.uid'),
    component: 'Input',
    required: true,
  },
  {
    field: 'token',
    label: t('agent.token.token'),
    component: 'Input',
    required: true,
  },
  {
    field: 'source',
    label: t('agent.token.source'),
    component: 'Input',
    required: true,
  },
  {
    field: 'username',
    label: t('agent.token.username'),
    component: 'Input',
    required: true,
  },
  {
    field: 'expiredAt',
    label: t('agent.token.expiredAt'),
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'status',
    label: t('agent.token.status'),
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
