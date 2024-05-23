<template>
  <div class="call-list-container">
    <ul v-if="calls.length" class="call-list">
      <li v-for="call in calls" :key="call.id" class="call-item">
        <h6 class="call-details">
          <span class="call-date">{{ formatDate(call.called_at) }}</span> -
          <span class="call-time">{{ formatTime(call.called_at) }}</span>
        </h6>
        <div class="call-comment">{{ call.comment }}</div>
      </li>
    </ul>
    <p v-else class="no-calls-message">No calls have been made yet.</p>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    contactId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      calls: [],
      error: null
    };
  },
  created() {
    this.fetchCalls();
  },
  methods: {
    fetchCalls() {
      axios.get(`http://localhost:8080/calls/contact?id=${this.contactId}`)
          .then(response => {
            this.calls = response.data;
          })
          .catch(error => {
            this.error = 'There was an error fetching the calls.';
            console.error("Error fetching calls:", error);
          });
    },
    formatDate(datetime) {
      const date = new Date(datetime);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    },
    formatTime(datetime) {
      const date = new Date(datetime);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }
};
</script>

<style scoped>
.call-list-container {
  padding: 20px;
  max-width: 1100px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.call-list {
  list-style-type: none;
  padding: 0;
}

.call-item {
  background: #f9f9f9;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.call-details {
  margin: 0 0 5px 0;
  font-weight: bold;
}

.call-date, .call-time {
  margin-right: 5px;
}

.call-comment {
  margin-top: 5px;
  color: #555;
}

.no-calls-message, .error-message {
  color: #888;
  text-align: center;
  margin-top: 20px;
}
</style>
