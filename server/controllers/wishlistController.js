const Product = require("../models/Product");
const Wishlist = require("../models/Wishlist");

//add items to wishlist
const addToWishlist = async (req,res)=>{
    try{
        const userId = req.user;
        const {productId} = req.body;

        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({
                message:"Product not found",
            });
        }

        let wishlist=await Wishlist.findOne({user:userId});
        if(!wishlist){
            wishlist = await Wishlist.create({
                user:userId,
                items:[
                    {
                        product:productId,
                    }
                ]
            });
            return res.status(201).json({
            message: "Product added to wishlist",
            wishlist,
            });
        }
        let existingItem=wishlist.items.find(
            (item)=>item.product.toString() === productId
        );
        if(existingItem){
            return res.status(400).json({
                message:"Product already in wishlist"
            });
        }
        wishlist.items.push({
            product:productId,
        });
        await wishlist.save();

        return res.status(200).json({
            message:"Product added to wishlist",
            wishlist,
        });

    }catch(error){
       res.status(500).json({
       message: error.message,
    });
    }
}

//get wishList
const getWishlist=async (req,res)=>{
    try{
        const userId = req.user;
        const wishlist= await Wishlist.findOne({
            user:userId,
        }).populate("items.product");

        if (!wishlist) {
            return res.status(200).json({
            items: [],
    });
}
        res.status(200).json({
         items: wishlist.items,
    });

    }catch(error){
         res.status(500).json({
       message: error.message,
    });
    }
}


//Remove from wishlist
const removeFromWishlist= async (req,res)=>{
    try{
        const userId = req.user;
        const {productId} =req.params;

        const wishlist = await Wishlist.findOne({
            user:userId,
        });

        if(!wishlist){
            return res.status(404).json({
                message:"wishlist not found",
            });
        }
        const originalLength = wishlist.items.length;

        wishlist.items = wishlist.items.filter(
            (item) => item.product.toString() !== productId,
        );

        if (wishlist.items.length === originalLength) {
        return res.status(404).json({
        message: "Product not found in wishlist",
        });
    }

        await wishlist.save();

        return res.status(200).json({
        message: "Product removed from wishlist",
        wishlist,
    });

    }catch(error){
        return res.status(500).json({
            message:error.message,
        });
    }
}

module.exports={
    addToWishlist,
    getWishlist,
    removeFromWishlist,

};