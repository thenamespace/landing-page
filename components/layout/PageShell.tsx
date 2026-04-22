import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

/**
 * PageShell wraps every page in the Webflow-standard structure:
 *   .page-wrapper > .main-wrapper
 * The Navbar sits before .main-wrapper, the Footer after children.
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="main-wrapper">
        {children}
      </div>
      <Footer />
    </div>
  );
}
