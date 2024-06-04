<template>
  <div class="call-list-container">
    <button class="btn-secondary" v-if="!isCalling" @click="initiateCall">Call</button>
    <div v-if="isCalling" class="call-input">
      <input type="text" v-model="newComment" placeholder="Enter your comment" class="pretty-input" />
      <button class="btn-primary" @click="saveCall">Save</button>
    </div>
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

    <BookAppointmentModal
        :isVisible="showAppointmentModal"
        :selectedSellerId="selectedSellerId"
        :contactId="contactId"
        :initialComment="newComment"
        @close="closeAppointmentModal"
    />
  </div>
</template>

<script>
import axios from 'axios';
import BookAppointmentModal from './BookAppointmentModal.vue';

export default {
  components: {
    BookAppointmentModal
  },
  props: {
    contactId: {
      type: Number,
      required: true
    },
    operatorId: {
      type: Number,
      required: true
    },
    selectedSellerId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      calls: [],
      error: null,
      isCalling: false,
      newComment: '',
      showAppointmentModal: false
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
    },
    initiateCall() {
      if (confirm('Ready to call?')) {
        this.isCalling = true;
      }
    },
    saveCall() {
      const newCall = {
        id_operator: 1,
        id_contact: this.contactId,
        called_at: new Date().toISOString(),
        comment: this.newComment
      };
      axios.post('http://localhost:8080/calls', newCall)
          .then(response => {
            this.calls.unshift(response.data);
            this.isCalling = false;
            if (confirm('Was an Appointment booked?')) {
              this.newComment = newCall.comment;  // Ensure the comment is correctly set before showing the modal
              this.showAppointmentModal = true;
            }
            this.fetchCalls();
          })
          .catch(error => {
            this.error = 'There was an error saving the call.';
            console.error("Error saving call:", error);
          });
    },
    closeAppointmentModal() {
      this.showAppointmentModal = false;
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

.call-input {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
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

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.pretty-input {
  width: 5000px;
  padding: 10px; /* Add padding */
  border: 1px solid #ccc; /* Add a border */
  border-radius: 5px; /* Round the corners */
  font-size: 16px; /* Increase font size */
  outline: none; /* Remove outline */
  transition: border-color 0.3s ease; /* Smooth transition for border color */
}

.pretty-input:focus {
  border-color: dodgerblue; /* Change border color on focus */
}
</style>
