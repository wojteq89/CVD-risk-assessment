<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Nowe normy</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Tab 1</ion-title>
          </ion-toolbar>
        </ion-header>
        
        <NewestNormsPage></NewestNormsPage>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import NewestNormsPage from '@/components/NewestNormsPage.vue';
  </script>
  