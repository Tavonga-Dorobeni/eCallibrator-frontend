<template>
  <div>
    <Breadcrumb />
    <div class="grid grid-cols-12 gap-5 mb-5">
      <!-- <div class="2xl:col-span-3 lg:col-span-4 col-span-12">
        <div
          class="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] relative"
          :style="{
            backgroundImage:
              'url(' + require(`@/assets/images/all-img/widget-bg-1.png`) + ')',
          }"
        >
          <div class="max-w-[169px]">
            <div class="text-xl font-medium text-slate-900 mb-2">
              Upgrade your Dashcode
            </div>
            <p class="text-sm text-slate-800">Pro plan for better results</p>
          </div>
          <div
            class="absolute top-1/2 -translate-y-1/2 right-6 mt-2 h-12 w-12 bg-white text-slate-900 rounded-full text-xs font-medium flex flex-col items-center justify-center"
          >
            Now
          </div>
        </div>
      </div> -->
      <div class="2xl:col-span-9 lg:col-span-8 col-span-12">
        <Card bodyClass="p-4">
          <div class="grid md:grid-cols-3 col-span-1 gap-4">
            <div
              class="py-[18px] px-4 rounded-[6px]"
              v-for="(item, i) in statistics"
              :class="item.bg"
              :key="i"
            >
              <div class="flex items-center space-x-6">
                <div class="flex-none">
                  <apexchart
                    type="area"
                    height="48"
                    width="48"
                    :options="item.name.chartOptions"
                    :series="item.name.series"
                  />
                </div>
                <div class="flex-1">
                  <div
                    class="text-slate-800 dark:text-slate-300 text-sm mb-1 font-medium"
                  >
                    {{ item.title }}
                  </div>
                  <div
                    class="text-slate-900 dark:text-white text-lg font-medium"
                  >
                    {{ item.count }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-5">
      <div class="lg:col-span-8 col-span-12">
        <Card>
          <div class="legend-ring">
            <apexchart
              type="bar"
              height="400"
              :options="
                this.$store.state.isDark
                  ? columnCharthomeDark.chartOptions
                  : columnCharthome.chartOptions
              "
              :series="columnCharthome.series"
            />
          </div>
        </Card>
      </div>
      <div class="lg:col-span-4 col-span-12">
        <Card title="overview">
          <template #header>
            <DropEvent />
          </template>
          <apexchart
            type="radialBar"
            :height="window.width > 768 ? 350 : 250"
            :options="
              this.$store.state.isDark
                ? MultipleRadialbarsDark.chartOptions
                : MultipleRadialbars.chartOptions
            "
            :series="MultipleRadialbars.series"
          />
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
import Card from '@/components/Card';
import {
  gearradil,
  gearradilDark,
  MultipleRadialbars,
  MultipleRadialbarsDark,
} from '../../constant/appex-chart';
import CompanyTable from './Analytics-Component/CompanyTable';
import {
  columnCharthome,
  columnCharthomeDark,
  shapeLine1,
  shapeLine2,
  shapeLine3,
  mostSales,
} from './Analytics-Component/data';
import DropEvent from './Analytics-Component/DropEvent';
import Map from './Analytics-Component/Map';
import SelectMonth from './Analytics-Component/SelectMonth';
import Breadcrumb from './Analytics-Component/Breadcrumbs';
import window from '@/mixins/window';

export default {
  mixins: [window],
  components: {
    Card,
    CompanyTable,
    Map,
    DropEvent,
    SelectMonth,
    Breadcrumb,
  },
  data() {
    return {
      columnCharthome,
      columnCharthomeDark,
      MultipleRadialbars,
      MultipleRadialbarsDark,
      gearradil,
      gearradilDark,
      mostSales,
      fillterMap: 'usa',
      statistics: [
        {
          name: shapeLine1,
          title: 'ZB Bank Limited',
          count: '364',
          bg: 'bg-[#E5F9FF] dark:bg-slate-900	',
        },
        {
          name: shapeLine2,
          title: 'ZB Associated Services',
          count: '254',
          bg: 'bg-[#FFEDE5] dark:bg-slate-900	',
        },
        {
          name: shapeLine3,
          title: 'ZB Capital',
          count: '322',
          bg: 'bg-[#EAE5FF] dark:bg-slate-900	',
        },
      ],
      activity: [
        {
          id: 1,
          img: require('@/assets/images/users/user-1.jpg'),
        },
        {
          id: 2,
          img: require('@/assets/images/users/user-2.jpg'),
        },
        {
          id: 3,
          img: require('@/assets/images/users/user-3.jpg'),
        },
        {
          id: 4,
          img: require('@/assets/images/users/user-4.jpg'),
        },
        {
          id: 5,
          img: require('@/assets/images/users/user-5.jpg'),
        },
        {
          id: 6,
          img: require('@/assets/images/users/user-6.jpg'),
        },
        {
          id: 7,
          img: require('@/assets/images/users/user-1.jpg'),
        },
        {
          id: 6,
          img: require('@/assets/images/users/user-2.jpg'),
        },
        {
          id: 7,
          img: require('@/assets/images/users/user-2.jpg'),
        },
      ],
    };
  },
};
</script>
<style lang=""></style>
