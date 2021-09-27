<template>
    <v-col 
        cols
    >
        <v-card
            color="#385F73"
            dark
            
        >
            <v-card-title class="text-center text-capitalize">
                {{item.name}}
            </v-card-title>
            <v-card-subtitle class="text-center">
                S/ {{item.amount}}
            </v-card-subtitle >
                <v-divider class="mx-4"></v-divider>
            <v-card-subtitle class="text-center">
                {{item.description}}
            </v-card-subtitle>

            <v-card-actions class="justify-center">
                <v-btn
                    outlined
                    rounded
                    text
                    @click="saveInformation"
                >
            
                    Choose plan
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
    name:"CardPlan",
    props:{
        item: Object,
        subscription: Object,
        clientId: String,
    },
    methods:{
        saveInformation(){
            this.subscription.id = uuidv4();
            this.subscription.clientId = this.clientId
            this.subscription.categoryPlan = this.item.id
            this.subscription.active = true  ,
            this.subscription. subscriptionDate = "",
            console.log(this.subscription)            
            this.$emit("model-choose-plan", this.subscription)
        }
        
    }
}
</script>

<style scoped>

</style>