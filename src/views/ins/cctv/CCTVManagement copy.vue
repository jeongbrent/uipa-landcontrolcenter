<template>
    <v-sheet class="pa-4 ma-4 rounded-lg ins-cctv-container d-flex flex-column">
      <v-tabs v-model="tab" color="#5789FE">
        <v-tab value="monitoring">실시간 모니터링</v-tab>
        <v-tab value="history">과거 영상 재생</v-tab>
      </v-tabs>

      <v-window v-model="tab" class="ins-cctv-tab-container d-flex flex-column py-2">
        <!-- CII Monitoring -->
        <v-window-item value="monitoring">
          <CCTVMonitoring />
        </v-window-item>

        <!-- Sensor -->
        <v-window-item value="history">
          <CCTVHistory />
        </v-window-item>
      </v-window>
    </v-sheet>
</template>

<script setup>
import { ref } from 'vue'

import CCTVMonitoring from '@/views/ins/cctv/CCTVMonitoring.vue'
import CCTVHistory from '@/views/ins/cctv/CCTVHistory.vue';

const tab = ref(null)
</script>

<style scoped>
.ins-cctv-container {
  height: calc(100vh - 65px - 32px);
}

.ins-cctv-tab-container{
  height: calc(100% - 48px);
}

.v-window.ins-cctv-tab-container .v-window__container{
  flex : 1 1 auto;
}

.ins-cctv-tab-container .v-window-item{
  display: flex;
  flex: 1 1 auto;
  height: calc(100%);
}

@media screen and (max-height : 800px) {
  .ins-cctv-container {
    overflow: auto;
    height: 100vh;
  }
}


</style>
