<template>
  <div>
    <van-panel>
      <div slot="header" class="header">
        <h3>{{newData.title}}</h3>
        <p>
          <span>发表时间:{{newData.add_time | dateFormat}}</span>
          <span class="right">点击:{{newData.click}}</span>
        </p>
      </div>
      <div slot="default">
        <div v-html="newData.content"></div>
      </div>
      <my-comment :Id="newsId"></my-comment>
    </van-panel>
  </div>
</template>

<script>
import Comment from '../components/comment';
export default {
  data() {
    return {
      // 查询参数
      newsId: '',
      newData: {}
    };
  },
  created() {
    // 获取当前文章id
    this.newsId = this.$route.query.id;
    this.getNewSDetail();
  },
  methods: {
    // 获取新闻详情数据
    async getNewSDetail() {
      const { data: res } = await this.$http.get(`/api/getnew/${this.newsId}`);
      // console.log(res);
      if (res.status !== 0) {
        this.$toast('服务器异常');
      }
      this.newData = res.message[0];
      // console.log(this.newData);
    }
  },
  components: {
    'my-comment': Comment
  }
};
</script>

<style lang="less" scoped>
.header {
  padding-top: 10px;
  border-bottom: 1px solid lightgray;
  h3 {
    margin: 0;
    font-size: 14px;
    text-align: center;
    color: red;
  }
  p {
    color: red;
    margin: 10px 0 10px;
    span {
      font-size: 12px;
    }
  }
}

.right {
  float: right;
}

.van-panel {
  padding: 0 15px 0;
}
</style>