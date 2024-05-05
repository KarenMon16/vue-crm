<template>
  <DayPilotScheduler id="dp" :config="config" ref="scheduler" />
</template>

<script>
import {DayPilot, DayPilotScheduler} from 'daypilot-pro-vue'

export default {
  name: 'Scheduler',
  data: function() {
    return {
      config: {
        timeHeaders: [{"groupBy":"Month"},{"groupBy":"Day","format":"d"}],
        scale: "Day",
        days: DayPilot.Date.today().daysInMonth(),
        startDate: DayPilot.Date.today().firstDayOfMonth(),
        timeRangeSelectedHandling: "Enabled",
        onTimeRangeSelected: async (args) => {
          const dp = args.control;
          const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
          dp.clearSelection();
          if (modal.canceled) {
            return;
          }
          dp.events.add({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            resource: args.resource,
            text: modal.result
          });
        },
        eventMoveHandling: "Update",
        onEventMoved: (args) => {
          args.control.message("Event moved: " + args.e.text());
        },
        eventResizeHandling: "Update",
        onEventResized: (args) => {
          args.control.message("Event resized: " + args.e.text());
        },
        eventDeleteHandling: "Update",
        onEventDeleted: (args) => {
          args.control.message("Event deleted: " + args.e.text());
        },
        eventClickHandling: "Disabled",
        treeEnabled: true,
      },
    }
  },
  props: {},
  components: {
    DayPilotScheduler
  },
  computed: {
    // DayPilot.Scheduler object - https://api.daypilot.org/daypilot-scheduler-class/
    scheduler: function () {
      return this.$refs.scheduler.control;
    }
  },
  methods: {
    loadEvents() {
      const events = [
        {id: 1, start: "2021-10-01T00:00:00", end: "2021-10-05T00:00:00", text: "Event 1", resource: "R1"},
      ];
      this.config.events = events;
    },
    loadResources() {
      const resources = [
        {name: "Resource 1", id: "R1"},
        {name: "Resource 2", id: "R2"},
        {name: "Resource 3", id: "R3"}
      ];
      this.config.resources = resources;
    }
  },
  mounted: function () {
    this.loadResources();
    this.loadEvents();

    this.scheduler.message("Welcome!");
  }
}
</script>