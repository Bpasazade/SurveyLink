<script>
    import search from '../assets/search.svg'
    import bell from '../assets/bell.svg'
    import profile from '../assets/profile.svg'
    import arrowDown from '../assets/arrow-down.svg'
    import seperator from '../assets/spbar-seperator.png'
    import powerOff from '../assets/power-off.svg'
    import helpCircle from '../assets/help-circle.svg'
    import cog from '../assets/cog.svg'
    import userDm from '../assets/user-dm.svg'
    
    import { user } from '../user.js';
    let loggedInUser;

    user.subscribe(value => {
        loggedInUser = value;
    });

    import { getUser } from "../apis/userApis.js";

    var user_ = {
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        verifyPassword: "",
        companyName: "",
        mainUserDegree: "",
        role: "",
        userType: "",
    }
    async function getTheUser() {
        user_ = await getUser(loggedInUser.id);
    }

    getTheUser();

    import { signOut } from "../apis/userApis";
    import { navigate } from 'svelte-routing';
    async function signOutUser() {
        try {
            await signOut();
            localStorage.removeItem('accessToken');
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }

    function navigateToUserProfile() {
        navigate('/userProfile');
    }
</script>

<style>
    .form-control:focus {
        border: none;
        outline: none !important;
        box-shadow: none;
    }
    .btn:focus {
        outline: none !important;
        box-shadow: none;
    }
    .search-profile-bar {
        background-color: #F4F5F6;
        padding-left: 0.65rem;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        border-radius: 6px;
    }
    .dropdown-menu {
        border-radius: 6px;
        border: none;
        filter: drop-shadow(0px 0px 24.4px rgba(0, 0, 0, 0.13));
    }
    .dropdown-item {
        font-size: 16px;
        font-weight: 500;
        color: #25324B;
    }
    .dropdown-item:hover, .dropdown-item:focus {
        color: #25324B;
        background-color: white;
    }
    .dropdown-toggle::after {
        display: none;
    }
    #help {
        border-top: 1px solid #E6E8EC;
        border-bottom: 1px solid #E6E8EC;
    }
</style>

<div class="search-profile-bar d-flex justify-content-between align-items-center bg-white m-3 me-4">
    <div class="d-flex align-items-center w-100 ms-3">
        <img src="{ search }" alt="Search" class="me-3">
        <input type="text" class="form-control" placeholder="Arama" style="border: none;">
    </div>
    <div class="d-flex align-items-center">
        <img src="{ bell }" alt="Notification" style="margin-right: 15px;">
        <img src="{ seperator }" alt="Seperator" style="margin-right: 24px;" height="28">
        <div style="text-decoration: none;">
            <div class="d-flex justify-content-between align-items-center">
                <img src="{ profile }" alt="User" class="me-3" width="38">
                <div class="d-flex flex-column justify-content-between align-items-start me-2">
                    <p class="text-black m-0" style="font-size: 15px; font-weight:700;">{ user_.name }</p>
                    <p class="text-secondary m-0" style="font-size: 13px; font-weight:300;">{ user_.email }</p>
                </div>

                <div class="dropdown">
                    <button class="btn border-0 dropdown-toggle pe-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="{ arrowDown }" alt="Screens" width="24">
                    </button>
                    <ul class="dropdown-menu border-0 mt-4">
                        <button class="dropdown-item p-0" on:click={navigateToUserProfile}>
                            <li class="px-4 py-3">
                                <img class="me-3" src="{ userDm }" alt="Screens" width="24">
                                Profil Bilgilerim
                            </li>
                        </button>
                        <button class="dropdown-item p-0" disabled>
                            <li class="px-4 py-3">
                                <img class="me-3" src="{ cog }" alt="Screens" width="24">
                                Ayarlar
                            </li>
                        </button>
                        <button class="dropdown-item p-0" disabled>
                            <li id="help" class="px-4 py-3">
                                <img class="me-3" src="{ helpCircle }" alt="Screens" width="24">
                                Yardım
                            </li>
                        </button>
                        <button class="dropdown-item p-0" on:click={signOutUser}>
                            <li class="px-4 py-3">
                                <img class="me-3" src="{ powerOff }" alt="Screens" width="24">
                                Çıkış Yap   
                            </li>
                        </button>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
