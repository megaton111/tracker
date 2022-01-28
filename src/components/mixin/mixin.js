// let todoMixin = {
//   data() {
//     return {
//     }
//   } ,
//   methods: {
//     removeHandler(value) { this.$store.commit("removeList", value); }, 
//     checkHandler(value) { this.$store.commit("checkList", value); }, 
//     modifyHandler( value ) { 
//       this.$store.commit( "modifyList", value ) ; 
//       this.modifyToggle( false ) ; 
//     } , 
//     modifyToggle(value) { 
//       this.modifyTitle = this.item.title ; 
//       this.openModify = value ;
//     },
//     addListHandler() {
//       let addObj = {
//         title: this.todoValue,
//         date: this.todoDate
//       };
//       this.$store.commit("addList", addObj ) ; 
//       this.todoValue = '';
//       this.todoDate = new Date() ; 
//     }
//   }
// };
// export default todoMixin;