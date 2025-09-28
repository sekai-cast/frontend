<template>

    <div class="select-none mx-auto w-full h-full flex flex-col items-center pt-4">
        <h1 class="mb-10">Radio NightCore</h1>
        <div>Music: <span>{{ musicName }}</span></div>
        <div>Listiner Count: <span>{{ listenersCount }}</span></div>

        <div class="divider px-16"></div>

        <button class="cursor-pointer" @click="actionBtn">
            <Icon v-show="isPlaying == false && isLoading == false" name="material-symbols-light:play-arrow-rounded" />
            <span v-if="isLoading" class="loading loading-dots loading-md"></span>
            <Icon v-show="isPlaying == true" name="material-symbols-light:pause-rounded" />
        </button>

    </div>
    <div class=" fixed bottom-0 inset-x-0 pb-10 flex items-center justify-center flex-col">
        <div class="text-2xl">

            <span>Developed By <NuxtLink class="text-warning" to="https://github.com/alix1383">Alix</NuxtLink>
                With</span>
            <Icon class="text-red-600 ml-1" name="line-md:heart-filled" size="26px" />
        </div>
        <div class="text-xs">Project Link : <NuxtLink class="text-warning" to="https://github.com/sekai-cast">Sekai Cast
            </NuxtLink>
        </div>
        <div class="text-xs">Version: 0.0.0.alpha </div>
    </div>

</template>

<script setup lang="ts">
interface Source {
    audio_info: string;
    bitrate: number;
    channels: number;
    genre: string;
    listener_peak: number;
    listeners: number;
    listenurl: string;
    samplerate: number;
    server_description: string;
    server_name: string;
    server_type: string;
    server_url: string;
    stream_start: string;
    stream_start_iso8601: string;
    title: string;
    dummy: null | any;
}

interface ServerInfo {
    admin: string;
    host: string;
    location: string;
    server_id: string;
    server_start: string;
    server_start_iso8601: string;
    source: Source;
}




const appConfig = useAppConfig()


const radio = new Audio()

radio.volume = 1
appConfig.icon.size = '60px'

const isPlaying = ref(false)
const btnProtect = ref(false)
const isLoading = ref(false)

const musicName = ref('')
const listenersCount = ref(0)

getData()

setInterval(() => {
    getData()
}, 2000)



document.addEventListener('keydown', function (e) {
    if (e.key == 'MediaPlayPause') actionBtn();
});

function actionBtn() {
    if (btnProtect.value) return

    if (isPlaying.value == true) {
        radio.pause();

        isPlaying.value = false
        radio.src = ''
    } else {
        radio.src = 'https://station.nightcore.ir/live'

        isLoading.value = true
        radio.play().then(() => {
            btnProtect.value = false
            isLoading.value = false
            isPlaying.value = true
        });


    }
}

async function getData() {
    const data: any = await $fetch('https://station.nightcore.ir/status-json.xsl') as ServerInfo;
    const serverData = data['icestats'] as ServerInfo;

    musicName.value = serverData.source.title;
    listenersCount.value = serverData.source.listeners

    useSeoMeta({ title: `Radio NighCore | ${musicName.value}` })
}
</script>