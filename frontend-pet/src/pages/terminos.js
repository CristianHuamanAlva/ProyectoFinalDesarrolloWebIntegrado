import React, { useState } from 'react';
import './privacidad.css';
import { FaChevronDown } from 'react-icons/fa';

function AccordionItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-section">
      <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        {title}
        <FaChevronDown className={`arrow ${isOpen ? 'open' : ''}`} />
      </div>
      {isOpen && <div className="accordion-body">{children}</div>}
    </div>
  );
}

function TerminosCondiciones() {
  return (
    <div className="privacidad-container">
      <div className="privacidad-header">
        <h1>📄 Términos y Condiciones</h1>
        <p>
          Bienvenido a PetCare. Al acceder y utilizar nuestro sitio web y servicios, aceptas estar sujeto a los siguientes Términos y Condiciones. Por favor, léelos detenidamente antes de usar nuestros servicios.
        </p>
      </div>

      <AccordionItem title="1. Aceptación de los términos">
        <p>
          Al usar nuestro sitio web, reservas, servicios o interactuar con nuestra plataforma, aceptas expresamente estos Términos y Condiciones, así como nuestra <a href="/privacidad">Política de Privacidad</a>.
          Si no estás de acuerdo con alguno de estos términos, por favor no utilices el sitio.
        </p>
      </AccordionItem>

      <AccordionItem title="2. Uso del Sitio Web">
        <p>Puedes utilizar nuestro sitio únicamente para fines legales y personales. No está permitido:</p>
        <ul>
          <li>Realizar actividades fraudulentas o ilícitas.</li>
          <li>Acceder sin autorización a sistemas, cuentas u otras áreas protegidas.</li>
          <li>Reproducir, duplicar o copiar contenido sin permiso.</li>
        </ul>
        <p>PetCare se reserva el derecho de suspender o restringir el acceso a cualquier usuario que infrinja estos términos.</p>
      </AccordionItem>

      <AccordionItem title="3. Registro y Cuenta del Usuario">
        <p>
          Para acceder a ciertos servicios (como reservas o suscripciones), puedes necesitar registrarte. Al hacerlo, aceptas proporcionar información verdadera, actualizada y completa.
          Eres responsable de mantener la confidencialidad de tus datos de acceso y de cualquier actividad que ocurra bajo tu cuenta.
        </p>
      </AccordionItem>

      <AccordionItem title="4. Servicios y Reservas">
        <p>PetCare ofrece servicios veterinarios que pueden requerir reserva previa. Las reservas están sujetas a disponibilidad y confirmación.</p>
        <ul>
          <li>Reprogramar o cancelar citas por motivos operativos.</li>
          <li>Solicitar información adicional antes de confirmar un servicio.</li>
          <li>Negarnos a prestar un servicio si hay incumplimiento de estos términos.</li>
        </ul>
      </AccordionItem>

      <AccordionItem title="5. Precios y Pagos">
        <p>
          Los precios publicados están expresados en moneda local e incluyen los impuestos aplicables, salvo que se indique lo contrario. PetCare se reserva el derecho de modificar precios en cualquier momento sin previo aviso.
        </p>
        <p>
          Los pagos pueden realizarse a través de los métodos habilitados en la plataforma. El uso de pasarelas de pago externas está sujeto a sus propios términos y condiciones.
        </p>
      </AccordionItem>

      <AccordionItem title="6. Propiedad Intelectual">
        <p>
          Todo el contenido del sitio web (logotipos, textos, imágenes, gráficos, diseño, etc.) es propiedad de PetCare o se utiliza bajo licencia, y está protegido por las leyes de propiedad intelectual. Queda prohibida su reproducción total o parcial sin autorización expresa.
        </p>
      </AccordionItem>

      <AccordionItem title="7. Responsabilidad">
        <p>PetCare no será responsable por:</p>
        <ul>
          <li>Pérdidas o daños derivados del uso o imposibilidad de uso del sitio.</li>
          <li>Contenidos de terceros o enlaces externos.</li>
          <li>Errores en la información proporcionada por el usuario.</li>
        </ul>
        <p>Nos comprometemos a brindar nuestros servicios de manera profesional, pero no garantizamos que el sitio esté libre de interrupciones, errores o virus.</p>
      </AccordionItem>

      <AccordionItem title="8. Modificaciones">
        <p>
          PetCare se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios se publicarán en esta misma sección y serán efectivos desde su publicación. Se recomienda revisar esta página periódicamente.
        </p>
      </AccordionItem>

      <AccordionItem title="9. Ley Aplicable y Jurisdicción">
        <p>
          Estos términos se rigen por las leyes de Perú. Cualquier conflicto relacionado con este sitio o sus servicios será resuelto por los tribunales competentes del distrito judicial de Lima Metropolitana.
        </p>
      </AccordionItem>

      <AccordionItem title="10. Contacto">
        <p>Si tienes dudas sobre estos Términos y Condiciones, puedes comunicarte con nosotros:</p>
        <ul>
          <li><a href="mailto:soporte@petcare.com">soporte@petcare.com</a></li>
          <li><a href="tel:+51987654321">+51 987 654 321</a></li>
        </ul>
      </AccordionItem>
    </div>
  );
}

export default TerminosCondiciones;
