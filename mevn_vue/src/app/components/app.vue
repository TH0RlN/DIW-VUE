<template>
    <nav class="navbar navbar-light bg-light">
        <a href="/" class="navbar-brand">Inicio</a>
    </nav>
    <div class="container">
        <div class="row pt-5">
            <div class="col-md-7">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Tarea</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="tarea of tareas" :key="tarea._id">
                            <td>{{ tarea.titulo }}</td>
                            <td>{{ tarea.descripcion }}</td>
                            <td>
                                <button @click="bajarTarea(tarea._id)" class="btn btn-danger">Eliminar</button>
                            </td>
                            <td>
                                <button @click="editarTarea(tarea._id)" class="btn btn-secondary">Editar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-mod-5">
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="altaTarea">
                            <div class="form-group">
                                <input type="text" v-model="tarea.titulo" placeholder="Nueva Tarea" class="form-control">
                            </div>
                            <br>
                            <div class="form-group">
                                <textarea v-model="tarea.descripcion" placeholder="Descripción tarea" cols="30" rows="10"
                                    class="form-control"></textarea>
                            </div>
                            <br>
                            <div class="">
                                <template v-if="editar === false">
                                    <button class="btn btn-primary btn-block">Guardar</button>
                                </template>
                                <template v-else>
                                    <button class="btn btn-primary btn-warning">Actualizar</button>
                                    <button @click="listTareas()" class="btn btn-primary btn-danger">Cancelar</button>
                                </template>
                            </div>
                            <!-- <div class="d-grid gap-2">
                                <button class="btn btn-primary d-md-block">Guardar</button>
                            </div> -->
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

class Tarea {
    constructor(titulo, descripcion) {
        this.titulo = titulo;
        this.descripcion = descripcion;
    }
}

export default {
    data() {
        return {
            tarea: new Tarea(),
            tareas: [],
            editar: false,
            tareaEditarid:''
        }
    },
    created() {
        this.listTareas();
    },
    methods: {
        listTareas() {
            fetch('api/tareas')
                .then(res => res.json())
                .then(data => {
                    this.tareas = data;
                    console.log(this.tareas)
                });
        },
        altaTarea() {
            if(this.editar===false){
                fetch('/api/tareas', {
                method: 'POST',
                body: JSON.stringify(this.tarea),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(this.listTareas())
            }else{
                fetch('/api/tareas/'+this.tareaEditarid,{
                    method:'PUT',
                    body: JSON.stringify(this.tarea),
                    headers:{
                        'Accept': 'application/json',
                        'Content-type':'application/json'
                    }
                })
                .then(res=>res.json())
                .then(data=>{
                    this.listTareas();
                    this.editar=false;
                })
            }
            
            this.tarea = new Tarea()
        },
        bajarTarea(id) {
            fetch('api/tareas/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(this.listTareas())
        },
        editarTarea(id) {
            
            fetch('/api/tareas/' + id)
                .then(res => res.json())
                .then(data => {
                    this.tarea = new Tarea(data.titulo, data.descripcion);
                    this.editar = true;
                    this.tareaEditarid = data._id;
                });
        },
    }
}
</script>