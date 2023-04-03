import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import DetailView from './routes/DetailView'
import './styles/index.css'
import Layout from './routes/Layout'
import SearchResult from './routes/SearchResult'
import { BrowserRouter, Route, Routes } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index={true} path="/" element={<App />} />
        <Route index={false} path="/search/:searchinput" element={<SearchResult />} />
        <Route index={false} path="/detail/:id" element={<DetailView />} />
      </Route>
    </Routes>
</BrowserRouter>
)

