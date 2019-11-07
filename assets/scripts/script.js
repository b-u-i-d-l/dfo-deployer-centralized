async function Main() {
    if (!await enableMetamask()) {
        return;
    }
    await loadContext();
    window.abi = ethers.utils.defaultAbiCoder;
    choosePage();
}

async function enableMetamask() {
    if (typeof window.ethereum === 'undefined') {
        throw 'To use this application, you need Metamask Extension installed.';
    }
    try {
        await window.ethereum.enable();
        window.ethereum.autoRefreshOnNetworkChange && (window.ethereum.autoRefreshOnNetworkChange = false);
        window.ethereum.on && window.ethereum.on('networkChanged', onMetamaskUpdate);
        window.ethereum.on && window.ethereum.on('accountsChanged', onMetamaskUpdate);
        return true;
    } catch (e) {
        throw 'To use this application, you need to enable Metamask.';
    }
}

function onMetamaskUpdate() {
    setTimeout(function() {
        if (window.web3.currentProvider.chainId !== '0x1' && window.web3.currentProvider.chainId !== '0x3') {
            return alert("Actually we only support Mainnet and Ropsten.");
        }
        $.publish('metamask/update');
    });
}

function getEtherscanURL() {
    return "https://" + (window.web3.currentProvider.chainId === '0x3' ? 'ropsten.' : '') + "etherscan.io/";
}

function isEthereumAddress(ad) {
    if (ad === undefined || ad === null) {
        return false;
    }
    var address = ad.split(' ').join('');
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        return true;
    } else {
        address = address.replace('0x', '');
        var addressHash = window.web3.sha3(address.toLowerCase());
        for (var i = 0; i < 40; i++) {
            if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
                //return false;
            }
        }
    }
    return true;
}

async function loadContext() {
    var x = await fetch('data/context.json');
    window.context = await x.text();
    window.context = JSON.parse(window.context);
}

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

function indexMain() {
    Boot();
}

async function demoMain() {
    var address = '';
    try {
        address = window.location.search.split(' ').join('').split('/').join('').split('?addr=').join('');
    } catch(e) {
    }
    if(!isEthereumAddress(address)) {
        alert('You must provide a valid ethereum address');
        window.location.href = "/";
        return;
    }
    window.address = address;
    window.dFO = window.web3.eth.contract(window.context.mvdAbi).at(address);
    try {
        var amount = (await blockchainCall(window.dFO.getFunctionalitiesAmount)).toNumber();
        if(amount === 0) {
            throw "Bad address"
        }
    } catch(e) {
        alert('You must provide the ethereum address of a valid DFO');
        window.location.href = "/";
        return;
    }
    var interval = async function() {
        var _element = document.getElementById('bodyStyle');
        var data = '';
        try {
            data = await window.blockchainCall(window.dFO.read, 'bodyStyle', '0x0');
            data = window.abi.decode(['string'], data)[0];
        } catch(e) {
            console.log(e);
        }
        _element.innerHTML = data;
    };
    setInterval(interval, 7000);
    interval();
}

function getData(root) {
    var data = {};
    root.children().find('input,select').each(function(i, input) {
        input.type && input.type !== 'checkbox' && (data[input.id] = input.value.split(' ').join(''));
        input.type === 'number' && (data[input.id] = parseInt(data[input.id]));
        input.type === 'number' && isNaN(data[input.id]) && (data[input.id] = 1);
        input.type === 'checkbox' && (data[input.id] = input.checked);
        !input.type && (data[input.id] = $(input).val());
    });
    return data;
}

function createContract(abi, bin) {
    var args = [];
    args.push(window.web3.eth.contract(abi));
    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
    }
    args.push({
        from: window.web3.eth.accounts[0],
        data: bin,
        gas: '8000000'
    });
    return blockchainCall.apply(null, args);
}

async function loadFunctionalities(dFO) {
    //var functionalitiesAmount = await blockchainCall(dFO.getFunctionalitiesAmount).toNumber();
    var functionalities = await blockchainCall(dFO.functionalitiesToJSON);
    functionalities = JSON.parse(functionalities);
    for(var i in functionalities) {
        var functionality = functionalities[i];
        functionality.inputParameters = [];
        try {
            functionality.inputParameters = functionality.methodSignature.split(functionality.methodSignature.substring(0, functionality.methodSignature.indexOf('(') + 1)).join('').split(')').join('');
            functionality.inputParameters = functionality.inputParameters ? functionality.inputParameters.split(',') : [];
        } catch(e) {
        }
    }
    return functionalities;
};

function blockchainCall(call) {
    var _call = call;
    var args = [];
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
    }
    return new Promise(function(ok, ko) {
        args.push(async function(e, data) {
            try {
                if (e) {
                    return ko(e);
                }
                if (data && data.transactionHash && !data.blockNumber) {
                    return ok(_call.at((await waitForReceipt(data.transactionHash)).contractAddress));
                }
                return ok(data);
            } catch (e) {
                return ko(e);
            }
        });
        (call.implementation ? call.get : call.new ? call.new : call).apply(call, args);
    });
}

function waitForReceipt(transactionHash) {
    return new Promise(function(ok, ko) {
        var callback = async function() {
            try {
                var transactionReceipt = await blockchainCall(web3.eth.getTransactionReceipt, transactionHash);
                if (transactionReceipt) {
                    return ok(transactionReceipt);
                }
            } catch (e) {
                return ko(e);
            }
            setTimeout(callback, 5000);
        }
        callback();
    });
}

function decodeAbiParameters(parameters, data) {
    if(!parameters || parameters.length === 0) {
        return data;
    }
    data = window.abi.decode(parameters, data);
    data = (data.length || data.__length__) === 1 ? data[0].toNumber ? data[0].toNumber() : data[0] : data;
    if(data.length) {
        for(var i in data) {
            var elem = data[i];
            data[i] = elem.toNumber ? elem.toNumber() : elem;
        }
    }
    if(data.__length__) {
        var keys = Object.keys(data);
        for(var i in keys) {
            if(isNaN(keys[i])) {
                continue;
            }
            var elem = data[keys[i]];
            data[keys[i]] = elem.toNumber ? elem.toNumber() : elem;
        }
    }
    return data;
}

window.onload = function() {
    Main().catch(function(e) {
        return alert(e.message || e);
    });
}