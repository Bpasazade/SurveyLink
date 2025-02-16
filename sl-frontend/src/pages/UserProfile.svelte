<!-- src/UserProfile.svelte -->
<script>
    // Page Route
    localStorage.setItem('storedRoute', '/userProfile');

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

    import { onMount } from 'svelte';
    import { updateUser } from '../apis/adminApis';
    import userLogo from '../assets/user.svg';
    import directBoxDefault from '../assets/directbox-default.svg';
    import call from '../assets/call.svg';
    import done from '../assets/done.svg';

    var editedUser = {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      companyName: "",
      companyAddress: "",
      mainUserDegree: "",
    };

    // Get User Data
    import { getUser } from '../apis/userApis';
    let user_;

    onMount(async () => {
        await getUser(loggedInUser.id)
            .then((data) => {
                user_ = data;
            })
            .catch((error) => {
                console.error(error);
            });
    });

    let flag = true;
    $: {
      if (user_ && flag) {
        editedUser = { ...user_ };
        flag = false;
      }
    }

    onMount(() => {
      resetModal();
    });

    function resetModal() {
      editedUser = { ...user_ };
    }

    function saveChanges() {
      updateUser(user_._id, editedUser)
        .then((data) => {
          // Handle success
          console.log(data);
          window.location.reload();
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    }

    // Get Company
    import { getAllCompanies } from "../apis/adminApis";
    let companies = [];

    let selectedCompany = null;
    async function loadCompanies() {
        companies = await getAllCompanies();
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
    .input-group {
    border-radius: 10px;
    border: solid 1px #25324B14;
  }
  input {
    border: solid 1px transparent;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    align-items: center;
    height: 50px;
  }
  input {
    border: none;
    box-shadow: none;
    font-weight: 500;
    font-size: 14px;
  }
  input::placeholder {
    font-family: 'Sophia-Pro-Light', sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: #25324B !important;
  }
  .form-control:focus {
    box-shadow: none;
    font-weight: 400;
    color: #25324B !important;
  }
  .input-group-addon {
    border-right: none;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding-left: 0.9rem;
    padding-right: 0.9rem;
  }
  .form-control {
    font-size: 14px;
  }
  #save-button {
    height: 45px; 
    background-color: #04A3DA; 
    border-radius: 11px; 
    font-weight: 600; 
    font-size: 16px; 
    width: max-content;
  }
</style>

<main class="m-0 p-0">
    <div class="d-flex m-0 p-0" style="height: 92vh;">
        <Sidebar page="userProfile" rotated={rotated} />
        <div class="col-md px-0" id="main-content-div">
            <SearchProfileBar/>
            <div class="row ps-3 pe-4 pt-4 mx-0">
                <div class="bg-white d-flex flex-column align-items-center rounded mb-4 grid-box p-5" style="width:25vw; height: max-content;">
                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" class="rounded-circle mb-4" style="height: 15vh; width: 15vh;">
                    <div style="width:22vw;">
                        <!-- Name Lastname -->
                        <div class="input-group mb-3" id="name-group">
                          <span class="input-group-addon bg-white align-items-center d-flex" id="emailAddon">
                            <img src="{ userLogo }" alt="User Logo" width="24" />
                          </span>
                          <input type="text" id="edit-name" class="form-control ps-0 rounded" placeholder="Adınız/Soyadınız" bind:value={editedUser.name} >
                        </div>
            
                        <!-- Email -->
                        <div class="input-group mb-3" id="email-group">
                          <span class="input-group-addon bg-white align-items-center d-flex" id="emailAddon">
                            <img src="{ directBoxDefault }" alt="User Logo" width="24" />
                          </span>
                          <input type="email" id="edit-email" class="form-control ps-0" placeholder="Email" bind:value={editedUser.email}>
                        </div>
            
                        <!-- Phone Number -->
                        <div class="input-group mb-3" id="phone-group">
                          <span class="input-group-addon bg-white align-items-center d-flex" id="emailAddon">
                            <img src="{ call }" alt="User Logo" width="24" />
                          </span>
                          <input type="text" id="edit-phone" class="form-control ps-0" placeholder="Telefon Numarası" bind:value={editedUser.phoneNumber}>
                        </div>

                        <div class="row">
                          <div class="col">
                            <!-- Main User Degree -->
                            <div class="input-group mb-3" id="degree-group">
                              <span class="input-group-addon bg-white align-items-center d-flex" id="emailAddon">
                                <img src="{ userLogo }" alt="User Logo" width="24" />
                              </span>
                              <input type="text" id="edit-degree" class="form-control ps-0" placeholder="Unvan" bind:value={editedUser.mainUserDegree}>
                            </div>
                          </div>
                        </div>
                        <button id="save-button" type="submit" class="btn btn-primary border-0 px-3" 
                        style="float: right;"
                        data-bs-dismiss="modal" on:click={saveChanges}>
                            <span class="d-flex align-items-center">
                                Kaydet
                                <img src="{ done }" alt="Trash Can" class="">
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>