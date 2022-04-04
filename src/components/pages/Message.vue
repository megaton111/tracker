<template>
  <div class="sectionWrap">
    <section class="enter">
      <div class="row" style="--gap:10px;">
        <div class="col" style="--gap-col:5px;">
          <h1>고객명</h1>
          <input type="text" v-model="person">
        </div>
        <div class="col" style="--gap-col:5px;">
          <h1>구매상품명</h1>
          <input type="text" v-model="product">
        </div>
      </div>
    </section>
    <section class="msg">
      <h2>네이버 발송지연 처리 문구</h2>
      <div class="wrapMsg">
        <div class="item">
          <h3>파업</h3>
          <div class="text" contenteditable="true">
안녕하세요. {{person}}고객님, 브리크스토어입니다. <br />
최근 택배 노조 파업으로 인하여 고객님이 계신 지역의 배송이 불가하다고 합니다. <br />
파업이 종료되면 발송해드릴 예정이오며 파업으로 인해 <br />
네이버 스마트스토어 시스템상 설정된 쇼핑몰 발송 기한을 맞추기가 어렵습니다. <br />
그래서 모든 고객님께 일괄적으로 발송 지연/ 발송 기한 연장을 안내하고 있습니다. <br />
발송 기한 설정은 실제 배송 출고 예정과 상관없이 설정해두는 것이므로 신경 안 쓰셔도 된답니다. <br />
상품을 구매해주셔서 감사드리며 문의 사항 있을 시 네이버 톡톡으로 문의주세요! 감사합니다:)
          </div>
          <button class="btnLight sm" @click="copyText">복사</button>
        </div>
        <div class="item">
          <h3>중국 코로나 도시봉쇄</h3>
          <div class="text" contenteditable="true">
안녕하세요. {{person}}고객님, 브리크스토어입니다. <br />
해외구매대행 상황을 전달드리려합니다. 기사로도 접하셨겠지만 현재 중국이 오미크론 확산으로 인해 도시 봉쇄령이 내려졌습니다.<br />
중국 배송대행업체에 연락한 결과 언제까지 도시 봉쇄령이 유지될 지는 확실하지 않다고 합니다.<br />
이에 따라 해당 주문건은 배송지연 처리 상태로 변경되며 봉쇄가 해제되는대로 주문 진행이 진행되는 점 양해 부탁드립니다.<br />
더불어 현재 업무 과중화와 내부 사정으로 인해 전화문의는 운영하고 있지 않습니다. 네이버톡톡이나 게시판으로 문의주시면 성심성의껏 답변 드리겠습니다.<br />
다시 한번 오미크론 확산으로 인한 봉쇄령으로 배송지연되는 점 알려드립니다.
          </div>
          <button class="btnLight sm" @click="copyText">복사</button>
        </div>
        <div class="item">
          <h3>선주문(예약주문) 발송지연</h3>
          <div class="text" contenteditable="true">
안녕하세요. {{person}}고객님, 브리크스토어입니다. <br />
주문하신 상품은 상세페이지에서 공지드린 것 처럼 현재 선주문을 받고 2월에 입고되면 발송되는 상품입니다.<br />
네이버 시스템상 3일안에 발송처리를 해야하는데 입고 후 발송하는 상품으로 시스템상 설정된 쇼핑몰 발송 기한을 맞추기가 어렵습니다. 그래서 모든 고객님께 일괄적으로 발송 지연/ 발송 기한 연장을 안내하고 있습니다.<br />
발송 기한 설정은 실제 배송 출고 예정과 상관없이 설정해두는 것이므로 신경 안 쓰셔도 된답니다.<br />
상품을 구매해주셔서 감사드리며 문의 사항 있을 시 문의 남겨주세요! 감사합니다:)<br />
          </div>
          <button class="btnLight sm" @click="copyText">복사</button>
        </div>
      </div>
      <h2>배송문의 답변</h2>
      <div class="wrapMsg">
        <div class="item">
          <h3>소요기간?</h3>
          <div class="text" contenteditable="true">
안녕하세요. {{person}}고객님, 브리크스토어입니다.<br />
해외 직구 상품의 배송 소요 기간은 평균적으로 영업일 기준 14일 정도 소요되며 <br />
상황에 따라 변동이 될 수 있다는 점 참고바랍니다. <br />
감사합니다 ^^
          </div>
          <button class="btnLight sm" @click="copyText">복사</button>
        </div>
        <div class="item">
          <h3>해외배송중</h3>
          <div class="text" contenteditable="true">
안녕하세요. {{person}}고객님, 브리크스토어입니다.<br />
답변이 늦어죄송합니다. <br />
현재 주문하신 상품은 해외판매처에서 출고되어 배송중입니다.<br />
배송준비중으로 보여지는 것은 해외배송중으로 아직 국내택배사로 인계가 되기 전이기 때문입니다. <br />
국내도착하면 통관이 진행되며 통관 완료 후 국내택배사로 인계가 완료되면 배송중으로 변경이 되며 운송장 조회가가능하오니 참고해주세요. <br />
문의사항 있으시면 언제든지 문의남겨주세요. 감사합니다.
          </div>
          <button class="btnLight sm" @click="copyText">복사</button>
        </div>
        <div class="item">
          <h3>통관중</h3>
          <div class="text" contenteditable="true">
안녕하세요. {{person}}고객님, 브리크스토어입니다.<br />
답변이 늦어죄송합니다. <br />
현재 국내도착하여 통관중으로 확인되어집니다.<br />
배송준비중으로 보여지는 것은 아직 국내택배사로 인계가 되기 전이기 때문입니다. <br />
통관 완료 후 국내택배사로 인계가 완료되면 배송중으로 변경이 되며 운송장 조회가가능하오니 참고해주세요. <br />
문의사항 있으시면 언제든지 문의남겨주세요. 감사합니다.
</div>
          <button class="btnLight sm" @click="copyText">복사</button>
        </div>
        <div class="item">
          <h3>통관 완료 인계 전</h3>
          <div class="text" contenteditable="true">
안녕하세요. {{person}}고객님, 브리크스토어입니다.<br />
답변이 늦어죄송합니다. <br />
현재 통관은 완료되었으나 택배사 인계가 되지 않았습니다.<br />
곧 국내 택배사로 인계가 될 예정이오며<br />
인계가 완료되면 배송조회가 가능하오니 참고부탁드립니다.<br />
문의사항 있으시면 언제든지 문의남겨주세요. 감사합니다.
          </div>
          <button class="btnLight sm" @click="copyText">복사</button>
        </div>
      </div>
      <h2>품절 상품 취소안내</h2>
      <div class="wrapMsg">
        <div class="item">
          <h3>배송지연으로 처리하기</h3>
          <div class="text" contenteditable="true">
안녕하세요. {{person}}고객님,  브리크 스토어입니다.<br />
해외소싱처 확인 결과 주문하신 상품의 주문량이 많아 주문 후 발송까지 너무 오래걸릴 것으로 예상되어 현재 판매를 할 수 없을 것 같습니다.<br />
추가로 저희가 다른 소싱처에도 찾아보았으나 바로 판매가 가능한 셀러를 찾지못했습니다.<br />
주문 주신 건은 취소처리 진행하겠습니다..... 이렇게 취소 요청드리게 된 점 죄송합니다. 더 노력하는 브리크 스토어 되겠습니다.
          </div>
          <button class="btnLight sm" @click="copyText">복사</button>
        </div>
        <!-- <div class="item">
          <h3>파업</h3>
          <div class="text" contenteditable="true">
          </div>
          <button class="btnLight sm" @click="copyText">복사</button>
        </div> -->
      </div>
      <h2>반품</h2>
      <div class="wrapMsg">
        <div class="item">
          <h3>구매대행 배송완료 후 반품</h3>
          <div class="text" contenteditable="true">
안녕하세요. {{person}}고객님, 반품 접수가 확인되어 연락드립니다.<br />
구매하신 상품은 해외 구매대행 상품으로 반품 시 해외 판매처로 발송해야합니다. 상세페이지에 미리 공지드린 것 처럼 해외 반품 배송비가 발생됩니다.<br />
반품 배송비는 [30,000원]이 발생되며 반품 배송비를 부담하시고 반품을 원하시면 반품 배송비를 아래계좌로 입금 후 말씀해주시면 처리 도와드리겠습니다. 연락은 쇼핑몰 문의 게시판이나 문자로 남겨주시면 확인후 답변드리겠습니다. 감사합니다 : )<br />
<br />
국민은행 642201-04-108880<br />
예금주 이근호(브리크)
          </div>
          <button class="btnLight sm" @click="copyText">복사</button>
        </div>
        <div class="item">
          <h3>국내판매 - 반품배송비 동봉으로 선택 시</h3>
          <div class="text" contenteditable="true">
안녕하세요. {{person}}고객님, 반품 접수가 되어 연락드립니다.<br />반품 시 반품배송비(6,000원)이 발생되며 반품배송비는 환불금에서 차감되도록 선택해주셔야하는데 상품에 동봉으로 해주시면 저희가 확인이 어렵습니다. 상품이 물류창고로 들어가기 때문에 본사에서 확인하기가 어렵습니다. 죄송하지만 환불금을 아래 계좌로 입금해주시면 회수할수 있도록 택배사에 접수하겠습니다. 감사합니다. 입금 후 답변부탁드립니다.<br />
국민은행 642201-04-108880<br />
예금주 이근호(브리크)
          </div>
          <button class="btnLight sm" @click="copyText">복사</button>
        </div>
        <div class="item">
          <h3>국내판매 - 판매자 직접 송금 선택 시</h3>
          <div class="text" contenteditable="true">
안녕하세요. {{person}}고객님, 반품 접수가 되어 연락드립니다. <br />반품 접수는 저희가 직접 택배사로 수거 요청합니다. 반품배송비(6,000원)가 발생되며 반품배송비는 아래 계좌로 입금해주시면 회수할수 있도록 택배사에 접수하겠습니다. 입금 후 답변부탁드립니다. 답변 남겨주셔야 반품 접수가 빠르게 진행되오니 참고해주세요.<br />
감사합니다.
<br />
국민은행 642201-04-108880<br />
예금주 이근호(브리크)
          </div>
          <button class="btnLight sm" @click="copyText">복사</button>
        </div>
        <div class="item">
          <h3>국내판매 - 반품배송비 환불금 차감, 선결제</h3>
          <div class="text" contenteditable="true">
안녕하세요. {{person}}고객님, 반품 접수가 되어 연락드립니다. <br />
반품 접수는 저희가 직접 택배사로 수거 요청합니다. 택배기사님이 방문하시면 상품 받으신 상태 그대로 포장하여 전달부탁드립니다.<br />
감사합니다.
<br />
국민은행 642201-04-108880<br />
예금주 이근호(브리크)
          </div>
          <button class="btnLight sm" @click="copyText">복사</button>
        </div>
      </div>
      <h2>개인통관번호</h2>
      <div class="wrapMsg">
        <div class="item">
          <h3>누락</h3>
          <div class="text" contenteditable="true">
안녕하세요. {{person}}고객님, {{ product }} 판매처 브리크스토어입니다.<br />
상품을 주문해주셔서 감사합니다.<br />
다름이아니라 주문서에 개인통관고유부호를 작성해주시지 않아 연락드립니다. <br />
주문하신 상품은 해외 직구 상품으로 통관시 개인통관고유부호가 필요합니다.<br />
다시 확인해주시고 문자로 개인통관고유부호를 보내주세요.<br />
개인통관부호는 수취인의 이름으로 발급된 [P+12자리 숫자] 번호여야 합니다! 감사합니다!<br />

개인통관부호는 아래의 링크에서 확인 / 발급이 가능하십니다.<br />
https://unipass.customs.go.kr/csp/persIndex.do
          </div>
          <button class="btnLight sm" @click="copyText">복사</button>
        </div>
      </div>
      <h2>가격변동</h2>
      <div class="wrapMsg">
        <div class="item">
          <h3>상품 가격이 상승</h3>
          <div class="text" contenteditable="true">
안녕하세요. {{person}}고객님, {{ product }} 판매처 브리크스토어입니다.<br />
다름이 아니라 저희측 현지 소싱처의 가격이 큰폭으로 상승해서 해당 상품을 부득이 추가금을 받아야만 판매가 가능한 상황입니다... <br />
구매에 불편드려 정말 죄송합니다... <br />
추가로 발생되는 금액 [30,000원]이며, 구매를 원하시면 아래 계좌로 입금 후 말씀 부탁드리며<br />
원하시지 않으시면 환불처리 도와드리겠습니다... 미리 반영해놓지 못해 죄송합니다. <br />
국민은행 642201-04-108880<br />
예금주 이근호(브리크)
          </div>
          <button class="btnLight sm" @click="copyText">복사</button>
        </div>
      </div>
      <h2>취소 불가</h2>
      <div class="wrapMsg">
        <div class="item">
          <h3>배송시작 후 취소</h3>
          <div class="text" contenteditable="true">
안녕하세요. {{person}}고객님,<br />
현재 고객님이 주문하신 상품은 해외배송이 시작된 상태입니다.<br />
본 상품은 해외에서 고객님께 직배송 되는 상품이므로 <br />
판매자가 발주확인(해외판매처주문) 이후에는 취소가 불가합니다.<br />
취소를 원하시면 상품을 받으신 후 해외판매처로 반품 신청으로 처리를 진행하셔야합니다. 반품 처리를 진행 시 반품배송비가 부과되오니 참고 부탁드립니다.<br />
감사합니다 : )
          </div>
          <button class="btnLight sm" @click="copyText">복사</button>
        </div>
      </div>
      <h2>리뷰요청</h2>
      <div class="wrapMsg">
        <div class="item">
          <h3>리뷰</h3>
          <div class="text" contenteditable="true">
안녕하세요. {{person}}고객님, 브리크스토어 입니다. 상품은 잘 받으셨나요? 
<br />
바쁘시겠지만 잠시 시간 내어주셔서 짧게나마 리뷰 작성 부탁드립니다.<br />
매달 리뷰 작성 고객분들 중 추첨을 통해 기프티콘 증정 이벤트도 진행 중이오니<br />
많은 참여 부탁드립니다.<br /><br />

고객님들의 소중한 리뷰는 스토어에 큰 힘이 될 것 같습니다.<br />
항상 건강 조심하시고 즐거운 하루 보내시길 바랍니다.<br />
감사합니다.
          </div>
          <button class="btnLight sm" @click="copyText">복사</button>
        </div>
      </div>
      <h2>문구</h2>
      <div class="wrapMsg">
        <div class="item">
          <h3>파업</h3>
          <div class="text" contenteditable="true">
          </div>
          <button class="btnLight sm" @click="copyText">복사</button>
        </div>
      </div>
    </section>
  </div> <!-- end of sectionWrap -->
</template>

<script>
  import { reactive, toRefs } from 'vue';
  export default {
    name : 'Message' ,
    components : {
      // loading
    } ,
    setup () {
      const state = reactive({
        person : '' , 
        product : '' ,
      }) ;

      const copyText = (e) => {
        console.log( 'copyText in' ) ; 
        let textWrap = e.target.previousSibling ; 
        let r = document.createRange();

        r.selectNode(textWrap);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
      }

      return { 
        ...toRefs(state) ,
        copyText
      } ;
    } ,
  }
</script>