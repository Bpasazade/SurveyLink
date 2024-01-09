<script>
    localStorage.setItem('storedRoute', '/userCampaigns');
    
    // User
    import { user } from '../user.js';
    let loggedInUser;
    user.subscribe(value => {
        loggedInUser = value;
    });

    // Campaign
    import { campaign } from '../campaign.js';
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
                    console.log(selectedCampaign);
                } else {
                    console.warn("Selected campaign not found in the campaignList.");
                }
            }
        });

        // get initial campaign selection
        if (campaignList.length > 0) {
            selectedCampaign = campaignList[0];
            selectedCampaignId = selectedCampaign._id;
            console.log(selectedCampaign);
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
    import user2 from '../assets/user_2.svg'
    import graph from '../assets/campaigns1/graph.svg'
    
    // Charts
    import Chart from 'chart.js/auto';
    import { onMount, tick } from 'svelte';

    let canvas;
    onMount(() => {
        const ctx = canvas.getContext('2d');
        var background_1 = ctx.createLinearGradient(0, 0, 0, 600);
        background_1.addColorStop(0, '#327FC7');
        background_1.addColorStop(1, '#5CB3FE');

        var barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00","06:00", "07:00", "08:00", "09:00", "10:00", "11:00","12:00", "13:00", "14:00", "15:00", "16:00", "17:00","18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
                datasets: [{
                    label: 'Sample Data',
                    data: [0, 5000, 50000, 150000, 200001, 5000, 36000, 5000, 50000, 150000, 200001, 5000, 36000, 5000, 50000, 150000, 200001, 5000, 36000, 5000, 50000, 150000, 200001, 5000],
                    backgroundColor: background_1,
                    borderColor: ['red', 'blue', 'fuchsia', 'green', 'navy'],
                    borderRadius: 10,
                    barThickness: 20,
                }]
            },
            options: {
                responsive: false,
                scales: {
                    // remove y-axis grid lines
                    y: {              
                        ticks: {
                            callback: function(value, index, values) {
                                return value === 0 ? '0k' : value / 1000 + 'k';
                            },
                            size: 20,
                        },
                        grid: {
                            color: '#EBEBEB',
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            size: 20,
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: false,
                    }
                }
            }
        });
    });

    let selection = "chart";
    function select(button) {
        selection = button;
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
        console.log(videoIntroStats);
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
    }

    // Selected Campaign Groups TargetList
    import { getGroupTargetList } from '../apis/userApis.js';
    async function getGroupTargetListHandler(groups) {
        groupTargetList = await getGroupTargetList(groups);
        console.log(groupTargetList);
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
        height: 32vh !important;
    }
    #userDbGrid1 {
        background: url("../assets/user-dashboard/blue-bg.png") no-repeat center center;
        background-size: cover;
    }
    #userDbGrid2 {
        background: url("../assets/user-dashboard/green-bg.png") no-repeat center center;
        background-size: cover;
    }
</style>

<main class="m-0 p-0">
    <div class="d-flex m-0 p-0" style="height: 100vh;">
        <Sidebar page="userCampaigns" rotated={rotated} />

        <div class="col-md px-0" id="main-content-div">
            <SearchProfileBar/>
            <div class="row d-flex flex-column px-3 pt-1 mx-0 pe-4">
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
                        <button class="btn px-3 py-2" type="button" style="border-radius: 8px; color: #697A8D; font-size: 14px; font-weight: 500; background-color: #F8F8F8;" on:click={() => select("chart")}>
                            <img src={graph} alt="arrow" width="20" class="me-2">
                            İstatistik
                        </button>
                        <button class="btn px-3 py-2" type="button" style="border-radius: 8px; color: #697A8D; font-size: 14px; font-weight: 500; background-color: #F8F8F8;" on:click={() => select("users")}>
                            <img src={user2} alt="arrow" width="20" class="me-2">
                            Kişiler 
                        </button>
                    </div>
                    
                </div>

                {#if selection == "chart"}
                <div class="container mx-0 px-0 mb-3">
                    <div class="row g-0 d-flex justify-content-between">
                        <div class="bg-white rounded mb-3 p-4 grid-box" style="width: 65%; height: 42vh;">
                            <div class="d-flex justify-content-between p-3">
                                <h1 class="text m-0" style="color: #414141; font-size: 16px; font-weight: 700;">Saatlik Veri Analizi</h1>
                                <button class="btn btn-sm shadow-0 px-2 py-1" style="background-color: #F5F5F9; color: #414141; font-size: 11px; font-weight: 500; border-radius: 7px; color: #809FB8;">Tümü</button>
                            </div>
                                <canvas id="barChart" aria-label="chart" bind:this={canvas}></canvas>
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
                                    <h1 class="dashboard-grid-number" style="color: #04A3DA;">0</h1>
                                </div>
                              </div>
                              <div class="col-6" style="height: 47%;">
                                <div class="px-4 pt-4 pb-2 bg-white rounded grid-box d-flex flex-column justify-content-between h-100">
                                    <img src={videos} alt="videos" class="mb-4" width="42">
                                    <h6 class="dashboard-grid-text mb-2">Toplam PVM İzlenme Sayısı</h6>
                                    <h1 class="dashboard-grid-number" style="color: #05AF07;">{ videoIntroSeen + videoYesSeen + videoNoSeen }</h1>
                                </div>
                              </div>
                              <div class="col-6" style="height: 47%;">
                                <div class="px-4 pt-4 pb-2 bg-white rounded grid-box d-flex flex-column justify-content-between h-100">
                                    <img src={stats} alt="stats" class="mb-4" width="42">
                                    <h6 class="dashboard-grid-text mb-2">Toplam PVM Yanıtlanma Sayısı</h6>
                                    <h1 class="dashboard-grid-number" style="color: #FF2222;">{ yes + no }</h1>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="container mx-0 px-0 mb-4">
                    <div class="row g-0 d-flex justify-content-between" style="height: 19vh;">
                        <div id="userDbGrid1" class="col-md d-flex rounded mb-4 grid-box" style="margin-right: 16px; padding-top: 20px; padding-bottom: 20px;">
                            <div class="col-md d-flex flex-column justify-content-between align-items-center">
                                <img src={play} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white mb-1">Giriş Video İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">{ videoIntroSeen }</h1>
                                <h6 class="dashboard-grid-text" style="color: #75CCFF">%81,95</h6>
                            </div>

                            <hr style="width:1px; border: 1px solid #269CD6;">
                            <hr style="width:1px; border: 1px solid #0073C5;">

                            <div class="col-md d-flex flex-column justify-content-between align-items-center">
                                <img src={like} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white mb-1"><span style="font-weight: 700;">"EVET"</span> Video İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">{ yes }</h1>
                                <h6 class="dashboard-grid-text" style="color: #75CCFF;">%81,95</h6>
                            </div>

                            <hr style="width:1px; border: 1px solid #269CD6;">
                            <hr style="width:1px; border: 1px solid #0073C5;">

                            <div class="col-md d-flex flex-column justify-content-between align-items-center">
                                <img src={dislike} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white mb-1"><span style="font-weight: 700;">"HAYIR"</span> Video İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">{ no }</h1>
                                <h6 class="dashboard-grid-text" style="color: #75CCFF">%81,95</h6>
                            </div>
                        </div>

                        <div id="userDbGrid2" class="col-md d-flex rounded mb-4 grid-box ms-2" style="margin-left: 16px; padding-top: 20px; padding-bottom: 20px;">
                            <div class="col-md d-flex flex-column justify-content-between align-items-center">
                                <img src={play} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white mb-1">Giriş Video Tam İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">{ videoIntroWatched }</h1>
                                <h6 class="dashboard-grid-text" style="color: #58FF5A">%81,95</h6>
                            </div>

                            <hr style="width:1px; border: 1px solid #269CD6;">
                            <hr style="width:1px; border: 1px solid #0073C5;">

                            <div class="col-md d-flex flex-column justify-content-between align-items-center">
                                <img src={like} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white mb-1"><span style="font-weight: 700;">"EVET"</span> Video İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">{ yes }</h1>
                                <h6 class="dashboard-grid-text" style="color: #58FF5A">%81,95</h6>
                            </div>

                            <hr style="width:1px; border: 1px solid #269CD6;">
                            <hr style="width:1px; border: 1px solid #0073C5;">

                            <div class="col-md d-flex flex-column justify-content-between align-items-center">
                                <img src={dislike} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white mb-1"><span style="font-weight: 700;">"HAYIR"</span> Video İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">{ no }</h1>
                                <h6 class="dashboard-grid-text" style="color: #58FF5A">%81,95</h6>
                            </div>
                        </div>
                    </div>
                </div>

                {:else if selection == "users"}
                <div class="bg-white rounded mb-4 grid-box px-0" style="height: 43vh;">
                    <table class="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Ad-Soyad</th>
                            <th scope="col">Tarih</th>
                            <th scope="col">Telefon</th>
                            <th scope="col">Giriş Videosu</th>
                            <th scope="col">Cevap</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                            {#each groupTargetList as target, index}
                            <tr>
                                <td>{ index + 1 }</td>
                                <td>{ target.name }</td>
                                <td>{ target.date }</td>
                                <td>{ target.phoneNumber }</td>
                                {#if target.answers[0][index].answer && target.answers[0][index].answer.includes("page-opened")}
                                    <td>Evet</td>
                                {/if}
                                <td>Hayır</td>
                                <td>
                                    <span class="bg-light py-2 px-3 rounded">LOREM</span>
                                </td>
                            </tr>
                            {/each}
                        </tbody>
                      </table>
                </div>
                {/if}
            </div>
        </div>
    </div>
</main>