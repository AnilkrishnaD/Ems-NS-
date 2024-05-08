<template>
  <div>
    <router-link to="/dashboard/AddCategory">
      <Button label="Add" class="add-button" />
    </router-link>
    <p>Category's List</p>
    <div v-if="status === 'loading'">
      <p>loading....</p>
    </div>
    <div v-else-if="status === 'success'">
      <table>
        <thead>
          <tr>
            <th>sno</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, index) in categorysList" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ category.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useCategoryStore } from "../../stores/category";
// stortes declartion
const categoryStore = useCategoryStore();

const error = computed(() => categoryStore.error);
const status = computed(() => categoryStore.loadingStatus);
const categorysList = computed(() => categoryStore.categoryList);
// on mounted hook, fetching existing categoryes
onMounted(() => {
  // categoryStore.fetchCategories();
});
</script>
<style lang="scss" scoped>
.add-button {
  background-color: green;
  color: white;
  padding: 12px;
}

table {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  /* Styling for even rows */
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  /* Hover effect */
  tr:hover {
    background-color: #ddd;
  }
}
</style>
