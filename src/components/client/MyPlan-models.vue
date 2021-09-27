<template>
    <div>
        <ChangePlan 
            v-bind:dialog="dialog"
            v-bind:subscription="subscriptionModelItem"
            v-bind:item="item"
            v-bind:clientId="clientId"
            v-on:close-dialog="closeDialog"
            v-on:edit-plan="editPlan"
        />
        <v-card
        class="mx-auto"
        max-width="422"
        outlined
        >
        <v-list-item three-line>
            <v-list-item-content>
                <div class="text-overline mb-4">
                Plan Actual
                </div>
                <v-list-item-title class="text-h5 mb-1 text-capitalize">
                {{plan.name}}: {{plan.amount}} 
                </v-list-item-title>
                <v-list-item-subtitle>{{plan.description}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-divider vertical></v-divider>

            <v-list-item-avatar
                class="btn-div"
                tile
                size="80"
                color="#39A2DB"
                @click="dialog = true"
            >
                Upgrade   
            </v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
            <v-btn
                color="#A2DBFA"
                text
                @click="deletePlan"
            >
                Cancelar
            </v-btn>
        </v-card-actions>

    </v-card>
  </div>
</template>

<script>
import PlansApiService from "../../core/services/plans-api-service";
import MyPlansApiService from "../../core/services/myplans-api-service";
import ChangePlan from "./Plan-change-dialog";

export default{
    name:"MyPlan",
    props:{
        item: Object,
        clientId: String
    },
    data() {
        return {
            plan: {},
            edit: false,
            dialog: false,
            subscriptionModelItem: {}
        }
    },
    components:{
        ChangePlan
    },
    methods:{
        getPlans() {
            PlansApiService.getById(this.item.categoryPlan)
            .then(response => {
                this.plan = response.data
                console.log(response.data)
            })
        },
        editPlan(modelPlan) {
            MyPlansApiService.update(modelPlan.id, modelPlan)
            .then(response => {
            console.log(response);
            })
            .catch(e => {
            console.log(e);
            });
        },
        async deletePlan() {
            await MyPlansApiService.delete(this.item.id)
            .then(response => {
                console.log(response);
                this.$emit("update-render")
            })
            .catch(e => {
                console.log(e);
            });
        },
        closeDialog(){
            this.dialog = !this.dialog
        }
    },
    mounted(){
        this.getPlans()
    }
}
</script>

<style scoped>
    .btn-div {
        cursor: pointer;
    }
</style>
