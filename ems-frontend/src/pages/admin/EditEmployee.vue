<template>
  <div class="editEmployee">
    <div class="formWrapper">
      <h3>Edit Employee</h3>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="inputName">Name</label>
          <input
            type="text"
            class="form-control"
            id="inputName"
            v-model="employee.name"
            placeholder="Enter Name"
          />
        </div>
        <div class="form-group">
          <label for="inputEmail4">Email</label>
          <input
            type="email"
            class="form-control"
            id="inputEmail4"
            v-model="employee.email"
            placeholder="Enter Email"
          />
        </div>
        <div class="form-group">
          <label for="inputSalary">Salary</label>
          <input
            type="text"
            class="form-control"
            id="inputSalary"
            v-model="employee.salary"
            placeholder="Enter Salary"
          />
        </div>
        <div class="form-group">
          <label for="inputAddress">Address</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            v-model="employee.address"
            placeholder="1234 Main St"
          />
        </div>
        <div class="form-group">
          <label for="category">Category</label>
          <select
            class="form-select"
            id="category"
            v-model="employee.category_id"
          >
            <option v-for="c in category" :key="c.id" :value="c.id">
              {{ c.name }}
            </option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary btn-block">
          Edit Employee
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCategoryStore } from "@stores/auth";
import { useEmployeeStore } from "@stores/employee";
// stores
const categoryStore = useCategoryStore();
const employeeStore = useEmployeeStore();
// router
const route = useRoute();
const router = useRouter();

const employee = ref({
  name: "",
  email: "",
  password: "",
  salary: "",
  address: "",
  category_id: "",
  image: null,
});
const category = computed(() => categoryStore.categoryList);

const fetchCategory = async () => {
  try {
    const response = await axios.get("http://localhost:3000/auth/category");
    if (response.data.Status) {
      category.value = response.data.Result;
    } else {
      alert(response.data.Error);
    }
  } catch (error) {
    console.error(error);
  }
};

const fetchEmployee = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/auth/employee/${route.params.id}`
    );
    employee.value = {
      ...employee.value,
      name: response.data.Result[0].name,
      email: response.data.Result[0].email,
      address: response.data.Result[0].address,
      salary: response.data.Result[0].salary,
      category_id: response.data.Result[0].category_id,
    };
  } catch (error) {
    console.error(error);
  }
};

const handleSubmit = async () => {
  try {
    const response = await axios.put(
      `http://localhost:3000/auth/edit_employee/${route.params.id}`,
      employee.value
    );
    if (response.data.Status) {
      router.push("/dashboard/employee");
    } else {
      alert(response.data.Error);
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchEmployee();
  categoryStore.fetchCategories();
});
</script>

<style scoped lang="scss">
.editEmployee {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.formWrapper {
  width: 50%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 20px;
}

.btn {
  cursor: pointer;
}
</style>
