import Coupon from "../models/couponModel.js";  // Assuming you have a Coupon model

class CouponRepository {
  // Create a new coupon
  async createCoupon(data) {
    try {
      const coupon = new Coupon(data);
      await coupon.save();
      return coupon;
    } catch (error) {
      throw new Error("Error creating coupon: " + error.message);
    }
  }

  // Find a coupon by code
  async findCouponByCode(code) {
    try {
      return await Coupon.findOne({ code });
    } catch (error) {
      throw new Error("Error finding coupon by code: " + error.message);
    }
  }

  // Find a coupon by ID
  async findCouponById(couponId) {
    try {
      return await Coupon.findById(couponId);
    } catch (error) {
      throw new Error("Error finding coupon by ID: " + error.message);
    }
  }

  // Update a coupon
  async updateCoupon(couponId, data) {
    try {
      return await Coupon.findByIdAndUpdate(couponId, data, { new: true });
    } catch (error) {
      throw new Error("Error updating coupon: " + error.message);
    }
  }

  // Delete a coupon
  async deleteCoupon(couponId) {
    try {
      return await Coupon.findByIdAndDelete(couponId);
    } catch (error) {
      throw new Error("Error deleting coupon: " + error.message);
    }
  }
}

export default new CouponRepository();
