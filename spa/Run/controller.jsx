var RunController = function(view) {
    var context = this;
    context.view = view;
    context.loadFunctionalities=async function loadFunctionalities(){
        var functionalities=await fetch("/data/mockFunctionalities.json");
        functionalities=await functionalities.text();
        functionalities=JSON.parse(functionalities);
        context.view.setState({functionalities});
    };
};