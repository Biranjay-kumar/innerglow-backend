import CouponService from "../services/couponService.js";
import  next  from "../utils/errorHandler.js"; // Assuming a global error handler

class CouponController {
  // Create a new coupon
  async create(req, res, next) {
    const { discount, validUntil, isExpired, discountPercentage } = req.body;

    try {
      const newCoupon = await CouponService.createCoupon({
        discount,
        validUntil,
        isExpired,
        discountPercentage,
      });
      return res.status(201).json({
        success: true,
        message: "Coupon created successfully",
        data: newCoupon,
      });
    } catch (error) {
      next(error);
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
      next(res, error);
    }
  }

  // Get coupon by ID
  async getCoupon(req, res, next) {
    const  couponId  = req.params.couponId;

    try {
      const coupon = await CouponService.getCouponById(couponId);
      return res.status(200).json({
        success: true,
        message: "Coupon retrieved successfully",
        data: coupon,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update coupon
  async update(req, res, next) {
    const  couponId  = req.params.couponId;
    const data = req.body;

    try {
      const updatedCoupon = await CouponService.updateCoupon(couponId, data);
      return res.status(200).json({
        success: true,
        message: "Coupon updated successfully",
        data: updatedCoupon,
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete coupon
  async delete(req, res, next) {
    const  couponId  = req.params.couponId;

    try {
      const deletedCoupon = await CouponService.deleteCoupon(couponId);
      res.status(200).json({
        success: true,
        message: "Coupon deleted successfully",
        data: deletedCoupon,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CouponController();
