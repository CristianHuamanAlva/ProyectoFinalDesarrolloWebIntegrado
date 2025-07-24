import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Testimonios() {
  const location = useLocation();
  const pathname = location.pathname;

  const containerClass =
    pathname === "/" ? "container-fluid bg-light"
    : pathname === "/service" ? "container-fluid caracteristicas-bg mt-0 mb-0"
    : "container-fluid bg-light mt-3 mb-3";

  useEffect(() => {
    const $ = window.$;
    if ($ && $.fn.owlCarousel) {
      const $carousel = $(".testimonial-carousel");
      $carousel.trigger('destroy.owl.carousel');
      $carousel.find('.owl-stage-outer').children().unwrap();
      $carousel.removeClass('owl-loaded owl-drag');

      $carousel.owlCarousel({
        center: true,
        autoplay: true,
        smartSpeed: 1000,
        dots: true,
        loop: true,
        margin: 20,
        responsive: {
          0: { items: 1 },
          576: { items: 1 },
          768: { items: 2 },
          992: { items: 3 }
        }
      });
    }
  }, []);

  const testimoniosHTML = `
    <div class="testimonios-section py-5">
      <div class="container py-5">
        <div class="text-center mb-5">
          <h4 class="text-success mb-3" style="font-weight: bold; font-size: 1.5rem;">Testimonios</h4>
          <h1 class="display-4 fw-bold">
            Nuestros clientes <span class="text-primary">dicen</span>
          </h1>
        </div>
        <div class="owl-carousel testimonial-carousel">
          ${[1, 2, 3, 4].map(i => {
            const data = [
              {
                nombre: 'María López',
                profesion: 'Veterinaria',
                texto: 'El servicio es excelente, siempre atienden con mucha dedicación y cariño a nuestras mascotas.',
                img: 'img/testimonial-1.jpg'
              },
              {
                nombre: 'Carlos Ramírez',
                profesion: 'Ingeniero',
                texto: 'Llevo a mi perro aquí desde hace años. Siempre he recibido atención de calidad y muy profesional.',
                img: 'img/testimonial-2.jpg'
              },
              {
                nombre: 'Lucía Fernández',
                profesion: 'Docente',
                texto: 'El equipo de PetCare es muy amable y atento. Mi gato siempre está tranquilo cuando lo llevo.',
                img: 'img/testimonial-3.jpg'
              },
              {
                nombre: 'Pedro Soto',
                profesion: 'Empresario',
                texto: 'Un lugar limpio, ordenado y con un personal que realmente ama a los animales. Muy recomendable.',
                img: 'img/testimonial-4.jpg'
              }
            ][i - 1];
            return `
              <div class="testimonial-card bg-white shadow rounded p-4 mx-3 position-relative">
                <div class="d-flex align-items-center mb-4">
                  <img class="rounded-circle border border-success" src="${data.img}" alt="" style="width: 80px; height: 80px;">
                  <div class="ms-3">
                    <h5 class="mb-1 text-success fw-bold">${data.nombre}</h5>
                    <i class="text-muted">${data.profesion}</i>
                  </div>
                </div>
                <p class="mb-0 text-dark">${data.texto}</p>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  return (
    <div className={containerClass} dangerouslySetInnerHTML={{ __html: testimoniosHTML }} />
  );
}

export default Testimonios;

