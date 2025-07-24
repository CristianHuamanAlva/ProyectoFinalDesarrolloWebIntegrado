import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from './componentes/navbar';
import Footer from './componentes/footer';
import Topbar from './componentes/topbar';
import Carrusel from './componentes/carrusel';
import Reserva from './componentes/reserva';
import SobreNosotros from './componentes/sobreNosotros';
import NuestrosServicios from './componentes/nuestrosServicios';
import Caracteristicas from './componentes/caracteristicas';
import Planes from './componentes/planes';
import Colaboradores from './componentes/colaboradores';
import Testimonios from './componentes/testimonios';
import Button from './componentes/button';
import Login from './pages/login';  // Importa tu nuevo componente
import Registro from './pages/registro';
import Allservices from './componentes/allservices';
import Contact from './componentes/contact';
import Dashboard from './pages/dashboard';
import PetForm from './componentes/PetForm';
import VerMascotas from './pages/verMascotas';
import AnimatedSection from './componentes/AnimatedSection';
import VerCitas from './pages/verCitas';
import DashboardVeterinario from './pages/dashboardVeterinario';
import AccesoDenegado from './componentes/AccesoDenegado';
import LibroReclamaciones from './pages/libroreclamaciones';
import Ayuda from './pages/ayuda';
import Privacidad from './pages/privacidad';
import TerminosCondiciones from './pages/terminos';
import './App.css';     // Si está en el mismo directorio
import './pages/login.css'; // Si está en la carpeta 'pages'
import './pages/registro.css'
import './pages/registroMascota.css'


function App() {
  return (
    <Router>
      <div className="App">
        <AppContent />
      </div>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  const usuarioGuardado = localStorage.getItem('usuario');
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  const rol = usuario?.role || '';


  // Condición para saber si estamos en login
  const isLoginPage = location.pathname === "/login";
  const isRegistroPage = location.pathname === "/registro";
  const isAboutPage = location.pathname === "/about";
  const isService = location.pathname === "/service";
  const isPrice = location.pathname === "/price";
  const isBooking = location.pathname === "/booking";
  const isContact = location.pathname === "/contact";
  const isRegistrarMascotas = location.pathname === "/registrarMascotas";
  const isDashboard = location.pathname === "/admin";
  const isVerMascotas = location.pathname === "/verMascotas";
  const isVerCitas = location.pathname === "/verCitasDuenio";
  const isDashboardVeterinario = location.pathname === "/dashboardVeterinario";
  const isReclamaciones = location.pathname === "/reclamaciones";
  const isAyuda = location.pathname === "/ayuda";
  const isPrivacidad = location.pathname === "/privacidad";
  const isTerminos = location.pathname === "/terminos";

  if (isLoginPage) {
    return (
      <>
        <Topbar />
        <Navbar />
        <AnimatedSection delay={0.25}>
          <Login />
        </AnimatedSection>
        <Footer />
        <Button />
      </>
    );
  }

  if (isRegistroPage) {
    return (
      <>
        <Topbar />
        <Navbar />
        <AnimatedSection delay={0.25}>
          <Registro />
        </AnimatedSection>
        <Footer />
        <Button />
      </>
    );
  }

  if (isAboutPage) {
    return (
      <>
        <Topbar />
        <Navbar />
        <AnimatedSection delay={0.25}>
          <SobreNosotros />
        </AnimatedSection>
        <AnimatedSection delay={0.5}>  {/* Aumenta el delay para un efecto escalonado */}
          <Caracteristicas />
        </AnimatedSection>
        <AnimatedSection delay={0.75}>  {/* Delay aún mayor para el último componente */}
          <Colaboradores />
        </AnimatedSection>
        <Footer />
        <Button />
      </>
    );
  }

  if (isService) {
    return (
      <>
        <Topbar />
        <Navbar />
        <AnimatedSection delay={0.2}>
          <Allservices />
        </AnimatedSection>
        <AnimatedSection delay={0.3}>
          <Testimonios />
        </AnimatedSection>
        <Footer />
        <Button />
      </>
    );
  }

  if (isPrice) {
    return (
      <>
        <Topbar />
        <Navbar />
        <AnimatedSection delay={0.2}>
          <Planes />
        </AnimatedSection>
        <AnimatedSection delay={0.3}>
          <Reserva />
        </AnimatedSection>
        <Footer />
        <Button />
      </>
    );
  }

  if (isBooking) {
    return (
      <>
        <Topbar />
        <Navbar />
        <AnimatedSection delay={0.2}>
          <Reserva />
        </AnimatedSection>
        <Footer />
        <Button />
      </>
    );
  }

  if (isContact) {
    return (
      <>
        <Topbar />
        <Navbar />
        <AnimatedSection delay={0.2}>
          <Contact />
        </AnimatedSection>
        <Footer />
        <Button />
      </>
    );
  }

  if (isRegistrarMascotas) {
    return (
      <>
        <Topbar />
        <Navbar />
        <AnimatedSection delay={0.2}>
          <PetForm />
        </AnimatedSection>
        <Footer />
        <Button />
      </>
    );
  }

  if (isVerMascotas) {
    return (
      <>
        <Topbar />
        <Navbar />
        <AnimatedSection delay={0.2}>
          <VerMascotas />
        </AnimatedSection>
        <Footer />
        <Button />
      </>
    );
  }

  if (isVerCitas) {
    return (
      <>
        <Topbar />
        <Navbar />
        <AnimatedSection delay={0.2}>
          <VerCitas />
        </AnimatedSection>
        <Footer />
        <Button />
      </>
    );
  }


  if (isDashboard) {
    return rol === 'veterinario' ? <Dashboard /> : <AccesoDenegado />;
  }

  if (isDashboardVeterinario) {
    return rol === 'veterinario' ? <DashboardVeterinario /> : <AccesoDenegado />;
  }

  if (isReclamaciones) {
    return (
      <>
        <Topbar />
        <Navbar />
        <AnimatedSection delay={0.2}>
          <LibroReclamaciones />
        </AnimatedSection>
        <Footer />
        <Button />
      </>
    );
  }

    if (isAyuda) {
    return (
      <>
        <Topbar />
        <Navbar />
        <AnimatedSection delay={0.2}>
          <Ayuda />
        </AnimatedSection>
        <Footer />
        <Button />
      </>
    );
  }

    if (isPrivacidad) {
    return (
      <>
        <Topbar />
        <Navbar />
        <AnimatedSection delay={0.2}>
          <Privacidad />
        </AnimatedSection>
        <Footer />
        <Button />
      </>
    );
  }

    if (isTerminos) {
    return (
      <>
        <Topbar />
        <Navbar />
        <AnimatedSection delay={0.2}>
          <TerminosCondiciones />
        </AnimatedSection>
        <Footer />
        <Button />
      </>
    );
  }

  // Para todas las demás rutas, mostrar todo el contenido
  return (
    <>
      <Topbar />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <AnimatedSection delay={0.15}><Carrusel /></AnimatedSection>
            <AnimatedSection delay={0.45}><Reserva /></AnimatedSection>
            <AnimatedSection delay={0.35}><SobreNosotros /></AnimatedSection>
            <AnimatedSection delay={0.35}><NuestrosServicios /></AnimatedSection>
            <AnimatedSection delay={0.35}><Caracteristicas /></AnimatedSection>
            <AnimatedSection delay={0.35}><Planes /></AnimatedSection>
            <AnimatedSection delay={0.35}><Colaboradores /></AnimatedSection>
            <AnimatedSection delay={0.35}><Testimonios /></AnimatedSection>
          </>
        } />
        <Route path="/about" element={<SobreNosotros />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        {/* Agrega más rutas si las necesitas */}
      </Routes>
      <Footer />
      <Button />
    </>
  );
}

export default App;