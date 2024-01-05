var company = window.location.pathname.split('/')[1];
var campaign = window.location.pathname.split('/')[2];
var id = window.location.pathname.split('/')[3];
var company_id;
var campaign_id;

$(window).on("load", function() {

    getCompany(company, id).then(company => {
        company_id = company[0]._id;
        getCampaign(campaign, company_id).then(campaign => {
            campaign_id = campaign[0]._id;
        });
    });

    getUser(id).then(user => {
        $('#name').text(user.name);
    });

    //if video ends show next section
    $('#video').on('ended',function(){
        showNextSection('section2', 'section3');
    });

    //if user clicks yes button show next section
    $('#next2-yes').on('click', function() {
        saveAnswer('yes');
        showNextSection('section2', 'section3');
    });

    //if user clicks no button show next section
    $('#next2-no').on('click', function() {
        saveAnswer('no');
        showNextSection('section2', 'section3');
    });
});

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

function showNextSection(currentSectionId, nextSectionId) {
    console.log(currentSectionId, nextSectionId);
    $('#' + currentSectionId).hide();
    $('#' + nextSectionId).show();
}

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