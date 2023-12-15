<script>
    // Sidebar
    import Sidebar from "./lib/Sidebar.svelte";
    import arrow from './assets/sidebar-arrow.svg'

    // Lib
    import SearchProfileBar from "./lib/SearchProfileBar.svelte";
    
    let user
    let signOutUser
    
    let rotated = false;

    import layers from './assets/dashboard-layers.svg'
    import messages from './assets/dashboard-messages.svg'
    import videos from './assets/dashboard-videos.svg'
    import stats from './assets/dashboard-stats.svg'
    import play from './assets/play.svg'
    import like from './assets/like.svg'
    import dislike from './assets/dislike.svg'
    import chart from './assets/chart.svg'
    import user2 from './assets/user_2.svg'
    
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

    let selection;
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
</style>

<main class="m-0 p-0">
    <div class="d-flex m-0 p-0" style="height: 100vh;">
        <Sidebar page="userCampaigns" rotated={rotated} />

        <div class="col-md px-0" id="main-content-div">
            <SearchProfileBar user={user} signOutUser={signOutUser} />
            <div class="row d-flex flex-column px-3 pt-1 mx-0 pe-4">
                <div class="col-md-12 p-4 bg-white rounded mb-4 grid-box d-flex justify-content-between align-items-center">
                    <div>
                        <div class="dropdown">
                            <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"
                                style="border-radius: 8px; color: #697A8D; font-size: 14px; font-weight: 500; background-color: #F8F8F8;">
                                <img src={layers} alt="arrow" width="30" class="me-2">
                                Kampanya Seçiniz
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Kampanya 1</a></li>
                                <li><a class="dropdown-item" href="#">Kampanya 2</a></li>
                                <li><a class="dropdown-item" href="#">Kampyanya 3</a></li>
                            </ul>
                          </div>
                    </div>
                    <div>
                        <button class="btn" type="button" style="border-radius: 8px; color: #697A8D; font-size: 14px; font-weight: 500; background-color: #F8F8F8;" on:click={() => select("chart")}>
                            <img src={chart} alt="arrow" width="30" class="me-2">
                            İstatistik
                        </button>
                        <button class="btn" type="button" style="border-radius: 8px; color: #697A8D; font-size: 14px; font-weight: 500; background-color: #F8F8F8;" on:click={() => select("users")}>
                            <img src={user2} alt="arrow" width="30" class="me-2">
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
                
                <div class="container mx-0 px-0 mb-4">
                    <div class="row g-0 d-flex justify-content-between" style="height: 19vh;">
                        <div id="userDbGrid1" class="col-md d-flex rounded mb-4 grid-box" style="margin-right: 16px; padding-top: 20px; padding-bottom: 20px;">
                            <div class="col-md d-flex flex-column justify-content-between align-items-center">
                                <img src={play} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white mb-1">Giriş Video İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">12043</h1>
                                <h6 class="dashboard-grid-text" style="color: #75CCFF">%81,95</h6>
                            </div>

                            <hr style="width:1px; border: 1px solid #269CD6;">
                            <hr style="width:1px; border: 1px solid #0073C5;">

                            <div class="col-md d-flex flex-column justify-content-between align-items-center">
                                <img src={like} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white mb-1"><span style="font-weight: 700;">"EVET"</span> Video İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">12043</h1>
                                <h6 class="dashboard-grid-text" style="color: #75CCFF;">%81,95</h6>
                            </div>

                            <hr style="width:1px; border: 1px solid #269CD6;">
                            <hr style="width:1px; border: 1px solid #0073C5;">

                            <div class="col-md d-flex flex-column justify-content-between align-items-center">
                                <img src={dislike} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white mb-1"><span style="font-weight: 700;">"HAYIR"</span> Video İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">12043</h1>
                                <h6 class="dashboard-grid-text" style="color: #75CCFF">%81,95</h6>
                            </div>
                        </div>

                        <div id="userDbGrid2" class="col-md d-flex rounded mb-4 grid-box ms-2" style="margin-left: 16px; padding-top: 20px; padding-bottom: 20px;">
                            <div class="col-md d-flex flex-column justify-content-between align-items-center">
                                <img src={play} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white mb-1">Giriş Video Tam İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">12043</h1>
                                <h6 class="dashboard-grid-text" style="color: #58FF5A">%81,95</h6>
                            </div>

                            <hr style="width:1px; border: 1px solid #269CD6;">
                            <hr style="width:1px; border: 1px solid #0073C5;">

                            <div class="col-md d-flex flex-column justify-content-between align-items-center">
                                <img src={like} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white mb-1"><span style="font-weight: 700;">"EVET"</span> Video İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">12043</h1>
                                <h6 class="dashboard-grid-text" style="color: #58FF5A">%81,95</h6>
                            </div>

                            <hr style="width:1px; border: 1px solid #269CD6;">
                            <hr style="width:1px; border: 1px solid #0073C5;">

                            <div class="col-md d-flex flex-column justify-content-between align-items-center">
                                <img src={dislike} alt="layers" class="mb-3" width="42">
                                <h6 class="dashboard-grid-text text-white mb-1"><span style="font-weight: 700;">"HAYIR"</span> Video İzlenme Sayısı</h6>
                                <h1 class="dashboard-grid-number text-white mb-1" style="color: #696CFF; font-size: 28px; font-family: 'Gilroy-ExtraBold">12043</h1>
                                <h6 class="dashboard-grid-text" style="color: #58FF5A">%81,95</h6>
                            </div>
                        </div>
                    </div>
                </div>

                {:else if selection == "users"}
                <div class="bg-white rounded mb-4 grid-box" style="height: 43vh;">
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
                            <tr>
                                <td>#552</td>
                                <td>Hasan Basri Paşazade</td>
                                <td>11 Ara 2023, 10:58</td>
                                <td>534 262 58 06</td>
                                <td>İzlenmedi</td>
                                <td>Hayır</td>
                                <td>
                                    <span class="bg-light py-2 px-3 rounded">LOREM</span>
                                </td>
                            </tr>
                            <tr>
                                <td>#552</td>
                                <td>Hasan Basri Paşazade</td>
                                <td>11 Ara 2023, 10:58</td>
                                <td>534 262 58 06</td>
                                <td>İzlenmedi</td>
                                <td>Hayır</td>
                                <td>
                                    <span class="bg-light py-2 px-3 rounded">LOREM</span>
                                </td>
                            </tr>
                            <tr>
                                <td>#552</td>
                                <td>Hasan Basri Paşazade</td>
                                <td>11 Ara 2023, 10:58</td>
                                <td>534 262 58 06</td>
                                <td>İzlenmedi</td>
                                <td>Hayır</td>
                                <td>
                                    <span class="bg-light py-2 px-3 rounded">LOREM</span>
                                </td>
                            </tr>
                            <tr>
                                <td>#552</td>
                                <td>Hasan Basri Paşazade</td>
                                <td>11 Ara 2023, 10:58</td>
                                <td>534 262 58 06</td>
                                <td>İzlenmedi</td>
                                <td>Hayır</td>
                                <td>
                                    <span class="bg-light py-2 px-3 rounded">LOREM</span>
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