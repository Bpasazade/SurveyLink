<!-- src/adminHome.svelte -->
<script>
    localStorage.setItem('storedRoute', '/adminDashboard');
    // Sidebar
    import Sidebar from "../lib/Sidebar.svelte";

    // Lib
    import { getUser } from "../apis/userApis";
    import SearchProfileBar from "../lib/SearchProfileBar.svelte";

    // User
    import { user } from "../user.js";
    let loggedInUser;
    user.subscribe(value => (loggedInUser = value));
    console.log(loggedInUser);


    let rotated = false;

    import layers from '../assets/dashboard-layers.svg'
    import messages from '../assets/dashboard-messages.svg'
    import videos from '../assets/dashboard-videos.svg'
    import stats from '../assets/dashboard-stats.svg'

    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';

    // Bar Chart
    import BarChart from "../lib/BarChart.svelte";
    let canvas;
    // let chartData = Array.from({length: 24}, () => 0);
    // function prepareData() {
    //     // get the hour from the date string
    //     dateAnswers.forEach(date => {
    //         // get HH from the date string (if its string)
    //         if(date) {
    //             const hour = date.substring(11, 13);
    //             chartData[hour] += 1;
    //         }
    //     });
    //     console.log(chartData);
    // }

    // Company Campaigns
    import { getAllCampaigns } from "../apis/adminApis.js";
    import { getAllCompanies } from "../apis/adminApis.js"; 
    let campaignList = [];
    let companyList = [];
    let campaignCompanies = [];
    
    onMount(async () => {
        campaignList = await getAllCampaigns();
        companyList = await getAllCompanies();
        for (let i = 0; i < campaignList.length; i++) {
            campaignCompanies.push(companyList.find(company => company._id === campaignList[i].company));
        }
    });
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

    /* Timeline */
    /* The actual timeline (the vertical ruler) */
    .timeline {
        position: relative;
        margin-left: 40px;
        
    }

    /* The actual timeline (the vertical ruler) */
    .timeline::after {
        content: '';
        position: absolute;
        width: 1px;
        background-color: #EBEBEB;
        top: 0;
        bottom: 0;
        margin-left: -3px;
        margin-bottom: -27px;
        height: 100%;
    }

    /* Container around content */
    .container-timeline {
        padding: 10px 20px;
        position: relative;
        background-color: inherit;
    }

    /* The circles on the timeline */
    .container-timeline::after {
        content: '';
        position: absolute;
        width: 9px;
        height: 9px;
        left: -7px !important;
        background-color: white;
        border: 1px solid #04A3DA;
        top: 15px;
        border-radius: 50%;
        z-index: 1;
    }

    /* Add arrows to the right container (pointing left) */
    .right::before {
        content: " ";
        height: 0;
        position: absolute;
        top: 22px;
        width: 0;
        z-index: 1;
        left: 30px;
        border: medium solid white;
        border-width: 10px 10px 10px 0;
        border-color: transparent white transparent transparent;
    }

    /* Fix the circle for containers on the right side */
    .right::after {
        left: -16px;
    }

    /* The actual content */
    .content {
        background-color: white;
        position: relative;
        border-radius: 6px;
    }

    /* Media queries - Responsive timeline on screens less than 600px wide */
    @media screen and (max-width: 600px) {
        
        /* Full-width containers */
        .container {
            width: 100%;
            padding-left: 70px;
            padding-right: 25px;
        }
        
        /* Make sure that all arrows are pointing leftwards */
        .container::before {
            left: 60px;
            border: medium solid white;
            border-width: 10px 10px 10px 0;
            border-color: transparent white transparent transparent;
        }
        
        /* Make all right containers behave like the left ones */
        .right {
            left: 0%;
        }
    }

    .timeline-date {
        color: #016C90;
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 153.846% */
        letter-spacing: -0.26px;
    }

    .timeline-p {
        color: #404040;
        font-size: 15px;
        font-style: normal;
        font-weight: 700;
        line-height: 20px; /* 133.333% */
        letter-spacing: -0.3px;
        margin-bottom: 0px !important;
    }

    .timeline-pd {
        color: #838383;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 133.333% */
        letter-spacing: -0.3px;
        margin-bottom: 0px !important;
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
</style>

<main class="m-0 p-0">
    <div class="d-flex m-0 p-0" style="height: 100vh;">
        <Sidebar page="adminDashboard" rotated={rotated} />

        <div class="col-md px-0" id="main-content-div">
            <SearchProfileBar/>
            <div class="row d-flex flex-column px-3 pt-1 mx-0 pe-4">
                <div class="container mx-0 px-0">
                    <div class="row g-0 d-flex justify-content-between">
                        <div class="bg-white rounded mb-3 p-4 grid-box" style="width: 65%; height: 42vh;">
                            <div class="d-flex justify-content-between p-3">
                                <h1 class="text m-0" style="color: #414141; font-size: 16px; font-weight: 700;">Saatlik Veri Analizi</h1>
                                <button class="btn btn-sm shadow-0 px-2 py-1" style="background-color: #F5F5F9; color: #414141; font-size: 11px; font-weight: 500; border-radius: 7px; color: #809FB8;">Tümü</button>
                            </div>
                            <!-- {#if chartData.some(data => data !== 0)}
                                <BarChart data={chartData} />
                            {/if} -->
                        </div>
                        <div class="container px-0 mx-0" style="width: 33%; height: 42vh;">
                            <div class="row h-100 g-4">
                              <div class="col-6" style="height: 47%;">
                                <div class="px-4 pt-4 pb-2 bg-white rounded grid-box d-flex flex-column justify-content-between h-100">
                                    <img src={layers} alt="layers" class="mb-4" width="42">
                                    <h6 class="dashboard-grid-text mb-2">Toplam Kampanya Sayısı</h6>
                                    <h1 class="dashboard-grid-number" style="color: #696CFF;">0</h1>
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
                                    <h1 class="dashboard-grid-number" style="color: #05AF07;">0</h1>
                                </div>
                              </div>
                              <div class="col-6" style="height: 47%;">
                                <div class="px-4 pt-4 pb-2 bg-white rounded grid-box d-flex flex-column justify-content-between h-100">
                                    <img src={stats} alt="stats" class="mb-4" width="42">
                                    <h6 class="dashboard-grid-text mb-2">Toplam PVM Yanıtlanma Sayısı</h6>
                                    <h1 class="dashboard-grid-number" style="color: #FF2222;">0</h1>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row d-flex flex-column px-3 pt-1 mx-0 pe-4">
                <div class="container mx-0 px-0">
                    <div class="row g-0 d-flex justify-content-between">
                        <div class="bg-white rounded mb-4 grid-box" style="width: 65%; height: 43vh;">
                            <table class="table table-hover px-0">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Firma</th>
                                        <th scope="col">Kampanya Adı</th>
                                        <th scope="col">Tarih</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each campaignList as campaign, index}
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            {#if companyList.length > 0}
                                                <td>{campaignCompanies[index].name}</td>
                                            {:else}
                                                <td>Şirket Silinmiş</td>
                                            {/if}
                                            <td>{campaign.name}</td>
                                            <td>{campaign.date}</td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                        <div class="container d-flex flex-column bg-white grid-box px-0 mx-0" style="width: 33%; height: 43vh;">
                            <div class="d-flex justify-content-between align-items-center p-4" style="border-bottom: 1px solid #E8E8E8;">
                                <h1 class="text m-0" style="color: #414141; font-size: 16px; font-weight: 700;">Son İşlemler</h1>
                                <button class="btn btn-sm ms-2 shadow-0 px-2 py-1" style="background-color: #F5F5F9; color: #414141; font-size: 11px; font-weight: 500; border-radius: 7px; color: #809FB8;">Tümü</button>
                            </div>
                            <div class="d-flex flex-column justify-content-between h-100 timeline py-3">
                                <div class="container-timeline right">
                                  <div class="content">
                                    <h2 class="timeline-date">11 Aralık 2023  / Pazartesi</h2>
                                    <div class="d-flex w-100">
                                        <p class="timeline-p me-2">Eğitim-Bir-Sen</p>
                                        <p class="timeline-pd">Yeni Kullanıcı Oluşturdu</p>
                                    </div>
                                  </div>
                                </div>
                                <div class="container-timeline right">
                                    <div class="content">
                                        <h2 class="timeline-date">11 Aralık 2023  / Pazartesi</h2>
                                        <div class="d-flex w-100">
                                            <p class="timeline-p me-2">Eğitim-Bir-Sen</p>
                                            <p class="timeline-pd">Yeni Kullanıcı Oluşturdu</p>
                                        </div>
                                      </div>
                                </div>
                                <div class="container-timeline right">
                                    <div class="content">
                                        <h2 class="timeline-date">11 Aralık 2023  / Pazartesi</h2>
                                        <div class="d-flex w-100">
                                            <p class="timeline-p me-2">Eğitim-Bir-Sen</p>
                                            <p class="timeline-pd">Yeni Kullanıcı Oluşturdu</p>
                                        </div>
                                      </div>
                                </div>
                                <div class="container-timeline right">
                                    <div class="content">
                                        <h2 class="timeline-date">11 Aralık 2023  / Pazartesi</h2>
                                        <div class="d-flex w-100">
                                            <p class="timeline-p me-2">Eğitim-Bir-Sen</p>
                                            <p class="timeline-pd">Yeni Kullanıcı Oluşturdu</p>
                                        </div>
                                      </div>
                                </div>
                              </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>