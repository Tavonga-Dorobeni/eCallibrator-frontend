<template>
  <Dropdown classMenuItems="md:w-[300px] top-[58px]" classItem="px-4 py-2">
    <span
      class="relative lg:h-[32px] lg:w-[32px] lg:bg-gray-500-f7 mr-6 last:mr-0 text-slate-900 lg:dark:bg-slate-900 dark:text-white cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center"
      ><Icon icon="heroicons-outline:bell" />
      <span
        v-if="allTools.filter(t => new Date(t.NextCallibration) < new Date()).length > 0"
        class="absolute lg:right-0 lg:top-0 -top-2 -right-2 h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center justify-center rounded-full text-white z-[99]"
        >{{ allTools.filter(t => new Date(t.NextCallibration) < new Date()).length }}</span
      >
    </span>
    <template v-slot:menus>
      <div
        class="flex justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-600"
      >
        <div
          class="text-sm text-slate-800 dark:text-slate-200 font-medium leading-6"
        >
          Notifications
        </div>
        <div class="text-slate-800 dark:text-slate-200 text-xs md:text-right">
          <router-link :to="{ name: 'notifications' }" class="underline"
            >View all</router-link
          >
        </div>
      </div>
      <div class="divide-y divide-slate-100 dark:divide-slate-800">
        <MenuItem
          v-slot="{ active }"
          v-for="(item, i) in allTools.filter(t => new Date(t.NextCallibration) < new Date()).slice(0, 3)"
          :key="i"
          @click="openNotification(item)"
        >
          <div
            :class="`${
              active
                ? 'bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 text-slate-800'
                : 'text-slate-600 dark:text-slate-300'
            } block w-full px-4 py-2 text-sm  cursor-pointer`"
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
                  class="h-[10px] w-[10px] bg-danger-500 border border-white dark:border-slate-400 rounded-full inline-block"
                >
                </span>
              </div>
            </div>
          </div>
        </MenuItem>
      </div>
    </template>
  </Dropdown>
</template>
<script>
import Dropdown from "@/components/Dropdown";
import Icon from "@/components/Icon";
import { MenuItem } from "@headlessui/vue";
import { notifications } from "../../../constant/data";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Icon,
    Dropdown,
    MenuItem,
  },
  data() {
    return {
      notifications,
      redirect: false,
    };
  },

  computed:{
    ...mapGetters([
      "allTools",
      "allToolTypes"
    ]),

    currentRoute() {
      return this.$route.path;
    },
  },

  watch: {
    currentRoute: function(newValue) {
      if(newValue == "/app/tools" && this.redirect == true){
        setTimeout(() => {
          this.$emitter.emit('notification');
          this.redirect = false          
        }, 800);
      }
    },
  },

  methods:{
    // ...mapActions([
    //   "setActiveData"
    // ]),

    openNotification(item){
      let data = {
        searchTerm: item.SerialNumber || item.NextCallibration
      }
      console.log(data)
      // setActiveData(data);
      this.$store.commit('setActiveData', data)
      this.redirect = true
      this.$router.push('/app/tools').then(() => {
        this.$emitter.emit('notification');
      })
    }
  },
  mounted(){
    this.$emitter.on('openNotification', e => {
      let data = e.data;
      this.openNotification(data)
    })
  }
};
</script>
<style lang=""></style>
