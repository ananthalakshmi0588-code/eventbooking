const express = require("express");
const router = express.Router();

const Booking = require("../models/booking");
const Event = require("../models/Event");
const auth = require("../middleware/authMiddleware");

// ==========================
// CREATE BOOKING
// ==========================
router.post("/", auth, async (req, res) => {
  try {
    const { eventId, tickets, totalAmount } = req.body;

    console.log("req.user:", req.user);

    // Check authenticated user
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const booking = await Booking.create({
      user: req.user._id,
      event: eventId,
      tickets,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      message: "Booking Successful",
      data: booking,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ==========================
// MY BOOKINGS (Logged In User)
// ==========================
router.get("/my-bookings", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("event")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: bookings,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ==========================
// GET ALL BOOKINGS (Admin)
// ==========================
router.get("/", auth, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("event", "title date location image");

    res.status(200).json({
      success: true,
      data: bookings,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ==========================
// DELETE / CANCEL BOOKING
// ==========================
router.delete("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Booking Cancelled",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;