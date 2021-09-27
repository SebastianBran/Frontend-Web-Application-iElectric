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
  name: "Technician.vue",
  data: () => ({
    itemsNavigation: [
      { title: 'Mi ruta', icon: 'mdi-map-legend', path: '/technician' },
      { title: 'Reportes', icon: 'mdi-clipboard-list-outline', path: '/technician/reports' },
      { title: 'Notificaciones', icon: 'mdi-email-outline', path: '/technician/notifications' },
      { title: 'Perfil', icon: 'mdi-account-hard-hat', path: '/technician/profile' },
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