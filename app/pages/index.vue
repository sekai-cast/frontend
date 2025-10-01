<template>
    <div class="mx-auto flex flex-col gap-5 items-center mt-16">
        <NuxtLink :to="{ name: 'station-uri', params: { uri: 'live' } }">
            <button class="btn-info btn ">Nightcore Radio</button>
        </NuxtLink>

        <NuxtLink :to="{ name: 'station-uri', params: { uri: 'sag' } }">
            <button class="btn-info btn ">Sag Radio</button>
        </NuxtLink>
    </div>

</template>

<script setup lang="ts">

useSeoMeta({ title: "Sekai Cast" })
</script>