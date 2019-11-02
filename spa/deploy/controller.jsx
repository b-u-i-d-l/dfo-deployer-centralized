var DeployController = function (view) {
    var context = this;
    context.view = view;

    context.deploy = async function deploy(data) {
        context.view.emit('message');
        var errors = [];
        !data.dfoName && errors.push('DFO Name is mandatory');
        !data.tokenSymbol && errors.push('Token Symbol is mandatory');
        data.tokenDecimals < 1 && errors.push('Token decimals must be a number greater than 1');
        data.tokenTotalSupply < 1 && errors.push('Token total supply must be a number greater than 1');
        data.surveyLength < 1 && errors.push('Survey Length must be a number greater than 1');
        !data.surveyValidationRulesAddress && errors.push('Survey Validation Rules Address is mandatory and must be a valid ethereum address');
        if (errors.length > 0) {
            throw errors;
        }
        context.view.emit('message', 'Transaction 1 of 3 - Creating MVD Functionality Proposal Factory...', 'info');
        var mvdFunctionalityProposalFactory = await createContract(window.context.mvdFunctionalityProposalFactoryAbi, window.context.mvdFunctionalityProposalFactoryBin);
        context.view.emit('message', 'Transaction 2 of 3 - Creating Survey Block Length...', 'info');
        var mvdBlockLengthProvider = await createContract(window.context.mvdBlockLengthProviderAbi, window.context.mvdBlockLengthProviderBin, data.surveyLength);
        context.view.emit('message', 'Transaction 3 of 3 - Creating Your DFO...', 'info');
        return await createContract(window.context.mvdAbi, window.context.mvdBin,
            data.dfoName,
            data.tokenSymbol,
            data.tokenDecimals,
            data.tokenTotalSupply,
            mvdFunctionalityProposalFactory.address,
            mvdBlockLengthProvider.address,
            data.surveyValidationRulesAddress
        );
    };
};