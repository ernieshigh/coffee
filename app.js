import API from "../coffee/services/API.js";
import Store from "../coffee/services/Store.js";
import { loadData } from "../coffee/services/Menu.js";
import Router from "../coffee/services/Router.js";

// get web components
import MenuPage from "../coffee/components/MenuPage.js";
import OrderPage from "../coffee/components/OrderPage.js";
import ProductsPage from "../coffee/components/ProductsPage.js";
import ProductItem from "../coffee/components/ProductItems.js";
import CartItem from "../coffee/components/CartItem.js";

window.app = {};

const $ = () => document.querySelector.call(this, arguments);
const $$ = () => document.querySelectorAll.call(this, arguments);
HTMLElement.prototype.on = () => this.addEventListener.call(this, arguments);
HTMLElement.prototype.off = () =>
  this.removeEventListener.call(this, arguments);
HTMLElement.prototype.$ = () => this.querySelector.call(this, arguments);
HTMLElement.prototype.$ = () => this.querySelectorAll.call(this, arguments);

app.store = Store;
app.router = Router;

window.addEventListener("DOMContentLoaded", async () => {
  loadData();
  app.router.init();
});

navigator.serviceWorker.register("./serviceworker.js");

window.addEventListener("appcartchange", (event) => {
  const badge = document.getElementById("badge");
  const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = qty;
  badge.hidden = qty == 0;
});
