<!-- src/MediaManagement.svelte -->
<script>
    localStorage.setItem('storedRoute', '/adminAccounts');

    // User
    import { user } from "../user.js";
    let loggedInUser = user;
    user.subscribe(value => {
        loggedInUser = value;
    });

    // Sidebar
    import Sidebar from "../lib/Sidebar.svelte";
    
    // Main Content
    import userAdd from "../assets/user-add.svg";
    import trashCan from "../assets/trash-can.svg";
    import edit from "../assets/message-edit.svg";

    // Lib
    import SearchProfileBar from "../lib/SearchProfileBar.svelte";

    import NewUserModal from "../lib/NewUserModal.svelte";
    import NewCompanyModal from "../lib/NewCompanyModal.svelte";
    import EditUserModal from "../lib/EditUserModal.svelte";
    import DeleteUserModal from "../lib/DeleteUserModal.svelte";
    import { fetchUsers } from "../apis/adminApis";

    let users = [];
    let selectedUser = null;

    async function loadUsers() {
        try {
            users = await fetchUsers();
            console.log(users);
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
<NewUserModal loggedInUser = {loggedInUser} />

<!-- Edit User Modal -->
<EditUserModal user = {selectedUser} />

<!-- Edit User Modal -->
<DeleteUserModal user = {selectedUser} />

<main class="m-0 p-0">
    <div class="d-flex m-0 p-0" style="height: 92vh;">
        <Sidebar page="adminAccounts" rotated={rotated} />

        <div class="col-md px-0" id="main-content-div">
            <SearchProfileBar/>
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
                    <div class="col-md-12 bg-white rounded mb-4 py-1">
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
                                {#if users.length !== 0}
                                    {#each users as user, index}
                                    {#if user.role !== "admin"}
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td>
                                                
                                                <div class="d-flex justify-content-end">
                                                    <button class="btn p-0" type="button" data-bs-target="#editCompanyModal" data-bs-toggle="modal" on:click={() => (selectedUser = user)}>
                                                        <img src={edit} alt="arrow" width="24">
                                                    </button>
                                                    <div class="vr mx-3" style="width: 2px; color: #DDDDDD;"></div>
                                                    <button class="btn p-0" type="button" data-bs-target="#deleteCompanyModal" data-bs-toggle="modal" on:click={() => (selectedUser = user)}>
                                                        <img src={trashCan} alt="arrow" width="24">
                                                    </button>
                                                </div>
                                                
                                            </td>
                                        </tr>
                                        {/if}
                                    {/each}
                                {/if}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>