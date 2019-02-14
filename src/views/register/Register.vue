<template>
  <div class="register-container">
    <el-form ref="registerForm" :model="registerForm" class="register-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">
          {{ $t('register.title') }}
        </h3>
      </div>

      <el-form-item prop="username">
        <el-input
          v-model="registerForm.username"
          :placeholder="$t('register.username')"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="registerForm.password"
          :placeholder="$t('register.password')"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleRegister"
        />
      </el-form-item>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleRegister">
        {{ $t('register.register') }}
      </el-button>

    </el-form>

  </div>
</template>

<script>
import { register } from '../../api/register'

export default {
  name: 'Register',
  data() {
    return {
      registerForm: {
        username: 'quytm',
        password: '1234',
        confirmPassword: '1234'
      }
    }
  },
  methods: {
    handleRegister() {
      const { username, password, confirmPassword } = this.registerForm
      register(username, password, confirmPassword).then(res => {
        console.log(res.data)
        if (res.data.success) {
          alert(`Register for ${this.registerForm.username} successfully. Will redirect to login page`)
          this.$router.push({
            path: '/login'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .register-container {
    display: flex;
    justify-content: center;
  }

  .register-form {
    width: 20%;
  }
</style>
