  import "./css/index.css";
  import IMask from "imask";

  const ccBgColor1 = document.querySelector('.cc-bg svg > g g:nth-child(1) path ');
  const ccBgColor2 = document.querySelector(".cc-bg svg > g g:nth-child(2) path ");
  const ccLogo = document.querySelector(".ccLogo span:nth-child(2) img");

  
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

  globalThis.setCardType = setCardType; 

  const secutiryCode = document.querySelector('#security-code');
  const securityCodePattern = {
    mask: "0000"
  }
  const securityCodeMasked = IMask(secutiryCode, securityCodePattern);


  const expirationDate = document.querySelector("#expiration-date");
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