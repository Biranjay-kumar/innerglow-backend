function generateCouponCode(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';  // Allowed characters for the coupon code
  let couponCode = '';

  // Loop through and generate a random code
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    couponCode += characters.charAt(randomIndex);
  }

  return couponCode;
}

export default generateCouponCode;
