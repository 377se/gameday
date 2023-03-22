<template>
  <a 
    href="#offscreen-menu"
    class="wrapper-menu"
    uk-toggle
    @click.stop.prevent>
    <div class="line-menu half start"></div>
    <div class="line-menu"></div>
    <div class="line-menu half end"></div>
  </a>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
.wrapper-menu {
  margin-left:12px;
  width: 26px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 330ms ease-out;
}

.wrapper-menu.open {
  transform: rotate(-45deg);  
}

.line-menu {
  background-color: #fff;
  border-radius: 3px;
  width: 100%;
  height: 4px;
}

.line-menu.half {
  width: 50%;
}

.line-menu.start {
  transition: transform 330ms cubic-bezier(0.54, -0.81, 0.57, 0.57);
  transform-origin: right;
}

.open .line-menu.start {
  transform: rotate(-90deg) translateX(3px);
}

.line-menu.end {
  align-self: flex-end;
  transition: transform 330ms cubic-bezier(0.54, -0.81, 0.57, 0.57);
  transform-origin: left;
}

.open .line-menu.end {
  transform: rotate(-90deg) translateX(-3px);
}
</style>