async function Main() {
    if (!await enableMetamask()) {
        return;
    }
    await loadContext();
    choosePage();
}

async function enableMetamask() {
    if (typeof ethereum === 'undefined') {
        return alert('To use this application, you need to use Google Chrome of Firefox with Metamask Extension installed.');
    }
    try {
        await ethereum.enable();
        return true;
    } catch (e) {
        return alert('To use this application, you need to enable Metamask access.');
    }
}

async function loadContext() {
    var x = await fetch('./data/context.json');
    window.context = await x.text();
    window.context = JSON.parse(window.context);
};

function choosePage() {
    var page = undefined;
    try {
        page = window.location.pathname.split('/').join('').split('.html').join('');
    } catch (e) {}
    page = (page || 'index') + 'Main';

    try {
        var maybePromise = window[page] && window[page]();
        maybePromise && maybePromise.catch && maybePromise.catch(console.error);
    } catch (e) {
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
    } catch (e) {}
    if (!address) {
        alert('To proceed, you must provide a valid ethereum address');
        setTimeout(() => window.location.href = '/');
    }
}

function indexMain() {
    //document.getElementById('surveyValidationRulesAddress').value = context.surveyValidationRulesDefaultAddress;
    //document.getElementById('defaultSurveyValidationRulesAddress').href = 'https://ropsten.etherscan.io/address/' + context.surveyValidationRulesDefaultAddress + '#code';
}

async function deploy() {
    messages();
    var data = getData();
    var errors = [];
    !data.dfoName && errors.push('DFO Name is mandatory');
    !data.tokenSymbol && errors.push('Token Symbol is mandatory');
    data.tokenDecimals < 1 && errors.push('Token decimals must be a number greater than 1');
    data.tokenTotalSupply < 1 && errors.push('Token total supply must be a number greater than 1');
    data.surveyLength < 1 && errors.push('Survey Length must be a number greater than 1');
    !data.surveyValidationRulesAddress && errors.push('Survey Validation Rules Address is mandatory and must be a valid ethereum address');
    if (errors.length > 0) {
        return messages('Some errors occurred:<br/><br/>- ' + errors.join('<br/>- '));
    }
    try {
        messages('Transaction 1 of 3 - Creating MVD Functionality Proposal Factory...');
        var mvdFunctionalityProposalFactoryAddress = await createContract(context.mvdFunctionalityProposalFactoryAbi, context.mvdFunctionalityProposalFactoryBin);
        messages('Transaction 2 of 3 - Creating Survey Block Length...');
        var mvdBlockLengthProviderAddress = await createContract(context.mvdBlockLengthProviderAbi, context.mvdBlockLengthProviderBin, data.surveyLength);
        messages('Transaction 3 of 3 - Creating Your DFO...');
        var mvd = await createContract(context.mvdAbi, context.mvdBin,
            data.dfoName,
            data.tokenSymbol,
            data.tokenDecimals,
            data.tokenTotalSupply,
            mvdFunctionalityProposalFactoryAddress,
            mvdBlockLengthProviderAddress,
            data.surveyValidationRulesAddress
        );
        window.location.href = '/dfo.html?address=' + mvd;
    } catch (e) {
        console.error(e);
        return messages('ERROR:<br/><br/>' + e.message || e);
    }
}

function getData() {
    var data = {};
    var inputs = document.getElementsByTagName('input');
    for (var i in inputs) {
        var input = inputs[i];
        if (input.type !== 'text' && input.type !== 'number') {
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

function createContract(abi, bin) {
    var args = [];
    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
    }
    args.push({
        from: web3.eth.accounts[0],
        data: bin,
        gas: '8000000'
    });
    return new Promise(function(ok, ko) {
        args.push(function(e, contract) {
            (e || contract.address) && console.log(e, contract);
            if (e) {
                return ko(e);
            }
            if (typeof contract.address !== 'undefined') {
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                return ok(contract.address);
            }
        });
        var cnt = web3.eth.contract(abi);
        cnt.new.apply(cnt, args);
    });
}