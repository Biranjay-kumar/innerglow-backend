import CouponService from "../services/couponService.js";
import  handleError  from "../utils/errorHandler.js"; // Assuming a global error handler

class CouponController {
  // Create a new coupon
  async create(req, res) {
    const { discount, validUntil, isExpired } = req.body;

    try {
      const newCoupon = await CouponService.createCoupon({
        discount,
        validUntil,
        isExpired,
      });
      return res.status(201).json({
        success: true,
        message: "Coupon created successfully",
        data: newCoupon,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async validate(req, res) {
    const { code } = req.body;

    try {
      const coupon = await CouponService.validateCoupon(code);
      return res.status(200).json({
        success: true,
        message: "Coupon validated successfully",
        data: coupon,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  // Get coupon by ID
  async getCoupon(req, res) {
    const { couponId } = req.params;

    try {
      const coupon = await CouponService.getCouponById(couponId);
      return res.status(200).json({
        success: true,
        message: "Coupon retrieved successfully",
        data: coupon,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  // Update coupon
  async update(req, res) {
    const { couponId } = req.params;
    const data = req.body;

    try {
      const updatedCoupon = await CouponService.updateCoupon(couponId, data);
      return res.status(200).json({
        success: true,
        message: "Coupon updated successfully",
        data: updatedCoupon,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  // Delete coupon
  async delete(req, res) {
    const { couponId } = req.params;

    try {
      const deletedCoupon = await CouponService.deleteCoupon(couponId);
      res.status(200).json({
        success: true,
        message: "Coupon deleted successfully",
        data: deletedCoupon,
      });
    } catch (error) {
      handleError(res, error);
    }
  }
}

export default new CouponController();
