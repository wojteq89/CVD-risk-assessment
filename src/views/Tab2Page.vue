<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Podsumowanie wyników</ion-title>
        <button id="go-back-button" @click="goBack">Wróć</button>
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
  import { useRouter } from 'vue-router';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import ResultsPage from '@/components/ResultsPage.vue';


  const router = useRouter();

  function goBack() {
    router.push('/tabs/tab1');
  }
</script>

<style>
  #go-back-button {
      position: absolute;
      right: 20px;
      top: 8px;
      width: 100px;
      height: 40px;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0 0 5px transparent;
      transition: all 0.3s ease-in-out;
  }

  #go-back-button:hover {
      box-shadow: 0 0 5px rgba(255, 165, 0, 0.7);
      background-color: orange;
      color: black;
  }
</style>