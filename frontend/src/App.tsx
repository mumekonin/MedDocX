import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { BookingModalProvider } from "./context/BookingModalContext";
import { ThemeProvider } from "./context/ThemeContext";
import BookingModal from "./components/public/BookingModal";
import ScrollToHash from "./components/ScrollToHash";
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BookingModalProvider>
          <ScrollToHash />
          <AppRouter />
          <BookingModal />
        </BookingModalProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;