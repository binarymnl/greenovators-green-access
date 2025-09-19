import React from "react";

function SummaryTiles() {
  const mock = { kWhSaved: 125.5, co2Avoided: 92.3, ecoPointsIssued: 540 };
  return (
    <div>
      <h2>KPI Summary</h2>
      <p>kWh Saved: {mock.kWhSaved}</p>
      <p>CO₂ Avoided: {mock.co2Avoided}</p>
      <p>EcoPoints: {mock.ecoPointsIssued}</p>
    </div>
  );
}

export default SummaryTiles;
