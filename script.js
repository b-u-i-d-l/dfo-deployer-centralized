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
    console.table(data);
}

function getData() {
    var data = {};
    var inputs = document.getElementsByTagName('input');
    for(var i in inputs) {
        var input = inputs[i];
        if(input.type !== 'text' && input.type !== 'number') {
            continue;
        }
        data[input.id] = input.value;
    }
    return data;
}

function messages(message) {
    setTimeout(() => document.getElementById('messages').innerHTML = message || '');
}

window.onload = function() {
    Boot().catch(console.error);
}