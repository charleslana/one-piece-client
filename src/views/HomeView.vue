<script setup lang="ts">
import BoxComponent from '@/components/BoxComponent.vue';
import TitleComponent from '@/components/TitleComponent.vue';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import PageTemplate from '@/templates/PageTemplate.vue';
</script>

<template>
  <PageTemplate type="off">
    <template #wrapper-container>
      <div class="columns">
        <div class="column is-6">
          <TitleComponent title="Bem vindo" />
          <Carousel
            :items-to-show="1.5"
            :autoplay="3000"
            :wrap-around="true"
            pause-autoplay-on-hover
          >
            <Slide v-for="slide in 10" :key="slide">
              <div>
                <img src="../assets/images/home/1.png" alt="Screenshot image" />
                <BoxComponent
                  message="Você vai interagir com os personagens mais conhecidos do mundo One Piece, até aprender com eles."
                />
              </div>
            </Slide>
            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
        </div>
        <div class="column is-6">
          <p class="is-size-3">Entre no mundo de One Piece!</p>
          <p>
            Esse é o site do OPLife, jogo com temática de One Piece, onde você cria um personagem
            para viver nesse mundo aberto cheio de opções a seguir. Divirta-se!
          </p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-6">
          <TitleComponent title="Sobre o jogo" />
          <BoxComponent
            message="One Piece Life é um jogo de RPG Web, ou seja, um roleplaying game para browser, você joga pelo navegador de sua preferência na plataforma que desejar (PC, Notebook, Celular, etc). Você vai criar um personagem do jeito que desejar e participar com outros jogadores de desafios no mundo de One Piece, evoluindo seus poderes para ser o mais forte e quem sabe até conhecer Luffy e seus tripulantes. Um jogo feito de fã para fã, onde você vai ver muitas referências ao anime, lutar contra personagens famosos, e fazer novos amigos. Divirta-se!"
          />
        </div>
        <div class="column is-6">
          <TitleComponent title="Comunidade" />
          <BoxComponent
            message="Visite nosso Discord para fazer parte dessa comunidade que cresce a cada dia, e para ficar por dentro das novidades, eventos, promoções, tudo relacionado ao jogo."
          />
        </div>
      </div>
    </template>
  </PageTemplate>
</template>

<style scoped></style>
