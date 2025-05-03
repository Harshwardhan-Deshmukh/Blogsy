import { lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router"
const Signup = lazy(() => import("./pages/Signup"))
const Signin = lazy(() => import("./pages/Signin"))
const Blog = lazy(() => import("./pages/Blog"))

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
