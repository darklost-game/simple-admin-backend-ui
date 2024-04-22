<template>
  <div>
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <Button
          type="primary"
          danger
          preIcon="ant-design:delete-outlined"
          v-if="showDeleteButton"
          @click="handleBatchDelete"
        >
          {{ t('common.delete') }}
        </Button>
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">
          {{ t('agent.user.addUser') }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: t('common.edit'),
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'bx:log-out-circle',
                color: 'error',
                tooltip: t('sys.user.forceLoggingOut'),
                popConfirm: {
                  title: t('sys.user.forceLoggingOut') + '?',
                  placement: 'left',
                  confirm: handleLogout.bind(null, record),
                },
              },
              {
                icon: 'bx:reset',
                color: 'warning',
                tooltip: t('agent.user.totpSecretReset'),
                popConfirm: {
                  title: t('agent.user.totpSecretReset') + '?',
                  placement: 'left',
                  confirm: handleTotpReset.bind(null, record),
                },
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: t('common.delete'),
                popConfirm: {
                  title: t('common.deleteConfirm'),
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <UserDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { createVNode, defineComponent, ref } from 'vue';
  import { Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue/lib/icons';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { Button } from '@/components/Button';

  import { useDrawer } from '@/components/Drawer';
  import UserDrawer from './UserDrawer.vue';
  import { useI18n } from 'vue-i18n';

  import { columns, searchFormSchema } from './user.data';
  import { getAgentUserList, deleteAgentUser,updateAgentUser } from '@/api/agent/user';
  import { isString } from '@/utils/is';

  export default defineComponent({
    name: 'UserManagement',
    components: { BasicTable, UserDrawer, TableAction, Button },
    setup() {
      const { t } = useI18n();
      const selectedIds = ref<number[] | string[]>();
      const showDeleteButton = ref<boolean>(false);

      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: t('agent.user.userList'),
        api: getAgentUserList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        showSummary:true,
        clickToRowSelect: false,
        actionColumn: {
          width: 120,
          title: t('common.action'),
          dataIndex: 'action',
          fixed: 'right',
        },
        scroll: { x: 1500 },
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          onChange: (selectedRowKeys, _selectedRows) => {
            selectedIds.value = selectedRowKeys as string[];
            showDeleteButton.value = selectedRowKeys.length > 0;
          },
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        const result = await deleteAgentUser({ ids: [record.id] });
        if (result.code === 0) {
          await reload();
        }
      }

      async function handleBatchDelete() {
        Modal.confirm({
          title: t('common.deleteConfirm'),
          icon: createVNode(ExclamationCircleOutlined),
          async onOk() {
            const result = await deleteAgentUser({ ids: selectedIds.value as string[] });
            if (result.code === 0) {
              showDeleteButton.value = false;
              await reload();
            }
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

      async function handleSuccess() {
        await reload();
      }

      async function handleLogout(record: Recordable) {
        console.log('handleLogout', record);
        // const result = await logout(record.id);

        // if (result.code === 0) await reload();
      }

      async function handleTotpReset(record: Recordable) {
        console.log('handleTotpReset', record);
        if (isString(record.totpSecret) && record.totpSecret.length > 0) {
          const result = await updateAgentUser({ id: record.id, totpSecret: '' })
          if (result.code === 0) {
            await reload();
          }
        } else { 

          console.log('2fa not bind can not reset', record);
           // const { createMessage } = useMessage();
          // if (record.id == 1) {
          //   createMessage.warn(t('sys.role.adminStatusChangeForbidden'));
          //   return;
          // }
        }
        
        
      }

      return {
        t,
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleBatchDelete,
        handleLogout,
        handleTotpReset,
        showDeleteButton,
      };
    },
  });
</script>
