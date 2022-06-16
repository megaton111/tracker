<template>
  
  <top-description>
  주문리스트 엑셀을 우리 양식에 맞게 변환
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
      <div class="row" style="height:100%;">
        <div class="col" style="--gap-col:10px; height:100%;">
          <div class="wrapTable">
            <table>
              <!-- <thead>
                <tr>
                  <th v-for="( column , idx ) in getColumn" :key="idx">{{ column }}</th>
                </tr>
              </thead> -->
              <tbody>
                <tr v-for="( row, num ) in makeData" :key="num">
                  <td v-for="( cell, t ) in row" :key="t">{{ cell }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="btnArea"><button type="button" class="btn" @click="copy">복사</button></div>
        </div>
      </div>
    </section>

  </div> <!-- end of sectionWrap -->
</template>

<script>
  import { reactive, toRefs, watch } from 'vue';
  export default {
    name : 'ExcelConverter' ,
    setup () {

const state = reactive({
        excelData : '' ,
        getColumn : [ '구매자명',	'수취인명', '판매사이트', '상품주문번호',	'구매자ID', '수취인연락처1', '개인통관고유부호' , '결제일', '상품명', '옵션정보', '수량', '판매가격' ] , 
        makeData : [] , 
      }) ;

      const convert = ( data ) => {

        state.makeData = [] ; 
        
        let setData = data.split( '\n' ).map( item => item.split('\t') )
        ,   columnName = setData.shift()
        ,   price1 = columnName.indexOf( '상품별 총 주문금액' )
        ,   price2 = columnName.indexOf( '배송비 합계' )
        ,   price3 = columnName.indexOf( '제주/도서 추가배송비' ) 
        ;

        if( setData[setData.length-1] == '' ) { setData.splice(-1,1); } // 엑셀 파일에서 복사한 자료로 작업 시 마지막 배열은 빈 배열로 들어가 있어서 삭제함

        for( let i=0; i<setData.length; i++ ) {

          let arr = []
          ,   result = null 
          ,   idx = null 
          ; 

          for( let j=0; j<state.getColumn.length; j++ ) {


            idx = columnName.indexOf( state.getColumn[j] ) ;

            switch( state.getColumn[j] ) {
              case '판매가격' : 
                result = parseFloat( setData[i][price1].replace(/(₩|,)/g, "") ) + parseFloat( setData[i][price2].replace(/(₩|,)/g, "") )+ parseFloat( setData[i][price3].replace(/(₩|,)/g, "") );
                break ; 
              case '판매사이트' : 
                result = '스마트스토어' ; 
                break ; 
              case '결제일' : 
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
        let tableDom = document.querySelector('table');
        let range  =  document.createRange();
        range.selectNodeContents(tableDom)
        let select =  window.getSelection()
        select.removeAllRanges()
        select.addRange(range)
        document.execCommand('copy')
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
  flex :1 ; 
  height : 100% ; 
  overflow-y:auto ; 
}
.btnArea {
  flex : 0 0 auto ; 
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