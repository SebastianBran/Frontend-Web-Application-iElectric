<template>
  <v-container>
    <div v-if="planClient.length === 0">      
      <ChoosePlan 
        v-bind:clientId="clientId"
        v-on:update-render="updateRendering"
      />
    </div>
    <div v-else>      
      <MyPlan
        v-bind:item="planClient[0]"
        v-bind:clientId="clientId"
        v-on:update-render="updateRendering"
      />
    </div>
  </v-container>  
</template>

<script>  
//import MyPlansApiService from "../../core/services/myplans-api-service";
import ChoosePlan from "../../components/client/ChoosePlan-models";
import MyPlan from "../../components/client/MyPlan-models";

export default {
  name: "Plan",
  data(){
    return{
      clientId: "5",
      planClient: []
    }
  },
  components:{
    ChoosePlan,
    MyPlan
  },
  methods:{    
    getPlan(plan){
      return{
        id: plan.id,
        categoryPlan: plan.categoryPlan,
        clientId: plan.clientId,
        active: plan.active,
        subscriptionDate: plan.subscriptionDate
      }
    },
    getPlanId(){
      /*MyPlansApiService.getByClientId(this.clientId)
      .then(response => {
        this.planClient = response.data
      })
      .catch(e =>{
        console.log(e)
      })*/
    },
    updateRendering(){
      this.getPlanId();
    }
  },
  mounted() {
    this.getPlanId();
  }
}

</script>

<style scoped>

</style>