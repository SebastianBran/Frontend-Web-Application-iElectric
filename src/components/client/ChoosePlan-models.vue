<template>
    <v-container>
        <v-row dense>
            <CardPlan 
                v-bind:item="plans[0]" 
                v-bind:subscription="subscriptionModelItem"
                v-on:model-choose-plan="saveInformationPlan"
                v-bind:clientId="clientId"
            />
            <CardPlan 
                v-bind:item="plans[1]" 
                v-bind:subscription="subscriptionModelItem"
                v-on:model-choose-plan="saveInformationPlan"
                v-bind:clientId="clientId"
            />
            <CardPlan 
                v-bind:item="plans[2]" 
                v-bind:subscription="subscriptionModelItem"
                v-on:model-choose-plan="saveInformationPlan"
                v-bind:clientId="clientId"
            /> 
        </v-row>
    </v-container>
</template>

<script>
import PlansApiService from "../../core/services/plans-api-service";
import MyPlansApiService from "../../core/services/myplans-api-service";
import CardPlan from "./CardPlan-model"

export default{
    name:"ChoosePlan",
    props: {
        clientId: String
    },
    data(){
        return{
            plans:[],
            subscriptionModelItem:{}
        }
    },    
    components:{
        CardPlan
    },
    methods:{
        getPlan(plan){
            return{
                id: plan.id,
                name: plan.name,
                description: plan.description,
                numArtefacts: plan.numArtefacts,
                amount: plan.amount
            }
        },
        getPlans() {
            PlansApiService.getAll()
            .then(response => {
                this.plans = response.data.map(this.getPlan)
                console.log(this.plans)
            })
        },
        saveInformationPlan(modelPlan){
            //console.log(modelPlan)
            MyPlansApiService.create(modelPlan)
            .then(response => {
                console.log(response)
                this.$emit("update-render")

            })
            .catch(e => {
                console.log(e)
            })
        }
    },
    mounted() {
        this.getPlans();
    }
}
</script>

<style scoped>

</style>
