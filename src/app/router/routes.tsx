import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import Services from "../../features/services/Services";
import CertificatesPage from "../../features/certificates/CertificatesPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'contact', element: <ContactPage />},
            { path: 'services', element: <Services />},
            { path: 'certificates', element: <CertificatesPage />},

            // { path: '/subjects/:id/notes', element: <SubjectNotes /> },
        ]
    }
])