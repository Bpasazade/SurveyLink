<script>
    localStorage.setItem('storedRoute', '/userTemplates');

    // Logged in user
    import { user } from "../user.js";
    let loggedInUser;
    user.subscribe(value => (
        loggedInUser = value           
    ));
    // Sidebar
    import Sidebar from "../lib/Sidebar.svelte";

    // Lib
    import SearchProfileBar from "../lib/SearchProfileBar.svelte";

    import Template from "../lib/Template.svelte";
</script>

<style>
    main {
        height: 100vh;
    }
    #main-content-div {
        background-color: #F5F5F9;
    }
    .grid-box {
        border-radius: 6px !important;
        box-shadow: 0px 2px 6px 0px rgba(67, 89, 113, 0.12);
    }
    .template-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        gap: 16px; /* Adjust the gap between templates */
        overflow:scroll;
        overflow-x: hidden;
        max-height: 80vh;
    }

    .template-instance {
        height: 60vh !important; /* Adjust the height of each instance */
        width: 40vh;
    }
</style>

<main class="m-0 p-0">
    <div class="d-flex m-0 p-0" style="height: 100vh;">
        <Sidebar page="userTemplates" rotated={false} />

        <div class="col-md px-0" id="main-content-div">
            <SearchProfileBar/>
            <div class="row d-flex flex-column px-3 pt-1 mx-0 pe-4">
                <div class="col-md p-4 bg-white rounded mb-4 grid-box justify-content-start align-items-center w-100">
                    <div class="template-container">
                        <div class="template-instance">
                            <Template />
                        </div>
                        <div class="template-instance">
                            <Template />
                        </div>
                        <div class="template-instance">
                            <Template />
                        </div>
                        <div class="template-instance">
                            <Template />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>