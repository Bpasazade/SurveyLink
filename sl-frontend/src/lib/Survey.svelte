<script lang="ts">
    import { onMount } from "svelte";

    // surveys
    const componentFiles = import.meta.glob('/public/*.svelte');
    let components = [];
    
    onMount(async () => {
        const importPromises = Object.entries(componentFiles).map(async ([path, importer]) => {
            const { default: component }: { default: any } = await importer() as any;
            return { path, component };
        });

        components = await Promise.all(importPromises);

        // filter components by name. Filter is companyId
        components = components.filter(component => component.path.includes(campaign.name));
        console.log(components);
    });


    // Stored Route
    localStorage.setItem('storedRoute', '/survey');

    // Lib
    import { checkUserResponsed } from "../apis/target.user.apis";

    // Campaign
    import { getCampaignById } from "../apis/userApis";
    async function loadCampaign() {
        campaign = await getCampaignById(campaign);
    }

    // Target User
    import { getTargetUser } from "../apis/userApis";
    async function loadTargetUser() {
        targetUser = await getTargetUser(id);
    }

    let id, campaign, targetUser, userResponsed;

    const urlParams = Object.fromEntries((new URLSearchParams(window.location.search)).entries());
    if (Object.keys(urlParams).length !== 0) {
        const split = Object.keys(urlParams)[0].split('/');
        campaign = split[0];
        id = split[1];

        loadCampaign();
        loadTargetUser();
    }

    onMount(() => {
        checkUserResponsed(id, campaign).then((res) => {
            userResponsed = res.responsed;
        });
    });
    
</script>

{#if Object.keys(urlParams).length === 0 || campaign === undefined || targetUser === undefined}
    <div>
        <h1 class="text">404 Not Found</h1>
    </div>
{:else if userResponsed}
    <div>
        <h1 class="text-center">Katılımınız için teşekkür ederiz.</h1>
    </div>
{:else if targetUser != null && !userResponsed && campaign != null && components.length > 0}
    <svelte:component this={components[0].component} 
        id={id} 
        campaignId={campaign._id} 
        name={targetUser.name} 
        company={targetUser.company} />
{/if}