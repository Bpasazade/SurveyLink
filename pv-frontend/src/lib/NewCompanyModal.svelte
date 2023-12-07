<!-- src/lib/NewCompanyModal.svelte -->
<script>
    import { registerCompany } from "../apis/adminApis.js";
    import briefcase from '../assets/briefcase.svg';
    import directUp from '../assets/direct-up.svg';
    import subLeft from '../assets/sub_left.svg';
    import done from '../assets/done.svg';

    let companyName = "";
    let companyAddress = "";

    async function handleRegisterCompany(event) {
        event.preventDefault();
        try {
          const companyData = await registerCompany(companyName, companyAddress);
        } catch (error) {
            // Handle error
        }
    }
</script>

<style>
    .input-group {
      border-radius: 10px;
      border: solid 1px #25324B14;
      box-shadow: none;
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
      border-color: rgba(0, 0, 0, 0.3);
      border-radius: 11px; 
      font-weight: 600; 
      font-size: 16px;
      opacity: 30%;
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
  
  <div class="modal fade" id="newCompanyModal" tabindex="-1" aria-labelledby="newCompanyModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="newCompanyModalLabel">Şirket Oluştur</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
            <div class="modal-body">
              <!-- Company Name -->
              <div class="input-group mb-3" id="company-name-group">
                <span class="input-group-addon bg-white align-items-center d-flex" id="companyAddon">
                  <img src="{ briefcase }" alt="User Logo" width="24" />
                </span>
                <input type="text" id="company-name" class="form-control ps-0" placeholder="Firma / Kurum Adı" bind:value={companyName}>
              </div>
  
              <!-- Company Address -->
              <div class="input-group mb-3" id="company-address-group">
                <span class="input-group-addon bg-white align-items-center d-flex" id="companyAddressAddon">
                  <img src="{ directUp }" alt="User Logo" width="24" />
                </span>
                <input type="text" id="company-address" class="form-control ps-0" placeholder="Firma / Kurum Adresi" bind:value={companyAddress}>
              </div>

            </div>
            <div class="modal-footer">
              <button id="cancel-button" type="submit" class="btn border-2 me-2 px-3" data-bs-dismiss="modal">
                <span class="d-flex align-items-center">
                    İptal Et
                    <img src="{ subLeft }" alt="Trash Can" class="">
                </span>
            </button>
            <button id="save-button" type="submit" class="btn btn-primary border-0 px-3" data-bs-dismiss="modal" on:click={handleRegisterCompany}>
                <span class="d-flex align-items-center">
                    Kaydet
                    <img src="{ done }" alt="Trash Can" class="">
                </span>
            </button>
            </div>
        </div>
      </div>
  </div>