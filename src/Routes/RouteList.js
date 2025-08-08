import React, { useState } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import BookDetail from "./Books/BookDetails";
import SimBook from "./Books/SimBook";
import SearchHome from "./Searches/SearchHome";
import TitleCollection from "./Searches/TitleCollection";
import DescriptCollection from "./Searches/DescriptCollection";
import CoverCollection from "./Searches/CoverCollection";
import Edit from "./Users/Edit";
import Login from "./Users/Login";
import Signup from "./Users/SignUp";
import Profile from "./Users/Profile";
import SavedBProfile from "./Users/SavedBProfile";
import ProtectedRoute from "../ProtectedRoute";

function RouteList({ handleSignUp, handleLogin, handleEditUser }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Book Detail */}
      <Route path="/book/:volume_id" element={<BookDetail />} />

      {/* Seaching Google Books */}
      <Route path="/search/title/:query" element={<TitleCollection />} />
      <Route path="/search" element={<SearchHome />} />

      {/* Book Recomednations Gemini Ai*/}
      <Route
        path="/bookrecommendation/user/description/"
        element={<DescriptCollection />}
      />

      <Route
        path="/bookrecommendation/user/cover/"
        element={<CoverCollection />}
      />
      <Route path="/bookrecommendation/book/:volume_id" element={<SimBook />} />

      {/* USER */}
      <Route
        path="/profile/:currentUser"
        element={
          <ProtectedRoute>
            <SavedBProfile />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<Signup handleSignUp={handleSignUp} />} />
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      <Route
        path="/profile/edit/:username"
        element={
          <ProtectedRoute>
            <Edit handleEditUser={handleEditUser} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default RouteList;
