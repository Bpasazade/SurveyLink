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
                                        <input type="text" class="form-control shadow-none" id="groupName" placeholder="Grup Adı Giriniz" bind:value={updatedGroupName}>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Grubu Sil</button>
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
                                        <button type="submit" class="btn" data-bs-dismiss="modal" style="background-color: #04A3DA; color: white;" on:click={updateGroupHandler}>Kaydet</button>
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