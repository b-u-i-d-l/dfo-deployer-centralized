var GovernController = function(view) {
    var context = this;
    context.view = view;

    context.loadSurveys = async function loadSurveys() {
        var allSurveys = await blockchainCall(context.view.props.dFO.Proposal({}, {fromBlock: 0}));
        allSurveys = Enumerable.From(allSurveys).Select(it => ({proposal: it.args.proposal, block: it.blockNumber}));
        var terminatedSurveyAddresses = await blockchainCall(context.view.props.dFO.ProposalSet({}, {fromBlock: 0}));
        terminatedSurveyAddresses = Enumerable.From(terminatedSurveyAddresses).Select(it => ({proposal: it.args.proposal, block: it.blockNumber}));
        allSurveys = allSurveys.Where(it => !terminatedSurveyAddresses.Any(elem => it.proposal === elem.proposal)).ToArray();
        var surveys = [];
        for(var i in allSurveys) {
            surveys.push(await context.loadSurvey(allSurveys[i]));
        }
        terminatedSurveyAddresses = terminatedSurveyAddresses.ToArray();
        var terminatedSurveys = [];
        for(var i in terminatedSurveyAddresses) {
            terminatedSurveys.push(await context.loadSurvey(terminatedSurveyAddresses[i]));
        }
        var currentBlock = await blockchainCall(window.web3.eth.getBlockNumber);
        surveys = Enumerable.From(surveys);
        surveys.Where(it => it.endBlock < currentBlock).ForEach(it => terminatedSurveys.push(it));
        surveys = surveys.Where(it => it.endBlock >= currentBlock).OrderBy(it => it.startBlock).ToArray();
        terminatedSurveys = Enumerable.From(terminatedSurveys).Where(it => it.endBlock < currentBlock).OrderBy(it => it.startBlock).ToArray();
        return {surveys, terminatedSurveys, currentBlock};
    };

    context.loadSurvey = async function loadSurvey(survey) {
        var data = await blockchainCall(window.web3.eth.contract(window.context.propsalAbi).at(survey.proposal).toJSON);
        data = JSON.parse(data);
        data.address = survey.proposal;
        data.startBlock = survey.block;
        return data;
    };
};