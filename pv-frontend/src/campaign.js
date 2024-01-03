// campaign.js
import { writable } from "svelte/store";

const storedCampaign = writable(null);

export const campaign = {
    subscribe: storedCampaign.subscribe,
    set: (campaign) => {
        storedCampaign.set(campaign);
        localStorage.setItem('campaign', JSON.stringify(campaign));
    },
    update: (campaign) => {
        storedCampaign.update(() => campaign);
        localStorage.setItem('campaign', JSON.stringify(campaign));
    },
    reset: () => {
        storedCampaign.set(null);
        localStorage.removeItem('campaign');
    }
    };