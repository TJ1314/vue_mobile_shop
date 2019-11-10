<template>
  <div class="card">
    <!-- 实现下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 新闻列表数据展示区域 -->
      <van-card :title="item.title.slice(0,22)" :thumb="item.img_url" v-for="item in newsList" :key="item.id" clearfix @click="goNewsDetail(item.id)">
        <div slot="bottom" class="colorSetting">
          <span>发表时间: {{item.add_time | dateFormat}}</span>
        </div>
        <div slot="num" class="colorSetting">
          <span>点击: {{item.click}}</span>
        </div>
      </van-card>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 新闻列表列表数据
      newsList: [],
      // 是否在加载中
      isLoading: false
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    // 获取新闻列表数据
    async getNewsList() {
      const { data: res } = await this.$http.get('/api/getnewslist');
      // console.log(res);
      if (res.status !== 0) {
        this.$toast('服务器异常');
      }
      this.newsList = res.message;
      // console.log(this.newsList);
    },
    // 实现页面刷新
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 500);
    },
    // 前往新闻详情页面
    goNewsDetail(newsId) {
      this.$router.push({ path: '/newsDetail', query: { id: newsId } });
    }
  }
};
</script>

<style lang="less" scoped>
.van-card {
  background: #fff;
  border-bottom: 1px solid #eee;
  margin: 0 10px;
  padding: 10px;
  position: relative;
  box-sizing: border-box;
  color: #323233;
  font-size: 12px;
  .van-card__thumb {
    width: 42px;
    height: 42px;
    flex: none;
    margin-right: 10px;
  }
  .van-card__content {
    min-height: 0;
    flex: 1;
    min-width: 0;
  }
}
.van-card__header {
  display: flex;
}
.colorSetting {
  color: blue;
}
.van-card__title {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
}
</style>