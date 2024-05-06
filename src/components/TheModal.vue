
<div>
<button @click="openModal">Open Modal</button>

<!-- Modal -->
<div v-if="showModal" class="modal">
  <div class="modal-content">
    <span class="close">New appointment</span>

    <!-- Form fields -->
    <div class="form-group">
      <label>Name:</label>
      <br/>
      <input type="text" v-model="formData.name" class="form-control soft-border">
    </div>
    <div class="form-group">
      <label>Address:</label><br/>
      <input type="text" v-model="formData.address" class="form-control soft-border">
    </div>
    <div class="form-group">
      <label>Phone:</label><br/>
      <input type="text" v-model="formData.phone" class="form-control soft-border">
    </div>
    <div class="form-group">
      <label>Description:</label><br/>
      <textarea v-model="formData.description" class="form-control soft-border"></textarea>
    </div>
    <div class="form-group">
      <label>Call Details:</label><br/>
      <textarea v-model="formData.callDetails" class="form-control soft-border"></textarea>
    </div>

    <!-- Buttons -->
    <div class="modal-buttons">
      <button @click="closeModal" class="btn btn-light">Cancel</button>
      <button @click="book" class="btn btn-info">Book </button>
    </div>
  </div>
</div>
</div>
  <script setup>
  </script>