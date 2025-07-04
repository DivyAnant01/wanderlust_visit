const express = require("express");
const router = express.Router();
const wrapAsync = require("../utlis/wrapAsync.js");
const Listing = require("../models/listing.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utlis/ExpressError.js");  // also import ExpressError here if not imported yet
const { isLoggedIn,isOwner,validateListing } = require("../middleware.js");



//index route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });

}));

//new route
router.get("/new",isLoggedIn, (req, res) => {
    res.render("./listings/new.ejs");
})

//show route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{
        path:"author",
    },
})
.populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { listing });
}));

//edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("./listings/edit.ejs", { listing });
}));

//update route
// app.put("/listings/:id", async (req, res) => {
//     let { id } = req.params;
//     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     res.redirect(`/listings/${id}`);
// })
router.put("/:id",isLoggedIn,isOwner,
    validateListing,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const updatedData = req.body.listing;

        // Get existing listing to preserve image if not changed
        const existingListing = await Listing.findById(id);

        // If image field is missing or empty, keep the old image
        if (!updatedData.image || !updatedData.image.filename || !updatedData.image.url) {
            updatedData.image = existingListing.image;
        }


        await Listing.findByIdAndUpdate(id, updatedData);
        req.flash("success", "Listing Updated!");
        res.redirect(`/listings/${id}`);
    }));


//delete route
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success", " Listing Deleted!");

    res.redirect("/listings");
}));

//create route
router.post("/",isLoggedIn,
    validateListing,
    wrapAsync(async (req, res, next) => {
        let result = listingSchema.validate(req.body);
        console.log(result);
        if (result.error) {
            throw new ExpressError(400, result.error);
        }
        const newListing = new Listing(req.body.listing);
        newListing.owner=req.user._id;
        await newListing.save();
        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
    })
);


module.exports = router;