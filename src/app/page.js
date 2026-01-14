`use client`;
import Image from "next/image";
// import Navbar from "./Component/Navbar.jsx";
import HomeHeroSection from "./Component/HomeHeroSection.jsx";
import DealsOffers from "./Component/DealsOffers.jsx";
import {ItemsGroup,ItemsGroupElectronics} from "./Component/ItemsGroup.jsx";
import InquirySection from "./Component/InquirySection.jsx";
import RecommendedItems from "./Component/RecommendedItems.jsx";
import Card from "./Component/Card.jsx";
import FlagComponent from "./Component/FlagComponent.jsx";
import SecondLastComponentOnLandingPage from "./Component/SecondLastComponentOnLandingPage.jsx"
import Footer from "./Component/Footer.jsx";

export default function Home() {
  return (

    <>
  
   {/* <Navbar/> */}
   <HomeHeroSection/>
   <DealsOffers/>
   <ItemsGroup/>,
   <ItemsGroupElectronics/>
   <InquirySection/>
   <RecommendedItems/>
   <Card/>
   <FlagComponent/>
   <SecondLastComponentOnLandingPage/>
   {/* <Footer/> */}

    </>
    
  );
}
