<template>
  <div>
    <div class="header">
      <h4>Employee Management System</h4>
    </div>
    <div class="content">
      <img :src="imageUrl" class="emp_det_image" />
      <div class="details">
        <h3>Name: {{ employee.name }}</h3>
        <h3>Email: {{ employee.email }}</h3>
        <h3>Salary: ${{ employee.salary }}</h3>
      </div>
      <div>
        <button class="btn primary" @click="editEmployee">Edit</button>
        <button class="btn danger" @click="handleLogout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import cookie from "store";

const employee = ref({});
const route = useRoute();
const router = useRouter();

const imageUrl = ref("");

const fetchEmployee = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/employee/detail/${route.params.id}`
    );
    employee.value = data[0];
    imageUrl.value = `http://localhost:3000/Images/${data[0].image}`;
  } catch (error) {
    console.error(error);
  }
};

const handleLogout = async () => {
  try {
    const response = await axios.get("http://localhost:3000/employee/logout");
    if (response.data.Status) {
      cookie.remove("valid");
      router.push("/");
    }
  } catch (error) {
    console.error(error);
  }
};

const editEmployee = () => {
  // done in admin pages
};
onMounted(() => {
  fetchEmployee();
});
</script>

<style scoped lang="scss">
.header {
  padding: 10px;
  background-color: #f0f0f0;
  text-align: center;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.emp_det_image {
  width: 200px;
  height: 200px;
  margin-top: 20px;
  border-radius: 50%;
}

.details {
  margin-top: 20px;
}

.btn {
  margin-top: 20px;
  margin-right: 10px;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.primary {
  background-color: #007bff;
  color: #fff;
  border: none;
}

.danger {
  background-color: #dc3545;
  color: #fff;
  border: none;
}
</style>
