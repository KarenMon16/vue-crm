// src/store.js
import { defineStore } from 'pinia';

export const useSellerStore = defineStore('seller', {
    state: () => ({
        selectedSellerId: localStorage.getItem('selectedSellerId') || null,
    }),
    actions: {
        setSelectedSellerId(id) {
            this.selectedSellerId = id;
            localStorage.setItem('selectedSellerId', id);
        }
    }
});
