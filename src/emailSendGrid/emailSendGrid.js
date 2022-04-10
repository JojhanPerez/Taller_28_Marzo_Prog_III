const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmailConfirmation(customerName, orderNroSerie) {
  return `<!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      .responsive {
        width: 100%;
        height: auto;
      }
    </style>
  </head>

  <body>

    <img src="https://t-mobile.scene7.com/is/image/Tmusprod/netflix-hero.desktop?wid=1280&hei=360&fmt=png-alpha"
      class="responsive" alt="">

  </body>

  </html>`;
}

function getMessage(emailParams) {
  /**Establecemos los parametros requeridos para el envio del correo electronico */
  return {
    to: emailParams.toEmail,
    from: "luisegrijalba8@gmail.com",
    subject: "Confirmación pedido Serie NombreSerie",
    text: `Cordial saludo, ${emailParams.customerName}, te confirmamos la recepción pedido, y se ha generado una factura con la orden de compra ${emailParams.orderNroSerie}`,
    html: sendEmailConfirmation(
      emailParams.customerName,
      emailParams.orderNroSerie
    ),
  };
}

async function sendOrderSerie(emailParams) {
  try {
    await sgMail.send(getMessage(emailParams));
    return { message: "Confrimación de pedido recibido, ha sido enviada" };
  } catch (err) {
    const message = "No se pudo enviar la orden de compra al cliente";
    console.error(message);
    console.error(err)
    if (err.response) console.error(err.response.body);
    return { message };
  }
}

module.exports = { sendOrderSerie };
