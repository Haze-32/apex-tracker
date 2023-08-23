// StatCheckboxes.js
const StatCheckboxes = ({ statKeys, selectedStats, handleToggle, activeLegend, showStats, toggleStat }) => (
    <div className="statCheckboxes">
        <div className="m-3">
            <h5>Lifetime Stats</h5>
            {statKeys.map(stat => (
                <div key={stat.key}>
                    <label className="me-1">{stat.displayName}</label>
                    <input
                        type="checkbox"
                        checked={selectedStats[stat.key] || false}
                        onChange={() => handleToggle(stat.key)}
                    />
                </div>
            ))}
        </div>
        <div className="m-3">
            <h5>Legend Specific Stats</h5>
            {Object.keys(activeLegend.stats).length === 0 ? (
                <div>No data for this legend yet</div>
            ) : (
                Object.keys(activeLegend.stats).map(statKey => (
                    <div key={statKey}>
                        <label className="me-1">{activeLegend.stats[statKey].displayName}</label>
                        <input
                            type="checkbox"
                            checked={showStats[statKey] || false}
                            onChange={() => toggleStat(statKey)}
                        />
                    </div>
                ))
            )}
        </div>
    </div>
);

export default StatCheckboxes;
