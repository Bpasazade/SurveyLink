<script>
    import { Route, Router, navigate } from "svelte-routing";
    import { onMount } from "svelte";
    import Login from './pages/Login.svelte';
    import AdminDashboard from './pages/adminDashboard.svelte';
    import AdminCompanies from './pages/adminCompanies.svelte';
    import AdminCampaigns from "./pages/adminCampaigns.svelte";
    import AdminAccounts from './pages/adminAccounts.svelte';
    import AdminTemplates from "./pages/adminTemplates.svelte";
    import UserDashboard from './pages/userDashboard.svelte';
    import UserAccounts from './pages/userAccounts.svelte';
    import UserCampaigns from './pages/userCampaignsAnalyze.svelte';
    import UserCampaigns2 from "./pages/userCampaignsAll.svelte";
    import UserSmsService from "./pages/userSmsService.svelte";
    import UserGroups from "./pages/userGroups.svelte";
    import UserTemplates from "./pages/userTemplates.svelte";
    import { getUser } from './apis/userApis.js';

    import Template from './lib/Template.svelte';

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

    onMount(async () => {
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
            // Clear the stored route as it's no longer needed
            localStorage.removeItem('storedRoute');
            
            // Navigate to the stored route
            navigate(storedRoute);
        } else {
            // No stored route, navigate based on user role
            if (user_['role'] == 'admin') {
                localStorage.setItem('storedRoute', '/adminDashboard');
                navigate('/adminDashboard');
            } else if (user_['role'] == 'user') {
                localStorage.setItem('storedRoute', '/userDashboard');
                navigate('/userDashboard');
            }
        }
    });
</script>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

<Router>
    <Route path="/login" component={Login} />
    <Route path="/adminDashboard" component={AdminDashboard} />
    <Route path="/adminCompanies" component={AdminCompanies} />
    <Route path="/adminCampaigns" component={AdminCampaigns} />
    <Route path="/adminAccounts" component={AdminAccounts} />
    <!-- <Route path="/adminTemplates" component={AdminTemplates} /> -->
    <Route path="/userDashboard" component={UserDashboard} />
    <Route path="/userAccounts" component={UserAccounts} />
    <Route path="/userCampaigns" component={UserCampaigns} />
    <Route path="/userCampaigns2" component={UserCampaigns2} />
    <Route path="/userSmsService" component={UserSmsService} />
    <Route path="/userGroups" component={UserGroups} />
    <!-- <Route path="/userTemplates" component={UserTemplates} /> -->
    <Route path="/template" component={Template} />
</Router>

<style>
    @font-face {
        font-family: 'Gilroy-Black';
        src: url('./assets/Fonts/Gilroy-BlackItalic.otf') format('opentype');
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