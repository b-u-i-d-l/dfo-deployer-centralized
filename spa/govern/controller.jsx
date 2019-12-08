var GovernController = function(view) {
    var context = this;
    context.view = view;

    context.loadSurveys = async function loadSurveys() {
        var allSurveys = await blockchainCall(context.view.props.dFO.Proposal({}, {fromBlock: 0}));
        allSurveys = Enumerable.From(allSurveys).Select(it => ({proposal: it.args.proposal, block: it.blockNumber})).ToArray();
        var surveys = [];
        for(var i in allSurveys) {
            var data = await context.loadSurvey(allSurveys[i]);
            data && surveys.push(data);
        }
        var terminatedSurveys = [];
        var currentBlock = await blockchainCall(window.web3.eth.getBlockNumber);
        surveys = Enumerable.From(surveys);
        surveys.Where(it => it.endBlock < currentBlock && it.terminated).ForEach(it => terminatedSurveys.push(it));
        surveys = surveys.Where(it => it.endBlock >= currentBlock || !it.terminated).OrderBy(it => it.startBlock).ToArray();
        terminatedSurveys = Enumerable.From(terminatedSurveys).Where(it => it.endBlock < currentBlock).OrderByDescending(it => it.endBlock).ToArray();
        return {surveys, terminatedSurveys, currentBlock};
    };

    context.loadSurvey = async function loadSurvey(survey) {
        try {
            var data = await blockchainCall(window.web3.eth.contract(window.context.propsalAbi).at(survey.proposal).toJSON);
            data = JSON.parse(data);
            data.address = survey.proposal;
            data.startBlock = survey.block;
            return data;
        } catch(e) {
            console.error(e);
        }
    };

    context.vote = async function vote(survey, type, amount) {
        var contract = web3.eth.contract(window.context.propsalAbi).at(survey.address);
        context.view.emit('loader/toggle');
        context.view.emit('message', 'Voting...');
        await waitForReceipt(await blockchainCall(contract[type], amount));
        context.view.emit('message', 'Vote sent!');
        context.view.emit('loader/toggle');
        setTimeout(context.loadSurveys);
    };

    context.terminate = async function set(survey) {
        context.view.emit('loader/toggle');
        context.view.emit('message', 'Finalizing Survey...');
        await waitForReceipt(await blockchainCall(web3.eth.contract(window.context.propsalAbi).at(survey.address).terminate));
        context.view.emit('message', 'Survey Finalized! Enjoy Your Brand new Functionalities!');
        context.view.emit('loader/toggle');
        setTimeout(context.loadSurveys);
    };
};