import { Footer } from "../../Components/Footer/Footer"
import { Partners } from "../../Components/Partner/Partner"
import { Navbar } from "../../Components/Navbar/Navbar"
import { Start } from "../../Components/Start/Start"
import { Team } from "../../Components/Team/Team"
import { Trust } from "../../Components/Trust/Trust"
import { Flexible } from '../../Components/Flexible/Flexible';
import { Compare } from "../../Components/Compare/Compare"



export const Partnerpage = () => {
    return(
        <>
        <div>
            
            <Partners/>
            <Trust/>
            <Flexible/>
            <Start/>
            <Compare/>
        </div>
        </>
    )
}