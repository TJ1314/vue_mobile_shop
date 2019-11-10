<template>
  <div>
    <van-swipe-cell v-for="item in shops" :key="item.id">
      <van-card :num="item.num" :price="item.sell_price" :title="item.title" :thumb="item.thumb_path">
        <div slot="footer">
          <van-stepper v-model="item.value" @change="shopNum(item.id,item.value)" />
        </div>
      </van-card>
      <template slot="right">
        <van-button square type="danger" text="删除" @click="deleteShop(item.id)" />
      </template>
    </van-swipe-cell>
    <van-submit-bar v-if="!flag" :price="totalPrice" button-text="提交订单" @submit="onSubmit" />
    <div v-if="flag" class="empty">
      <div class="son">
        <img src="../assets/imgs/shopCar.png" alt="">
      </div>
      <p>
        购物车空空如也，快去商城逛逛吧
      </p>
      <van-button type="info" size="small" @click="goShopList">去逛逛</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopIdSts: '',
      shopInfoList: [],
      shopIdArr: [],
      shops: [],
      // 控制购物车空空如也显示与隐藏
      flag: false
    };
  },
  created() {
    // 判断sessionStorage存储的shopCarList是否为空，如果为空，不进行下面的操作
    if (sessionStorage.getItem('shopCarList') !== null) {
      // 获取初始购物车相关数据
      this.updateList();
      // 当页面刷新时，获取初始商品数量
      this.$store.commit('begin');
    } else {
      // 如果当前购物车没有获得商品数据，显示空空如也组件
      this.flag = true;
    }
  },
  methods: {
    onSubmit() {},
    // 获取购物车列表数据
    async getShopCarList() {
      // console.log(this.shopIdSts);
      const { data: res } = await this.$http.get(`/api/goods/getshopcarlist/${this.shopIdSts}`);
      if (res.status !== 0) {
        this.$toast('服务器异常');
      }
      this.shops = res.message;
      this.shops.forEach(item => {
        this.shopInfoList.forEach(attr => {
          // 如果id匹配，给其每一项添加num数
          if (item.id === attr.id) {
            item.num = attr.num;
            item.value = attr.num;
          }
        });
      });
      console.log(this.shops);
    },
    // 监听商品数量变化
    shopNum(id, num) {
      console.log(num);
      const obj = {
        id: id,
        num: num
      };
      // console.log(obj);
      this.$store.commit('shopNum', obj);
      this.updateList();
    },
    // 获取初始购物车相关数据
    updateList() {
      this.shopInfoList = JSON.parse(sessionStorage.getItem('shopCarList'));
      console.log(this.shopInfoList);
      // console.log(Array.isArray(this.shopInfoList));
      this.shopInfoList.forEach(item => {
        // 得到id数组
        this.shopIdArr.push(item.id);
      });
      // 得到id查询字符串
      this.shopIdSts = this.shopIdArr.join(',');
      // console.log(this.shopIdSts);
      // 获取购物车列表数据
      this.getShopCarList();
    },
    // 删除商品
    deleteShop(id) {
      this.$store.commit('deleteShop', id);
      this.$toast('删除成功');
      location.reload();
    },
    // 前往商城
    goShopList() {
      this.$router.push('/goodList');
    }
  },
  // 计算总价格
  computed: {
    totalPrice: {
      get: function() {
        let total = 0;
        this.shops.forEach((item, index) => {
          total += item.num * item.sell_price * 100;
        });
        return total;
      },
      set: function() {
        console.log('1');
      }
    }
  }
};
</script>

<style lang="less" scoped>
.empty {
  margin-top: 15px;
  color: gray;
  text-align: center;
  .son {
    margin: 0 auto;
    width: 100px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>