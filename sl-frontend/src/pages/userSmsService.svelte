<script>
    localStorage.setItem('storedRoute', 'sms-servisi');
    // Logged in user
    import { user } from "../user.js";
    let loggedInUser;
    user.subscribe(value => (
        loggedInUser = value  
    ));
    // Sidebar
    import Sidebar from "../lib/Sidebar.svelte";

    // Lib
    import SearchProfileBar from "../lib/SearchProfileBar.svelte";

    // Main content
    import phone from "../assets/campaigns2/phone_sms.png";
    import trashCan from "../assets/trash-can.svg"; 
 
    let rotated = false;

    // Pagination
    let selection = 'sms-table';
    let newSmsButton = false;
    let editSmsButton = false;

    function toggle(button) {
        if (button === 'new-sms-button') {
            if (newSmsButton) {
                newSmsButton = false;
                selection = 'sms-table';
            } else {
                newSmsButton = true;
                selection = 'new-sms';
            }
            editSmsButton = false;
        } else if (button === 'edit-sms-button') {
            if (editSmsButton) {
                editSmsButton = false;
                selection = 'sms-table';
            } else {
                editSmsButton = true;
                selection = 'edit-sms';
            }
            newSmsButton = false;
        }
    }

    // Group Select
    import { getGroups } from '../apis/userApis.js';
    
    let groupList = [];
    async function getGroupsHandler() {
        const response = await getGroups(loggedInUser.company);
        groupList = response;
    }

    getGroupsHandler();

    // SMS Form
    let title = '';
    let text = '';
    let previousText = '';
    let maxCharacters = 160;

    function handleText(event) {
        text = event.target.value.slice(0, maxCharacters);
    }

    let textareaRef;

    $: if (text !== previousText) {
        autoGrow();
        previousText = text;
    }

    function autoGrow() {
        textareaRef.style.height = "10px";
        textareaRef.style.height = (textareaRef.scrollHeight) + "px";
        if (text.length === 0) {
            textareaRef.style.height = "10px";
        }
    }

    // Company Smss
    import { getSms } from '../apis/userApis.js';
    import { createSms } from '../apis/userApis.js';

    let smsList = [];

    async function getCompanySmsHandler() {
        const response = await getSms(loggedInUser.company);
        smsList = response;
    }

    getCompanySmsHandler();

    let groupId = '';
    let campaignId = '';
    async function createSmsHandler() {
        const response = await createSms(title, text, campaignId, groupId, loggedInUser.company);
        smsList = response;
        window.location.reload();
    }

    // Edit Sms
    import { updateSms } from '../apis/userApis.js';
    
    let smsMessage = '';
    let smsGroupId = '';
    let smsSelection = '';
    let selectedSms;
    $: if (smsSelection) {
        selectedSms = smsList.find(sms => sms._id === smsSelection);
        smsMessage = selectedSms.message;
        smsGroupId = selectedSms.groupId;
    } 

    async function updateSmsHandler() {
        const response = await updateSms(smsSelection, smsMessage, selectedSms.groupId, loggedInUser.company, selectedSms.campaignId);
        smsList = response;
        window.location.reload();
    }

    function updateHandleText(event) {
        smsMessage = event.target.value.slice(0, maxCharacters);
    }

    // Edit Sms Table
    function editSmsTable(event) {
        // get object of selected sms
        const index = event.target.closest('tr').dataset.index;
        smsSelection = smsList[index]._id;
        toggle('edit-sms-button');
    }

    // Company Campaigns
    import { getCampaigns } from '../apis/userApis.js';
    let campaignList = [];
    async function getCompanyCampaignsHandler() {
        const response = await getCampaigns(loggedInUser.company);
        campaignList = response;
    }

    getCompanyCampaignsHandler();

    // Send Sms
    import { sendSms } from '../apis/userApis.js';
    import { updateCampaignStatus } from '../apis/userApis.js';
    import { getTargetGSMByGroupId } from "../apis/userApis.js";
    async function sendSmsHandler(event) {
        let index = event.target.closest('tr').dataset.index;
        let smsGroup = smsList[index].groupId;
        let targetUserList = await getTargetGSMByGroupId(smsGroup);
        let epoch = new Date().getTime();
        let messageData = [];
        let gsms = [];
        for (let i = 0; i < targetUserList.length; i++) {
            messageData.push({
                "msg": "Sayın " + targetUserList[i].name + ",\n" + smsList[index].message + " " + "\nwww.sl.com/survey?" + smsList[index].campaignId + "/" + targetUserList[i].id,
                "tel": targetUserList[i].phoneNumber
            });
            gsms.push(targetUserList[i].phoneNumber);
        }
        await sendSms(messageData, gsms, epoch, smsList[index]);

        let campaignId = smsList[index].campaignId;
        await updateCampaignStatus(campaignId, "sent", messageData.length);

        window.location.reload();
    }

    // Delete Sms
    import DeleteSmsModal from "../lib/DeleteSmsModal.svelte";
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
    }
    input {
        border: 1px solid #EBE9F1 !important;
        border-radius: 10px !important;
        font-size: 17px !important;
        font-weight: 600 !important;
    }
    input[type="text"] {
        height: 50px !important;
        padding-left: 17px !important;
        padding-top: 10px !important;
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
    .form-select option {
        color: black;
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
    .active-button {
        background-color: #697A8D !important;
        color: white !important;
    }
    .active-button > svg > path {
        fill: white !important;
    }
    .active-button > i {
        color: white !important;
    }
    .counter {
        position: absolute;
        bottom: 8px;
        right: 10px;
        color: #666;
        font-size: 15px;
        font-style: normal;
        font-weight: 600;
        line-height: 22px;
    }
    textarea:disabled {
        width: 80%;
        height: 17%;
        resize: none !important;
        overflow: hidden !important;
        min-height: 50px !important;
        max-height: 425px !important;
        box-sizing: border-box;
        border-radius: 11px !important;
        padding: 10px;
        font-size: 15px !important;
        background-color: #EFEFEF !important;
        position: absolute;
        bottom: 16.5%;
        right: 8.5%;
        text-align: left;
        color: #2E3138;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 145.455% */
        letter-spacing: -0.11px;
        text-transform: lowercase;
    }
    .ellipsis {
        max-width: 250px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .rounded-phone {
        border-radius: 45px !important;
        box-shadow: 0px 2px 6px 0px rgba(67, 89, 113, 0.12) !important;
    }
</style>

<DeleteSmsModal sms={selectedSms}/>

<main class="m-0 p-0">
    <div class="d-flex m-0 p-0" style="height: 100vh;">
        <Sidebar page="userSmsService" rotated={rotated} />

        <div class="col-md px-0" id="main-content-div">
            <SearchProfileBar/>
            <div class="row d-flex flex-column px-3 pt-1 mx-0 pe-4">
                <div class="col-md-12 p-4 bg-white rounded mb-4 grid-box d-flex justify-content-start align-items-center">
                    <div>
                        <button
                            class="btn align-items-center me-2 px-3 userCampaignsDiv1 {newSmsButton ? 'active-button' : ''}"
                            type="button"
                            style="display: inline-flex;"
                            on:click={() => toggle("new-sms-button")}>
                            <i class='bx bxs-collection me-2' style="font-size: 22px;"></i>
                            Yeni SMS Ekle
                        </button>

                        <button
                            class="btn align-items-center me-2 px-3 userCampaignsDiv1 {editSmsButton ? 'active-button' : ''}"
                            type="button"
                            on:click={() => toggle("edit-sms-button")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <path d="M12.8752 1.00024H3.2921C2.02546 1.00024 1.00049 2.02522 1.00049 3.29186V16.2082C1.00049 17.4749 2.02546 18.4998 3.2921 18.4998H9.44195L9.62528 17.4749C9.70862 17.0082 9.92528 16.5915 10.2586 16.2499L15.1668 11.35V3.29186C15.1668 2.02522 14.1418 1.00024 12.8752 1.00024ZM4.33374 4.3335H7.667C8.12532 4.3335 8.50031 4.70849 8.50031 5.16681C8.50031 5.62513 8.12532 6.00013 7.667 6.00013H4.33374C3.87542 6.00013 3.50043 5.62513 3.50043 5.16681C3.50043 4.70849 3.87542 4.3335 4.33374 4.3335ZM8.50031 12.6666H4.33374C3.87542 12.6666 3.50043 12.2916 3.50043 11.8333C3.50043 11.375 3.87542 11 4.33374 11H8.50031C8.95863 11 9.33362 11.375 9.33362 11.8333C9.33362 12.2916 8.95863 12.6666 8.50031 12.6666ZM11.8336 9.33338H4.33374C3.87542 9.33338 3.50043 8.95839 3.50043 8.50007C3.50043 8.04174 3.87542 7.66675 4.33374 7.66675H11.8336C12.2919 7.66675 12.6669 8.04174 12.6669 8.50007C12.6669 8.95839 12.2919 9.33338 11.8336 9.33338Z" fill="#697A8D"/>
                                <path d="M11.4401 20.9997C11.2759 20.9997 11.1159 20.9347 10.9984 20.8164C10.8543 20.6723 10.7893 20.4673 10.8251 20.2656L11.2668 17.7615C11.2884 17.6357 11.3501 17.519 11.4401 17.4282L17.6274 11.2416C18.3874 10.48 19.1341 10.6858 19.5424 11.0941L20.5732 12.125C21.1424 12.6933 21.1424 13.6183 20.5732 14.1874L14.3859 20.3748C14.2959 20.4656 14.1792 20.5264 14.0525 20.5481L11.5484 20.9897C11.5126 20.9964 11.4759 20.9997 11.4401 20.9997Z" fill="#697A8D"/>
                            </svg>
                            SMS Düzenle
                        </button>
                    </div>
                </div>

                {#if selection === 'sms-table'}
                    <table class="table table-hover px-0 grid-box">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Sms Başlığı</th>
                                <th scope="col">Sms Metni</th>
                                <th scope="col">Kampanya</th>
                                <th scope="col">Grup</th>
                                <th scope="col">Gönderim Durumu</th>
                                <th scope="col">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#if smsList.length === 0}
                                <tr>
                                    <td colspan="7" class="text-center">Henüz sms taslağı oluşturulmamış.</td>
                                </tr>
                            {:else}
                                {#each smsList as sms, index}
                                    <tr data-index={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{sms.title}</td>
                                        <td class="ellipsis">{sms.message}</td>
                                        {#if campaignList.find(campaign => campaign._id === sms.campaignId) === undefined}
                                            <td>-</td>
                                        {:else}
                                            <td>{campaignList.find(campaign => campaign._id === sms.campaignId).name}</td>
                                        {/if}
                                        {#if groupList.find(group => group._id === sms.groupId) === undefined}
                                            <td>-</td>
                                        {:else}
                                            <td>{groupList.find(group => group._id === sms.groupId).name}</td>
                                        {/if}
                                        <td>
                                            <button class="btn p-0 align-items-center" type="button" style="display: inline-flex; border: none;" on:click={sendSmsHandler} disabled={sms.sent === true}>
                                                <span class="badge" style="background-color: #05AF07; color: white; padding: 0.7rem;">{sms.sent === true ? 'Gönderildi' : 'Gönder'}</span>
                                            </button>
                                        </td>
                                        <td>
                                            <button class="btn me-1 p-0 align-items-center" type="button" style="display: inline-flex; border: none;" on:click={editSmsTable} disabled={sms.sent === true}>
                                                <i class='bx bxs-message-square-edit' style="font-size: 24px; color: #267BC0; height: 22px;"></i>
                                            </button>
                                            <button class="btn p-0 align-items-center" type="button" style="display: inline-flex; border: none;" data-bs-toggle="modal" data-bs-target="#deleteSmsModal" on:click={() => (selectedSms = sms)}>
                                                <img src="{ trashCan }" alt="trashCan" width="22" />
                                            </button>
                                        </td>
                                    </tr>
                                {/each}
                            {/if}
                        </tbody>
                    </table>
                {:else if selection === 'new-sms'}
                    <div class="row d-flex justify-content-between align-items-center mb-4 g-0" style="position:relative;">
                        <div id="sms-form-group" class="d-flex flex-column bg-white px-4 py-5 rounded grid-box justify-content-start me-3" style="width: 75%; height: fit-content;">
                            <div class="form-group mb-4">
                                <label for="smsName" style="color: #697A8D;">SMS Başlığı</label>
                                <input type="text" bind:value={title} class="form-control shadow-none" id="smsName" placeholder="Lütfen sms başlığı giriniz">
                            </div>
                            <div class="form-group mb-4">
                                <label for="text" style="color: #697A8D;">SMS Metni</label>
                                <textarea bind:value={text} on:input={handleText} class="form-control shadow-none" placeholder="Lütfen iletmek istediğiniz mesajı girin" id="text" style="height: 150px; resize: none;" maxlength="300"></textarea>
                                <div class="counter {text.length > maxCharacters ? 'exceeded' : ''}">
                                    {text.length}/{maxCharacters}
                                </div>
                            </div>
                            <div class="form-group w-100 mb-4">
                                <label for="listName">Kampanya Seçiniz</label>
                                <select class="form-select shadow-none" aria-label="Default select example" bind:value={campaignId}>
                                    <option selected value="">Kampanya Seçiniz</option>
                                    {#each campaignList as campaign}
                                        <option value={campaign._id}>{campaign.name}</option>
                                    {/each}
                                </select>
                            </div>
                            <div class="form-group w-100 mb-4">
                                <label for="listName">Grup Seçiniz</label>
                                <select class="form-select shadow-none" aria-label="Default select example" bind:value={groupId}>
                                    <option selected value="">Grup Seçiniz</option>
                                    {#each groupList as group}
                                        <option value={group._id}>{group.name}</option>
                                    {/each}
                                </select>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button class="btn btn-accordion d-flex align-items-center py-0" type="button" style="background-color: #04A3DA; color: white;" on:click={createSmsHandler}>
                                    İşlemi Kaydet
                                    <i class='bx bx-check-double mb-0' style="font-size: 24px;"></i>
                                </button>
                            </div>
                            <div class="bg-white grid-box d-flex flex-column justify-content-between align-items-center rounded-phone mt-3" 
                                style="width: 25% height: fit-content; position:absolute; top: 0; right: 0; margin-right: 3%;">
                                <div class="w-100 d-flex justify-content-center" style="height: fit-content; width:fit-content; position:relative;">
                                    <img src="{phone}" class="" alt="phone" width="100%"/>
                                    <textarea class="form-control shadow-none" disabled bind:this={textareaRef} bind:value={text} on:input={autoGrow}></textarea>
                                </div>
                            </div>  
                        </div>
                    </div>
                {:else if selection === "edit-sms"}
                    <div class="row d-flex justify-content-between align-items-center g-0" style="position:relative;">
                        <div class="form-group">
                            <label for="smsSelection" class="col-md-3 col-form-label" style="background-color: transparent !important;">SMS Seçiniz</label>
                            <select class="form-select shadow-none col-md-3 mb-4" aria-label="Default select example" bind:value={smsSelection}>
                                <option selected value="">Lütfen SMS Seçiniz</option>
                                {#each smsList as sms}
                                    {#if sms.sent === false}
                                        <option value={sms._id}>{sms.title}</option>
                                    {/if}
                                {/each}
                            </select>
                        </div>

                        {#if smsSelection !== ''} 
                            <div class="d-flex justify-content-between align-items-center g-0" style="position:relative;">
                                <div id="sms-form-group" class="d-flex flex-column bg-white px-4 py-5 rounded grid-box justify-content-start me-3" style="width: 75%; height: fit-content;">
                                    <div class="form-group mb-4">
                                        <label for="smsName" style="color: #697A8D;">SMS Başlığı</label>
                                        <input type="text" bind:value={selectedSms.title} class="form-control shadow-none" id="smsName" placeholder="Lütfen sms başlığı giriniz">
                                    </div>
                                    <div class="form-group mb-4">
                                        <label for="editSmsMessage" style="color: #697A8D;">SMS Metni</label>
                                        <textarea bind:value={selectedSms.message} on:input={updateHandleText} class="form-control shadow-none" placeholder="Lütfen iletmek istediğiniz mesajı girin" id="editSmsMessage" style="height: 150px; resize: none;" maxlength="160"></textarea>
                                        <div class="counter {smsMessage.length > maxCharacters ? 'exceeded' : ''}">
                                            {smsMessage.length}/{maxCharacters}
                                        </div>
                                    </div>
                                    <div class="form-group w-100 mb-4">
                                        <label for="listName">Kampanya Seçiniz</label>
                                        <select class="form-select shadow-none" aria-label="Default select example" bind:value={selectedSms.campaignId}>
                                            <option selected value="1">Kampanya Seçiniz</option>
                                            {#each campaignList as campaign}
                                                <option value={campaign._id}>{campaign.name}</option>
                                            {/each}
                                        </select>
                                    </div>
                                    <div class="form-group w-100 mb-4">
                                        <label for="listName">Grup Seçiniz</label>
                                        <select class="form-select shadow-none" aria-label="Default select example" bind:value={selectedSms.groupId}>
                                            <option selected value="1">Grup Seçiniz</option>
                                            {#each groupList as group}
                                                <option value={group._id}>{group.name}</option>
                                            {/each}
                                        </select>
                                    </div>
                                    <div class="d-flex justify-content-end">
                                        <button class="btn btn-accordion d-flex align-items-center" type="button" style="background-color: #04A3DA; color: white;" on:click={updateSmsHandler}>
                                            <span class="me-2">Kaydet</span>
                                            <i class='bx bx-check-double mb-0' style="font-size: 24px;"></i>
                                        </button>
                                    </div>  
                                </div>
                                <div class="bg-white grid-box d-flex flex-column justify-content-between align-items-center rounded-phone mt-3" 
                                    style="width: 25% height: fit-content; position:absolute; top: 0; right: 0; margin-right: 3%;">
                                    <div class="w-100 d-flex justify-content-center" style="height: fit-content; width:fit-content; position:relative;">
                                        <img src="{phone}" class="" alt="phone" width="100%"/>
                                        <textarea class="form-control shadow-none" disabled bind:this={textareaRef} bind:value={smsMessage} on:input={autoGrow}></textarea>
                                    </div>
                                </div>
                            </div>
                        {:else}
                            <div class="d-flex justify-content-center align-items-center" style="width: 100%; height: 72.5vh;">
                                {#if smsSelection === ''}
                                    <span class="text-center">Lütfen SMS Seçiniz</span>
                                {:else}
                                    <span class="text-center">SMS Bulunamadı</span>
                                {/if}
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>
        </div>

    </div>

</main>