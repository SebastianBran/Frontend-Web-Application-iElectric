<template>
  <v-app>
    <NavigationDrawer v-bind:items="itemsNavigation"/>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavigationDrawer from '../../components/Navigation-drawer.vue'

export default {
  name: "Client.vue",
  data: () => ({
    itemsNavigation: [
      { title: 'Inicio', icon: 'mdi-home-outline', path: '/client' },
      { title: 'Electrodomésticos', icon: 'mdi-stove', path: '/client/appliance' },
      { title: 'Mi plan', icon: 'mdi-clipboard-list-outline', path: '/client/plan' },
      { title: 'Notificaciones', icon: 'mdi-email-outline', path: '/client/notifications' },
      { title: 'Perfil', icon: 'mdi-account-outline', path: '/client/profile' },
      { title: 'Configuración', icon: 'mdi-screwdriver', path: '/' }
    ]
  }),
  components: {
    NavigationDrawer
  }
}
</script>

<style scoped>

</style>