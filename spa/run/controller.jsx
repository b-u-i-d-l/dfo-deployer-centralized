var RunController = function(view) {
    var context = this;
    context.view = view;

    context.limit = 8;

    context.loadFunctionalities = async function loadFunctionalities() {
        var functionalitiesAmount = await new Promise(function(ok, ko) {
            context.view.props.dFO.getFunctionalitiesAmount(function(e, data) {
                if(e) {
                    return ko(e.message || e);
                }
                return ok(data.toNumber());
            });
        });
        var functionalities = await new Promise(function(ok, ko) {
            context.view.props.dFO.functionalitiesToJSON(function(e, data) {
                if(e) {
                    return ko(e.message || e);
                }
                return ok(data);
            });
        });
        functionalities = JSON.parse(functionalities);
        context.view.setState({functionalities});
    };
};