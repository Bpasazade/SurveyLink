<script>
    localStorage.setItem('storedRoute', '/kampanya-analizi');
    
    // User
    import { user } from '../user.js';
    let loggedInUser;
    user.subscribe(value => {
        loggedInUser = value;
    });

    // Campaign
    import { campaign } from '../campaign.js';
    import { onMount, tick } from 'svelte';
    let selectedCampaign;
    let selectElement;

    onMount(async () => {
        campaignList = await getCompanyCampaigns(loggedInUser.company);
        campaign.subscribe(value => {
            selectedCampaign = value;
            if (selectElement && selectedCampaign && campaignList.length > 0) {
                const selectedIndex = campaignList.findIndex(c => c._id === selectedCampaign._id);
                if (selectedIndex !== -1) {
                    tick().then(() => {
                        selectElement.selectedIndex = selectedIndex;
                    });
                    getSurveyStatsHandler();
                } else {
                    console.warn("Selected campaign not found in the campaignList.");
                }
            }
        });

        // get initial campaign selection
        if (campaignList.length > 0) {
            selectedCampaign = campaignList[0];
            selectedCampaignId = selectedCampaign._id;
            getSurveyStatsHandler();
        }
    });

    // Sidebar
    import Sidebar from "../lib/Sidebar.svelte";
    let rotated = false;

    // Lib
    import SearchProfileBar from "../lib/SearchProfileBar.svelte";
    
    // Assets
    import layers from '../assets/dashboard-layers.svg'
    import messages from '../assets/dashboard-messages.svg'
    import videos from '../assets/dashboard-videos.svg'
    import stats from '../assets/dashboard-stats.svg'
    import play from '../assets/play.svg'
    import like from '../assets/like.svg'
    import dislike from '../assets/dislike.svg'
    
    // Chart
    import BarChart from '../lib/BarChart.svelte';
    // chart data array 24 indexes filled with 0
    let chartData = Array.from({length: 24}, () => 0);
    function prepareData() {
        chartData = Array.from({length: 24}, () => 0);
        // get the hour from the date string
        dateAnswers.forEach(date => {
            // get HH from the date string (if its string)
            if(date) {
                const hour = date.substring(11, 13);
                chartData[hour] += 1;
            }
        });
    }
    

    // Company Campaigns
    import { getCompanyCampaigns } from '../apis/userApis.js';
    let campaignList = [];

    async function getCompanyCampaignsHandler() {
        campaignList = await getCompanyCampaigns(loggedInUser.company);
    }
    
    // Get Survey Stats
    import { getSurveyStats } from '../apis/userApis.js';
    let videoIntroStats;
    let surveyView = 0;
    let videoIntroSeen = 0;
    let videoIntroWatched = 0;
    let yes = 0;
    let no = 0;
    let videoYesSeen = 0;
    let videoNoSeen = 0;
    async function getSurveyStatsHandler() {
        videoIntroStats = await getSurveyStats(loggedInUser.company, selectedCampaign._id);
        videoIntroSeen = videoIntroStats.videoIntroSeen;
        videoIntroWatched = videoIntroStats.videoWatched;
        yes = videoIntroStats.yes;
        no = videoIntroStats.no;
        videoYesSeen = videoIntroStats.videoYesSeen;
        videoNoSeen = videoIntroStats.videoNoSeen;
        surveyView = videoIntroStats.surveyView;
    }

    // Selected Campaign
    let selectedCampaignId;
    let groupTargetList = [];
    $: if (selectedCampaignId) {
        selectedCampaign = campaignList.find(c => c._id === selectedCampaignId);
        getGroupTargetListHandler(selectedCampaign.groups);
        getSurveyStatsHandler();

        // get campaign template
        if (selectedCampaign.templateName) {        
            let campaignTemplate = selectedCampaign.templateName.replace('/public/', '').replace('.svelte', '')
            getCampaignTemplate();
        }
    }

    // Selected Campaign Template
    let campaignTemplate = null;
    import { getTemplate } from '../apis/userApis.js';
    async function getCampaignTemplate() {
        campaignTemplate = await getTemplate(selectedCampaign._id);
    }


    let dateAnswers = [];
    // Selected Campaign Groups TargetList
    import { getGroupTargetList } from '../apis/userApis.js';
    async function getGroupTargetListHandler(groups) {
        groupTargetList = await getGroupTargetList(selectedCampaignId, groups);
        groupTargetList = groupTargetList.map(target => {
            return {
                ...target,
                answers: target.answers[0].filter(answer => answer.campaign === selectedCampaignId),
            };
        });
        dateAnswers = groupTargetList.map(target => {
            // save every targets answers' second element (date) to a new array
            return target.answers[1] ? target.answers[1].answer : null;
        });
        prepareData();
    }

    // Selected Tab (Stats or Users)
    let selectedButton = null;
    let selectedTab = null;
    const toggle = (button) => {
        // Toggle the selected state
        // if the button is already selected, dont deselect it
        if(selectedButton !== button) {
            selectedButton = button;
        }
        if(button == 1) {
            selectedTab = "stats";
        } else if(button == 2) {
            selectedTab = "users";
        }
    };

    toggle(1);
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
    td {
        vertical-align: middle !important;
    }
    #userDbGrid1 {
        background: url("../assets/user-dashboard/blue-bg.png") no-repeat center center;
        background-size: cover;
    }
    #userDbGrid2 {
        background: url("../assets/user-dashboard/green-bg.png") no-repeat center center;
        background-size: cover;
    }
    .btn-selected,
    .btn-selected:hover {
        border: 0px solid #697A8D;
        background-color: #697A8D !important;
    }
    .btn-selected svg path,
    .btn-selected:hover svg path{
        fill: white;
    }
    .btn-selected span,
    .btn-selected:hover span {
        color: #FFFFFF;
    }
</style>

<main class="m-0 p-0">
    <div class="d-flex m-0 p-0" style="height: 100vh;">
        <Sidebar page="userCampaigns" rotated={rotated} />

        <div class="col-md px-0" id="main-content-div">
            <SearchProfileBar/>
            <div class="d-flex flex-column px-3 pt-1 mx-0 pe-4">
                <div class="col-md-12 p-4 bg-white rounded mb-4 grid-box d-flex justify-content-between align-items-center">
                    <div>
                        <select class="form-select shadow-none border-0 py-2" aria-label="Default select example" style="border-radius: 8px; color: #697A8D !important; font-size: 14px; font-weight: 500; background-color: #F8F8F8;"
                          bind:this={selectElement} bind:value={selectedCampaignId}>
                          {#each campaignList as campaign}
                              <option value={campaign._id}>{campaign.name}</option>
                          {/each}
                        </select>
                    </div>
                    <div>
                        <button class="btn px-3 py-2 me-2 {selectedButton === 1 ? 'btn-selected' : ''}" type="button" style="border-radius: 8px; color: #697A8D; font-size: 14px; font-weight: 500; background-color: #F8F8F8;" on:click={() => toggle(1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="me-2" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M17.1785 16.3629H3.63756V2.82193C3.63756 2.37213 3.26898 2.00354 2.8223 2.00354C2.37249 2.00354 2.00391 2.37213 2.00391 2.82193V17.1812C2.00391 17.6279 2.37249 17.9965 2.8223 17.9965H17.1816C17.6314 17.9965 18 17.6279 18 17.1781C18 16.7283 17.6283 16.3629 17.1785 16.3629Z" fill="#697A8D"/>
                                <path d="M12.3962 9.59081C11.9808 9.74387 11.5154 9.37528 11.1718 9.19099C10.066 8.55064 8.64788 8.83177 7.87947 9.85632L5.23688 13.3485C4.96512 13.7078 5.03697 14.2232 5.39618 14.4949C5.7554 14.7667 6.2708 14.6948 6.54256 14.3356L9.18514 10.8434C9.62558 10.2187 10.3877 10.5716 10.8844 10.9246C12.062 11.6462 13.73 11.1807 14.3766 9.96252L16.0353 6.96696L16.2914 7.78535C16.4288 8.21954 16.9005 8.45693 17.3253 8.32262C17.7595 8.18518 17.9969 7.72288 17.8626 7.2887L17.0223 4.63674C16.8943 4.21192 16.4132 3.9714 15.9884 4.09947L13.3208 4.93973C12.2963 5.24272 12.8086 6.83889 13.8081 6.51091L14.5359 6.27976L12.9335 9.17224C12.821 9.37528 12.6274 9.53458 12.3962 9.59081Z" fill="#697A8D"/>
                            </svg>
                            <span class="mb-0">İstatistik</span>
                        </button>
                        <button class="btn px-3 py-2 {selectedButton === 2 ? 'btn-selected' : ''}" type="button" style="border-radius: 8px; color: #697A8D; font-size: 14px; font-weight: 500;" on:click={() => toggle(2)}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="me-2" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M9.89428 9.70725C11.0048 9.70725 11.9664 9.3275 12.752 8.57823C13.5377 7.82909 13.936 6.91246 13.936 5.85351C13.936 4.79491 13.5377 3.87817 12.7519 3.12878C11.9661 2.37976 11.0046 2 9.89428 2C8.78366 2 7.82233 2.37976 7.03664 3.1289C6.25095 3.87805 5.85254 4.79479 5.85254 5.85351C5.85254 6.91246 6.25095 7.82921 7.03677 8.57835C7.82258 9.32737 8.78405 9.70725 9.89428 9.70725Z" fill="#697A8D"/>
                                <path d="M16.9661 14.3032C16.9434 13.9914 16.8976 13.6514 16.8301 13.2922C16.762 12.9304 16.6743 12.5884 16.5693 12.2758C16.4609 11.9526 16.3134 11.6335 16.1311 11.3278C15.9419 11.0104 15.7196 10.734 15.4702 10.5066C15.2095 10.2687 14.8902 10.0774 14.5209 9.93787C14.153 9.79907 13.7452 9.72876 13.3091 9.72876C13.1378 9.72876 12.9721 9.79578 12.6522 9.99438C12.4553 10.1168 12.2249 10.2584 11.9679 10.415C11.7481 10.5486 11.4503 10.6737 11.0825 10.787C10.7236 10.8977 10.3592 10.9539 9.99962 10.9539C9.64 10.9539 9.27577 10.8977 8.91653 10.787C8.5491 10.6738 8.25131 10.5487 8.03175 10.4152C7.77711 10.26 7.54667 10.1184 7.34682 9.99426C7.02727 9.79565 6.86148 9.72864 6.69018 9.72864C6.25387 9.72864 5.84624 9.79907 5.47843 9.93799C5.10946 10.0773 4.79004 10.2686 4.529 10.5067C4.27973 10.7343 4.05736 11.0105 3.86839 11.3278C3.68621 11.6335 3.53873 11.9525 3.43016 12.2759C3.32531 12.5885 3.23761 12.9304 3.1695 13.2922C3.10204 13.6509 3.0562 13.9911 3.03354 14.3036C3.01127 14.6097 3 14.9275 3 15.2484C3 16.0836 3.27845 16.7597 3.82755 17.2584C4.36986 17.7505 5.08744 18.0001 5.96006 18.0001H14.0399C14.9126 18.0001 15.6299 17.7506 16.1723 17.2584C16.7216 16.7601 17 16.0838 17 15.2483C16.9999 14.9259 16.9885 14.6079 16.9661 14.3032Z" fill="#697A8D"/>
                            </svg>
                            <span>Kişiler</span> 
                        </button>
                    </div>
                </div>

                {#if selectedTab == "stats"}
                <div class="container-fluid mx-0 px-0 mb-3">
                    <div class="g-0 d-flex justify-content-between">
                        <div class="bg-white rounded mb-3 p-4 grid-box" style="width: 65%; height: 42vh;">
                            <div class="d-flex justify-content-between pb-4 pt-2 ps-2">
                                <h1 class="text m-0" style="color: #414141; font-size: 16px; font-weight: 700;">Saatlik Veri Analizi</h1>
                            </div>
                            {#if chartData.some(data => data !== 0)}
                                <BarChart data={chartData} />
                            {:else}
                                <div class="d-flex justify-content-center align-items-center" style="height: 32vh;">
                                    <h1 class="text m-0" style="color: #414141; font-size: 16px; font-weight: 700;">Veri bulunamadı.</h1>
                                </div>
                            {/if}
                        </div>
                        <div class="container px-0 mx-0" style="width: 33%; height: 42vh;">
                            <div class="row h-100 g-4">
                              <div class="col-6" style="height: 47%;">
                                <div class="px-4 pt-4 pb-2 bg-white rounded grid-box d-flex flex-column justify-content-between h-100">
                                    <img src={layers} alt="layers" class="mb-4" width="42">
                                    <h6 class="dashboard-grid-text mb-2">Toplam Anket Açılma Sayısı</h6>
                                    <h1 class="dashboard-grid-number" style="color: #696CFF;">{ surveyView }</h1>
                                </div>
                              </div>
                              <div class="col-6" style="height: 47%;">
                                <div class="px-4 pt-4 pb-2 bg-white rounded grid-box d-flex flex-column justify-content-between h-100">
                                    <img src={messages} alt="messages" class="mb-4" width="42">
                                    <h6 class="dashboard-grid-text mb-2">Toplam SMS Gönderim Sayısı</h6>
                                    <h1 class="dashboard-grid-number" style="color: #04A3DA;">
                                        {#if selectedCampaign}
                                            {selectedCampaign.sentSms}
                                        {:else}
                                            0
                                        {/if}
                                    </h1>
                                </div>
                              </div>
                              <div class="col-6" style="height: 47%;">
                                <div class="px-4 pt-4 pb-2 bg-white rounded grid-box d-flex flex-column justify-content-between h-100">
                                    <img src={videos} alt="videos" class="mb-4" width="42">
                                    <h6 class="dashboard-grid-text mb-2">Toplam Anket İzlenme Sayısı</h6>
                                    <h1 class="dashboard-grid-number" style="color: #05AF07;">{ videoIntroSeen + videoYesSeen + videoNoSeen }</h1>
                                </div>
                              </div>
                              <div class="col-6" style="height: 47%;">
                                <div class="px-4 pt-4 pb-2 bg-white rounded grid-box d-flex flex-column justify-content-between h-100">
                                    <img src={stats} alt="stats" class="mb-4" width="42">
                                    <h6 class="dashboard-grid-text mb-2">Toplam Anket Yanıtlanma Sayısı</h6>
                                    <h1 class="dashboard-grid-number" style="color: #FF2222;">{ yes + no }</h1>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="container-fluid mx-0 px-0 mb-4">
                    <div class="g-0 d-flex justify-content-between" style="height: 19vh;">
                        <div id="userDbGrid1" class="col-md d-flex rounde grid-box p-3 rounded">
                            <div class="col-md d-flex flex-column justify-content-between align-items-center h-100">
                                <img src={play} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white text-center mb-1">Giriş Video İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">{videoIntroSeen}</h1>
                            </div>

                            <hr style="width:1px; border: 1px solid #269CD6;">

                            <div class="col-md d-flex flex-column justify-content-between align-items-center">
                                <img src={like} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white text-center mb-1"><span style="font-weight: 700;">"EVET"</span> Video İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">{ yes }</h1>
                            </div>

                            <hr style="width:1px; border: 1px solid #269CD6;">

                            <div class="col-md d-flex flex-column justify-content-between align-items-center">
                                <img src={dislike} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white text-center mb-1"><span style="font-weight: 700;">"HAYIR"</span> Video İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">{ no }</h1>
                            </div>
                        </div>

                        <hr style="width:0px; padding-left: 0.75rem; padding-right: 0.75rem; border: 0;">

                        <div id="userDbGrid2" class="col-md d-flex rounde grid-box p-3 rounded">
                            <div class="col-md d-flex flex-column justify-content-between align-items-center">
                                <img src={play} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white text-center mb-1">Giriş Video Tam İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">{ videoIntroWatched }</h1>
                            </div>

                            <hr style="width:1px; border: 1px solid #269CD6;">

                            <div class="col-md d-flex flex-column justify-content-between align-items-center">
                                <img src={like} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white text-center mb-1"><span style="font-weight: 700;">"EVET"</span> Video İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">{ yes }</h1>
                            </div>

                            <hr style="width:1px; border: 1px solid #269CD6;">

                            <div class="col-md d-flex flex-column justify-content-between align-items-center">
                                <img src={dislike} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white text-center mb-1"><span style="font-weight: 700;">"HAYIR"</span> Video İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">{ no }</h1>
                            </div>
                        </div>
                    </div>
                </div>

                {:else if selectedTab == "users"}
                <div class=" bg-white rounded mb-4 grid-box px-0" style="height: 60vh; scroll-x: auto;">
                    <table class="col-md-5 table table-hover">
                        <thead style="overflow-x: hidden;">
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Ad-Soyad</th>
                            <th scope="col">Telefon</th>
                            <th scope="col">Tarih</th>
                            <th scope="col">Link Açılma</th>
                            <th scope="col">Giriş Videosu Soru</th>
                            <th scope="col">Giriş Videosu Görüntüleme</th>
                            <th scope="col">Giriş Videosu İzlenme</th>
                            <th scope="col">Cevap</th>
                            <th scope="col">Cevap 1 Video Görüntüleme</th>
                            <th scope="col">Cevap 2 Video İzlenme</th>
                          </tr>
                        </thead>
                        <tbody>
                            {#if groupTargetList.length == 0}
                                <tr>
                                    <td colspan="11" class="text-center">Veri bulunamadı.</td>
                                </tr>
                            {:else}
                                {#each groupTargetList as target, index}
                                    <tr>
                                        <td>{ index + 1 }</td>
                                        <td>{ target.name }</td>
                                        <td>{ target.phoneNumber }</td>
                                            {#if target.answers.length != 0}
                                                
                                                {#if target.answers[1] != null}
                                                    <td>{ target.answers[1].answer.substring(0, 10, 'tr-TR') + " " + target.answers[1].answer.substring(11, 16, 'tr-TR') }</td>
                                                {:else}
                                                    <td>-</td>
                                                {/if}

                                                {#if target.answers[0].answer == "page-opened"}
                                                    <td>Evet</td>
                                                {:else}
                                                    <td>Hayır</td>
                                                {/if}

                                                {#if target.answers[2]}
                                                    {#if target.answers[2].answer == "video-open"}
                                                        <td>Evet</td>
                                                    {/if}
                                                {:else}
                                                    <td>Hayır</td>
                                                {/if}

                                                {#if target.answers[3]}
                                                    {#if target.answers[3].answer == "video-played"}
                                                        <td>Açıldı</td>
                                                    {/if}
                                                {:else}
                                                    <td>Açılmadı</td>
                                                {/if}

                                                {#if target.answers[4]}
                                                    {#if target.answers[4].answer == "video-ended"}
                                                        <td style="color: #05AF07">İzlendi</td>
                                                    {/if}
                                                {:else}
                                                    <td style="color: #CD0000">İzlenmedi</td>
                                                {/if}

                                                {#if target.answers[5]}
                                                    {#if target.answers[5].answer == "Option 1"}
                                                        <td>{campaignTemplate.options[0]}</td>
                                                    {:else if target.answers[5].answer == "Option 2"}
                                                        <td>{campaignTemplate.options[1]}</td>
                                                    {:else if target.answers[5].answer == "Option 3"}
                                                        <td>{campaignTemplate.options[2]}</td>
                                                    {:else if target.answers[5].answer == "Option 4"}
                                                        <td>{campaignTemplate.options[3]}</td>
                                                    {:else if target.answers[5].answer == "Option 5"}
                                                        <td>{campaignTemplate.options[4]}</td>
                                                    {/if}
                                                {:else}
                                                    <td>Hayır</td>
                                                {/if}

                                                {#if target.answers[6]}
                                                    {#if target.answers[6].answer == "video-yes-started" || target.answers[6].answer == "video-no-started"}
                                                        <td>Görüntülendi</td>
                                                    {/if}
                                                {:else}
                                                    <td>Görüntülenmedi</td>
                                                {/if}

                                                {#if target.answers[7]}
                                                    {#if target.answers[7].answer == "video-yes-ended" || target.answers[7].answer == "video-no-ended"}
                                                        <td style="color: #05AF07">İzlendi</td>
                                                    {/if}
                                                {:else}
                                                    <td style="color: #CD0000">İzlenmedi</td>
                                                {/if}
                                            {:else}
                                                <td>-</td>
                                                <td>Cevaplanmadı</td>
                                                <td>Cevaplanmadı</td>
                                                <td>Açlmadı</td>
                                                <td style="color: #CD0000">İzlenmedi</td>
                                                <td>Cevaplanmadı</td>
                                                <td>Görüntülenmedi</td>
                                                <td style="color: #CD0000">İzlenmedi</td>
                                            {/if}
                                    </tr>
                                {/each}
                            {/if}
                        </tbody>
                      </table>
                </div>
                {/if}
            </div>
        </div>
    </div>
</main>