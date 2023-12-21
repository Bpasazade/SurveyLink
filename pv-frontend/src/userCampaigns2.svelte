<script>
    localStorage.setItem('storedRoute', 'userCampaigns2');
    // Sidebar
    import Sidebar from "./lib/Sidebar.svelte";

    // Lib
    import SearchProfileBar from "./lib/SearchProfileBar.svelte";

    // Main content
    import edit from "./assets/edit.svg";
    import preview from "./assets/preview.svg";
    import done from "./assets/done.svg";
    import plusCircle from "./assets/plus-circle-outline.svg";
    import person from "./assets/person.svg";
    import chatting from "./assets/chatting.svg";
    import phone from "./assets/campaigns2/phone.png";
    import eye from "./assets/campaigns2/eye.svg";
    
    let user
    let signOutUser
    let rotated = false;
    let selection = 'new-campaigns';
    function select(button) {
        selection = button;
    }

    // Switch button
    let activeSwitchStyle = { left: '0%' };

    function switchLeft() {
        activeSwitchStyle = { left: '0%' };
    }

    function switchRight() {
        activeSwitchStyle = { left: '50%' };
    } 

    // Accordion
    let isOpen = false;
    function handleContinue(accordionId) {
        return function () {
            console.log('accordionId', accordionId);
            isOpen = !isOpen;

            // Find the button of the specified accordion and trigger a click event
            const accordionButton = document.getElementById(accordionId);
            if (accordionButton) {
                accordionButton.click();
            }
        };
    }

    // Group
    import { createGroup } from './apis/userApis.js';
    import { getGroups } from './apis/userApis.js';
    import { onMount } from "svelte";
    var groupName = '';
    let companyId = '657045d7b1f7fa8f0a0e4c7c';
    let createdGroupList = [];
    async function createGroupHandler() {
        await createGroup(groupName, companyId);
        getGroupsHandler();
        createdGroupList.push(groupName);
        groupName = '';
    }

    async function getGroupsHandler() {
        const response = await getGroups(companyId);
        groupList = response;
    }

    let groupList = [];
    onMount(getGroupsHandler);

    // Campaign
    import { createCampaign } from './apis/userApis.js';
    let campaignName = '';
    let campaignDescription = '';

    async function createCampaignHandler() {
        const response = await createCampaign(campaignName, campaignDescription, companyId);
        if (response) {
            // refresh page
            window.location.reload();
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
    /* required css to make rounded table (below) */
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
        background-image: url("./assets/plus-accordion.svg") !important;
        transform: none;
    }
    /* set the accordion button to expanded when the accordion is open */
    .accordion-button:not(.collapsed)::after {
        background-image: url("./assets/minus-accordion.svg") !important;
        transform: rotate(90deg);
    }
    input {
        border: 1px solid #EBE9F1 !important;
        border-radius: 10px !important;
        font-size: 17px !important;
        font-weight: 600 !important;
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
    input:focus + label {
        margin-top: -17px;
        color: #04A3DA !important;
        transition: 0.2s ease all;
    }
    textarea:focus + label {
        margin-top: -17px;
        color: #04A3DA !important;
        transition: 0.2s ease all;
    }
    input[type=file]::file-selector-button {
        background-color: #fff;
        color: #697A8D;
        border: 0px;
        border-right: 1px solid #e5e5e5;
        padding: 15px 15px 15px 25px;
        margin-right: 20px;
        height: 120%;
        font-size: 15px;
    }
    input[type=file] {
        color: black;
        font-size: 15px !important;
    }
    input[type=datetime-local] {
        border: 1px solid #EBE9F1 !important;
        border-radius: 10px !important;
        font-size: 17px !important;
        font-weight: 600 !important;
        height: 50px !important;
        background: url({calendar}) !important;
    }
</style>

<main class="m-0 p-0">
    <div class="d-flex m-0 p-0" style="height: 100vh;">
        <Sidebar page="userCampaigns2" rotated={rotated} />

        <div class="col-md px-0" id="main-content-div">
            <SearchProfileBar user={user} signOutUser={signOutUser} />
            <div class="row d-flex flex-column px-3 pt-1 mx-0 pe-4">
                <div class="col-md-12 p-4 bg-white rounded mb-4 grid-box d-flex justify-content-start align-items-center">
                    <div>
                        <button class="btn align-items-center me-2 px-3 userCampaignsDiv1" type="button" style="display: inline-flex;" on:click={() => select('new-campaigns')}>
                            <i class='bx bxs-collection me-2' style="font-size: 22px;"></i>
                            Yeni Kampanya Ekle
                        </button>
                        <button class="btn align-items-center me-2 px-3 userCampaignsDiv1" type="button" on:click={() => select('edit-campaigns')}>
                            <img src={edit} class="me-2 mb-0" alt="edit" width="22"/>
                            Kampanya Düzenle
                        </button>
                        <button class="btn align-items-center me-2 px-3 userCampaignsDiv1" type="button" style="display: inline-flex;" data-bs-toggle="modal" data-bs-target="#exampleModal" on:click={() => select('new-campaigns')}>
                            <i class='bx bxs-collection me-2' style="font-size: 22px;"></i>
                            Grup Oluştur
                        </button>
                        <!-- New Group Modal -->
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Yeni Grup Oluştur</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <input type="text" class="form-control shadow-none" id="groupName" placeholder="Grup Adı Giriniz" bind:value={groupName}>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
                                    <button type="submit" class="btn" data-bs-dismiss="modal" style="background-color: #04A3DA; color: white;" on:click={createGroupHandler}>Kaydet</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {#if selection === 'new-campaigns'}
                <div class="row d-flex justify-content-between align-items-center mb-4 g-0" style="position:relative;">
                    <div id="campaign-form-group" class="d-flex flex-column justify-content-start me-3" style="width: 70%; height: 74vh;">

                        <!-- Parent Accordion -->
                        <div class="accordion mb-4 rounded" id="campaign-information-panel-top">

                            <!-- Child Accordion 1 -->
                            <div class="accordion-item border-0 grid-box mb-4 rounded">
                              <h2 class="accordion-header">
                                <button class="accordion-button rounded p-4 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#campaign-information-panel" aria-expanded="true" aria-controls="campaign-information-panel">
                                    <i class='bx bx-collection me-2' ></i>
                                    Kampanya Bilgileri
                                </button>
                              </h2>
                              
                              <div id="campaign-information-panel" class="accordion-collapse collapse show" data-bs-parent="#campaign-information-panel-top">
                                <div class="accordion-body pt-2">
                                    <hr class="m-0 p-0 pt-3" style="color: #b8b5bf; height: 2px;"/>
                                    <div class="form-floating my-3">
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control shadow-none" id="campaingName" placeholder="Kampanya Adı" bind:value={campaignName}>
                                            <label for="campaingName" style="color: #697A8D;">Kampanya Adı</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <textarea class="form-control shadow-none" placeholder="Leave a comment here" id="campaingDescription" style="height: 100px; resize: none;" bind:value={campaignDescription}></textarea>
                                            <label for="campaingDescription" style="color: #697A8D;">Kampanya Açıklaması</label>
                                        </div>
                                        <div class="d-flex justify-content-end w-100">
                                            <button class="btn btn-accordion d-flex align-items-center" type="button" style="background-color: #04A3DA; color: white;" on:click={handleContinue('group-information-panel-button')}>
                                                <span class="me-2">Devam Et</span>
                                                <i class='bx bx-chevron-down mb-0' style="font-size: 24px;"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                              </div>
                            </div>

                            <!-- Child Accordion 2 -->
                            <div class="accordion-item border-0 bg-white grid-box mb-4 rounded">
                            <h2 class="accordion-header">
                                <button id="group-information-panel-button" class="accordion-button collapsed p-4 shadow-none rounded" type="button" data-bs-toggle="collapse" data-bs-target="#group-information-panel" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                    <i class='bx bx-group me-2' ></i>
                                    Grup Bilgileri
                                </button>
                            </h2>
                            <div id="group-information-panel" class="accordion-collapse collapse" data-bs-parent="#campaign-information-panel-top">
                                <div class="accordion-body pt-2">
                                    <hr class="m-0 p-0 pt-3" style="color: #b8b5bf; height: 2px;"/>
                                    <div class="mb-4 mt-3 d-flex justify-content-between">
                                        <div class="form-floating me-2 w-100" style="width:max-content;">
                                            <input type="text" class="form-control shadow-none" id="groupName" placeholder="" bind:value={groupName}>
                                            <label for="groupName" style="color: #697A8D;">Grup Adı Giriniz</label>
                                        </div>
                                        <span class="col-md-2">
                                            <button class="btn btn-accordion w-100 py-0 h-100" type="button" style="background-color: #04A3DA; color: white; font-size: 14px; font-weight: 500;" on:click={createGroupHandler}>
                                                Grup Oluştur 
                                                <img src={plusCircle} class="ms-2 mb-0" alt="edit" width="22"/>
                                            </button>
                                        </span>
                                        <div>
                                            {#each createdGroupList as group}
                                                <span class="bg-light py-2 px-3 rounded me-2">{group}</span>
                                            {/each}
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <button class="btn btn-accordion d-flex align-items-center" type="button" style="background-color: #697A8D; color: white;">
                                            <i class='bx bx-group me-2' ></i>
                                            <span style="font-size: 14px; font-weight: 500;">Mevcut Grupları Görüntüle</span>
                                        </button>
                                        <button class="btn btn-accordion d-flex align-items-center" type="button" style="background-color: #04A3DA; color: white;" on:click={handleContinue('person-information-panel-button')}>
                                            <span class="me-2">Devam Et</span>
                                            <i class='bx bx-chevron-down mb-0' style="font-size: 24px;"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </div>

                            <!-- Child Accordion 3 -->
                            <div class="accordion-item bg-white border-0 rounded grid-box mb-4">
                                <h2 class="accordion-header">
                                    <button id="person-information-panel-button" class="accordion-button collapsed p-4 shadow-none rounded" type="button" data-bs-toggle="collapse" data-bs-target="#person-information-panel" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                        <img src={person} class="me-2 mb-0" alt="edit" width="16"/>
                                        Kişi Bilgileri
                                    </button>
                                </h2>
                                <div id="person-information-panel" class="accordion-collapse bg-white collapse" data-bs-parent="#campaign-information-panel-top">
                                    <div class="accordion-body pt-2">
                                        <hr class="m-0 p-0 pt-3" style="color: #b8b5bf; height: 2px;"/>
                                        <div class="my-3 d-flex justify-content-between">
                                            <div class="p-1" style="width: fit-content; border: 1px solid rgba(44, 62, 79, 0.10); border-radius: 45px;">
                                                <div class="switch-button d-flex justify-content-between">
                                                    <span class="active" style="left: {activeSwitchStyle.left};"></span>
                                                    <button class="btn w-50 d-flex justify-content-center align-items-center switch-button-case left {activeSwitchStyle.left === '0%' ? 'active-case' : ''}" on:click={switchLeft}>Excel Dosyası Yükle</button>
                                                    <button class="btn w-50 d-flex justify-content-center align-items-center switch-button-case right {activeSwitchStyle.left === '50%' ? 'active-case' : ''}" on:click={switchRight}>Kişi Ekle</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="form-floating mb-3 col me-2">
                                                <input type="file" class="form-control shadow-none p-0" id="inputGroupFile01">
                                            </div>
                                            <div class="form-floating mb-3 col ms-2">
                                                <input type="text" class="form-control shadow-none" id="listName" placeholder="">
                                                <label for="listName" style="color: #697A8D;">Liste Adı Girin</label>
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-between mb-3">
                                            <div class="form-floating w-100 me-3">
                                                <select class="form-select shadow-none" aria-label="Default select example">
                                                    {#each groupList as group}
                                                        <option value={group._id}>{group.name}</option>
                                                    {/each}
                                                </select>
                                                <label for="listName" style="color: #697A8D;">Grup Seçiniz</label>
                                            </div>
                                            <span class="col-md-3">
                                                <button class="btn btn-accordion d-flex justify-content-center align-items-center w-100 h-100 py-0" type="button" style="background-color: #04A3DA; color: white;" on:click={createCampaignHandler}>
                                                    Kampanyayı Kaydet
                                                    <i class='bx bx-check-double mb-0' style="font-size: 24px;"></i>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <!-- Child Accordion 4 -->
                        <!-- <div class="accordion-item bg-white border-0 rounded grid-box mb-4">
                          <h2 class="accordion-header">
                            <button class="accordion-button collapsed p-4 shadow-none rounded" type="button" data-bs-toggle="collapse" data-bs-target="#sms-information-panel" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                <img src={chatting} class="me-2 mb-0" alt="edit" width="16"/>
                                SMS Ayarları
                            </button>
                          </h2>
                            <div id="sms-information-panel" class="accordion-collapse collapse bg-white" data-bs-parent="#campaign-information-panel-top">
                                <div class="accordion-body pt-2">
                                    <hr class="m-0 p-0 pt-3" style="color: #b8b5bf; height: 2px;"/>
                                    <div class="form-floating mb-3">
                                        <textarea class="form-control shadow-none" placeholder="Leave a comment here" id="smsMessage" style="height: 100px; resize: none;"></textarea>
                                        <label for="smsMessage" style="color: #697A8D;">SMS Mesajınızı Yazınız</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <select class="form-select shadow-none mb-3" aria-label="Default select example">
                                            <option selected value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                        <label for="smsDate" style="color: #697A8D;">SMS Gönderim Grubu Seçiniz</label>
                                    </div>
                                    <input type="datetime-local" class="form-control shadow-none mb-3" id="smsDate" placeholder="Kampanya Adı">
                                    <div class="d-flex justify-content-end">
                                        <span class="col-md-2">
                                            <button class="btn btn-accordion d-flex align-items-center w-100 h-100 py-0" type="button" style="background-color: #04A3DA; color: white;">
                                                İşlemi Kaydet
                                                <i class='bx bx-check-double mb-0' style="font-size: 24px;"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                    </div>
                    <div class="bg-white rounded grid-box px-5 py-4" style="width: 28%; height: fit-content; position:absolute; top: 0; right: 0;">
                        <div class="d-flex flex-column justify-content-center align-items-center" style="height: fit-content;">
                            <img src="{phone}" class="mb-3" alt="phone" width="95%"/>
                            <div class="d-flex justify-content-center">
                                <button class="btn d-flex align-items-center me-2" type="button" style="font-size: 13px; background-color: #F7F8FA; color: #5E6E7B;">
                                    <img src={eye} class="mb-0 me-2" alt="edit" width="22"/>
                                    <span class="me-2">Şablon Önizleme</span>
                                </button>
                                <button class="btn d-flex align-items-center" type="button" style="font-size: 13px; background-color: #F7F8FA; color: #5E6E7B;">
                                    <i class='bx bxs-message-square-detail me-2' style="color: #5E6E7B;" ></i>
                                    <span class="me-2">SMS Önizleme</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                    
                {:else if selection === ''}

                    <div class="bg-white rounded mb-4 grid-box" style="height: 43vh;">
                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Kampanya Adı</th>
                                <th scope="col">Tarih</th>
                                <th scope="col">Gönderilen Kişi</th>
                                <th scope="col">Durumu</th>
                                <th scope="col">Detaylar</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#552</td>
                                    <td>PVM Tanıtım Anketi</td>
                                    <td>11 Ara 2023, 10:58</td>
                                    <td>852.536 Kişi</td>
                                    <td>
                                        <span class="bg-light py-2 px-3 rounded">BEKLEMEDE</span>
                                    </td>
                                    <td class="d-flex">
                                        <button class="btn me-2 p-0" type="button" style="border: none;">
                                            <img src={preview} alt="edit" width="22"/>
                                        </button>

                                        <button class="btn me-2 p-0 align-items-center" type="button" style="display: inline-flex; border: none;">
                                            <i class='bx bxs-message-square-edit' style="font-size: 22px; color: #267BC0;"></i>
                                        </button>

                                        <button class="btn p-0 align-items-center" type="button" style="display: inline-flex; border: none;">
                                            <i class='bx bxs-message-square-detail' style="font-size: 22px; color: #267BC0;"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>#552</td>
                                    <td>PVM Tanıtım Anketi</td>
                                    <td>11 Ara 2023, 10:58</td>
                                    <td>852.536 Kişi</td>
                                    <td>
                                        <span class="bg-light py-2 px-3 rounded">BEKLEMEDE</span>
                                    </td>
                                    <td class="d-flex">
                                        <button class="btn me-2 p-0" type="button" style="border: none;">
                                            <img src={preview} alt="edit" width="22"/>
                                        </button>

                                        <button class="btn me-2 p-0 align-items-center" type="button" style="display: inline-flex; border: none;">
                                            <i class='bx bxs-message-square-edit' style="font-size: 22px; color: #267BC0;"></i>
                                        </button>

                                        <button class="btn p-0 align-items-center" type="button" style="display: inline-flex; border: none;">
                                            <i class='bx bxs-message-square-detail' style="font-size: 22px; color: #267BC0;"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>#552</td>
                                    <td>PVM Tanıtım Anketi</td>
                                    <td>11 Ara 2023, 10:58</td>
                                    <td>852.536 Kişi</td>
                                    <td>
                                        <span class="bg-light py-2 px-3 rounded">BEKLEMEDE</span>
                                    </td>
                                    <td class="d-flex">
                                        <button class="btn me-2 p-0" type="button" style="border: none;">
                                            <img src={preview} alt="edit" width="22"/>
                                        </button>

                                        <button class="btn me-2 p-0 align-items-center" type="button" style="display: inline-flex; border: none;">
                                            <i class='bx bxs-message-square-edit' style="font-size: 22px; color: #267BC0;"></i>
                                        </button>

                                        <button class="btn p-0 align-items-center" type="button" style="display: inline-flex; border: none;">
                                            <i class='bx bxs-message-square-detail' style="font-size: 22px; color: #267BC0;"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>#552</td>
                                    <td>PVM Tanıtım Anketi</td>
                                    <td>11 Ara 2023, 10:58</td>
                                    <td>852.536 Kişi</td>
                                    <td>
                                        <span class="bg-light py-2 px-3 rounded">BEKLEMEDE</span>
                                    </td>
                                    <td class="d-flex">
                                        <button class="btn me-2 p-0" type="button" style="border: none;">
                                            <img src={preview} alt="edit" width="22"/>
                                        </button>

                                        <button class="btn me-2 p-0 align-items-center" type="button" style="display: inline-flex; border: none;">
                                            <i class='bx bxs-message-square-edit' style="font-size: 22px; color: #267BC0;"></i>
                                        </button>

                                        <button class="btn p-0 align-items-center" type="button" style="display: inline-flex; border: none;">
                                            <i class='bx bxs-message-square-detail' style="font-size: 22px; color: #267BC0;"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                {/if}
            </div>
        </div>

    </div>

</main>