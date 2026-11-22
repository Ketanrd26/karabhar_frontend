import { orderApi } from "../../utils/Api";

export const purchaseDataLayer = async (orderId) => {
  const orderresponse = await orderApi.get(
    `api/order/gaDataLayer?orderId=${orderId}`,
  );

  const order = orderresponse?.data?.data;

  if (!orderId || !order?.items?.length) return;

  window.dataLayer = window.dataLayer || [];

  // Clear previous ecommerce object
  window.dataLayer.push({ ecommerce: null });

  const currency = order.currency || "INR";

  window.dataLayer.push({
    event: "purchase",

    ecommerce: {
      transaction_id: String(orderId),
      affiliation: "JungleBoosh Website",
      value: parseFloat(order.totalAmount) || 0,
      tax: parseFloat(order.taxAmount) || 0,
      shipping: parseFloat(order?.orderSummary?.deliveryFee) || 0,
      currency: "INR",
      coupon: order.couponCode || "",

      items: order.items.map((product) => ({
        item_id: product.productId, // Required
        item_name: product?.productSnapshot?.name || "",
        item_brand: product.brand || "",
        item_category: product?.prdResponse?.Category || "",
        item_category2: product?.prdResponse?.Sub_category || "",
        item_variant: product?.productSnapshot?.variantId || "",
        price: parseFloat(product?.productSnapshot?.priceAtPurchase) || 0,
        quantity: parseInt(product.quantity) || 1,
      })),
    },

    autoengina: {
      tid: String(order.orderId),
      value: parseFloat(order.totalAmount) || 0,
      currency: currency,

      first_name: order.buyerName || "",
      last_name: order?.lastName || "",
      street: order?.address1 || "",
      city: order?.city || "",
      region: order?.state || "",
      postal_code: order?.pincode || "",
      country: order.billingAddress?.country || "India",

      email: order?.email || "",
      phone: (order?.contact || "").replace(/\s+/g, ""),
    },
  });
};
