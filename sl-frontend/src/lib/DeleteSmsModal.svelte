<!-- src/lib/DeleteCompanyModal.svelte -->
<script>
    export let sms;

    import { onMount } from 'svelte';
    import { deleteSms } from '../apis/userApis';

    let delSms = {
      title: '',
      message: '',
      date: '',
      campaignId: '',
      groupId: '',
      companyId: '',
    };

    $: {
      if (sms) {
        delSms = { ...sms };
      }
    }

    // Call the resetModal function when the modal is opened
    onMount(() => {
      resetModal();
    });

    function resetModal() {
        delSms = { ...sms };
    }

    function deleteSmsC(event) {
        deleteSms(delSms._id);
        window.location.reload();
    }
</script>

<div class="modal fade" id="deleteSmsModal" tabindex="-1" aria-labelledby="deleteSmsModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="deleteSmsModalLabel">Sil</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
          <div class="modal-body">
            <h1 class="modal-title fs-5" id="deleteUserModalLabel">Smsi silmek istediğinize emin misiniz?</h1>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
            <button type="submit" class="btn btn-danger" data-bs-dismiss="modal" on:click={deleteSmsC}>Sil</button>
          </div>
      </div>
    </div>
</div>