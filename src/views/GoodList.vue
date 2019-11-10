<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-row gutter="20">
          <van-col span="12" v-for="item in goodList" :key="item.id">
            <div class="Box" @click="shopDetailPage(item.id)">
              <div class="one">
                <img :src="item.img_url" alt="">
              </div>
              <p class="p1">
                {{item.title}}
              </p>
              <div class="two">
                <p>
                  <span class="span1">
                    ￥{{item.market_price}}
                  </span>
                  <span class="span2">
                    <s>{{item.sell_price}}</s>
                  </span>
                </p>
                <p>
                  <span>热卖中</span>
                  <span>剩60件</span>
                </p>
              </div>
            </div>
          </van-col>
        </van-row>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageindex: 1,
      // 获取商品列表数据
      goodList: [],
      loading: false,
      finished: false,
      isLoading: false
    };
  },
  created() {
    this.getGoodList();
  },
  methods: {
    // 获取商品列表数据
    async getGoodList() {
      const { data: res } = await this.$http.get(`/api/getgoods?pageindex=${this.pageindex}`);
      if (res.status !== 0) {
        this.$toast('服务器异常');
      }
      // console.log(res);
      this.goodList = res.message;
    },
    // 前往商品详情页面
    shopDetailPage(id) {
      this.$router.push({ path: '/shopDetail', query: { id: id } });
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 500);
    },
    // 商品懒加载
    async onLoad() {
      this.pageindex++;
      const { data: res } = await this.$http.get(`/api/getgoods?pageindex=${this.pageindex}`);
      if (res.status !== 0) {
        this.$toast('服务器异常');
      }
      console.log(res.message);
      this.goodList.push(...res.message);
      this.loading = false;
      if (res.message.length < 10) {
        this.finished = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.Box {
  border: 1px solid lightgray;
  margin: 10px 0;
  p {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.one {
  height: 122px;
  padding: 30px;
  img {
    width: 100%;
    height: 100%;
  }
}
.two {
  padding: 10px;
  p {
    margin: 0 0 10px 0;
    span {
      margin-right: 30px;
    }
  }
  background: rgba(0, 0, 0, 0.2);
}
.p1 {
  padding: 0 10px;
  font-size: 14px;
}
.span1 {
  font-size: 16px;
  color: red;
}
.span2 {
  font-size: 14px;
  color: gray;
}
</style>