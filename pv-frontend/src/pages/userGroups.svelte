<script>
    localStorage.setItem('storedRoute', 'userGroups');
    
    // User
    import { user } from "../user.js";
    let loggedInUser;
    user.subscribe(value => (loggedInUser = value));

    // Sidebar
    import Sidebar from "../lib/Sidebar.svelte";

    // Lib
    import SearchProfileBar from "../lib/SearchProfileBar.svelte";

    // Group
    import { createGroup } from '../apis/userApis.js';
    import { getGroups } from '../apis/userApis.js';
    import { updateGroup } from '../apis/userApis.js';
    import { onMount } from "svelte";

    var groupName = '';
    let groupList = [];
    async function createGroupHandler() {
        console.log(loggedInUser.company);
        await createGroup(groupName, loggedInUser.company);
        getGroupsHandler();
    }

    async function getGroupsHandler() {
        groupList = await getGroups(loggedInUser.company);
    }

    let updatedGroupName = '';
    async function updateGroupHandler() {
        let groupId = groupSelection;
        await updateGroup(groupId, updatedGroupName, loggedInUser.company);
        getGroupsHandler();
    }

    // Group List
    import { getCompanyTargetList } from '../apis/userApis.js';
    let groupTargetList = [];

    async function getCompanyTargetListHandler() {
        groupTargetList = await getCompanyTargetList(loggedInUser.company);
    }

    onMount(() => {
        getGroupsHandler();
        getCompanyTargetListHandler();
    });

    // Selected group
    let groupSelection = '';
    let selectedGroup;
    let selectedTargetList = [];
    let editGroupBtn;
    let flag = false;
    $: if (groupSelection !== '') {
        selectedGroup = groupList.find(group => group._id == groupSelection);
        selectedTargetList = groupTargetList.filter(target => target.group == groupSelection);
        if (!flag) {
            updatedGroupName = selectedGroup.name;
            flag = true;
        }
        if (editGroupBtn) {
            editGroupBtn.disabled = false;
        }
    }

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

    // Excel File Upload
    import { uploadExcelFile } from "../apis/userApis";
    import { navigate } from "svelte-routing";

    let excelFile = null;
    
    function handleFileUpload(event) {
        excelFile = event.target.files[0];
    }

    function uploadFile() {
        uploadExcelFile(excelFile, loggedInUser.company, selectedGroup);
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
    .form-select option {
        color: black;
    }
    .form-group {
        position: relative;
        width: 100%;
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
    select {
        height: 50px !important;
        border: 1px solid #EBE9F1 !important;
        border-radius: 10px !important;
    }
    th, td {
        padding: 25px 40px !important;
    }
    tr:first-child th:first-child {
        border-top-left-radius: 6px !important;
        border-bottom-left-radius: 6px !important;
    }
    tr:first-child th:last-child {
        border-top-right-radius: 6px !important;
        border-bottom-right-radius: 6px !important;
    }
    tr:last-child td:first-child {
        border-bottom-left-radius: 6px !important;
    }
    tr:last-child td:last-child {
        border-bottom-right-radius: 6px !important;
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
    input[type="text"] {
        height: 50px !important;
        padding-left: 17px !important;
        padding-top: 10px !important;
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
</style>

<main class="m-0 p-0">
    <div class="d-flex m-0 p-0" style="height: 100vh;">
        <Sidebar page="userGroups" rotated={false} />

        <div class="col-md px-0" id="main-content-div">
            <SearchProfileBar/>
            <div class="row d-flex flex-column px-3 pt-1 mx-0 pe-4">
                <div class="col-md-12 p-4 bg-white rounded mb-4 grid-box d-flex justify-content-start align-items-center">
                    <div class="form-group me-3">
                        <label for="groupSelection" class="col-md-3 col-form-label" style="background-color: transparent !important;">Grup Seçiniz</label>
                        <select class="form-select shadow-none" aria-label="Default select example" bind:value={groupSelection}>
                            <option selected value="">Lütfen Bir Grup Seçiniz</option>
                            {#each groupList as group}
                                <option value={group._id}>{group.name}</option>
                            {/each}
                        </select>
                    </div>
                    <div class="h-100 d-flex" style="width: 60%;">
                        <button disabled id="editGroupBtn" class="btn w-50 d-flex justify-content-center align-items-center me-2 px-3 userCampaignsDiv1" type="button" data-bs-toggle="modal" data-bs-target="#editGroupModal" bind:this={editGroupBtn}
                            style="display: inline-flex; border-radius: 8px;
                                                            background: #697A8D;
                                                            color: white;
                                                            height: 50px">
                            <i class='bx bxs-collection me-2' style="font-size: 22px;"></i>
                            Grubu Düzenle
                        </button>
                        <button class="btn w-50 d-flex justify-content-center align-items-center me-2 px-3 userCampaignsDiv1" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"
                            style="display: inline-flex; border-radius: 8px;
                                                            background: #697A8D;
                                                            color: white;
                                                            height: 50px">
                            <i class='bx bxs-collection me-2' style="font-size: 22px;"></i>
                            Grup Oluştur
                        </button>
                        <!-- Edit Group Modal -->
                        <div class="modal fade" id="editGroupModal" tabindex="-1" aria-labelledby="editGroupModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="editGroupModalLabel">Grup Düzenle</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-group mb-4 col me-2">
                                            <label for="groupName" style="color: #697A8D;">Grup Adı</label>
                                            <input type="text" class="form-control shadow-none" id="groupName" placeholder="Grup Adı Giriniz" bind:value={updatedGroupName}>
                                        </div>
                                        <div class="my-4 d-flex justify-content-between">
                                            <div class="p-1" style="width: fit-content; border: 1px solid rgba(44, 62, 79, 0.10); border-radius: 45px;">
                                                <div class="switch-button d-flex justify-content-between">
                                                    <span class="active" style="left: {activeSwitchStyle.left};"></span>
                                                    <button class="btn w-50 d-flex justify-content-center align-items-center switch-button-case left {activeSwitchStyle.left === '0%' ? 'active-case' : ''}" on:click={switchLeft}>Excel Dosyası Yükle</button>
                                                    <button class="btn w-50 d-flex justify-content-center align-items-center switch-button-case right {activeSwitchStyle.left === '50%' ? 'active-case' : ''}" on:click={switchRight}>Kişi Ekle</button>
                                                </div>
                                            </div>
                                        </div>
                                        <span id="left-switch-span">
                                            <div class="d-flex">
                                                <div class="col form-group mb-3 col me-2">
                                                    <input type="file" class="form-control shadow-none p-0" id="inputGroupFile01" on:change={handleFileUpload}/>
                                                </div>
                                            </div>
                                        </span>

                                        <span id="right-switch-span" style="display: none;">
                                            <div class="d-flex">
                                                <div class="form-group mb-4 col me-2">
                                                    <label for="personName" style="color: #697A8D;">Adı</label>
                                                    <input type="text" class="form-control shadow-none" id="personName" placeholder="Lütfen Kişi Adı Giriniz">
                                                </div>
                                                <div class="form-group mb-4 col ms-2">
                                                    <label for="personSurname" style="color: #697A8D;">Soyadı</label>
                                                    <input type="text" class="form-control shadow-none" id="personSurname" placeholder="Lütfen Kişi Soyadı Giriniz">
                                                </div>
                                            </div>
                                            <div class="d-flex">
                                                <div class="form-group mb-4 col">
                                                    <label for="personPhone" style="color: #697A8D;">Telefonu</label>
                                                    <input type="text" class="form-control shadow-none" id="personPhone" placeholder="Lütfen Kişi Telefonu Giriniz">
                                                </div>
                                            </div>
                                            <div class="d-flex">
                                                <div class="form-group mb-4 col">
                                                    <label for="personEmail" style="color: #697A8D;">Şehir</label>
                                                    <select class="form-select shadow-none" aria-label="Default select example">
                                                        <option selected value="1">Lütfen Şehir Seçiniz</option>
                                                        <option value="2">Ankara</option>
                                                        <option value="3">İstanbul</option>
                                                    </select>
                                                </div>
                                                <div class="form-group mb-4 col ms-2">
                                                    <label for="personEmail" style="color: #697A8D;">İlçe</label>
                                                    <select class="form-select shadow-none" aria-label="Default select example">
                                                        <option selected value="1">Lütfe İlçe Seçiniz</option>
                                                        <option value="2">Çankaya</option>
                                                        <option value="3">Keçiören</option>
                                                    </select>
                                                </div>
                                                <div class="form-group mb-4 col ms-2">
                                                    <label for="personEmail" style="color: #697A8D;">Mahalle</label>
                                                    <select class="form-select shadow-none" aria-label="Default select example">
                                                        <option selected value="1">Lütfen Mahalle Seçiniz</option>
                                                        <option value="2">Ayrancı</option>
                                                        <option value="3">Bahçelievler</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                    <div class="modal-footer d-flex justify-content-between">
                                        <div>
                                            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Grubu Sil</button>
                                        </div>
                                        <div>
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
                                            <button type="submit" class="btn" data-bs-dismiss="modal" style="background-color: #04A3DA; color: white;" on:click={updateGroupHandler}>Kaydet</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                    <div class="grid-box px-0 " style="max-height: 60vh;">
                        <!-- table -->
                        <div class="table-responsive rounded" style="margin-bottom: -20px;">
                            <table class="table table-borderless table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">İsim</th>
                                        <th scope="col">Telefon Numarası</th>
                                        <th scope="col">Lokasyon</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#if selectedTargetList.length > 0}
                                        {#each selectedTargetList as targetUser}
                                            <tr>
                                                <td>{targetUser._id}</td>
                                                <td>{targetUser.name}</td>
                                                <td>{targetUser.phoneNumber}</td>
                                                <td>{targetUser.location}</td>
                                            </tr>
                                        {/each}
                                    {:else if groupSelection == ''}
                                        <tr>
                                            <td colspan="4" class="text-center">Lütfen bir grup seçiniz.</td>
                                        </tr>
                                    {:else if selectedTargetList.length == 0}
                                        <tr>
                                            <td colspan="4" class="text-center">Bu gruba ait kişi listesi bulunmamaktadır.</td>
                                        </tr>
                                    {/if}
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</main>