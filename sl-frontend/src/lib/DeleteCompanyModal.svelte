<!-- src/lib/DeleteCompanyModal.svelte -->
<script>
    export let company;

    import { onMount } from 'svelte';
    import {deleteCompany } from '../apis/adminApis';

    let delCompany = {
      name: '',
      address: '',
    };

    $: {
      if (company) {
        delCompany = { ...company };
      }
    }

    // Call the resetModal function when the modal is opened
    onMount(() => {
      resetModal();
    });

    function resetModal() {
        delCompany = { ...company };
    }

    function deleteCompanyC(event) {
      deleteCompany(delCompany._id);
    }
</script>

<div class="modal fade" id="deleteCompanyModal" tabindex="-1" aria-labelledby="deleteCompanyUserModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="deleteCompanyModalLabel">Şirket Sil</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
          <div class="modal-body">
            <h1 class="modal-title fs-5" id="deleteUserModalLabel">Şirketi silmek istediğinize emin misiniz?</h1>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
            <button type="submit" class="btn btn-danger" data-bs-dismiss="modal" on:click={deleteCompanyC}>Sil</button>
          </div>
      </div>
    </div>
</div>