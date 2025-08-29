import { FaClock, FaPhone, FaMailBulk, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaFileAlt } from 'react-icons/fa';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Theme from './template/components/template/Theme';
import { AuthProvider } from './template/auth';
import Layout from './template/components/layouts';
import Views from './template/views';
import appConfig from './template/configs/app.config';

// mock habilitado
if (appConfig.enableMock) {
    import('./template/mock');
}

// landing page
const LandingPage = () => {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="bg-white text-black flex items-center justify-between px-6 py-4 shadow-md">
          <div className="flex items-center space-x-2">
            <img src="/img/logo/logo-cenepred.jpg" alt="CENEPRED" className="h-16" />
          </div>
          <div className="flex items-center space-x-2">
            <img src="/img/logo/logo_sigrid.png" alt="SIGRID" className="h-16" />
          </div>
        </div>

        <header className="bg-[#0097a7] text-white flex items-center justify-center px-6 py-4 shadow-md">
          <nav className="hidden md:flex space-x-8 text-sm font-semibold">
            <Link to="/" className="hover:text-yellow-400">INICIO</Link>
            <Link to="/gestion-procesos" className="hover:text-yellow-400">GESTIÓN DE PROCESOS</Link>
            <Link to="/fortalecimiento" className="hover:text-yellow-400">FORTALECIMIENTO Y ASISTENCIA TÉCNICA</Link>
            <Link to="/monitoreo" className="hover:text-yellow-400">MONITOREO, SEGUIMIENTO Y EVALUACIÓN</Link>
          </nav>
        </header>

        <main className="flex-1 relative bg-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <img src="/img/others/mapa.jpg" alt="mapa" className="w-full h-120 mb-2" />
          </div>
        </main>

        <footer className="bg-[#0097a7] text-white py-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 text-sm">

            <div className="flex flex-col items-center md:items-start">
              <img
                src="/img/logo/logo_cenepred.png"
                alt="CENEPRED"
                className="h-12 mb-2"
              />
              <p className="text-center md:text-left">
                Centro Nacional de Estimación, Prevención y Reducción del Riesgo de
                Desastres
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2 flex items-center space-x-2">
                <FaClock className="mr-2" />
                <span>Horarios de atención</span>
              </h4>
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center space-x-2 my-1">
                  <FaMapMarkerAlt className="mr-2" />
                  <p>Lunes a Viernes <br /> 08:30 a.m. - 05:30 p.m.</p>
                </div>
                <div className="flex items-center space-x-2 my-1">
                  <FaFileAlt className="mr-2" />
                  <p>Mesa de Partes <br /> 08:30 a.m. - 04:30 p.m.</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2 flex items-center space-x-2">
                <FaPhoneAlt className="mr-2" />
                <span>Central Telefónica</span>
              </h4>
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center space-x-2 my-1">
                  <FaPhoneAlt className="mr-2" />
                  <p> +51 (01) 2013550 <br /> Anexos 124, 126, 127</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2 flex items-center space-x-2">
                <FaMailBulk className="mr-2" />
                <span>Contáctanos</span>
              </h4>
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center space-x-2 my-1">
                  <FaEnvelope className="mr-2" />
                  <p>contacto@cenepred.gob.pe</p>
                </div>
                <div className="flex items-center space-x-2 my-1">
                  <FaMapMarkerAlt className="mr-2" />
                  <p>Av. Del Parque Norte 829 - 833, San Isidro, Lima, Perú</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-xs border-t border-white/20 pt-4">
            © Copyright {new Date().getFullYear()} - Todos los derechos  <span className="text-black font-bold">CENEPRED</span>
          </div>
        </footer>
      </div>
    )
}

// routing principal
function App() {
    return (
        <Theme>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    
                    <Route path="/gestion-procesos" element={<RedirectToLogin />} />
                    <Route path="/fortalecimiento" element={<RedirectToLogin />} />
                    <Route path="/monitoreo" element={<RedirectToLogin />} />
                    
                    <Route path="/*" element={
                        <AuthProvider>
                            <Layout>
                                <Views />
                            </Layout>
                        </AuthProvider>
                    } />
                </Routes>
            </BrowserRouter>
        </Theme>
    )
}

const RedirectToLogin = () => {
    return <Navigate to="/sign-in" replace />;
}

export default App
