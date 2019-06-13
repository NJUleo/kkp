<template>
    <div>
        <table v-for="seatRow in seatRowList" :key="seatRow.rowNum">
            <tr>
                <th v-for="seat in seatRow.seatRow" :key="seat.seatNum" >
                    <img :src="seatState(seat)" @click="chooseSeat(seat)"/>
                </th>
            </tr>
        </table>
    </div>
</template>

<script>
import userApi from "../api/UserApi"
export default {
    name: "UserBuyTicket",
    data(){
        return{
            colNum:2,
           seatRowList:[
               {
                   rowNum:0,
                   seatRow:[
                       {
                           row:0,
                           col:0,
                           avaliable:true,
                           chosen:false
                       },{
                           row:0,
                           col:1,
                           avaliable:true,
                           chosen:false,
                       },{
                           row:0,
                           col:2,
                           avaliable:true,
                           chosen:true,
                       },{
                           seatNum:3,
                           avaliable:true,
                           chosen:false,
                       }
                   ]
               },{
                   rowNum:1,
                   seatRow:[
                       {
                           seatNum:0,
                           avaliable:false,
                           chosen:false,
                       },{
                           seatNum:1,
                           avaliable:true,
                           chosen:false,
                       },{
                           seatNum:2,
                           avaliable:true,
                           chosen:false,
                       },{
                           seatNum:3,
                           avaliable:true,
                           chosen:false,
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
        seatState(seat){
            if(seat.avaliable){
                if(seat.chosen){
                    return "../../static/seatChosen.png"
                }else{
                    return "../../static/seatChoose.png";
                }
            }else{
                return "../../static/seatLock.png";
            }
        },
        chooseSeat(seat){
            if(seat.avaliable){
                seat.chosen = !seat.chosen;
            }
            console.log("cnm");
        }
    },
    created(){
        
    }
}
</script>

