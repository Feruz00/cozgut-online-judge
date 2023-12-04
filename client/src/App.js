import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminAppLayout from './features/AdminAppLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import AdminSections from './pages/admin/AdminSections'
import AdminProblem from './pages/admin/AdminProblem'
import CreateProblem from './components/CreateProblem'
import SectionProblem from './pages/admin/SectionProblem'
import ViewProblem from './components/ViewProblem'
import AppLayout from './ui/AppLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import Reset from './pages/Reset'
import Problems from './pages/Problems'
import ViewSubmissions from './features/submissions/ViewSubmissions'
import AdminContest from './pages/admin/AdminContest'
import CreateContest from './features/contest/CreateContest'
import EditContest from './features/contest/EditContest'
import AdminUsers from './pages/admin/AdminUsers'
import Details from './features/contest/Details'
import NewProblem from './features/contest/NewProblem'
import EditContestProblem from './features/contest/EditContestProblem'
import ProblemsBySection from './features/sections/ProblemsBySection'
import EditSubSectionProblem from './features/sections/EditSubSectionProblem'
import ViewSectionProblem from './features/sections/ViewSectionProblem'
import ViewContestProblem from './features/contest/ViewContestProblem'
import News from './features/news/News'
import CreateNews from './features/news/CreateNews'
import Sections from './pages/Sections/Sections'
import SubSection from './pages/Sections/SubSection'
import ProblemsBySubsection from './pages/Sections/ProblemsBySubsection'
import SubSectionProblem from './pages/Sections/SubSectionProblem'
import SectionSubmissions from './pages/Sections/SectionSubmissions'
import ShowContests from './pages/contests/ShowContests'
import ShowContestProblems from './pages/contests/ShowContestProblems'
import ShowContestProblem from './pages/contests/ShowContestProblem'
import ContestSubmissions from './pages/contests/ContestSubmissions'
import TimerProvider from './hooks/useTimer'
import MySubmissions from './pages/contests/MySubmissions'
import Results from './pages/contests/Results'
import ProtectedRoute from './ui/ProtectedRoute'
import AdminProtectedRoute from './ui/AdminProtectedRoute'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import User from './pages/User'
import AdminSettings from './pages/admin/AdminSettings'
// import ''
const queryClient = new QueryClient({
  defaultOptions:{
    
    queries:{
      staleTime: 0
    }
  }
})
const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <TimerProvider>
            <BrowserRouter>
            <Routes>
              
              <Route path='admin' element={ <AdminProtectedRoute> <AdminAppLayout /> </AdminProtectedRoute> } >
                <Route index element={ <Navigate to="sections" replace /> } />

                <Route path='dashboard' element={ <AdminDashboard /> } />

                <Route path='news' element={<News /> } />
                <Route path='news/new' element={<CreateNews /> } />

                <Route path='contests' element={<AdminContest />}  />
                <Route path='contests/new' element={<CreateContest />}   />
                <Route path='contests/:id' element={ <Details />  }   />
                <Route path='contests/:id/new' element={ <NewProblem /> }   />
                <Route path='contests/:id/edit/:problem' element={ <EditContestProblem  /> }   />
                <Route path='contests/:id/view/:problem' element={ <ViewContestProblem /> } />
                <Route path='contests/edit/:id' element={ <EditContest /> }   />

                <Route path='sections' element={ <AdminSections /> } />
                <Route path='sections/:id' element={ <ProblemsBySection /> } />
                <Route path='sections/:id/problem' element={ <SectionProblem/> } />
                <Route path='sections/:id/edit/:problem' element={ <EditSubSectionProblem/> } />
                <Route path='sections/:id/view/:problem' element={ <ViewSectionProblem/> } />
                

                <Route path='problems' element={ <AdminProblem /> } />
                <Route path='problems/:id' element={ <ViewProblem /> } />
                <Route path='problems/edit/:id' element={ <p>Problema edit  yer</p> } />
                <Route path='problem/create' element={<CreateProblem />} />
              
                <Route path="users" element={<AdminUsers />} />

                <Route path="settings" element={<AdminSettings />} />
              </Route>
              <Route element={ <AppLayout/> }>
                <Route index element={ <Navigate to="contests" replace /> } />
                <Route path="contests" element={ <ShowContests /> } />
                <Route path='contests/:id' element={ <ShowContestProblems /> } />
                <Route path='contests/:id/:problem' element={ <ShowContestProblem /> } />
                <Route path='contests/submissions' element={ <ContestSubmissions /> } />
                <Route path='contests/my/:id' element={ <ProtectedRoute>
                  <MySubmissions />
                </ProtectedRoute>  } />
                <Route path='contests/results/:id' element={ <ProtectedRoute>
                  <Results />
                </ProtectedRoute>
                 } />


                <Route path="sections" element={ <Sections /> } />
                <Route path="sections/:id" element={ <SubSection /> } />
                <Route path="sections/:id/:subsection" element={ <ProblemsBySubsection/> } />
                <Route path="sections/:id/:subsection/:problem" element={ <SubSectionProblem/> } />
                <Route path="sections/submissions" element={ <SectionSubmissions/> } />
                

                <Route path="problems" element={ <Problems />} />
                <Route path="problems/:id" element={ <ViewProblem />} />
                
                <Route path="submissions" element={ <ViewSubmissions /> } />


                <Route path="login" element={ <Login /> }  />
                <Route path="register" element={ <Register /> } />
                <Route path="reset" element={ <Reset /> } />
                
                
                <Route path="users" element={<h1>Bolumceler</h1>} />
                <Route path="users/:id" element={ <User /> } />
                <Route path="profile" element={ <ProtectedRoute> <Profile /> </ProtectedRoute> } />
                <Route path="settings" element={<ProtectedRoute> <Settings /> </ProtectedRoute>} />
                
                
                <Route path='*' element={<div className='flex mt-[10rem] items-center justify-center'>Sahypa kesgitlenmedik!</div>} />
              </Route>
            </Routes>
          </BrowserRouter>
          </TimerProvider>
        
        <Toaster position='top-center' gutter={12} containerStyle={{margin:'8px'}}
        toastOptions={{
          success: {
            duration: 3000
          },
          error:{
            duration: 5000
          },
          className:"bg-color-grey-0 text-gray-700",
          style:{
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            // backgroundColor: 'var(--color-grey-0)',
            // color: "var(--color-grey-700)"
          }
        }}
      />
      </QueryClientProvider>
  )
}


export default App