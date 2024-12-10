<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Podsumowanie wyników</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Wyniki</ion-title>
        </ion-toolbar>
      </ion-header>

      <ResultsPage></ResultsPage>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ResultsPage from '@/components/ResultsPage.vue';
</script>
