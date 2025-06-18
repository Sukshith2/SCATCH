
const upload = require('../config/multer');
const productModel = require('../models/product_model');


module.exports.productauth = [
  upload.single("image"),  // middleware 1
  async (req, res) => {     // middleware 2
    try {
      let { productname, price, discount, bgcolour, panelcolour, textcolour } = req.body;

      let product = await productModel.create({
        image: req.file.buffer,
        productname,
        price,
        discount,
        bgcolour,
        panelcolour,
        textcolour
      });

     req.flash("success", "Product created successfully"); 
       res.redirect("/owner/admin");
    
    } catch (error) {
      console.error(error);
      req.flash("error", "Something went wrong");
       res.redirect("/owner/admin");
    }
  }
];
