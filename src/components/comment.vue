<template>
  <div>
    <div class="comment">
      <h4>发表评论</h4>
      <div class="message">
        <van-cell-group>
          <van-field v-model="message" rows="4" autosize type="textarea" placeholder="请输入留言" />
        </van-cell-group>
      </div>
      <van-button type="info" @click="createNewComment">发表评论</van-button>
    </div>
    <div class="commentBox">
      <van-list>
        <van-cell>
          <div Slots="default" v-for="(item,index) in commentList" :key="item.id">
            <div class="userInfo">
              <p class="p1">
                <span><i>第</i><i>{{index+1}}</i><i>楼</i></span>
                <span>用户:{{item.user_name}}</span>
                <span>发表时间:{{item.add_time | dateFormat}}</span>
              </p>
              <p class="p2">
                {{item.content}}
              </p>
            </div>
          </div>
        </van-cell>
      </van-list>
    </div>
    <van-button type="warning" @click="getMore">加载更多</van-button>
  </div>
</template>

<script>
export default {
  props: ['Id'],
  data() {
    return {
      // 评论信息
      message: '',
      // 评论数据
      commentList: [],
      pageindex: 1
    };
  },
  created() {
    console.log(this.Id);
    this.getCommentList();
  },
  methods: {
    // 获取评论列表数据
    async getCommentList() {
      const { data: res } = await this.$http.get(`/api/getcomments/${this.Id}?pageindex=${this.pageindex}`);
      // console.log(res);
      if (res.status !== 0) {
        this.$toast('服务器异常');
      }
      this.commentList = res.message;
      // console.log(this.commentList);
    },
    // 加载更多
    async getMore() {
      this.pageindex++;
      // console.log(this.pageindex);
      const { data: res } = await this.$http.get(`/api/getcomments/${this.Id}?pageindex=${this.pageindex}`);
      // console.log(res.message);
      if (res.status !== 0) {
        this.$toast('没有更多了');
      }
      this.commentList.push(...res.message);
      // console.log(this.commentList);
    },
    // 创建新评论
    async createNewComment() {
      if (this.message.trim().length === 0) {
        this.$toast('评论不能为空');
        this.message = '';
      }
      const { data: res } = await this.$http.post(`/api/postcomment/${this.Id}`, {
        content: this.message
      });
      console.log(res);
      if (res.status !== 0) {
        this.$toast('发表评论失败');
        this.message = '';
      }
      this.$toast('发表评论成功');
      this.message = '';
      this.getCommentList();
    }
  }
};
</script>

<style lang="less" scoped>
.comment {
  h4 {
    margin: 10px 0 10px;
    height: 40px;
    border-bottom: 1px solid lightgray;
  }
}

.message {
  border: 1px solid gray;
}

.van-button {
  margin-top: 5px;
  width: 100%;
  font-size: 15px;
  margin-bottom: 6px;
}

.userInfo {
  height: 50px;
  width: 100%;
  font-size: 12px;
  // background-color: pink;
  .p1 {
    margin: 0;
    background-color: lightgray;
    span {
      margin-right: 10px;
    }
  }
  .p2 {
    margin: 0;
    padding-left: 20px;
  }
}

.van-cell {
  padding: 0;
}
</style>