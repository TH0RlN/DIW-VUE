<template>
    <div id="formulario-usuario">
        <form @submit.prevent="enviarFormulario">
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Nombre</label>
                            <input type="text" ref="name" v-model="usuario.name" class="form-control"
                                :class="{ 'is-invalid': procesando && nameInvalido }" @focus="resetEstado"
                                @keypress="resetEstado">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Email</label>
                            <input type="text" ref="name" v-model="usuario.email" class="form-control"
                                :class="{ 'is-invalid': procesando && emailInvalido }" @focus="resetEstado"
                                @keypress="resetEstado">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Ciudad</label>
                            <input type="text" ref="name" v-model="usuario.address.city" class="form-control"
                                :class="{ 'is-invalid': procesando && ciudadInvalida }" @focus="resetEstado"
                                @keypress="resetEstado">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <button class="btn btn-primary" >Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div v-if="error && procesando" class="alert alert-danger" role="alert">
                            Debes rellenar todos los campos
                        </div>
                        <div v-if="correcto" class="alert alert-success" role="alert">
                            Usuario agregado correctamente
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'formulario-usuario',
    emits:[
        'crear-usuario',
    ],
    data() {
        return {
            procesando: false,
            correcto: false,
            error: false,
            usuario: {
                name: '',
                email: '',
                address: {
                    city: ''
                }
            }

        }
    },
    methods: {
        enviarFormulario() {
            this.procesando = true;
            this.resetEstado();

            if (this.nameInvalido || this.emailInvalido || this.ciudadInvalida) {
                this.error = true;
                return;
            }

            this.$emit('crear-usuario', this.usuario);
            this.$refs.name.focus();
            this.error = false;
            this.correcto = true;
            this.procesando = false;

            this.usuario = {
                name: '',
                email: '',
                address: {
                    city: ''
                }
            }
        },
        resetEstado() {
            this.correcto = false;
            this.error = false;
        }
    },
    computed: {
        nameInvalido() {
            return this.usuario.name.length < 1
        },
        emailInvalido() {
            return this.usuario.email.length < 1
        },
        ciudadInvalida() {
            return this.usuario.address.city.length < 1
        }
    }
}
</script>