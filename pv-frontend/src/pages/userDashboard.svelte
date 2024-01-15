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

    import Chart from 'chart.js/auto';
    let canvas1, canvas2, canvas3, canvas4, canvas5, canvas6, canvas7;

    import { onMount } from 'svelte';
    onMount(async () => {
        await getAllSurveyStatsFunc();
        const ctx1 = canvas1.getContext('2d');
        const ctx2 = canvas2.getContext('2d');
        const ctx3 = canvas3.getContext('2d');
        const ctx4 = canvas4.getContext('2d');
        const ctx5 = canvas5.getContext('2d');
        const ctx6 = canvas6.getContext('2d');
        const ctx7 = canvas7.getContext('2d');

        var background_1 = ctx1.createLinearGradient(90, 0, 0, 0);
        background_1.addColorStop(0, '#25C5FC');
        background_1.addColorStop(1, '#0895C6');

        var background_2 = ctx2.createLinearGradient(90, 0, 0, 0);
        background_2.addColorStop(0, '#FFA451');
        background_2.addColorStop(1, '#FF7B03');

        var background_3 = ctx3.createLinearGradient(90, 0, 0, 0);
        background_3.addColorStop(0, '#50FC52');
        background_3.addColorStop(1, '#07B209');

        var background_4 = ctx4.createLinearGradient(90, 0, 0, 0);
        background_4.addColorStop(0, '#FA7676');
        background_4.addColorStop(1, '#FF2A2A');

        var chart1 = new Chart(ctx1, {
            type: 'doughnut',
            data: {
                labels: ["SMS"],
                datasets: [{
                    data: [80, 20],
                    backgroundColor: [background_1, "#E5E5E5"],
                }],
                
            },
            options: {
                aspectRatio: 1,
                responsive: true,
                maintainAspectRatio: false,
                cutout: 50,
                borderRadius: 30,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: false,
                    },
                }
            },
            plugins: [
                        {
                            afterDraw: function (chart) {
                                var width = chart.width,
                                    height = chart.height,
                                    ctx = chart.ctx;

                                ctx.restore();
                                ctx.font = "900 30px 'Gilroy-Bold'";
                                ctx.fillStyle = "#017299";
                                ctx.textBaseline = "middle";

                                var text = "80%";
                                var textX = Math.round((width - ctx.measureText(text).width) / 2);
                                var textY = height / 2;

                                ctx.fillText(text, textX, textY);
                                ctx.save();
                            }
                        }
                    ]
        });

        var chart2 = new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ["Açılma"],
                datasets: [{
                    data: [80, 20],
                    backgroundColor: [background_2, "#E5E5E5"],
                }],
                
            },
            options: {
                aspectRatio: 1,
                responsive: true,
                cutout: 50,
                borderRadius: 30,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: false,
                    }
                }
            },
            plugins: [
                        {
                            afterDraw: function (chart) {
                                var width = chart.width,
                                    height = chart.height,
                                    ctx = chart.ctx;

                                ctx.restore();
                                ctx.font = "900 30px 'Gilroy-Bold'";
                                ctx.fillStyle = "#D96A04";
                                ctx.textBaseline = "middle";

                                var text = "80%";
                                var textX = Math.round((width - ctx.measureText(text).width) / 2);
                                var textY = height / 2;

                                ctx.fillText(text, textX, textY);
                                ctx.save();
                            }
                        }
                    ]
        });

        var chart3 = new Chart(ctx3, {
            type: 'doughnut',
            data: {
                labels: ["İzlenme"],
                datasets: [{
                    data: [80, 20],
                    backgroundColor: [background_3, "#E5E5E5"],
                }],
                
            },
            options: {
                aspectRatio: 1,
                responsive: true,
                cutout: 50,
                borderRadius: 30,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: false,
                    }
                }
            },
            plugins: [
                        {
                            afterDraw: function (chart) {
                                var width = chart.width,
                                    height = chart.height,
                                    ctx = chart.ctx;

                                ctx.restore();
                                ctx.font = "900 30px 'Gilroy-Bold'";
                                ctx.fillStyle = "#02A504";
                                ctx.textBaseline = "middle";

                                var text = "80%";
                                var textX = Math.round((width - ctx.measureText(text).width) / 2);
                                var textY = height / 2;

                                ctx.fillText(text, textX, textY);
                                ctx.save();
                            }
                        }
                    ]
        });

        var chart4 = new Chart(ctx4, {
            type: 'doughnut',
            data: {
                labels: ["Cevaplama"],
                datasets: [{
                    data: [80, 20],
                    backgroundColor: [background_4, "#E5E5E5"],
                }],
                
            },
            options: {
                aspectRatio: 1,
                responsive: true,
                cutout: 50,
                borderRadius: 30,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: false,
                    }
                }
            },
            plugins: [
                        {
                            afterDraw: function (chart) {
                                var width = chart.width,
                                    height = chart.height,
                                    ctx = chart.ctx;

                                ctx.restore();
                                ctx.font = "900 30px 'Gilroy-Bold'";
                                ctx.fillStyle = "#D60A0A";
                                ctx.textBaseline = "middle";

                                var text = "80%";
                                var textX = Math.round((width - ctx.measureText(text).width) / 2);
                                var textY = height / 2;

                                ctx.fillText(text, textX, textY);
                                ctx.save();
                            }
                        }
                    ]
        });

        var chart5 = new Chart(ctx5, {
            type: "doughnut",
            plugins: [
                {
                    beforeDraw: function (chart) {
                        const datasetMeta = chart.getDatasetMeta(0);
                        const innerRadius = datasetMeta.controller.innerRadius;
                        const outerRadius = datasetMeta.controller.outerRadius;
                        const heightOfItem = outerRadius - innerRadius;

                        const countOfData = chart.getDatasetMeta(0).data.length;
                        const additionalRadius = Math.floor(heightOfItem / countOfData);

                        const weightsMap = datasetMeta.data
                        .map((v) => v.circumference)
                        .sort((a, b) => a - b)
                        .reduce((a, c, ci) => {
                            a.set(c, ci + 1);
                            return a;
                        }, new Map());

                        datasetMeta.data.forEach((dataItem) => {
                            const weight = weightsMap.get(dataItem.circumference);
                            dataItem.outerRadius = innerRadius + additionalRadius * weight;
                        });
                    },
                },
            ],
            data: {
                labels: ["Açılma", "İzlenme", "Cevaplama"],
                datasets: [
                {
                    data: [40, 30, 20, 10],
                    backgroundColor: ["#0077B6", "#00B4D8", "#03045E", "#F8F8F8"],
                    borderWidth: 0,
                },
                ],
            },
            options: {
                plugins: {
                    legend: false,
                    datalabels: {
                        display: false,
                    },
                },
                maintainAspectRatio: false,
                responsive: true,
            },
        });

        var chart6 = new Chart(ctx6, {
            type: "doughnut",
            plugins: [
                {
                    beforeDraw: function (chart) {
                        const datasetMeta = chart.getDatasetMeta(0);
                        const innerRadius = datasetMeta.controller.innerRadius;
                        const outerRadius = datasetMeta.controller.outerRadius;
                        const heightOfItem = outerRadius - innerRadius;

                        const countOfData = chart.getDatasetMeta(0).data.length;
                        const additionalRadius = Math.floor(heightOfItem / countOfData);

                        const weightsMap = datasetMeta.data
                        .map((v) => v.circumference)
                        .sort((a, b) => a - b)
                        .reduce((a, c, ci) => {
                            a.set(c, ci + 1);
                            return a;
                        }, new Map());

                        datasetMeta.data.forEach((dataItem) => {
                            const weight = weightsMap.get(dataItem.circumference);
                            dataItem.outerRadius = innerRadius + additionalRadius * weight;
                        });
                    },
                },
            ],
            data: {
                labels: ["Evet", "Hayır"],
                datasets: [
                {
                    data: [percentages.yes, percentages.no],
                    backgroundColor: ["#0077B6", "#00B4D8", "#F8F8F8"],
                    borderWidth: 0,
                },
                ],
            },
            options: {
                plugins: {
                    legend: false,
                    datalabels: {
                        display: false,
                    },
                },
                maintainAspectRatio: false,
                responsive: true,
            },
        });

        var chart7 = new Chart(ctx7, {
            type: "doughnut",
            plugins: [
                {
                    beforeDraw: function (chart) {
                        const datasetMeta = chart.getDatasetMeta(0);
                        const innerRadius = datasetMeta.controller.innerRadius;
                        const outerRadius = datasetMeta.controller.outerRadius;
                        const heightOfItem = outerRadius - innerRadius;

                        const countOfData = chart.getDatasetMeta(0).data.length;
                        const additionalRadius = Math.floor(heightOfItem / countOfData);

                        const weightsMap = datasetMeta.data
                        .map((v) => v.circumference)
                        .sort((a, b) => a - b)
                        .reduce((a, c, ci) => {
                            a.set(c, ci + 1);
                            return a;
                        }, new Map());

                        datasetMeta.data.forEach((dataItem) => {
                            const weight = weightsMap.get(dataItem.circumference);
                            dataItem.outerRadius = innerRadius + additionalRadius * weight;
                        });
                    },
                },
            ],
            data: {
                labels: ["İzlendi", "İzlenmedi"],
                datasets: [
                {
                    data: [percentages.videoSeen, 100 - percentages.videoSeen],
                    backgroundColor: ["#0077B6", "#00B4D8"],
                    borderWidth: 0,
                },
                ],
            },
            options: {
                plugins: {
                    legend: false,
                    datalabels: {
                        display: false,
                    },
                },
                maintainAspectRatio: false,
                responsive: true,
            },
        });
    });

    // Get All Survey Stats
    import { getAllSurveyStats } from '../apis/userApis.js';
    let videoIntroStats;
    let surveyView = 0;
    let videoIntroSeen = 0;
    let videoIntroWatched = 0;
    let yes = 0;
    let no = 0;
    let videoYesSeen = 0;
    let videoNoSeen = 0;
    let percentages = {};
    async function getAllSurveyStatsFunc() {
        const response = await getAllSurveyStats(loggedInUser.company);
        if (response) {
            surveyView = response.surveyView;
            videoIntroSeen = response.videoIntroSeen;
            videoIntroWatched = response.videoWatched;
            yes = response.yes;
            no = response.no;
            videoYesSeen = response.videoYesSeen;
            videoNoSeen = response.videoNoSeen;
        }
        percentages = {
            yes: (yes / (yes + no)) * 100,
            no: (no / (yes + no)) * 100,
            videoSeen: ((videoIntroSeen + videoYesSeen + videoNoSeen) / (surveyView * 3) * 100).toFixed(0),
        }
    }
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
                                <canvas id="chart1" aria-label="chart" bind:this={canvas1}></canvas>
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
                                <canvas id="chart2" aria-label="chart" bind:this={canvas2} style="width: 13vh; height: 13vh;"></canvas>
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
                                <canvas id="chart3" aria-label="chart" bind:this={canvas3} style="width: 13vh; height: 13vh;"></canvas>
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
                                <canvas id="chart4" aria-label="chart" bind:this={canvas4} style="width: 13vh; height: 13vh;"></canvas>
                            </div>
                    </div>
                </div>
                <div class="container-fluid mx-0 px-3 mb-4">
                    <div class="d-flex justify-content-between" style="height: 23vh;">
                        <div id="userDbGrid1" class="col-md d-flex rounde grid-box p-3 rounded" style="margin-right: 16px;">
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

                        <div id="userDbGrid2" class="col-md d-flex rounded grid-box ms-2 h-100" style="margin-left: 16px; padding-top: 20px; padding-bottom: 20px;">
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
                    <div class="d-flex justify-content-between" style="height: fit-content">
                        <div class="d-flex flex-column justify-content-between bg-white rounded p-4 grid-box" style="width: 31.5%;">
                            <div class="d-flex justify-content-start align-items-center" style="margin-bottom: 20px;">
                                <img src={pieChart} alt="layers" class="img-responsive me-2" width="20">
                                <h6 class="grid-box-text m-0 fs-5 m" style="font-size: 16px; font-family: 'Gilroy-Medium';">Genel Analiz Grafiği</h6>
                            </div>
                            <div class="w-100 d-flex justify-content-center align-items-center p-2 ps-3" style="margin-bottom: 13px;">
                                <canvas id="chart5" aria-label="chart" bind:this={canvas5} style="height: 17vh;"></canvas>
                            </div>
                            <div class="d-flex justify-content-center align-items-center px-3">
                                <div class="d-flex justify-content-start align-items-center rounded me-3 p-2" style="background-color: #F7F8FA;">
                                    <div class="me-2" style="width: 13px; height: 13px; background-color: #0077B6; border-radius: 5px"></div>
                                    <h6 class="grid-box-text m-0" style="font-size: 13px; font-family: 'Gilroy-Medium'; margin-left: 10px; font-weight: 500;">İzleyen</h6>
                                </div>
                                <div class="d-flex justify-content-start align-items-center rounded me-3 p-2" style="background-color: #F7F8FA;">
                                    <div class="me-2" style="width: 13px; height: 13px; background-color: #00B4D8; border-radius: 5px"></div>
                                    <h6 class="grid-box-text m-0" style="font-size: 13px; font-family: 'Gilroy-Medium'; margin-left: 10px; font-weight: 500;">Görüntülenme</h6>
                                </div>
                                <div class="d-flex justify-content-start align-items-center rounded p-2" style="background-color: #F7F8FA;">
                                    <div class="me-2" style="width: 13px; height: 13px; background-color: #03045E; border-radius: 5px"></div>
                                    <h6 class="grid-box-text m-0" style="font-size: 13px; font-family: 'Gilroy-Medium'; margin-left: 10px; font-weight: 500;">İzlemeyen</h6>
                                </div>
                                
                            </div>
                        </div>
                        
                        <div class="d-flex flex-column justify-content-between bg-white rounded p-4 grid-box" style="width: 31.5%;">
                            <div class="d-flex justify-content-start align-items-center" style="margin-bottom: 20px;">
                                <img src={pieChart} alt="layers" class="img-responsive me-2" width="20">
                                <h6 class="grid-box-text m-0 fs-5 m" style="font-size: 16px; font-family: 'Gilroy-Medium';">Anket Cevap Grafiği</h6>
                            </div>
                            <div class="w-100 d-flex justify-content-center align-items-center p-2 ps-3" style="margin-bottom: 13px;">
                                <canvas id="chart6" aria-label="chart" bind:this={canvas6} style="height: 17vh;"></canvas>
                            </div>
                            <div class="d-flex justify-content-center align-items-center px-3">
                                <div class="d-flex justify-content-start align-items-center rounded me-3 p-2" style="background-color: #F7F8FA;">
                                    <div class="me-2" style="width: 13px; height: 13px; background-color: #0077B6; border-radius: 5px"></div>
                                    <h6 class="grid-box-text m-0" style="font-size: 13px; font-family: 'Gilroy-Medium'; margin-left: 10px; font-weight: 500;">Evet</h6>
                                </div>
                                <div class="d-flex justify-content-start align-items-center rounded me-3 p-2" style="background-color: #F7F8FA;">
                                    <div class="me-2" style="width: 13px; height: 13px; background-color: #00B4D8; border-radius: 5px"></div>
                                    <h6 class="grid-box-text m-0" style="font-size: 13px; font-family: 'Gilroy-Medium'; margin-left: 10px; font-weight: 500;">Hayır</h6>
                                </div>
                                <div class="d-flex justify-content-start align-items-center rounded p-2" style="background-color: #F7F8FA;">
                                    <div class="me-2" style="width: 13px; height: 13px; background-color: #F8F8F8; border-radius: 5px"></div>
                                    <h6 class="grid-box-text m-0" style="font-size: 13px; font-family: 'Gilroy-Medium'; margin-left: 10px; font-weight: 500;">Belirtilmemiş</h6>
                                </div>
                                
                            </div>
                        </div>

                        <div class="d-flex flex-column justify-content-between bg-white rounded p-4 grid-box" style="width: 31.5%;">
                            <div class="d-flex justify-content-start align-items-center" style="margin-bottom: 20px;">
                                <img src={pieChart} alt="layers" class="img-responsive me-2" width="20">
                                <h6 class="grid-box-text m-0 fs-5 m" style="font-size: 16px; font-family: 'Gilroy-Medium';">Video İzlenme Grafiği</h6>
                            </div>
                            <div class="w-100 d-flex justify-content-center align-items-center p-2 ps-3 h-75" style="margin-bottom: 13px;">
                                <canvas id="chart7" aria-label="chart" bind:this={canvas7} style="height: 17vh;"></canvas>
                            </div>
                            <div class="d-flex justify-content-center align-items-center px-3">
                                <div class="d-flex justify-content-start align-items-center rounded me-3 p-2" style="background-color: #F7F8FA;">
                                    <div class="me-2" style="width: 13px; height: 13px; background-color: #0077B6; border-radius: 5px"></div>
                                    <h6 class="grid-box-text m-0" style="font-size: 13px; font-family: 'Gilroy-Medium'; margin-left: 10px; font-weight: 500;">İzlendi</h6>
                                </div>
                                <div class="d-flex justify-content-start align-items-center rounded p-2" style="background-color: #F7F8FA;">
                                    <div class="me-2" style="width: 13px; height: 13px; background-color: #00B4D8; border-radius: 5px"></div>
                                    <h6 class="grid-box-text m-0" style="font-size: 13px; font-family: 'Gilroy-Medium'; margin-left: 10px; font-weight: 500;">İzlenmedi</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>