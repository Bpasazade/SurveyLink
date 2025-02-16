<script>
    // Stored Route
    localStorage.setItem('storedRoute', '/dashboard');

    // User Data
    import { user } from '../user.js';
    let loggedInUser;
    user.subscribe(value => {
        loggedInUser = value;
    });

    // Import Components
    import AdminDashboard from "./adminDashboard.svelte";
    import UserDashboard from "./userDashboard.svelte";
</script>

{#if loggedInUser.role.includes("ROLE_ADMIN")}
    <AdminDashboard />
{:else}
    <UserDashboard />
{/if}