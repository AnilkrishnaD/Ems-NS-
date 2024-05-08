<template>
  <div class="add-employee-container">
    <div class="form-container">
      <h3>Add Employee</h3>
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
          <label for="inputEmail">Email</label>
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            v-model="employee.email"
            placeholder="Enter Email"
          />
        </div>
        <div class="form-group">
          <label for="inputPassword">Password</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            v-model="employee.password"
            placeholder="Enter Password"
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
            name="category"
            id="category"
            class="form-control"
            v-model="employee.category_id"
          >
            <option v-for="c in category" :key="c.id" :value="c.id">
              {{ c.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="inputImage">Select Image</label>
          <input
            type="file"
            class="form-control-file"
            id="inputImage"
            @change="handleImageChange"
          />
        </div>
        <button type="submit" class="btn btn-primary add-button">
          Add Employee
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useCategoryStore } from "../../stores/category";
import { useEmployeeStore } from "../../stores/employee";

// stores
const categoryStore = useCategoryStore();
const employeeStore = useEmployeeStore();

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

onMounted(() => {
  categoryStore.fetchCategories();
});

//  add employee
const handleSubmit = () => {
  const formData = new FormData();
  formData.append("name", employee.value.name);
  formData.append("email", employee.value.email);
  formData.append("password", employee.value.password);
  formData.append("address", employee.value.address);
  formData.append("salary", employee.value.salary);
  formData.append("image", employee.value.image);
  formData.append("category_id", employee.value.category_id);

  employeeStore.addEmployee(formData);
};

const handleImageChange = (e) => {
  employee.value.image = e.target.files[0];
};
</script>

<style scoped lang="scss">
.add-employee-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
}

.form-container {
  width: 50%;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: #f8f9fa;

  h3 {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1.5rem;

    label {
      font-weight: bold;
    }

    input[type="text"],
    input[type="email"],
    input[type="password"],
    input[type="file"],
    select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

      &:focus {
        border-color: #007bff;
        outline: none;
      }
    }
  }

  .btn-primary {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>
