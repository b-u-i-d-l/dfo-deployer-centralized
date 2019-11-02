async function Main() {
    if (!await enableMetamask()) {
        return;
    }
    await loadContext();
}

async function enableMetamask() {
    if (typeof ethereum === 'undefined') {
        return alert('To use this application, you need to use Google Chrome of Firefox with Metamask Extension installed.');
    }
    try {
        await ethereum.enable();
        ethereum.autoRefreshOnNetworkChange && (ethereum.autoRefreshOnNetworkChange = false);
        ethereum.on('networkChanged', onMetamaskUpdate);
        ethereum.on('accountsChanged', onMetamaskUpdate);
        return true;
    } catch (e) {
        return alert('To use this application, you need to enable Metamask access.');
    }
}

function onMetamaskUpdate() {
    setTimeout(function() {
        if(web3.currentProvider.chainId !== '0x1' && web3.currentProvider.chainId !== '0x3') {
            return alert("Actually we only support Mainnet and Ropsten, please set one of these networks");
        }
        $.publish('metamask/update');
    });
}

function getEtherscanURL() {
    return "https://" + (web3.currentProvider.chainId === '0x3' ? 'ropsten.' : '') + "etherscan.io/";
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
        var addressHash = web3.sha3(address.toLowerCase());
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
    root.children().find('input').each(function(i, input) {
        if (input.type !== 'text' && input.type !== 'number') {
            return;
        }
        data[input.id] = input.value.split(' ').join('');
        input.type === 'number' && (data[input.id] = parseInt(data[input.id]));
        input.type === 'number' && isNaN(data[input.id]) && (data[input.id] = 1);
    });
    return data;
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
                return ok(contract);
            }
        });
        var cnt = web3.eth.contract(abi);
        cnt.new.apply(cnt, args);
    });
}