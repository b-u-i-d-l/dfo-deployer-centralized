var Index = React.createClass({
    requiredModules:[
        'spa/DFORule'
    ],
    render() {
        return (
            <div className="Main">
                <article className="MainAwesome">
                    <figure>
                        <div className="GIFY"><iframe src="https://giphy.com/embed/cPHYguVPkcXBIM5tpX" width="100%" height="100%" style={{"position":"absolute"}} frameBorder="0" className="giphy-embed" allowFullScreen></iframe></div>
                    </figure>
                    <div className="MainLoad">
                       <input id="dfo-address" placeholder="Enter your ethereum address here..." /> 
                       <button type="button" onclick="loadDFO();">Load</button>
                    </div>
                </article>
                <section className="Nav">
                    <DFORule/>
                </section>
            </div>
        );
    }
});