<script>
    // Sidebar
    import Sidebar from "./lib/Sidebar.svelte";

    // Lib
    import SearchProfileBar from "./lib/SearchProfileBar.svelte";

    // Main content
    import edit from "./assets/edit.svg";
    import preview from "./assets/preview.svg";
    import done from "./assets/done.svg";
    
    let user
    let signOutUser
    let rotated = false;
    let selection = 'new-campaigns';
    function select(button) {
        selection = button;
    }

</script>

<style>
    main {
        height: 100vh;
    }
    #main-content-div {
        background-color: #F5F5F9;
    }
    .dashboard-grid-text {
        font-family: 'Gilroy-SemiBold' !important;
        color: #697A8D;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 18px;
    }
    .dashboard-grid-number {
        font-family: 'Gilroy-ExtraBold' !important;
        font-size: 28px;
        font-style: normal;
        font-weight: 800;
        line-height: 28.6px;
    }
    .grid-box {
        border-radius: 6px !important;
        box-shadow: 0px 2px 6px 0px rgba(67, 89, 113, 0.12);
    }
    .table>:not(caption)>*>* {
        padding: 25px 30px !important;
    }
    table {
        border-collapse: separate;
        border-spacing: 0;
        overflow: hidden;
    }
    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    /* required css to make rounded table (below) */
    tr:first-child th:first-child {
        border-top-left-radius: 6px;
    }
    tr:first-child th:last-child {
        border-top-right-radius: 6px;
    }
    #barChart {
        width: 100% !important;
        height: 30vh !important;
    }
    #userDbGrid1 {
        background-color: #0480DA;
        background-size: cover;
    }
    #userDbGrid2 {
        /* background: url({userDbGrid2Bg}) no-repeat center center; */
        background-color: #07C509;
        background-size: cover;
    }
    .userCampaignsDiv1 {
        border-radius: 8px; 
        color: #697A8D; 
        font-size: 14px; 
        font-weight: 500; 
        background-color: #F8F8F8; 
        padding: 12px;
        border: none;
    }
</style>

<main class="m-0 p-0">
    <div class="d-flex m-0 p-0" style="height: 100vh;">
        <Sidebar page="userCampaigns2" rotated={rotated} />

        <div class="col-md px-0" id="main-content-div">
            <SearchProfileBar user={user} signOutUser={signOutUser} />
            <div class="row d-flex flex-column px-3 pt-1 mx-0 pe-4">
                <div class="col-md-12 p-4 bg-white rounded mb-4 grid-box d-flex justify-content-start align-items-center">
                    <div>
                        <button class="btn align-items-center me-2 px-3 userCampaignsDiv1" type="button" style="display: inline-flex;" on:click={() => select('new-campaigns')}>
                            <i class='bx bxs-collection me-2' style="font-size: 22px;"></i>
                            Yeni Kampanya Ekle
                        </button>
                        <button class="btn align-items-center px-3 userCampaignsDiv1" type="button" on:click={() => select('edit-campaigns')}>
                            <img src={edit} class="me-2 mb-0" alt="edit" width="22"/>
                            Kampanya Düzenle
                        </button>
                    </div>
                </div>

                {#if selection === 'new-campaigns'}
                <div class="row d-flex justify-content-between align-items-center mb-4 g-0" style="position:relative;">
                    <div class="d-flex flex-column justify-content-between me-3" style="width: 63%;">
                        <div class="accordion mb-4" id="accordionPanelsStayOpenExample">
                            <div class="accordion-item">
                              <h2 class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                  Kampanya Bilgileri
                                </button>
                              </h2>
                              <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
                                <div class="accordion-body">
                                    <div class="my-3">
                                        <div class="mb-3">
                                            <label for="input1" class="ms-2 position-absolute" style="margin-top: -0.70rem !important;">
                                                <span class="h6 small bg-white text-muted px-1" style="color: #04A3DA !important; font-size: 14px; font-weight: 500;">Kampanya Adı</span>
                                            </label>
                                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="">
                                        </div>
                                        <div class="mb-3">
                                            <label for="input1" class="ms-2 position-absolute" style="margin-top: -0.70rem !important;">
                                                <span class="h6 small bg-white text-muted px-1" style="color: #04A3DA !important; font-size: 14px; font-weight: 500;">Kampanya Açıklaması</span>
                                            </label>
                                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" style="resize: none;"></textarea>
                                        </div>
                                        <div class="d-flex justify-content-end w-100">
                                            <button class="btn px-3 py-2" type="button" style="background-color: #04A3DA; color: white;">
                                                Kaydet
                                                <img src={done} class="ms-2 mb-0" alt="edit" width="22"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                              </div>
                            </div>
                        </div>

                        <div class="accordion" id="accordionPanelsStayOpenExample">
                            <div class="accordion-item">
                              <h2 class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                  Grup Bilgileri
                                </button>
                              </h2>
                              <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
                                <div class="accordion-body">
                                    <div class="my-3">
                                        <div class="mb-3 d-flex justify-content-between">
                                            <span class="me-2">
                                                <label for="input1" class="ms-2 position-absolute" style="margin-top: -0.70rem !important;">
                                                    <span class="h6 small bg-white text-muted px-1" style="color: #04A3DA !important; font-size: 14px; font-weight: 500;">Grup Adı Giriniz</span>
                                                </label>
                                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="">
                                            </span>
                                            <span>
                                                <button class="btn" type="button" style="background-color: #04A3DA; color: white;">
                                                    Grup Oluştur 
                                                    <img src={done} class="ms-2 mb-0" alt="edit" width="22"/>
                                                </button>
                                            </span>
                                            
                                        </div>
                                    </div>
                                </div>
                              </div>
                            </div>
                        </div>

                    </div>
                    <div class="bg-white rounded grid-box" style="width: 35%; position:absolute; top: 0; right: 0;">
                        asd
                    </div>
                </div>
                    
                {:else if selection === ''}

                <div class="bg-white rounded mb-4 grid-box" style="height: 43vh;">
                    <table class="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Kampanya Adı</th>
                            <th scope="col">Tarih</th>
                            <th scope="col">Gönderilen Kişi</th>
                            <th scope="col">Durumu</th>
                            <th scope="col">Detaylar</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#552</td>
                                <td>PVM Tanıtım Anketi</td>
                                <td>11 Ara 2023, 10:58</td>
                                <td>852.536 Kişi</td>
                                <td>
                                    <span class="bg-light py-2 px-3 rounded">BEKLEMEDE</span>
                                </td>
                                <td class="d-flex">
                                    <button class="btn me-2 p-0" type="button" style="border: none;">
                                        <img src={preview} alt="edit" width="22"/>
                                    </button>

                                    <button class="btn me-2 p-0 align-items-center" type="button" style="display: inline-flex; border: none;">
                                        <i class='bx bxs-message-square-edit' style="font-size: 22px; color: #267BC0;"></i>
                                    </button>

                                    <button class="btn p-0 align-items-center" type="button" style="display: inline-flex; border: none;">
                                        <i class='bx bxs-message-square-detail' style="font-size: 22px; color: #267BC0;"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>#552</td>
                                <td>PVM Tanıtım Anketi</td>
                                <td>11 Ara 2023, 10:58</td>
                                <td>852.536 Kişi</td>
                                <td>
                                    <span class="bg-light py-2 px-3 rounded">BEKLEMEDE</span>
                                </td>
                                <td class="d-flex">
                                    <button class="btn me-2 p-0" type="button" style="border: none;">
                                        <img src={preview} alt="edit" width="22"/>
                                    </button>

                                    <button class="btn me-2 p-0 align-items-center" type="button" style="display: inline-flex; border: none;">
                                        <i class='bx bxs-message-square-edit' style="font-size: 22px; color: #267BC0;"></i>
                                    </button>

                                    <button class="btn p-0 align-items-center" type="button" style="display: inline-flex; border: none;">
                                        <i class='bx bxs-message-square-detail' style="font-size: 22px; color: #267BC0;"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>#552</td>
                                <td>PVM Tanıtım Anketi</td>
                                <td>11 Ara 2023, 10:58</td>
                                <td>852.536 Kişi</td>
                                <td>
                                    <span class="bg-light py-2 px-3 rounded">BEKLEMEDE</span>
                                </td>
                                <td class="d-flex">
                                    <button class="btn me-2 p-0" type="button" style="border: none;">
                                        <img src={preview} alt="edit" width="22"/>
                                    </button>

                                    <button class="btn me-2 p-0 align-items-center" type="button" style="display: inline-flex; border: none;">
                                        <i class='bx bxs-message-square-edit' style="font-size: 22px; color: #267BC0;"></i>
                                    </button>

                                    <button class="btn p-0 align-items-center" type="button" style="display: inline-flex; border: none;">
                                        <i class='bx bxs-message-square-detail' style="font-size: 22px; color: #267BC0;"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>#552</td>
                                <td>PVM Tanıtım Anketi</td>
                                <td>11 Ara 2023, 10:58</td>
                                <td>852.536 Kişi</td>
                                <td>
                                    <span class="bg-light py-2 px-3 rounded">BEKLEMEDE</span>
                                </td>
                                <td class="d-flex">
                                    <button class="btn me-2 p-0" type="button" style="border: none;">
                                        <img src={preview} alt="edit" width="22"/>
                                    </button>

                                    <button class="btn me-2 p-0 align-items-center" type="button" style="display: inline-flex; border: none;">
                                        <i class='bx bxs-message-square-edit' style="font-size: 22px; color: #267BC0;"></i>
                                    </button>

                                    <button class="btn p-0 align-items-center" type="button" style="display: inline-flex; border: none;">
                                        <i class='bx bxs-message-square-detail' style="font-size: 22px; color: #267BC0;"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                      </table>
                </div>

                {/if}
            </div>
        </div>

    </div>

</main>