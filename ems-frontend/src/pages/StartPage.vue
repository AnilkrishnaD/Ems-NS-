<template>
  <div class="loginPage">
    <div class="loginForm">
      <h2 class="pageTitle">Login As</h2>
      <div class="buttonGroup">
        <router-link to="/employeelogin" class="emp-link link">
          Employee
        </router-link>
        <<router-link to="/adminlogin" class="admin-link link">
          Admin
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
a {
  text-decoration: none;
}

.emp-link {
  background-color: green;
  color: white;
  padding: 8px;
}
.admin-link {
  background-color: blue;
  color: white;
  padding: 8px;
}
.loginPage {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("https://global-uploads.webflow.com/625d567276661e857102867d/63cd55af57b94e9886e36427_A%20Beginners%20Guide%20to%20Employee%20Management%20System.png");
}

.loginForm {
  padding: 20px;
  border-radius: 10px;
  width: 25%;
  border: 1px solid #000;
  background-color: #fff;
}

.pageTitle {
  text-align: center;
}

.buttonGroup {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.primaryButton {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.successButton {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: #fff;
  cursor: pointer;
}
</style>
