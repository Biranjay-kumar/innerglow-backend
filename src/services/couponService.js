import couponRepository from "../repository/couponRepository.js";
import  generateCouponCode  from "../utils/couponUtils.js";  // Assuming you have a utility to generate coupon codes

class CouponService {
  // Create a new coupon
  async createCoupon(data) {
    try {
      // Generate a unique coupon code
      const code = generateCouponCode();
      data.code = code;
      const newCoupon = await couponRepository.createCoupon(data);
      return newCoupon;
    } catch (error) {
      throw new Error("Error creating coupon: " + error.message);
    }
  }

  // Validate coupon by code
  async validateCoupon(code) {
    try {
      const coupon = await couponRepository.findCouponByCode(code);
      if (!coupon) {
        throw new Error("Coupon not found");
      }
      if (coupon.isExpired) {
        throw new Error("Coupon has expired");
      }
      return coupon;
    } catch (error) {
      throw new Error("Coupon validation failed: " + error.message);
    }
  }

  // Get coupon by ID
  async getCouponById(couponId) {
    try {
      return await couponRepository.findCouponById(couponId);
    } catch (error) {
      throw new Error("Error getting coupon by ID: " + error.message);
    }
  }

  // Update a coupon
  async updateCoupon(couponId, data) {
    try {
      return await couponRepository.updateCoupon(couponId, data);
    } catch (error) {
      throw new Error("Error updating coupon: " + error.message);
    }
  }

  // Delete a coupon
  async deleteCoupon(couponId) {
    try {
      return await couponRepository.deleteCoupon(couponId);
    } catch (error) {
      throw new Error("Error deleting coupon: " + error.message);
    }
  }
}

export default new CouponService();
