const express = require("express");
const { models } = require("mongoose");
var request = require("request");

function initiate(req, res) {
  var options = {
    method: "POST",
    url: "https://dev.khalti.com/api/v2/epayment/initiate/",
    headers: {
      Authorization: "key 00f636e12e3144b8b517786d469a0b2a ",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      return_url: "http://localhost:3000/home",
      website_url: "https://example.com/",
      amount: "100000",
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
    res.redirect(JSON.parse(response.body).payment_url);
    if (error) throw new Error(error);
    console.log(response.body);
  });
}

module.exports = initiate;
