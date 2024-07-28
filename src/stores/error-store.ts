import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ErrorApi } from '@/interfaces/error-api';

export const useErrorStore = defineStore('error', () => {
  const errorApi = ref<ErrorApi>();
  function setErroApi(newErroApi: ErrorApi) {
    errorApi.value = newErroApi;
  }
  return { errorApi, setErroApi };
});
