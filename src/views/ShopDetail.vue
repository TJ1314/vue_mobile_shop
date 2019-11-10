<template>
  <div class="Box">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in shopPics" :key="index">
        <img :src="item.src" alt="">
      </van-swipe-item>
    </van-swipe>
    <div class="goodInfo">
      <div class="one">
        {{goodInfo.title}}
      </div>
      <p>
        市场价:<span><s>￥{{goodInfo.market_price}}</s></span>销售价:<em>￥{{goodInfo.sell_price}}</em>
      </p>
      <div class="two">
        购买数量
        <van-stepper @change="shopNum" v-model="value" input-width="40px" button-size="32px" />
      </div>
      <van-button type="info" size="small">立即购买</van-button>
      <van-button type="danger" size="small" @click="addShopCar(goodInfo.id)">加入购物车</van-button>
    </div>
    <div class="goodParams">
      <div class="goodParmas_1">
        商品参数
      </div>
      <div class="goodParmas_2">
        <p>商品货号:{{goodInfo.goods_no}}</p>
        <p>库存情况:{{goodInfo.stock_quantity}}</p>
        <p>上架时间:{{goodInfo.add_time}}</p>
      </div>
      <div class="goodParmas_3">
        <van-button plain hairline type="info" size="normal" block @click="goGoodPicProdPage(goodInfo.id)">图文介绍</van-button>
        <van-button plain hairline type="danger" size="normal" block @click="goShopCommentPage(goodInfo.id)">商品评论</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopId: '',
      shopPics: [],
      // 商品基本参数信息
      goodInfo: {},
      value: 1
    };
  },
  created() {
    this.shopId = this.$route.query.id;
    // console.log(this.shopId);
    this.getShopPics();
    this.getGoodInfo();
    this.$store.commit('begin');
  },
  methods: {
    // 获取商品图片轮播图数据
    async getShopPics() {
      const { data: res } = await this.$http.get(`/api/getthumimages/${this.shopId}`);
      if (res.status !== 0) {
        this.$toast('服务器异常');
      }
      this.shopPics = res.message;
      // console.log(this.shopPics);
    },
    // 获取商品基本参数信息
    async getGoodInfo() {
      const { data: res } = await this.$http.get(`/api/goods/getinfo/${this.shopId}`);
      if (res.status !== 0) {
        this.$toast('服务器异常');
      }
      // console.log(res);
      this.goodInfo = res.message[0];
      // console.log(this.goodInfo);
    },
    // 前往商品图文介绍页面
    goGoodPicProdPage(id) {
      this.$router.push({
        path: '/shopPicProd',
        query: {
          id: id
        }
      });
    },
    // 前往商品图文介绍页面
    goShopCommentPage(id) {
      this.$router.push({
        path: '/shopComment',
        query: {
          id: id
        }
      });
    },
    // 添加购物车
    addShopCar(id) {
      // const obj = {
      //   id: id,
      //   num: this.value
      // };
      // console.log(obj);
      const num = this.value;
      console.log(num);
      // 传递初始添加规格
      this.$store.commit('beginNum', num);
      this.$store.commit('addShop', id);
      this.$toast('添加成功!');
    },
    shopNum() {
      // console.log(this.value);
    }
  }
};
</script>

<style lang="less" scoped>
.Box {
  padding: 10px 15px;
}
.van-swipe {
  border: 1px solid lightgray;
  height: 200px;
  width: 100%;
  text-align: center;
  img {
    width: 50%;
    height: 100%;
  }
}
.goodInfo {
  border: 1px solid lightgray;
  padding: 15px;
  margin: 10px 0;
  .one {
    height: 30px;
    border-bottom: 1px solid lightgray;
  }
  p {
    color: gray;
    span {
      margin: 0 20px;
    }
    em {
      margin-left: 20px;
      color: red;
      font-size: 20px;
      font-weight: 700;
    }
  }
  .two {
    margin: 15px 0;
    .van-stepper {
      display: inline-block;
      vertical-align: middle;
      margin-left: 10px;
    }
  }
  .van-button--info {
    margin-right: 15px;
  }
}
.goodParams {
  border: 1px solid lightgray;
  padding: 15px;
  .goodParmas_1 {
    height: 30px;
    border-bottom: 1px solid lightgray;
  }
  .goodParmas_2 {
    margin-bottom: 15px;
    border-bottom: 1px solid lightgray;
    font-size: 14px;
    color: gray;
  }
  .goodParmas_3 {
    .van-button {
      margin-bottom: 10px;
    }
  }
}
</style>