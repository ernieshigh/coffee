import { getProductById } from "../services/Menu.js";
import { addToCart } from "../services/Order.js";

export default class ProductsPage extends HTMLElement {
  #user = {
    name: "",
    phone: "",
    email: "",
  };

  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const template = document.getElementById("products-page-template");
    const content = template.content.cloneNode(true);
    const styles = document.createElement("style");
    this.root.appendChild(content);
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch("../coffee/components/ProductsPage.css");
      styles.textContent = await request.text();
    }
    loadCSS();
  }

  async renderData() {
    if (this.dataset.productId) {
      this.product = await getProductById(this.dataset.productId);
      this.root.querySelector("h2").textContent = this.product.name;
      this.root.querySelector(
        "img"
      ).src = `../coffee/data/images/${this.product.image}`;
      this.root.querySelector(".description").textContent =
        this.product.description;
      this.root.querySelector(
        ".price"
      ).textContent = `$ ${this.product.price.toFixed(2)} ea`;
      this.root.querySelector("button").addEventListener("click", () => {
        // TODO
        addToCart(this.product.id);
        app.router.go("/order");
      });
    } else {
      alert("Invalid Product ID");
    }
  }

  connectedCallback() {
    this.renderData();
  }
}

customElements.define("products-page", ProductsPage);
