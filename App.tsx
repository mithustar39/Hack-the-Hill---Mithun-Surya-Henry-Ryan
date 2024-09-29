import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import HomePage from "./HomeScreen";
import TodaysSleep from "./TodaysSleep";
import SleepHistory from "./SleepHistory";
import SleepVideos from "./Strategies"; // Import your SleepVideos component
import ASMRVideo from "./ASMR"; // Import ASMR video component
import MeditationVideo from "./Meditation"; // Import Meditation video component
import YogaVideo from "./Yoga"; // Import Yoga video component
import RelaxingMusicVideo from "./Music"; // Import Relaxing Music video component
import PersonalizedTips from "./PersonalizedTips";
import { GlobalStyle, HeaderContainer, NavBar, NavButton } from './styles';

export default function App() {
  return (
    <ClerkProvider publishableKey="pk_test_dG9wcy1qYXZlbGluLTg3LmNsZXJrLmFjY291bnRzLmRldiQ">
      <GlobalStyle />
      <Router>
        <SignedOut>
          {/* Redirect to Clerk's built-in SignIn component */}
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="*" element={<Navigate to="/sign-in" replace />} /> {/* Redirect all other routes to sign-in if signed out */}
          </Routes>
        </SignedOut>

        <SignedIn>
          <HeaderContainer>
            <UserButton />
            <NavBar>
              <NavButton to="/home" end>Home</NavButton>
              <NavButton to="/todays-sleep">Today's Sleep</NavButton>
              <NavButton to="/sleep-history">Sleep History</NavButton>
              <NavButton to="/sleep-videos">Sleep Videos</NavButton> {/* Add a button for Sleep Videos */}
              <NavButton to="/personalized-tips">Personalized Tips</NavButton>
            </NavBar>
          </HeaderContainer>

          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/sleep-history" element={<SleepHistory />} />
            <Route path="/todays-sleep" element={<TodaysSleep />} />
            <Route path="/personalized-tips" element={<PersonalizedTips />} />
            <Route path="/sleep-videos" element={<SleepVideos />} /> {/* Add route for Sleep Videos */}
            <Route path="/asmr" element={<ASMRVideo />} /> {/* Route for ASMR video */}
            <Route path="/meditation" element={<MeditationVideo />} /> {/* Route for Meditation video */}
            <Route path="/yoga" element={<YogaVideo />} /> {/* Route for Yoga video */}
            <Route path="/relaxing-music" element={<RelaxingMusicVideo />} /> {/* Route for Relaxing Music video */}
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </SignedIn>
      </Router>
    </ClerkProvider>
  );
}
