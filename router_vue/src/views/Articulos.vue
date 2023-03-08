<template>
    <div class="row">
        <div class="col-md-12">
            <h3>Articulos a la venta</h3>
            <p v-for="articulo in articulos" :key="articulo.id">
                <router-link :to="{
                    name: 'Fruta',
                    params: { id: articulo.id, producto: articulo.producto, precio: articulo.precio }
                }">
                ({{ articulo.id }}) {{ articulo.producto}}
                </router-link>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            articulos: [
                { id: 1, producto: 'naranjas', precio: '1.25' },
                { id: 2, producto: 'peras', precio: '1.19' },
                { id: 3, producto: 'plátanos', precio: '2.25' },
                { id: 4, producto: 'mandarinas', precio: '0.99' },
            ]
        }
    },
    name: "Articulos"
}
</script>