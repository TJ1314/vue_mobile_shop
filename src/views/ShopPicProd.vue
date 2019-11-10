<template>
  <div>
    <h4>{{picProd.title}}</h4>
    <hr>
    <div v-html="picProd.content" class="goodsDesc-content">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopId: '',
      // 图文信息对象
      picProd: {}
    };
  },
  created() {
    this.shopId = this.$route.query.id;
    console.log(this.shopId);
    this.getPicPord();
  },
  methods: {
    // 获取图文详情介绍
    async getPicPord() {
      const { data: res } = await this.$http.get(`/api/goods/getdesc/${this.shopId}`);
      if (res.status !== 0) {
        this.$toast('服务器异常');
      }
      // console.log(res);
      this.picProd = res.message[0];
      console.log(this.picProd);
    }
  }
};
</script>

<style lang="less" scoped>
h4 {
  font-size: 16px;
  color: #226aff;
  text-align: center;
  margin: 15px 0;
}
hr {
  display: block;
  unicode-bidi: isolate;
  overflow: hidden;
  border-style: inset;
  border-width: 1px;
}
</style>