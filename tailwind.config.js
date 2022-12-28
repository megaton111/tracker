/** @type {import('tailwindcss').Config} */


// 픽셀값으로 적용하고 싶으면 아래처럼 커스텀 가능
const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };

// console.log( 'px0_10 :', px0_10 ) ; 

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      // padding: px0_10,
    },
  },
  corePlugins: {
    // preflight: false, // tailwind의 reset css를 사용할 것 인가?
  } ,
  variants: {
    extend: {},
  },
  plugins: [],
}
