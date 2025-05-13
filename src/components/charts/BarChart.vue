<template>
  <div v-if="chartData">
    <Bar
      :data="chartData"
      :options="{ responsive: true, maintainAspectRatio: false }"
    />
  </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Bar } from "vue-chartjs";
defineProps(["chartData"]);
</script>
