var company = window.location.pathname.split('/')[1];
var campaign = window.location.pathname.split('/')[2];
var id = window.location.pathname.split('/')[3];
var company_id;
var campaign_id;

$(window).on("load", function() {

    // Get user data
    getUser(id).then(user => {
        $('#name').text(user.name);
    });

    // Get company, campaign
    getCompany(company, id).then(company => {
        company_id = company[0]._id;
        getCampaign(campaign, company_id).then(campaign => {
            campaign_id = campaign[0]._id;
            // Save user opened page
            saveAnswer('page-opened');
        });
    });

    // If user clicks on next1 button show next section and save answer
    $('#next1').on('click', function() {
        saveAnswer('video-open');
        showNextSection('section1', 'section2');
    });


    // If video starts playing at the first time, save answer
    let videoIntroPlayed = false;
    $('#video-intro').on('play', function() {
        if (!videoIntroPlayed) {
            videoIntroPlayed = true;
            saveAnswer('video-played');
        }
    });

    // If video ends show next section and save answer
    $('#video-intro').on('ended', function() {
        console.log('Video ended');
        showNextSection('section2', 'section3');
        saveAnswer('video-ended');
    });

    //if user clicks yes or no button show next section and save answer
    $('#next2-yes').on('click', function() {
        showNextSection('section2', 'section3');
        saveAnswer('yes');
    });

    $('#next2-no').on('click', function() {
        showNextSection('section2', 'section3');
        saveAnswer('no');
    });

    // If video yes starts
    $('#video-yes').on('play', function() {
        saveAnswer('video-yes-started');
    });

    // If video yes ends
    $('#video-yes').on('ended',function(){
        saveAnswer('video-yes-ended');
    });

    // If video no starts
    $('#video-no').on('play', function() {
        saveAnswer('video-no-started');
    });

    // If video no ends
    $('#video-no').on('ended',function(){
        saveAnswer('video-no-ended');
    });
});

// Get company data
async function getCompany(company, id) {
    try {
        const data = await $.ajax({
            url: '/companiesbyname/' + company + '?id=' + id,
            method: 'GET',
        });
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching company data:', error);
        throw error;
    }
}

// Get campaign data
async function getCampaign(campaign, company) {
    try {
        const data = await $.ajax({
            url: '/campaignsbyname/' + campaign + '?company=' + company,
            method: 'GET'
        });
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching campaign data:', error);
        throw error;
    }
}

// Get user data
async function getUser(id) {
    try {
        const data = await $.ajax({
            url: '/target-users/' + id,
            method: 'GET'
        });
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

// Show next section
function showNextSection(currentSectionId, nextSectionId) {
    console.log(currentSectionId, nextSectionId);
    $('#' + currentSectionId).hide();
    $('#' + nextSectionId).show();

    if (nextSectionId === 'section2') {
        $('#video-intro').get(0).play();
    }
}

// Save answer
async function saveAnswer(answer) {
    try {
        const data = await $.ajax({
            url: '/answer' + '?id=' + id + '&company=' + company_id + '&campaign=' + campaign_id + '&answer=' + answer,
            method: 'POST',
        });
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error saving answer:', error);
        throw error;
    }
}