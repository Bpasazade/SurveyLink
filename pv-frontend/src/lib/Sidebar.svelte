<!-- src/lib/Sidebar.svelte -->
<script>
    import { onMount } from 'svelte';
    import { Link } from "svelte-routing";
    // import search from '../assets/search.svg';
    import RLogo from '../assets/logo.svg'
    import logoSmall from '../assets/logo-dark.svg';
    import dashboard from '../assets/sidebar/dashboard-icon.svg';
    import accounts from '../assets/accounts.svg';
    import partners from '../assets/partners.svg';
    import layer from '../assets/layer.svg';
    import merchants from '../assets/merchant.svg';
    import arrow from '../assets/sidebar-arrow.svg';

    import building from '../assets/building.svg';
    import bxsCollection from '../assets/bxs-collection.svg';
    import bxsUserAccount from '../assets/bxs-user-account.svg';
    import layout from '../assets/layout.svg';

    export let page;
    export let rotated;

    let sidebarWidth = 260;
    $: sidebarTextStyle = rotated ? 'display: none;' : 'display: block';
    $: sidebarWidth = rotated ? 94 : 260;

    $: dashboardButtonStyle = `
        ${page === 'adminDashboard' || page === 'userDashboard' ? 'background-color: #04A3DA; color: white;' : ''}
        ${rotated ? 'width: fit-content;' : 'width: 100%;'}`;

    $: dashboardImageStyle = `
        ${page === 'adminDashboard' || page === 'userDashboard' ? 'fill: white;' : ''}
        ${rotated ? 'margin-right: 0rem' : 'margin-right: 0.5rem'}`;

    onMount(() => {
        if (page === 'adminDashboard' || page === 'userDashboard') {
            const dashboardIcon = document.querySelectorAll('#dashboard-icon');
            if (dashboardIcon) {
                const paths = dashboardIcon[0].querySelectorAll('path');
                paths.forEach(path => {
                    path.style.fill = 'white';
                });
            }
        }
    });

    $: companiesButtonStyle = `
        ${page === 'adminCompanies' ? 'background-color: #04A3DA; color: white;' : ''}
        ${rotated ? 'width: fit-content;' : 'width: 100%;'}`;

    $: companiesImageStyle = `
        ${page === 'adminCompanies' ? 'filter: invert(100%);' : ''}
        ${rotated ? 'margin-right: 0rem' : 'margin-right: 0.5rem'}`;

    $: campaignsParentButtonStyle = `
        ${page === 'userCampaigns' || page === 'userCampaigns2' ? 'background-color: #04A3DA; color: white;' : ''}
        ${rotated ? 'width: fit-content;' : 'width: 100%;'}`;

    $: campaignsButtonStyle = `
        ${page === 'adminCampaigns' || page === 'userCampaigns' ? 'background-color: #04A3DA; color: white;' : ''}
        ${rotated ? 'width: fit-content;' : 'width: 100%;'}`;

    $: campaignsImageStyle = `
        ${page === 'userCampaigns' || page === 'userCampaigns2' ? 'color: white; font-size: 22px !important;' : ''}
        ${rotated ? 'margin-right: 0rem' : 'margin-right: 0.5rem'}`;

    $: campaigns2ButtonStyle = `
        ${page === 'userCampaigns2' ? 'background-color: #04A3DA; color: white;' : ''}
        ${rotated ? 'width: fit-content;' : 'width: 100%;'}`;

    $: accountsButtonStyle = `
        ${page === 'adminAccounts' || page === 'userAccounts' ? 'background-color: #04A3DA; color: white;' : ''}
        ${rotated ? 'width: fit-content;' : 'width: 100%;'}`;

    $: accountsImageStyle = `
        ${page === 'adminAccounts' || page === 'userAccounts' ? 'color: white; font-size: 22px !important;' : ''}
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
    i {
        color: #697A8D;
        font-size: 22px !important;
    }
    .sidebar-button:hover > i {
        color: white !important;
    }
    .sidebar-button:hover > svg > path {
        fill: white;
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
            <img src="{ RLogo }" alt="Logo" class="img-responsive pt-2 ms-2" style="width:fit-content; margin-bottom: 3rem">
        {:else}
            <img src="{ logoSmall }" alt="Logo" class="img-responsive pt-2 ms-2" width="26" style="margin-bottom: 3rem">
        {/if}
            
        {#if page.includes('admin')}
        <li>
            <Link to="/adminDashboard" style="text-decoration: none;">
                <button class="btn sidebar-button mt-3 text-start d-flex align-items-center" type="button" style="{ dashboardButtonStyle }">
                    <img src="{ dashboard }" alt="Dashboard" style="{ dashboardImageStyle }">
                    <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Dashboard</h1>
                </button>
            </Link>
        </li>
        <li>
            <Link to="/adminCompanies" style="text-decoration: none;">
                <button class="btn sidebar-button mt-3 text-start d-flex align-items-center" type="button" style="{ companiesButtonStyle }">
                    <img src="{ building }" alt="Accounts" style="{ companiesImageStyle }">
                    <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Firmalar</h1>
                </button>
            </Link>
        </li>
        <li>
            <Link to="/adminAccounts" style="text-decoration: none;">
                <button class="btn sidebar-button mt-3 text-start d-flex align-items-center" type="button" style="{ accountsButtonStyle }">
                    <img src="{ bxsCollection }" alt="Accounts" style="{ accountsImageStyle }">
                    <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Kampanyalar</h1>
                </button>
            </Link>
        </li>
        <li>
            <Link to="/adminAccounts" style="text-decoration: none;">
                <button class="btn sidebar-button mt-3 text-start d-flex align-items-center" type="button" style="{ accountsButtonStyle }">
                    <img src="{ bxsUserAccount }" alt="Accounts" style="{ accountsImageStyle }">
                    <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Hesaplar</h1>
                </button>
            </Link>
        </li>
        <li>
            <Link to="/adminAccounts" style="text-decoration: none;">
                <button class="btn sidebar-button mt-3 text-start d-flex align-items-center" type="button" style="{ accountsButtonStyle }">
                    <img src="{ layout }" alt="Accounts" style="{ accountsImageStyle }">
                    <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Şablonlar</h1>
                </button>
            </Link>
        </li>
        {/if}
        {#if page.includes('user')}
        <li>
            <Link to="/userDashboard" style="text-decoration: none;">
                <button class="btn sidebar-button mt-3 w-100 text-start d-flex align-items-center" type="button" style="{ dashboardButtonStyle }">
                    <svg id="dashboard-icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style="{ dashboardImageStyle }">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1831 12.0744C13.0832 12.2251 12.2251 13.0832 12.0745 14.1831C11.9881 14.8139 11.9167 15.4992 11.9167 16.0417C11.9167 16.5842 11.9881 17.2694 12.0745 17.9003C12.2251 19.0002 13.0832 19.8583 14.1831 20.0089C14.814 20.0953 15.4992 20.1667 16.0417 20.1667C16.5843 20.1667 17.2695 20.0953 17.9003 20.0089C19.0003 19.8583 19.8584 19.0002 20.009 17.9003C20.0954 17.2694 20.1667 16.5842 20.1667 16.0417C20.1667 15.4992 20.0954 14.8139 20.009 14.1831C19.8584 13.0832 19.0003 12.2251 17.9003 12.0744C17.2695 11.988 16.5843 11.9167 16.0417 11.9167C15.4992 11.9167 14.814 11.988 14.1831 12.0744Z" fill="#697A8D"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.09965 12.0744C2.99974 12.2251 2.14164 13.0832 1.991 14.1831C1.9046 14.8139 1.83325 15.4992 1.83325 16.0417C1.83325 16.5842 1.9046 17.2694 1.991 17.9003C2.14164 19.0002 2.99974 19.8583 4.09965 20.0089C4.73051 20.0953 5.41573 20.1667 5.95825 20.1667C6.50077 20.1667 7.18599 20.0953 7.81685 20.0089C8.91676 19.8583 9.77486 19.0002 9.9255 17.9003C10.0119 17.2694 10.0833 16.5842 10.0833 16.0417C10.0833 15.4992 10.0119 14.8139 9.9255 14.1831C9.77486 13.0832 8.91676 12.2251 7.81685 12.0744C7.18599 11.988 6.50077 11.9167 5.95825 11.9167C5.41573 11.9167 4.73051 11.988 4.09965 12.0744Z" fill="#697A8D"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1831 1.99106C13.0832 2.1417 12.2251 2.9998 12.0745 4.09971C11.9881 4.73057 11.9167 5.41579 11.9167 5.95831C11.9167 6.50083 11.9881 7.18605 12.0745 7.81691C12.2251 8.91682 13.0832 9.77493 14.1831 9.92556C14.814 10.012 15.4992 10.0833 16.0417 10.0833C16.5843 10.0833 17.2695 10.012 17.9003 9.92556C19.0003 9.77493 19.8584 8.91682 20.009 7.81691C20.0954 7.18605 20.1667 6.50083 20.1667 5.95831C20.1667 5.41579 20.0954 4.73057 20.009 4.09971C19.8584 2.9998 19.0003 2.1417 17.9003 1.99106C17.2695 1.90466 16.5843 1.83331 16.0417 1.83331C15.4992 1.83331 14.814 1.90466 14.1831 1.99106Z" fill="#697A8D"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.09965 1.99106C2.99974 2.1417 2.14164 2.9998 1.991 4.09971C1.9046 4.73057 1.83325 5.41579 1.83325 5.95831C1.83325 6.50083 1.9046 7.18605 1.991 7.81691C2.14164 8.91682 2.99974 9.77493 4.09965 9.92556C4.73051 10.012 5.41573 10.0833 5.95825 10.0833C6.50077 10.0833 7.18599 10.012 7.81685 9.92556C8.91676 9.77493 9.77486 8.91682 9.9255 7.81691C10.0119 7.18605 10.0833 6.50083 10.0833 5.95831C10.0833 5.41579 10.0119 4.73057 9.9255 4.09971C9.77486 2.9998 8.91676 2.1417 7.81685 1.99106C7.18599 1.90466 6.50077 1.83331 5.95825 1.83331C5.41573 1.83331 4.73051 1.90466 4.09965 1.99106Z" fill="#697A8D"/>
                    </svg>  
                    <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Dashboard</h1>
                </button>
            </Link>
        </li>
        <li>
            <button class="btn btn-toggle collapsed sidebar-button mt-3 w-100 text-start d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#campaigns-collapse" aria-expanded="false" type="button" style="{ campaignsParentButtonStyle }">
                <i class='bx bxs-collection' style="{ campaignsImageStyle }"></i>
                <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Kampanyalar</h1>
            </button>
            <div class="collapse" id="campaigns-collapse">
                <ul class="btn-toggle-nav list-unstyled fw-normal">
                    <li>
                        <Link to="/userCampaigns" style="text-decoration: none;">
                            <button class="btn sidebar-button mt-3 w-100 text-start d-flex align-items-center" type="button" style="{ campaignsButtonStyle }">
                                <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Kampanyalar 1</h1>
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/userCampaigns2" style="text-decoration: none;">
                            <button class="btn sidebar-button mt-3 w-100 text-start d-flex align-items-center" type="button" style="{ campaigns2ButtonStyle }">
                                <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Kampanyalar 2</h1>
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
        </li>
        <li>
            <Link to="/userAccounts" style="text-decoration: none;">
                <button class="btn sidebar-button mt-3 w-100 text-start d-flex align-items-center" type="button" style="{ accountsButtonStyle }">
                    <i class='bx bxs-user-account' style="{ accountsImageStyle }"></i>
                    <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Hesaplar</h1>
                </button>
            </Link>
        </li>
        {/if}
    </ul>
</div>

<div class="d-flex align-items-start pt-4" style="background-color: #F5F5F9; height: 100vh;">
    <button class="btn p-0 border-0 shadow-0 d-flex justify-content-center align-items-center {rotated ? 'rotated' : ''}" style="margin-left: -19px; transition: transform 0.5s;" on:click={rotate}>
        <img src="{ arrow }" alt="Logo" width="38" style="z-index: 1;">
    </button>
</div>