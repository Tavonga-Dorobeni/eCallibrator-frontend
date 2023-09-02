<template>
  <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
    <Card bodyClass="p-6" v-for="(item, i) in users" :key="i">
      <!-- header -->
      <header class="flex justify-between items-end">
        <div class="flex space-x-4 items-center">
          <div class="flex-none">
            <div
              class="h-10 w-10 rounded-md text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal capitalize"
            >
              {{ item.firstname.charAt(0) + item.firstname.charAt(1) }}
            </div>
          </div>
          <div class="font-medium text-base leading-6">
            <div
              class="dark:text-slate-200 text-slate-900 max-w-[160px] truncate"
            >
              {{ item.firstname }} {{ item.lastname }}
            </div>
          </div>
        </div>
        <div>
          <Dropdown classMenuItems=" w-[130px]">
            <span
              class="text-lg inline-flex flex-col items-center justify-center h-8 w-8 rounded-full bg-gray-500-f7 dark:bg-slate-900 dark:text-slate-400"
              ><Icon icon="heroicons-outline:dots-vertical"
            /></span>
            <template v-slot:menus>
              <MenuItem v-for="(mneu, i) in actions" :key="i">
                <div
                  @click="mneu.doit(item)"
                  :class="`
                
                  ${'hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-white'}
                   w-full border-b border-b-gray-500 border-opacity-10   px-4 py-2 text-sm dark:text-slate-300  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center  capitalize `"
                >
                  <span class="text-base"><Icon :icon="mneu.icon" /></span>
                  <span>{{ mneu.name }}</span>
                </div>
              </MenuItem>
            </template>
          </Dropdown>
        </div>
      </header>
      <!-- description -->
      <div class="text-slate-600 dark:text-slate-400 text-sm pt-4 pb-3">
        <b>Email: </b> {{ item.email }} <br/>
        <b>Phone number: </b> {{ item.phone }} <br/>
        <b>Section: </b> {{ sections.filter(s => s.SectionID == item.SectionID).map(s => s.Description)[0] }} <br/>
        <span
          v-for="(item, i) in item.roles" :key="i"
          class="inline-block text-center space-x-1 bg-success-500 bg-opacity-[0.16] min-w-[110px] text-success-500 text-xs font-normal px-2 py-1 rounded-full my-3 mr-2"
        >
          {{ item.name}}
        </span>
      </div>
      <!--  date -->
      <div class="flex space-x-4">
        <!-- start date -->
        <div>
          <span class="block date-label">Date Created</span>
          <span class="block date-text">{{ item.createdAt.substring(0, 10) }}</span>
        </div>
        <!-- end date -->
        <div>
          <span class="block date-label">Date Updated</span>
          <span class="block date-text">{{ item.updatedAt.substring(0, 10) }}</span>
        </div>
      </div>
    </Card>
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
          v-model="currentUser.password"
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
          ><vSelect :options="['Supervisor', 'Viewer']" v-model="currentUser.user_roles" multiple
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
  </div>
</template>
<script setup>
import Card from '@/components/Card';
import Dropdown from '@/components/Dropdown';
import Icon from '@/components/Icon';
import Modal from '@/components/Modal/Modal';
import Textinput from "@/components/Textinput";
import Button from "@/components/Button";
import VueSelect from "@/components/Select/VueSelect";
import FromGroup from "@/components/FromGroup";
import vSelect from "vue-select";
import { useToast } from "vue-toastification";
import { MenuItem } from '@headlessui/vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter();

const users = computed(() => store.getters.allUsers);
const sections = computed(() => store.getters.allSections);

let view = ref(false);
let currentUser = ref({});
const modal2 = ref(null)

const totalDate = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffDays = endDate.getDate() - startDate.getDate();
  return diffDays;
};

const actions = ref([
  {
    name: 'view',
    icon: 'heroicons:eye',
    doit: (data) => {
      data.Section = store.getters.allSections.filter(s => s.SectionID == data.SectionID).map(s => s.Description)[0]
      view.value = true;
      currentUser.value = data;
      modal2.value.openModal();
    },
  },
  {
    name: 'Edit',
    icon: 'heroicons-outline:pencil-alt',
    doit: (data) => {
      data.Section = store.getters.allSections.filter(s => s.SectionID == data.SectionID).map(s => s.Description)[0]
      data.user_roles = data.roles.map(r => r.name)
      view.value = false;
      currentUser.value = data;
      modal2.value.openModal();
    },
  },
  {
    name: 'Delete',
    icon: 'heroicons-outline:trash',
    doit: (data) => {
      const toast = useToast();
      store.dispatch('deleteUser', data)
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
]);

const updateUser = () => {
  const toast = useToast();
  currentUser.value.SectionID = store.getters.allSections.filter(s => s.Description == currentUser.value.Section).map(s => s.SectionID)[0]
  store.dispatch('updateUser', currentUser.value)
  .then(response => {
    modal2.value.closeModal();
    toast.success(response.data.message, {
      timeout: 2000,
    });    
  },
  error => {
    modal2.value.closeModal();
    toast.error((error.response && error.response.data) ||
        error.data.message ||
        error.toString(), {
      timeout: 2000,
    });   
  })
}
</script>
<style lang="scss" scoped>
.date-label {
  @apply text-xs text-slate-400 dark:text-slate-400 mb-1;
}
.date-text {
  @apply text-xs text-slate-600 dark:text-slate-300 font-medium;
}
</style>
