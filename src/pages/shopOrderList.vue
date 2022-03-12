<template>
  <div id="container">
    <div class="sidebar">
      <span><img src="/imgs/pdd_small_logo1.png" alt="" @click="goToIndex">卖家管理系统</span>
      <a href="javascript:" @click="goToShop">商店管理</a>
      <a href="javascript:" @click="goToProduct">商品管理</a>
      <a href="javascript:" style="background-color: #e4291e">订单管理</a>
    </div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部订单" name="0">
          <el-table v-bind:data="orderList" :default-expand-all="true" class="parentTable"
                    ref="multipleTable"
                    height="678">
            <el-table-column type="expand">
              <template slot-scope="props">
                <div class="conWrap"
                     style="text-align: left;line-height: 16px;font-size: 14px;position: relative;top: -10px;">
                  <el-popover trigger="hover" placement="top">
                    <p>订单编号: {{ props.row.orderId }}</p>
                    <p>收货人姓名: {{ props.row.receiverName }}</p>
                    <p>收货人地址: {{ props.row.receiverAddress }}</p>
                    <p>收货人电话: {{ props.row.receiverMobile }}</p>
                    <div slot="reference" class="name-wrapper">
                      <span>订单编号: {{ props.row.orderId }}</span>
                      <span style="margin-left:42px;" v-if="props.row.orderStatus===1">待发货</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===2">待收货</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===3">待评分</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===4">已完成</span>
                      <span style="margin-left:42px;"
                            v-else-if="props.row.orderStatus===5 || props.row.orderStatus===6">待处理退款申请</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===7">已退款</span>
                      <el-tag size="medium" class="name" style="margin-left:42px;">收货人姓名:{{
                          props.row.receiverName
                        }}
                      </el-tag>
                      <el-button style="margin-left:42px;" v-if="props.row.orderStatus===1" type="text" size="small"
                                 v-on:click="confirmDelivery(props.row.orderId)">确认发货
                      </el-button>
                      <el-button style="margin-left:42px;" v-if="props.row.orderStatus===5 || props.row.orderStatus===6"
                                 type="text" size="small" v-on:click="refund(props.row.orderId)">退款
                      </el-button>
                      <el-button style="margin-left:42px;" v-if="props.row.orderStatus===5 || props.row.orderStatus===6"
                                 type="text" size="small" v-on:click="refuseRefund(props.row.orderId)">拒绝退款
                      </el-button>
                    </div>
                  </el-popover>
                </div>
                <el-table v-bind:data="props.row.orderItemList" :default-expand-all="true" stripe :show-header="false"
                          class="childTable">
                  <el-table-column prop="productName" align="center"
                                   label="商品名称"
                                   width="180">
                    <template slot-scope="scope">
                      <div class="name-b">{{ scope.row.productName }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="productImg" align="center"
                                   label="商品图片"
                                   width="180">
                    <template slot-scope="scope">
                      <div class="name-b">
                        <el-image :src="scope.row.productImg">
                          <div slot="placeholder" class="image-slot">
                            加载中<span class="dot"></span>
                          </div>
                        </el-image>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="price"
                                   label="单价"
                                   align="center"
                                   width="250">
                    <template slot-scope="scope">
                      <div class="name-b">{{ scope.row.unitPrice / 100 }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="quantity"
                                   label="数量"
                                   align="center"
                                   width="250">
                    <template slot-scope="scope">
                      <div class="name-b">{{ scope.row.quantity }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="162">
                    <template slot-scope="scope">
                      <div style="display:flex;">
                        <el-button type="text" size="small" v-on:click="checkProduct(scope.row)">查看商品</el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="text-align: left;line-height: 20px;font-size: 14px;position: center;top: -10px;">
                  订单总价:{{ props.row.orderTotalPrice / 100 }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="商品名称" align="center" width="180"></el-table-column>
            <el-table-column label="商品图片" align="center" width="180"></el-table-column>
            <el-table-column label="单价" align="center" width="250"></el-table-column>
            <el-table-column label="数量" align="center" width="250"></el-table-column>
            <el-table-column label="操作" align="center" width="118"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="待发货" name="1">
          <el-table v-bind:data="orderList" :default-expand-all="true" class="parentTable"
                    ref="multipleTable"
                    height="678">
            <el-table-column type="expand">
              <template slot-scope="props">
                <div class="conWrap"
                     style="text-align: left;line-height: 16px;font-size: 14px;position: relative;top: -10px;">
                  <el-popover trigger="hover" placement="top">
                    <p>订单编号: {{ props.row.orderId }}</p>
                    <p>收货人姓名: {{ props.row.receiverName }}</p>
                    <p>收货人地址: {{ props.row.receiverAddress }}</p>
                    <p>收货人电话: {{ props.row.receiverMobile }}</p>
                    <div slot="reference" class="name-wrapper">
                      <span>订单编号: {{ props.row.orderId }}</span>
                      <span style="margin-left:42px;" v-if="props.row.orderStatus===1">待发货</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===2">待收货</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===3">待评分</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===4">已完成</span>
                      <span style="margin-left:42px;"
                            v-else-if="props.row.orderStatus===5 || props.row.orderStatus===6">待处理退款申请</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===7">已退款</span>
                      <el-tag size="medium" class="name" style="margin-left:42px;">收货人姓名:{{
                          props.row.receiverName
                        }}
                      </el-tag>
                      <el-button style="margin-left:42px;" v-if="props.row.orderStatus===1" type="text" size="small"
                                 v-on:click="confirmDelivery(props.row.orderId)">确认发货
                      </el-button>
                      <el-button style="margin-left:42px;" v-if="props.row.orderStatus===5 || props.row.orderStatus===6"
                                 type="text" size="small" v-on:click="refund(props.row.orderId)">退款
                      </el-button>
                      <el-button style="margin-left:42px;" v-if="props.row.orderStatus===5 || props.row.orderStatus===6"
                                 type="text" size="small" v-on:click="refuseRefund(props.row.orderId)">拒绝退款
                      </el-button>
                    </div>
                  </el-popover>
                </div>
                <el-table v-bind:data="props.row.orderItemList" :default-expand-all="true" stripe :show-header="false"
                          class="childTable">
                  <el-table-column prop="productName" align="center"
                                   label="商品名称"
                                   width="180">
                    <template slot-scope="scope">
                      <div class="name-b">{{ scope.row.productName }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="productImg" align="center"
                                   label="商品图片"
                                   width="180">
                    <template slot-scope="scope">
                      <div class="name-b">
                        <el-image :src="scope.row.productImg">
                          <div slot="placeholder" class="image-slot">
                            加载中<span class="dot"></span>
                          </div>
                        </el-image>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="price"
                                   label="单价"
                                   align="center"
                                   width="250">
                    <template slot-scope="scope">
                      <div class="name-b">{{ scope.row.unitPrice / 100 }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="quantity"
                                   label="数量"
                                   align="center"
                                   width="250">
                    <template slot-scope="scope">
                      <div class="name-b">{{ scope.row.quantity }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="162">
                    <template slot-scope="scope">
                      <div style="display:flex;">
                        <el-button type="text" size="small" v-on:click="checkProduct(scope.row)">查看商品</el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="text-align: left;line-height: 20px;font-size: 14px;position: center;top: -10px;">
                  订单总价:{{ props.row.orderTotalPrice / 100 }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="商品名称" align="center" width="180"></el-table-column>
            <el-table-column label="商品图片" align="center" width="180"></el-table-column>
            <el-table-column label="单价" align="center" width="250"></el-table-column>
            <el-table-column label="数量" align="center" width="250"></el-table-column>
            <el-table-column label="操作" align="center" width="118"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="待收货" name="2">
          <el-table v-bind:data="orderList" :default-expand-all="true" class="parentTable"
                    ref="multipleTable"
                    height="678">
            <el-table-column type="expand">
              <template slot-scope="props">
                <div class="conWrap"
                     style="text-align: left;line-height: 16px;font-size: 14px;position: relative;top: -10px;">
                  <el-popover trigger="hover" placement="top">
                    <p>订单编号: {{ props.row.orderId }}</p>
                    <p>收货人姓名: {{ props.row.receiverName }}</p>
                    <p>收货人地址: {{ props.row.receiverAddress }}</p>
                    <p>收货人电话: {{ props.row.receiverMobile }}</p>
                    <div slot="reference" class="name-wrapper">
                      <span>订单编号: {{ props.row.orderId }}</span>
                      <span style="margin-left:42px;" v-if="props.row.orderStatus===1">待发货</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===2">待收货</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===3">待评分</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===4">已完成</span>
                      <span style="margin-left:42px;"
                            v-else-if="props.row.orderStatus===5 || props.row.orderStatus===6">待处理退款申请</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===7">已退款</span>
                      <el-tag size="medium" class="name" style="margin-left:42px;">收货人姓名:{{
                          props.row.receiverName
                        }}
                      </el-tag>
                      <el-button style="margin-left:42px;" v-if="props.row.orderStatus===1" type="text" size="small"
                                 v-on:click="confirmDelivery(props.row.orderId)">确认发货
                      </el-button>
                      <el-button style="margin-left:42px;" v-if="props.row.orderStatus===5 || props.row.orderStatus===6"
                                 type="text" size="small" v-on:click="refund(props.row.orderId)">退款
                      </el-button>
                      <el-button style="margin-left:42px;" v-if="props.row.orderStatus===5 || props.row.orderStatus===6"
                                 type="text" size="small" v-on:click="refuseRefund(props.row.orderId)">拒绝退款
                      </el-button>
                    </div>
                  </el-popover>
                </div>
                <el-table v-bind:data="props.row.orderItemList" :default-expand-all="true" stripe :show-header="false"
                          class="childTable">
                  <el-table-column prop="productName" align="center"
                                   label="商品名称"
                                   width="180">
                    <template slot-scope="scope">
                      <div class="name-b">{{ scope.row.productName }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="productImg" align="center"
                                   label="商品图片"
                                   width="180">
                    <template slot-scope="scope">
                      <div class="name-b">
                        <el-image :src="scope.row.productImg">
                          <div slot="placeholder" class="image-slot">
                            加载中<span class="dot"></span>
                          </div>
                        </el-image>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="price"
                                   label="单价"
                                   align="center"
                                   width="250">
                    <template slot-scope="scope">
                      <div class="name-b">{{ scope.row.unitPrice / 100 }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="quantity"
                                   label="数量"
                                   align="center"
                                   width="250">
                    <template slot-scope="scope">
                      <div class="name-b">{{ scope.row.quantity }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="162">
                    <template slot-scope="scope">
                      <div style="display:flex;">
                        <el-button type="text" size="small" v-on:click="checkProduct(scope.row)">查看商品</el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="text-align: left;line-height: 20px;font-size: 14px;position: center;top: -10px;">
                  订单总价:{{ props.row.orderTotalPrice / 100 }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="商品名称" align="center" width="180"></el-table-column>
            <el-table-column label="商品图片" align="center" width="180"></el-table-column>
            <el-table-column label="单价" align="center" width="250"></el-table-column>
            <el-table-column label="数量" align="center" width="250"></el-table-column>
            <el-table-column label="操作" align="center" width="118"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="待评分" name="3">
          <el-table v-bind:data="orderList" :default-expand-all="true" class="parentTable"
                    ref="multipleTable"
                    height="678">
            <el-table-column type="expand">
              <template slot-scope="props">
                <div class="conWrap"
                     style="text-align: left;line-height: 16px;font-size: 14px;position: relative;top: -10px;">
                  <el-popover trigger="hover" placement="top">
                    <p>订单编号: {{ props.row.orderId }}</p>
                    <p>收货人姓名: {{ props.row.receiverName }}</p>
                    <p>收货人地址: {{ props.row.receiverAddress }}</p>
                    <p>收货人电话: {{ props.row.receiverMobile }}</p>
                    <div slot="reference" class="name-wrapper">
                      <span>订单编号: {{ props.row.orderId }}</span>
                      <span style="margin-left:42px;" v-if="props.row.orderStatus===1">待发货</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===2">待收货</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===3">待评分</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===4">已完成</span>
                      <span style="margin-left:42px;"
                            v-else-if="props.row.orderStatus===5 || props.row.orderStatus===6">待处理退款申请</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===7">已退款</span>
                      <el-tag size="medium" class="name" style="margin-left:42px;">收货人姓名:{{
                          props.row.receiverName
                        }}
                      </el-tag>
                      <el-button style="margin-left:42px;" v-if="props.row.orderStatus===1" type="text" size="small"
                                 v-on:click="confirmDelivery(props.row.orderId)">确认发货
                      </el-button>
                      <el-button style="margin-left:42px;" v-if="props.row.orderStatus===5 || props.row.orderStatus===6"
                                 type="text" size="small" v-on:click="refund(props.row.orderId)">退款
                      </el-button>
                      <el-button style="margin-left:42px;" v-if="props.row.orderStatus===5 || props.row.orderStatus===6"
                                 type="text" size="small" v-on:click="refuseRefund(props.row.orderId)">拒绝退款
                      </el-button>
                    </div>
                  </el-popover>
                </div>
                <el-table v-bind:data="props.row.orderItemList" :default-expand-all="true" stripe :show-header="false"
                          class="childTable">
                  <el-table-column prop="productName" align="center"
                                   label="商品名称"
                                   width="180">
                    <template slot-scope="scope">
                      <div class="name-b">{{ scope.row.productName }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="productImg" align="center"
                                   label="商品图片"
                                   width="180">
                    <template slot-scope="scope">
                      <div class="name-b">
                        <el-image :src="scope.row.productImg">
                          <div slot="placeholder" class="image-slot">
                            加载中<span class="dot"></span>
                          </div>
                        </el-image>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="price"
                                   label="单价"
                                   align="center"
                                   width="250">
                    <template slot-scope="scope">
                      <div class="name-b">{{ scope.row.unitPrice / 100 }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="quantity"
                                   label="数量"
                                   align="center"
                                   width="250">
                    <template slot-scope="scope">
                      <div class="name-b">{{ scope.row.quantity }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="162">
                    <template slot-scope="scope">
                      <div style="display:flex;">
                        <el-button type="text" size="small" v-on:click="checkProduct(scope.row)">查看商品</el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="text-align: left;line-height: 20px;font-size: 14px;position: center;top: -10px;">
                  订单总价:{{ props.row.orderTotalPrice / 100 }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="商品名称" align="center" width="180"></el-table-column>
            <el-table-column label="商品图片" align="center" width="180"></el-table-column>
            <el-table-column label="单价" align="center" width="250"></el-table-column>
            <el-table-column label="数量" align="center" width="250"></el-table-column>
            <el-table-column label="操作" align="center" width="118"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="4">
          <el-table v-bind:data="orderList" :default-expand-all="true" class="parentTable"
                    ref="multipleTable"
                    height="678">
            <el-table-column type="expand">
              <template slot-scope="props">
                <div class="conWrap"
                     style="text-align: left;line-height: 16px;font-size: 14px;position: relative;top: -10px;">
                  <el-popover trigger="hover" placement="top">
                    <p>订单编号: {{ props.row.orderId }}</p>
                    <p>收货人姓名: {{ props.row.receiverName }}</p>
                    <p>收货人地址: {{ props.row.receiverAddress }}</p>
                    <p>收货人电话: {{ props.row.receiverMobile }}</p>
                    <div slot="reference" class="name-wrapper">
                      <span>订单编号: {{ props.row.orderId }}</span>
                      <span style="margin-left:42px;" v-if="props.row.orderStatus===1">待发货</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===2">待收货</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===3">待评分</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===4">已完成</span>
                      <span style="margin-left:42px;"
                            v-else-if="props.row.orderStatus===5 || props.row.orderStatus===6">待处理退款申请</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===7">已退款</span>
                      <el-tag size="medium" class="name" style="margin-left:42px;">收货人姓名:{{
                          props.row.receiverName
                        }}
                      </el-tag>
                      <el-button style="margin-left:42px;" v-if="props.row.orderStatus===1" type="text" size="small"
                                 v-on:click="confirmDelivery(props.row.orderId)">确认发货
                      </el-button>
                      <el-button style="margin-left:42px;" v-if="props.row.orderStatus===5 || props.row.orderStatus===6"
                                 type="text" size="small" v-on:click="refund(props.row.orderId)">退款
                      </el-button>
                      <el-button style="margin-left:42px;" v-if="props.row.orderStatus===5 || props.row.orderStatus===6"
                                 type="text" size="small" v-on:click="refuseRefund(props.row.orderId)">拒绝退款
                      </el-button>
                    </div>
                  </el-popover>
                </div>
                <el-table v-bind:data="props.row.orderItemList" :default-expand-all="true" stripe :show-header="false"
                          class="childTable">
                  <el-table-column prop="productName" align="center"
                                   label="商品名称"
                                   width="180">
                    <template slot-scope="scope">
                      <div class="name-b">{{ scope.row.productName }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="productImg" align="center"
                                   label="商品图片"
                                   width="180">
                    <template slot-scope="scope">
                      <div class="name-b">
                        <el-image :src="scope.row.productImg">
                          <div slot="placeholder" class="image-slot">
                            加载中<span class="dot"></span>
                          </div>
                        </el-image>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="price"
                                   label="单价"
                                   align="center"
                                   width="250">
                    <template slot-scope="scope">
                      <div class="name-b">{{ scope.row.unitPrice }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="quantity"
                                   label="数量"
                                   align="center"
                                   width="250">
                    <template slot-scope="scope">
                      <div class="name-b">{{ scope.row.quantity / 100 }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="162">
                    <template slot-scope="scope">
                      <div style="display:flex;">
                        <el-button type="text" size="small" v-on:click="checkProduct(scope.row)">查看商品</el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="text-align: left;line-height: 20px;font-size: 14px;position: center;top: -10px;">
                  订单总价:{{ props.row.orderTotalPrice / 100 }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="商品名称" align="center" width="180"></el-table-column>
            <el-table-column label="商品图片" align="center" width="180"></el-table-column>
            <el-table-column label="单价" align="center" width="250"></el-table-column>
            <el-table-column label="数量" align="center" width="250"></el-table-column>
            <el-table-column label="操作" align="center" width="118"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="待退款" name="5">
          <el-table v-bind:data="orderList" :default-expand-all="true" class="parentTable"
                    ref="multipleTable"
                    height="678">
            <el-table-column type="expand">
              <template slot-scope="props">
                <div class="conWrap"
                     style="text-align: left;line-height: 16px;font-size: 14px;position: relative;top: -10px;">
                  <el-popover trigger="hover" placement="top">
                    <p>订单编号: {{ props.row.orderId }}</p>
                    <p>收货人姓名: {{ props.row.receiverName }}</p>
                    <p>收货人地址: {{ props.row.receiverAddress }}</p>
                    <p>收货人电话: {{ props.row.receiverMobile }}</p>
                    <div slot="reference" class="name-wrapper">
                      <span>订单编号: {{ props.row.orderId }}</span>
                      <span style="margin-left:42px;" v-if="props.row.orderStatus===1">待发货</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===2">待收货</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===3">待评分</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===4">已完成</span>
                      <span style="margin-left:42px;"
                            v-else-if="props.row.orderStatus===5 || props.row.orderStatus===6">待处理退款申请</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===7">已退款</span>
                      <el-tag size="medium" class="name" style="margin-left:42px;">收货人姓名:{{
                          props.row.receiverName
                        }}
                      </el-tag>
                      <el-button style="margin-left:42px;" v-if="props.row.orderStatus===1" type="text" size="small"
                                 v-on:click="confirmDelivery(props.row.orderId)">确认发货
                      </el-button>
                      <el-button style="margin-left:42px;" v-if="props.row.orderStatus===5 || props.row.orderStatus===6"
                                 type="text" size="small" v-on:click="refund(props.row.orderId)">退款
                      </el-button>
                      <el-button style="margin-left:42px;" v-if="props.row.orderStatus===5 || props.row.orderStatus===6"
                                 type="text" size="small" v-on:click="refuseRefund(props.row.orderId)">拒绝退款
                      </el-button>
                    </div>
                  </el-popover>
                </div>
                <el-table v-bind:data="props.row.orderItemList" :default-expand-all="true" stripe :show-header="false"
                          class="childTable">
                  <el-table-column prop="productName" align="center"
                                   label="商品名称"
                                   width="180">
                    <template slot-scope="scope">
                      <div class="name-b">{{ scope.row.productName }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="productImg" align="center"
                                   label="商品图片"
                                   width="180">
                    <template slot-scope="scope">
                      <div class="name-b">
                        <el-image :src="scope.row.productImg">
                          <div slot="placeholder" class="image-slot">
                            加载中<span class="dot"></span>
                          </div>
                        </el-image>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="price"
                                   label="单价"
                                   align="center"
                                   width="250">
                    <template slot-scope="scope">
                      <div class="name-b">{{ scope.row.unitPrice / 100 }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="quantity"
                                   label="数量"
                                   align="center"
                                   width="250">
                    <template slot-scope="scope">
                      <div class="name-b">{{ scope.row.quantity }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="162">
                    <template slot-scope="scope">
                      <div style="display:flex;">
                        <el-button type="text" size="small" v-on:click="checkProduct(scope.row)">查看商品</el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="text-align: left;line-height: 20px;font-size: 14px;position: center;top: -10px;">
                  订单总价:{{ props.row.orderTotalPrice / 100 }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="商品名称" align="center" width="180"></el-table-column>
            <el-table-column label="商品图片" align="center" width="180"></el-table-column>
            <el-table-column label="单价" align="center" width="250"></el-table-column>
            <el-table-column label="数量" align="center" width="250"></el-table-column>
            <el-table-column label="操作" align="center" width="118"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已退款" name="7">
          <el-table v-bind:data="orderList" :default-expand-all="true" class="parentTable"
                    ref="multipleTable"
                    height="678">
            <el-table-column type="expand">
              <template slot-scope="props">
                <div class="conWrap"
                     style="text-align: left;line-height: 16px;font-size: 14px;position: relative;top: -10px;">
                  <el-popover trigger="hover" placement="top">
                    <p>订单编号: {{ props.row.orderId }}</p>
                    <p>收货人姓名: {{ props.row.receiverName }}</p>
                    <p>收货人地址: {{ props.row.receiverAddress }}</p>
                    <p>收货人电话: {{ props.row.receiverMobile }}</p>
                    <div slot="reference" class="name-wrapper">
                      <span>订单编号: {{ props.row.orderId }}</span>
                      <span style="margin-left:42px;" v-if="props.row.orderStatus===1">待发货</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===2">待收货</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===3">待评分</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===4">已完成</span>
                      <span style="margin-left:42px;"
                            v-else-if="props.row.orderStatus===5 || props.row.orderStatus===6">待处理退款申请</span>
                      <span style="margin-left:42px;" v-else-if="props.row.orderStatus===7">已退款</span>
                      <el-tag size="medium" class="name" style="margin-left:42px;">收货人姓名:{{
                          props.row.receiverName
                        }}
                      </el-tag>
                      <el-button style="margin-left:42px;" v-if="props.row.orderStatus===1" type="text" size="small"
                                 v-on:click="confirmDelivery(props.row.orderId)">确认发货
                      </el-button>
                      <el-button style="margin-left:42px;" v-if="props.row.orderStatus===5 || props.row.orderStatus===6"
                                 type="text" size="small" v-on:click="refund(props.row.orderId)">退款
                      </el-button>
                      <el-button style="margin-left:42px;" v-if="props.row.orderStatus===5 || props.row.orderStatus===6"
                                 type="text" size="small" v-on:click="refuseRefund(props.row.orderId)">拒绝退款
                      </el-button>
                    </div>
                  </el-popover>
                </div>
                <el-table v-bind:data="props.row.orderItemList" :default-expand-all="true" stripe :show-header="false"
                          class="childTable">
                  <el-table-column prop="productName" align="center"
                                   label="商品名称"
                                   width="180">
                    <template slot-scope="scope">
                      <div class="name-b">{{ scope.row.productName }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="productImg" align="center"
                                   label="商品图片"
                                   width="180">
                    <template slot-scope="scope">
                      <div class="name-b">
                        <el-image :src="scope.row.productImg">
                          <div slot="placeholder" class="image-slot">
                            加载中<span class="dot"></span>
                          </div>
                        </el-image>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="price"
                                   label="单价"
                                   align="center"
                                   width="250">
                    <template slot-scope="scope">
                      <div class="name-b">{{ scope.row.unitPrice / 100 }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="quantity"
                                   label="数量"
                                   align="center"
                                   width="250">
                    <template slot-scope="scope">
                      <div class="name-b">{{ scope.row.quantity }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="162">
                    <template slot-scope="scope">
                      <div style="display:flex;">
                        <el-button type="text" size="small" v-on:click="checkProduct(scope.row)">查看商品</el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="text-align: left;line-height: 20px;font-size: 14px;position: center;top: -10px;">
                  订单总价:{{ props.row.orderTotalPrice / 100 }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="商品名称" align="center" width="180"></el-table-column>
            <el-table-column label="商品图片" align="center" width="180"></el-table-column>
            <el-table-column label="单价" align="center" width="250"></el-table-column>
            <el-table-column label="数量" align="center" width="250"></el-table-column>
            <el-table-column label="操作" align="center" width="118"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'shopOrderList',
  data: function () {
    return {
      orderList: [],
      activeName: '0'
    }
  },
  computed: {
    user_id() {
      return this.$store.state.user_id;
      // return 1;
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    getOrderList: function () {
      axios.get('/api/order/searchShopAllOrder?userId=' + this.user_id).then(res => {
        this.orderList = res.orderList
        let lists = this.orderList
        lists.forEach(order => {
          let list = order.orderItemList
          order.orderTotalPrice = list[0].orderTotalPrice
          order.orderStatus = list[0].orderStatus
          order.receiverName = list[0].receiverName
          order.receiverMobile = list[0].receiverMobile
          order.receiverAddress = list[0].receiverAddress
        })
        this.orderList = lists
        console.log(this.orderList)
      })
    },
    getOrderListByStatus: function (userId, status) {
      axios.get('/api/order/searchShopOrderByStatus?userId=' + this.user_id + '&status=' + status).then(res => {
        this.orderList = res.orderList
        let lists = this.orderList
        lists.forEach(order => {
          let list = order.orderItemList
          order.orderTotalPrice = list[0].orderTotalPrice
          order.orderStatus = list[0].orderStatus
          order.receiverName = list[0].receiverName
          order.receiverMobile = list[0].receiverMobile
          order.receiverAddress = list[0].receiverAddress
        })
        this.orderList = lists
        console.log(this.orderList)
      })
    },
    confirmDelivery: function (orderId) {
      this.$confirm('是否要确认发货', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已确认发货!'
        })
        axios.post('/api/order/sellerChangeOrderStatus?orderId=' + orderId).then(() => {
          this.getOrderList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    refund: function (orderId) {
      this.$confirm('是否要确认退款', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已确认退款!'
        })
        axios.post('/api/order/sellerAgreeRefund?orderId=' + orderId).then(() => {
          this.getOrderList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    refuseRefund: function (orderId) {
      this.$confirm('是否要拒绝退款', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已拒绝退款!'
        })
        axios.post('/api/order/sellerRefuseRefund?orderId=' + orderId).then(() => {
          this.getOrderList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    checkProduct: function (row) {
      this.$router.push('/detail/' + row.productId);
    },
    handleClick: function (tab) {
      if (tab.name === '0') {
        this.getOrderList()
      } else {
        this.getOrderListByStatus(1, tab.name)
      }
    },
    goToProduct() {
      this.$router.push('/ProductManagement')
    },
    goToShop(){
      this.$router.push('/ShopManagement')
    },
    goToIndex(){
      this.$router.push('/index')
    }
  }
}
</script>

<style lang="scss">
#container {
  display: flex;
  position: relative;
  margin-right: auto;
  margin-left: auto;

  .sidebar {
    width: 225px;
    background-color: #55585a7a;
    display: grid;
    margin-right: 57px;
    height: 320px;
    float: top;

    span {
      color: #ffffff;
      font-size: 19px;
      font-weight: bold;
      height: 80px;
      line-height: 80px;
      text-align: center;

      img {
        width: 44px;
        height: 44px;
        position: relative;
        top: 14px;
        margin-right: 5px;
        cursor: pointer;
      }
    }

    a {
      color: #ffffff;
      text-align: center;
      font-size: 19px;
      font-weight: bold;
      height: 80px;
      line-height: 80px;

      &:hover {
        background-color: #e4291e;
      }
    }
  }
  .tab {
    .el-tabs__item {
      width: 175px;
      padding: 0;
      text-align: center;
    }
    .el-tabs__content {
      width: 1226px !important;

      .el-table__header-wrapper {

        .el-table__header {
          width: 1226px !important;
        }
      }
      .el-table__body-wrapper{
        .el-table td.el-table__cell div{
          margin-left: 41px;
        }
        width: 1226px !important;
        .el-table tr{
          width: 1226px !important;
        }
        .el-table__body{
          width: 1226px !important;
        }
      }

      .tr {
        .cell {
          //width: 245.2px;
        }
      }
    }
  }
}

//.el-table {
//  border-top: none !important;
//}
//
//.el-table__expanded-cell {
//  padding: 0 !important;
//}
//
//.tableWrap {
//  width: 100%;
//}
//
//.el-tabs__nav-scroll {
//  padding: 0 20px;
//  box-sizing: border-box;
//}
//
//.tableWrap .el-table {
//  width: 1240px;
//  margin: 0 auto;
//}
//
//.el-icon.el-icon-arrow-right {
//  color: #fff;
//}
//
//.el-table__row.expanded {
//  background: #fff !important;
//  position: relative !important;
//  top: -100px !important;
//  border: 1px solid red;
//}
//
//.el-tabs__content {
//  display: none;
//}
//
//.el-table__row.expanded > td {
//  padding: 7px 0;
//}
//
//.el-table__row.expanded {
//  border: 1px solid #E5E5E5;
//}
//
//.el-table__row.expanded:first-child {
//  border-bottom: none;
//}
//
//.childTable .el-table__body {
//  border-top: 1px solid #E5E5E5;
//}
//
//.childTable .el-table__row.expanded > td:first-child {
//  border-left: 1px solid #E5E5E5;
//}
//
//.childTable .el-table__row.expanded > td:last-child {
//  border-right: 1px solid #E5E5E5;
//}
//
//.el-tabs__header.is-top {
//  border-bottom: none;
//}
//
//.childTable .el-table__header-wrapper {
//  display: none;
//}
//
//.conWrap {
//  height: 44px;
//  background: #E5E5E5;
//  line-height: 44px;
//  padding-left: 10px;
//  font-size: 14px;
//  font-family: Microsoft YaHei;
//  line-height: 19px;
//  color: #333333;
//}
//
//.conWrap > span {
//  line-height: 44px;
//}
//
//.el-table .has-gutter .is-leaf {
//  position: relative !important;
//  left: -48px !important;
//}
//
//.el-table .has-gutter .is-leaf:last-child {
//  position: relative !important;
//  left: 0px !important;
//}
//
//.el-table__header-wrapper {
//  background: #EBEBEB;
//}
//
//.el-table .has-gutter > tr > th {
//  background: #EBEBEB;
//  font-size: 14px;
//  font-family: Microsoft YaHei;
//  font-weight: bold;
//  line-height: 19px;
//  color: #333333;
//}
</style>
