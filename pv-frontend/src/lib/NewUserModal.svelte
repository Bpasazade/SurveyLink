<!-- src/lib/NewUserModal.svelte -->
<script>
    import { registerUser } from "../apis/adminApis.js";
    import { getAllCompanies } from "../apis/adminApis.js";
    import userLogo from '../assets/user.svg';
    import directBoxDefault from '../assets/directbox-default.svg';
    import call from '../assets/call.svg';
    import lock from '../assets/lock.svg';
    import television from '../assets/television.svg';
    import subLeft from '../assets/sub_left.svg';
    import done from '../assets/done.svg';

    let user = {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      verifyPassword: "",
      companyId: "",
      mainUserDegree: "",
      numberOfScreens: "",
      role: "user",
      userType: "master",
    };

    async function handleRegisterUser(event) {
      console.log(user);
      await registerUser(user);
    }

    let companies = [];

    async function getCompanies() {
      try {
        companies = await getAllCompanies();
      } catch (error) {
        // Handle error
      }
    }

    getCompanies();
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
  .form-select {
    border: solid 1px #25324B14;
    border-radius: 10px;
    box-shadow: none;
    font-size: 14px;
    font-weight: 400 !important;
    color: #25324B;
  }
  select option {
    font-size: 14px;
    font-weight: 400 !important;
    color: #25324B;
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>

<div class="modal fade" id="newUserModal" tabindex="-1" aria-labelledby="newUserModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="newUserModalLabel">Kullanıcı Oluştur</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
          <div class="modal-body">
            <!-- Name Lastname -->
            <div class="input-group mb-3" id="name-group">
              <span class="input-group-addon bg-white align-items-center d-flex" id="emailAddon">
                <img src="{ userLogo }" alt="User Logo" width="24" />
              </span>
              <input type="text" id="name" class="form-control ps-0 rounded" placeholder="Adınız/Soyadınız" bind:value={user.name} required>
            </div>

            <!-- Email -->
            <div class="input-group mb-3" id="email-group">
              <span class="input-group-addon bg-white align-items-center d-flex" id="emailAddon">
                <img src="{ directBoxDefault }" alt="User Logo" width="24" />
              </span>
              <input type="email" id="email" class="form-control ps-0" placeholder="Mail Adresiniz" bind:value={user.email} required>
            </div>

            <!-- Phone Number -->
            <div class="input-group mb-3" id="phone-group">
              <span class="input-group-addon bg-white align-items-center d-flex" id="emailAddon">
                <img src="{ call }" alt="User Logo" width="24" />
              </span>
              <input type="text" id="phone" class="form-control ps-0" placeholder="Telefon Numarası" bind:value={user.phoneNumber} required>
            </div>

            <div class="row">
              <div class="col">
                <!-- Password -->
                <div class="input-group" id="password-group">
                  <span class="input-group-addon bg-white align-items-center d-flex" id="emailAddon">
                    <img src="{ lock }" alt="User Logo" width="24" />
                  </span>
                  <input type="password" id="password" class="form-control ps-0" placeholder="Şifre Belirleyin" bind:value={user.password} required>
                </div>
              </div>
              <div class="col">
                <!-- Verify Password -->
                <div class="input-group" id="verify-password-group">
                  <span class="input-group-addon bg-white align-items-center d-flex" id="emailAddon">
                    <img src="{ lock }" alt="User Logo" width="24" />
                  </span>
                  <input type="password" id="verify-password" class="form-control ps-0" placeholder="Şifre Doğrula" bind:value={user.verifyPassword} required>
                </div>
              </div>
            </div>

            <hr class="my-3" style="color: #25324B14; border: solid 1px #25324B14">

            <!-- Company Name -->
            <div class="btn-group input-group mb-3" style="font-size: 14px; font-weight:500" id="company-name-group">
              <!-- <select class="form-select py-3 border-0" aria-label="Default select example" bind:value={user.companyId}>
                <option selected disabled>Şirket Adı</option>
                {#each companies as company}
                <option value="{company._id}" class="ps-5">{company.name}</option>
                {/each}
              </select> -->
              <select class="form-select" aria-label="Default select example" bind:value={user.companyId}>
                {#each companies as company}
                  <option value="{company._id}" class="ps-5">{company.name}</option>
                {/each}
              </select>
            </div>

            <div class="row">
              <div class="col">
                <!-- User Degree -->
                <div class="input-group mb-3" id="degree-group">
                  <span class="input-group-addon bg-white align-items-center d-flex" id="degreeAddon">
                    <img src="{ userLogo }" alt="User Logo" width="24" />
                  </span>
                  <input type="text" id="degree" class="form-control ps-0" placeholder="Ünvan" bind:value={user.mainUserDegree} required>
                </div>
              </div>

              <div class="col">
                <div class="btn-group input-group mb-3" style="font-size: 14px; font-weight:500" id="company-name-group" role="group" aria-label="Basic example">
                  <select class="form-select py-3 input-group border-0" aria-label="Default select example" bind:value={user.userType} required>
                    <option disabled>Kullanıcı Tipi</option>
                    <option value="master" class="ps-5">master</option>
                    <option value="slave" class="ps-5">slave</option>
                </div>
              </div>
            </div>

          </div>
          <div class="modal-footer">
            <button id="cancel-button" type="submit" class="btn border-2 me-2 px-3" data-bs-dismiss="modal">
              <span class="d-flex align-items-center">
                  İptal Et
                  <img src="{ subLeft }" alt="Trash Can" class="">
              </span>
          </button>
          <button id="save-button" type="submit" class="btn btn-primary border-0 px-3" data-bs-dismiss="modal" on:click={handleRegisterUser}>
              <span class="d-flex align-items-center">
                  Kaydet
                  <img src="{ done }" alt="Trash Can" class="">
              </span>
          </button>
          </div>
      </div>
    </div>
</div>