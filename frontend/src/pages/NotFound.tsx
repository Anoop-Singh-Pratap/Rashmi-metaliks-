import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from "../components/SEO";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="404 - Page Not Found | Rashmi Metaliks"
        description="The page you are looking for doesn't exist or has been moved. Return to the homepage to continue browsing."
        noindex={true}
      />
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-6xl font-bold text-rashmi-red mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">Oops! The page you're looking for cannot be found</p>
          <p className="text-muted-foreground mb-8">
            The page at <span className="font-mono bg-card px-2 py-1 rounded text-sm">{location.pathname}</span> doesn't exist or has been moved.
          </p>
          <a 
            href="/" 
            className="inline-flex items-center bg-rashmi-red text-white px-6 py-3 rounded-full hover:bg-rashmi-red/90 transition-colors"
          >
            Return to Homepage
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
