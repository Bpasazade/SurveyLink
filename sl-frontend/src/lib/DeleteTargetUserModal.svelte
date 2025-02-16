<script>
    export let user;

    import { onMount } from 'svelte';
    import { deleteTargetUser } from '../apis/userApis.js';

    let delUser = {
      name: '',
      phoneNumber: '',
      location: '',
      group: '',
      company: '',
      panelGroupID: '',
    };

    $: {
      if (user) {
        delUser = { ...user };
      }
    }

    // Call the resetModal function when the modal is opened
    onMount(() => {
        resetModal();
    });

    function resetModal() {
        delUser = { ...user };
    }

    async function deleteTargetUserHandler() {
        console.log(delUser);
        await deleteTargetUser(delUser._id, delUser.group, delUser.panelGroupID, delUser.phoneNumber);
        window.location.reload();
    }
</script>

<div class="modal fade" id="deleteTargetUserModal" tabindex="-1" aria-labelledby="deleteTargetUserModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="deleteTargetUserModalLabel">Kullanıcı Sil</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
          <div class="modal-body">
            <h1 class="modal-title fs-5" id="deleteTargetUserModalLabel">Kullanıcıyı silmek istediğinize emin misiniz?</h1>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
            <button type="submit" class="btn btn-danger" data-bs-dismiss="modal" on:click={deleteTargetUserHandler}>Sil</button>
          </div>
      </div>
    </div>
</div>