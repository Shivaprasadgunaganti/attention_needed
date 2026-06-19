


// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import LoginPage from "./pages/LoginPage";
// import DashboardPage from "./pages/DashboardPage";

// import ProtectedRoute from "./routes/ProtectedRoute";

// import { AuthProvider } from "./context/AuthContext";

// function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <ProtectedRoute>
//                 <DashboardPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/login"
//             element={<LoginPage />}
//           />
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import AppRoutes from "./routes/AppRoutes";

import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AppRoutes />
              </ProtectedRoute>
            }
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;