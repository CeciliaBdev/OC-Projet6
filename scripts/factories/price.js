import { priceTemplate } from "../templates/price.js";

export function priceFactory(data) {
  //creation des éléments (image-ville-pays...)
  function getUserPriceDOM() {
    const p = document.createElement("p");

    p.innerHTML = priceTemplate(data);
    return p;
  }

  return { data, getUserPriceDOM };
}
