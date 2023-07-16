<template>
  <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
    <Card bodyClass="p-6" v-for="(item, i) in tools" :key="i">
      <!-- header -->
      <header class="flex justify-between items-end">
        <div class="flex space-x-4 items-center">
          <div class="flex-none">
            <div
              class="h-10 w-10 rounded-md text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal capitalize"
            >
              {{ item.SerialNumber.charAt(0) + item.SerialNumber.charAt(1) }}
            </div>
          </div>
          <div class="font-medium text-base leading-6">
            <div
              class="dark:text-slate-200 text-slate-900 max-w-[160px] truncate"
            >
              {{ item.SerialNumber }}
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
      <div class="text-slate-600 dark:text-slate-400 text-sm pt-4">
        <b>{{ tool_types.filter(s => s.ToolTypeID == item.ToolTypeID).map(s => s.Description)[0] }}</b>
      </div>
      <div class="text-slate-600 dark:text-slate-400 text-sm pt-4 pb-3">
        <b>Section: </b> {{ sections.filter(s => s.SectionID == item.SectionID).map(s => s.Description)[0] }} <br/>
        <b>Location: </b> {{ locations.filter(s => s.LocationID == item.LocationID).map(s => s.Description)[0] }} <br/>
      </div>
      <!--  date -->
      <div class="flex space-x-4">
        <!-- start date -->
        <div>
          <span class="block date-label">Last Callibration</span>
          <span class="block date-text">{{ item.LastCallibration.substring(0, 10) }}</span>
        </div>
        <!-- end date -->
        <div>
          <span class="block date-label">Next Callibration</span>
          <span class="block date-text">{{ item.NextCallibration.substring(0, 10) }}</span>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-3">
        <div
          class="text-slate-400 dark:text-slate-400 text-sm font-normal"
        >
          Status:
        </div>
        <div class="text-right">
          <span
            v-if="item.Status == 'Due'"
            class="inline-block text-center space-x-1 bg-danger-500 bg-opacity-[0.16] min-w-[110px] text-danger-500 text-xs font-normal px-2 py-1 rounded-full"
          >
            {{ item.Status}}
          </span>
          <span
            v-else
            class="inline-block text-center space-x-1 bg-success-500 bg-opacity-[0.16] min-w-[110px] text-success-500 text-xs font-normal px-2 py-1 rounded-full"
          >
            {{ item.Status}}
          </span>
        </div>
      </div>
    </Card>
    <Modal
      title="Edit Tool"
      label=""
      labelClass="btn-small"
      ref="modal2"
      centered sizeClass="max-w-5xl"
    >
      <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
        <Textinput
          label="Serial Number"
          type="text"
          v-model="currentTool.SerialNumber"
          placeholder="Enter Serial Number"
          name="serial_number"
          :isReadonly="view"
        />
        <VueSelect v-if="!view" label="Tool type"
          ><vSelect :options="tool_types.map(o => o.Description)" v-model="currentTool.ToolType"
        /></VueSelect>
        <Textinput
          v-else
          label="Tool type"
          type="text"
          v-model="currentTool.ToolType"
          name="tool_type"
          isReadonly="true"
        />
        <VueSelect v-if="!view" label="Section"
          ><vSelect :options="sections.map(o => o.Description)" v-model="currentTool.Section"
        /></VueSelect>
        <Textinput
          v-else
          label="Section"
          type="text"
          v-model="currentTool.Section"
          name="section"
          isReadonly="true"
        />
        <VueSelect v-if="!view" label="Location"
          ><vSelect :options="locations.map(o => o.Description)" v-model="currentTool.Location"
        /></VueSelect>
        <Textinput
          v-else
          label="Location"
          type="text"
          v-model="currentTool.Location"
          name="location"
          isReadonly="true"
        />
        <Textinput
          label="Range"
          type="text"
          v-model="currentTool.Range"
          placeholder="Enter Range"
          name="range"
          :isReadonly="view"
        />
        <Textinput
          label="Notification Timeline"
          type="number"
          v-model="currentTool.NotificationTimeline"
          placeholder="How many days before next callibration do you want to be notified?"
          name="timeline"
          :isReadonly="view"
        />
        <FromGroup v-if="!view" label="Last Callibration" name="d1">
          <flat-pickr
            v-model="currentTool.LastCallibration"
            class="form-control"
            id="d1"
            placeholder="yyyy, dd M"
          />
        </FromGroup>
        <Textinput
          v-else
          label="Last Callibration"
          :modelValue="currentTool.LastCallibration.substring(0, 10)"
          name="last_cal"
          isReadonly="true"
        />
        <FromGroup v-if="!view" label="Next Callibration" name="d1">
          <flat-pickr
            v-model="currentTool.NextCallibration"
            class="form-control"
            id="d1"
            placeholder="yyyy, dd M"
          />
        </FromGroup>
        <Textinput
          v-else
          label="Next Callibration"
          :modelValue="currentTool.NextCallibration.substring(0, 10)"
          name="next_cal"
          isReadonly="true"
        />
      </div>

      <template v-if="!view" v-slot:footer>
        <Button
          text="Submit"
          btnClass="btn-dark "
          @click="updateTool()"
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

const tools = computed(() => store.getters.allTools);
const sections = computed(() => store.getters.allSections);
const tool_types = computed(() => store.getters.allToolTypes);
const locations = computed(() => store.getters.allLocations);

let view = ref(false);
let currentTool = ref({});
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
      data.ToolType = store.getters.allToolTypes.filter(s => s.ToolTypeID == data.ToolTypeID).map(s => s.Description)[0]
      data.Section = store.getters.allSections.filter(s => s.SectionID == data.SectionID).map(s => s.Description)[0]
      data.Location = store.getters.allLocations.filter(s => s.LocationID == data.LocationID).map(s => s.Description)[0]
      view.value = true;
      currentTool.value = data;
      modal2.value.openModal();
    },
  },
  {
    name: 'Edit',
    icon: 'heroicons-outline:pencil-alt',
    doit: (data) => {
      data.ToolType = store.getters.allToolTypes.filter(s => s.ToolTypeID == data.ToolTypeID).map(s => s.Description)[0]
      data.Section = store.getters.allSections.filter(s => s.SectionID == data.SectionID).map(s => s.Description)[0]
      data.Location = store.getters.allLocations.filter(s => s.LocationID == data.LocationID).map(s => s.Description)[0]
      view.value = false;
      currentTool.value = data;
      modal2.value.openModal();
    },
  },
  {
    name: 'Delete',
    icon: 'heroicons-outline:trash',
    doit: (data) => {
      const toast = useToast();
      store.dispatch('deleteTool', data)
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

const updateTool = () => {
  const toast = useToast();
  currentTool.value.SectionID = store.getters.allSections.filter(s => s.Description == currentTool.value.Section).map(s => s.SectionID)[0]
  currentTool.value.ToolTypeID = store.getters.allToolTypes.filter(s => s.Description == currentTool.value.ToolType).map(s => s.ToolTypeID)[0]
  currentTool.value.LocationID = store.getters.allLocations.filter(s => s.Description == currentTool.value.Location).map(s => s.LocationID)[0]
  store.dispatch('updateTool', currentTool.value)
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
