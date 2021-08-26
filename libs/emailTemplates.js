exports.activationEmail = (name, activationId) => (
    `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <title>HTML Email Template Project</title>
        <style type="text/css">
            @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');

            table {
                border-spacing: 0;
            }

            td {
                padding: 0;
            }

            p {
                font-size: 15px;
            }

            a {
                text-decoration: none;
                color: #fff;
            }

            img {
                border: 0;
            }

            .footer {
                padding: 20px 0 20px 0;
            }

            @media screen and (max-width: 599.98px) {
                .footer {
                    padding: 0px 0 0px 0;
                }

                .footer p {
                    font-size: 10px;
                }
            }

            @media screen and (max-width: 399.98px) {
                .footer {
                    padding: 0px 0 0px 0;
                }

                .footer p {
                    font-size: 10px;
                    padding: 0.5rem 1rem !important;
                    word-break: break-all;
                }

                /* .footer p.call-us {
                font-size: 10px;
                padding: .5rem .5rem !important;
                margin: 1rem .1rem 1rem 1rem !important;
            } */
            }

            /* Custom Dark Mode Colors */
            :root {
                color-scheme: light dark;
                supported-color-schemes: light dark;
            }

            @media (prefers-color-scheme: light) {
                body,
                center,
                table,
                p {
                    background-color: #2d2d2d !important;
                    color: #fff !important;
                }
            }
        </style>

        <!--[if (gte mso 9)|(IE)]>
            <style type="text/css">
                table {
                    border-collapse: collapse !important;
                }
            </style>
        <![endif]-->
    </head>
    <body style="Margin:0;padding:0;min-width:100%;background-color:#dde0e1;">

    <!--[if (gte mso 9)|(IE)]>
      <style type="text/css">
         body {background-color:#dde0e1!important;}
         body, table, td, p, a {font-family: sans-serif, Arial, Helvitica!important;}
      </style>
   <![endif]-->

    <center style="width: 100%;table-layout: fixed;background-color:#dde0e1;padding-bottom: 40px;">
        <div style="max-width: 600px;background-color: #fafdfe;box-shadow: 0 0 10px rgba(0, 0, 0, .2);">

            <!-- Preheader (remove comment) -->
            <div
                style="font-size: 0px;color: #fafdfe;line-height: 1px;mso-line-height-rule:exactly;display: none;max-width: 0px;max-height: 0px;opacity: 0;overflow: hidden;mso-hide:all;">
                <!-- Add Preheader Text Here (85-100 characters in length) -->
            </div>
            <!-- End Preheader (remove comment) -->

            <!--[if (gte mso 9)|(IE)]>
            <table width="600" align="center" style="border-spacing:0;color:#565656;" role="presentation">
            <tr>
            <td style="padding:0;">
         <![endif]-->

            <table align="center"
                style="border-spacing:0;color:#565656;font-family: 'Lato', sans-serif, Arial, Helvitica!important;background-color: #fafdfe;Margin:0;padding:0;width: 100%;max-width: 600px;"
                role="presentation">


                <!-- START SOCIAL ICONS -->
                <tr>
                    <td style="padding: 0;">
                        <table width="100%" style="border-spacing: 0;" role="presentation">

                            <tr>
                                <td height="3" style="background-color: #000;"></td>
                            </tr>
                            <tr>
                                <td style="background-color: #000;text-align: center;padding: 20px 0 20px 0;">
                                    <a href="https://example.com" target="_blank">
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Shopping_cart_icon.svg/1200px-Shopping_cart_icon.svg.png"
                                            alt="e-commerce"
                                            title="e-commerce"
                                            width="200"
                                            border="0"
                                        />
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td height="2" style="background-color: #000;"></td>
                            </tr>

                        </table>
                    </td>
                </tr>
                <!-- END SOCIAL ICONS -->

                <!-- START LOGO -->
                <tr>
                    <td style="padding: 0;">
                        <table width="100%" style="border-spacing: 0; background-color: #fafdfe;" role="presentation">
                            <tr>
                                <td style="padding: 20px 0 0px 50px;text-align: left;">
                                    <h2>Hello ${name}</h2>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0px 30px 20px 50px;text-align: left;">
                                    <p>Welcome to ${process.env.COMPANY_NAME}</p>
                                    <p>To active your account please click on the below link</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0px 30px 10px 50px;text-align: left;">
                                    <a href="${activationId}"
                                        style="background-color: #000;padding: 1rem 1rem;color:#ffff;text-decoration: none;border-radius: 5px;">Open
                                        Request</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 15px 30px 30px 50px;text-align: left;">
                                    <p style="margin: 0;">Have a great day !</p>
                                    <p style="margin: 0;"> ${process.env.COMPANY_NAME} Team</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- END LOGO -->

                <!-- START FOOTER -->
                <tr>
                    <td style="padding: 0;">
                        <table width="100%" style="border-spacing: 0;" role="presentation">
                            <tr style="background-color: #000;color:#fff;">

                                <td class="footer"
                                    style="text-align: left;margin: 1rem;padding:1rem;font-size: 16px;width: 300px;background-color: #000;font-size: 13px;">
                                    <p class="call-us">
                                        Street name
                                    </p>
                                    <p>Area/ Location details</p>
                                    <p>District</p>
                                    <p>
                                        <a href="mailto:info@e-commerce-platform.com">Email: info@e-commerce-platform.com</a>
                                    </p>
                                    <p>
                                        <a href="tel:123456789">Phone: 123456789</a>
                                    </p>
                                </td>

                                <td class="footer"
                                    style="text-align: center;margin: 1rem;padding:1rem;font-size: 16px;width: 300px;background-color: #000;">
                                    <p><a href="#" target="_blank" style="font-size: 16px;color:#fff, text-decoration:none">www.e-commerce-platform.com</a></p>
                                    <p>Genuine and we act on it.</p>
                                </td>

                                <td class="footer"
                                    style="text-align: center;padding:1rem;margin: 1rem;font-size: 16px;width: 300px;background-color: #000;">
                                    <table>
                                        <tr>
                                            <td style="width: 100px;text-align: center">
                                                <a href="https://facebook.com" target="_blank">
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/100px-Facebook_f_logo_%282019%29.svg.png"
                                                        alt="facebook" height="25px">
                                                </a>
                                            </td>
                                            <td style="width: 100px;text-align: center">
                                                <a href="https://instagram.com" target="_blank">
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/100px-Instagram_logo_2016.svg.png"
                                                        alt="instagram" height="25px">
                                                </a>

                                            </td>
                                            <td style="width: 100px;text-align: center">
                                                <a href="https://twitter.com" target="_blank">
                                                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/6/60/Twitter_Logo_as_of_2021.svg/100px-Twitter_Logo_as_of_2021.svg.png"
                                                        alt="twitter" height="25px">
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
                <!-- END FOOTER -->


            </table>

            <!--[if (gte mso 9)|(IE)]>
         </td>
         </tr>
         </table>
         <![endif]-->


        </div>
    </center>

</body>
</html>`
)


exports.passwordResetEmail = (name, resetLink) => (
    `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="color-scheme" content="light dark" />
            <meta name="supported-color-schemes" content="light dark" />
            <title>HTML Email Template Project</title>
            <style type="text/css">
                @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
    
                table {
                    border-spacing: 0;
                }
    
                td {
                    padding: 0;
                }
    
                p {
                    font-size: 15px;
                }
    
                a {
                    text-decoration: none;
                    color: #fff;
                }
    
                img {
                    border: 0;
                }
    
                .footer {
                    padding: 20px 0 20px 0;
                }
    
                @media screen and (max-width: 599.98px) {
                    .footer {
                        padding: 0px 0 0px 0;
                    }
    
                    .footer p {
                        font-size: 10px;
                    }
                }
    
                @media screen and (max-width: 399.98px) {
                    .footer {
                        padding: 0px 0 0px 0;
                    }
    
                    .footer p {
                        font-size: 10px;
                        padding: 0.5rem 1rem !important;
                        word-break: break-all;
                    }
    
                    /* .footer p.call-us {
                    font-size: 10px;
                    padding: .5rem .5rem !important;
                    margin: 1rem .1rem 1rem 1rem !important;
                } */
                }
    
                /* Custom Dark Mode Colors */
                :root {
                    color-scheme: light dark;
                    supported-color-schemes: light dark;
                }
    
                @media (prefers-color-scheme: light) {
                    body,
                    center,
                    table,
                    p {
                        background-color: #2d2d2d !important;
                        color: #fff !important;
                    }
                }
            </style>
    
            <!--[if (gte mso 9)|(IE)]>
                <style type="text/css">
                    table {
                        border-collapse: collapse !important;
                    }
                </style>
            <![endif]-->
        </head>
        <body style="Margin:0;padding:0;min-width:100%;background-color:#dde0e1;">
    
        <!--[if (gte mso 9)|(IE)]>
          <style type="text/css">
             body {background-color:#dde0e1!important;}
             body, table, td, p, a {font-family: sans-serif, Arial, Helvitica!important;}
          </style>
       <![endif]-->
    
        <center style="width: 100%;table-layout: fixed;background-color:#dde0e1;padding-bottom: 40px;">
            <div style="max-width: 600px;background-color: #fafdfe;box-shadow: 0 0 10px rgba(0, 0, 0, .2);">
    
                <!-- Preheader (remove comment) -->
                <div
                    style="font-size: 0px;color: #fafdfe;line-height: 1px;mso-line-height-rule:exactly;display: none;max-width: 0px;max-height: 0px;opacity: 0;overflow: hidden;mso-hide:all;">
                    <!-- Add Preheader Text Here (85-100 characters in length) -->
                </div>
                <!-- End Preheader (remove comment) -->
    
                <!--[if (gte mso 9)|(IE)]>
                <table width="600" align="center" style="border-spacing:0;color:#565656;" role="presentation">
                <tr>
                <td style="padding:0;">
             <![endif]-->
    
                <table align="center"
                    style="border-spacing:0;color:#565656;font-family: 'Lato', sans-serif, Arial, Helvitica!important;background-color: #fafdfe;Margin:0;padding:0;width: 100%;max-width: 600px;"
                    role="presentation">
    
    
                    <!-- START SOCIAL ICONS -->
                    <tr>
                        <td style="padding: 0;">
                            <table width="100%" style="border-spacing: 0;" role="presentation">
    
                                <tr>
                                    <td height="3" style="background-color: #000;"></td>
                                </tr>
                                <tr>
                                    <td style="background-color: #000;text-align: center;padding: 20px 0 20px 0;">
                                        <a href="https://example.com" target="_blank">
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Shopping_cart_icon.svg/1200px-Shopping_cart_icon.svg.png"
                                                alt="e-commerce"
                                                title="e-commerce"
                                                width="200"
                                                border="0"
                                            />
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="2" style="background-color: #000;"></td>
                                </tr>
    
                            </table>
                        </td>
                    </tr>
                    <!-- END SOCIAL ICONS -->
    
                    <!-- START LOGO -->
                    <tr>
                        <td style="padding: 0;">
                            <table width="100%" style="border-spacing: 0; background-color: #fafdfe;" role="presentation">
                                <tr>
                                    <td style="padding: 20px 0 0px 50px;text-align: left;">
                                        <h2>Hello, ${name}</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0px 30px 20px 50px;text-align: left;">
                                        <p>To change your password please click the below button</p>
                                        <p>The link will be valid for 5 minutes.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0px 30px 10px 50px;text-align: left;">
                                        <a href="${resetLink}"
                                            style="background-color: #000;padding: 1rem 1rem;color:#ffff;text-decoration: none;border-radius: 5px;">Open
                                            Request</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 15px 30px 30px 50px;text-align: left;">
                                        <p style="margin: 0;">Have a great day !</p>
                                        <p style="margin: 0;"> ${process.env.COMPANY_NAME} Team</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- END LOGO -->
    
                    <!-- START FOOTER -->
                    <tr>
                        <td style="padding: 0;">
                            <table width="100%" style="border-spacing: 0;" role="presentation">
                                <tr style="background-color: #000;color:#fff;">
    
                                    <td class="footer"
                                        style="text-align: left;margin: 1rem;padding:1rem;font-size: 16px;width: 300px;background-color: #000;font-size: 13px;">
                                        <p class="call-us">
                                            Street name
                                        </p>
                                        <p>Area/ Location details</p>
                                        <p>District</p>
                                        <p>
                                            <a href="mailto:info@e-commerce-platform.com">Email: info@e-commerce-platform.com</a>
                                        </p>
                                        <p>
                                            <a href="tel:123456789">Phone: 123456789</a>
                                        </p>
                                    </td>
    
                                    <td class="footer"
                                        style="text-align: center;margin: 1rem;padding:1rem;font-size: 16px;width: 300px;background-color: #000;">
                                        <p><a href="#" target="_blank" style="font-size: 16px;color:#fff, text-decoration:none">www.e-commerce-platform.com</a></p>
                                        <p>Genuine and we act on it.</p>
                                    </td>
    
                                    <td class="footer"
                                        style="text-align: center;padding:1rem;margin: 1rem;font-size: 16px;width: 300px;background-color: #000;">
                                        <table>
                                            <tr>
                                                <td style="width: 100px;text-align: center">
                                                    <a href="https://facebook.com" target="_blank">
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/100px-Facebook_f_logo_%282019%29.svg.png"
                                                            alt="facebook" height="25px">
                                                    </a>
                                                </td>
                                                <td style="width: 100px;text-align: center">
                                                    <a href="https://instagram.com" target="_blank">
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/100px-Instagram_logo_2016.svg.png"
                                                            alt="instagram" height="25px">
                                                    </a>
    
                                                </td>
                                                <td style="width: 100px;text-align: center">
                                                    <a href="https://twitter.com" target="_blank">
                                                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/6/60/Twitter_Logo_as_of_2021.svg/100px-Twitter_Logo_as_of_2021.svg.png"
                                                            alt="twitter" height="25px">
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
    
                            </table>
                        </td>
                    </tr>
                    <!-- END FOOTER -->
    
    
                </table>
    
                <!--[if (gte mso 9)|(IE)]>
             </td>
             </tr>
             </table>
             <![endif]-->
    
    
            </div>
        </center>
    
    </body>
    </html>`
)