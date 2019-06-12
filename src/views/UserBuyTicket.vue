<template>
    <div>
        <div v-for="seatRow in seatRowList" :key="seatRow.rowNum">
            rowNum:{{seatRow.rowNum}}
            <i-col v-for="seat in seatRow.seatRow" :key="seat.seatNum" span="4">
                {{seat.seatNum}}
            </i-col>
        </div>
    </div>
</template>

<script>
import userApi from "../api/UserApi"
export default {
    name: "UserBuyTicket",
    data(){
        return{
           seatRowList:[
               {
                   rowNum:0,
                   seatRow:[
                       {
                           seatNum:0,
                           avaliable:true
                       },{
                           seatNum:1,
                           avaliable:true
                       },{
                           seatNum:2,
                           avaliable:true
                       },{
                           seatNum:3,
                           avaliable:true
                       }
                   ]
               },{
                   rowNum:1,
                   seatRow:[
                       {
                           seatNum:0,
                           avaliable:true
                       },{
                           seatNum:1,
                           avaliable:true
                       },{
                           seatNum:2,
                           avaliable:true
                       },{
                           seatNum:3,
                           avaliable:true
                       }
                   ]
               },{
                   rowNum:2,
                   seatRow:[
                       {
                           seatNum:0,
                           avaliable:true
                       },{
                           seatNum:1,
                           avaliable:true
                       },{
                           seatNum:2,
                           avaliable:true
                       },{
                           seatNum:3,
                           avaliable:true
                       }
                   ]
               },{
                   rowNum:3,
                   seatRow:[
                       {
                           seatNum:0,
                           avaliable:true
                       },{
                           seatNum:1,
                           avaliable:true
                       },{
                           seatNum:2,
                           avaliable:true
                       },{
                           seatNum:3,
                           avaliable:true
                       }
                   ]
               }
           ]
        }
    },
    methods: {

    },
    created(){
        
    }
}
</script>

