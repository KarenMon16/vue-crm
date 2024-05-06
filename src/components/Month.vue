<template>
  <DayPilotMonth id="dp" :config="config" ref="monthRef" />
</template>

<script setup>
import {DayPilot, DayPilotMonth} from '@daypilot/daypilot-lite-vue';
import { ref, reactive, onMounted } from 'vue';

import 'bootstrap/dist/css/bootstrap.min.css';
const config = reactive({
  locale: "en-us",
  timeRangeSelectedHandling: "Enabled",
  onTimeRangeSelected: async (args) => {
    const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
    const dp = args.control;
    dp.clearSelection();
    if (modal.canceled) { return; }
    dp.events.add({
      start: args.start,
      end: args.end,
      id: DayPilot.guid(),
      text: modal.result
    });
  },
  eventDeleteHandling: "Disabled",
  eventMoveHandling: "Update",
  onEventMoved: (args) => {
    console.log("Event moved: " + args.e.text());
  },
  eventResizeHandling: "Update",
  onEventResized: (args) => {
    console.log("Event resized: " + args.e.text());
  },
  eventClickHandling: "Disabled",
});
const monthRef = ref(null);

const loadEvents = () => {
  const events = [
    {
      id: 1,
      start: DayPilot.Date.today(),
      end: DayPilot.Date.today().addDays(1),
      text: "Event 1"
    }
  ];
  config.events = events;
};

onMounted(() => {
  loadEvents();
});
</script>
