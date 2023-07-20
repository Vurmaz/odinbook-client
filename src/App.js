import React from "react";
import { Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@emotion/react";
import { theme } from "./assets/theme";
import LoginPage from "./pages/Login";
import Register from "./components/auth/Register";
import Friends from "./pages/Friends";
import TimelinePage from "./pages/Timeline";
import ProtectedRoute from "./components/ProtectedRoute";
import UnAuthRoute from "./components/UnAuthRoute";
import Profile from "./pages/Profile";
import Image from "./pages/Image";
import Error from "./components/Error";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

function App() { 
  const queryClient = new QueryClient()

  return(
    <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Routes>
          <Route path="register" element={<UnAuthRoute><Register /></UnAuthRoute>}/>
          <Route path="login" element={<UnAuthRoute><LoginPage /></UnAuthRoute>} />
          <Route 
            path="friends/:id" 
            element={
              <ProtectedRoute>
                <Friends />
              </ProtectedRoute>
            } 
            />
          <Route path="profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='timeline' element={<ProtectedRoute ><TimelinePage /></ProtectedRoute> } />
          <Route path='image/:id' element={<ProtectedRoute><Image /></ProtectedRoute>} />         
        <Route path='*' element={<Error />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} position={"bottom-left"} />
    </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App;
