<template>
    <div class="form-group">
      <label>{{ label }}</label>
      <select :value="value" @change="handleChange" class="form-control">
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      value: {
        type: String,
        required: true
      },
      label: String,
      options: Array
    },
    methods: {
      handleChange(event: Event) {
        const selectedValue = (event.target as HTMLSelectElement).value;
        this.$emit('input', selectedValue); 
      }
    }
  };
  </script>
  