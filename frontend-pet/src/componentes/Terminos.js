import React from 'react';

const terminosHTML = `
  <div class="container py-5" style="max-width: 800px; margin: auto;">
    <h1 class="mb-4">Términos y Condiciones</h1>
    <p>
      Bienvenido a PetCare. Al acceder y usar este sitio web, aceptas cumplir con los siguientes términos y condiciones.
      Por favor, léelos detenidamente.
    </p>

    <h2>1. Uso del sitio web</h2>
    <p>
      El contenido proporcionado en este sitio es solo para fines informativos relacionados con el cuidado de mascotas.
      Nos reservamos el derecho de modificar, suspender o discontinuar cualquier parte del sitio sin previo aviso.
    </p>

    <h2>2. Responsabilidad</h2>
    <p>
      PetCare no se hace responsable por daños o perjuicios derivados del uso o interpretación de la información contenida en este sitio.
      Siempre recomendamos consultar con un veterinario profesional para cualquier consulta médica sobre tus mascotas.
    </p>

    <h2>3. Propiedad intelectual</h2>
    <p>
      Todo el contenido, imágenes, logos y marcas registradas en este sitio son propiedad de PetCare o de terceros licenciantes.
      No se permite su uso sin autorización expresa.
    </p>

    <h2>4. Privacidad</h2>
    <p>
      La información que recopilemos a través de formularios o suscripciones se manejará de acuerdo con nuestra política de privacidad.
      No compartiremos tus datos personales con terceros sin tu consentimiento.
    </p>

    <h2>5. Enlaces a terceros</h2>
    <p>
      Nuestro sitio puede contener enlaces a sitios web externos. No nos responsabilizamos por el contenido o las políticas de esos sitios.
    </p>

    <h2>6. Cambios en los términos</h2>
    <p>
      PetCare puede actualizar estos términos y condiciones en cualquier momento. Te recomendamos revisar esta página periódicamente.
    </p>

    <h2>7. Contacto</h2>
    <p>
      Si tienes alguna pregunta sobre estos términos, puedes contactarnos en:
      <a href="gmail:PetCare@gmail.com">PetCare@gmail.com</a>.
    </p>

    <p style="margin-top: 2rem; font-size: 0.9rem; color: #555;">
      Última actualización: 29 de mayo de 2025
    </p>
  </div>
`;

function Terminos() {
  return <div dangerouslySetInnerHTML={{ __html: terminosHTML }} />;
}

export default Terminos;