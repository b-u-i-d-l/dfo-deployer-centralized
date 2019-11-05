async function Main() {
    if (!await enableMetamask()) {
        return;
    }
    await loadContext();
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
    return JSON.parse(functionalities);
};

function blockchainCall(call) {
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
                    return ok(args[0].at((await waitForReceipt(data.transactionHash)).contractAddress));
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
            setTimeout(callback, 15000);
        }
        callback();
    });
}