import React, { useState } from "react";
import { Feature } from "../../Components/Feature/Feature";
import { Start } from "../../Components/Start/Start";
import { Team } from "../../Components/Team/Team";
import { Trust } from "../../Components/Trust/Trust";
import { Ask } from "../../Components/Ask/Ask";
import { Info } from "../../Components/Info/Info";
import { Details } from "../../Components/Details/Details";

export const Featurepage = () => {
    return (
        <div>
            <Feature/>
            <Trust />
            <Team />
            <Details/>
            <Info/>
            <Ask/>
            <Start />
        </div>
    );
};
