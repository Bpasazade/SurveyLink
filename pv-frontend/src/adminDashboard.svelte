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

    import layers from './assets/dashboard-layers.svg'
    import messages from './assets/dashboard-messages.svg'
    import videos from './assets/dashboard-videos.svg'
    import stats from './assets/dashboard-stats.svg'
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
    <div class="d-flex m-0 p-0" style="height: 100vh;">
        <Sidebar page="adminDashboard" rotated={rotated} />

        <div class="col-md px-0" id="main-content-div">
            <SearchProfileBar user={user} signOutUser={signOutUser} />
            <div class="row d-flex flex-column px-3 pt-3 mx-0">
                <div class="container mx-0 px-0">
                    <div class="row g-0 d-flex justify-content-between">
                        <div class="bg-white rounded mb-4 p-4" style="width: 59%; height: 430px;">
                            <h1 class="dp-1">0 Kullanıcı</h1>
                        </div>
                        <!-- <div class="container rounded mb-4 px-0" style="width: 38%; height: 430px;">
                            <div class="row g-2">
                                <div class="bg-white rounded col-6 d-flex flex-column justify-content-center align-items-start p-4">
                                    <img src={layers} alt="layers" class="mb-4"/>
                                    <h6 class="">Toplam Kampanya Sayısı</h6>
                                    <h1 class="dp-1">0</h1>
                                </div>
                                <div class="bg-white rounded col-6 d-flex flex-column justify-content-center align-items-start p-4">
                                    <img src={messages} alt="messages" class="mb-3"/>
                                    <h6 class="">Toplam SMS Gönderim Sayısı</h6>
                                    <h1 class="dp-1">0</h1>
                                </div>
                                <div class="col-6 rounded bg-white d-flex flex-column justify-content-center align-items-start p-4">
                                    <img src={videos} alt="videos" class="mb-4"/>
                                    <h6 class="">Toplam PVM İzlenme Sayısı</h6>
                                    <h1 class="dp-1">0</h1>
                                </div>
                                <div class="col-6 rounded bg-white d-flex flex-column justify-content-center align-items-start p-4">
                                    <img src={stats} alt="stats" class="mb-3"/>
                                    <h6 class="">Toplam PVM Yanıtlanma Sayısı</h6>
                                    <h1 class="dp-1">0</h1>
                                </div>
                              </div>
                        </div> -->
                        <div class="container h-100 px-0 mx-0" style="width: 39%;">
                            <div class="row g-4">
                              <div class="col-6 h-50">
                                <div class="px-4 pt-4 pb-2 bg-white rounded">
                                    <img src={layers} alt="layers" class="mb-4"/>
                                    <h6 class="">Toplam Kampanya Sayısı</h6>
                                    <h1 class="dp-1">0</h1>
                                </div>
                              </div>
                              <div class="col-6">
                                <div class="px-4 pt-4 pb-2 bg-white rounded">
                                    <img src={messages} alt="messages" class="mb-4"/>
                                    <h6 class="">Toplam SMS Gönderim Sayısı</h6>
                                    <h1 class="dp-1">0</h1>
                                </div>
                              </div>
                              <div class="col">
                                <div class="px-4 pt-4 pb-2 bg-white rounded">
                                    <img src={videos} alt="videos" class="mb-4"/>
                                    <h6 class="">Toplam PVM İzlenme Sayısı</h6>
                                    <h1 class="dp-1">0</h1>
                                </div>
                              </div>
                              <div class="col">
                                <div class="px-4 pt-4 pb-2 bg-white rounded">
                                    <img src={stats} alt="stats" class="mb-4"/>
                                    <h6 class="">Toplam PVM Yanıtlanma Sayısı</h6>
                                    <h1 class="dp-1">0</h1>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>