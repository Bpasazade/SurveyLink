<script>
    import search from '../assets/search.svg'
    import bell from '../assets/bell.svg'
    import profile from '../assets/profile.svg'
    import arrowDown from '../assets/arrow-down.svg'
    import seperator from '../assets/spbar-seperator.png'
    
    let user = {
        name: "John Doe",
        email: "johndoe@gmail.com"
    }

</script>

<style>
    .form-control:focus {
        border: none;
        outline: none !important;
        box-shadow: none;
    }
    .btn:focus {
        outline: none !important;
        box-shadow: none;
    }
</style>

<div class="d-flex justify-content-between align-items-center bg-white m-3" style="background-color: #F4F5F6; padding: 0.65rem; border-radius: 6px;">
    <div class="d-flex align-items-center w-100 ms-3">
        <img src="{ search }" alt="Search" class="me-3">
        <input type="text" class="form-control" placeholder="Arama" style="border: none;">
    </div>
    <div class="d-flex align-items-center">
        <img src="{ bell }" alt="Notification" style="margin-right: 15px;">
        <img src="{ seperator }" alt="Seperator" style="margin-right: 24px;" height="28">
        <div style="text-decoration: none;">
            <div class="d-flex justify-content-between align-items-center">
                <img src="{ profile }" alt="User" class="me-3" width="38">
                <div class="d-flex flex-column justify-content-between align-items-start me-2">
                    <p class="text-black m-0" style="font-size: 15px; font-weight:700;">{ user.name }</p>
                    <p class="text-secondary m-0" style="font-size: 13px; font-weight:300;">{ user.email }</p>
                </div>
                
                <button class="btn p-1" type="button">
                    <img src="{ arrowDown }" alt="Screens" width="24">
                </button>
            </div>
        </div>
    </div>
</div>
