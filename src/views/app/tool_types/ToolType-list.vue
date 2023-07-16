<template>
  <div>
    <Card title="Tool Type List" noborder>
      <Modal
        title="Edit Tool Type"
        label=""
        labelClass="btn-small"
        ref="modal2"
        centered
      >
        <Textinput
          label="Code"
          type="text"
          v-model="currentTyp.Code"
          placeholder="Enter Code"
          name="code"
          :isReadonly="view"
        />
        <Textinput
          label="Description"
          type="text"
          v-model="currentTyp.Description"
          placeholder="Enter Description"
          name="description"
          :isReadonly="view"
        />

        <template v-if="!view" v-slot:footer>
          <Button
            text="Submit"
            btnClass="btn-dark "
            @click="updateTyp()"
          />
        </template>
        <template v-else v-slot:footer>
          <Button
            text="Close"
            btnClass="btn-dark "
            @click="$refs.modal2.closeModal()"
          />
        </template>
      </Modal>
      <vue-good-table
        class="-mx-6"
        :columns="columns"
        styleClass=" vgt-table  table-head   v-middle striped lesspadding2 listview"
        :rows="this.$store.state.tool_type.tool_types"
        :pagination-options="{
          enabled: true,
          perPage: perpage,
        }"
        :sort-options="{
          enabled: false,
        }"
      >
        <template v-slot:table-row="props">
          <span v-if="props.column.field == 'Code'">
            <div class="flex space-x-3 items-center text-left">
              <div class="flex-none">
                <div
                  class="h-10 w-10 rounded-full text-sm bg-[#E0EAFF] dark:bg-slate-700 flex flex-col items-center justify-center font-medium -tracking-[1px]"
                >
                  {{
                    props.row.Code.charAt(0) +
                    props.row.Code.charAt(props.row.Code.length - 1)
                  }}
                </div>
              </div>
              <div
                class="flex-1 font-medium text-sm leading-4 whitespace-nowrap"
              >
                {{
                  props.row.Code.length > 20
                    ? props.row.Code.substring(0, 20) + '...'
                    : props.row.Code
                }}
              </div>
            </div>
          </span>
          <span
            v-if="props.column.field == 'Description'"
            class="text-slate-500 dark:text-slate-400 block min-w-[108px]"
          >
            {{ props.row.Description }}
          </span>
          <span
            v-if="props.column.field == 'createdAt'"
            class="text-slate-500 dark:text-slate-400 block min-w-[108px]"
          >
            {{ props.row.createdAt.substring(0, 10) }}
          </span>
          <span
            v-if="props.column.field == 'updatedAt'"
            class="text-slate-500 dark:text-slate-400 block min-w-[108px]"
          >
            {{ props.row.updatedAt.substring(0, 10) }}
          </span>
          <div
            v-if="props.column.field == 'action'"
            class="action-btn text-end mr-3"
          >
            <Dropdown classMenuItems=" w-[140px]">
              <div class="text-xl">
                <Icon icon="heroicons-outline:dots-vertical" />
              </div>
              <template v-slot:menus>
                <MenuItem v-for="(item, i) in actions" :key="i">
                  <div
                    @click="item.doit(props.row)"
                    :class="`
                
                  ${
                    item.name === 'delete'
                      ? 'bg-danger-500 text-danger-500 bg-opacity-30  hover:bg-opacity-100 hover:text-white'
                      : 'hover:bg-slate-900 hover:text-white'
                  }
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center `"
                  >
                    <span class="text-base"><Icon :icon="item.icon" /></span>
                    <span>{{ item.name }}</span>
                  </div>
                </MenuItem>
              </template>
            </Dropdown>
          </div>
        </template>
        <template #pagination-bottom="props">
          <div class="py-4 px-3 justify-center flex">
            <Pagination
              :total="$store.state.tool_type.tool_types.length"
              :current="current"
              :per-page="perpage"
              :pageRange="pageRange"
              @page-changed="current = $event"
              :pageChanged="props.pageChanged"
              :perPageChanged="props.perPageChanged"
            />
          </div>
        </template>
      </vue-good-table>
    </Card>
  </div>
</template>
<script>
import Card from '@/components/Card';
import Dropdown from '@/components/Dropdown';
import Icon from '@/components/Icon';
import Pagination from '@/components/Pagination';
import ProgressBar from '@/components/ProgressBar';
import Modal from '@/components/Modal/Modal';
import Textinput from "@/components/Textinput";
import Button from "@/components/Button";
import { useToast } from "vue-toastification";
import { MenuItem } from '@headlessui/vue';
import { advancedTable } from '../../../constant/basic-tablle-data';
export default {
  components: {
    Pagination,
    Dropdown,
    Icon,
    MenuItem,
    Card,
    ProgressBar,
    Modal,
    Textinput,
    Button
  },

  data() {
    return {
      advancedTable,
      current: 1,
      perpage: 10,
      pageRange: 10,
      view: false,
      currentTyp: {},
      actions: [
        {
          name: 'view',
          icon: 'heroicons:eye',
          doit: (data) => {
            this.view = true;
            this.currentTyp = data;
            this.$refs.modal2.openModal();
          },
        },
        {
          name: 'edit',
          icon: 'heroicons:pencil-square',
          doit: (data) => {
            this.view = false;
            this.currentTyp = data;
            this.$refs.modal2.openModal();
          },
        },
        {
          name: 'delete',
          icon: 'heroicons-outline:trash',
          doit: (data) => {
            const toast = useToast();
            this.$store.dispatch('deleteToolType', data)
            .then(response => {
              toast.success(response.data.message, {
                timeout: 2000,
              });    
            },
            error => {
              toast.error((error.response && error.response.data) ||
                    error.message ||
                    error.toString(), {
                  timeout: 2000,
                });   
            })
          },
        },
      ],

      columns: [
        {
          label: 'Code',
          field: 'Code',
        },

        {
          label: 'Description',
          field: 'Description',
        },

        {
          label: 'Date Created',
          field: 'createdAt',
        },
        {
          label: 'Date Updated',
          field: 'updatedAt',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
    };
  },

  methods: {
    updateTyp(){
      const toast = useToast();
      this.$store.dispatch('updateToolType', this.currentTyp)
      .then(response => {
        this.$refs.modal2.closeModal();
        toast.success(response.data.message, {
          timeout: 2000,
        });    
      },
      error => {
        this.$refs.modal2.closeModal();
        toast.error((error.response && error.response.data) ||
              error.data.message ||
              error.toString(), {
            timeout: 2000,
          });   
      })
    }
  }
};
</script>
<style lang="scss">
.listview {
  th {
    @apply last:text-end;
  }
}
</style>
