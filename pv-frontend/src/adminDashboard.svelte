<!-- src/adminHome.svelte -->
<script>
    localStorage.setItem('storedRoute', '/adminDashboard');
    // Sidebar
    import Sidebar from "./lib/Sidebar.svelte";
    import arrow from './assets/sidebar-arrow.svg'

    // Lib
    import { Link } from "svelte-routing";
    import { signOut } from "./apis/userApis";
    import { navigate } from 'svelte-routing';
    import { getUser } from "./apis/userApis";
    import SearchProfileBar from "./lib/SearchProfileBar.svelte";

    // Bar Chart
    import BarChart from "./lib/BarChart.svelte";

    import jwt_decode from "jwt-decode";
    var decoded = {
        id: null,
        ait: null,
        exp: null
    }
    decoded = jwt_decode(localStorage.getItem("accessToken"));
    
    var user = {
        name: "",
        email: "",
        phoneNumber: "",
        mainUserDegree: "",
        companyName: "",
    }
    async function getTheUser() {
        user = await getUser(decoded.id);
    }
    getTheUser();


    // var currentUser = getUser(sessionStorage.getItem('userId') );
    async function signOutUser() {
        try {
            await signOut();
            localStorage.removeItem('accessToken');
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }
    let rotated = false;

    import layers from './assets/dashboard-layers.svg'
    import messages from './assets/dashboard-messages.svg'
    import videos from './assets/dashboard-videos.svg'
    import stats from './assets/dashboard-stats.svg'

    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';

    let canvas;

    onMount(() => {
        const ctx = canvas.getContext('2d');
        var background_1 = ctx.createLinearGradient(0, 0, 0, 600);
        background_1.addColorStop(0, '#327FC7');
        background_1.addColorStop(1, '#5CB3FE');

        var barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "24:00"],
                datasets: [{
                    label: 'Sample Data',
                    data: [0, 5000, 50000, 150000, 200001],
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
            <SearchProfileBar user={user} signOutUser={signOutUser} />
            <div class="row d-flex flex-column px-3 pt-1 mx-0 pe-4">
                <div class="container mx-0 px-0">
                    <div class="row g-0 d-flex justify-content-between">
                        <div class="bg-white rounded mb-3 p-4 grid-box" style="width: 65%; height: 42vh;">
                            <div class="d-flex justify-content-between p-3">
                                <h1 class="text m-0" style="color: #414141; font-size: 16px; font-weight: 700;">Saatlik Veri Analizi</h1>
                                <button class="btn btn-sm shadow-0 px-2 py-1" style="background-color: #F5F5F9; color: #414141; font-size: 11px; font-weight: 500; border-radius: 7px; color: #809FB8;">Tümü</button>
                            </div>
                                <canvas id="barChart" bind:this={canvas}></canvas>
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
                            <table class="table table-hover">
                                <thead>
                                  <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Firma</th>
                                    <th scope="col">Kampanya</th>
                                    <th scope="col">Tarih</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>#552</td>
                                    <td>Rubu Plus</td>
                                    <td>PVM Tanıtım Anketi</td>
                                    <td>11 Ara 2023, 10:58</td>
                                  </tr>
                                  <tr>
                                    <td>#552</td>
                                    <td>Rubu Plus</td>
                                    <td>PVM Tanıtım Anketi</td>
                                    <td>11 Ara 2023, 10:58</td>
                                  </tr>
                                  <tr>
                                    <td>#552</td>
                                    <td>Rubu Plus</td>
                                    <td>PVM Tanıtım Anketi</td>
                                    <td>11 Ara 2023, 10:58</td>
                                  </tr>
                                  <tr>
                                    <td>#552</td>
                                    <td>Rubu Plus</td>
                                    <td>PVM Tanıtım Anketi</td>
                                    <td>11 Ara 2023, 10:58</td>
                                  </tr>
                                </tbody>
                              </table>
                        </div>
                        <div class="container d-flex flex-column bg-white grid-box px-0 mx-0" style="width: 33%; height: 42vh;">
                            <div class="d-flex justify-content-between align-items-center p-4" style="border-bottom: 1px solid #E8E8E8;">
                                <h1 class="text m-0" style="color: #414141; font-size: 16px; font-weight: 700;">Son İşlemler</h1>
                                <button class="btn btn-sm ms-2 shadow-0 px-2 py-1" style="background-color: #F5F5F9; color: #414141; font-size: 11px; font-weight: 500; border-radius: 7px; color: #809FB8;">Tümü</button>
                            </div>
                            <div class="timeline pt-3">
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