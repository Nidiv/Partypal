<template>
  <div v-if="chartData">
    <Doughnut
      :data="chartData"
      :options="{ responsive: true, maintainAspectRatio: false }"
    />
  </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Doughnut } from "vue-chartjs";
defineProps(["chartData"]);
</script>
