const $ = (el) => document.querySelector(el);

const $$ = (el) => document.querySelectorAll(el);

import customers from "./customers.json" with {type: "json"};


const btn = $$("li");

console.log(btn);
