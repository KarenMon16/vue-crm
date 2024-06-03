<template>
  <DayPilotMonth id="dp" :config="config" ref="monthRef" />
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { DayPilot, DayPilotMonth } from '@daypilot/daypilot-lite-vue';
import 'bootstrap/dist/css/bootstrap.min.css';

const props = defineProps({
  selectedSellerId: {
    type: [String, Number],
    required: true,
  },
});

const config = reactive({
  locale: "en-us",
  timeRangeSelectedHandling: "Enabled",
  onTimeRangeSelected: async (args) => {
    const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
    const dp = args.control;
    dp.clearSelection();
    if (modal.canceled) {
      return;
    }
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

const loadEvents = async () => {
  try {
    // Make HTTP GET request to fetch events from backend using selectedSellerId
    const response = await fetch(`http://localhost:8080/appointments/all?id=${props.selectedSellerId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    // Parse response JSON
    const events = await response.json();
    // Update events in the calendar
    config.events = events.map(event => {
      const start = new DayPilot.Date(event.visit_date);
      const hour = start.toString("HH:mm");
      const hourValue = parseInt(start.toString("HH"), 10);
      const backColor = hourValue < 12 ? "#f5e8cb" : "#cbe6f5";
      return {
        id: event.id,
        start: start,
        end: start, // assuming event is for a specific time and not a range
        text: hour,
        backColor: backColor
      };
    });
  } catch (error) {
    console.error('Error loading events:', error);
  }
};

// Watch for changes in selectedSellerId and reload events
watch(() => props.selectedSellerId, () => {
  loadEvents();
});

// Load events initially
loadEvents();
</script>
