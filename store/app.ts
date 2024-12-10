export const useAppStore = defineStore(
  "app-store",
  () => {
    const count = ref(0);

    return {
      count,
    };
  },
  {
    persist: {
      pick: ['count'],
    },
  }
);
