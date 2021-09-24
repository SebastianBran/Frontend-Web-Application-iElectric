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
  name: "Administrator.vue",
  data: () => ({
    itemsNavigation: [
      { title: 'Negocio', icon: 'mdi-chart-line', path: '/administrator' },
      { title: 'Solicitud de Repuestos', icon: 'mdi-email-outline', path: '/administrator/spare-parts-requests' },
      { title: 'Estadísticas Técnicos', icon: 'mdi-chart-box-outline', path: '/administrator/technicians-statics' },
      { title: 'Anuncios', icon: 'mdi-new-box', path: '/administrator/announcements' },
      { title: 'Técnicos', icon: 'mdi-account-hard-hat', path: '/administrator/technicians' },
      { title: 'Reportes', icon: 'mdi-clipboard-list-outline', path: '/administrator/reports' },
      { title: 'Productos', icon: 'mdi-television', path: '/administrator/products' },
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