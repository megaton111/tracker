<template>
  
  <top-description>
  주문리스트 엑셀을 우리 양식에 맞게 변환
  </top-description>

  <div class="sectionWrap excelConverter">
    <section class="enter">
      
      <div class="row">
        <div class="col" style="--gap-col:5px">
          <div class="row fix">
            <h1>스토어 선택</h1>
          </div>
          <div class="row">
            <select name="" id="" v-model="store">
              <option value="naver">스마트스토어</option>
              <option value="tmon">티몬</option>
            </select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col" style="--gap-col:5px">
          <div class="row fix">
            <h1>가져올 컬럼 설정</h1>
          </div>
          <div class="row">
            <div class="setColWrap">
              <div class="set">
                <input type="text" placeholder="쉼표로 구분하여 입력해주세요." v-model="setColValue" />
                <button type="button" @click="setColumn">설정</button>
              </div>
              <div class="error" v-show="errorColumn.length > 0">
                <div v-for="( e, i ) in errorColumn" :key="i">[{{ e }}]</div> <strong>컬럼정보가없습니다.</strong>
              </div>
              <ul class="lst" v-if="store == 'naver'">
                <li v-for="( column , idx ) in getColumnNaver" :key="idx">{{ column }}</li>
              </ul>
              <ul class="lst" v-else>
                <li v-for="( column , idx ) in getColumnTmon" :key="idx">{{ column }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </section>
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
      <div class="row fix">
        <h1>생성 데이터</h1>
      </div>
      <div class="row" style="height:100%;">
        <div class="col" style="--gap-col:10px; height:100%;">
          <div class="wrapTable">
            <table>
              <!-- <thead>
                <tr>
                  <th v-for="( column , idx ) in getColumnNaver" :key="idx">{{ column }}</th>
                </tr>
              </thead> -->
              <tbody>
                <tr v-for="( row, num ) in makeData" :key="num">
                  <td v-for="( cell, t ) in row" :key="t"><div class="ellipsis">{{ cell }}</div></td>
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
        getColumnNaver : [ '구매자명',	'수취인명', '판매사이트', '상품주문번호',	'구매자ID', '수취인연락처1', '개인통관고유부호' , '결제일', '상품명', '옵션정보', '수량', '판매가격' ] , 
        getColumnTmon : [ '주문자명',	'수취인명', '판매사이트', '주문번호',	'아이디', '수취인연락처', '개인통관고유부호' , '결제완료일', '딜명', '옵션명', '구매수량', '총 주문금액' ] , 
        makeData : [] , 
        setColValue : '' , 
        errorColumn : [] , 
        store : 'naver'
      }) ;

      const convertNaver = ( data ) => {

        state.makeData = [] ; 
        state.errorColumn = [] ; 
        
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

          for( let j=0; j<state.getColumnNaver.length; j++ ) {


            idx = columnName.indexOf( state.getColumnNaver[j] ) ;

            if( idx < 0 && !(state.getColumnNaver[j] == '판매가격') && !(state.getColumnNaver[j] == '판매사이트') ) {
              if( state.errorColumn.indexOf( state.getColumnNaver[j] ) >= 0 ) return ; 
              state.errorColumn.push( state.getColumnNaver[j] ) ;
            }

            switch( state.getColumnNaver[j] ) {
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

      const convertTmon = ( data ) => {

        state.makeData = [] ; 
        state.errorColumn = [] ; 
        
        let setData = data.split( '\n' ).map( item => item.split('\t') )
        ,   columnName = setData.shift()
        ;

        if( setData[setData.length-1] == '' ) { setData.splice(-1,1); } // 엑셀 파일에서 복사한 자료로 작업 시 마지막 배열은 빈 배열로 들어가 있어서 삭제함

        for( let i=0; i<setData.length; i++ ) {

          let arr = []
          ,   result = null 
          ,   idx = null 
          ; 

          for( let j=0; j<state.getColumnTmon.length; j++ ) {


            idx = columnName.indexOf( state.getColumnTmon[j] ) ;

            if( idx < 0 && !(state.getColumnTmon[j] == '판매가격') && !(state.getColumnTmon[j] == '판매사이트') ) {
              if( state.errorColumn.indexOf( state.getColumnTmon[j] ) >= 0 ) return ; 
              state.errorColumn.push( state.getColumnTmon[j] ) ;
            }

            switch( state.getColumnTmon[j] ) {
              case '판매사이트' : 
                result = '티몬' ; 
                break ; 
              case '결제완료일' : 
                result = setData[i][idx].split(' ')[0] ; 
                break ; 
              case '옵션명' : 
                result = setData[i][idx].split('|')[1] ; 
                break ; 
              default : 
                result = setData[i][idx] ; 
            }

            arr.push( result ) ;

          }
          state.makeData.push( arr ) ; 
        }

      }

      const setColumn = () => {
        let column = state.setColValue ; 
        if( state.store == 'naver' ) {
          state.getColumnNaver = column.split(',').map(item=>item.trim()) ; 
        } else {
          state.getColumnTmon = column.split(',').map(item=>item.trim()) ; 
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
          if( state.store == 'naver' ) {
            convertNaver( excelData ) ; 
          } else {
            convertTmon( excelData ) ; 
          }
        }
      )

      return { 
        ...toRefs(state) ,
        setColumn , 
        copy ,
      } ;
    } ,

  }
</script>
<style lang="scss">
</style>