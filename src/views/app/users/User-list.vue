<template>
  <div>
    <Card noborder>
      <Modal
        title="Edit User"
        label=""
        labelClass="btn-small"
        ref="modal2"
        centered sizeClass="max-w-5xl"
      >
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <Textinput
            label="Firstname"
            type="text"
            v-model="currentUser.firstname"
            placeholder="Enter First Name"
            name="firstname"
            :isReadonly="view"
          />
          <Textinput
            label="Lastname"
            type="text"
            v-model="currentUser.lastname"
            placeholder="Enter Last Name"
            name="lastname"
            :isReadonly="view"
          />
          <Textinput
            label="Username"
            type="text"
            v-model="currentUser.username"
            placeholder="Enter Username"
            name="username"
            :isReadonly="view"
          />
          <Textinput
            label="Email"
            type="text"
            v-model="currentUser.email"
            placeholder="Enter Email"
            name="email"
            :isReadonly="view"
          />
          <Textinput
            label="Phone number"
            type="text"
            v-model="currentUser.phone"
            placeholder="Enter Phone Number"
            name="phone"
            :isReadonly="view"
          />
          <Textinput
            label="Password"
            type="password"
            v-model="currentUser.newpassword"
            placeholder="Enter Password"
            name="password"
            :isReadonly="view"
          />
          <VueSelect v-if="!view" label="Section"
            ><vSelect :options="sections.map(o => o.Description)" v-model="currentUser.Section"
          /></VueSelect>
          <Textinput
            v-else
            label="Section"
            type="text"
            v-model="currentUser.Section"
            name="section"
            isReadonly="true"
          />
          <VueSelect v-if="!view" label="Roles"
            ><vSelect :options="['Supervisor', 'Viewer']" v-model="currentUser.roles" multiple
          /></VueSelect>
          <Textinput
            v-else
            label="Roles"
            type="text"
            :modelValue="currentUser.roles.map(r => r.name)"
            name="roles"
            isReadonly="true"
          />
        </div>

        <template v-if="!view" v-slot:footer>
          <Button
            text="Submit"
            btnClass="btn-dark "
            @click="updateUser()"
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

      <div
        class="md:flex pb-6 md:space-y-0 space-y-3 justify-between items-center"
      >
        <h6>Users List</h6>
        <InputGroup
          v-model="searchTerm"
          placeholder="Search"
          type="text"
          prependIcon="heroicons-outline:search"
          merged
        />
      </div>
      <vue-good-table
        class="-mx-6"
        :columns="columns"
        styleClass=" vgt-table  table-head   v-middle striped lesspadding2 listview"
        :rows="this.$store.state.user.users"
        :pagination-options="{
          enabled: true,
          perPage: perpage,
        }"
        :sort-options="{
          enabled: false,
        }"
        :search-options="{
          enabled: true,
          externalQuery: searchTerm,
        }"
      >
        <template v-slot:table-row="props">
          <span v-if="props.column.field == 'firstname'">
            <div class="flex space-x-3 items-center text-left">
              <div class="flex-none">
                <div
                  class="h-10 w-10 rounded-full text-sm bg-[#E0EAFF] dark:bg-slate-700 flex flex-col items-center justify-center font-medium -tracking-[1px]"
                >
                  {{
                    props.row.firstname.charAt(0) +
                    props.row.firstname.charAt(props.row.firstname.length - 1)
                  }}
                </div>
              </div>
              <div
                class="flex-1 font-medium text-sm leading-4 whitespace-nowrap"
              >
                {{ props.row.firstname }} {{ props.row.lastname }}
              </div>
            </div>
          </span>
          <span
            v-if="props.column.field == 'email'"
            class="text-slate-500 dark:text-slate-400 block min-w-[108px]"
          >
            {{ props.row.email }}
          </span>
          <span
            v-if="props.column.field == 'phone'"
            class="text-slate-500 dark:text-slate-400 block min-w-[108px]"
          >
            {{ props.row.phone }}
          </span>
          <span
            v-if="props.column.field == 'SectionID'"
            class="text-slate-500 dark:text-slate-400 block min-w-[108px]"
          >
            {{ allSections.filter(t => t.SectionID == props.row.SectionID).map(t => t.Code)[0] }}
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
              :total="$store.state.user.users.length"
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
import VueSelect from "@/components/Select/VueSelect";
import FromGroup from "@/components/FromGroup";
import InputGroup from "@/components/InputGroup";
import vSelect from "vue-select";
import { useToast } from "vue-toastification";
import { MenuItem } from '@headlessui/vue';
import { advancedTable } from '../../../constant/basic-tablle-data';
import { mapGetters } from 'vuex';

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
    Button,
    VueSelect,
    FromGroup,
    vSelect,
    InputGroup
  },

  data() {
    return {
      advancedTable,
      current: 1,
      perpage: 10,
      pageRange: 10,
      view: false,
      currentUser: {},
      searchTerm: "",
      actions: [
        {
          name: 'view',
          icon: 'heroicons:eye',
          doit: (data) => {
            data.Section = this.allSections.filter(s => s.SectionID == data.SectionID).map(s => s.Description)[0]
            this.view = true;
            this.currentUser = data;
            this.$refs.modal2.openModal();
          },
        },
        {
          name: 'edit',
          icon: 'heroicons:pencil-square',
          doit: (data) => {
            data.Section = this.allSections.filter(s => s.SectionID == data.SectionID).map(s => s.Description)[0]
            this.view = false;
            this.currentUser = data;
            this.$refs.modal2.openModal();
          },
        },
        {
          name: 'delete',
          icon: 'heroicons-outline:trash',
          doit: (data) => {
            const toast = useToast();
            this.$store.dispatch('deleteUser', data)
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
          label: 'Name',
          field: 'firstname',
        },

        {
          label: 'Email',
          field: 'email',
        },

        {
          label: 'Phone',
          field: 'phone',
        },
        {
          label: 'Section',
          field: 'SectionID',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
    };
  },

  computed: {
    ...mapGetters([
      "allSections",
      "activeData"
    ])
  },

  methods: {
    updateUser(){
      const toast = useToast();
      this.currentUser.SectionID = this.allSections.filter(s => s.Description == this.currentUser.Section).map(s => s.SectionID)[0]
      this.$store.dispatch('updateUser', this.currentUser)
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
  },

  mounted(){
    this.$emitter.on('search', () => {
      this.searchTerm = this.activeData.searchTerm
    })
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
