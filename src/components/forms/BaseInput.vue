<template>
    <div class="form-group">
      <label :for="label">{{ label }}</label>
      <input 
        type="text" 
        :value="value" 
        @input="$emit('input', $event.target.value)" 
        class="form-control"
        :required="required" />
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      value: String,
      label: String,
      required: Boolean,
    },
  };
  </script>
  