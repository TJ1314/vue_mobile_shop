import Vue from 'vue';
import 'vant/lib/index.css';
import {
  Button,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Toast,
  Grid,
  GridItem,
  Icon,
  Card,
  PullRefresh,
  Panel,
  Sticky,
  Field,
  CellGroup,
  List,
  Cell,
  NavBar,
  Loading,
  Tab,
  Tabs,
  Lazyload,
  ImagePreview,
  Row,
  Col,
  Stepper,
  SubmitBar,
  SwipeCell,
  Search,
  Tag,
  Notify
} from 'vant';

Vue.use(Tabbar)
  .use(TabbarItem)
  .use(Button)
  .use(Swipe)
  .use(SwipeItem)
  .use(Toast)
  .use(Grid)
  .use(GridItem)
  .use(Icon)
  .use(Card)
  .use(PullRefresh)
  .use(Panel)
  .use(Sticky)
  .use(Field)
  .use(CellGroup)
  .use(List)
  .use(Cell)
  .use(NavBar)
  .use(Loading)
  .use(Tab)
  .use(Tabs)
  .use(Lazyload, { lazyComponent: true })
  .use(ImagePreview)
  .use(Row)
  .use(Col)
  .use(Stepper)
  .use(SubmitBar)
  .use(SwipeCell)
  .use(Search)
  .use(Tag)
  .use(Notify);

Vue.prototype.Notify = Notify;
