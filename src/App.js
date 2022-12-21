import { BrowserRouter } from "react-router-dom";
import './global.css';
import './admin.css';
import "swiper/css/bundle";
import RoutePath from "./routes/RoutePath";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'/>
      <link href="//db.onlinewebfonts.com/c/22f912b4b10a938d5f28b7fe79ed7466?family=CamphorW01-Regular" rel="stylesheet" type="text/css"/>
      <link href="//db.onlinewebfonts.com/c/032d6b2c34344e22d2cbca6b7050d642?family=Eina01-SemiBold" rel="stylesheet" type="text/css"/>
      <link href="//db.onlinewebfonts.com/c/2d57f676e3d6955778fb8acac0176b9a?family=Eina01-Bold" rel="stylesheet" type="text/css"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>
      <link rel="stylesheet" href="https://cdn.lineicons.com/3.0/lineicons.css"></link>
      <RoutePath/>

    </BrowserRouter>
  );
}

export default App;
