export const getTealiumVars = (imageURL, displayTitle, props) => {
  return {
    imageURL,
    displayTitle,
    price: props.price,
    tealiumData: props.tealiumData,
    productURL: props.productURL,
    ltlShipMethodDesc: props.ltlShipMethodDesc,
    jdaCatId: props.jdaCatId,
    favoriteStore: props.favoriteStore,
    qtyPurchased: props.qtyPurchased,
    qtyRequested: props.qtyRequested,
    personalisedCode: props.personalisedCode,
  };
};

export default getTealiumVars;
