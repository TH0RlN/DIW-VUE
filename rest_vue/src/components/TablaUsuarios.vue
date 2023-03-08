<template>
    <div id="tabla-usuarios">
        <div v-if="!usuarios.length" class="alert alert-info" role="alert">
            No existen usuarios
        </div>
    </div>
    <table class="table">
        <thead>
            <tr>
                <th>NOMBRE</th>
                <th>EMAIL</th>
                <th>CIUDAD</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="usuario in usuarios" :key="usuario.id">
                <td v-if="editando == usuario.id">
                    <input type="text" class="form-control" v-model="usuario.name">
                </td>
                <td v-else>{{ usuario.name }}</td>

                <td v-if="editando == usuario.id">
                    <input type="text" class="form-control" v-model="usuario.email">
                </td>
                <td v-else>{{ usuario.email }}</td>

                <td v-if="editando == usuario.id">
                    <input type="text" class="form-control" v-model="usuario.address.city">
                </td>
                <td v-else>{{ usuario.address.city }}</td> 

                <td v-if="editando == usuario.id">
                    <button class="btn btn-success" @click="guardarUsuario(usuario)">Guardar</button>
                    <button class="btn btn-secondary ml-2" @click="cancelarEdicion(usuario)">Cancelar</button>
                </td>
                <td v-else>
                    <button class="btn btn-danger ml-2" @click="$emit('eliminar-usuario', usuario)">💀 Eliminar 💀</button>
                    <button class="btn btn-info" @click="editarUsuario(usuario)">Editar</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>


export default {
    name: 'tabla-usuarios',
    emits:[
        'eliminar-usuario',
        'actualizar-usuario'
    ],
    props: {
        usuarios: Array
    },
    data() {
        return {
            editando: null,
        }
    },
    methods: {
        editarUsuario(usuario) {
            this.usuarioEditado = Object.assign({}, usuario);
            this.editando = usuario.id;
        },
        guardarUsuario(usuario) {
            if (!usuario.name.length || !usuario.email.length || !usuario.address.city.length) {
                return;
            }
            console.table(usuario)
            this.$emit('actualizar-usuario', usuario);
            this.editando = null;
        },
        cancelarEdicion(usuario) {
            Object.assign(usuario, this.usuarioEditado);
            this.editando = null;
        }
    }
}
</script>