<!-- src/lib/Sidebar.svelte -->
<script>
    import { Link } from "svelte-routing";
    // import search from '../assets/search.svg';
    import RLogo from '../assets/logo.svg'
    import logoSmall from '../assets/logo-dark.svg';
    import dashboard from '../assets/dashboard.svg';
    import accounts from '../assets/accounts.svg';
    import partners from '../assets/partners.svg';
    import layer from '../assets/layer.svg';
    import merchants from '../assets/merchant.svg';
    import arrow from '../assets/sidebar-arrow.svg';

    export let page;
    export let rotated;

    let sidebarWidth = 260;
    $: sidebarTextStyle = rotated ? 'display: none;' : 'display: block';
    $: sidebarWidth = rotated ? 94 : 260;

    $: dashboardButtonStyle = `
        ${page === 'adminDashboard' || page === 'userDashboard' ? 'background-color: #04A3DA; color: white;' : ''}
        ${rotated ? 'width: fit-content;' : 'width: 100%;'}`;

    $: dashboardImageStyle = `
        ${page === 'adminDashboard' || page === 'userDashboard' ? 'filter: invert(100%);' : ''}
        ${rotated ? 'margin-right: 0rem' : 'margin-right: 0.5rem'}`;

    $: companiesButtonStyle = `
        ${page === 'adminCompanies' ? 'background-color: #04A3DA; color: white;' : ''}
        ${rotated ? 'width: fit-content;' : 'width: 100%;'}`;

    $: companiesImageStyle = `
        ${page === 'adminCompanies' ? 'filter: invert(100%);' : ''}
        ${rotated ? 'margin-right: 0rem' : 'margin-right: 0.5rem'}`;

    $: campaignsButtonStyle = `
        ${page === 'adminCampaigns' || page === 'userCampaigns' ? 'background-color: #04A3DA; color: white;' : ''}
        ${rotated ? 'width: fit-content;' : 'width: 100%;'}`;

    $: campaignsImageStyle = `
        ${page === 'userCampaigns' ? 'filter: invert(100%);' : ''}
        ${rotated ? 'margin-right: 0rem' : 'margin-right: 0.5rem'}`;

    $: accountsButtonStyle = `
        ${page === 'adminAccounts' || page === 'userAccounts' ? 'background-color: #04A3DA; color: white;' : ''}
        ${rotated ? 'width: fit-content;' : 'width: 100%;'}`;

    $: accountsImageStyle = `
        ${page === 'adminAccounts' || page === 'userAccounts' ? 'filter: invert(100%);' : ''}
        ${rotated ? 'margin-right: 0rem' : 'margin-right: 0.5rem'}
    `;

    function rotate() {
        rotated = !rotated;
        if (rotated) {
            document.getElementById("sidebar").style.width = "94px";
        } else {
            document.getElementById("sidebar").style.width = "250px";
        }
    }
</script>

<style>
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
    #sidebar {
        transition: width 0.5s;
    }
    .text-sidebar {
        font-size: 16px;
        font-weight: 500;
    }
    .rotated {
        transform: rotate(180deg);
    }
</style>

<div class="d-flex flex-column flex-shrink-0 justify-content-between" style="width: { sidebarWidth }px;" id="sidebar">
    
    <ul class="nav nav-pills flex-column p-4">
        {#if !rotated}
            <img src="{ RLogo }" alt="Logo" class="img-responsive pt-2" style="width:fit-content; margin-bottom: 3rem">
        {:else}
            <img src="{ logoSmall }" alt="Logo" class="img-responsive pt-2 ms-2" width="26" style="margin-bottom: 3rem">
        {/if}
            
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
                <button class="btn sidebar-button mt-3 text-start d-flex align-items-middle" type="button" style="{ dashboardButtonStyle }">
                    <img src="{ dashboard }" alt="Dashboard" style="{ dashboardImageStyle }">
                    <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Dashboard</h1>
                </button>
            </Link>
        </li>
        <li>
            <Link to="/adminCompanies" style="text-decoration: none;">
                <button class="btn sidebar-button mt-3 text-start d-flex align-items-middle" type="button" style="{ companiesButtonStyle }">
                    <img src="{ partners }" alt="Accounts" style="{ companiesImageStyle }">
                    <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Firmalar</h1>
                </button>
            </Link>
        </li>
        <li>
            <Link to="/adminAccounts" style="text-decoration: none;">
                <button class="btn sidebar-button mt-3 text-start d-flex align-items-middle" type="button" style="{ accountsButtonStyle }">
                    <img src="{ layer }" alt="Accounts" style="{ accountsImageStyle }">
                    <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Kampanyalar</h1>
                </button>
            </Link>
        </li>
        <li>
            <Link to="/adminAccounts" style="text-decoration: none;">
                <button class="btn sidebar-button mt-3 text-start d-flex align-items-middle" type="button" style="{ accountsButtonStyle }">
                    <img src="{ merchants }" alt="Accounts" style="{ accountsImageStyle }">
                    <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Şablonlar</h1>
                </button>
            </Link>
        </li>
        <li>
            <Link to="/adminAccounts" style="text-decoration: none;">
                <button class="btn sidebar-button mt-3 text-start d-flex align-items-middle" type="button" style="{ accountsButtonStyle }">
                    <img src="{ accounts }" alt="Accounts" style="{ accountsImageStyle }">
                    <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Hesaplar</h1>
                </button>
            </Link>
        </li>
        {/if}
        {#if page.includes('user')}
        <li>
            <Link to="/userDashboard" style="text-decoration: none;">
                <button class="btn sidebar-button mt-3 w-100 text-start d-flex align-items-middle" type="button" style="{ dashboardButtonStyle }">
                    <img src="{ dashboard }" alt="Dashboard" style="{ dashboardImageStyle }">
                    <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Dashboard</h1>
                </button>
            </Link>
        </li>
        <li>
            <Link to="/userCampaigns" style="text-decoration: none;">
                <button class="btn sidebar-button mt-3 w-100 text-start d-flex align-items-middle" type="button" style="{ campaignsButtonStyle }">
                    <img src="{ accounts }" alt="Accounts" style="{ campaignsImageStyle }">
                    <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Kampanyalar</h1>
                </button>
            </Link>
        </li>
        <li>
            <Link to="/userAccounts" style="text-decoration: none;">
                <button class="btn sidebar-button mt-3 w-100 text-start d-flex align-items-middle" type="button" style="{ accountsButtonStyle }">
                    <img src="{ accounts }" alt="Accounts" style="{ accountsImageStyle }">
                    <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Hesaplar</h1>
                </button>
            </Link>
        </li>
        {/if}
    </ul>
</div>

<div class="d-flex align-items-start bg-light pt-4">
    <button class="btn p-0 border-0 shadow-0 d-flex justify-content-center align-items-center {rotated ? 'rotated' : ''}" style="margin-left: -19px; transition: transform 0.5s;" on:click={rotate}>
        <img src="{ arrow }" alt="Logo" width="38" style="z-index: 1;">
    </button>
</div>