<template>
  <div>
    <div class="flex flex-wrap justify-between items-center mb-4">
      <Breadcrumb />

      <div
        class="md:flex md:space-x-4 md:justify-end items-center"
        :class="width < 768 ? 'space-x-rb' : ''"
      >
        <Button
          icon="heroicons:list-bullet"
          text="List view"
          :btnClass="`${
            fillter === 'list'
              ? 'bg-slate-900 dark:bg-slate-700  text-white'
              : ' bg-white dark:bg-slate-800 dark:text-slate-300'
          }   h-min text-sm font-normal`"
          iconClass=" text-lg"
          @click="fillter = 'list'"
          :isLoading="isSkeletion2"
          :isDisabled="isSkeletion"
        />
        <Button
          icon="heroicons-outline:view-grid"
          text="Grid view"
          :btnClass="`${
            fillter === 'grid'
              ? 'bg-slate-900 dark:bg-slate-700 text-white'
              : ' bg-white dark:bg-slate-800 dark:text-slate-300'
          }   h-min text-sm font-normal`"
          iconClass=" text-lg"
          @click="fillter = 'grid'"
          :isLoading="isSkeletion"
          :isDisabled="isSkeletion2"
        />
        <Modal
          title="New Tool"
          label="➕ Add Tool"
          labelClass="btn-dark dark:bg-green-800  h-min text-sm font-normal"
          ref="modal2"
          centered sizeClass="max-w-5xl"
        >
          <form class="space-y-4">
            <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
              <Textinput
                label="Serial Number"
                type="text"
                v-model="tool.SerialNumber"
                placeholder="Enter Serial Number"
                name="serial_number"
              />
              <VueSelect label="Tool type"
                ><vSelect :options="tool_types.map(o => o.Description)" v-model="tool.ToolType"
              /></VueSelect>
              <VueSelect label="Section"
                ><vSelect :options="sections.map(o => o.Description)" v-model="tool.Section"
              /></VueSelect>
              <VueSelect label="Location"
                ><vSelect :options="locations.map(o => o.Description)" v-model="tool.Location"
              /></VueSelect>
              <Textinput
                label="Range"
                type="text"
                v-model="tool.Range"
                placeholder="Enter Range"
                name="range"
              />
              <Textinput
                label="Notification Timeline"
                type="number"
                v-model="tool.NotificationTimeline"
                placeholder="How many days before next callibration do you want to be notified?"
                name="timeline"
              />
              <FromGroup label="Last Calibration" name="d1">
                <flat-pickr
                  v-model="tool.LastCallibration"
                  class="form-control"
                  id="d1"
                  placeholder="yyyy, dd M"
                />
              </FromGroup>
              <FromGroup label="Next Calibration" name="d1">
                <flat-pickr
                  v-model="tool.NextCallibration"
                  class="form-control"
                  id="d1"
                  placeholder="yyyy, dd M"
                />
              </FromGroup>
            </div>
          </form>
          <template v-slot:footer>
            <Button
              text="Submit"
              btnClass="btn-dark "
              @click="handleNew(tool); $refs.modal2.closeModal()"
            />
          </template>
        </Modal>
      </div>
    </div>
    <GridSkletion :count="tools.length" v-if="isSkeletion" />
    <TableSkeltion :count="tools.length" v-if="isSkeletion2" />
    <Grid v-if="fillter === 'grid' && !isSkeletion" />
    <List v-if="fillter === 'list' && !isSkeletion2" />

    <ToolAddmodal />
    <updateModal />
  </div>
</template>

<script setup>
import Breadcrumb from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import GridSkletion from "@/components/Skeleton/Project-grid";
import TableSkeltion from "@/components/Skeleton/Table";
import Modal from '@/components/Modal/Modal';
import Textinput from "@/components/Textinput";
import VueSelect from "@/components/Select/VueSelect";
import FromGroup from "@/components/FromGroup";
import vSelect from "vue-select";
import { useToast } from "vue-toastification";
import { computed, ref, watch, onMounted, defineEmits } from "vue";
import ToolAddmodal from "./AddTool";
import updateModal from "./EditTool";
import List from "./Tool-list";
import Grid from "./Tools-grid";
import { useStore } from "vuex";
import { useEmitter } from "@/mitt";

const {emitter} = useEmitter();
const store = useStore();

let fillter = ref("grid");
const openTool = () => {
  store.dispatch("openTool");
};

let tool = {};

const width = ref(0);
const handleResize = () => {
  width.value = window.innerWidth;
};

const handleEmit = () => {
  fillter.value = "list";
  setTimeout(() => {
    emitter.emit('search')
  }, 500);
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();

  emitter.on('notification', () => {
    handleEmit();
  })
});

const tools = computed(() => store.getters.allTools);
const sections = computed(() => store.getters.allSections);
const tool_types = computed(() => store.getters.allToolTypes);
const locations = computed(() => store.getters.allLocations);

const isSkeletion = ref(true);
const isSkeletion2 = ref(null);
setTimeout(() => {
  isSkeletion.value = false;
  isSkeletion2.value = false;
}, 1000);

const toast = useToast();
const handleNew = (new_tool) => {
  new_tool.SectionID = store.getters.allSections.filter(s => s.Description == new_tool.Section).map(s => s.SectionID)[0]
  new_tool.ToolTypeID = store.getters.allToolTypes.filter(s => s.Description == new_tool.ToolType).map(s => s.ToolTypeID)[0]
  new_tool.LocationID = store.getters.allLocations.filter(s => s.Description == new_tool.Location).map(s => s.LocationID)[0]
  new_tool.Status = new Date(new_tool.NextCallibration) > new Date() ? 'Callibrated' : 'Due'
  store.dispatch("createTool", new_tool)
  .then(data =>{
    // use vue-toast-notification app use
    toast.success(data.data.message, {
        timeout: 2000,
      });          
  },
  error => {
    toast.error((error.response && error.response.data) ||
          error.data.message ||
          error.toString(), {
        timeout: 2000,
      });   
  })
}

// watch fillter with switch case
watch(fillter, () => {
  switch (fillter.value) {
    case "grid":
      fillter.value = "grid";
      isSkeletion.value = true;
      setTimeout(() => {
        isSkeletion.value = false;
      }, 1000);

      break;
    case "list":
      fillter.value = "list";
      isSkeletion2.value = true;
      setTimeout(() => {
        isSkeletion2.value = false;
      }, 1000);
      break;
    default:
      fillter.value = "grid";
      break;
  }
});
</script>
<style lang=""></style>
