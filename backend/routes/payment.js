const Service = require("../models/service");
const express = require("express");
var request = require("request");

async function initiate(req, res) {
  const serviceid = req.params["serviceid"];
  console.log(serviceid);
  const service = await Service.findById(serviceid);
  const amount = service.basePrice * 100;
  console.log(amount);

  var options = {
    method: "POST",
    url: "https://dev.khalti.com/api/v2/epayment/initiate/",
    headers: {
      Authorization: "key 00f636e12e3144b8b517786d469a0b2a ",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      return_url: "http://localhost:3000/home",
      website_url: "http://localhost:3000/home",
      amount: amount,
      purchase_order_id: "Order01",
      purchase_order_name: "test",
      customer_info: {
        name: "Nidiv Kayastha",
        email: "nidiv@khalti.com",
        phone: "9861616161",
      },
    }),
  };
  request(options, function (error, response) {
    console.log(response.body);
    res.send(JSON.parse(response.body));

    if (error) throw new Error(error);
    console.log(response.body);
  });
}

module.exports = initiate;
