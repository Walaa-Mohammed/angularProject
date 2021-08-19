using BL.AppServices;
using BL.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Api.Controllers
{
   [Route("api/[controller]")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        ProductWishListAppService _productWishListAppService;
        ProductAppService _productAppService;
        WishlistAppService _wishlistAppService;
        IHttpContextAccessor _httpContextAccessor;
        public WishlistController(ProductWishListAppService productWishListAppService,
                                  ProductAppService productAppService,
                                  WishlistAppService wishlistAppService,
                                  IHttpContextAccessor httpContextAccessor)

        {
            this._productAppService = productAppService;
            this._wishlistAppService = wishlistAppService;
            this._productWishListAppService = productWishListAppService;
            this._httpContextAccessor = httpContextAccessor;
        }
        [HttpGet]
        public IActionResult getUserWishList()
        {
            //get all products in specfic wishlist
            //firs get cart id of logged user
            var userID = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
           
            var productIDs = _productWishListAppService.GetAllProductWishList().Where(w => w.wishlistId == userID).Select(wpr => wpr.productId);
            List<ProductViewModel> productViewModels = new List<ProductViewModel>();
            foreach (var proID in productIDs)
            {
                var product = _productAppService.GetProduct(proID);
                productViewModels.Add(product);
            }
            return Ok(productViewModels);
        }
       
        [HttpPost("{productID}")]
        public IActionResult AddProductToWishList(int productID)
        {
            //get wishlist of current logged user
            var userID = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
          
            var productWishListViewModel = new ProductWishListViewModel() { wishlistId = userID, productId = productID };
           
            var isExistingProductWishListViewModel = _productWishListAppService.CheckIfProductExistsInWishlist(userID, productID);
            if (isExistingProductWishListViewModel == false)
            {
                _productWishListAppService.SaveNewProductWishlist(productWishListViewModel);
                return Ok();
            }
            return BadRequest("this product already exist in wishList");
        }
        [HttpDelete("{productID}")]
        public IActionResult DeleteFromWishList(int productID)
        {
            var userID = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var isExistingProductWishListViewModel = _productWishListAppService.CheckIfProductExistsInWishlist(userID, productID);
            if (isExistingProductWishListViewModel == true)
            {
                _productWishListAppService.DeleteProductWishList(_productWishListAppService.GetProductWishlistID(userID,productID));
                return Ok();
            }
            return BadRequest("this product doesn't exist in wishList");
           

        }
    }
}
