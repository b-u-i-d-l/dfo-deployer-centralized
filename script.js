async function Boot() {
    if(!await enableMetamask()) {
        return;
    }
    choosePage();
}

async function enableMetamask() {
    if(typeof ethereum === 'undefined') {
        return alert('To use this application, you need to use Google Chrome of Firefox with Metamask Extension installed.');
    }
    try {
        await ethereum.enable();
        return true;
    } catch(e) {
        return alert('To use this application, you need to enable Metamask access.');
    }
}

function choosePage() {
    var page = undefined;
    try {
        page = window.location.pathname.split('/').join('').split('.html').join('');
    } catch(e) {
    }
    page = (page || 'index') + 'Main';

    try {
        var maybePromise = window[page] && window[page]();
        maybePromise && maybePromise.catch && maybePromise.catch(console.error);
    } catch(e) {
        console.error(e);
    }
}

async function loadDFO() {
    var address = document.getElementById('dfo-address').value;
    window.location.href = "/dfo.html?address=" + encodeURIComponent(address);
}

async function dfoMain() {
    var address = undefined;
    try {
        address = window.location.search.split('?address=').join('');
    } catch(e) {
    }
    if(!address) {
        alert('To proceed, you must provide a valid ethereum address');
        setTimeout(() => window.location.href = '/');
    }
}

function deploy() {
    messages();
    var data = getData();
    var errors = [];
    !data.dfoName && errors.push('DFO Name is mandatory');
    !data.tokenSymbol && errors.push('Token Symbol is mandatory');
    data.tokenDecimals < 1 && errors.push('Token decimals must be a number greater than 1');
    data.tokenTotalSupply < 1 && errors.push('Token total supply must be a number greater than 1');
    data.surveyLength < 1 && errors.push('Survey Length must be a number greater than 1');
    !data.surveyValidationRulesAddress && errors.push('Survey Validation Rules Address is mandatory and must be a valid ethereum address');
    if(errors.length > 0) {
        return messages('Some errors occurred:<br/><br/>- ' + errors.join('<br/>- '));
    }
    
}

function getData() {
    var data = {};
    var inputs = document.getElementsByTagName('input');
    for(var i in inputs) {
        var input = inputs[i];
        if(input.type !== 'text' && input.type !== 'number') {
            continue;
        }
        data[input.id] = input.value.split(' ').join('');
        input.type === 'number' && (data[input.id] = parseInt(data[input.id]));
        input.type === 'number' && isNaN(data[input.id]) && (data[input.id] = 1);
    }
    return data;
}

function messages(message) {
    setTimeout(() => document.getElementById('messages').innerHTML = message || '');
}

window.onload = function() {
    Boot().catch(console.error);
}