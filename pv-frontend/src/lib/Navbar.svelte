<!-- src/lib/Navbar.svelte -->
<script>
    import RLogo from '../assets/logo.png'
    import { link } from 'svelte-routing'
</script>

<style>
    #navbar {
        border-bottom: solid 2px #EAEBED !important;
    }
</style>

<header class="p-4" id="navbar">
  <div class="d-flex justify-content-between">
    <img src="{ RLogo }" alt="Logo" class=""><br>
    <!-- <div class="settingsNotificationDiv">
        <img src="../assets/img/mediaManagement/settings.svg" alt="Settings" class="me-3">
        <img src="../assets/img/mediaManagement/notification-bell.svg" alt="Notification" class="">
    </div> -->
  </div>
</header>