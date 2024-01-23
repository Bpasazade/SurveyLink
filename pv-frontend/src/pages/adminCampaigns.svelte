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
    .userCampaignsDiv1 {
        border-radius: 8px; 
        color: #697A8D; 
        font-size: 14px; 
        font-weight: 500; 
        background-color: #F8F8F8; 
        padding: 12px;
        border: none;
        widows: max-content !important;
    }
    .accordion-button {
        background-color: #FFFFFF !important;
        color: #697A8D !important;
        font-size: 15px !important;
        font-weight: 600 !important;
        border: none !important;
    }
    .accordion-button > i {
        color: #697A8D !important;
        font-size: 24px !important;
    }
    .accordion-button > img {
        width: 24px;
    }
    /* initially set all accordion buttons to collapsed */
    .accordion-button::after {
        background-image: url("../assets/plus-accordion.svg") !important;
        transform: none;
    }
    /* set the accordion button to expanded when the accordion is open */
    .accordion-button:not(.collapsed)::after {
        background-image: url("../assets/minus-accordion.svg") !important;
        transform: rotate(90deg);
    }
    input {
        border: 1px solid #EBE9F1 !important;
        border-radius: 10px !important;
        font-size: 17px !important;
        font-weight: 600 !important;
    }
    ::placeholder {
        color: #9fabb9 !important;
        font-size: 15px !important;
        font-weight: 500 !important;
    }
    textarea {
        border: 1px solid #EBE9F1 !important;
        border-radius: 10px !important;
        font-size: 17px !important;
        font-weight: 600 !important;
    }
    .btn-accordion {
        padding-top: 13px !important;
        padding-bottom: 13px !important;
        padding-left: 15px !important;
        padding-right: 15px !important;
    }
    input[type="text"] {
        height: 50px !important;
        padding-left: 15px !important;
        padding-top: 10px !important;
    }
    textarea {
        padding-left: 15px !important;
        padding-top: 10px !important;
    }
    select {
        height: 50px !important;
        border: 1px solid #EBE9F1 !important;
        border-radius: 10px !important;
    }
    /* color black selected option */
    .form-select option {
        color: black;
    }
    #campaign-form-group::-webkit-scrollbar {
        display: none;  /* Safari and Chrome */
    }
    #campaign-form-group {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
        overflow-y: scroll;
    }
    .switch-button {
        width: 325px;
        height: 40px;
        text-align: center;
        will-change: transform;
        z-index: 197 !important;
        cursor: pointer;
        transition: 0.3s ease all;
        border-radius: 45px;
        background: #FFF;
    }
    .switch-button-case {
        display: inline-block;
        background: none;
        width: max-content;
        height: 100%;
        color: black;
        position: relative;
        border: none;
        transition: 0.3s ease all;
        border-radius: 45px;
        font-size: 14px !important;
    }
    .switch-button .active {
        color: white;
        background-color: #04A3DA;
        position: absolute;
        top: 0;
        width: 50%;
        height: 100%;
        z-index: -1;
        transition: 0.3s ease-out all;
        border-radius: 45px;
    }
    .switch-button .active-case {
        color: white;
    }
    input[type=file] {
        color: black;
        font-size: 15px !important;
        margin-bottom: 0px !important;
        align-items: center !important;
        vertical-align: middle !important;
        padding-left: 15px !important;
        padding-right: 15px !important;
        padding-top: 5px !important;
        padding-bottom: 5px !important;
    }
    input[type=file]::-webkit-file-upload-button {
        height: 50px !important;
        background-color: white !important;

    }
    .form-group {
        position: relative;
    }
    .form-group > label {
        position: absolute;
        top: -11px;
        left: 15px;
        padding: 2px;
        z-index: 1;
        color: #16b0e4 !important;
        font-weight: 600;
        line-height: normal;
        background-color: white;
        font-size: 14px;
    }
    .form-group label:after {
        color: #04A3DA !important;
    }
    .createdGroup {
        font-size: 15px;
        font-weight: 400;
        border-radius: 15px;
        border: 1px dashed #04A3DA;
        background: #FFF;
        padding: 10px 20px;
        color: #697A8D;
    }
    .active-button {
        background-color: #697A8D !important;
        color: white !important;
    }
    .active-button > i {
        color: white !important;
    }
    .active-button > svg > path {
        fill: white !important;
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
                                    <td>{campaign.date}</td>
                                    <td>{campaign.sentPersonCount}</td>
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