<script>
    import { Route, Router, navigate } from "svelte-routing";
    import { onMount } from "svelte";
    import Login from './Login.svelte';
    import AdminDashboard from './adminDashboard.svelte';
    import AdminCompanies from './adminCompanies.svelte';
    import AdminAccounts from './adminAccounts.svelte';
    import UserDashboard from './userDashboard.svelte';
    import UserAccounts from './userAccounts.svelte';
    import UserCampaigns from './userCampaigns.svelte';
    import UserCampaigns2 from "./userCampaigns2.svelte";
    import ExcelToJson from "./lib/excelToJson.svelte";

    import { getUser } from './apis/userApis.js';

    // Lib
    import './lib/Navbar.svelte';
    import './lib/EditUserModal.svelte';
    import './lib/NewUserModal.svelte';
    import './lib/NewCompanyModal.svelte';
    import './lib/EditCompanyModal.svelte';
    import './lib/BarChart.svelte';
    import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js";

    import jwt_decode from "jwt-decode";
    var token = localStorage.getItem('accessToken');

    var decoded = {
        id: null,
        ait: null,
        exp: null
    }
    
    onMount(() => {
        if (token == null) {
            navigate('/login');
        } else {
            if (token) {
                decoded = jwt_decode(token);
                
                if (decoded.exp < Date.now() / 1000) { 
                    localStorage.removeItem('accessToken');
                    navigate('/login');
                } else {
                    if (decoded.ait == 'admin') {
                        navigate('/adminDashboard');
                    } else if (decoded.ait == 'user') {
                        navigate('/userDashboard');
                    }
                }
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
    <Route path="/adminAccounts" component={AdminAccounts} />
    <Route path="/userDashboard" component={UserDashboard} />
    <Route path="/userAccounts" component={UserAccounts} />
    <Route path="/userCampaigns" component={UserCampaigns} />
    <Route path="/userCampaigns2" component={UserCampaigns2} />
    <Route path="/excelToJson" component={ExcelToJson} />
</Router>

<style>
    @font-face {
        font-family: 'Gilroy-BlackItalic';
        src: url('./assets/Fonts/Gilroy-BlackItalic.ttf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-Bold';
        src: url('./assets/Fonts/Gilroy-Bold.ttf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-BoldItalic';
        src: url('./assets/Fonts/Gilroy-BoldItalic.ttf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-ExtraBold';
        src: url('./assets/Fonts/Gilroy-ExtraBold.ttf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-ExtraBoldItalic';
        src: url('./assets/Fonts/Gilroy-ExtraBoldItalic.ttf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-Heavy';
        src: url('./assets/Fonts/Gilroy-Heavy.ttf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-HeavyItalic';
        src: url('./assets/Fonts/Gilroy-HeavyItalic.ttf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-Light';
        src: url('./assets/Fonts/Gilroy-Light.ttf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-LightItalic';
        src: url('./assets/Fonts/Gilroy-LightItalic.ttf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-Medium';
        src: url('./assets/Fonts/Gilroy-Medium.ttf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-MediumItalic';
        src: url('./assets/Fonts/Gilroy-MediumItalic.ttf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-Regular';
        src: url('./assets/Fonts/Gilroy-Regular.ttf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-RegularItalic';
        src: url('./assets/Fonts/Gilroy-RegularItalic.ttf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-SemiBold';
        src: url('./assets/Fonts/Gilroy-SemiBold.ttf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-SemiBoldItalic';
        src: url('./assets/Fonts/Gilroy-SemiBoldItalic.ttf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-Thin';
        src: url('./assets/Fonts/Gilroy-Thin.ttf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-ThinItalic';
        src: url('./assets/Fonts/Gilroy-ThinItalic.ttf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-UltraLight';
        src: url('./assets/Fonts/Gilroy-UltraLight.ttf') format('opentype');
    }
    @font-face {
        font-family: 'Gilroy-UltraLightItalic';
        src: url('./assets/Fonts/Gilroy-UltraLightItalic.ttf') format('opentype');
    }
        
    :global(body) {
    	padding: 0;
        font-family: 'Gilroy-Medium', sans-serif !important;
    }
</style>