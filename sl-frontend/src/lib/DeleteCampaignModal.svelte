<script>
    export let campaign;

    import { onMount } from 'svelte';
    import { deleteCampaign } from '../apis/userApis.js';

    let delCampaign = {
      name: '',
      description: '',
      company: '',
      groups: [],
      status: '',
    };

    $: {
      if (campaign) {
        delCampaign = { ...campaign };
      }
    }

    // Call the resetModal function when the modal is opened
    onMount(() => {
        resetModal();
    });

    function resetModal() {
        delCampaign = { ...campaign };
    }

    async function deleteCampaignHandler() {
        await deleteCampaign(delCampaign._id);
        window.location.reload();
    }
</script>

<div class="modal fade" id="deleteCampaignModal" tabindex="-1" aria-labelledby="deleteCampaignModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="deleteCampaignModalLabel">Kampanya Sil</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
          <div class="modal-body">
            <h1 class="modal-title fs-5" id="deleteCampaignModalLabel">Kampanyayı silmek istediğinize emin misiniz?</h1>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
            <button type="submit" class="btn btn-danger" data-bs-dismiss="modal" on:click={deleteCampaignHandler}>Sil</button>
          </div>
      </div>
    </div>
</div>