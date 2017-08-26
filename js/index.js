
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
  template:'<div>\
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


var vm = new Vue({
  el: '#app',
  data: {},
  components: {
    'header-title':title,
    'my-login':login,
    'my-list':list,
    'my-detail':detail
  }

});