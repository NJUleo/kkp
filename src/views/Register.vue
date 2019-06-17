<template>
  <div class="container">
    <Card style="width:450px; margin: 200px auto;">
      <p slot="title">
        <Icon type="md-contact"></Icon>注册
      </p>
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="用户名" prop="username">
          <Input type="text" v-model="formCustom.name" clearable/>
        </FormItem>
        <FormItem label="密码" prop="passwd">
          <Input type="password" v-model="formCustom.passwd" clearable/>
        </FormItem>
        <FormItem label="确认密码" prop="passwdCheck">
          <Input type="password" v-model="formCustom.passwdCheck" clearable/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="login()">前往登陆</Button>
          <Button type="primary" @click="register('formCustom')">注册</Button>
          <Button @click="reset('formCustom')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import userApi from "../api/UserApi";
export default {
  name: "Register",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.formCustom.passwdCheck !== "") {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField("passwdCheck");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password again"));
      } else if (value !== this.formCustom.passwd) {
        callback(new Error("The two input passwords do not match!"));
      } else {
        callback();
      }
    };
    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Age cannot be empty"));
      }
      // 模拟异步验证效果
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Please enter a numeric value"));
        } else {
          if (value < 18) {
            callback(new Error("Must be over 18 years of age"));
          } else {
            callback();
          }
        }
      }, 1000);
    };

    return {
      formCustom: {
        passwd: "",
        passwdCheck: "",
        age: ""
      },
      ruleCustom: {
        passwd: [{ validator: validatePass, trigger: "blur" }],
        passwdCheck: [{ validator: validatePassCheck, trigger: "blur" }],
        age: [{ validator: validateAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      this.$router.push({ path: "/" });
    },
    register(name) {
      let _this = this;
      this.$refs[name].validate(valid => {
        let aud = {
          username: _this.formCustom.name,
          password: _this.formCustom.passwd
        };
        if (valid) {
          userApi
            .RegisterAudience(aud)
            .then(res => {
              _this.$Message.success("注册成功!");
              _this.$router.push({ path: "/" });
            })
            .catch(err => {
              _this.$Message.error("注册失败!" + err);
            });
        } else {
          this.$Message.error("注册失败!");
        }
      });
    },
    reset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>


<style scoped>
.container {
  height: 100%;
  width: 100%;
  position: fixed;
  background-image: url("../assets/login_background.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
</style>
