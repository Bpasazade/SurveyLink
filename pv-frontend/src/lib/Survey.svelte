<script>

    // Surveys
    import Kampanya2 from "../../public/Kampanya 2.svelte";

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
        console.log(targetUser);
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

    checkUserResponsed(id, campaign).then((res) => {
        userResponsed = res.responsed;
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
{:else if campaign.name === "Kampanya 2" && targetUser != null && !userResponsed}
    <Kampanya2 id={id} campaignId={campaign._id} name={targetUser.name} company={targetUser.company} />
{/if}