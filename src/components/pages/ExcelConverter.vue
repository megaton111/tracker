<template>
  
  <top-description>
  주문리스트 엑셀을 우리 양식에 맞게 변환해주는 서비스입니다. 
  </top-description>

  <div class="sectionWrap salePrice">
    <section class="enter">
      <div class="row">
        <div class="col" style="--gap-col:5px">
          <div class="row fix">
            <h1>원본 엑셀 자료</h1>
          </div>
          <div class="row">
            <t-textarea v-model="excelData"></t-textarea>
          </div>
        </div>
      </div>
    </section>

    <section class="result">
      <!-- {{ makeData }} -->
      <div class="row">
        <div class="col">
          <div class="wrapTable">
            <table>
              <!-- <thead>
                <tr>
                  <th v-for="( column , idx ) in getColumn" :key="idx">{{ column }}</th>
                </tr>
              </thead> -->
              <tbody ref="code">
                <tr v-for="( row, num ) in makeData" :key="num">
                  <td v-for="( cell, t ) in row" :key="t">{{ cell }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- <div class="row">
        <div class="col"><button type="button" class="btn" @click="copy">복사</button></div>
      </div> -->
    </section>

  </div> <!-- end of sectionWrap -->
</template>

<script>
  import { reactive, toRefs, watch, ref } from 'vue';
  // import { priceComma } from '@/utils';
  export default {
    name : 'ExcelConverter' ,
    setup () {

      const code = ref(null) ;

      const state = reactive({
        excelData : '' ,
        getColumn : [ '구매자명',	'수취인명', '판매사이트', '상품주문번호',	'구매자ID', '수취인연락처1', '개인통관고유부호' , '주문일시', '상품명', '옵션정보', '수량', '판매가격' ] , 
        makeData : [] , 
      }) ;

      const convert = ( data ) => {
        
        console.log( data.split( '\n' ) ) ; 
        
        let setData = data.split( '\n' ).map( item => item.split('\t') )
        ,   columnName = setData.shift()
        ,   price1 = columnName.indexOf( '상품별 총 주문금액' )
        ,   price2 = columnName.indexOf( '배송비 합계' )
        ,   price3 = columnName.indexOf( '제주/도서 추가배송비' ) 
        ;

        if( setData[setData.length-1] == '' ) { setData.splice(-1,1); } // 엑셀 파일에서 복사한 자료로 작업 시 마지막 배열은 빈 배열로 들어가 있어서 삭제함

        console.log( 'setData : ', setData ) ; 
        console.log( 'setData.length : ', setData.length ) ; 
        for( let i=0; i<setData.length; i++ ) {

          console.log( '------------------' + i + '------------------' )
          
          let arr = [] ;
          let result = null ; 

          for( let j=0; j<state.getColumn.length; j++ ) {

            // if( state.getColumn[j] == '판매가격' ){
            //   result = parseFloat( setData[i][price1].replace(/(₩|,)/g, "") ) + parseFloat( setData[i][price2].replace(/(₩|,)/g, "") )+ parseFloat( setData[i][price3].replace(/(₩|,)/g, "") );
            // } else if( state.getColumn[j] == '판매사이트' ) {
            //   result = '스마트스토어' ; 
            // } else if( state.getColumn[j] == '주문일시' ){
            //   result = '2022-06-12' ; 
            // } else {
            //   let idx = columnName.indexOf( state.getColumn[j] ) ;
            //   result = setData[i][idx] ; 
            // }

            let idx = columnName.indexOf( state.getColumn[j] ) ;

            switch( state.getColumn[j] ) {
              case '판매가격' : 
                // console.log( '---->', setData[i][price1], setData[i][price2], setData[i][price3] ) ; 
                // console.log( '---->', setData[i][price1], setData[i][price2], setData[i][price3].replace(/(₩|,)/g, "" ) ) ; 
                result = parseFloat( setData[i][price1].replace(/(₩|,)/g, "") ) + parseFloat( setData[i][price2].replace(/(₩|,)/g, "") )+ parseFloat( setData[i][price3].replace(/(₩|,)/g, "") );
                break ; 
              case '판매사이트' : 
                result = '스마트스토어' ; 
                break ; 
              case '주문일시' : 
                idx = columnName.indexOf( '결제일' ) ;
                result = setData[i][idx].split(' ')[0] ; 
                break ; 
              default : 
                result = setData[i][idx] ; 
            }

            arr.push( result ) ;

          }
          state.makeData.push( arr ) ; 
        }

      }

      const copy = () => {
        let target = code.value ;
        target.select();
        target.setSelectionRange(0, Number.MAX_SAFE_INTEGER);
        document.execCommand('copy');
      }

      watch(
        () => state.excelData,
        (excelData) => {
          convert( excelData ) ; 
        }
      )


      return { 
        ...toRefs(state) ,
        copy ,
      } ;
    } ,

  }
</script>
<style lang="scss">
.wrapTable{
  width : 100% ; 
  flex : 0 0 auto; 
  height : 100% ; 
  overflow-y:auto ; 
}
table {
  width : 100% ; 
  border-collapse: collapse;
  border-spacing: 0;
  tr {
    th, td {
      border : 1px solid #333 ; 
      padding:2px ;
      font-size:11px ;  
      white-space: normal;
      word-break: break-all;
    }
  }
}
</style>