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
import Vue from "vue";

export default Vue.extend({
  props: {
    value: {
      type: String,
      required: true,
    },
    label: String,
    options: {
      type: Array as () => string[],
      required: true,
    },
  },
  methods: {
    handleChange(event: Event) {
      const selectedValue = (event.target as HTMLSelectElement).value;
      (this as any).$emit("input", selectedValue);
    },
  },
});
</script>
