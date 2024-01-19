<script>
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
</script>

<main class="{mainHeight ? 'main' : ''}">
    <form id="surveyForm">
        <!-- Section 1 -->
        <div id="section1" class="section h-100 p-4">
            <div class="mb-5 h-100 d-flex flex-column align-items-center justify-content-center">
                <h1 class="text text-title w-100 text-center {fontCondition ? 'font-condition' : ''}">BELEDİYE İŞİ</h1>
                <h1 class="text text-title w-100 text-center {fontCondition ? 'font-condition' : ''}">GÖNÜL İŞİ</h1>
                <h1 class="text text-subtitle w-100 text-left {fontCondition ? 'font-condition' : ''}">SAYIN;</h1>
                <h1 id="name" class="text text-name w-100 text-center {fontCondition ? 'font-condition' : ''}">{ name }</h1>
                <h1 class="text text-subtitle w-100 text-center mb-5 {fontCondition ? 'font-condition' : ''}">
                    İzmir Kemalpaşa Belediye Başkanı Sayın Arif UĞURLU’nun Size Bir Mesajı Var!
                </h1>
                <button type="button" class="w-75" id="next1" 
                on:click={() => {
                    showNextSection('section1', 'section2');
                    saveAnswerToDb('video-open');
                    }}>
                    İzlemek İstiyorum
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
                <source src="./Kampanya 2/video.mp4" type="video/mp4">
            </video>
        </div>
        <!-- Section 3 -->
        <div id="section3" class="section h-100 p-4" style="display: none;">
            <div class="mb-5 h-100 d-flex flex-column align-items-center justify-content-center">
                <h1 class="text text-title w-100 text-center {fontCondition ? 'font-condition' : ''}">TÜRKİYE İÇİN</h1>
                <h1 class="text text-title w-100 text-center {fontCondition ? 'font-condition' : ''}">HIZ KESMEDEN</h1>
                <h1 class="text text-title w-100 text-center mb-4 {fontCondition ? 'font-condition' : ''}">DEVAM</h1>
                <button type="button" class="w-75 mb-2" id="next2-yes" 
                on:click={() => {
                    showNextSection('section3', 'section4');
                    saveAnswerToDb('yes');}}>EVET</button>
                <button type="button" class="w-75" id="next2-no" on:click={() => {
                    showNextSection('section3', 'section5');
                    saveAnswerToDb('no');}}>HAYIR</button>
            </div>
        </div>
        <!-- Section 4 -->
        <div id="section4" class="video-container section h-100 {videoContainerWidth ? 'video-container-width' : ''}" style="display: none;">
            <video id="video-yes" class="w-100" autoplay muted controls
            on:play={() => saveAnswerToDb('video-yes-started')} 
            on:ended={() => {
                showNextSection('section4', 'section6');
                saveAnswerToDb('video-yes-ended');}}>
                <source src="./Kampanya 2/video.mp4" type="video/mp4">
            </video>
        </div>
        <!-- Section 5 -->
        <div id="section5" class="video-container section h-100 {videoContainerWidth ? 'video-container-width' : ''}" style="display: none;">
            <video id="video-no" class="w-100" autoplay muted controls 
            on:play={() => saveAnswerToDb('video-no-started')}
            on:ended={() => {
                showNextSection('section5', 'section6');
                saveAnswerToDb('video-no-ended');}}>
                <source src="./Kampanya 2/video.mp4" type="video/mp4">
            </video>
        </div>
        <!-- Section 6 -->
        <div id="section6" class="section h-100 p-4" style="display: none;">
            <div class="mb-5 h-100 d-flex flex-column align-items-center justify-content-center">
                <h1 class="text text-title w-100 text-center {fontCondition ? 'font-condition' : ''}">Katılımınız İçin</h1>
                <h1 class="text text-title w-100 text-center {fontCondition ? 'font-condition' : ''}">Teşekkür Ederiz</h1>
                {#if !id || !campaignId || !name || !company}
                    <button type="button" class="w-75" id="next3" style="position: absolute; bottom: 25px; right: 25px;" on:click={() => showNextSection('section6', 'section1')}>YENİDEN BAŞLAT</button>
                {/if}
            </div>
                
        </div>  
    </form>
</main>

<style>
    main {
        max-height: 100% !important;
    }

    form {
        height: 100%;
    }

    .text-title {
        font-size: 7vw;
        font-weight: 700 !important;
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
    
        /* Setting width & height to auto prevents the browser from stretching or squishing the video */
        width: auto;
        height: auto;
    
        /* Center the video */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .font-condition {
        font-size: 1rem !important;
    }
    .main {
        height: 60vh !important;
        max-width: 100% !important;
    }
</style>