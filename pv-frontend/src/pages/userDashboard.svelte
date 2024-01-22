<!-- src/userDashboard.svelte -->
<script>

    // User
    import { user } from '../user.js';
    let loggedInUser;
    user.subscribe(value => {
        loggedInUser = value;
    });

    // Sidebar
    import Sidebar from "../lib/Sidebar.svelte";

    // Search Profile Bar
    import SearchProfileBar from "../lib/SearchProfileBar.svelte";
    
    // Main Content
    import layers from '../assets/layer_orange.svg'
    import messages from '../assets/dashboard-messages.svg'
    import videos from '../assets/dashboard-videos.svg'
    import stats from '../assets/dashboard-stats.svg'
    import play from '../assets/play.svg'
    import like from '../assets/like.svg'
    import dislike from '../assets/dislike.svg'
    import pieChart from '../assets/pie-chart.svg'

    localStorage.setItem('storedRoute', '/userDashboard');
    let rotated = false;

    import { onMount } from 'svelte';

    // Get All Survey Stats
    import { getAllSurveyStats } from '../apis/userApis.js';
    let videoIntroStats;
    let surveyView = 0;
    let videoIntroSeen = 0;
    let videoIntroWatched = 0;
    let yes = 0;
    let no = 0;
    let videoYesSeen = 0;
    let videoYesWatched = 0;
    let videoNoSeen = 0;
    let videoNoWatched = 0;
    let percentages = {
        yes: 0,
        no: 0,
        videoSeen: 0,
    };

    var data1, data2, data3, data4, data5, data6, data7;
    async function getAllSurveyStatsFunc() {
        const response = await getAllSurveyStats(loggedInUser.company);
        if (response) {
            surveyView = response.surveyView;
            videoIntroSeen = response.videoIntroSeen;
            videoIntroWatched = response.videoWatched;
            yes = response.yes;
            no = response.no;
            videoYesSeen = response.videoYesSeen;
            videoYesWatched = response.videoYesWatched;
            videoNoSeen = response.videoNoSeen;
            videoNoWatched = response.videoNoWatched;
        }
        if (yes && no && videoYesSeen && videoNoSeen) {
            percentages = {
                yes: (yes / (yes + no)),
                no: (no / (yes + no)),
                videoSeen: videoIntroSeen + videoYesSeen + videoNoSeen,
            }
        }
        let sended = 250;
        data2 = [(surveyView * 100 / sended).toFixed(0), (100 - (surveyView * 100 / sended)).toFixed(0)];
        data3 = [((videoIntroSeen + videoYesSeen + videoNoSeen) * 100 / surveyView).toFixed(0), ((100 - ((videoIntroSeen + videoYesSeen + videoNoSeen) * 100 / surveyView))).toFixed(0)];
        data4 = [(((percentages.yes + percentages.no) * 100) / surveyView).toFixed(0), (100 - (((percentages.yes + percentages.no) * 100) / surveyView)).toFixed(0)];
        let videoSeen = videoIntroSeen + videoYesSeen + videoNoSeen;
        let videoWatched = videoIntroWatched + videoYesWatched + videoNoWatched;
        data5 = [
            { value: videoSeen, name: 'Görüntüleyen' },
            { value: videoWatched, name: 'Tam İzleyen'},
            { value: surveyView - videoSeen, name: 'İzlemeyen' }
        ];
        data6 = [
            { value: yes, name: 'Evet' },
            { value: no, name: 'Hayır' },
            { value: surveyView - (percentages.yes + percentages.no), name: 'Cevaplanmadı' },
        ];
        data7 = [
            { value: videoSeen, name: 'İzlendi' },
            { value: surveyView - videoSeen, name: 'İzlenmedi' },
        ];
        
    }

    // Doughnut Charts
    import DoughnutChart from '../lib/DoughnutChart.svelte';
    let chart1, chart2, chart3, chart4;

    // Nightingale Charts
    import NightingaleChart from '../lib/NightingaleChart.svelte';
    let chart5, chart6, chart7;

    onMount(async () => {
        await getAllSurveyStatsFunc();
    });

</script>
  
<style>
    main {
        height: 100vh;
    }
    #main-content-div {
        background-color: #f7f7f7;
    }
    .grid-box {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    }
    .grid-box-text {
        color: #8F979F;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px; /* 120% */
        font-family: 'Gilroy-Regular';
    }
    .grid-box-number {
        color: #697A8D;
        font-size: 24px;
        font-style: normal;
        font-weight: 900;
        line-height: 28.6px; /* 119.167% */
        letter-spacing: 0.24px;
        font-family: 'Gilroy-Bold';
    }
    #userDbGrid1 {
        background: url("../assets/user-dashboard/blue-bg.png") no-repeat center center;
        background-size: cover;
    }
    #userDbGrid2 {
        background: url("../assets/user-dashboard/green-bg.png") no-repeat center center;
        background-size: cover;
    }
    #chart1, #chart2, #chart3, #chart4 {
        max-width: 93%;
        max-height: 113%;
    }
    #chart5, #chart6, #chart7 {
        max-width: 100%;
        max-height: 100%;
    }
</style>
  
<main class="m-0 p-0" style="max-width: 100vw !important;">      
    <div class="d-flex m-0 p-0" style="height: 100vh;">
        <Sidebar page="userDashboard" rotated={rotated} />

        <div class="col-md px-0" id="main-content-div">
            <SearchProfileBar/>
            <div class="d-flex flex-column justify-content-between pt-2 mx-0 me-2">
                <div class="container-fluid d-flex mx-0 px-3 mb-4" style="height: 20vh;">
                    <div class="col-md d-flex justify-content-center bg-white rounded p-4 me-4 grid-box h-100">
                            <div class="w-50 d-flex flex-column justify-content-between h-100">
                                <img src={messages} alt="layers" class="img-responsive mb-2" width="42">
                                <span>
                                    <h6 class="grid-box-text mb-2 fs-5">SMS Gönderilen</h6>
                                    <h1 class="grid-box-number fs-2">0</h1>
                                </span>    
                            </div>
                            <div class="w-50 d-flex justify-content-center align-items-center p-2 ps-3">
                                {#if data1}
                                <DoughnutChart data={[80, 20]} colors={["#317CC0", "#4B9FE9"]} chartContainer={chart1} textColor="#317CC0" />
                                {/if}
                            </div>
                    </div>
                    <div class="col-md d-flex bg-white justify-content-center rounded p-4 me-4 grid-box h-100">
                            <div class="w-50 d-flex flex-column justify-content-between h-100">
                                <img src={layers} alt="layers" class="img-responsive mb-2" width="42">
                                <span>
                                    <h6 class="grid-box-text mb-2 fs-5">Açılma Sayısı</h6>
                                    <h1 class="grid-box-number fs-2">{ surveyView }</h1>
                                </span>    
                            </div>
                            <div class="w-50 d-flex justify-content-center align-items-center p-2 ps-3">
                                {#if data2}
                                    <DoughnutChart data={data2} colors={["#FF7A00", "#FFA654"]} chartContainer={chart2} textColor="#D96A04" />
                                {/if}
                            </div>
                    </div>
                    <div class="col-md d-flex justify-content-center bg-white rounded p-4 me-4 grid-box h-100">
                            <div class="w-50 d-flex flex-column justify-content-between h-100">
                                <img src={videos} alt="layers" class="img-responsive mb-2" width="42">
                                <span>
                                    <h6 class="grid-box-text mb-2 fs-5">İzlenme Sayısı</h6>
                                    <h1 class="grid-box-number fs-2">{ videoIntroSeen + videoYesSeen + videoNoSeen }</h1>
                                </span>    
                            </div>
                            <div class="w-50 d-flex justify-content-center align-items-center p-2 ps-3">
                                {#if data3}
                                <DoughnutChart data={data3} colors={["#07B209", "#50FC52"]} chartContainer={chart3} textColor="#02A504" />
                                {/if}
                            </div>
                    </div>
                    <div class="col-md d-flex justify-content-center bg-white rounded p-4 grid-box h-100">
                            <div class="w-50 d-flex flex-column justify-content-between h-100">
                                <img src={stats} alt="layers" class="img-responsive mb-2" width="42">
                                <span>
                                    <h6 class="grid-box-text mb-2 fs-5">Cevaplama Sayısı</h6>
                                    <h1 class="grid-box-number fs-2">{ yes + no }</h1>
                                </span>    
                            </div>
                            <div class="w-50 d-flex justify-content-center align-items-center p-2 ps-3">
                                {#if data4}
                                <DoughnutChart data={data4} colors={["#FF2A2A", "#FA7676"]} chartContainer={chart4} textColor="#D60A0A" />
                                {/if}
                            </div>
                    </div>
                </div>
                <div class="container-fluid mx-0 px-3 mb-4">
                    <div class="d-flex justify-content-between g-2" style="height: 19vh;">
                        <div id="userDbGrid1" class="col-md d-flex rounde grid-box p-3 rounded">
                            <div class="col-md d-flex flex-column justify-content-between align-items-center h-100">
                                <img src={play} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white text-center mb-1">Giriş Video İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">{videoIntroSeen}</h1>
                                <h6 class="dashboard-grid-text" style="color: #75CCFF">%81,95</h6>
                            </div>

                            <hr style="width:1px; border: 1px solid #269CD6;">

                            <div class="col-md d-flex flex-column justify-content-between align-items-center">
                                <img src={like} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white text-center mb-1"><span style="font-weight: 700;">"EVET"</span> Video İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">{ yes }</h1>
                                <h6 class="dashboard-grid-text" style="color: #75CCFF;">%81,95</h6>
                            </div>

                            <hr style="width:1px; border: 1px solid #269CD6;">

                            <div class="col-md d-flex flex-column justify-content-between align-items-center">
                                <img src={dislike} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white text-center mb-1"><span style="font-weight: 700;">"HAYIR"</span> Video İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">{ no }</h1>
                                <h6 class="dashboard-grid-text" style="color: #75CCFF">%81,95</h6>
                            </div>
                        </div>

                        <hr style="width:0px; padding-left: 0.75rem; padding-right: 0.75rem; border: 0;">

                        <div id="userDbGrid2" class="col-md d-flex rounde grid-box p-3 rounded">
                            <div class="col-md d-flex flex-column justify-content-between align-items-center">
                                <img src={play} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white text-center mb-1">Giriş Video Tam İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">{ videoIntroWatched }</h1>
                                <h6 class="dashboard-grid-text" style="color: #58FF5A">%81,95</h6>
                            </div>

                            <hr style="width:1px; border: 1px solid #269CD6;">

                            <div class="col-md d-flex flex-column justify-content-between align-items-center">
                                <img src={like} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white text-center mb-1"><span style="font-weight: 700;">"EVET"</span> Video İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">{ yes }</h1>
                                <h6 class="dashboard-grid-text" style="color: #58FF5A">%81,95</h6>
                            </div>

                            <hr style="width:1px; border: 1px solid #269CD6;">

                            <div class="col-md d-flex flex-column justify-content-between align-items-center">
                                <img src={dislike} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white text-center mb-1"><span style="font-weight: 700;">"HAYIR"</span> Video İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">{ no }</h1>
                                <h6 class="dashboard-grid-text" style="color: #58FF5A">%81,95</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid mx-0 px-3">
                    <div class="d-flex justify-content-between" style="height: 40vh">
                        <div class="col-md d-flex flex-column justify-content-between bg-white rounded p-4 grid-box">
                            <div class="d-flex justify-content-start align-items-center" style="margin-bottom: 20px;">
                                <img src={pieChart} alt="layers" class="img-responsive me-2" width="20">
                                <h6 class="grid-box-text m-0 fs-5 m" style="font-size: 16px; font-family: 'Gilroy-Medium';">Genel Analiz Grafiği</h6>
                            </div>
                            <div class="w-100 d-flex justify-content-center align-items-center h-100">
                                {#if data5}
                                    <NightingaleChart data={data5} chartContainer={chart5} />
                                {/if}
                            </div>
                        </div>

                        <hr style="width:0px; padding-left: 0.75rem; padding-right: 0.75rem; border: 0;">
                        
                        <div class="col-md d-flex flex-column justify-content-between bg-white rounded p-4 grid-box">
                            <div class="d-flex justify-content-start align-items-center" style="margin-bottom: 20px;">
                                <img src={pieChart} alt="layers" class="img-responsive me-2" width="20">
                                <h6 class="grid-box-text m-0 fs-5 m" style="font-size: 16px; font-family: 'Gilroy-Medium';">Anket Cevap Grafiği</h6>
                            </div>
                            <div class="w-100 d-flex justify-content-center align-items-center h-100">
                                {#if data6}
                                    <NightingaleChart data={data6} chartContainer={chart6} />
                                {/if}
                            </div>
                        </div>

                        <hr style="width:0px; padding-left: 0.75rem; padding-right: 0.75rem; border: 0;">

                        <div class="col-md d-flex flex-column justify-content-between bg-white rounded p-4 grid-box">
                            <div class="d-flex justify-content-start align-items-center" style="margin-bottom: 20px;">
                                <img src={pieChart} alt="layers" class="img-responsive me-2" width="20">
                                <h6 class="grid-box-text m-0 fs-5 m" style="font-size: 16px; font-family: 'Gilroy-Medium';">Video İzlenme Grafiği</h6>
                            </div>
                            <div class="w-100 d-flex justify-content-center align-items-center h-100">
                                {#if data7}
                                    <NightingaleChart data={data7} chartContainer={chart7} />
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>