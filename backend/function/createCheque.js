import nodemailer from "nodemailer";
import dotenv from "dotenv"
import axios from "axios";


dotenv.config();
const service = process.env.MAIL_SERVICE
const user = process.env.MAIL_USER
const password = process.env.MAIL_PASSWORD


let transporter = nodemailer.createTransport({
    host: service,
    port: 465,
    secure: true,
    auth: {
        user: user,
        pass: password
    }
});

export default function sendEmail(data) {
  const recipient = data.email;
  async function fetchProductPrice(id) {
    try {
        
      const response = await axios.get(`http://localhost:5001/api/product/getproduct/${id}`); 
      return response.data.price;
    } catch (err) {
      console.error(`Ошибка при получении цены товара: ${err.message}`);
      throw err;
    }
  }
  
  async function formatProduct(productKey, productValue) {
    const name = productKey;
    const specification = productValue.specification;
    const color = Object.keys(specification)[0];
    const size = specification[color].size;
    const count = productValue.count;
    const pricePerItem = await fetchProductPrice(productValue.id);
  
    return `
      <p class="amount">
        ${name}, ${color}, ${size}, количество: ${count}
        <span>${pricePerItem * count} руб.</span>
      </p>
    `;
  }
  async function generateHTML() {
  const formattedProducts = [];

  for (const [key, value] of Object.entries(data.products)) {
    const formattedProduct = await formatProduct(key, value);
    formattedProducts.push(formattedProduct);
  }
  
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Bill</title>
      <style>
    body{
      max-width: 30%;
      padding: 1.5%;
      border: 1px solid black;
    }
      .header img{
        position: absolute;
        width: 50px;
        top: 20px;
        left: 20px;
      }
      .header{
        text-align: center;
      }
      .no-margin{
        margin: 0;
      }
      .left{
        float: left;
      }
      .right{
        float: right;
      }
      .roow{
        margin: -2px;
      }
      .margin-20{
        margin-right: 20px;
      }
      .centre{
        text-align: center;
      }
      .clearfix{
        clear: both;
      }
      .fees-content{
        padding: 30px 0px 30px 0px;
      }
      .amount span{
        float: right;
      }

      .signarea p{
        text-align: right;
        margin-top: 60px;
      }

    </style>
    </head>
    <body>
    <div class="body">
      <div class="header">
        <h3 class="no-margin">OnlineStore</h3>
        <h4 class="no-margin">Тестовый магазин для статьи на TimewebCloud</h4>
      </div>
      <div class="content">
        <div class="roow">
          <div class="left">
            <p>Номер заказа: ${data._id}</p>
          </div>
          <div class="right">
            <p class="margin-20">Дата: ${new Date(data.createdAt).toLocaleDateString('ru-RU')}</p>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="centre">
          <h3>Данные покупателя</h3>
        </div>
        <div>
          <p>Имя: ${data.firstName} ${data.lastName}</p>
          <p>Компания: ${data.company || ''}</p>
        </div>
        <hr/>
        <div class="centre">
          <h3>Содержимое заказа</h3>
        </div>
        <div class="fees-content">
          <!-- Продукты -->
          ${formattedProducts.join('')}
        </div>
        <hr/>
        <div>
          <p class="amount">Итого
            <span>${data.price}</span>
          </p>
        </div>
      </div>
    </div>
    </body>
    </html>
    `;
    return html
  }
  generateHTML().then(html => {
    let mailOptions = {
      from: '"Online-Store" <tutorial@testmailtw.ru>',
      to: recipient,
      subject: 'Спасибо за заказ',
      html: html
  };
  
  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          return console.log(error);
      }
      console.log('Сообщение успешно отправлено: %s', info.messageId);
  });
  }).catch(error => {
    console.error(error);
  });
    

    
}
