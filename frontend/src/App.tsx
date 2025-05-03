import { BrowserRouter, Route, Routes } from "react-router"
import { lazy, Suspense } from "react"
import { RecoilRoot } from "recoil"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
const Blog = lazy(() => import("./pages/Blog"));

function App() {

  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<Signup />} path="/signup" />
              <Route element={<Signin />} path="/signin" />
              <Route element={<Blog />} path="/blog/:id" />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  )
}

export default App
