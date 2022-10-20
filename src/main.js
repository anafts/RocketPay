  import "./css/index.css";
  import IMask from "imask";

  // form action
   const addButton = document.querySelector('#add-card');
   addButton.addEventListener("click", () => {
    alert("Cartão adicionado")
   });

   document.querySelector('form').addEventListener("submit", (event) => {
    event.preventDefault();
   });

   // card colors
    const ccBgColor1 = document.querySelector(
      '.cc-bg svg > g g:nth-child(1) path '
    );
    const ccBgColor2 = document.querySelector(
       '.cc-bg svg > g g:nth-child(2) path '
    );
    const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img');

    function setCardType(type) {
      const colors = {
        visa: ["#436D99", "#2D57F2"],
        mastercard: ["#DF6F29", "#C69347"],
        default: ["black", "gray"],
      }

      ccBgColor1.setAttribute("fill", colors[type][0]);
      ccBgColor2.setAttribute("fill", colors[type][2]);
      ccLogo.setAttribute("src", `cc-${type}.svg`);
    }

    // globalThis.setCardType = setCardType;

   // card user name 
   const cardHolder = document.querySelector('#card-holder');

   cardHolder.addEventListener("input", () => {
    const ccHolder = document.querySelector('.cc-holder .value');

     ccHolder.innerHTML =
       cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
   });

    // card cvc code
     const secutiryCode = document.querySelector("#security-code")
     const securityCodePattern = {
       mask: "0000",
     }
     const securityCodeMasked = IMask(secutiryCode, securityCodePattern);

     securityCodeMasked.on("accept", () => {
       const ccSecurity = document.querySelector(".cc-security .value")

       ccSecurity.innerHTML =
         securityCodeMasked.value.length === 0
           ? "123"
           : securityCodeMasked.value
     });


     // card expiration date
     const expirationDate = document.querySelector("#expiration-date")
     const expirationDatePattern = {
       mask: "MM{/}YY",
       blocks: {
         MM: {
           mask: IMask.MaskedRange,
           from: 1,
           to: 12,
         },
         YY: {
           mask: IMask.MaskedRange,
           from: String(new Date().getFullYear()).slice(2),
           to: String(new Date().getFullYear() + 10).slice(2),
         },
       },
     }
     const expirationDateMasked = IMask(expirationDate, expirationDatePattern);

     expirationDateMasked.on("accept", () => {
     const ccData = document.querySelector(".cc-extra .value")

     ccData.innerHTML =
         expirationDateMasked.value.length === 0 ? "02/32" :   expirationDateMasked.value
    }); 
     

     // card numbers
     const cardNumber = document.querySelector("#card-number")
     const cardNumberPattern = {
       mask: [
         {
           mask: "0000 0000 0000 0000",
           regex: /^4\d{0,15}/,
           cardtype: "visa",
         },
         {
           mask: "0000 0000 0000 0000",
           regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
           cardtype: "mastercard",
         },
         {
           mask: "0000 0000 0000 0000",
           cardtype: "default",
         },
       ],
       dispatch: function (appended, dynamicMasked) {
         const number = (dynamicMasked.value + appended).replace(/\D/g, "")
         const foundMask = dynamicMasked.compiledMasks.find(function (item) {
           return number.match(item.regex)
         })

         // console.log(foundMask);
         return foundMask
       },
     }
     const cardNumberMasked = IMask(cardNumber, cardNumberPattern);

     cardNumberMasked.on("accept", () => {
      const cardTypeSelect = cardNumberMasked.masked.currentMask.cardtype;
      setCardType(cardTypeSelect);
      updateCardNumber(cardNumberMasked.value);
     });

     function updateCardNumber(number){
       const ccNumber = document.querySelector(".cc-number")
       ccNumber.innerHTML =  number.length === 0 ? "1234 5678 9012 3456" : number
     };



     