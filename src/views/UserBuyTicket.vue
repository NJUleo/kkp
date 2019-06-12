<template>
    <Menu mode="horizontal" active-key="1">
        <div class="layout-assistant">
            <div v-for="">
            <Menu-item key="1">二级导航</Menu-item>
            <Menu-item key="2">二级导航</Menu-item>
            <Menu-item key="3">二级导航</Menu-item>
        </div>
    </Menu>
</template>

<script>
import userApi from "../api/UserApi"
export default {
    name: "UserBuyTicket",
    data(){
        return{

        }
    },
    methods: {

    },
    created(){

    }
}
</script>

