import React from "react";
import "./jauge.css";

interface JaugeLinéaireProps {
    percentage: number;
}

const JaugeLinéaire: React.FC<JaugeLinéaireProps> = ({ percentage }) => {

    return (
        <div className="jauge-linéaire-container">
            <svg width="100%" height="100%">
                <line
                    x1={`${percentage}%`}
                    y1="0%"
                    x2={`${percentage}%`}
                    y2="100%"
                    className={percentage > 0 ? "jauge-positive" : "jauge-negative"}
                />
            </svg>
        </div>
    );
};

export default JaugeLinéaire;
