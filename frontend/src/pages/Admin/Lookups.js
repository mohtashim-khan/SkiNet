import React, { useState, useEffect } from "react";
import "./Lookups.css";
import JacketBrandLookup from "./JacketBrandLookup.js";
import JacketSizeLookup from "./JacketSizeLookup.js";
import AwardLookup from "./AwardLookup.js";
import DisciplineLookup from "./DisciplineLookup.js";
import SeasonLookup from "./SeasonLookup.js";
import OperationalEventLookup from "./OperationalEventLookup";
import ConditionsLookup from "./ConditionsLookup";



const AdminLookupsPage = ({ session }) => {
  return (
    <>
      <div class="container">
        <div class="row">
          <JacketBrandLookup session={session} />
          <AwardLookup session={session} />
          <DisciplineLookup session={session} />
        </div>

        <div class="row">
          <SeasonLookup session={session} />
          <JacketSizeLookup session={session} />
          <OperationalEventLookup session={session} />
        </div>

        <div class="row">
          <ConditionsLookup session={session} />
        </div>
      </div>
    </>
  );
};

export default AdminLookupsPage;
