export function expando(prefix = 'expando') {
  return prefix + '-' + ('' + Math.random()).replace(/\D/g, '');
}

export function calculateFee( a, b ) {
  return Math.floor( a * b / 100 ) ;
}

export function priceComma( a ) {
  return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;
}

export function copyText ( target ) {
  console.log( 'copy text' ) ; 
  let textWrap = target ; 
  let r = document.createRange();

  r.selectNode(textWrap);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
} 