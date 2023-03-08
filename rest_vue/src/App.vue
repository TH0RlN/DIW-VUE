<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col-md-12 mt-2">
        <h1>Usuarios Clientes</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 mt-2">
        <FormularioUsuario @crear-usuario="postUsuario"/>
        <TablaUsuarios :usuarios="usuarios" @eliminar-usuario="deleteUsuario" @actualizar-usuario="putUsuario"></TablaUsuarios>
      </div>
    </div>
  </div>
</template>

<script>
import TablaUsuarios from './components/TablaUsuarios.vue'
import FormularioUsuario from './components/FormularioUsuario.vue'

export default {
components:{
  TablaUsuarios,
  FormularioUsuario
},
  name: 'app',
  data() {
    return {
      usuarios: []
    }
  },
  methods: {
    async getUsuarios() {

      try {
        const response = await fetch('http://localhost:3000/usuarios');
        this.usuarios = await response.json();
      } catch (error) {
        console.error(error)
      }

    },
    async postUsuario(usuario) {
      try {
        const response = await fetch('http://localhost:3000/usuarios', {
          method: 'POST',
          body: JSON.stringify(usuario),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })

        const usuarioCreado = await response.json();
        this.usuarios = [...this.usuarios, usuarioCreado];
        //this.getUsuarios();
      } catch (error) {
        console.error(error)
      }

    },
    async putUsuario(usuario) {
      try {
        const response = await fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
          method: 'PUT',
          body: JSON.stringify(usuario),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })

       const usuarioActualizado = await response.json();

       console.table(usuarioActualizado)

        this.usuarios = this.usuarios.map(u => (u.id === usuario.id ? usuarioActualizado : u));
        this.getUsuarios();
      } catch (error) {
        console.error(error)
      }
    },
    async deleteUsuario(usuario) {
      try {
        await fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
          method: 'DELETE',
        });

        this.usuarios = this.usuarios.filter(u => u.id !== usuario.id)
        this.getUsuarios();
      } catch (error) {
        console.error(error)
      }
    }
  },
  mounted() {
    this.getUsuarios();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
