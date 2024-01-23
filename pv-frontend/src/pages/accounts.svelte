<script>
    // Stored Route
    localStorage.setItem('storedRoute', '/hesaplar');

    // User
    import { user } from '../user.js';
    let loggedInUser;

    user.subscribe(value => {
        loggedInUser = value;
    });

    // Import Components
    import AdminAccounts from './adminAccounts.svelte';
    import UserAccounts from './userAccounts.svelte';
</script>

{#if loggedInUser.role.includes("ROLE_ADMIN")}
    <AdminAccounts />
{:else}
    <UserAccounts />
{/if}