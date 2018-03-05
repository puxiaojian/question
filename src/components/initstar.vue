<template>
  <span v-html="initStar(grade)"></span>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props: {
    grade: {
      type: Number,
      required: true,
      default: 0
    }
  },
  methods: {
    initStar: function(grade) {
      // console.log(grade,111);
      const starModel = [
        [0,0,0,0], [1,0,0,0], [1,1,0,0], [1,1,1,0], [1,1,1,1]
      ];
      var resModel = [];
      var resDom = '';
      resModel = starModel[grade];
      for (var i = 0; i < resModel.length; i++) {
        if(resModel[i]){
          resDom += '<i></i>';
        }else{
          resDom += '<i class="g"></i>';
        }
      }
      return resDom;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
