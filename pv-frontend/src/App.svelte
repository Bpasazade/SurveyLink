<script>
    import { Route, Router, navigate, useLocation } from "svelte-routing";
    import { onMount } from "svelte";
    import Login from './pages/Login.svelte';


    import Dashboard from "./pages/dashboard.svelte";
    import Hesaplar from "./pages/accounts.svelte";
    
    import AdminCompanies from './pages/adminCompanies.svelte';
    import AdminCampaigns from "./pages/adminCampaigns.svelte";
    import AdminAccounts from './pages/adminAccounts.svelte';
    
    import UserAccounts from './pages/userAccounts.svelte';
    import UserCampaigns from './pages/userCampaignsAnalyze.svelte';
    import UserCampaigns2 from "./pages/userCampaignsAll.svelte";
    import UserSmsService from "./pages/userSmsService.svelte";
    import UserGroups from "./pages/userGroups.svelte";
    import UserProfile from "./pages/UserProfile.svelte";
    import UserTemplates from "./pages/userTemplates.svelte";
    import { getUser } from './apis/userApis.js';
    import Survey from './lib/Survey.svelte';

    // Lib
    import './lib/EditUserModal.svelte';
    import './lib/NewUserModal.svelte';
    import './lib/NewCompanyModal.svelte';
    import './lib/EditCompanyModal.svelte';
    import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js";

    import { user } from './user.js';
    import jwt_decode from "jwt-decode";
    var token = localStorage.getItem('accessToken');

    var decoded = {
        id: null,
        iat: null,
        exp: null
    }

    var user_;
    let lastLocation = localStorage.getItem('storedRoute');
    onMount(async () => {
        const urlParams = Object.fromEntries((new URLSearchParams(window.location.search)).entries());
        if (Object.keys(urlParams)[0]) {
            if (Object.keys(urlParams)[0].length > 20) {
                navigate(`/survey`);
                console.log('survey');
                return;
            }
        }

        if (location.pathname === '/survey') {
            return;
        }

        if (token == null) {
            navigate('/login');
            return;
        }

        decoded = jwt_decode(token);

        if (decoded.exp < Date.now() / 1000) { 
            localStorage.removeItem('accessToken');
            navigate('/login');
            return;
        }

        user_ = await getUser(decoded.id);

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            user.set(JSON.parse(storedUser));
        }

        if (user_ == null) {
            navigate('/login');
            return;
        }

        // Check if there's a stored route in localStorage
        const storedRoute = localStorage.getItem('storedRoute');
        
        if (storedRoute) {
            // Clearing the stored route as it's no longer needed
            localStorage.removeItem('storedRoute');
            
            // Navigate to the stored route
            navigate(storedRoute);
        } else {
            localStorage.setItem('storedRoute', '/dashboard');
            navigate('/dashboard');
        }
    });

    // Surveys
    import Kampanya2 from "../public/Kampanya 2.svelte";
</script>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

<Router>
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/adminCompanies" component={AdminCompanies} />
    <Route path="/adminCampaigns" component={AdminCampaigns} />
    <Route path="/hesaplar" component={Hesaplar} />
    <Route path="/userTemplates" component={UserTemplates} />
    <Route path="/kampanyalar" component={UserCampaigns2} />
    <Route path="/kampanya-analizi" component={UserCampaigns} />
    <Route path="/sms-servisi" component={UserSmsService} />
    <Route path="/gruplar" component={UserGroups} />
    <Route path="/userProfile" component={UserProfile} />
    <Route path="/survey" component={Survey} />
    <Route path="/Kampanya2" component={Kampanya2} />
</Router>

<style>
    @font-face {
        font-family: 'Gilroy-Black';
        src: url('./assets/Fonts/Gilroy-Black.otf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-Bold';
        src: url('./assets/Fonts/Gilroy-Bold.otf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-ExtraBold';
        src: url('./assets/Fonts/Gilroy-ExtraBold.otf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-Heavy';
        src: url('./assets/Fonts/Gilroy-Heavy.otf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-HeavyItalic';
        src: url('./assets/Fonts/Gilroy-HeavyItalic.ttf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-Medium';
        src: url('./assets/Fonts/Gilroy-Medium.otf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-Regular';
        src: url('./assets/Fonts/Gilroy-Regular.otf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-SemiBold';
        src: url('./assets/Fonts/Gilroy-SemiBold.otf') format('opentype');
    }
        
    :global(body) {
    	padding: 0;
        font-family: 'Gilroy-Medium', sans-serif !important;
    }
</style>