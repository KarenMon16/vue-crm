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
  eventDeleteHandling: "Enabled",
  eventMoveHandling: "Update",
  onEventMoved: (args) => {
    console.log("Event moved: " + args.e.text());
  },
  eventResizeHandling: "Update",
  onEventResized: (args) => {
    console.log("Event resized: " + args.e.text());
  },
  eventClickHandling: "Enabled",
});
const monthRef = ref(null);
onMounted(() => {
  loadEvents();
});
const loadEvents = async () => {
  try {
    // Make HTTP GET request to fetch events from backend
    const response = await fetch('http://localhost:8080/appointments/all?id=1');
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    // Parse response JSON
    const events = await response.json();
    // Update events in the calendar
    config.events = events.map(event => ({
      id: event.id,
      start: new DayPilot.Date(event.visit_date),
      end: new DayPilot.Date(event.visit_date),
      text: event.comment
    }));
  } catch (error) {
    console.error('Error loading events:', error);
  }
};
</script>
