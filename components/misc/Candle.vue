<template>
<div class="box">
  <div class="candle-box">
    <div class="candle-main" id="candle">
      <div class="candle-tip">
        <div class="candle-top"></div>
        <div class="candle-flame-box">
          <div class="candle-flame" id="flame"></div>
          <div class="smoke" id="smoke">
            <span class="l-smoke1"></span>
            <span class="r-smoke1"></span>
            <span class="l-smoke2"></span>
            <span class="r-smoke2"></span>
            <span class="l-smoke3"></span>
            <span class="r-smoke3"></span>
            <span class="l-smoke4"></span>
            <span class="r-smoke4"></span>
            <span class="l-smoke5"></span>
            <span class="r-smoke5"></span>
            <span class="l-smoke6"></span>
            <span class="r-smoke6"></span>
            <span class="l-smoke7"></span>
            <span class="r-smoke7"></span>
            <span class="l-smoke8"></span>
            <span class="r-smoke8"></span>
            <span class="l-smoke9"></span>
            <span class="r-smoke9"></span>
            <span class="l-smoke10"></span>
            <span class="r-smoke10"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  mounted() {
    var candle = document.querySelector("#candle");
    var flame = document.querySelector("#flame");
    var smoke = document.querySelector("#smoke");
    var flag = 1;
    candle.addEventListener("click", function () {
      if (flag) {
        flame.style.display = "none";
        smoke.style.display = "block";
        flag = 0;
      } else {
        flame.style.display = "block";
        smoke.style.display = "none";
        flag = 1;
      }
    });  
  }
}
</script>
<style lang="scss" scoped>
.candle-box {
  width: 30rem;
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  width: 19rem;
}
.candle-main {
  position: relative;
  width: 2.5rem;
  height: 5.25rem;
  background: #f00;
  border-radius: 0 0 60px 60px / 0 0 25px 25px;
  margin-top: 50px;
}
.candle-tip {
  position: relative;
  top: -17px;
}
.candle-top {
  position: absolute;
  top: 5px;
  left: 0;
  width: 2.5rem;
  height: 1.25rem;
  z-index: 10;
  background: #ef4d65;
  box-shadow: 0 0 10px #f00 inset;
  border-radius: 60px / 25px;
  &:after {
    content: "";
    position: absolute;
    top: -8px;
    left: calc(50% - 2px);
    width: .25rem;
    height: 1.25rem;
    border-radius: 2px 2px 0 0;
    background: linear-gradient(to bottom, #000 0%, #fff 100%);
  }
}
.candle-flame {
  width: .6rem;
  height: 1.25rem;
  border-radius: 20px / 40px;
  background: radial-gradient(circle, transparent 20%, #fff 75%);
  box-shadow: 0 -3px 8px 2px #fff, 0 -8px 15px 5px #ff0, 0 -8px 0 8px #f00, 0 -8px 28px 38px #fff20098, 0 -10px 38px 48px #ffffff29;
  position: relative;
  z-index: 50;
  top: -5px;
  -webkit-animation: flicker 3s linear infinite;
  -o-animation: flicker 3s linear infinite;
  animation: flicker 3s linear infinite;
}
.candle-flame-box {
  height: 1.25rem;
  display: flex;
  justify-content: center;
}

.smoke {
  position: relative;
  width: 20px;
  height: 20px;
  z-index: 50;
  top: -7px;
  display: none;
  span {
    display: block;
    width: 20px;
    height: 20px;
    opacity: 0;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    background: radial-gradient(#333, transparent);
  }
}
.l-smoke1 {
  animation: smokeL linear 10s 1s infinite;
}
.l-smoke2 {
  animation: smokeL linear 10s 2s infinite;
}
.l-smoke3 {
  animation: smokeL linear 10s 3s infinite;
}
.l-smoke4 {
  animation: smokeL linear 10s 4s infinite;
}
.l-smoke5 {
  animation: smokeL linear 10s 5s infinite;
}
.l-smoke6 {
  animation: smokeL linear 10s 6s infinite;
}
.l-smoke7 {
  animation: smokeL linear 10s 7s infinite;
}
.l-smoke8 {
  animation: smokeL linear 10s 8s infinite;
}
.l-smoke9 {
  animation: smokeL linear 10s 9s infinite;
}
.l-smoke10 {
  animation: smokeL linear 10s 10s infinite;
}
.r-smoke1 {
  animation: smokeR linear 10s 1.5s infinite;
}
.r-smoke2 {
  animation: smokeR linear 10s 2.5s infinite;
}
.r-smoke3 {
  animation: smokeR linear 10s 3.5s infinite;
}
.r-smoke4 {
  animation: smokeR linear 10s 4.5s infinite;
}
.r-smoke5 {
  animation: smokeR linear 10s 5.5s infinite;
}
.r-smoke6 {
  animation: smokeR linear 10s 6.5s infinite;
}
.r-smoke7 {
  animation: smokeR linear 10s 7.5s infinite;
}
.r-smoke8 {
  animation: smokeR linear 10s 8.5s infinite;
}
.r-smoke9 {
  animation: smokeR linear 10s 9.5s infinite;
}
.r-smoke10 {
  animation: smokeR linear 10s 10.5s infinite;
}
@keyframes flicker {
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(1.1, 0.9) rotate(3deg);
  }
  50% {
    transform: scale(1, 1.2);
  }
  80% {
    transform: scale(0.9, 1.1) rotate(-3deg);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes smokeL {
  0% {
    transform: scale(0.2);
  }
  5% {
    transform: scale(0.2) translate(-5px, 0);
    opacity: 1;
  }
  100% {
    transform: scale(1) translate(-5px, -100px);
    opacity: 0;
  }
}
@keyframes smokeR {
  0% {
    transform: scale(0.2);
  }
  5% {
    transform: scale(0.2) translate(2px, 0);
    opacity: 1;
  }
  100% {
    transform: scale(1) translate(2px, -100px);
    opacity: 0;
  }
}
</style>