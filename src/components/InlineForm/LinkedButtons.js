
const LinkedButtons = () => {
    
    return(
        <div className="linked-button-grid">
            <button 
                className="swap-form-button" 
                onClick={() => window.open("https://app.smartsheet.com/b/form/20d18963576e477bafcbf102df2aec3d", "_blank", "noreferrer")}
            >
                Swap Form
            </button>
            <button 
                className="roster-button" 
                onClick={() => window.open("https://www.momentumserviceslondon.com/activite", "_blank", "noreferrer")}
            >
                Roster
            </button>
            <button 
                className="tutorial-button" 
                onClick={() => window.open("https://youtu.be/lGQ-xiyTrCk", "_blank", "noreferrer")}
            >
                Tutorial
            </button>
        </div>
    );
};

export default LinkedButtons;