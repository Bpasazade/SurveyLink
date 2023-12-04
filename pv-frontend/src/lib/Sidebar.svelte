<!-- src/lib/Sidebar.svelte -->
<script>
    import { Link } from "svelte-routing";
    // import search from '../assets/search.svg';
    import dashboard from '../assets/dashboard.svg';
    import accounts from '../assets/accounts.svg';
    import logout from '../assets/logout.svg';
    import profile from '../assets/profile.svg';
    import lifebuoy from '../assets/lifebuoy.svg';

    export let user;
    export let signOutUser;
    export let page;

    $: dashboardButtonStyle = page === 'adminDashboard' || page === 'userDashboard' ? 'background-color: #04A3DA; color: white;' : '';
    $: accountsButtonStyle = page === 'adminAccounts' ? 'background-color: #04A3DA; color: white;' : '';

    $: dashboardImageStyle = page === 'adminDashboard' || page === 'userDashboard' ? 'filter: invert(100%);' : '';
    $: accountsImageStyle = page === 'adminAccounts' ? 'filter: invert(100%);' : '';
</script>

<style>
    #sidebar {
        border-right: solid 2px #EAEBED !important;
    }
    /* #search-addon {
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
    } */
    .sidebar-button {
        padding: 0.75rem !important;
        color: #909090;
    }
    .sidebar-button:hover {
        background-color: #04A3DA;
        color: white;
    }
    .sidebar-button:hover > img {
        filter: invert(100%);
    }
    ul {
        list-style-type: none;
    }
    .btn-logout {
        border: none;
    }
</style>



<div class="d-flex flex-column flex-shrink-0 justify-content-between" style="width: 320px;" id="sidebar">
    <ul class="nav nav-pills flex-column p-4">
        <!-- <li class="nav-item">
            <div class="input-group w-100">
                <span class="input-group-addon align-items-center d-flex" id="search-addon">
                    <img src="{ search }" alt="Search" class="me-2">
                </span>
                <input class="form-control border-0" type="search" placeholder="Arama Yap" aria-label="Search" id="search-form">
            </div>     
        </li> -->
        {#if page.includes('admin')}
        <li>
            <Link to="/adminDashboard" style="text-decoration: none;">
                <button class="btn sidebar-button mt-3 w-100 text-start d-flex align-items-middle" type="button" style="{ dashboardButtonStyle }">
                    <img src="{ dashboard }" alt="Dashboard" class="me-2" style="{ dashboardImageStyle }">
                    Dashboard
                </button>
            </Link>
        </li>
        <li>
            <Link to="/adminAccounts" style="text-decoration: none;">
                <button class="btn sidebar-button mt-3 w-100 text-start d-flex align-items-middle" type="button" style="{ accountsButtonStyle }">
                    <img src="{ accounts }" alt="Accounts" class="me-2" style="{ accountsImageStyle }">
                    Hesaplar
                </button>
            </Link>
        </li>
        {/if}
        {#if page.includes('user')}
        <li>
            <Link to="/userDashboard" style="text-decoration: none;">
                <button class="btn sidebar-button mt-3 w-100 text-start d-flex align-items-middle" type="button" style="{ dashboardButtonStyle }">
                    <img src="{ dashboard }" alt="Dashboard" class="me-2" style="{ dashboardImageStyle }">
                    Dashboard
                </button>
            </Link>
        </li>
        {/if}
    </ul>
    <ul class="mb-4 p-4">
        <li>
            <button aria-disabled="true" class="btn disabled sidebar-button border-0 mt-3 w-100 text-start d-flex align-items-middle" type="button">
                <img src="{ lifebuoy }" alt="Dashboard" class="me-3">
                <p class="text m-0">Destek</p>
            </button>
            
            <hr class="mb-3" style="color: #E6E8EC; height: 1px; border: solid 1px #D9D9D9;">
            
            <div style="text-decoration: none;">
                <div class="d-flex justify-content-between align-items-center">
                    <img src="{ profile }" alt="User" class="me-3">
                    <div class="d-flex flex-column justify-content-between align-items-start">
                        <p class="text-black m-0">{ user.name }</p>
                        <p class="text-secondary m-0" style="font-size: 13px; font-weight:300;">{ user.email }</p>
                    </div>
                    
                    <button class="btn btn-logout text-start d-flex align-items-middle" type="button"  on:click="{ signOutUser }">
                        <img src="{ logout }" alt="Screens" class="me-2">
                    </button>
                </div>
            </div>
        </li>
</div>