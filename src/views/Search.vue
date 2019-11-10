<template>
  <div class="Box">
    <form action="/">
      <van-search v-model="value" placeholder="请输入搜索关键词" show-action @search="onSearch" @cancel="onCancel" @clear="onCancel" />
    </form>
    <div class="one" v-if="resultList.length === 0">
      <div>
        <div class="history">
          <span>搜索历史</span>
          <van-icon name="delete" @click="clearHistory" />
        </div>
        <div>
          <div>
            <van-tag v-for="(item,index) in searchKeys" :key="index" size="medium" @click="history(item)">{{item}}</van-tag>
          </div>
          <div v-if="flag" class="serachHistory">
            <span>暂无搜索历史</span>
          </div>
        </div>
      </div>
    </div>
    <div class="two" v-else>
      <van-cell-group>
        <van-cell v-for="item in resultList" :key="item.id" :title="item.name" :value="item.ctime|dateFormat" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 搜索值
      value: '',
      // 搜索记录数组
      searchKeys: [],
      // 搜索结果数组
      resultList: [],
      // 控制是否有搜索历史记录元素的显示与隐藏
      flag: false
    };
  },
  created() {
    this.searchKeys = JSON.parse(sessionStorage.getItem('searchKeysList'));
    if (this.searchKeys === null) {
      this.flag = true;
    }
    console.log(this.searchKeys);
    console.log(this.resultList);
    // 当页面刷新的时候，防止数据丢失
    this.$store.commit('beginSearch');
  },
  methods: {
    // search事件在点击键盘上的搜索/回车按钮后触发
    async onSearch() {
      this.$store.commit('addSearchKey', this.value);
      this.searchKeys = JSON.parse(sessionStorage.getItem('searchKeysList'));
      console.log(this.searchKeys);
      const { data: res } = await this.$http.get('/api/getprodlist');
      if (res.status !== 0) {
        this.$toast('服务器异常');
      }
      this.resultList = res.message;
    },
    // cancel事件在点击搜索框右侧取消按钮时触发
    onCancel() {
      this.resultList = [];
    },
    // 点击历史记录
    history(value) {
      this.value = value;
    },
    // 清空历史记录
    clearHistory() {
      this.$store.commit('clearHistory');
      this.searchKeys = [];
      this.flag = true;
    }
  }
};
</script>

<style lang="less" scoped>
.Box {
  padding: 10px;
}
.history {
  margin-top: 15px;
  span {
    margin-right: 75%;
  }
  .van-icon {
    vertical-align: middle;
    display: inline-block;
  }
}
.serachHistory {
  font-size: 14px;
  margin-top: 30px;
  text-align: center;
  span:before {
    content: '';
    display: inline-block;
    height: 1px;
    width: 90px;
    background-color: lightgray;
    vertical-align: middle;
    margin-right: 20px;
  }
  span:after {
    content: '';
    display: inline-block;
    height: 1px;
    width: 90px;
    background-color: lightgray;
    vertical-align: middle;
    margin-left: 20px;
  }
}
.van-tag {
  margin-right: 10px;
  margin-top: 20px;
}
.one {
  margin-top: 15px;
}
</style>