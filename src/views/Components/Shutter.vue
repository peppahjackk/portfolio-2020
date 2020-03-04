<template>
  <div ref="shutter" class="shutter" v-bind:class="[{ 'horizontal': horizontal}, { 'bottom-expands': bottomExpands}, open ? '' : 'closed'] ">
    <Slat
      ref="slat"
      v-for="(piece, i) in content"
      v-bind:key="piece.title"
      v-bind:title="piece.title"
      v-bind:content="piece.text"
      v-bind:link="piece.link"
      v-bind:open="open"
      v-bind:color="theColors[i]"
      v-bind:size="setSlatSize(i)"
      v-bind:contentSize="getSlatContentSize(i)"
      v-bind:horizontal="horizontal"
    >
      <slot v-if="piece.component"></slot>
    </Slat>
  </div>
</template>

<script>
import Slat from "../Components/Slat";
import gsap from 'gsap';

export default {
  props: {
    bottomExpands: Boolean,
    colors: Array,
    gray: Boolean,
    content: Array,
    desc: Array,
    open:{
      type: Boolean,
      default: false
    },
    padding: {
      type: Number,
      default: 0
    },
    horizontal: Boolean
  },
  data: function() {
    return {
      fixed: Boolean,
      Slats: Array,
      slatHeight: 120,
    };
  },
  computed: {
    theColors() {
      if (this.gray) {
        return this.$root.COLORS_GRAY
      }
      return this.colors || this.$root.COLORS
    },
    unit() {
      if (this.fixed) {
        if (this.horizontal) {
          return 'vw'
        } else {
          return 'vh'
        }
      } else {
        return '%'
      }
    }
  },
  mounted() {
    this.Slats = this.$refs.slat;
    this.shutter = this.$refs.shutter;
  },
  methods: {
    getSlatContentSize(i) {
      if (!this.bottomExpands) {
        return ((100 - this.padding * 2) / this.content.length)+ this.unit
      } else {
        if (i === this.content.length - 1) {
          return '100%';
        } else {
          return this.slatHeight + 'px';
        }
      }
    },
    setSlatSize: function(i) {
      if (!this.bottomExpands) {
        return ((100 - this.padding * 2) / this.content.length) * (this.content.length - i) + this.unit;
      } else {
        return "calc(100% - " + this.slatHeight * (i) + "px)";
      }
    },
    show: function(callback) {
      gsap.to(this.shutter, {height: '100%', duration: .5, onComplete: ()=>{if (callback){callback()}}})
    },
    hide: function(callback) {
      gsap.to(this.shutter, {height: '0%', duration: .5, onComplete: ()=>{if (callback){callback()}}})
    }
  },
  watch: {
    open: function(newVal) {
      if (newVal) {
        this.show();
      } else {
        this.hide();
      }
    }
  },
  components: {
    Slat
  }
};
</script>