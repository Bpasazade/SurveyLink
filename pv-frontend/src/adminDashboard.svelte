<!-- src/adminHome.svelte -->
<script>
    // Sidebar
    import Sidebar from "./lib/Sidebar.svelte";
    import arrow from './assets/sidebar-arrow.svg'

    // Lib
    import { Link } from "svelte-routing";
    import { signOut } from "./apis/userApis";
    import { navigate } from 'svelte-routing';
    import { getUser } from "./apis/userApis";
    import SearchProfileBar from "./lib/SearchProfileBar.svelte";

    import jwt_decode from "jwt-decode";
    var decoded = {
        id: null,
        ait: null,
        exp: null
    }
    decoded = jwt_decode(localStorage.getItem("accessToken"));
    
    var user = {
        name: "",
        email: "",
        phoneNumber: "",
        mainUserDegree: "",
        companyName: "",
    }
    async function getTheUser() {
        user = await getUser(decoded.id);
    }
    getTheUser();


    // var currentUser = getUser(sessionStorage.getItem('userId') );
    async function signOutUser() {
        try {
            await signOut();
            localStorage.removeItem('accessToken');
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }
    let rotated = false;
</script>

<style>
    main {
        height: 100vh;
    }
    #main-content-div {
        background-color: #f7f7f7;
    }
</style>

<main class="m-0 p-0">
    <div class="d-flex m-0 p-0" style="height: 92vh;">
        <Sidebar page="adminDashboard" rotated={rotated} />

        <div class="col-md px-0" id="main-content-div">
            <SearchProfileBar user={user} signOutUser={signOutUser} />
            <div class="row d-flex flex-column px-4 pt-4 mx-0">
                <div class="col-md-12 pt-4 ps-4 rounded mb-4">
                    <div class="d-flex justify-content-start">
                        <div class="d-flex mb-3">
                            <h1 class="text me-4 mb-0" style="font-size: 26px; font-weight: 600;">RubuPlus</h1>
                            <div class="col-md-3 d-flex align-items-center">
                                <h1 class="text py-1 px-3 m-0 rounded-2" style="font-size: 12px; font-weight: 400; background-color: #FFA800;">Admin</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <hr class="mb-4" style="color: #E6E8EC; height: 1px; border: solid 1px #e2e4e7;">
                <div class="container mx-0 px-0">
                    <div class="row g-0 d-flex justify-content-between">
                        <div class="col-md bg-white rounded mb-4 p-4" style="height: 430px;">
                            <h1 class="dp-1">0 Kullanıcı</h1>
                        </div>
                        <div class="vr mx-3" style="color: transparent;"></div>
                        <div class="col-md bg-white rounded mb-4 p-4" style="height: 430px;">
                            <h1 class="dp-1">0 Ekran</h1>
                        </div>
                        <div class="vr mx-3" style="color: transparent;"></div>
                        <div class="col-md bg-white rounded mb-4 p-4" style="height: 430px;">
                            
                        </div>
                    </div>
                    <div class="row g-0 d-flex">
                        <div class="col-md bg-white rounded mb-4 py-1" style="height: 250px;">
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>