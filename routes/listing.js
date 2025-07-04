const express = require("express");
const router = express.Router();
const wrapAsync = require("../utlis/wrapAsync.js");
const Listing = require("../models/listing.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utlis/ExpressError.js");  // also import ExpressError here if not imported yet
const { isLoggedIn,isOwner,validateListing } = require("../middleware.js");
const listingController=require("../controllers/listing.js");


//index route
router.get("/", wrapAsync(listingController.index)); //using mvc 

//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);//using mvc

//show route
router.get("/:id", wrapAsync(listingController.showListing));//using mvc

//edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));//using mvc

//update route
// app.put("/listings/:id", async (req, res) => {
//     let { id } = req.params;
//     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     res.redirect(`/listings/${id}`);
// })
router.put("/:id",isLoggedIn,isOwner,
    validateListing,
    wrapAsync(listingController.updateListing));


//delete route
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));//using mvc

//create route
router.post("/",isLoggedIn,
    validateListing,
    wrapAsync(listingController.createListing)//using mvc
);


module.exports = router;