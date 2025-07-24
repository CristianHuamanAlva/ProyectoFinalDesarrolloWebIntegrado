import React, { useState } from 'react';
import './privacidad.css';
import { FaChevronDown } from 'react-icons/fa';

function AccordionItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-section">
      <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        {title}
        <FaChevronDown className={`arrow ${isOpen ? 'open' : ''}`}/>
      </div>
      {isOpen && <div className="accordion-body">{children}</div>}
    </div>
  );
}

function Privacidad() {
  return (
    <div className="privacidad-container">
      <div className="privacidad-header">
        <h1>🛡️ Política de privacidad</h1>
        <p>
          En PetCare, nos comprometemos con la protección de tus datos personales. Esta Política de Privacidad explica cómo recopilamos, usamos, protegemos y compartimos tu información cuando utilizas nuestro sitio web o nuestros servicios.
        </p>
      </div>

      <AccordionItem title="1. ¿Qué información recopilamos?">
        <p>Recopilamos información personal como:</p>
        <ul>
          <li>Nombre completo</li>
          <li>Correo electrónico</li>
          <li>Número de teléfono</li>
          <li>Dirección</li>
          <li>Datos de tus mascotas</li>
        </ul>
      </AccordionItem>

      <AccordionItem title="2. ¿Para qué usamos tus datos?">
        <ul>
          <li>Gestionar citas y reservas</li>
          <li>Procesar tus pedidos o solicitudes</li>
          <li>Mejorar nuestros servicios y tu experiencia como cliente</li>
          <li>Atender consultas o reclamos</li>
        </ul>
      </AccordionItem>

      <AccordionItem title="3. Seguridad de tu información">
        <p>
          Implementamos medidas técnicas y organizativas adecuadas para proteger tu información. Usamos encriptación estándar del sector y acceso restringido a los datos, garantizando su confidencialidad y seguridad.
        </p>
      </AccordionItem>

      <AccordionItem title="4. ¿Compartimos tu información?">
        <p>No compartimos tu información personal con terceros, salvo que:</p>
        <ul>
          <li>Sea necesario para cumplir con obligaciones legales</li>
          <li>Lo exija una autoridad competente</li>
          <li>Sea indispensable para prestarte un servicio solicitado</li>
        </ul>
      </AccordionItem>

      <AccordionItem title="5. Uso de Cookies">
        <p>
          Nuestro sitio web utiliza cookies para mejorar la experiencia de navegación, recordar preferencias y analizar patrones de uso. Puedes configurar tu navegador para rechazar las cookies o recibir alertas cuando estas se estén enviando.
        </p>
      </AccordionItem>

      <AccordionItem title="6. Derechos del usuario">
        <p>Tienes derecho a:</p>
        <ul>
          <li>Acceder a tus datos personales</li>
          <li>Rectificar información incorrecta</li>
          <li>Cancelar el uso de tus datos</li>
          <li>Oponerte a su tratamiento</li>
        </ul>
        <p>Escríbenos a: <a href="mailto:privacidad@petcare.com">privacidad@petcare.com</a></p>
      </AccordionItem>

      <AccordionItem title="7. Cambios en esta política">
        <p>
          Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Notificaremos cualquier cambio relevante mediante nuestro sitio web. Recomendamos revisar esta sección periódicamente.
        </p>
      </AccordionItem>

      <AccordionItem title="8. Contacto">
        <p>Si tienes dudas o inquietudes sobre esta Política, puedes escribirnos:</p>
        <ul>
          <li><a href="mailto:soporte@petcare.com">soporte@petcare.com</a></li>
          <li><a href="tel:+51987654321">+51 987 654 321</a></li>
        </ul>
      </AccordionItem>
    </div>
  );
}

export default Privacidad;