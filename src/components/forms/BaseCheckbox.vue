<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <div v-for="option in options" :key="option" class="form-check">
      <input
        type="checkbox"
        :value="option"
        :checked="isChecked(option)"
        @change="handleChange(option)"
        class="form-check-input"
      />
      <label class="form-check-label">{{ option }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    value: {
      type: Array as () => string[], // Explicitly define array type
      required: true,
    },
    label: String,
    options: {
      type: Array as () => string[], // Explicitly define array type
      required: true,
    },
  },
  methods: {
    isChecked(option: string): boolean {
      return this.value.includes(option);
    },
    handleChange(option: string) {
      const value = [...this.value];
      const index = value.indexOf(option);

      if (index === -1) {
        value.push(option);
      } else {
        value.splice(index, 1);
      }

      (this as any).$emit("input", value);
    },
  },
});
</script>

<style scoped>
.form-check {
  display: inline-block;
  margin-right: 15px;
}

.form-check input {
  margin-right: 5px;
}
</style>
