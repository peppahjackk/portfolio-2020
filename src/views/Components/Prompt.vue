<template>
<transition name="slide-down">
  <div class="prompt-wrapper">
    <div ref="promptContainer" class="prompt arrow-container">
      <Arrow ref="promptArrow"></Arrow>
      <div class="arrow-container prompt-text-container"><p class="prompt-text">SCROLL</p></div>
      <Arrow ref="promptArrow"></Arrow>
    </div>
  </div>
</transition>
</template>

<script>
import Arrow from './Arrow';
import gsap from 'gsap';

export default {
  mounted: function() {
    let container = this.$refs.promptContainer;
    let arrows = container.children;

    this.entryTl = gsap.timeline({defaults: {duration: 0.35}});
    this.entryTl.fromTo(arrows, { x: '-100%', opacity: 0 }, { x: 0, opacity: 1, ease: "power4.out" });

    this.bounceTl = gsap.timeline({defaults: {duration: 0.25}});
    this.bounceTl.pause();
    this.bounceTl.to(arrows, { y: -20, ease: "power4.out", stagger: .1 });
    this.bounceTl.to(arrows, { y: 0, ease: "bounce.out", stagger: .1 }, "-=.25");

    this.$root.eventHub.$on('intro-complete', () => {
      window.setTimeout(this.bounce, 700) });
    
    this.$root.eventHub.$on('routing', this.show);
  },
  beforeDestroy: function() {
    this.$root.$off;
  },
  methods: {
    bounce: function() {
        this.bounceTl.play();
    },
    show: function() {
      this.entryTl.play();
    },
    hide: function() {
      this.entryTl.reverse();
    }
  },
  components: {
    Arrow
  }
}

</script>