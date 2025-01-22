
import { Navbar } from '../../Components/Navbar/Navbar';
import { Home } from '../../Components/Home/Home';
import { Trust } from '../../Components/Trust/Trust';
import { Offer } from '../../Components/Offer/Offer';
import { Link } from '../../Components/Link/Link';
import { Track } from '../../Components/Track/Track';
import { Flexible } from '../../Components/Flexible/Flexible';
import { Ask } from '../../Components/Ask/Ask';
import { Start } from '../../Components/Start/Start';
import { Footer } from '../../Components/Footer/Footer';
import { Container } from "@chakra-ui/react"

export const HomePage = () => {
    return(
            <>
          <Home/>
          <Trust/>
          <Offer/>
          <Link/>
          <Track/>
          <Flexible/>
          <Ask/>
          <Start/>
          </>
      
    )
  }
