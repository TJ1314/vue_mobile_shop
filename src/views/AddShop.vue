<template>
  <div>
    <van-cell-group>
      <van-field v-model="value" placeholder="请输入商品名称" />
    </van-cell-group>
    <van-button type="info" size="large" @click="addShop">添加商品</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    };
  },
  created() {},
  methods: {
    async addShop() {
      if (this.value.trim().length === 0) {
        return this.$notify('请输入商品名称');
      }
      const { data: res } = await this.$http.post('/api/addproduct', {
        name: this.value
      });
      console.log(res);
      if (res.status !== 0) {
        this.$toast('服务器异常');
      }
      this.Notify({ type: 'success', message: '通知内容' });
      this.$router.push('/search');
    }
  }
};
</script>

<style lang="less" scoped>
.van-button {
  margin-top: 20px;
}
</style>