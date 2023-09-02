<template>
  <div>
    <Card noborder>
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
            ><vSelect :options="allToolTypes.map(o => o.Description)" v-model="currentTool.ToolType"
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
            ><vSelect :options="allSections.map(o => o.Description)" v-model="currentTool.Section"
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
            ><vSelect :options="allLocations.map(o => o.Description)" v-model="currentTool.Location"
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
          <FromGroup v-if="!view" label="Last Calibration" name="d1">
            <flat-pickr
              v-model="currentTool.LastCallibration"
              class="form-control"
              id="d1"
              placeholder="yyyy, dd M"
            />
          </FromGroup>
          <Textinput
            v-else
            label="Last Calibration"
            :modelValue="currentTool.LastCallibration.substring(0, 10)"
            name="last_cal"
            isReadonly="true"
          />
          <FromGroup v-if="!view" label="Next Calibration" name="d1">
            <flat-pickr
              v-model="currentTool.NextCallibration"
              class="form-control"
              id="d1"
              placeholder="yyyy, dd M"
            />
          </FromGroup>
          <Textinput
            v-else
            label="Next Calibration"
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

      <div
        class="md:flex pb-6 md:space-y-0 space-y-3 justify-between items-center"
      >
        <h6>Tools List</h6>
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
        :rows="this.$store.state.tool.tools"
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
          <span v-if="props.column.field == 'SerialNumber'">
            <div class="flex space-x-3 items-center text-left">
              <div class="flex-none">
                <div
                  class="h-10 w-10 rounded-full text-sm bg-[#E0EAFF] dark:bg-slate-700 flex flex-col items-center justify-center font-medium -tracking-[1px]"
                >
                  {{
                    props.row.SerialNumber.charAt(0) +
                    props.row.SerialNumber.charAt(props.row.SerialNumber.length - 1)
                  }}
                </div>
              </div>
              <div
                class="flex-1 font-medium text-sm leading-4 whitespace-nowrap"
              >
                {{
                  props.row.SerialNumber.length > 20
                    ? props.row.SerialNumber.substring(0, 20) + '...'
                    : props.row.SerialNumber
                }}
              </div>
            </div>
          </span>
          <span
            v-if="props.column.field == 'ToolTypeID'"
            class="text-slate-500 dark:text-slate-400 block min-w-[108px]"
          >
            {{ allToolTypes.filter(t => t.ToolTypeID == props.row.ToolTypeID).map(t => t.Description)[0] }}
          </span>
          <span
            v-if="props.column.field == 'SectionID'"
            class="text-slate-500 dark:text-slate-400 block min-w-[108px]"
          >
            {{ allSections.filter(t => t.SectionID == props.row.SectionID).map(t => t.Description)[0] }}
          </span>
          <span
            v-if="props.column.field == 'NextCallibration'"
            class="text-slate-500 dark:text-slate-400 block min-w-[108px]"
          >
            {{ props.row.NextCallibration.substring(0, 10) }}
          </span>
          <span
            v-if="props.column.field == 'Status'"
            class="text-slate-500 dark:text-slate-400 block min-w-[108px]"
          >
            <span
              v-if="props.row.Status == 'Due'"
              class="inline-block text-center space-x-1 bg-danger-500 bg-opacity-[0.16] min-w-[110px] text-danger-500 text-xs font-normal px-2 py-1 rounded-full"
            >
              {{ props.row.Status}}
            </span>
            <span
              v-else
              class="inline-block text-center space-x-1 bg-success-500 bg-opacity-[0.16] min-w-[110px] text-success-500 text-xs font-normal px-2 py-1 rounded-full"
            >
              {{ props.row.Status}}
            </span>
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
              :total="$store.state.tool.tools.length"
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
      currentTool: {},
      searchTerm: "",
      actions: [
        {
          name: 'view',
          icon: 'heroicons:eye',
          doit: (data) => {
            data.ToolType = this.allToolTypes.filter(s => s.ToolTypeID == data.ToolTypeID).map(s => s.Description)[0]
            data.Section = this.allSections.filter(s => s.SectionID == data.SectionID).map(s => s.Description)[0]
            data.Location = this.allLocations.filter(s => s.LocationID == data.LocationID).map(s => s.Description)[0]
            this.view = true;
            this.currentTool = data;
            this.$refs.modal2.openModal();
          },
        },
        {
          name: 'edit',
          icon: 'heroicons:pencil-square',
          doit: (data) => {
            data.ToolType = this.allToolTypes.filter(s => s.ToolTypeID == data.ToolTypeID).map(s => s.Description)[0]
            data.Section = this.allSections.filter(s => s.SectionID == data.SectionID).map(s => s.Description)[0]
            data.Location = this.allLocations.filter(s => s.LocationID == data.LocationID).map(s => s.Description)[0]
            this.view = false;
            this.currentTool = data;
            this.$refs.modal2.openModal();
          },
        },
        {
          name: 'calibrate',
          icon: 'heroicons-outline:wrench',
          doit: (data) => {
            this.$store.commit('setActiveData', data);
            this.$router.push({ name: 'calibration' });
          },
        },
        {
          name: 'delete',
          icon: 'heroicons-outline:trash',
          doit: (data) => {
            const toast = useToast();
            this.$store.dispatch('deleteTool', data)
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
          label: 'Serial Number',
          field: 'SerialNumber',
        },

        {
          label: 'Name',
          field: 'ToolTypeID',
        },

        {
          label: 'Section',
          field: 'SectionID',
        },
        {
          label: 'Next Calibration',
          field: 'NextCallibration',
        },
        {
          label: 'Status',
          field: 'Status'
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
      "allToolTypes",
      "allLocations",
      "activeData"
    ])
  },

  methods: {
    updateTool(){
      const toast = useToast();
      this.currentTool.SectionID = this.allSections.filter(s => s.Description == this.currentTool.Section).map(s => s.SectionID)[0]
      this.currentTool.ToolTypeID = this.allToolTypes.filter(s => s.Description == this.currentTool.ToolType).map(s => s.ToolTypeID)[0]
      this.currentTool.LocationID = this.allLocations.filter(s => s.Description == this.currentTool.Location).map(s => s.LocationID)[0]
      this.$store.dispatch('updateTool', this.currentTool)
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
