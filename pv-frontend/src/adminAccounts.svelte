<!-- src/MediaManagement.svelte -->
<script>
    localStorage.setItem('storedRoute', '/adminAccounts');
    // Sidebar
    import Sidebar from "./lib/Sidebar.svelte";
    import arrow from './assets/sidebar-arrow.svg'
    
    // Main Content
    import userAdd from "./assets/user-add.svg";
    import trashCan from "./assets/trash-can.svg";
    import edit from "./assets/message-edit.svg";

    // Lib
    import SearchProfileBar from "./lib/SearchProfileBar.svelte";

    import Navbar from "./lib/Navbar.svelte";
    import NewUserModal from "./lib/NewUserModal.svelte";
    import NewCompanyModal from "./lib/NewCompanyModal.svelte";
    import EditUserModal from "./lib/EditUserModal.svelte";
    import DeleteUserModal from "./lib/DeleteUserModal.svelte";
    import { fetchUsers } from "./apis/adminApis";
    import { signOut } from "./apis/userApis";
    import { navigate } from 'svelte-routing';
    import { getUser } from "./apis/userApis";

    let users = [];
    let selectedUser = null;

    async function loadUsers() {
        try {
            users = await fetchUsers();
        } catch (error) {
            console.error(error);
        }
    }

    loadUsers();

    import jwt_decode from "jwt-decode";
    var decoded = {
        id: null,
        ait: null,
        exp: null
    }
    decoded = jwt_decode(localStorage.getItem("accessToken"));
    
    var user = {
        name: "",
        email: "",
        phoneNumber: "",
        mainUserDegree: "",
        companyName: "",
    }
    async function getTheUser() {
        user = await getUser(decoded.id);
    }
    getTheUser();

    async function signOutUser() {
        try {
            await signOut();
            localStorage.removeItem('accessToken');
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }
    let rotated = false;

    function rotate() {
        rotated = !rotated;

        // if rotated is true, rotate back to 94 px width smoothly
        // if rotated is false, rotate to 250 px width smoothly
        if (rotated) {
            document.getElementById("sidebar").style.width = "94px";
        } else {
            document.getElementById("sidebar").style.width = "250px";
        }
    }
</script>

<style>
    main {
        height: 100vh;
    }
    #navbar {
        border-bottom: solid 2px #EAEBED !important;
    }
    #sidebar {
        border-right: solid 2px #EAEBED !important;
    }
    #search-addon {
        border-right: none;
        border-top-left-radius: 0.375rem;
        border-bottom-left-radius: 0.375rem;
        padding-left: 0.75rem;
        background-color: #F4F5F6;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
    }
    #search-form {
        border-left: none;
        border-top-right-radius: 0.375rem;
        border-bottom-right-radius: 0.375rem;
        background-color: #F4F5F6;
        padding-left: 0;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
    }
    #search-form:focus {
        box-shadow: none;
        font-weight: 400;
        color: #25324B !important;
    }
    #main-content-div {
        background-color: #f7f7f7;
    }
    #mediaTable {
        border-collapse: separate;
        border-spacing: 0 1.3rem;
    }
    tr > td {
        text-align: left;
        border-width: 2px 0;
        border-style: solid;
        border-color: transparent;
    }
    td {
        vertical-align: middle !important;
    }
    tr:hover > .fileDesc {
        text-align: left;
        border-width: 2px 0; 
        border-color: #DDDDDD;
        border-style: solid;
        background-color: #F6F6F6;
    }
    th {
        font-weight: 600 !important;
    }
    td, th {
        padding: 0.60rem !important;
        text-align: left;
        font-size: 16px;
        font-weight: 400;
        position: relative;
    }
    td:nth-child(2) {
        border-left: 2px solid transparent;
    }
    td:last-child {
        border-right: 2px solid transparent;
    }
    tr:hover > td:nth-child(2) {
        border-left-width: 2px;
        border-right-width: 0px;
        border-radius: 9px 0 0 9px;
    }
    tr:hover > td:last-child {
        border-right-width: 2px;
        border-left-width: 0px;
        border-radius: 0 9px 9px 0;
    }
    #mediaTable td::before, th::before {
        content: "";
        position: absolute;
        bottom: -0.80rem;
        left: 0;
        width: 103%;
        height: 2px;
        background-color: #E6E8EC;
        z-index: 1;
    }
</style>

<!-- Create User Modal -->
<NewUserModal />

<!-- Edit User Modal -->
<EditUserModal user = {selectedUser} />

<!-- Edit User Modal -->
<DeleteUserModal user = {selectedUser} />

<main class="m-0 p-0">
    <div class="d-flex m-0 p-0" style="height: 92vh;">
        <Sidebar page="adminAccounts" rotated={rotated} />

        <div class="col-md px-0" id="main-content-div">
            <SearchProfileBar user={user} signOutUser={signOutUser} />
            <div class="row d-flex flex-column px-4 pt-4 mx-0">
                <div class="col-md-12 p-4 bg-white rounded mb-4">
                    <div class="d-flex justify-content-end">
                        <div class="col-md-6 d-flex justify-content-end">
                            <button class="btn bg-light me-2 media-content-button border-0 p-3" data-bs-toggle="modal" data-bs-target="#newUserModal">
                                <img src="{ userAdd }" alt="Directbox Send" class="me-2">
                                Kişi Oluştur
                            </button>
                        </div>
                    </div>
                </div>

                <hr class="mb-4" style="color: #E6E8EC; height: 1px; border: solid 1px #e2e4e7;">
                <div class="container mx-0 px-0">
                    <div class="col-md-12 px-4 bg-white rounded mb-4 py-1">
                        <table class="table table-borderless " id="mediaTable">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">İsim - Soyisim</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Unvan</th>
                                    <th scope="col">Şirket Adı</th>
                                    <th scope="col" style="width: 60px !important;"></th>
                                  </tr>
                            </thead>
                            <tbody id="user-table-tbody">
                                {#each users as user, index}
                                <tr class="text-center">
                                    <td>
                                        <input class="form-check-input" type="checkbox" value="" id="{user._id}">
                                    </td>
                                    <td class="fileDesc">{user.name}</td>
                                    <td class="fileDesc">{user.email}</td>
                                    <td class="fileDesc">{user.mainUserDegree}</td>
                                    <td class="fileDesc">{user.companyName}</td>
                                    <td class="fileDesc">
                                        <div class="col d-flex justify-content-center align-items-center" style="width: fit-content;">
                                            <button class="btn shadow-0 d-flex justify-content-between align-items-center" data-bs-target="#deleteUserModal" data-bs-toggle="modal" on:click={() => (selectedUser = user)}>
                                                <span>
                                                    <img src="{ trashCan }" alt="Trash Can" width="25">
                                                </span>
                                            </button>
                                            <div class="vr" style="width: 2px; color: #DDDDDD;"></div>
                                            <button class="btn shadow-0 d-flex justify-content-between align-items-center" data-bs-target="#editUserModal" data-bs-toggle="modal" on:click={() => (selectedUser = user)}>
                                                <span>
                                                    <img src="{ edit }" alt="Edit" width="25">
                                                </span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>