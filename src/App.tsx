import React from 'react'
import { BrowserRouter, Routes, Route,  } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Loading from './components/Loading'
const LatestSignupPage = React.lazy(() => import('./pages/LatestSignUpPage'))
const LatestSignin = React.lazy(() => import('./components/LatestSignin'))
const AuthorProfile = React.lazy(() => import('./components/user-profile/AuthorProfile'))
const BoltMainPage = React.lazy(() => import('./pages/BoltMainPage'))
const EditBlog = React.lazy(() => import('./components/EditBlog'))
const Blog = React.lazy(() => import('./pages/Blog'))
const TextEditor = React.lazy(() => import('./pages/WriteBlog'))
const UserProfileBolt = React.lazy(() => import('./components/user-profile/UserProfileBolt'))
const BoltLandingPage = React.lazy(() => import('./pages/BoltLandingPage'))

function App () {
  const token = localStorage.getItem('token')
 
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
        <Route
            path='/'
            element={<BoltLandingPage />}
          ></Route>
          <Route
            path='/signin'
            element={
              <React.Suspense fallback={ <div className=' bg-black  flex justify-center items-center'>
                <Loading  />
              </div>}>
                {token ? <BoltMainPage /> : <LatestSignin />}
              </React.Suspense>
            }
          ></Route>
          <Route
            path='/signup'
            element={
              <React.Suspense fallback={<div className=' bg-black  flex justify-center items-center'>
                <Loading  />
              </div>}>
                {token ? <BoltMainPage /> : <LatestSignupPage />}
              </React.Suspense>
            }
          ></Route>
         <Route
            path='/blogs'
            element={
              <React.Suspense fallback={<div className=' bg-black  flex justify-center items-center'>
                <Loading  />
              </div>}>
                <BoltMainPage />
              </React.Suspense>
            }
          ></Route>
          <Route
            path='/blog/:id'
            element={
              <React.Suspense fallback={<div className=' bg-black  flex justify-center items-center'>
                <Loading  />
              </div>}>
                <Blog /> 
                </React.Suspense>
            }
          ></Route>
          <Route
            path='/authorprofile'
            element={
              <React.Suspense fallback={<div className=' bg-black  flex justify-center items-center'>
                <Loading  />
              </div>}>
                <AuthorProfile />
              </React.Suspense>
            }
          ></Route>
          <Route
            path='/editblog/:id'
            element={
              <React.Suspense fallback={<div className=' bg-black  flex justify-center items-center'>
                <Loading  />
              </div>}>
                <EditBlog />
              </React.Suspense>
            }
          ></Route>
          <Route
            path='/publish'
            element={
              <React.Suspense fallback={<div className=' bg-black  flex justify-center items-center'>
                <Loading  />
              </div>}>
                <TextEditor />
              </React.Suspense>
            }
          ></Route>
          <Route
            path='/userprofile'
            element={
              <React.Suspense fallback={<div className=' bg-black  flex justify-center items-center'>
                <Loading  />
              </div>}>
                {<UserProfileBolt /> }
              </React.Suspense>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
