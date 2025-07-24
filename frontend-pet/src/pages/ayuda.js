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

function Ayuda() {
  return (
    <div className="privacidad-container">
      <div className="privacidad-header">
        <h1>🐾 Centro de Ayuda - PetCare</h1>
        <p>Encuentra respuestas rápidas a tus dudas sobre nuestros servicios veterinarios.</p>
      </div>

      <AccordionItem title="1. ¿Cómo puedo registrar a mi mascota?">
        <p>Para registrar a tu mascota:</p>
        <ol>
          <li>Ve al menú "Mascotas" en la parte superior.</li>
          <li>Haz clic en "Registrar mascotas".</li>
          <li>Completa los campos solicitados con la información de tu mascota.</li>
          <li>Guarda los cambios.</li>
        </ol>
        <p>Puedes consultar y editar tus mascotas registradas desde "Ver mis mascotas".</p>
      </AccordionItem>

      <AccordionItem title="2. ¿Cómo reservo una cita para mi mascota?">
        <p>Dirígete a la sección "Reservas":</p>
        <ol>
          <li>Selecciona tu mascota registrada, el servicio que necesitas y el veterinario.</li>
          <li>Escoge la fecha y hora disponibles.</li>
          <li>Escribe el motivo de la consulta.</li>
          <li>Verifica el costo estimado y haz clic en "Confirmar reserva".</li>
          <li>Recibirás un correo de confirmación con los detalles de la cita.</li>
        </ol>
      </AccordionItem>

      <AccordionItem title="3. ¿Dónde puedo ver mis citas programadas?">
        <p>Puedes ver el historial y detalles de tus citas ingresando a <strong>"Mascotas"</strong> &gt; <strong>"Ver mis citas"</strong> en el menú superior.</p>
      </AccordionItem>

      <AccordionItem title="4. ¿Cuánto cuesta cada servicio?">
        <p>El costo estimado se calcula automáticamente al seleccionar el servicio en el formulario de reserva. Este puede variar según:</p>
        <ul>
          <li>Tipo de servicio</li>
          <li>Veterinario asignado</li>
          <li>Duración estimada</li>
        </ul>
        <p>También puedes consultar la sección "Precios" para más detalles.</p>
      </AccordionItem>

      <AccordionItem title="5. ¿Es seguro registrar mis datos?">
        <p>Totalmente. En PetCare protegemos tu información conforme a nuestra <a href="/privacidad">Política de Privacidad</a>. Tus datos personales y los de tu mascota están seguros con nosotros.</p>
      </AccordionItem>

      <AccordionItem title="6. ¿Puedo usar PetCare desde el celular?">
        <p><strong>Actualmente, nuestra plataforma está optimizada para computadoras.</strong> Para una mejor experiencia y acceso completo a todas las funciones, te recomendamos ingresar desde una PC o laptop.</p>
      </AccordionItem>

      <AccordionItem title="7. ¿Qué pasa si llego tarde a mi cita?">
        <p>Te recomendamos llegar con 10 minutos de anticipación. Si llegas tarde:</p>
        <ul>
          <li>Se intentará atenderte en la medida de lo posible sin afectar otras citas.</li>
          <li>Si el retraso es mayor a 15 minutos, la atención podrá reprogramarse automáticamente.</li>
          <li>En caso de emergencia o cambios, comunícate con nosotros lo antes posible.</li>
        </ul>
      </AccordionItem>

      <AccordionItem title="8. ¿Cuáles son los métodos de pago aceptados?">
        <p>Actualmente, los pagos se realizan de forma presencial al momento de la cita en nuestras instalaciones. Aceptamos:</p>
        <ul>
          <li>Efectivo</li>
          <li>Tarjeta de débito o crédito (Visa, MasterCard)</li>
          <li>Yape o Plin (consultar disponibilidad en recepción)</li>
        </ul>
        <p>Próximamente habilitaremos pagos en línea a través de la plataforma.</p>
      </AccordionItem>

      <AccordionItem title="9. ¿Qué tipo de mascotas puedo registrar?">
        <p>La plataforma está diseñada principalmente para perros y gatos, pero también puedes registrar otras mascotas pequeñas como:</p>
        <ul>
          <li>Conejos</li>
          <li>Hámsters</li>
          <li>Aves domésticas</li>
        </ul>
        <p>Si tienes una mascota exótica o de gran tamaño, contáctanos para verificar si podemos atenderla adecuadamente.</p>
      </AccordionItem>

      <AccordionItem title="10. ¿Necesitas más ayuda?">
        <p>Contáctanos a través de los siguientes canales:</p>
        <ul>
          <li><a href="mailto:soporte@petcare.com">soporte@petcare.com</a></li>
          <li><a href="tel:+51987654321">+51 987 654 321</a></li>
          <li>Horario de atención: 8:00 AM - 9:00 PM</li>
        </ul>
      </AccordionItem>
    </div>
  );
}

export default Ayuda;