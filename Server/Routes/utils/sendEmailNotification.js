const transporter = require("../../nodeMailer/transporter");
const sendEmailNotification = (subject, email, message, data) => {
  // switch (subject) {
  //   case "payment":
  //     message = message;
  //     break;

  //   case "startWalk":
  //     message = message;
  //     break;

  //   case "finishWalk":
  //     message = message;
  //     break;

  //   case "review":
  //     message = message;
  //     break;

  //   default:
  //     message = "Notificacion";
  // }

  if (email === "admin@woofer.com") {
    //si es el admin lo reemplazo por un email que exista
    email = "lucaszibaitis@gmail.com";
    // email = "Correasmv@gmail.com";
    // email = "germi560@gmail.com";
    // email = "silvialilianagarcia@hotmail.com";
  } else {
    if (email.includes("@woofer.com"))
      //si es un email de prueba lo reemplazo por uno que existe
      // email = "silvialilianagarcia.slg@gmail.com";
      // email = "Correasmv@gmail.com";
      // email = "teten08@hotmail.com";
      email = "lucaszibaitis@gmail.com";
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

module.exports = {
  sendEmailNotification,
};
