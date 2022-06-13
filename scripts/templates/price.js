export function priceTemplate(data){
    const { price} = data;
    return `
        <p class="price">${price}€/jour</p>
        `;     
}
