import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import { Suspense, useEffect } from "react";
import { routes } from "./routes";
import HeaderTop from "./components/header-top/HeaderTop";
import Header from "./components/header/Header";
import ContextProvider from "./Context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./assets/1x/Asset 3.png"
import RedirectOnManual from "./components/redirectPages/redirectPages";
import ScrollTop from "./components/scrollTop/ScrollTop";
import NotFound from "./pages/not-found/NotFound";
import BottomFix from "./components/bottom-fix/BottomFix";
import ProtectedRoute from "./route/ProtectRoute";
import Loader from "./components/loader/Loader";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgotPassEmail from "./pages/forgotPassEmail/ForgotPassEmail";
import HeaderBottom from "./components/Header_bottom/HeaderBottom";
import { initMetaPixel } from "./utils/metaPixel";

function App() {
  const location = useLocation();
  const hideHeaderRoutes = [
    "/login",
    "/register",
    "/signup",
    "/otp",
    "/register",
    "/forgotpassemail",
    "/ChangePassword",
    "/SendOtp",
  ];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);
  const validPaths = routes.map((r) => r.path);

  useEffect(()=>{
    initMetaPixel();
  },[]);

  
  // return (
  //   <>
  //     <div className="App">
  //       <ToastContainer />
  //       <ContextProvider>
  //         <ScrollTop />
  //         <Suspense fallback={<Loader />}>
  //           {!shouldHideHeader && <HeaderTop />}
  //           {!shouldHideHeader && <HeaderBottom/>}
  //           {!shouldHideHeader && <Header />}
  //           {/* <RedirectOnManual /> */}
  //           <Routes>
  //             {/* Public Routes */}
  //             <Route path="/login" element={<Login />} />
  //             <Route path="/register" element={<Register />} />
  //             <Route path="/forgotpassemail" element={<ForgotPassEmail />} />

  //             {/* Protected Routes */}
  //             {routes
  //               .filter((r) => !["/login", "/register","/forgotpassemail"].includes(r.path))
  //               .map((item, index) => (
  //                 <Route
  //                   key={index}
  //                   path={item.path}
  //                   element={
  //                     <ProtectedRoute validPaths={validPaths}>
  //                       <item.component />
  //                     </ProtectedRoute>
  //                   }
  //                 />
  //               ))}

  //             <Route path="/404" element={<NotFound />} />
  //             <Route path="*" element={<Navigate to="/404" replace />} />
  //           </Routes>
  //         </Suspense>
  //         {location.pathname !== "/search" && <BottomFix />}
  //       </ContextProvider>
  //     </div>
  //   </>
  // );

  return (
    <>
    
    <div className="App">
      <div class="content">
        <img src={logo} alt=""/>
       <p>
         Our Store is currently under maintenance. We apologize for the inconvenience. Please check back later.
       </p>
      </div>
      </div>
      </>
  )
}

export default App;
