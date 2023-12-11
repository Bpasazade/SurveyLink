<script>
    // Sidebar
    import Sidebar from "./lib/Sidebar.svelte";
    import arrow from './assets/sidebar-arrow.svg'

    // Lib
    import SearchProfileBar from "./lib/SearchProfileBar.svelte";
    
    let user
    let signOutUser
    
    let rotated = false;
</script>

<main class="m-0 p-0">      
    <div class="d-flex m-0 p-0" style="height: 100vh;">
        <Sidebar page="userDashboard" rotated={rotated} />

        <div class="col-md px-0" id="main-content-div">
            <SearchProfileBar user={user} signOutUser={signOutUser} />
        </div>

    </div>

</main>