<template>
  <div class="layout">

    <!-- S tab -->
      <div class="category-search">
        <van-search placeholder="请输入搜索关键词" v-model="value" />
      </div>
    <!-- E tab -->

    <!-- S 内容区域 -->
      <div class="content1">

        <!-- S 左侧边栏 -->
          <div class="menu-wrapper" ref="menuWrapper">
            <ul>
              <li v-for="(item, index) in goodList" class="menu-item border-1px" :class="{'current':currentIndex === index}"
                  @click="selectMenu(index, $event)" :key="index">
                <span class="text">
                  <span v-show="item.type>0" :class="classMap[item.type]"></span>{{item.name}}
                </span>
              </li>
            </ul>
          </div>
        <!-- E 左侧边栏 -->
        
        <!-- S 右侧边栏 -->
          <div class="foods-wrapper" ref="foodWrapper">
            <ul>
              <li v-for="(item,call) in goodList" class="food-list food-list-hook" :key="call">
                <h1 class="title">{{item.name}}</h1>
                <ul class="productList">
                  <li v-for="(food,inl) in item.foods" class="food-item" @click="selectFood(food, $event)" :key="inl">
                    <div class="icon">
                      <img :src="food.icon" alt="" width="57">
                    </div>
                    <div class="content">
                      <h2 class="name">{{food.name}}</h2>
                      <!-- <p class="desc">{{food.description}}</p>
                      <div class="extra">
                        <span class="count">月售{{food.sellCount}}</span><span class="count">好评{{food.rating}}</span>
                      </div>
                      <div class="price">
                        <span class="now">￥{{food.price}}</span><span class="old"
                                                                      v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                      </div> -->
                      <div class="cartControl-wrapper">
                        <!-- <cartControl :food="food" @increment="incrementTotal"></cartControl> -->
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        <!-- E 右侧边栏 -->

      </div>
    <!-- E 内容区域 -->
  </div>
</template>

<script>
import BScroll from 'better-scroll' // 使用better-scrol实现滑动
import { TreeSelect, Search } from 'vant';

  export default {
    components: {
      [Search.name]: Search,
    },
    data () {
      return {
        value:'',
        tabList: ['列表', '详情'],
        pageNum: 0,
        listHeight: [],
        scrolly: 0, // 滚动处始值
        goodList: [
          {
            "name": "果拼果汁",
            "type": -1,
            "foods": [
              {
                "name": "蜜瓜圣女萝莉杯",
                "price": 6,
                "oldPrice": "",
                "description": "",
                "sellCount": 1,
                "rating": "",
                "info": "",
                "ratings": [],
                "icon": "http://fuss10.elemecdn.com/b/5f/b3b04c259d5ec9fa52e1856ee50dajpeg.jpeg?imageView2/1/w/114/h/114",
                "image": "http://fuss10.elemecdn.com/b/5f/b3b04c259d5ec9fa52e1856ee50dajpeg.jpeg?imageView2/1/w/750/h/750"
              },
              {
                "name": "加多宝",
                "price": 6,
                "oldPrice": "",
                "description": "",
                "sellCount": 7,
                "rating": 100,
                "info": "",
                "ratings": [
                  {
                    "username": "3******c",
                    "rateTime": 1469281964000,
                    "rateType": 0,
                    "text": "",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                  },
                  {
                    "username": "2******3",
                    "rateTime": 1469271264000,
                    "rateType": 0,
                    "text": "",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                  },
                  {
                    "username": "3******b",
                    "rateTime": 1469261964000,
                    "rateType": 0,
                    "text": "",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                  }
                ],
                "icon": "http://fuss10.elemecdn.com/b/9f/5e6c99c593cf65229225c5661bcdejpeg.jpeg?imageView2/1/w/114/h/114",
                "image": "http://fuss10.elemecdn.com/b/9f/5e6c99c593cf65229225c5661bcdejpeg.jpeg?imageView2/1/w/750/h/750"
              },
              {
                "name": "VC无限橙果汁",
                "price": 8,
                "oldPrice": 10,
                "description": "",
                "sellCount": 15,
                "rating": 100,
                "info": "",
                "ratings": [
                  {
                    "username": "3******c",
                    "rateTime": 1469281964000,
                    "rateType": 0,
                    "text": "还可以",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                  },
                  {
                    "username": "2******3",
                    "rateTime": 1469271264000,
                    "rateType": 0,
                    "text": "",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                  }
                ],
                "icon": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/114/h/114",
                "image": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/750/h/750"
              }
            ]
          },
          {
            "name": "酒水",
            "type": -1,
            "foods": [
              {
                "name": "蜜瓜圣女萝莉杯",
                "price": 6,
                "oldPrice": "",
                "description": "",
                "sellCount": 1,
                "rating": "",
                "info": "",
                "ratings": [],
                "icon": "http://fuss10.elemecdn.com/b/5f/b3b04c259d5ec9fa52e1856ee50dajpeg.jpeg?imageView2/1/w/114/h/114",
                "image": "http://fuss10.elemecdn.com/b/5f/b3b04c259d5ec9fa52e1856ee50dajpeg.jpeg?imageView2/1/w/750/h/750"
              },
              {
                "name": "加多宝",
                "price": 6,
                "oldPrice": "",
                "description": "",
                "sellCount": 7,
                "rating": 100,
                "info": "",
                "ratings": [
                  {
                    "username": "3******c",
                    "rateTime": 1469281964000,
                    "rateType": 0,
                    "text": "",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                  },
                  {
                    "username": "2******3",
                    "rateTime": 1469271264000,
                    "rateType": 0,
                    "text": "",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                  },
                  {
                    "username": "3******b",
                    "rateTime": 1469261964000,
                    "rateType": 0,
                    "text": "",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                  }
                ],
                "icon": "http://fuss10.elemecdn.com/b/9f/5e6c99c593cf65229225c5661bcdejpeg.jpeg?imageView2/1/w/114/h/114",
                "image": "http://fuss10.elemecdn.com/b/9f/5e6c99c593cf65229225c5661bcdejpeg.jpeg?imageView2/1/w/750/h/750"
              },
              {
                "name": "VC无限橙果汁",
                "price": 8,
                "oldPrice": 10,
                "description": "",
                "sellCount": 15,
                "rating": 100,
                "info": "",
                "ratings": [
                  {
                    "username": "3******c",
                    "rateTime": 1469281964000,
                    "rateType": 0,
                    "text": "还可以",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                  },
                  {
                    "username": "2******3",
                    "rateTime": 1469271264000,
                    "rateType": 0,
                    "text": "",
                    "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                  }
                ],
                "icon": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/114/h/114",
                "image": "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/750/h/750"
              }
            ]
          },
          // {
          //   "name": "小吃主食",
          //   "type": -1,
          //   "foods": [
          //     {
          //       "name": "扁豆焖面",
          //       "price": 14,
          //       "oldPrice": "",
          //       "description": "",
          //       "sellCount": 188,
          //       "rating": 96,
          //       "info": "",
          //       "ratings": [
          //         {
          //           "username": "3******c",
          //           "rateTime": 1469281964000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         },
          //         {
          //           "username": "2******3",
          //           "rateTime": 1469271264000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         },
          //         {
          //           "username": "3******b",
          //           "rateTime": 1469261964000,
          //           "rateType": 1,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         }
          //       ],
          //       "icon": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114",
          //       "image": "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/750/h/750"
          //     },
          //     {
          //       "name": "葱花饼",
          //       "price": 10,
          //       "oldPrice": "",
          //       "description": "",
          //       "sellCount": 124,
          //       "rating": 85,
          //       "info": "",
          //       "ratings": [
          //         {
          //           "username": "3******c",
          //           "rateTime": 1469281964000,
          //           "rateType": 1,
          //           "text": "没啥味道",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         },
          //         {
          //           "username": "2******3",
          //           "rateTime": 1469271264000,
          //           "rateType": 1,
          //           "text": "很一般啊",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         },
          //         {
          //           "username": "3******b",
          //           "rateTime": 1469261964000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         }
          //       ],
          //       "icon": "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/114/h/114",
          //       "image": "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/750/h/750"
          //     },
          //     {
          //       "name": "牛肉馅饼",
          //       "price": 14,
          //       "oldPrice": "",
          //       "description": "",
          //       "sellCount": 114,
          //       "rating": 91,
          //       "info": "",
          //       "ratings": [
          //         {
          //           "username": "3******c",
          //           "rateTime": 1469281964000,
          //           "rateType": 1,
          //           "text": "难吃不推荐",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         },
          //         {
          //           "username": "2******3",
          //           "rateTime": 1469271264000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         },
          //         {
          //           "username": "3******b",
          //           "rateTime": 1469261964000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         }
          //       ],
          //       "icon": "http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/114/h/114",
          //       "image": "http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/750/h/750"
          //     },
          //     {
          //       "name": "招牌猪肉白菜锅贴/10个",
          //       "price": 17,
          //       "oldPrice": "",
          //       "description": "",
          //       "sellCount": 101,
          //       "rating": 78,
          //       "info": "",
          //       "ratings": [
          //         {
          //           "username": "3******c",
          //           "rateTime": 1469281964000,
          //           "rateType": 1,
          //           "text": "不脆,不好吃",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         },
          //         {
          //           "username": "2******3",
          //           "rateTime": 1469271264000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         },
          //         {
          //           "username": "3******b",
          //           "rateTime": 1469261964000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         }
          //       ],
          //       "icon": "http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114",
          //       "image": "http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/750/h/750"
          //     },
          //     {
          //       "name": "糊塌子",
          //       "price": 10,
          //       "oldPrice": "",
          //       "description": "",
          //       "sellCount": 80,
          //       "rating": 93,
          //       "info": "",
          //       "ratings": [
          //         {
          //           "username": "3******c",
          //           "rateTime": 1469281964000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         },
          //         {
          //           "username": "2******3",
          //           "rateTime": 1469271264000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         },
          //         {
          //           "username": "3******b",
          //           "rateTime": 1469261964000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         }
          //       ],
          //       "icon": "http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/114/h/114",
          //       "image": "http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/750/h/750"
          //     }
          //   ]
          // },
          // {
          //   "name": "特色粥品",
          //   "type": -1,
          //   "foods": [
          //     {
          //       "name": "皮蛋瘦肉粥",
          //       "price": 10,
          //       "oldPrice": "",
          //       "description": "咸粥",
          //       "sellCount": 229,
          //       "rating": 100,
          //       "ratings": [
          //         {
          //           "username": "3******c",
          //           "rateTime": 1469281964000,
          //           "rateType": 0,
          //           "text": "很喜欢的粥",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         },
          //         {
          //           "username": "2******3",
          //           "rateTime": 1469271264000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         },
          //         {
          //           "username": "3******b",
          //           "rateTime": 1469261964000,
          //           "rateType": 1,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         }
          //       ],
          //       "icon": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
          //       "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
          //     },
          //     {
          //       "name": "南瓜粥",
          //       "price": 9,
          //       "oldPrice": "",
          //       "description": "甜粥",
          //       "sellCount": 91,
          //       "rating": 100,
          //       "info": "",
          //       "ratings": [
          //         {
          //           "username": "3******c",
          //           "rateTime": 1469281964000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         },
          //         {
          //           "username": "2******3",
          //           "rateTime": 1469271264000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         },
          //         {
          //           "username": "3******b",
          //           "rateTime": 1469261964000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         }
          //       ],
          //       "icon": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114",
          //       "image": "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750"
          //     },
          //     {
          //       "name": "红豆薏米美肤粥",
          //       "price": 12,
          //       "oldPrice": "",
          //       "description": "甜粥",
          //       "sellCount": 86,
          //       "rating": 100,
          //       "info": "",
          //       "ratings": [
          //         {
          //           "username": "3******c",
          //           "rateTime": 1469281964000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         },
          //         {
          //           "username": "2******3",
          //           "rateTime": 1469271264000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         },
          //         {
          //           "username": "3******b",
          //           "rateTime": 1469261964000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         }
          //       ],
          //       "icon": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/114/h/114",
          //       "image": "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/750/h/750"
          //     },
          //     {
          //       "name": "红枣山药糙米粥",
          //       "price": 10,
          //       "oldPrice": "",
          //       "description": "",
          //       "sellCount": 81,
          //       "rating": 91,
          //       "info": "",
          //       "ratings": [
          //         {
          //           "username": "3******c",
          //           "rateTime": 1469281964000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         },
          //         {
          //           "username": "2******3",
          //           "rateTime": 1469271264000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         },
          //         {
          //           "username": "3******b",
          //           "rateTime": 1469261964000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         }
          //       ],
          //       "icon": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
          //       "image": "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750"
          //     },
          //     {
          //       "name": "鲜蔬菌菇粥",
          //       "price": 11,
          //       "oldPrice": "",
          //       "description": "咸粥",
          //       "sellCount": 56,
          //       "rating": 100,
          //       "info": "",
          //       "ratings": [
          //         {
          //           "username": "3******c",
          //           "rateTime": 1469281964000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         },
          //         {
          //           "username": "2******3",
          //           "rateTime": 1469271264000,
          //           "rateType": 0,
          //           "text": ""
          //         },
          //         {
          //           "username": "3******b",
          //           "rateTime": 1469261964000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         }
          //       ],
          //       "icon": "http://fuss10.elemecdn.com/e/a3/5317c68dd618929b6ac05804e429ajpeg.jpeg?imageView2/1/w/114/h/114",
          //       "image": "http://fuss10.elemecdn.com/e/a3/5317c68dd618929b6ac05804e429ajpeg.jpeg?imageView2/1/w/750/h/750"
          //     },
          //     {
          //       "name": "田园蔬菜粥",
          //       "price": 10,
          //       "oldPrice": "",
          //       "description": "咸粥",
          //       "sellCount": 33,
          //       "rating": 100,
          //       "info": "",
          //       "ratings": [
          //         {
          //           "username": "3******c",
          //           "rateTime": 1469281964000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         },
          //         {
          //           "username": "2******3",
          //           "rateTime": 1469271264000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         },
          //         {
          //           "username": "3******b",
          //           "rateTime": 1469261964000,
          //           "rateType": 0,
          //           "text": "",
          //           "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
          //         }
          //       ],
          //       "icon": "http://fuss10.elemecdn.com/a/94/7371083792c19df00e546b29e344cjpeg.jpeg?imageView2/1/w/114/h/114",
          //       "image": "http://fuss10.elemecdn.com/a/94/7371083792c19df00e546b29e344cjpeg.jpeg?imageView2/1/w/750/h/750"
          //     }
          //   ]
          // }
        ] // 模拟一些假数据
      }
    },
    created () {
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(()=> {
        this._initScroll()
        this._calculateHeight()
      })
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    computed: {
      currentIndex () { //计算到达哪个区域的区间的时候的对应的索引值
        for(let i = 0; i < this.listHeight.length; i++) { 
          let height = this.listHeight[i] //当前menu子块的高度
          let height2 = this.listHeight[i+1] //下一个menu子块的高度
          //滚动到底部的时候,height2为undefined,需要考虑这种情况
          //需要确定是在两个menu子块的高度区间
          if (!height2 || (this.scrolly >= height && this.scrolly < height2)) {
            return i //返回这个menu子块的索引
          }
        }
        return 0
      }
    },
    methods: {
      //初始化scroll区域
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true //结合BScroll的接口使用,是否将click事件传递,默认被拦截了
        })
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          probeType: 3, //结合BScroll的接口使用,3实时派发scroll事件，探针的作用
          click: true
        })
        //结合BScroll的接口使用,监听scroll事件(实时派发的),并获取鼠标坐标，当滚动时能实时暴露出scroll
        this.foodScroll.on('scroll', (pos) => {
          this.scrolly = Math.abs(Math.round(pos.y))  //滚动坐标会出现负的,并且是小数,所以需要处理一下，实时取得scrollY
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')  //获取每一个food的dom对象
        let height = 0;
        this.listHeight.push(height)  //初始化第一个高度为0
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i] //每一个item都是刚才获取的food的每一个dom
          height += item.clientHeight //主要是为了获取每一个foods内部块的高度
          this.listHeight.push(height)
        }
      },
      selectMenu (index, event) {
        console.log(1);
        
         if (!event._constructed) { //去掉自带的click事件点击，即pc端直接返回
          return;
        }
        // debugger;
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
         //类似jump to的功能,通过这个方法,跳转到指定的dom
        this.foodScroll.scrollToElement(el, 300);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .layout {
    width: 100%;
    .tab {
      width: 100%;
      height: 40px;
      display: flex;
      // background-color: skyblue;
      // .tab-item {
      //   flex: 1;
      //   align-self: center; // 弹性子元素剧中
      //   text-align: center;
      //   a {
      //     color: black;          
      //     text-decoration: none;
      //     -webkit-tap-highlight-color:rgba(0,0,0,0); // 去除a标签点击时高亮背景
      //     &.link {
      //       color: red;
      //     }
      //   }
      // }
    }
    .content1 {
      display: flex;
      position: absolute;
      top: 44px;
      bottom: 46px;
      width: 100%;
      overflow: hidden;
      background: #fff;
      .menu-wrapper {
        flex: 0 0 80px;
        width: 80px;
        background: #F3F3F4;
        .menu-item {
          display: table;
          width: 56px;
          height: 54px;
          line-height: 14px;
          padding: 0 12px;
          // border-left: 4px solid transparent;
          &.current {
            position: relative;
            z-index: 10;
            margin-top: -1px;
            background: #fff;
            // font-weight: 700;
            // box-sizing:  border-box;
            border-left: 4px solid #8FC221;
            color: #8FC221;
            .text {
              &:after{
                display: none
              }
            }
          }
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            vertical-align: top;
            margin-right: 4px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease {
              background-image: url(https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=594559231,2167829292&fm=27&gp=0.jpg);
            }
            &.discount {
              background-image: url(https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3044191397,2911599132&fm=27&gp=0.jpg);

            }
            &.guarantee {
              background-image: url(https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1944805937,3724010146&fm=27&gp=0.jpg);
              
            }
            &.invoice {
              background-image: url(https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=147015573,3182587356&fm=27&gp=0.jpg);

            }
            &.special {
              background-image: url(https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1046983545,2051560208&fm=27&gp=0.jpg);

            }
              
          }
          .text {
            display: table-cell;
            width: 56px;
            vertical-align: middle;
             position: relative;
             font-size: 14px;  
            &:after {
              display: block;
              position: absolute;
              left: 0;
              bottom: 0;
              // border-top: 1px solid red;
              width: 100%;
              content: '';
            }
          }
        }
      }
     .foods-wrapper {
       flex: 1;
       .productList {
         display: flex;
         flex-wrap: wrap;
         height: 600px;
       }
       .food-list {
         .title {
            padding-left: 14px;
            // height: 30px;
            line-height: 30px;
            // border-left: 2px solid #d9dde1;
            font-size: 14px;
            // color: rgb(147, 153, 159);
            // background: #f3f5f7;
         }
         .food-item {
            display: flex;
            flex-direction: column;
            margin: 18px;
            width: 60px;
            height: 70px;
            padding-bottom: 18px;
            &:after {
              display: block;
              position: absolute;
              left: 0;
              bottom: 0;
              width: 100%;
              content: '';
            }
            &:last-child {
              &:after{
                display: none
              }
            }
            .icon {
              flex: 0 0 57px;
              margin-right: 10px;
            }
            .content {
              flex: 1;
              .name {
                margin: 2px 0 8px 0;
                font-size: 14px;
                line-height: 14px;
                height: 14px;
                color: rgb(7, 17, 27);
              }
              // .desc, .extra {
              //   font-size: 10px;
              //   line-height: 10px;
              //   color: rgb(147, 153, 159);
              // }
              // .desc {
              //    margin-bottom: 8px;
              //    line-height: 12px;
              // }
              // .extra {
              //   .count {
              //     margin-right: 12px;
              //   }
              // }
              // .price {
              //     // font-weight: 700px;
              //     line-height: 24px;
              //     .now {
              //        margin-right: 8px;
              //        font-size: 14px;
              //        color: rgb(240, 20, 20);
              //     }
              //   .old {
              //     font-size: 10px;
              //     color: rgb(147, 153, 159);
              //     text-decoration: line-through;
              //   }
                  
              // }
              // .cartControl-wrapper {
              //    position: absolute;
              //   right: 0;
              //   bottom: 12px;

              // }
            
            }
         }
       }
     }
    }
  }
</style>