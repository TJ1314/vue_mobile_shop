<template>
  <div>
    <div class="Box">
      <my-comment :Id="shopId"></my-comment>
    </div>
  </div>
</template>

<script>
import Comment from '../components/comment';
export default {
  data() {
    return {
      shopId: ''
    };
  },
  created() {
    this.shopId = this.$route.query.id;
    console.log(this.shopId);
  },
  methods: {},
  components: {
    'my-comment': Comment
  }
};
</script>

<style lang="less" scoped>
.Box {
  padding: 10px;
}
</style>