<template>
    <div class="container mx-auto">
        <n-card>
            <div class="text-center mb-20 lg:mb-40">
                <n-h1 class=" text-4xl lg:text-8xl font-bold mb-10 lg:mb-10">PFE Insight</n-h1>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 lg:mx-32 xl:mx-40">
                    <div>
                        <img class="logo" src="../../assets/laravel.png" alt="">
                    </div>
                    <div>
                        <img class="logo" src="../../assets/vue.png" alt="">
                    </div>
                    <div>
                        <img class="logo" src="../../assets/tailwindcss.svg" alt="">
                    </div>
                    <div>
                        <img class="logo" src="../../assets/ts.png" alt="">
                    </div>
                    <div>
                        <img class="logo" src="../../assets/2.png" alt="">
                    </div>
                    <div class="flex items-center justify-center">
                        <img class="logo inline-block" src="../../assets/naive.png" alt=""> <span class="inline-block text-xl font-bold ml-4">NaiveUI</span>
                    </div>
                </div>
            </div>
            <div class="lg:mx-32 xl:mx-60">
                <p class="text-lg">
                    Ce projet est réalisé pour l'université d'Inbtofail par <strong>Benali Mouad</strong>, sous la direction du professeur <strong>Oumaira Ilham</strong>. Le but de ce projet est d'aider l'université à gérer les stages du PFE, et permettre une meilleure interaction entre les étudiants et les professeurs, et permettre à l'administration d'encadrer le processus
                </p>

                <div>
                    <iframe style="border: 1px solid rgba(0, 0, 0, 0.1); width: 100%;" width="800" height="1000" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FiCAfnOEcqbJe66bVAD4zVK%2FUntitled%3Fnode-id%3D0%253A1" allowfullscreen></iframe>
                </div>
            </div>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { NH1, NCard } from 'naive-ui'
import LaravelLogo from '@/assets/laravel.png'

</script>

<style scoped>
.logo{
    max-width: 100%;
    max-height: 50px;
    object-fit: contain;
}
</style>