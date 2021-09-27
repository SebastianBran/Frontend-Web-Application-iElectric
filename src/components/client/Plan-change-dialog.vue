<template>
    <v-dialog
    v-model="dialog"
    persistent
    max-width="500px"
    >
        <v-card>
            <v-card-title>
                <span>Cambiar de Plan</span>
                <v-spacer></v-spacer>
                <v-menu
                bottomx
                left
                >            
                </v-menu>
            </v-card-title>
            <v-card-text>
                <v-container>
                   
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn
                color="primary"
                text
                @click="Close"
                >
                Close
                </v-btn>
          </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import PlansApiService from "../../core/services/plans-api-service";

export default {
    name:"ChangePlan",
    props:{
        dialog: Boolean,
        subscription: Object,
        item: Object,
        clientId: String
    },
    data(){
        return{
            plans: []
        }
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
        Close(){            
            this.$emit("close-dialog")
        },
        saveInformation(){
            this.subscription.id = uuidv4();
            this.subscription.clientId = this.clientId
            this.subscription.categoryPlan = this.item.id
            this.subscription.active = true  ,
            this.subscription. subscriptionDate = "",
            console.log(this.subscription)        
            this.$emit("edit-plan")
        }
    },
    mounted(){
        this.getPlans();
    }
}
</script>

<style scoped>

</style>