<template>
  <div class="container">
    <Card style="width:450px;margin: 100px auto; background: rgba(255,255,255,0.5)">
      <p slot="title">
        <Icon type="md-contact"></Icon>
        用户登录
      </p>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" v-model="formInline.user" size="large" placeholder="Username" />
            <Icon type="ios-person-outline" slot="prepend"></Icon>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" size="large" placeholder="Password" />
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')" onclick="">登录</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
  import axios from "axios"
  import userApi from '../api/UserApi'
  export default {
    name: "UserLogin",
    data() {
      return {
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            {required: true, message: 'Please fill in the user name', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Please fill in the password.', trigger: 'blur'},
            {type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        console.log(this.$refs)
        this.$refs[name].validate((valid) => {
          if (!valid) {
            this.$Message.error('账号或密码格式错误!');
          }
        });

        var user = this.formInline.user;
        var psd = this.formInline.password;
        var _this = this;
        var data = {
          username: user,
          password: psd,
        };


          userApi.VerifyAudience(data)
            .then(res =>{
            _this.$router.push({ path: '/UserMovieList'});
          })
            .catch(err =>{
              console.log(error);
            });

      }
    }
  }
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
