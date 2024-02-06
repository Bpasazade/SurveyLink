<script>
    localStorage.setItem('storedRoute', '/Kampanya2');
    import { onMount } from "svelte";

    export let id;
    export let campaignId;
    export let name;
    export let company;

    onMount(() => {
        if (!id || !campaignId || !name || !company) {
            fontCondition = true;
            mainHeight = true;
            videoContainerWidth = true;
            name = 'RUBUPLUS';
        }
    });

    let fontCondition = false;
    let mainHeight = false;
    let videoContainerWidth = false;

    saveAnswerToDb('page-opened');
    saveAnswerToDb(new Date().toLocaleString());

    // Operations
    import { saveAnswer } from "../src/apis/target.user.apis";
    
    function saveAnswerToDb(answer) {
        if (!id || !campaignId || !company) return;
        saveAnswer(id, company, campaignId, answer);
    }

    function showNextSection(currentSectionId, nextSectionId) {
        const currentSection = document.getElementById(currentSectionId);
        const nextSection = document.getElementById(nextSectionId);

        currentSection.style.display = 'none';
        nextSection.style.display = 'block';
    }

    let optionElements;

    onMount(() => {
        optionElements = Array.from(document.querySelectorAll('.option'));
    });

    function getOptionElements() {
        return optionElements;
    }

    export { getOptionElements };
</script>

<style>
    main {
        max-height: 100% !important;
        color: #232C48;
        height: 100vh;
        background-color: #F5F5F5;
    }
    form { height: 100%; }
    .text-title {
        font-size: 11vw;
        font-weight: 900 !important;
        font-family: 'Gilroy-Black', sans-serif !important;
    }
    .text-subtitle {
        font-size: 7vw;
        font-weight: 700 !important;
    }
    .text-name {
        font-size: 7vw;
        font-weight: 700 !important;
        color: red !important;
    }
    .video-container {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%; 
        overflow: hidden;
    }
    .video-container-width {
        width: 94%;
        margin-left: 3%;
    }
    .video-container video {
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .font-condition { font-size: 1rem !important; }
    .main {
        height: 60vh !important;
        max-width: 100% !important;
    }
    #next1 {
        border-radius: 30px !important;
        border: 2px solid red !important;
    }
    .option {
        width: 90%;
        border-radius: 35px !important;
        border: 2px solid red !important;
        background-color: white !important;
        color: #232C48 !important;
        outline: 7px solid white !important;
        box-shadow: 0 14px 15px 5px rgba(255, 0, 0, 0.3) !important;
        position: relative;
    }
</style>

<main class="{mainHeight ? 'main' : ''}">
    <form id="surveyForm">
        <!-- Section 1 -->
        <div id="section1" class="section h-100 p-4">
            <div class="mb-5 h-100 d-flex flex-column align-items-center justify-content-start">
                <h1 class="text text-title w-100 text-center mb-0 {fontCondition ? 'font-condition' : ''}" style="color: red;">BELEDİYE İŞİ</h1>
                <h1 class="text text-title w-100 text-center mb-4 {fontCondition ? 'font-condition' : ''}"
                    style="font-size: 14vw;"
                >GÖNÜL İŞİ</h1>
                <h1 class="text text-subtitle w-100 text-left mb-2 {fontCondition ? 'font-condition' : ''}">SAYIN;</h1>
                <h1 id="name" class="text text-name w-100 text-center {fontCondition ? 'font-condition' : ''}">{ name }</h1>
                <h1 class="text text-subtitle text-uppercase w-100 text-center mb-5 {fontCondition ? 'font-condition' : ''}">
                    İzmir Kemalpaşa Belediye Başkanı Sayın Arif UĞURLU’nun Size Bir Mesajı Var!
                </h1>
                <button type="button" class="btn px-0 py-0 mb-3 d-flex align-items-center" id="next1" 
                on:click={() => {
                    showNextSection('section1', 'section2');
                    saveAnswerToDb('video-open');
                    }}>
                    <i class='bx bx-play text-white p-2' style="
                        background-color: red;
                        border-radius: 50%;
                        outline: 1px solid red;
                        font-size: 6vw;"></i>
                    <span class="text text-uppercase ps-3 pe-4" style="font-size: 6vw;">İzlemek İstiyorum</span>
                </button>
            </div>
        </div> 
        <!-- Section 2 -->
        <div id="section2" class="video-container section h-100 {videoContainerWidth ? 'video-container-width' : ''}" style="display: none;">
            <video id="video-intro" class="w-75" autoplay muted controls
            on:play={() => saveAnswerToDb('video-played')}
            on:ended={() => { 
                showNextSection('section2', 'section3');
                saveAnswerToDb('video-ended');}}>
                <source src="./media/video.mp4" type="video/mp4">
            </video>
        </div>
        <!-- Section 3 -->
        <div id="section3" class="section h-100 p-4" style="display: none;">
            <div class="mb-5 h-100 d-flex flex-column align-items-center justify-content-start">
                <h1 class="text text-title w-100 text-center {fontCondition ? 'font-condition' : ''}">TÜRKİYE İÇİN</h1>
                <h1 class="text text-title w-100 text-center {fontCondition ? 'font-condition' : ''}">HIZ KESMEDEN</h1>
                <h1 class="text text-title w-100 text-center mb-5 {fontCondition ? 'font-condition' : ''}">DEVAM</h1>
                <button type="button" class="option px-3" id="next2-yes"
                    style="margin-bottom: 2.5rem;" 
                    on:click={() => {
                    showNextSection('section3', 'section4');
                    saveAnswerToDb('Option 1');}}>
                    <span style="
                        font-size: 9vw;
                        font-family: 'Gilroy-Black', sans-serif !important;
                        font-weight: 800 !important;">
                        EVET</span>
                    <span style="font-size: 5vw;">
                        BİLİYORUM
                    </span>
                    <i class='bx bx-chevron-right' style="color: red; font-size: 9vw; position: absolute; right: 2%; top: 17%;"></i>
                </button>
                <button type="button" class="mb-2 option mb-4 px-3" id="next2-yes" 
                    on:click={() => {
                    showNextSection('section3', 'section5');
                    saveAnswerToDb('Option 2');}}>
                    <span style="
                        font-size: 9vw;
                        font-family: 'Gilroy-Black', sans-serif !important;
                        font-weight: 800 !important;">
                        HAYIR</span>
                    <span style="font-size: 5vw;">
                        BİLMİYORUM
                    </span>
                    <i class='bx bx-chevron-right' style="color: red; font-size: 9vw; position: absolute; right: 2%; top: 17%;"></i>
                </button>
            </div>
        </div>
        <!-- Section 4 -->
        <div id="section4" class="video-container section h-100 {videoContainerWidth ? 'video-container-width' : ''}" style="display: none;">
            <video id="video-yes" class="w-100" autoplay muted controls
            on:play={() => saveAnswerToDb('video-yes-started')}
            on:ended={() => {
                showNextSection('section4', 'section6');
                saveAnswerToDb('video-yes-ended');}}>
                <source src="./media/video.mp4" type="video/mp4">
            </video>
        </div>
        <!-- Section 5 -->
        <div id="section5" class="video-container section h-100 {videoContainerWidth ? 'video-container-width' : ''}" style="display: none;">
            <video id="video-no" class="w-100" autoplay muted controls 
            on:play={() => saveAnswerToDb('video-no-started')}
            on:ended={() => {
                showNextSection('section5', 'section6');
                saveAnswerToDb('video-no-ended');}}>
                <source src="./media/video.mp4" type="video/mp4">
            </video>
        </div>
        <!-- Section 6 -->
        <div id="section6" class="section h-100 p-4" style="display: none;">
            <div class="mb-5 h-100 d-flex flex-column align-items-center justify-content-center">
                <h1 class="text text-title w-100 text-center {fontCondition ? 'font-condition' : ''}">Katılımınız İçin</h1>
                <h1 class="text text-title w-100 text-center {fontCondition ? 'font-condition' : ''}">Teşekkür Ederiz</h1>
                {#if !id || !campaignId || !name || !company}
                <div class="w-100 d-flex justify-content-end">
                    <button type="button" class="btn rounded-circle border p-0" id="next3" style="position: absolute; bottom: 25px; right: 25px;" on:click={() => showNextSection('section6', 'section1')}>
                        <i class='bx bx-refresh text-white p-2' style="
                        background-color: red;
                        border-radius: 50%;
                        outline: 1px solid red;
                        font-size: 6vw;"></i>
                    </button>
                </div>
                {/if}
            </div>
        </div>  
    </form>
</main>