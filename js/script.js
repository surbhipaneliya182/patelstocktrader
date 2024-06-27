const canMakePaymentCache = 'canMakePaymentCache';
function onBuyClicked() {
  if (!window.PaymentRequest) {
    console.log('Web payments are not supported in this browser.');
    return;
  }

  // Get the selected price
  const selectedPrice = document.querySelector('input[name="price"]:checked');
  if (!selectedPrice) {
    console.log('Please select a price.');
    return;
  }
  
  const amount = selectedPrice.value; // Get the amount value from the selected radio button

  // Create supported payment method.
  const supportedInstruments = [
    {
      supportedMethods: ['https://tez.google.com/pay'],
      data: {
        pa: 'bencho3510@oksbi',
        pn: 'Dev Patel',
        tr: '1234ABCD',  // Your custom transaction reference ID
        url: 'https://efinepay.com',
        mc: '7299', //Your merchant category code
        tn: 'Purchase in Merchant',
      },
    }
  ];

  // Create order detail data with dynamic amount.
  const details = {
    total: {
      label: 'Total',
      amount: {
        currency: 'INR',
        value: amount, // Use the dynamically selected amount
      },
    },
    displayItems: [{
      label: 'Original Amount',
      amount: {
        currency: 'INR',
        value: amount,
      },
    }],
  };

  const options = {
    requestPayerPhone: true,
  };

  // Create payment request object.
  let request = null;
  try {
    request = new PaymentRequest(supportedInstruments, details, options);
  } catch (e) {
    console.log('Payment Request Error: ' + e.message);
    return;
  }
  if (!request) {
    console.log('Web payments are not supported in this browser.');
    return;
  }

  // Set payment timeout.
  let paymentTimeout = window.setTimeout(function () {
    window.clearTimeout(paymentTimeout);
    request.abort()
      .then(function () {
        console.log('Payment timed out after 20 minutes.');
      })
      .catch(function () {
        console.log('Unable to abort, user is in the process of paying.');
      });
  }, 5 * 60 * 1000); /* 20 minutes */

  request.show()
    .then(function (instrument) {
      window.clearTimeout(paymentTimeout);
      processResponse(instrument); // Handle response from browser.
    })
    .catch(function (err) {
      console.log(err);
    });
}       
function completePayment(instrument, result, msg) {
 instrument.complete(result)
   .then(function () {
     console.log('Payment succeeds.');
     console.log(msg);

    // console.log('msgAnsar', msg.details.tezResponse.Status);
   })
   .catch(function (err) {
     console.log(err);
   });
}
function handleNotReadyToPay() {
 alert('Google Pay is not ready to pay.');
}