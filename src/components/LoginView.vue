<template>
  <div class="box">
    <div class="login" v-if="isLogin">
      <h2>登录</h2>
      <el-form
        :model="form"
        ref="form"
        label-width="60px"
        label-position="left"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="form.username"
            placeholder="username"
            clearable
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="password"
            clearable
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="邮箱" prop="email">
          <el-input
            type="email"
            v-model="form.email"
            placeholder="email"
            clearable
            style="width: 250px"
            @change="getCodeButton"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input
            type="text"
            v-model="form.code"
            placeholder="code"
            clearable
            style="width: 140px"
          ></el-input>
          <el-button
            type="primary"
            icon="el-icon-message"
            @click="getCode"
            style="margin-left: 7px"
            :disabled="disabledGetCodeButton"
            >验证码</el-button
          >
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitLogin">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-link
            type="primary"
            :underline="false"
            @click="toRegisterOrLogin"
            style="margin-left: 25px"
            >注册链接</el-link
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="register" v-if="!isLogin">
      <h2>注册</h2>
      <el-form
        :model="form"
        ref="form"
        label-width="70px"
        label-position="left"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="form.username"
            placeholder="username"
            clearable
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="password"
            clearable
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input
            type="password"
            v-model="form.checkPassword"
            placeholder="check password"
            clearable
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            type="email"
            v-model="form.email"
            placeholder="email"
            clearable
            style="width: 250px"
            @change="getCodeButton"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input
            type="text"
            v-model="form.code"
            placeholder="code"
            clearable
            style="width: 130px"
          ></el-input>
          <el-button
            type="primary"
            @click="getCode"
            style="margin-left: 8px"
            :disabled="disabledGetCodeButton"
            >获取验证码</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitRegister">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-link
            type="primary"
            :underline="false"
            @click="toRegisterOrLogin"
            style="margin-left: 25px"
            >取消注册</el-link
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Message } from "element-ui";

export default {
  name: "LoginView",
  data() {
    return {
      form: {}, // 表单
      dict: {},
      isLogin: true, // 控制（登录页/注册页）的显示
      params: {},
      disabledGetCodeButton: true, // 控制获取验证码按钮的显示
    };
  },
  mounted() {},
  methods: {
    // 提交登录
    submitLogin() {
      console.log("submitLogin", this.form);
      this.dict = this.form;
      axios
        // .post("api/login/", this.dict, { withCredentials: true })
        .post("api/token/", this.dict, { withCredentials: true }) // "api/token/" JWT 登录认证
        .then((response) => {
          console.log("api/login/", response.data);
          console.log("setItem_token", response.data.access);
          window.localStorage.setItem("token", response.data.access);
          this.$router.push({ name: "ceshi" });

          // 注意：配置 JWT 登录认证之后，后面这些就没用了
          // if (response.data.message == "登录成功") {
          //   Message.success("登录成功！");
          //   // // 将键为 "Flag"，值为 "isLogin" 的数据存储到浏览器的本地存储中。如果本地存在这对密钥，说明已经登录过了，并且记住了登录状态。
          //   // window.localStorage.setItem("Flag", "isLogin");
          //   this.$router.push({ name: "ceshi" });
          // } else if (response.data.message == "用户名或密码错误") {
          //   Message.error("用户名或密码错误！");
          // } else if (response.data.message == "邮箱不存在") {
          //   Message.error("该用户不存在！");
          // } else if (response.data.message == "验证码错误") {
          //   Message.error("验证码错误！");
          // }
        })
        .catch((error) => {
          Message.error("请填写完整！");
          console.log("报错", error);
        });
    },
    // 提交注册
    submitRegister() {
      console.log("submitRegister", this.form);
      this.dict = this.form;
      axios
        .post("api/register/", this.dict, { withCredentials: true })
        .then((response) => {
          console.log("post请求api/register/", response.data);
          if (response.data.message == "注册成功") {
            Message.success("注册成功！");
            this.isLogin = !this.isLogin;
            this.form = {};
          } else if (response.data.message == "邮箱已注册") {
            Message.error("邮箱已注册！");
          } else if (response.data.message == "验证码错误") {
            Message.error("验证码错误！");
          } else if (response.data.message == "验证码过期") {
            Message.error("验证码过期！");
          }
        })
        .catch((error) => {
          Message.error("请填写完整！");
          console.log("报错", error);
        });
    },
    // 清空表单（重置）
    resetForm() {
      this.form = {};
      this.disabledGetCodeButton = true; // 禁用获取验证码按钮
    },
    // 去注册/登录
    toRegisterOrLogin() {
      this.form = {};
      this.isLogin = !this.isLogin;
    },
    // 获取验证码
    getCode() {
      this.disabledGetCodeButton = true; // 禁用获取验证码按钮
      console.log("email", this.form.email);
      this.params = {
        email: this.form.email,
      };
      axios
        .get(
          "api/register/",
          { params: this.params },
          { withCredentials: true }
        )
        .then((response) => {
          console.log("get请求api/register/", response.data);
          // this.disabledGetCodeButton = true; // 禁用获取验证码按钮
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 邮箱改变时，启用获取验证码按钮
    getCodeButton() {
      this.disabledGetCodeButton = false; // 启用获取验证码按钮
      if (!this.form.email) {
        this.disabledGetCodeButton = true; // 禁用获取验证码按钮
      }
    },
  },
};
</script>

<style scoped>
.box {
  width: 500px;
  height: 500px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  margin: 100px auto;
  position: relative;
  transition: all 0.3s;
}
.box:hover {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
}
.box h2 {
  text-align: center;
}
.login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.register {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
