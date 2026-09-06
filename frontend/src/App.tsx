import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { BookingModalProvider } from "./context/BookingModalContext";
import BookingModal from "./components/public/BookingModal";
import ScrollToHash from "./components/ScrollToHash";
function App() {
  return (
    <AuthProvider>
      <BookingModalProvider>
        <ScrollToHash />
        <AppRouter />
        <BookingModal />
      </BookingModalProvider>
    </AuthProvider>
  );
}

export default App;