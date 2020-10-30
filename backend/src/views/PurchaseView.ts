import Purchase from "../models/Purchase";

export default {
  render(purchase: Purchase) {
    return {
      id: purchase.id,
      purchaseNumber: purchase.purchaseNumber,
      state: purchase.state,
      purchaseList: purchase.purchaseList,
    };
  },

  renderMany(purchase: Purchase[]) {
    return purchase.map(purchase => this.render(purchase));
  }
}