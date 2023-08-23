// DisplayStats.js
import React from 'react';
import legendImages from './legendImages';

const DisplayStats = ({ platformUserId, statKeys, selectedStats, overviewSegment, activeLegend, showStats }) => {

    // Check if the activeLegend or its metadata is not loaded
    if (!activeLegend || !activeLegend.metadata) {
        return <div>Loading...</div>;
    }

    // Function to convert a camelCase string to a spaced string with the first letter capitalized
    const toCamelCaseWithSpace = (str) => {
        return str.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); });
    };

    // Reference to the specific image for the currently active legend
    const LegendIcon = legendImages[activeLegend.metadata.name];

    return (
        <div className="statsDispalyWrapper demoWrap">
            <div className="statBox lifeTimeStats">
                <div className="statTitleWrap">
                    <h2>{toCamelCaseWithSpace(platformUserId)}</h2>
                </div>
                {statKeys.map(stat => {
                    if (selectedStats[stat.key]) {
                        const statData = overviewSegment.stats[stat.key];
                        const metadata = statData.metadata;

                        return (
                            <div className="statRow" key={stat.key}>
                                <div className="statContent">
                                    <div>{toCamelCaseWithSpace(stat.key)}:</div>
                                    {metadata && metadata.rankName ? (
                                        <div className="rankStat">
                                            <div className="statContentValue">{metadata.rankName}</div>
                                            <img src={metadata.iconUrl} alt={metadata.rankName} />
                                        </div>
                                    ) : (
                                        <div className="statContentValue">{statData.displayValue}</div>
                                    )}
                                </div>
                                <div className="statRowBackground"></div>
                            </div>
                        );
                    }
                    return null;// Return null if the stat is not selected
                })}
                <div className="statBoxBackground"></div>
            </div>
            <br /><br />
            <div className="statBox legendStats">
                {activeLegend && activeLegend.metadata && (
                    <>
                        <div className="statTitleWrap">
                            <h2 className="legendTitle">
                                <LegendIcon fill="#fff" style={{ width: "75px" }} />
                                <div className="legendName">
                                    {activeLegend.metadata.name}<br />Stats
                                </div>
                            </h2>
                        </div>
                        {Object.keys(activeLegend.stats).map(statKey => (
                            showStats[statKey] &&
                            <div className="statRow" key={statKey}>
                                <div className="statContent">
                                    <div>
                                        {activeLegend.stats[statKey].displayName}:
                                    </div>
                                    <div className="statContentValue">
                                        {activeLegend.stats[statKey].displayValue}
                                    </div>
                                </div>
                                <div className="statRowBackground"></div>
                            </div>
                        ))}
                        <div className="statBoxBackground"></div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DisplayStats;
