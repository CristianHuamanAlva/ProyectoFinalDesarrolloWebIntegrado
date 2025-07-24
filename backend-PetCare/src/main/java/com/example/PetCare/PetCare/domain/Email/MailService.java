package com.example.PetCare.PetCare.domain.Email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private static final String LOGO_URL = "https://www.petcarevetclinic.com/wp-content/uploads/2025/04/petcare-web-logo-img.png";
    private static final String PRIMARY_COLOR = "#e63946";
    private static final String SECONDARY_COLOR = "#457b9d";
    private static final String BACKGROUND_COLOR = "#f9f9f9";
    private static final String CARD_BACKGROUND = "#ffffff";
    private static final String TEXT_COLOR = "#333333";
    private static final String LIGHT_TEXT = "#666666";

    @Autowired
    private JavaMailSender mailSender;

    public void enviarReclamo(String correo, String nombre, String telefono, String direccion,
                              String tipoDocumento, String numeroDocumento, String tipoReclamo,
                              String fechaIncidente, String detalleReclamo, String expectativaSolucion) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo("davearmandosilvaalva@gmail.com");
            helper.setSubject("📢 Nuevo " + tipoReclamo + " de Usuario - PetCare Vet Clinic");

            String contenidoHtml = buildEmailTemplate(
                    nombre, tipoDocumento, numeroDocumento, correo, telefono, direccion,
                    tipoReclamo, fechaIncidente, detalleReclamo, expectativaSolucion
            );

            helper.setText(contenidoHtml, true);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            System.err.println("❌ Error al enviar correo: " + e.getMessage());
        }
    }

    private String buildEmailTemplate(String nombre, String tipoDocumento, String numeroDocumento,
                                      String correo, String telefono, String direccion,
                                      String tipoReclamo, String fechaIncidente,
                                      String detalleReclamo, String expectativaSolucion) {

        String tipoReclamoFormatted = tipoReclamo.substring(0, 1).toUpperCase() + tipoReclamo.substring(1);

        return "<!DOCTYPE html>" +
                "<html lang='es'>" +
                "<head>" +
                "   <meta charset='UTF-8'>" +
                "   <meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                "   <title>Nuevo " + tipoReclamoFormatted + "</title>" +
                "   <style>" +
                "       body { margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: " + BACKGROUND_COLOR + "; }" +
                "       .container { max-width: 800px; margin: 0 auto; }" +
                "       .header { background: linear-gradient(135deg, " + PRIMARY_COLOR + ", " + SECONDARY_COLOR + "); padding: 30px 0; text-align: center; }" +
                "       .logo-container { background-color: white; display: inline-block; padding: 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }" +
                "       .logo { max-width: 250px; height: auto; }" +
                "       .card { background-color: " + CARD_BACKGROUND + "; margin: 30px; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden; }" +
                "       .card-header { background-color: " + SECONDARY_COLOR + "; color: white; padding: 20px; font-size: 22px; font-weight: bold; text-align: center; }" +
                "       .card-body { padding: 30px; }" +
                "       .section-title { color: " + PRIMARY_COLOR + "; font-size: 18px; margin-top: 25px; margin-bottom: 15px; font-weight: bold; border-bottom: 2px solid #eee; padding-bottom: 8px; }" +
                "       .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }" +
                "       .info-item { margin-bottom: 15px; }" +
                "       .info-label { font-weight: bold; color: " + TEXT_COLOR + "; font-size: 15px; }" +
                "       .info-value { color: " + LIGHT_TEXT + "; font-size: 15px; }" +
                "       .content-box { background-color: #f8f9fa; padding: 20px; border-left: 5px solid " + PRIMARY_COLOR + "; margin: 20px 0; border-radius: 6px; font-size: 15px; line-height: 1.6; }" +
                "       .footer { text-align: center; padding: 25px; color: " + LIGHT_TEXT + "; font-size: 13px; background-color: #f0f0f0; margin-top: 30px; }" +
                "       .highlight-box { background-color: #e3f2fd; border-left: 5px solid " + SECONDARY_COLOR + "; padding: 20px; margin: 20px 0; border-radius: 6px; font-size: 15px; line-height: 1.6; }" +
                "       .divider { height: 1px; background-color: #e0e0e0; margin: 25px 0; }" +
                "   </style>" +
                "</head>" +
                "<body>" +
                "   <div class='container'>" +
                "       <div class='header'>" +
                "           <div class='logo-container'>" +
                "               <img src='" + LOGO_URL + "' alt='PetCare Vet Clinic' class='logo'>" +
                "           </div>" +
                "       </div>" +
                "       " +
                "       <div class='card'>" +
                "           <div class='card-header'>Nueva Queja Registrada</div>" + // Título modificado a "Nueva Queja"
                "           <div class='card-body'>" +
                "               <div class='section-title'>Información del Cliente</div>" +
                "               " +
                "               <div class='info-grid'>" +
                "                   <div class='info-item'><span class='info-label'>Nombre:</span><br> <span class='info-value'>" + nombre + "</span></div>" +
                "                   <div class='info-item'><span class='info-label'>Documento:</span><br> <span class='info-value'>" + tipoDocumento + " " + numeroDocumento + "</span></div>" +
                "                   <div class='info-item'><span class='info-label'>Correo:</span><br> <span class='info-value'>" + correo + "</span></div>" +
                "                   <div class='info-item'><span class='info-label'>Teléfono:</span><br> <span class='info-value'>" + telefono + "</span></div>" +
                "                   <div class='info-item'><span class='info-label'>Dirección:</span><br> <span class='info-value'>" + direccion + "</span></div>" +
                "               </div>" +
                "               " +
                "               <div class='divider'></div>" +
                "               " +
                "               <div class='section-title'>Detalles de la Queja</div>" + // Cambiado a "Detalles de la Queja"
                "               <div class='info-item'><span class='info-label'>Fecha del incidente:</span> <span class='info-value'>" + fechaIncidente + "</span></div>" +
                "               " +
                "               <div class='info-item'><span class='info-label'>Detalle:</span></div>" +
                "               <div class='content-box'>" + detalleReclamo.replaceAll("\n", "<br/>") + "</div>" +
                "               " +
                "               <div class='info-item'><span class='info-label'>Expectativa de solución:</span></div>" +
                "               <div class='highlight-box'>" + expectativaSolucion.replaceAll("\n", "<br/>") + "</div>" +
                "           </div>" +
                "       </div>" +
                "       " +
                "       <div class='footer'>" +
                "           <p><strong>PetCare Vet Clinic</strong> &copy; " + java.time.Year.now().getValue() + "</p>" +
                "           <p>Este es un correo automático, por favor no responda a este mensaje.</p>" +
                "           <p style='margin-top: 10px;'>" +
                "               <small>Horario de atención: Lunes a Viernes 8:00 am - 6:00 pm</small>" +
                "           </p>" +
                "       </div>" +
                "   </div>" +
                "</body>" +
                "</html>";
    }
}