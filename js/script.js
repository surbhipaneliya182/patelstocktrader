const canMakePaymentCache="canMakePaymentCache";function onBuyClicked(){if(!window.PaymentRequest)return void console.log("Web payments are not supported in this browser.");const e=document.querySelector('input[name="price"]:checked');if(!e)return void console.log("Please select a price.");const o=e.value,t=[{supportedMethods:["https://tez.google.com/pay"],data:{pa:"bencho3510@oksbi",pn:"Dev Patel",tr:"1234ABCD",url:"https://efinepay.com",mc:"7299",tn:"Purchase in Merchant"}}],n={total:{label:"Total",amount:{currency:"INR",value:o}},displayItems:[{label:"Original Amount",amount:{currency:"INR",value:o}}]},c={requestPayerPhone:!0};let a=null;try{a=new PaymentRequest(t,n,c)}catch(e){return void console.log("Payment Request Error: "+e.message)}if(!a)return void console.log("Web payments are not supported in this browser.");let s=window.setTimeout((function(){window.clearTimeout(s),a.abort().then((function(){console.log("Payment timed out after 20 minutes.")})).catch((function(){console.log("Unable to abort, user is in the process of paying.")}))}),3e5);a.show().then((function(e){window.clearTimeout(s),processResponse(e)})).catch((function(e){console.log(e)}))}function completePayment(e,o,t){e.complete(o).then((function(){console.log("Payment succeeds."),console.log(t)})).catch((function(e){console.log(e)}))}function handleNotReadyToPay(){alert("Google Pay is not ready to pay.")}
