
//头部组件
var title = {
  template: '<div>\
  <div class=" text-center " >\
  <p class="bg-info " > {{text}}</p >\
</div>\
</div> ',
  props: {
    text: String
  }
};

//登录组件
var login={
  template:'<div>\
  <header-title v-bind:text="titleText"></header-title>\
  <form>\
  <div class="form-group">\
  <label for="exampleInputEmail1">用户名</label>\
  <input type="text" class="form-control" id="exampleInputEmail1" placeholder="请输入用户名" v-model="username">\
  </div>\
  <div class="form-group">\
  <label for="exampleInputPassword1">密码</label>\
  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="请输入用密码" v-model="password">\
  </div>\
<p class="text-warning" v-show="isWarning">{{warningMsg}}</p>\
<button type="submit" class="btn btn-default" @click.prevent="loginClick">登录</button>\
  </form>\
  </div>',
  props: [],
  data: function () {
    return {
      titleText: '请登录',
      username: '',
      password: '',
      warningMsg: '',
      isWarning: false
    };
  },
  methods: {
    loginClick: function () {
      if (!this.username) {
        this.warningMsg = '请输入用户名';
        this.isWarning = true;
      } else if (!this.password) {
        this.warningMsg = '请输入用密码';
        this.isWarning = true;
      } else {
        this.isWarning = false;
        this.$emit('userlogin', {
          username: this.username,
          password: this.password
        });
      }
    }
  },
  components: {
    'header-title':title,
  }
};

//列表组件
var list={
  template:'<div >\
  <header-title v-bind:text="titleText"></header-title>\
  <div class="list-group" v-for="(item,index) in list" >\
  <a href="#" @click.prevent="itemClick(index)"  class="list-group-item">\
  <h4 class="list-group-item-heading">{{item.title}}</h4>\
<p class="list-group-item-text">{{item.content.slice(0,20) + ".."}}</p>\
</a>\
</div>\
</div>',
  props: {
    userInfo: Object,
    list: Array,
  },
  data: function () {
    return {
      titleText: '欢迎' + this.userInfo.username +'列表页面'
    }
  },
  methods:{
    itemClick: function (index) {
      this.$emit('itemclick',index);
    }
  },
  components: {
    'header-title':title,
  }
};

//详情组件
var detail={
  template:'<div>\
  <header-title :text="titleText"></header-title>\
  <router-link class=" back-btn" to="/list">返回</router-link>\
  <p class="text-primary">{{item.title}}</p>\
<p class="text-success">{{item.content}}</p>\
</div>',
  props: {
    item: Object,
    userInfo: Object
  },
  data: function () {
    return {
      titleText: '欢迎' + this.userInfo.username +'详情页面'
    }
  },
  components: {
    'header-title':title,
  }
};

var routes=[
  { path: '/', redirect: '/login' },
  {path:'/login',component:login},
  {path:'/list',component:list},
  {path:'/detail',component:detail}
];
var router=new VueRouter({
  routes:routes
});


var vm = new Vue({
  el: '#app',
  data: function (){
    return {
      msg: 'Welcome to Your Vue.js App',
      userInfo: {username: '',password:''},
      list:[
        {
          title: '春天来了',
          content: '春来了，春姑娘送走了厚厚的积雪却迎来了肥沃的土壤。种子开始发芽，柳条开始垂堤，小草变的嫩绿嫩绿的了，穿破松动的土壤，细雨正在为它们的到来接风洗尘，然后开始沐浴着阳光给的温暖，茁壮的成长着。于是诗人们就开始给春天写赞歌：中国的白居易说几处早莺争暖树，谁家新燕啄春泥；美国的朗费罗他说可爱的春天带着花和曲的潮水滚滚而来，让大地腾起花的浪涛，空中响彻着春的乐曲；我说春天是人们工作的希望，是早晨孩子们琅琅的读书声，是农民伯伯撒下一粒种子的希望等待着来年的秋收，一切又有了新的希望！突然毒辣的太阳升上了高空，释放了热能量，这时夏天到来了！'
        },
        {
          title: '夏天来了',
          content: '刺眼的光芒、毒辣的太阳，还有那湿变全身的汗水。人们在家里享受着空调，在茶坊里，甚至在游泳池里凉快凉快，都不敢直接面对的释放高温的太阳。其实也不全然，早晨鸟语花香，下午知了开始鸣个不休，“红蜓花间戏，两蜓共缠绵”蜻蜓也开始戏耍着，傍晚在那池塘里荷花旁的荷叶上的青蛙叫的呱呱的响，广场榕树四周坐满了老人，拿着蒲扇驱赶着烦人的蚊子，过着惬意的生活！在这火辣的夏天里吃着雪糕不过最巴适的莫过于和谐冰镇的饮料或者啤酒吃着下酒菜要么火锅，然后吹着空调，偶尔到网吧坐一坐也是可以的，别提有多爽了！哎呀，突然稀里哗啦一场大雨降下来，落在雨棚上滴滴答答作响。哦，原来是秋叔叔来，一场大雨赶走了夏末的酷暑炎热临迎来了秋高气爽，原来是秋天到了！'
        },
        {
          title: '秋天来了',
          content: '秋天有的叶子渐渐泛黄了，也有的已是枯枝败叶，甚至成秃驴了！但这些不重要重要的是地里冬瓜熟了，田里发出了巨大的响声嗡嗡的，收割机正在收割田里的金灿灿麦子，然后冒起了浓浓的白烟正是又香又甜的玉米留下来的秸秆焚烧。树上又大又圆，酸酸甜甜的柚子还有那黄澄澄的橘子吸引了不少大胆的孩子去别人家人偷，虽然被发现了遭了人家的骂，但是却有一种喜悦之情，我小时候和我的哥哥弟弟们就是这样。大风呼呼的，孩子们的野心使得他们在秋天里漫山遍野的跑，追逐着，嬉笑着，那是因为秋天给他们带来了丰厚的大礼包！秋天是人们工作收割的时期，是孩子们收获的时期，是农民伯伯满载着一车又香又甜瓜果回家分享的喜悦！大街上的人一个个红的黄的白的套上了围巾穿上厚厚么毛衣。咦？这是为啥？哦，冬天到了！',
        },
        {
          title: '冬天来了',
          content: '天空中飘着，漫天飞舞着洁白的雪花。落在了小妹妹的头上肩上胳膊和手上还有那红色的小红鞋上，但最后一落即化，消失不见了。冬天我把他叫做“光杆司令”树上，地上房顶上都是雪，树上也没了一片叶子所以我叫才这样叫他“光杆司令”！高速公路上不少消防队员在为冻住的路面除冰。花园里、屋顶上、大门前、街道上到处都是厚厚的积雪，毛润之先生曾写到：“北国风光，千里冰封，万里雪飘”多么气魄啊！可是有的认为寒冷的冬雪是个不祥的预兆，厚厚的积雪掩盖了一切，什么都看不见。其实你们错了，冻住的河面上你可以去溜冰，可以凿洞钓鱼；在厚厚的积雪里你可以堆雪人打雪仗多么有意思的游戏，小两口也在里边尽情的嬉戏；在寒风凛冽它们是自强不息的三个朋友，它挺立在山崖边，伫立在喧嚣的马路边，不论风有多大雪有多厚松柏依然屹立在那一动也不动；一根细长而笔直的高个子，动也不动的屹立在那青竹；她是冬天里的一枝花，凌霜傲雪。百花中的女汉子，不怕寒冷站在那，从此就有了“岁寒三友”！那厚厚的积雪在土壤里留下了天然的养料，为春天留下一个大大的红包。冰冷的积雪还是未能盖住冬天的美丽。',
        }
      ],
      detailIndex:0
    }
  },
  methods: {
    loginClick:function(userInfo) {
      this.userInfo = userInfo;
      console.log(userInfo);
      this.$router.push('/list');
    },
    itemClick:function(index) {
      this.detailIndex = index;
      this.$router.push('/detail');
    }
  },
  computed: {
    item:function () {
      return this.list[this.detailIndex]
    }
  },
  router:router

});