var GovernController = function(view) {
    var context = this;
    context.view = view;

    context.loadSurveys = async function loadSurveys() {
        return window.context.mockFunctionalities;
        var allSurveys = await new Promise(function(ok, ko) {
            context.view.props.dFO.Proposal({}, {fromBlock: 0}).get(function(e, data) {
                if(e) {
                    return ko(e);
                }
                return ok(data);
            });
        });
        allSurveys = Enumerable.From(allSurveys).Select(it => it.args.proposal);
        var terminatedSurveys = await new Promise(function(ok, ko) {
            context.view.props.dFO.ProposalSet({}, {fromBlock: 0}).get(function(e, data) {
                if(e) {
                    return ko(e);
                }
                return ok(data);
            });
        });
        terminatedSurveys = Enumerable.From(terminatedSurveys).Select(it => it.args.proposal);
        allSurveys = allSurveys.Where(it => !terminatedSurveys.Contains(it)).ToArray();
        return allSurveys;
    };

    context.getSurveyData = async function getSurveyData(address) {
        var contract = web3.eth.contract(window.context.propsalAbi).at(address);

        return new Promise(function(ok, ko) {
            
        });
    }
};