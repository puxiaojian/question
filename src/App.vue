<template>
  <div id="app">
    <div class="model" v-show="model" @click='model = !model'></div>
    <div id='bg-box'>
      <div class="num-box" v-show="start & !res">{{curTotal +'/'+ total}}</div>
      <div class='bg-h'></div>
      <div class='bg-c'>
        <div class='tit' v-show="!start">腊八节快乐</div>
        <div class='tit' v-show="start">
          <span v-if="!res">第{{curTotal}}题</span>
          <span v-else>佛系指数：<init-star :grade="grade"></init-star></span>
        </div>
        <div class='con' v-show="!start">
          <p>每年农历十二月初八，都是腊八节，相传这一天还是佛祖释迦牟尼成道之日，称为“法宝节”，是佛教盛大的节日之一</p>
          <p>中国人信奉佛教居多，那么在这佛教大日子里，你的“佛性”到底有多重？快来测一测吧！</p>
        </div>
        <div class='con' v-show="start">
          <p v-if="!res">{{ques_list.question}}</p>
          <p v-else>{{ res.conclusion }}</p>
        </div>
      </div>
      <div class='bg-f'></div>
    </div>
    <div id='start-btn' v-show="!start" @click="start = !start">测</div>
    <div id='que-btn' v-show="start & !res">
       <div class="list" v-for="item in ques_list.answer" :num="item[1]" @click="nextQuestion(item[1])">{{item[0]}}</div>
    </div>
    <div id='finish-btn' v-show="res">
      <div class="again btn-pink" @click="againGame()">重新测试</div>
      <div class="share btn-blue" @click="model = !model">邀请TA测</div>
    </div>
  </div>
</template>

<script>
import initStar from '@/components/initstar.vue';

export default {
    name: 'App',
    data () {
        return {
            ques: {},
            ques_list: {},
            start: false,
            quesApi: 'https://test.didi365.com/Xiaofang/User/question',
            resApi: 'https://test.didi365.com/Xiaofang/User/questionResult',
            branchNum: 0, //获得总分
            total:0, //题总数
            curTotal:1, //当前题数
            res: null, //测试结果
            grade: 0, //获取星级评分
            model: false
        }
    },
    created() {
        this.getData();
    },
    components: {
      initStar
    },
    methods: {
        getData: function () {
            this.$http.jsonp(this.quesApi,{params:{'userid':'1002930'}}).then(res => {
                const _data = res.data;
                if(_data.status == 1){
                    this.ques = _data.data;
                    this.ques_list = this.ques[this.curTotal-1];
                    this.total = _data.data.length;
                }
            })
        },
        nextQuestion: function(totalNum) {
          this.branchNum += Number(totalNum);
          if(this.curTotal < this.total) {
            this.ques_list = this.ques[this.curTotal];
            this.curTotal ++;
          }else {
            this.$http.get('/api/res').then(res => {
              const _data = res.data;
              console.log(_data);
              if(_data.errno === 0) {
                this.res = _data.data;
                const min_num = 0;
                const max_num = 4;
                this.grade = min_num + Math.floor(Math.random() * (max_num - min_num));
                console.log(this.grade,'grade');
              }else {
                console.log(_data.info);
              }
            })
          }
          console.log(this.branchNum,this.curTotal,this.total);
        },
        initStar: function(grade) {
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
          console.log(resModel,resModel.length,resDom);
          return resDom;
        },
        againGame: function() {
          this.curTotal = 1;
          this.ques_list = this.ques[this.curTotal-1];
          this.start = false;
          this.branchNum = 0;
          this.res = null;
        }
    }

}
</script>
