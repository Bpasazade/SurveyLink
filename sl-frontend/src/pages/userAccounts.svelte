<!-- src/UserAccounts.svelte -->
<script>
    // Page Route
    localStorage.setItem('storedRoute', '/hesaplar');

    // User
    import { user } from '../user.js';
    let loggedInUser;

    user.subscribe(value => {
        loggedInUser = value;
        console.log(loggedInUser);
    });

    // Sidebar
    import Sidebar from "../lib/Sidebar.svelte";
    let rotated = false;

    // Search Profile Bar
    import SearchProfileBar from "../lib/SearchProfileBar.svelte";
    
    // Main Content
    import trashCan from "../assets/trash-can.svg";
    import edit from "../assets/message-edit.svg";
    import user2 from '../assets/user_2.svg'

    // Lib
    import NewUserModal from "../lib/NewUserModal.svelte";
    import EditUserModal from "../lib/EditUserModal.svelte";
    import DeleteUserModal from "../lib/DeleteUserModal.svelte";
    import { getUsersByCompanyId } from "../apis/userApis";

    let users = [];
    let selectedUser = null;

    async function loadUsers() {
        users = await getUsersByCompanyId(loggedInUser.company);
    }

    loadUsers();

    // Get Company
    import { getAllCompanies } from "../apis/adminApis";
    let companies = [];

    let accountCompany;
    async function loadCompanies() {
        companies = await getAllCompanies();
        accountCompany = companies.find(company => company._id === loggedInUser.company);
    }

    loadCompanies();
    
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
    tr:first-child th:first-child {
        border-top-left-radius: 6px;
    }
    tr:first-child th:last-child {
        border-top-right-radius: 6px;
    }
</style>

<!-- Create User Modal -->
<NewUserModal loggedInUser={loggedInUser} />

<!-- Edit User Modal -->
<EditUserModal user = {selectedUser} company = {accountCompany} userType="user" />

<!-- Edit User Modal -->
<DeleteUserModal user = {selectedUser} />

<main class="m-0 p-0">
    <div class="d-flex m-0 p-0" style="height: 92vh;">        
        <Sidebar page="userAccounts" rotated={rotated} />

        <div class="col-md px-0" id="main-content-div">
            <SearchProfileBar/>
            <div class="row d-flex flex-column px-3 pt-2 mx-0">
                {#if loggedInUser.userType == "master"}
                    <div class="col-md-12 p-4 bg-white rounded mb-4 grid-box d-flex justify-content-end align-items-center grid-box">
                        <button class="btn px-3 py-2" type="button" style="border-radius: 8px; color: #697A8D; font-size: 14px; font-weight: 500; background-color: #F8F8F8;" data-bs-toggle="modal" data-bs-target="#newUserModal">
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
                            <th scope="col">Firma</th>
                            <th scope="col">Unvan</th>
                            <th scope="col" style="width: 60px;"></th>
                          </tr>
                        </thead>
                        <tbody>
                            {#if users.length !== 0 && companies.length !== 0}
                                {#each users as user, index}
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{companies.find(company => company._id === user.company).name}</td>
                                        <td>{user.mainUserDegree}</td>
                                        <td>
                                            {#if (loggedInUser.userType == "master") && (loggedInUser.id !== user._id)}
                                                <div class="d-flex justify-content-end">
                                                    <button class="btn p-0" type="button" data-bs-target="#editUserModal" data-bs-toggle="modal" on:click={() => (selectedUser = user)}>
                                                        <img src={edit} alt="arrow" width="24">
                                                    </button>
                                                    <div class="vr mx-3" style="width: 2px; color: #DDDDDD;"></div>
                                                    <button class="btn p-0" type="button" data-bs-target="#deleteUserModal" data-bs-toggle="modal" on:click={() => (selectedUser = user)}>
                                                        <img src={trashCan} alt="arrow" width="24">
                                                    </button>
                                                </div>
                                            {/if}
                                        </td>
                                    </tr>
                                {/each}
                            {/if}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</main>