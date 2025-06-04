import { Routes, Route } from "react-router"
import { Home } from "./pages/Home"
import { Navbar } from "./components/Navbar"
import { CreatePostPage } from "./pages/CreatePostPage"
import { PostPage } from "./pages/PostPage"
import { CreateCommunityPage } from "./pages/CreateCommunityPage"
import { CommunitiesPage } from "./pages/CommunitiesPage"
import { CommunityPage } from "./pages/CommunityPage"

function App() {
  
  return (
    <>
      <div className="min-h-screen bg-black text-gray-100 transition-opacity duration-700 pt-20">
        <Navbar/>
        <div >
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create-post" element={<CreatePostPage/>} />
          <Route path="/post/:postId" element={<PostPage/>} />
          <Route path="/community/create" element={<CreateCommunityPage/>} />
          <Route path="/communities" element={<CommunitiesPage/>} />
          <Route path="/community/:communityId" element={<CommunityPage/>} />
        </Routes>
        </div>
      </div>
    </>
  )
}

export default App
