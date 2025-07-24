import React from 'react';

const registroMascotaHTML = `
  <div class="petreg-container">
    <div class="row justify-content-center">
        <div class="col-lg-10">
        <div class="petreg-card">
            <!-- Encabezado con imagen -->
            <div class="petreg-header">
            <h1 class="petreg-title">Registra a tu Mascota</h1>
            <p class="petreg-subtitle">Completa los datos para brindarle el mejor cuidado</p>
            </div>

            <!-- Cuerpo del formulario -->
            <div class="petreg-form-body">
            <form id="petRegistrationForm">
                <!-- Imagen de referencia -->
                <div class="text-center">
                <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=612&q=80" 
                    alt="Mascota feliz" 
                    class="petreg-pet-img">
                </div>

                <!-- Sección de información básica -->
                <div class="petreg-form-group">
                <h3 class="petreg-section-title">
                    <i class="fas fa-paw"></i> Información Básica
                </h3>
                
                <div class="form-row">
                    <div class="col-md-6 petreg-form-group">
                    <label for="petName" class="petreg-label">Nombre de la mascota</label>
                    <input type="text" class="petreg-input" id="petName" name="petName" placeholder="Ej: Max" required>
                    </div>
                    
                    <div class="col-md-6 petreg-form-group">
                    <label for="petSpecies" class="petreg-label">Especie</label>
                    <select class="petreg-input petreg-select" id="petSpecies" name="petSpecies" required>
                        <option value="" disabled selected>Selecciona una especie</option>
                        <option value="perro">Perro</option>
                        <option value="gato">Gato</option>
                        <option value="ave">Ave</option>
                        <option value="conejo">Conejo</option>
                        <option value="otro">Otra</option>
                    </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="col-md-6 petreg-form-group">
                    <label for="petBreed" class="petreg-label">Raza</label>
                    <input type="text" class="petreg-input" id="petBreed" name="petBreed" placeholder="Ej: Golden Retriever" required>
                    </div>
                    
                    <div class="col-md-6 petreg-form-group">
                    <label for="petBirthDate" class="petreg-label">Fecha de Nacimiento</label>
                    <input type="date" class="petreg-input" id="petBirthDate" name="petBirthDate" required>
                    </div>
                </div>
                </div>

                <!-- Sección de foto (opcional) -->
                <div class="petreg-form-group">
                <h3 class="petreg-section-title">
                    <i class="fas fa-camera"></i> Foto de tu Mascota (Opcional)
                </h3>
                
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="petPhoto" accept="image/*">
                    <label class="custom-file-label petreg-input" for="petPhoto">Seleccionar imagen</label>
                </div>
                
                <img id="petPhotoPreview" class="petreg-img-preview" alt="Vista previa de la imagen">
                </div>

                <!-- Botón de submit -->
                <div class="text-center mt-4">
                <button type="submit" class="petreg-btn petreg-btn-primary">
                    <i class="fas fa-save mr-2"></i> Registrar Mascota
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    </div>
    </div>
`;

function RegistroMascota() {
  return (
    <div dangerouslySetInnerHTML={{ __html: registroMascotaHTML }} />
  );
}

export default RegistroMascota;
