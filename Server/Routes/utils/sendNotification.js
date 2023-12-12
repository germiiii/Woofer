const sendNotification = (subject, email, data, message) => {
  
    switch (subject) {
      case "payment":
        message = message;
        break;
  
      case "startWalk":
        message = message;
        break;
  
      case "finishWalk":
        message = message;
        break;
  
      case "review":
        message = message;
        break;
  
      default:
        message = "Notificacion";
    }
  
    const mailOptions = {
      from: "woofer@gmail.com",
      to: email,
      subject: subject,
      text: message,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`Error al enviar el correo de ${subject}:`, error);
      } else {
        console.log(`Correo de ${subject} enviado:`, info.response);
      }
    });
};