const Listing=require("../models/listing.js");
const { listingSchema } = require("../schema.js");

module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });

}

module.exports.renderNewForm=(req, res) => {
    res.render("./listings/new.ejs");
};

module.exports.showListing=async (req, res) => {
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
};

module.exports.createListing=async (req, res, next) => {
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
    }

    module.exports.renderEditForm=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("./listings/edit.ejs", { listing });
}

module.exports.updateListing=async (req, res) => {
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
    };

    module.exports.destroyListing=async (req, res) => {
        let { id } = req.params;
        let deleteListing = await Listing.findByIdAndDelete(id);
        console.log(deleteListing);
        req.flash("success", " Listing Deleted!");
    
        res.redirect("/listings");
    };