using BL.AppServices;
using BL.Dtos;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
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
    public class CartController : ControllerBase
    {
        ProductCartAppService _productCartAppService;
        ProductAppService _productAppService; 
        PaymentAppService _paymentAppService; 
        CartAppService _cartAppService;
        IHttpContextAccessor _httpContextAccessor;

        public CartController(ProductCartAppService productCartAppService,
            ProductAppService productAppService ,
            PaymentAppService paymentAppService ,
            CartAppService cartAppService ,
            IHttpContextAccessor httpContextAccessor)
        {
            this._productCartAppService = productCartAppService;
            this._productAppService = productAppService;
            this._paymentAppService = paymentAppService;
            this._cartAppService = cartAppService;
            this._httpContextAccessor = httpContextAccessor;
        }
        [HttpGet]
        public ActionResult Index()
        {

            //get all products in specfic cart
            //firs get cart id of logged user
            var userID = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
           
            var productCartVM = _productCartAppService.GetAllProductCart(userID);
           
            return Ok(productCartVM);
        }

        [HttpPost("{productID}")]
        [Authorize]
        public IActionResult AddProductToCart(int productID)
        {
            //get cart of current logged user
            var userID = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var productCart = new ProductCart() { CartID = userID, productId = productID };
            var isExistingProductCartViewModel = _productCartAppService.CheckIfProductExistsInCart(userID, productID);
            if (isExistingProductCartViewModel == false)
            {
                _productCartAppService.SaveNewProductCart(productCart);
                return Ok();
            }
            return BadRequest("This product already exist in cart");

        }

        [HttpDelete("{productID}")]
        public ActionResult DeleteProductFromCart(int productID)
        {
            var userID = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
           
            var isExistingProductCartViewModel = _productCartAppService.CheckIfProductExistsInCart(userID, productID);
            if (isExistingProductCartViewModel == true)
            {
                _productCartAppService.DeleteProductCart(_productCartAppService.GetProductCartID(userID,productID));
                return Ok();
            }
            return BadRequest("This product doesn't exist in cart");
        }
    }
}
