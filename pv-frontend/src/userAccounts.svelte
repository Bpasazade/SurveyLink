<!-- src/MediaManagement.svelte -->
<script>
    // Sidebar
    import Sidebar from "./lib/Sidebar.svelte";
    import arrow from './assets/sidebar-arrow.svg'
    
    // Main Content
    import userAdd from "./assets/user-add.svg";
    import trashCan from "./assets/trash-can.svg";
    import edit from "./assets/message-edit.svg";
    import user2 from './assets/user_2.svg'

    // Lib
    import SearchProfileBar from "./lib/SearchProfileBar.svelte";

    import Navbar from "./lib/Navbar.svelte";
    import NewUserModal from "./lib/NewUserModal.svelte";
    import EditUserModal from "./lib/EditUserModal.svelte";
    import DeleteUserModal from "./lib/DeleteUserModal.svelte";
    import { getCompanyUsers } from "./apis/userApis";
    import { signOut } from "./apis/userApis";
    import { navigate } from 'svelte-routing';
    import { getUser } from "./apis/userApis";

    localStorage.setItem('storedRoute', '/userAccounts');

    import jwt_decode from "jwt-decode";
    import { getCompanyByName } from "./apis/adminApis";
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
        userType: "",
    }

    var company = {
        name: "",
        address: "",
    }
    var companyid = "";

    async function getTheUser() {
        user = await getUser(decoded.id);
    }

    async function getCompany() {
        company = await getCompanyByName(user.companyName);
        companyid = company._id;
    }

    getTheUser();
    getCompany();

    console.log(user);

    // var currentUser = getUser(sessionStorage.getItem('userId') );
    async function signOutUser() {
        try {
            await signOut();
            localStorage.removeItem('accessToken');
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }

    let users = [];
    let selectedUser = null;

    async function loadUsers() {
        try {
            users = await getCompanyUsers(companyid);
        } catch (error) {
            console.error(error);
        }
    }

    loadUsers();

    let rotated = false;
</script>

<style>
    main {
        height: 100vh;
    }
    #main-content-div {
        background-color: #F5F5F9;
        height: 100vh;
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
</style>

<!-- Create User Modal -->
<NewUserModal />

<!-- Edit User Modal -->
{#if selectedUser !== null}
    <EditUserModal user = {selectedUser} />
{/if}

<!-- Edit User Modal -->
{#if selectedUser !== null}
    <DeleteUserModal user = {selectedUser} />
{/if}

<main class="m-0 p-0">
    <div class="d-flex m-0 p-0" style="height: 92vh;">        
        <Sidebar page="userAccounts" rotated={rotated} />

        <div class="col-md px-0" id="main-content-div">
            <SearchProfileBar user={user} signOutUser={signOutUser} />
            <div class="row d-flex flex-column px-4 pt-4 mx-0">
                {#if user.userType == "master"}
                <div class="col-md-12 p-4 bg-white rounded mb-4 grid-box d-flex justify-content-end align-items-center grid-box">
                    <button class="btn px-3 py-2" type="button" style="border-radius: 8px; color: #697A8D; font-size: 14px; font-weight: 500; background-color: #F8F8F8;">
                        <img src={user2} alt="arrow" width="20" class="me-2">
                        Hesap Oluştur 
                    </button>
                </div>
                {/if}

                <div class="bg-white rounded mb-4 grid-box px-0" style="height: 43vh;">
                    <table class="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Ad-Soyad</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Telefon</th>
                            <th scope="col" style="width: 60px;"></th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Hasan Basri Paşazade</td>
                                <td>11 Ara 2023, 10:58</td>
                                <td>534 262 58 06</td>
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
                            <tr>
                                <th scope="row">1</th>
                                <td>Hasan Basri Paşazade</td>
                                <td>11 Ara 2023, 10:58</td>
                                <td>534 262 58 06</td>
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
                            <tr>
                                <th scope="row">1</th>
                                <td>Hasan Basri Paşazade</td>
                                <td>11 Ara 2023, 10:58</td>
                                <td>534 262 58 06</td>
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
                            <tr>
                                <th scope="row">1</th>
                                <td>Hasan Basri Paşazade</td>
                                <td>11 Ara 2023, 10:58</td>
                                <td>534 262 58 06</td>
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
                        </tbody>
                      </table>
                </div>
            </div>
        </div>
    </div>
</main>