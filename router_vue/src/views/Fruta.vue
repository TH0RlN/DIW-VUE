<template>
    <div class="row">
        <div class="col-md-12">
            <h4>Fruta del día</h4>
        </div>
        <div class="col-md-6">
            <p>Fruta id: {{ $route.params.id }}</p>
            <p>Producto: {{ $route.params.producto }}</p>
            <p>Precio: {{ $route.params.precio }}</p>
        </div>
        <router-link to="/articulos">&lt;&lt; Volver</router-link>
    </div>
</template>