<script>
    // User
    import { navigate } from "svelte-routing";
    import { user } from "../user.js";
    let loggedInUser;
    user.subscribe(value => {
        loggedInUser = value;
        if (!(loggedInUser.role.includes("ROLE_ADMIN"))) {
            navigate("/dashboard");
            return;
        } else {
            // Stored Route
            localStorage.setItem('storedRoute', '/adminCampaigns');
        }
    });

    // Sidebar
    import Sidebar from "../lib/Sidebar.svelte";
    let rotated = false;

    // Search Profile Bar
    import SearchProfileBar from "../lib/SearchProfileBar.svelte";

    // Company Campaigns
    import { onMount } from 'svelte';
    import { getAllCampaigns } from "../apis/adminApis.js";
    import { getAllCompanies } from "../apis/adminApis.js"; 
    let campaignList = [];
    let companyList = [];
    let campaignCompanies = [];
    
    onMount(async () => {
        campaignList = await getAllCampaigns();
        companyList = await getAllCompanies();
        for (let i = 0; i < campaignList.length; i++) {
            campaignCompanies.push(companyList.find(company => company._id === campaignList[i].company));
        }
    });
</script>

<style>
    main {
        height: 100vh;
    }
    #main-content-div {
        background-color: #F5F5F9;
    }
    .grid-box {
        border-radius: 6px !important;
        box-shadow: 0px 2px 6px 0px rgba(67, 89, 113, 0.12);
    }
    .table>:not(caption)>*>* {
        padding: 25px 30px !important;
    }
    table {
        border-collapse: separate;
        border-spacing: 0;
        overflow: hidden;
    }
    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    tr:first-child th:first-child {
        border-top-left-radius: 6px;
    }
    tr:first-child th:last-child {
        border-top-right-radius: 6px;
    }
    ::placeholder {
        color: #9fabb9 !important;
        font-size: 15px !important;
        font-weight: 500 !important;
    }
    th {
        vertical-align: middle !important;
    }
    td {
        vertical-align: middle !important;
        padding: 25px 40px !important;
    }
    .badge {
        padding: 5px 10px;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 600;
        padding: 15px 15px;
        line-height: 17.204px; 
        font-style: normal;
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }
    .badge-pending, .badge-scheduled {
        background-color: #FFB8001A;
        color: #FFB800;
    }
    .badge-success {
        background-color: #2BC1551A;
        color: #2BC155;
    }
    .badge-cancel {
        background-color: #9696961A;
        color: #8C8C8C;
    }
</style>

<main class="m-0 p-0">
    <div class="d-flex m-0 p-0" style="height: 100vh;">
        <Sidebar page="adminCampaigns" rotated={rotated} />

        <div class="col-md px-0" id="main-content-div">
            <SearchProfileBar/>
            <div class="d-flex flex-column px-3 pt-1 mx-0 pe-4">
                <table class="table table-hover px-0 grid-box">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Firma</th>
                            <th scope="col">Kampanya Adı</th>
                            <th scope="col">Tarih</th>
                            <th scope="col">Gönderilen Kişi Sayısı</th>
                            <th scope="col">Durumu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each campaignList as campaign, index}
                            <tr>
                                <th scope="row">{index + 1}</th>
                                {#if companyList.length > 0}
                                    <td>{campaignCompanies[index].name}</td>
                                {:else}
                                    <td>Şirket Silinmiş</td>
                                {/if}
                                <td>{campaign.name}</td>
                                <td>{campaign.date.split('T')[0].split('-').reverse().join('.')}</td>
                                <td>{campaign.sentSms}</td>
                                {#if campaign.status === 'pending'}
                                    <td>
                                        <span class="badge badge-pending">Beklemede</span>
                                    </td>
                                {:else if campaign.status === 'sent'}
                                    <td>
                                        <span class="badge badge-success">Gönderildi</span>
                                    </td>
                                {:else if campaign.status === 'canceled'}
                                    <td>
                                        <span class="badge badge-cancel">İptal Edildi</span>
                                    </td>
                                {:else if campaign.status === 'scheduled'}
                                    <td>
                                        <span class="badge badge-scheduled">Zamanlanmış</span>
                                    </td>
                                {/if}
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>