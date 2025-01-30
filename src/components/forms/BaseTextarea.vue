<template>
    <div class="form-group">
      <label :for="label">{{ label }}</label>
      <textarea 
        :value="value" 
        @input="$emit('input', $event.target.value)" 
        class="form-control"></textarea>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      value: String,
      label: String,
    },
  };
  </script>
  