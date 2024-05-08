<template>
  <div>
    <h2>Add category</h2>

    <form class="add-form" @submit.prevent="handleSubmit">
      <p>Category</p>
      <div class="form-fields">
        <label for="categoryName">Name</label>
        <InputText id="categoryName" v-model="name" />
        <Button type="submit" label="Add" class="add-button" />
        <p v-if="error" class="err-msg">{{ error }}</p>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useCategoryStore } from "../../stores/category";

// stores
const categoryStore = useCategoryStore();

const error = computed(() => categoryStore.error);
const name = ref("");

// handle form submission
function handleSubmit() {
  categoryStore.addCategory(name.value);
}
</script>
<style lang="scss" scoped>
.add-form {
  display: flex;
  flex-direction: column;
  align-items: center;

  .form-fields {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .err-msg {
    color: red;
    font-size: 12px;
  }
}
</style>
