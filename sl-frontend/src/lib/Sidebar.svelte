<!-- src/lib/Sidebar.svelte -->
<script>
    // User
    import { user } from '../user.js';
    let loggedInUser;

    user.subscribe(value => {
        loggedInUser = value;
    });

    import { Link } from "svelte-routing";
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
        ${page === 'adminDashboard' || page === 'userDashboard' ? 'fill: white;' : ''}
        ${rotated ? 'margin-right: 0rem' : 'margin-right: 0.5rem'}`;

    $: companiesButtonStyle = `
        ${page === 'adminCompanies' ? 'background-color: #04A3DA; color: white;' : ''}
        ${rotated ? 'width: fit-content;' : 'width: 100%;'}`;

    $: companiesImageStyle = `
        ${page === 'adminCompanies' ? 'fill: white;' : ''}
        ${rotated ? 'margin-right: 0rem' : 'margin-right: 0.5rem'}`;

    $: campaignsParentButtonStyle = `
        ${page === 'userCampaigns' || page === 'userCampaigns2' || page === 'userSmsService' ? 'background-color: #04A3DA; color: white;' : ''}
        ${rotated ? 'width: fit-content;' : 'width: 100%;'}`;

    $: campaignsButtonStyle = `
        ${page === 'adminCampaigns' || page === 'userCampaigns' ? 'background-color: #04A3DA; color: white;' : ''}
        ${rotated ? 'width: fit-content;' : 'width: 100%;'}`;

    $: campaignsImageStyle = `
        ${page === 'adminCampaigns' ||page === 'userCampaigns' || page === 'userCampaigns2' || page === 'userSmsService' ? 'color: white; font-size: 22px !important;' : ''}
        ${rotated ? 'margin-right: 0rem' : 'margin-right: 0.5rem'}`;

    $: campaigns2ButtonStyle = `
        ${page === 'userCampaigns2' ? 'background-color: #04A3DA; color: white;' : ''}
        ${rotated ? 'width: fit-content;' : 'width: 100%;'}`;

    $: smsServiceButtonStyle = `
        ${page === 'userSmsService' ? 'background-color: #04A3DA; color: white;' : ''}
        ${rotated ? 'width: fit-content;' : 'width: 100%;'}`;

    $: smsServiceImageStyle = `
        ${page === 'userSmsService' ? 'color: white; font-size: 22px !important;' : ''}
        ${rotated ? 'margin-right: 0rem' : 'margin-right: 0.5rem'}`;

    $: groupsButtonStyle = `
        ${page === 'userGroups' ? 'background-color: #04A3DA; color: white;' : ''}
        ${rotated ? 'width: fit-content;' : 'width: 100%;'}`;

    $: groupsImageStyle = `
        ${page === 'userGroups' ? 'color: white; font-size: 22px !important;' : ''}
        ${rotated ? 'margin-right: 0rem' : 'margin-right: 0.5rem'}`;

    $: accountsButtonStyle = `
        ${page === 'adminAccounts' || page === 'userAccounts' ? 'background-color: #04A3DA; color: white;' : ''}
        ${rotated ? 'width: fit-content;' : 'width: 100%;'}`;

    $: accountsImageStyle = `
        ${page === 'adminAccounts' || page === 'userAccounts' ? 'color: white; font-size: 22px !important;' : ''}
        ${rotated ? 'margin-right: 0rem' : 'margin-right: 0.5rem'}`;

    $: templatesButtonStyle = `
        ${page === 'adminTemplates' || page === 'userTemplates' ? 'background-color: #04A3DA; color: white;' : ''}
        ${rotated ? 'width: fit-content;' : 'width: 100%;'}`;

    $: templatesImageStyle = `
        ${page === 'adminTemplates' || page === 'userTemplates' ? 'color: white; font-size: 22px !important;' : ''}
        ${rotated ? 'margin-right: 0rem' : 'margin-right: 0.5rem'}`;

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
    .sidebar-button:hover > svg > g > path {
        fill: white;
    }
    .active-button > svg > path {
        fill: white;
    }
    .active-button > svg > g > path {
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
    .sub-button {
        color: #1783A8;
    }
    .vr {
        width: 2px;
        height: auto;
        background-color: #1783A8;
    }
</style>

<div class="d-flex flex-column flex-shrink-0 justify-content-between" style="width: { sidebarWidth }px;" id="sidebar">
    
    <ul class="nav nav-pills flex-column p-4">
        {#if !rotated}
            <a href="/dashboard">
                <h1 class="text text-sidebar" style="{ sidebarTextStyle }">SurveyLink</h1>
            </a>
        {:else}
            <a href="/dashboard">
                <h1 class="text text-sidebar" style="{ sidebarTextStyle }">SL</h1>
            </a>
        {/if}
            
        {#if loggedInUser.role.includes("ROLE_ADMIN")}
            <li>
                <Link to="/dashboard" style="text-decoration: none;">
                    <button class="btn sidebar-button mt-3 text-start d-flex align-items-center { page === 'adminDashboard' ? 'active-button' : '' }" type="button" style="{ dashboardButtonStyle }">
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
                <Link to="/adminCompanies" style="text-decoration: none;">
                    <button class="btn sidebar-button mt-3 text-start d-flex align-items-center { page === 'adminCompanies' ? 'active-button' : '' }" type="button" style="{ companiesButtonStyle }">
                        <svg id="companies-icon" xmlns="http://www.w3.org/2000/svg" class="me-2" width="22" height="22" viewBox="0 0 22 22" fill="none" style="{ companiesImageStyle }">
                            <path d="M19.25 18.2417V9.80834C19.25 9.44167 19.0667 9.07501 18.7 8.98334L12.8334 6.41668V18.3333H11V2.47501C11 2.38334 11 2.38334 11 2.29167C10.9084 2.01667 10.6334 1.92501 10.3584 2.01667L3.30002 5.22501C2.93335 5.40834 2.75002 5.68334 2.75002 6.05001V18.2417H0.916687V20.075H21.0834V18.2417H19.25Z" fill="#697A8D"/>
                        </svg>
                        <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Firmalar</h1>
                    </button>
                </Link>
            </li>
            <li>
                <Link to="/adminCampaigns" style="text-decoration: none;">
                    <button class="btn sidebar-button mt-3 text-start d-flex align-items-center" type="button" style="{ campaignsButtonStyle }">
                        <i class='bx bxs-collection me-2' style="{ campaignsImageStyle }"></i>
                        <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Kampanyalar</h1>
                    </button>
                </Link>
            </li>
            <li>
                <Link to="/hesaplar" style="text-decoration: none;">
                    <button class="btn sidebar-button mt-3 text-start d-flex align-items-center" type="button" style="{ accountsButtonStyle }">
                        <i class='bx bxs-user-account me-2' style="{ accountsImageStyle }"></i>
                        <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Hesaplar</h1>
                    </button>
                </Link>
            </li>
            <!-- <li>
                <Link to="/adminTemplates" style="text-decoration: none;">
                    <button class="btn sidebar-button mt-3 text-start d-flex align-items-center" type="button" style="{ templatesButtonStyle }">
                        <svg id="templates-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" style="{ templatesImageStyle }">
                            <path d="M9.49994 2H2.74993C2.33772 2 2 2.33772 2 2.74993V11C2 11.4124 2.33772 11.7499 2.74993 11.7499H9.49994C9.91236 11.7499 10.2501 11.4124 10.2501 11V2.74993C10.2501 2.33772 9.91236 2 9.49994 2Z" fill="#697A8D"/>
                            <path d="M19.2501 10.2501H12.5001C12.0877 10.2501 11.7499 10.5876 11.7499 11V19.2501C11.7499 19.6623 12.0877 20 12.5001 20H19.2501C19.6623 20 20 19.6623 20 19.2501V11C20 10.5876 19.6623 10.2501 19.2501 10.2501Z" fill="#697A8D"/>
                            <path d="M9.49994 13.25H2.74993C2.33772 13.25 2 13.5877 2 13.9999V19.2501C2 19.6623 2.33772 20 2.74993 20H9.49994C9.91236 20 10.2501 19.6623 10.2501 19.2501V13.9999C10.2501 13.5877 9.91236 13.25 9.49994 13.25Z" fill="#697A8D"/>
                            <path d="M19.2501 2H12.5001C12.0877 2 11.7499 2.33772 11.7499 2.74993V8.00008C11.7499 8.41229 12.0877 8.75001 12.5001 8.75001H19.2501C19.6623 8.75001 20 8.41229 20 8.00008V2.74993C20 2.33772 19.6623 2 19.2501 2Z" fill="#697A8D"/>
                        </svg>
                        <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Şablonlar</h1>
                    </button>
                </Link>
            </li> -->
        {:else}
            <li>
                <Link to="/dashboard" style="text-decoration: none;">
                    <button class="btn sidebar-button mt-3 w-100 text-start d-flex align-items-center { page === 'userDashboard' ? 'active-button' : '' }" type="button" style="{ dashboardButtonStyle }">
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
                    <div class="d-flex justify-content-between">
                        <div class="vr ms-2 me-2 mt-3"></div>
                        <ul class="btn-toggle-nav list-unstyled fw-normal">
                            <li>
                                <Link to="/kampanyalar" style="text-decoration: none;">
                                    <button class="btn sidebar-button mt-3 w-100 text-start d-flex align-items-center sub-button { page === 'userCampaigns2' ? 'active-button' : '' }" type="button" style="{ campaigns2ButtonStyle }">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="me-2" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                            <g clip-path="url(#clip0_741_94)">
                                            <path d="M7.00012 2.50012H1.00022C0.447931 2.50012 0.000244141 2.94781 0.000244141 3.5001V9.5C0.000244141 10.0523 0.447931 10.5 1.00022 10.5H7.00012C7.55241 10.5 8.0001 10.0523 8.0001 9.5V3.5001C8.0001 2.94781 7.55241 2.50012 7.00012 2.50012ZM6.00015 8.50002H2.0002V4.50007H6.00015V8.50002Z" fill="#1783A8"/>
                                            <path d="M21.0001 5.50006H11.0002C10.4479 5.50006 10.0002 5.94775 10.0002 6.50004C10.0002 7.05233 10.4479 7.50001 11.0002 7.50001H21.0001C21.5524 7.50001 22 7.05233 22 6.50004C22 5.94779 21.5523 5.50006 21.0001 5.50006Z" fill="#1783A8"/>
                                            <path d="M21.0001 15.4999H11.0002C10.4479 15.4999 10.0002 15.9476 10.0002 16.4999C10.0002 17.0521 10.4479 17.4998 11.0002 17.4998H21.0001C21.5524 17.4998 22 17.0521 22 16.4999C22 15.9476 21.5523 15.4999 21.0001 15.4999Z" fill="#1783A8"/>
                                            <path d="M6.30025 13.789L2.97131 17.0779L1.71933 15.7779C1.33523 15.3809 0.701946 15.3703 0.304849 15.7544C-0.0922484 16.1385 -0.102774 16.7718 0.28133 17.1689L2.23528 19.1999C2.42162 19.39 2.67608 19.498 2.94229 19.4999H2.95429C3.21646 19.499 3.46785 19.3953 3.65427 19.2109L7.70022 15.2109C8.1188 14.8507 8.1661 14.2193 7.80586 13.8007C7.44563 13.3821 6.8142 13.3348 6.39562 13.6951C6.36179 13.7242 6.32992 13.7556 6.30025 13.789Z" fill="#1783A8"/>
                                            </g>
                                            <defs>
                                            <clipPath id="clip0_741_94">
                                                <rect width="22" height="22" fill="white"/>
                                            </clipPath>
                                            </defs>
                                        </svg>
                                        <h1 class="text text-sidebar mb-0" style="{ sidebarTextStyle }">Tüm Kampanyalar</h1>
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/kampanya-analizi" style="text-decoration: none;">
                                    <button class="btn sidebar-button mt-3 w-100 text-start d-flex align-items-center sub-button { page === 'userCampaigns' ? 'active-button' : '' }" type="button" style="{ campaignsButtonStyle }">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="me-2" width="22" height="21" viewBox="0 0 22 21" fill="none">
                                            <path d="M19.2499 9.16665C19.493 9.16665 19.7262 9.07007 19.8981 8.89816C20.07 8.72625 20.1666 8.49309 20.1666 8.24998V5.49998C20.1666 5.25686 20.07 5.02371 19.8981 4.8518C19.7262 4.67989 19.493 4.58331 19.2499 4.58331H16.4999C16.2568 4.58331 16.0236 4.67989 15.8517 4.8518C15.6798 5.02371 15.5833 5.25686 15.5833 5.49998C15.5833 5.74309 15.6798 5.97625 15.8517 6.14816C16.0236 6.32007 16.2568 6.41665 16.4999 6.41665H17.0371L11.9166 11.5371L9.81467 9.43523C9.64277 9.26338 9.40965 9.16684 9.16659 9.16684C8.92352 9.16684 8.6904 9.26338 8.5185 9.43523L3.66659 14.2871V2.74998C3.66659 2.50686 3.57001 2.27371 3.3981 2.1018C3.22619 1.92989 2.99303 1.83331 2.74992 1.83331C2.5068 1.83331 2.27365 1.92989 2.10174 2.1018C1.92983 2.27371 1.83325 2.50686 1.83325 2.74998V17.4166C1.83325 18.146 2.12298 18.8455 2.63871 19.3612C3.15443 19.8769 3.85391 20.1666 4.58325 20.1666H19.2499C19.493 20.1666 19.7262 20.0701 19.8981 19.8982C20.07 19.7263 20.1666 19.4931 20.1666 19.25C20.1666 19.0069 20.07 18.7737 19.8981 18.6018C19.7262 18.4299 19.493 18.3333 19.2499 18.3333H4.58325C4.34014 18.3333 4.10698 18.2367 3.93507 18.0648C3.76316 17.8929 3.66659 17.6598 3.66659 17.4166V16.8795L9.16659 11.3795L11.2685 13.4814C11.4404 13.6532 11.6735 13.7498 11.9166 13.7498C12.1597 13.7498 12.3928 13.6532 12.5647 13.4814L18.3333 7.71281V8.24998C18.3333 8.49309 18.4298 8.72625 18.6017 8.89816C18.7736 9.07007 19.0068 9.16665 19.2499 9.16665Z" fill="#1783A8"/>
                                        </svg>
                                        <h1 class="text text-sidebar mb-0" style="{ sidebarTextStyle }">Kampanya Analizi</h1>
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/sms-servisi" style="text-decoration: none;">
                                    <button class="btn sidebar-button mt-3 w-100 text-start d-flex align-items-center sub-button { page === 'userSmsService' ? 'active-button' : '' }" type="button" style="{ smsServiceButtonStyle }">
                                        <svg id="sms-service-icon" xmlns="http://www.w3.org/2000/svg" class="me-2" width="22" height="21" viewBox="0 0 22 21" fill="none" style="{ smsServiceImageStyle }">
                                            <path d="M15.0988 1H9.43838C6.05727 1 4.94433 2.86945 4.64602 4.63748C2.87357 4.93552 1 6.0459 1 9.41814V12.9477C1 17.0185 2.87529 17.8362 5.90027 17.8362L6.22852 17.8345C6.24839 17.8388 6.29071 17.8655 6.28985 17.8539L7.35059 19.2645C7.5023 19.4907 7.70753 19.6762 7.94815 19.8044C8.18876 19.9327 8.45734 19.9999 8.73016 20C9.00297 20.0001 9.27162 19.9332 9.51235 19.8052C9.75308 19.6771 9.95849 19.4919 10.1104 19.2658L11.2074 17.8363H11.5607C14.9563 17.8363 16.0643 15.9527 16.3548 14.1986C18.1275 13.9001 20 12.7895 20 9.41817V5.88857C20 2.69026 18.3052 1 15.0988 1ZM15.1351 12.9477C15.1365 13.1501 15.1252 13.3525 15.1014 13.5535C14.9295 15.5725 13.804 16.5126 11.5607 16.5126H11.2074C10.9948 16.513 10.7851 16.5625 10.5949 16.6574C10.4047 16.7523 10.2391 16.8899 10.1113 17.0594L9.04881 18.4726C9.01953 18.532 8.97413 18.582 8.91779 18.6169C8.86145 18.6518 8.79642 18.6702 8.7301 18.6701C8.66378 18.6699 8.59883 18.6512 8.54263 18.6161C8.48643 18.581 8.44124 18.5308 8.4122 18.4713L7.34714 17.0547C7.21465 16.8912 7.04837 16.7581 6.85965 16.6646C6.67092 16.5711 6.4642 16.5193 6.25357 16.5127H5.90027C3.26311 16.5127 2.32679 15.9741 2.32679 12.9478V9.4182C2.32679 7.18117 3.26919 6.05879 5.31983 5.88343C5.51251 5.86137 5.70637 5.8513 5.9003 5.85327H11.5608C14.0329 5.85327 15.1351 6.95282 15.1351 9.41816L15.1351 12.9477ZM18.6732 9.4181C18.6732 11.3552 17.9658 12.4565 16.4619 12.8292V9.41814C16.4619 6.21986 14.7671 4.52964 11.5607 4.52964H6.01862C6.39178 3.02895 7.49571 2.32364 9.43838 2.32364H15.0988C17.571 2.32364 18.6732 3.42319 18.6732 5.88854V9.4181Z" fill="#1783A8" stroke="#1783A8" stroke-width="0.25"/>
                                            <path d="M9.88076 11.3825C9.92845 11.2612 9.95288 11.1312 9.95264 11C9.95264 10.8023 9.89679 10.609 9.79215 10.4446C9.6875 10.2802 9.53876 10.1521 9.36471 10.0763C9.19066 10.0006 8.99912 9.98065 8.81428 10.0191C8.62945 10.0575 8.45962 10.1525 8.32625 10.2922C8.19288 10.4318 8.10195 10.6098 8.06496 10.8037C8.02797 10.9975 8.04657 11.1985 8.11842 11.3813C8.19027 11.5641 8.31213 11.7204 8.46862 11.8305C8.62511 11.9406 8.80919 11.9996 8.99762 12H9.00139C9.12646 12 9.25031 11.9741 9.36584 11.9238C9.48137 11.8736 9.58632 11.7999 9.67467 11.707C9.76303 11.6141 9.83306 11.5038 9.88076 11.3825Z" fill="#1783A8"/>
                                            <path d="M12.9281 11.3825C12.9758 11.2612 13.0002 11.1312 13 11C13 10.8023 12.9442 10.6091 12.8396 10.4447C12.735 10.2803 12.5863 10.1522 12.4123 10.0764C12.2383 10.0006 12.0468 9.98066 11.862 10.019C11.6772 10.0574 11.5074 10.1523 11.374 10.2919C11.2405 10.4314 11.1496 10.6093 11.1125 10.8031C11.0754 10.9969 11.0938 11.1979 11.1656 11.3807C11.2373 11.5634 11.359 11.7198 11.5154 11.83C11.6717 11.9403 11.8557 11.9994 12.0441 12H12.0488C12.1739 12 12.2977 11.9741 12.4132 11.9238C12.5288 11.8735 12.6337 11.7998 12.7221 11.707C12.8104 11.6141 12.8804 11.5038 12.9281 11.3825Z" fill="#1783A8"/>
                                            <path d="M6.83433 11.3825C6.88203 11.2612 6.90645 11.1312 6.90621 11C6.90621 10.8023 6.85038 10.609 6.74573 10.4446C6.64109 10.2802 6.49234 10.1521 6.3183 10.0763C6.14425 10.0006 5.95271 9.98065 5.76787 10.0191C5.58304 10.0575 5.41321 10.1525 5.27984 10.2922C5.14646 10.4318 5.05554 10.6098 5.01855 10.8037C4.98156 10.9975 5.00016 11.1985 5.07201 11.3813C5.14385 11.5641 5.26572 11.7204 5.42221 11.8305C5.5787 11.9406 5.76278 11.9996 5.95121 12H5.95495C6.08003 12 6.20388 11.9741 6.31941 11.9238C6.43494 11.8736 6.53989 11.7999 6.62825 11.707C6.7166 11.6141 6.78663 11.5038 6.83433 11.3825Z" fill="#1783A8"/>
                                        </svg>
                                        <h1 class="text text-sidebar mb-0" style="{ sidebarTextStyle }">SMS Servisi</h1>
                                    </button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
            <li>
                <Link to="/gruplar" style="text-decoration: none;">
                    <button class="btn sidebar-button mt-3 w-100 text-start d-flex align-items-center" type="button" style="{ groupsButtonStyle }">
                        <i class='bx bxs-group' style="{ groupsImageStyle }"></i>
                        <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Gruplar</h1>
                    </button>
                </Link>
            </li>
            <li>
                <Link to="/hesaplar" style="text-decoration: none;">
                    <button class="btn sidebar-button mt-3 w-100 text-start d-flex align-items-center" type="button" style="{ accountsButtonStyle }">
                        <i class='bx bxs-user-account' style="{ accountsImageStyle }"></i>
                        <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Hesaplar</h1>
                    </button>
                </Link>
            </li>
            <!-- <li>
                <Link to="/userTemplates" style="text-decoration: none;">
                    <button class="btn sidebar-button mt-3 text-start d-flex align-items-center { page === 'userTemplates' ? 'active-button' : '' }" type="button" style="{ templatesButtonStyle }">
                        <svg id="templates-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" style="{ templatesImageStyle }">
                            <path d="M9.49994 2H2.74993C2.33772 2 2 2.33772 2 2.74993V11C2 11.4124 2.33772 11.7499 2.74993 11.7499H9.49994C9.91236 11.7499 10.2501 11.4124 10.2501 11V2.74993C10.2501 2.33772 9.91236 2 9.49994 2Z" fill="#697A8D"/>
                            <path d="M19.2501 10.2501H12.5001C12.0877 10.2501 11.7499 10.5876 11.7499 11V19.2501C11.7499 19.6623 12.0877 20 12.5001 20H19.2501C19.6623 20 20 19.6623 20 19.2501V11C20 10.5876 19.6623 10.2501 19.2501 10.2501Z" fill="#697A8D"/>
                            <path d="M9.49994 13.25H2.74993C2.33772 13.25 2 13.5877 2 13.9999V19.2501C2 19.6623 2.33772 20 2.74993 20H9.49994C9.91236 20 10.2501 19.6623 10.2501 19.2501V13.9999C10.2501 13.5877 9.91236 13.25 9.49994 13.25Z" fill="#697A8D"/>
                            <path d="M19.2501 2H12.5001C12.0877 2 11.7499 2.33772 11.7499 2.74993V8.00008C11.7499 8.41229 12.0877 8.75001 12.5001 8.75001H19.2501C19.6623 8.75001 20 8.41229 20 8.00008V2.74993C20 2.33772 19.6623 2 19.2501 2Z" fill="#697A8D"/>
                        </svg>
                        <h1 class="text text-sidebar m-0" style="{ sidebarTextStyle }">Şablonlar</h1>
                    </button>
                </Link>
            </li> -->
        {/if}
    </ul>
</div>

<div class="d-flex align-items-start pt-4" style="background-color: #F5F5F9; height: 100vh;">
    <button class="btn p-0 border-0 shadow-0 d-flex justify-content-center align-items-center {rotated ? 'rotated' : ''}" style="margin-left: -19px; transition: transform 0.5s;" on:click={rotate}>
        <img src="{ arrow }" alt="Logo" width="38" style="z-index: 1;">
    </button>
</div>