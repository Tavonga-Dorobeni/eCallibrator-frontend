<template>
  <div>
    <Card bodyClass="px-6 ">
      <Menu as="div" class="-mx-6">
        <div
          class="flex justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-600"
        >
          <div
            class="text-sm text-slate-800 dark:text-slate-200 font-medium leading-6"
          >
            All Notifications
          </div>
        </div>
        <MenuItem
          v-slot="{ active }"
          v-for="(item, i) in allTools.filter(t => new Date(t.NextCallibration) < new Date())"
          :key="i"
          @click="openNotification(item)"
        >
          <div
            :class="`${
              active
                ? 'bg-slate-100 dark:bg-slate-600 dark:bg-opacity-70 text-slate-800'
                : 'text-slate-600 dark:text-slate-300'
            } block w-full px-4 py-2 text-sm mb-2 last:mb-0 cursor-pointer`"
          >
            <div class="flex text-left">
              <div class="flex-none mr-3">
                <div class="h-8 w-8 bg-white rounded-full">
                  <img
                    :src="require('@/assets/images/all-img/user.png')"
                    alt=""
                    :class="`${
                      active ? ' border-white' : ' border-transparent'
                    } block w-full h-full object-cover rounded-full border`"
                  />
                </div>
              </div>
              <div class="flex-1">
                <div
                  :class="`${
                    active
                      ? 'text-slate-600 dark:text-slate-300'
                      : ' text-slate-600 dark:text-slate-300'
                  } text-sm`"
                >
                  {{ item.SerialNumber }}
                </div>
                <div
                  :class="`${
                    active
                      ? 'text-slate-500 dark:text-slate-200'
                      : ' text-slate-600 dark:text-slate-300'
                  } text-xs leading-4`"
                >
                  {{ allToolTypes.filter(t => t.ToolTypeID == item.ToolTypeID).map(t => t.Description)[0] }} due for callibration.
                </div>
                <div class="text-slate-400 dark:text-slate-400 text-xs mt-1">
                  Callibration Date: {{ item.NextCallibration.substring(0, 10) }}
                </div>
              </div>
              <div class="flex-0" v-if="item.unread">
                <span
                  class="h-[10px] w-[10px] bg-danger-500 border border-white rounded-full inline-block"
                >
                </span>
              </div>
            </div>
          </div>
        </MenuItem>
      </Menu>
    </Card>
  </div>
</template>

<script>
import { MenuItem, Menu } from '@headlessui/vue';
import { notifications } from '../constant/data';
import Card from '@/components/Card';
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    MenuItem,
    Menu,
    Card,
  },
  data() {
    return {
      notifications,
      redirect: false
    };
  },
  computed:{
    ...mapGetters([
      "allTools",
      "allToolTypes"
    ]),
  },
  methods:{
    openNotification(item){
      this.$emitter.emit('openNotification', {data: item});
    }
  }
};
</script>
<style lang=""></style>
