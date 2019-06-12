<template>
  <div class="container">
    <Card style="width:450px; margin: 80px auto;  background: rgba(255,255,255,0.5)">
      <p slot="title">
        <Icon type="md-contact"></Icon>
        注册
      </p>
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">

          <FormItem label="用户名" prop="name" style="margin-left: 0">
            <Input type="text" v-model="formCustom.username" placeholder="请输入用户名"></Input>
          </FormItem>

        <FormItem label="密码" prop="passwd">
          <Input type="password" v-model="formCustom.passwd"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="passwdCheck">
          <Input type="password" v-model="formCustom.passwdCheck"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')" style="margin:10px 0 auto 10px">注册</Button>
          <Button @click="handleReset('formCustom')" style="margin:10px 50px auto 10px">重置</Button>
        </FormItem>
      </Form>

    </Card>
  </div>
</template>

<script>
  export default {
    name: "AdminRegister",
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.formCustom.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('passwdCheck')
          }
          callback()
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formCustom.passwd) {
          callback(new Error('两次密码不一致！'));
        } else {
          callback();
        }
      };
      const validateName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
      };

      return {
        formCustom: {
          username: '',
          passwd: '',
          passwdCheck: '',
        },
        ruleCustom: {
          name: [
            {validator: validateName, trigger: 'blur'}
          ],
          passwd: [
            {validator: validatePass, trigger: 'blur'}
          ],
          passwdCheck: [
            {validator: validatePassCheck, trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      handleSubmit(name) {
        /* this.$refs[name].validate((valid) => {
           if (valid) {
             this.$Message.success('Success!');
           } else {
             this.$Message.error('Fail!');
           }
         });*/

        //调用接口发送给后端
        var username = this.formCustom.username;
        var psd = this.formCustom.passwd;
        var _this = this;
        var data = {
          jobNumber: username,
          password: psd,
        };
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
