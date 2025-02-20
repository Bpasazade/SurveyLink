<script lang="ts">
    // Page Route
    localStorage.setItem('storedRoute', 'kampanyalar');

    // User
    import { user } from "../user.js";
    let loggedInUser;

    user.subscribe((value) => {
        loggedInUser = value;
    });

    // Sidebar
    import Sidebar from "../lib/Sidebar.svelte";
    let rotated = false;

    // Search Profile Bar
    import SearchProfileBar from "../lib/SearchProfileBar.svelte";

    // Main content
    import preview from "../assets/preview.svg";
    import phone from "../assets/campaigns2/phone.png";
    import trashCan from "../assets/trash-can.svg"; 
    
    // Switch button
    let activeSwitchStyle = { left: '0%' };

    function switchLeft() {
        activeSwitchStyle = { left: '0%' };
        document.getElementById('left-switch-span').style.display = 'block';
        document.getElementById('right-switch-span').style.display = 'none';
    }

    function switchRight() {
        activeSwitchStyle = { left: '50%' };
        document.getElementById('left-switch-span').style.display = 'none';
        document.getElementById('right-switch-span').style.display = 'block';
    } 

    // Group
    import { createGroup } from '../apis/userApis.js';
    import { getGroups } from '../apis/userApis.js';
    import { onMount } from "svelte";

    var groupName = '';
    let createdGroupList = [];
    async function createGroupHandler() {
        await createGroup(groupName, loggedInUser.company);
        getGroupsHandler();
        createdGroupList = [...createdGroupList, groupName];
        groupName = '';
    }

    async function getGroupsHandler() {
        const response = await getGroups(loggedInUser.company);
        groupList = response;
    }

    let groupList = [];


    // Target User List
    import { getCompanyTargetList } from '../apis/userApis.js';
    let targetUserList = [];

    async function getCompanyTargetListHandler() {
        const response = await getCompanyTargetList(loggedInUser.company);
        targetUserList = response;
    }

    onMount(async () => {
        await getGroupsHandler();
        await getCompanyTargetListHandler();
    });

    let selection = 'campaigns-table';
    let newCampaignButton = false;
    let editCampaignButton = false;

    function toggle(button) {
        if (button === 'new-campaign-button') {
            if (newCampaignButton) {
                newCampaignButton = false;
                selection = 'campaigns-table';
            } else {
                newCampaignButton = true;
                selection = 'new-campaigns';
            }
            editCampaignButton = false;
        } else if (button === 'edit-campaign-button') {
            if (editCampaignButton) {
                editCampaignButton = false;
                selection = 'campaigns-table';
            } else {
                editCampaignButton = true;
                selection = 'edit-campaigns';
            }
            newCampaignButton = false;
        }
    }

    let currentGroupButton;
    let isCurrentGroupButtonActive = false;
    function toggleCurrentGroupButton() {
        currentGroupButton = isCurrentGroupButtonActive ? '' : 'active-button';
        isCurrentGroupButtonActive = !isCurrentGroupButtonActive;
    }

    // Campaign
    import { createCampaign } from '../apis/userApis.js';
    import { updateCampaign } from '../apis/userApis.js';
    import { deleteCampaign } from "../apis/userApis.js";
    let selectedTemplateName = '';
    let campaignName = '';
    let campaignDescription = '';

    let selectedIndexes = [];
    let selectedGroupList = [];
    function handleCheckboxChange(index) {
        // Check if the checkbox is checked or unchecked
        const isChecked = selectedIndexes.includes(index);
        
        // Update the selectedIndexes array based on the checkbox state
        if (isChecked) {
            selectedIndexes = selectedIndexes.filter(i => i !== index);
            selectedGroupList = selectedGroupList.filter((group, i) => i !== index);
        } else {
            selectedIndexes = [...selectedIndexes, index];
            selectedGroupList.push(groupList.filter((group, index) => selectedIndexes.includes(index)));
            console.log(selectedGroupList);            
        }
    }

    async function createCampaignHandler(event) {
        selectedGroupList = groupList.filter((group, index) => selectedIndexes.includes(index));
        const response = await createCampaign(selectedTemplateName, campaignName, campaignDescription, loggedInUser.company, selectedGroupList);
        // check if any file is uploaded
        if (excelFile) {
            uploadFile();
        }
        if (response) {
            window.location.reload();
        }
    }

    let campaignId = '';
    let editedCampaignName = '';
    let editedCampaignDescription = '';
    async function updateCampaignHandler() {
        console.log(selectedGroupList);
        const response = await updateCampaign(campaignId, editedCampaignName, editedCampaignDescription, loggedInUser.company, selectedGroupList);
        if (response) {
            window.location.reload();
        }
    }

    // Company Campaigns
    import { getCompanyCampaigns } from '../apis/userApis.js';
    let campaignList = [];

    async function getCompanyCampaignsHandler() {
        const response = await getCompanyCampaigns(loggedInUser.company);
        campaignList = response;
    }
    getCompanyCampaignsHandler();

    let campaignSelection = '';
    let selectedCampaign;
    $: if (campaignSelection) {
        selectedCampaign = campaignList.find(campaign => campaign._id === campaignSelection);
        editedCampaignName = selectedCampaign.name;
        editedCampaignDescription = selectedCampaign.description;
        campaignId = selectedCampaign._id;
    }

    // Campaigns Inspect Table
    import { campaign } from '../campaign.js';
    function inspectCampaign(event) {
        const rowIndex = event.target.closest('tr').getAttribute('data-index');
        const selectedCampaign = campaignList[rowIndex];
        campaign.set(selectedCampaign);
        navigate('/kampanya-analizi');
    }

    // Campaigns Table Edit
    function editCampaignTable(event) {
        const index = event.target.closest('tr').getAttribute('data-index');
        campaignSelection = campaignList[index]._id;
        toggle('edit-campaign-button');
    }

    // Campaigns Delete
    import DeleteCampaignModal from "../lib/DeleteCampaignModal.svelte";

    // Excel File Upload
    import { uploadExcelFile } from "../apis/userApis";
    import { navigate } from "svelte-routing";

    let excelFile = null;
    let selectedGroup;
    
    function handleFileUpload(event) {
        excelFile = event.target.files[0];
    }

    function uploadFile() {
        uploadExcelFile(excelFile, loggedInUser.company, selectedGroup);
    }

    // Campaigns Template
    const componentFiles = import.meta.glob('../components/*.svelte');
    let components = [];
    
    onMount(async () => {
        const importPromises = Object.entries(componentFiles).map(async ([path, importer]) => {
            const { default: component }: { default: any } = await importer() as any;
            return { path, component };
        });

        components = await Promise.all(importPromises);

        // filter components by name. Filter is companyId
        components = components.filter(component => component.path.includes(loggedInUser.company));
        //await getCampaignSentSmsHandler();
    });

    let selectedTemplate;
    var selectedTemplateComponent = null;
    $: if (selectedTemplate) {
        selectedTemplateComponent = components.find(component => component.path === selectedTemplate);
        selectedTemplateName = selectedTemplate;
    }

    $: if (selectedCampaign) {
        console.log(selectedCampaign);
        selectedTemplateComponent = components.find(component => component.path === selectedCampaign.templateName);
        selectedTemplateName = selectedCampaign.template;
        selectedGroupList = selectedCampaign.groups;        
    }

    // Get Campaign Sent Sms
    import { getCampaignSentSms } from '../apis/userApis.js';
    async function getCampaignSentSmsHandler() {
        for (let i = 0; i < campaignList.length; i++) {
            const response = await getCampaignSentSms(campaignList[i]._id);
            campaignList[i].sentSms = response;
        }
    }
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
    td {
        vertical-align: middle !important;
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
    input {
        border: 1px solid #EBE9F1 !important;
        border-radius: 10px !important;
        font-size: 15px !important;
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
        padding-left: 17px !important;
        padding-top: 10px !important;
    }
    textarea {
        padding-left: 16px !important;
        padding-top: 10px !important;
        font-size: 15px !important;
        font-weight: 500 !important;
    }
    select {
        height: 50px !important;
        border: 1px solid #EBE9F1 !important;
        padding-left: 16px !important;
        border-radius: 10px !important;
        font-size: 15px !important;
        font-weight: 600 !important;
    }
    /* color black selected option */
    .form-select option {
        color: black;
    }
    .campaign-form-group::-webkit-scrollbar {
        display: none;  /* Safari and Chrome */
    }
    .campaign-form-group {
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
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;
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
    .rounded-phone {
        border-radius: 45px !important;
        box-shadow: 0px 2px 6px 0px rgba(67, 89, 113, 0.12) !important;
    }
</style>

<DeleteCampaignModal campaign={selectedCampaign} />

<main class="m-0 p-0">
    <div class="d-flex m-0 p-0" style="height: 100vh;">
        <Sidebar page="userCampaigns2" rotated={rotated} />

        <div class="col-md px-0" id="main-content-div">
            <SearchProfileBar/>
            <div class="d-flex flex-column px-3 pt-1 mx-0 pe-4">
                <div class="col-md-12 p-4 bg-white rounded mb-4 grid-box d-flex justify-content-start align-items-center">
                    <div>
                        <button
                            class="btn align-items-center me-2 px-3 userCampaignsDiv1 {newCampaignButton ? 'active-button' : ''}"
                            type="button"
                            style="display: inline-flex;"
                            on:click={() => toggle("new-campaign-button")}>
                            <i class='bx bxs-collection me-2' style="font-size: 22px;"></i>
                            Yeni Kampanya Ekle
                        </button>

                        <button
                            class="btn align-items-center me-2 px-3 userCampaignsDiv1 {editCampaignButton ? 'active-button' : ''}"
                            type="button"
                            on:click={() => toggle("edit-campaign-button")}>
                            <svg class="me-2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <path d="M12.8752 1.00024H3.2921C2.02546 1.00024 1.00049 2.02522 1.00049 3.29186V16.2082C1.00049 17.4749 2.02546 18.4998 3.2921 18.4998H9.44195L9.62528 17.4749C9.70862 17.0082 9.92528 16.5915 10.2586 16.2499L15.1668 11.35V3.29186C15.1668 2.02522 14.1418 1.00024 12.8752 1.00024ZM4.33374 4.3335H7.667C8.12532 4.3335 8.50031 4.70849 8.50031 5.16681C8.50031 5.62513 8.12532 6.00013 7.667 6.00013H4.33374C3.87542 6.00013 3.50043 5.62513 3.50043 5.16681C3.50043 4.70849 3.87542 4.3335 4.33374 4.3335ZM8.50031 12.6666H4.33374C3.87542 12.6666 3.50043 12.2916 3.50043 11.8333C3.50043 11.375 3.87542 11 4.33374 11H8.50031C8.95863 11 9.33362 11.375 9.33362 11.8333C9.33362 12.2916 8.95863 12.6666 8.50031 12.6666ZM11.8336 9.33338H4.33374C3.87542 9.33338 3.50043 8.95839 3.50043 8.50007C3.50043 8.04174 3.87542 7.66675 4.33374 7.66675H11.8336C12.2919 7.66675 12.6669 8.04174 12.6669 8.50007C12.6669 8.95839 12.2919 9.33338 11.8336 9.33338Z" fill="#697A8D"/>
                                <path d="M11.4401 20.9997C11.2759 20.9997 11.1159 20.9347 10.9984 20.8164C10.8543 20.6723 10.7893 20.4673 10.8251 20.2656L11.2668 17.7615C11.2884 17.6357 11.3501 17.519 11.4401 17.4282L17.6274 11.2416C18.3874 10.48 19.1341 10.6858 19.5424 11.0941L20.5732 12.125C21.1424 12.6933 21.1424 13.6183 20.5732 14.1874L14.3859 20.3748C14.2959 20.4656 14.1792 20.5264 14.0525 20.5481L11.5484 20.9897C11.5126 20.9964 11.4759 20.9997 11.4401 20.9997Z" fill="#697A8D"/>
                            </svg>
                            Kampanya Düzenle
                        </button>
                    </div>
                </div>

                {#if selection === 'campaigns-table'}
                    <table class="table table-hover px-0 grid-box">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Kampanya Adı</th>
                                <th scope="col">Tarih</th>
                                <th scope="col">Gönderilen Kişi Sayısı</th>
                                <th scope="col">Durumu</th>
                                <th scope="col">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#if campaignList.length === 0}
                                <tr>
                                    <td colspan="6" class="text-center">Henüz kampanya oluşturulmamış.</td>
                                </tr>
                            {:else}
                            {#each campaignList as campaign, index}
                                <tr data-index={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{campaign.name}</td>
                                    <td>{campaign.date.split('-').reverse().join('.')}</td>
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
                                    <td>
                                        <button class="btn me-1 p-0" type="button" style="border: none;" on:click={inspectCampaign}>
                                            <img src={preview} alt="edit" width="24"/>
                                        </button>

                                        <button class="btn p-0 align-items-center" type="button" style="display: inline-flex; border: none;" on:click={editCampaignTable}>
                                            <i class='bx bxs-message-square-edit' style="font-size: 24px; color: #267BC0;"></i>
                                        </button>

                                        <button class="btn p-0 align-items-center" type="button" style="display: inline-flex; border: none;" data-bs-toggle="modal" data-bs-target="#deleteCampaignModal" on:click={() => campaignSelection = campaign._id}>
                                            <img src="{ trashCan }" alt="trashCan" width="24" />
                                        </button>
                                    </td>
                                </tr>
                            {/each}
                            {/if}
                        </tbody>
                    </table>
                {:else if selection === 'new-campaigns'}
                    <div class="row d-flex justify-content-between align-items-center g-0" style="position:relative;">
                        <div class="d-flex flex-column justify-content-start campaign-form-group me-3" style="width: 75%; height: 72.5vh;">                                
                                <div id="campaign-information-panel" class="accordion-collapse collapse show bg-white rounded px-4 grid-box" data-bs-parent="#campaign-information-panel-top">
                                    <div class="accordion-body pt-2">
                                        <div class="d-flex align-items-center py-3" style="color: grey;">
                                            <i class='bx bx-collection me-2' style="font-size: 24px"></i>
                                            Kampanya Bilgileri
                                        </div>
                                        <hr class="m-0 p-0 pt-3" style="color: #b8b5bf; height: 2px;"/>
                                        <div class="my-3">
                                            <div class="form-group mb-4">
                                                <label for="campaingTemplate">Kampanya Şablonu Seçiniz</label>
                                                <select class="form-select shadow-none" aria-label="" bind:value={selectedTemplate}>
                                                    <option selected value="1">Şablon Seçiniz</option>
                                                    {#each components as { path }}
                                                        {#if path.includes('_')}
                                                            <option value={path}>{path.split('_')[1].split('.')[0]} Şablonu</option>
                                                        {/if}
                                                    {/each}
                                                </select>
                                            </div>
                                            <div class="form-group mb-4">
                                                <label for="campaingName">Kampanya Adı</label>
                                                <input type="text" class="form-control shadow-none" id="campaingName" placeholder="Lütfen Kampanya Adını Giriniz" bind:value={campaignName}>
                                            </div>
                                            <div class="form-group mb-4">
                                                <label for="campaingDescription">Kampanya Açıklaması</label>
                                                <textarea class="form-control shadow-none" placeholder="Lütfen Kampanya Açıklamasını Girin" id="campaingDescription" style="height: 100px; resize: none;" bind:value={campaignDescription}></textarea>
                                            </div>
                                            <div class="d-flex justify-content-end w-100">
                                                <button class="btn btn-accordion d-flex align-items-center" type="button" style="background-color: #04A3DA; color: white;" on:click={createCampaignHandler}>
                                                    <span class="me-2">Kaydet</span>
                                                    <i class='bx bx-check-double mb-0' style="font-size: 24px;"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <div class="bg-white grid-box d-flex flex-column justify-content-between align-items-center rounded-phone" 
                                style="width: 20%; position:absolute; top: 0; right: 0; margin-right: 2%;">
                                <div class="w-100 d-flex justify-content-center" style="height: fit-content; width:fit-content; position:relative;">
                                    <img src="{phone}" class="" alt="phone" width="100%" height="auto"/>
                                    {#if selectedTemplateComponent}
                                    <div class="position-absolute" style="top: 0; left: 0; width: 100%; height: 100%;">
                                        <svelte:component this={selectedTemplateComponent.component} />
                                    </div>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    </div>

                {:else if selection === 'edit-campaigns'}
                    <div class="row d-flex justify-content-between align-items-center g-0" style="position:relative;">
                        <div class="form-group">
                            <label for="campaignSelection" class="col-md-3 col-form-label" style="background-color: transparent !important;">Kampanya Seçiniz</label>
                            <select class="form-select shadow-none col-md-3 mb-4" aria-label="Default select example" bind:value={campaignSelection}>
                                <option selected value="">Lütfen Kampanya Seçiniz</option>
                                {#each campaignList as campaign}
                                    <option value={campaign._id}>{campaign.name}</option>
                                {/each}
                            </select>
                        </div>
                        
                        {#if campaignSelection !== ''}
                            <div class="row d-flex justify-content-between align-items-center g-0" style="position:relative;">
                                <div class="d-flex flex-column justify-content-start campaign-form-group me-3" style="width: 75%; height: 64vh;">
                                    <div id="campaign-information-panel" class="accordion-collapse collapse show bg-white rounded px-4 grid-box" data-bs-parent="#campaign-information-panel-top">
                                        <div class="accordion-body pt-2">
                                            <div class="d-flex align-items-center py-3" style="color: grey;">
                                                <i class='bx bx-collection me-2' style="font-size: 24px"></i>
                                                Kampanya Bilgileri
                                            </div>
                                            <hr class="m-0 p-0 pt-3" style="color: #b8b5bf; height: 2px;"/>
                                            <div class="my-3">
                                                <div class="form-group mb-4">
                                                    <label for="campaingTemplate">Kampanya Şablonu Seçiniz</label>
                                                    <select class="form-select shadow-none" aria-label="" bind:value={selectedTemplate}>
                                                        <option selected value="1">Şablon Seçiniz</option>
                                                        {#each components as { path }}
                                                            {#if path.includes('_')}
                                                                <option value={path}>{path.split('_')[1].split('.')[0]} Şablonu</option>
                                                            {/if}
                                                        {/each}
                                                    </select>
                                                </div>
                                                <div class="form-group mb-4">
                                                    <label for="campaingName">Kampanya Adı</label>
                                                    <input type="text" class="form-control shadow-none" id="editCampaingName" placeholder="Lütfen Kampanya Adını Giriniz" bind:value={selectedCampaign.name}>
                                                </div>
                                                <div class="form-group mb-4">
                                                    <label for="campaingDescription">Kampanya Açıklaması</label>
                                                    <textarea class="form-control shadow-none" placeholder="Lütfen Kampanya Açıklamasını Girin" id="editCampaingDescription" style="height: 100px; resize: none;" bind:value={selectedCampaign.description}></textarea>
                                                </div>
                                                <div class="d-flex justify-content-end w-100">
                                                    <button class="btn btn-accordion d-flex align-items-center" type="button" style="background-color: #04A3DA; color: white;" on:click={updateCampaignHandler}>
                                                        <span class="me-2">Kaydet</span>
                                                        <i class='bx bx-check-double mb-0' style="font-size: 24px;"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-white grid-box d-flex flex-column justify-content-between align-items-center rounded-phone" 
                                        style="width: 20%; position:absolute; top: 0; right: 0; margin-right: 2%;">
                                        <div class="w-100 d-flex justify-content-center" style="height: fit-content; width:fit-content; position:relative;">
                                            <img src="{phone}" class="" alt="phone" width="100%" height="auto"/>
                                            {#if selectedTemplateComponent}
                                            <div class="position-absolute" style="top: 0; left: 0; width: 100%; height: 100%;">
                                                <svelte:component this={selectedTemplateComponent.component} />
                                            </div>
                                            {/if}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {:else}
                            <div class="d-flex justify-content-center align-items-center" style="width: 100%;">
                                {#if campaignSelection === ''}
                                    <span class="text-center">Lütfen Kampanya Seçiniz</span>
                                {:else}
                                    <span class="text-center">Kampanya Bulunamadı</span>
                                {/if}
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>
        </div>
    </div>
</main>