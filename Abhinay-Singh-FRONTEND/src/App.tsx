import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Header from "./atoms/Header";
import Footer from "./atoms/Footer";
import PlagiarismChecker from "./components/PlagiarismChecker";

// Placeholder components for Features and Contact pages
const Features = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-stone-900">
    <h1 className="text-3xl font-bold mb-4">Features</h1>
    <p>Detailed information about our plagiarism detection features.</p>
  </div>
);

const Contact = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-stone-900">
    <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
    <p >Get in touch with our team for any inquiries.</p>
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex justify-center flex-col">
        <Header />
        <main className="flex-grow bg-indigo-50">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/check-plagiarism" element={<PlagiarismChecker />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
