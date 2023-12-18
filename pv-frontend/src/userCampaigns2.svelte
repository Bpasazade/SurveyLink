<script>
    // Sidebar
    import Sidebar from "./lib/Sidebar.svelte";

    // Lib
    import SearchProfileBar from "./lib/SearchProfileBar.svelte";

    // Main content
    import edit from "./assets/edit.svg";
    import preview from "./assets/preview.svg";
    import done from "./assets/done.svg";
    import plusCircle from "./assets/plus-circle-outline.svg";
    import person from "./assets/person.svg";
    import chatting from "./assets/chatting.svg";
    
    let user
    let signOutUser
    let rotated = false;
    let selection = 'new-campaigns';
    function select(button) {
        selection = button;
    }

    // Switch button
    let activeSwitchStyle = { left: '0%' };

    function switchLeft() {
        activeSwitchStyle = { left: '0%' };
    }

    function switchRight() {
        activeSwitchStyle = { left: '50%' };
    }
    

    // Date Time Picker
    import Flatpickr from 'svelte-flatpickr';
    import 'flatpickr/dist/flatpickr.css';

    let value, formattedValue;

    const options = {
        enableTime: true,
        onChange(selectedDates, dateStr) {
            console.log('flatpickr hook', selectedDates, dateStr);
        }
    };

    $: console.log({ value, formattedValue });

    function handleChange(event) {
        const [ selectedDates, dateStr ] = event.detail;
        console.log({ selectedDates, dateStr });
    }

    function handleSubmit(event) {
        event.preventDefault();

        console.log(event.target.elements['date'].value);
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
    .userCampaignsDiv1 {
        border-radius: 8px; 
        color: #697A8D; 
        font-size: 14px; 
        font-weight: 500; 
        background-color: #F8F8F8; 
        padding: 12px;
        border: none;
    }
    .accordion-button {
        background-color: #FFFFFF !important;
        color: #697A8D !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        border: none !important;
    }
    .accordion-button::after {
        background-image: url("./assets/plus-accordion.svg") !important;
        transform: none;
    }
    .accordion-button:not(.collapsed)::after {
        background-image: url("./assets/minus-accordion.svg") !important;
        transform: rotate(90deg);
    }
    input {
        border: 1px solid #EBE9F1 !important;
    }
    textarea {
        border: 1px solid #EBE9F1 !important;
    }
    .btn-accordion {
        padding-top: 13px !important;
        padding-bottom: 13px !important;
        padding-left: 15px !important;
        padding-right: 15px !important;
    }
    input[type="text"] {
        height: 50px !important;
    }
    #campaign-form-group::-webkit-scrollbar {
        display: none;  /* Safari and Chrome */
    }
    #campaign-form-group {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
        overflow-y: scroll;
    }
    .switch-button {
            width: 275px;
            height: 40px;
            text-align: center;
            will-change: transform;
            z-index: 197 !important;
            cursor: pointer;
            transition: 0.3s ease all;
            border-radius: 45px;
            background: #FFF;
        }

        .switch-button-case {
            display: inline-block;
            background: none;
            width: max-content;
            height: 100%;
            color: black;
            position: relative;
            border: none;
            transition: 0.3s ease all;
            border-radius: 45px;
            font-size: 12px !important;
        }

        .switch-button .active {
            color: white;
            background-color: #04A3DA;
            position: absolute;
            top: 0;
            width: 50%;
            height: 100%;
            z-index: -1;
            transition: 0.3s ease-out all;
            border-radius: 45px;
        }

        .switch-button .active-case {
            color: white;
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
                    <div id="campaign-form-group" class="d-flex flex-column justify-content-start me-3" style="width: 63%; height: 70vh;">

                        <div class="accordion mb-4 bg-white rounded" id="campaign-information-panel-top">
                            <div class="accordion-item border-0 grid-box">
                              <h2 class="accordion-header">
                                <button class="accordion-button shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#campaign-information-panel" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                    <i class='bx bx-collection me-2' ></i>
                                    Kampanya Bilgileri
                                </button>
                              </h2>
                              
                              <div id="campaign-information-panel" class="accordion-collapse collapse show">
                                <div class="accordion-body pt-2">
                                    <hr class="m-0 p-0 pt-3" style="color: #EBE9F1;"/>
                                    <div class="my-3">
                                        <div class="mb-3">
                                            <input type="text" class="form-control shadow-none" id="exampleFormControlInput1" placeholder="">
                                        </div>
                                        <div class="mb-3">
                                            <textarea class="form-control shadow-none" id="exampleFormControlTextarea1" rows="3" style="resize: none;"></textarea>
                                        </div>
                                        <div class="d-flex justify-content-end w-100">
                                            <button class="btn btn-accordion d-flex align-items-center" type="button" style="background-color: #04A3DA; color: white;">
                                                <span class="me-2">Kaydet</span>
                                                <i class='bx bx-check-double mb-0' style="font-size: 24px;"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                              </div>
                            </div>
                        </div>

                        <div class="accordion mb-4 bg-white rounded" id="group-information-panel-top">
                            <div class="accordion-item border-0 rounded grid-box">
                              <h2 class="accordion-header">
                                <button class="accordion-button shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#group-information-panel" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                    <i class='bx bx-group me-2' ></i>
                                    Grup Bilgileri
                                </button>
                              </h2>
                              <div id="group-information-panel" class="accordion-collapse collapse show">
                                <div class="accordion-body pt-2">
                                    <hr class="m-0 p-0 pt-3" style="color: #EBE9F1;"/>
                                    <div class="my-3 d-flex justify-content-between">
                                        <span class="me-2 w-100" style="width:max-content;">
                                            <input type="text" class="form-control shadow-none" id="exampleFormControlInput1" placeholder="">
                                        </span>
                                        <span class="col-md-3">
                                            <button class="btn btn-accordion w-100 py-0" type="button" style="background-color: #04A3DA; color: white;">
                                                Grup Oluştur 
                                                <img src={plusCircle} class="ms-2 mb-0" alt="edit" width="22"/>
                                            </button>
                                        </span>
                                    </div>
                                    
                                    <button class="btn btn-accordion d-flex align-items-center" type="button" style="background-color: #697A8D; color: white;">
                                        <i class='bx bx-group me-2' ></i>
                                        <span style="font-size: 12px;">Mevcut Grupları Görüntüle</span>
                                    </button>
                                </div>
                              </div>
                            </div>
                        </div>

                        <div class="accordion mb-4 bg-white rounded grid-box" id="person-information-panel-top">
                            <div class="accordion-item border-0 rounded">
                              <h2 class="accordion-header">
                                <button class="accordion-button shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#person-information-panel" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                    <img src={person} class="me-2 mb-0" alt="edit" width="16"/>
                                    Kişi Bilgileri
                                </button>
                              </h2>
                            </div>
                            <div id="person-information-panel" class="accordion-collapse collapse show">
                                <div class="accordion-body pt-2">
                                    <hr class="m-0 p-0 pt-3" style="color: #EBE9F1;"/>
                                    <div class="my-3 d-flex justify-content-between">
                                        <div class="p-1" style="width: fit-content; border: 1px solid rgba(44, 62, 79, 0.10); border-radius: 45px;">
                                            <div class="switch-button d-flex justify-content-between">
                                                <span class="active" style="left: {activeSwitchStyle.left};"></span>
                                                <button class="btn w-50 d-flex justify-content-center align-items-center switch-button-case left {activeSwitchStyle.left === '0%' ? 'active-case' : ''}" on:click={switchLeft}>Excel Dosyası Yükle</button>
                                                <button class="btn w-50 d-flex justify-content-center align-items-center switch-button-case right {activeSwitchStyle.left === '50%' ? 'active-case' : ''}" on:click={switchRight}>Kişi Ekle</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                          <input type="text" class="form-control shadow-none" placeholder="" aria-label="First name">
                                        </div>
                                        <div class="col">
                                          <input type="text" class="form-control shadow-none"   placeholder="" aria-label="Last name">
                                        </div>
                                    </div>
                                    <div class="my-3 d-flex justify-content-between">
                                        <span class="me-2 w-100" style="width:max-content;">
                                            <input type="text" class="form-control shadow-none" id="exampleFormControlInput1" placeholder="">
                                        </span>
                                        <span class="col-md-3">
                                            <button class="btn btn-accordion d-flex align-items-center w-100 py-0" type="button" style="background-color: #04A3DA; color: white;">
                                                İşlemi Kaydet
                                                <i class='bx bx-check-double mb-0' style="font-size: 24px;"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="accordion mb-4 bg-white rounded grid-box" id="sms-information-panel-top">
                            <div class="accordion-item border-0 rounded">
                              <h2 class="accordion-header">
                                <button class="accordion-button shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#sms-information-panel" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                    <img src={chatting} class="me-2 mb-0" alt="edit" width="16"/>
                                    SMS Ayarları
                                </button>
                              </h2>
                            </div>
                            <div id="sms-information-panel" class="accordion-collapse collapse show">
                                <div class="accordion-body pt-2">
                                    <hr class="m-0 p-0 pt-3" style="color: #EBE9F1;"/>
                                    <textarea class="form-control shadow-none mb-3" id="exampleFormControlTextarea1" rows="3" style="resize: none;"></textarea>
                                    <select class="form-select shadow-none" aria-label="Default select example">
                                        <option selected>Open this select menu</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                    <!-- date time -->
                                        <Flatpickr class="w-100 shadow-none border-0" {options} bind:value bind:formattedValue on:change={handleChange} name="date" />
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