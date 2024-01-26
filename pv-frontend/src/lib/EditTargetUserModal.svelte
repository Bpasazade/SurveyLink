<!-- src/lib/EditTargetUserModal.svelte -->
<script>
    export let user;

    import { onMount } from 'svelte';
    import { updateTargetUser } from '../apis/userApis';
    import userLogo from '../assets/user.svg';
    import call from '../assets/call.svg';
    import directUp from '../assets/direct-up.svg';
    import subLeft from '../assets/sub_left.svg';
    import done from '../assets/done.svg';

    let editedUser = {
        name: '',
        phoneNumber: '',
        location: '',
        group: '',
        company: '',
    };

    let flag = false;
    $: {
      if (user && !flag) {
        editedUser = { ...user };
        flag = true;
      }
    }

    onMount(() => {
      resetModal();
    });

    function resetModal() {
        editedUser = { ...user };
    }

    async function saveChanges() {
      await updateTargetUser(user._id, editedUser)
      window.location.reload();
    }
</script>

<style>
    .input-group {
        border-radius: 10px;
        border: solid 1px #25324B14;
    }
    input {
        border: solid 1px transparent;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        display: flex;
        align-items: center;
        height: 50px;
    }
    input {
        border: none;
        box-shadow: none;
        font-weight: 500;
        font-size: 14px;
    }
    input::placeholder {
        font-family: 'Sophia-Pro-Light', sans-serif;
        font-weight: 500;
        font-size: 14px;
        color: #25324B !important;
    }
    .form-control:focus {
        box-shadow: none;
        font-weight: 400;
        color: #25324B !important;
    }
    .input-group-addon {
        border-right: none;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        padding-left: 0.9rem;
        padding-right: 0.9rem;
    }
    .form-control {
        font-size: 14px;
    }
    #cancel-button {
        height: 45px; 
        border-color:#BFBFBF33;
        border-radius: 11px; 
        font-weight: 600; 
        font-size: 16px; 
        width: max-content;
    }
    #save-button {
        height: 45px; 
        background-color: #04A3DA; 
        border-radius: 11px; 
        font-weight: 600; 
        font-size: 16px; 
        width: max-content;
    }
</style>

<div class="modal fade" id="editTargetUserModal" tabindex="-1" aria-labelledby="editTargetUserModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="editTargetUserModalLabel">Kullanıcı Düzenle</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
          <div class="modal-body">
            <div class="modal-body">
              <!-- Name Lastname -->
              <div class="input-group mb-3" id="name-group">
                <span class="input-group-addon bg-white align-items-center d-flex" id="emailAddon">
                  <img src="{ userLogo }" alt="User Logo" width="24" />
                </span>
                <input type="text" id="edit-name" class="form-control ps-0 rounded" placeholder="Adınız/Soyadınız" bind:value={editedUser.name}>
              </div>
  
              <!-- Phone Number -->
              <div class="input-group mb-3" id="phone-group">
                <span class="input-group-addon bg-white align-items-center d-flex" id="emailAddon">
                  <img src="{ call }" alt="User Logo" width="24" />
                </span>
                <input type="text" id="edit-phone" class="form-control ps-0" placeholder="Telefon Numarası" bind:value={editedUser.phoneNumber}>
              </div>
    
              <!-- Location -->
              <div class="input-group mb-3" id="company-address-group">
                <span class="input-group-addon bg-white align-items-center d-flex" id="emailAddon">
                  <img src="{ directUp }" alt="User Logo" width="24" />
                </span>
                <input type="text" id="edit-company-address" class="form-control ps-0" placeholder="Kullanıcı Lokasyonu" bind:value={editedUser.location}>
              </div>
  
            </div>
            <div class="modal-footer">
              <button id="cancel-button" type="submit" class="btn border-2 me-2 px-3" data-bs-dismiss="modal">
                <span class="d-flex align-items-center">
                    İptal Et
                    <img src="{ subLeft }" alt="Trash Can" class="" style="opacity: 30%;">
                </span>
            </button>
            <button id="save-button" type="submit" class="btn btn-primary border-0 px-3" data-bs-dismiss="modal" on:click={saveChanges}>
                <span class="d-flex align-items-center">
                    Kaydet
                    <img src="{ done }" alt="Trash Can" class="">
                </span>
            </button>
          </div>
      </div>
    </div>
  </div>
</div>