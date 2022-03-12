<template>
  <div id="userOrderList">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
      <el-tab-pane class="tab1" label="全部订单" name="0">
        <el-table v-bind:data="orderList" :default-expand-all="true" class="parentTable"
                  ref="multipleTable">
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
                    <span style="margin-left:42px;" v-else-if="props.row.orderStatus===5 || props.row.orderStatus===6">退款申请中</span>
                    <span style="margin-left:42px;" v-else-if="props.row.orderStatus===7">已退款</span>
                    <el-tag size="medium" class="name" style="margin-left:42px;">收货人姓名:{{
                        props.row.receiverName
                      }}
                    </el-tag>
                    <el-button style="margin-left:42px;" v-if="props.row.orderStatus===2" type="text" size="small"
                               v-on:click="confirmReceipt(props.row.orderId)">确认收货
                    </el-button>
                    <el-button style="margin-left:42px;" v-else-if="props.row.orderStatus===3" type="text" size="small"
                               v-on:click="grade(props.row.orderId)">评分
                    </el-button>
                    <el-button style="margin-left:42px;" type="text" size="small"
                               v-if="props.row.orderStatus!==4 && props.row.orderStatus!==5 && props.row.orderStatus!==6 && props.row.orderStatus!==7"
                               v-on:click="refund(props.row.orderId)">申请退款
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
                  ref="multipleTable">
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
                    <span style="margin-left:42px;" v-else-if="props.row.orderStatus===5 || props.row.orderStatus===6">退款申请中</span>
                    <span style="margin-left:42px;" v-else-if="props.row.orderStatus===7">已退款</span>
                    <el-tag size="medium" class="name" style="margin-left:42px;">收货人姓名:{{
                        props.row.receiverName
                      }}
                    </el-tag>
                    <el-button style="margin-left:42px;" v-if="props.row.orderStatus===2" type="text" size="small"
                               v-on:click="confirmReceipt(props.row.orderId)">确认收货
                    </el-button>
                    <el-button style="margin-left:42px;" v-else-if="props.row.orderStatus===3" type="text" size="small"
                               v-on:click="grade(props.row.orderId)">评分
                    </el-button>
                    <el-button style="margin-left:42px;" type="text" size="small"
                               v-if="props.row.orderStatus!==4 && props.row.orderStatus!==5 && props.row.orderStatus!==6 && props.row.orderStatus!==7"
                               v-on:click="refund(props.row.orderId)">申请退款
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
                  ref="multipleTable">
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
                    <span style="margin-left:42px;" v-else-if="props.row.orderStatus===5 || props.row.orderStatus===6">退款申请中</span>
                    <span style="margin-left:42px;" v-else-if="props.row.orderStatus===7">已退款</span>
                    <el-tag size="medium" class="name" style="margin-left:42px;">收货人姓名:{{
                        props.row.receiverName
                      }}
                    </el-tag>
                    <el-button style="margin-left:42px;" v-if="props.row.orderStatus===2" type="text" size="small"
                               v-on:click="confirmReceipt(props.row.orderId)">确认收货
                    </el-button>
                    <el-button style="margin-left:42px;" v-else-if="props.row.orderStatus===3" type="text" size="small"
                               v-on:click="grade(props.row.orderId)">评分
                    </el-button>
                    <el-button style="margin-left:42px;" type="text" size="small"
                               v-if="props.row.orderStatus!==4 && props.row.orderStatus!==5 && props.row.orderStatus!==6 && props.row.orderStatus!==7"
                               v-on:click="refund(props.row.orderId)">申请退款
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
                  ref="multipleTable">
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
                    <span style="margin-left:42px;" v-else-if="props.row.orderStatus===5 || props.row.orderStatus===6">退款申请中</span>
                    <span style="margin-left:42px;" v-else-if="props.row.orderStatus===7">已退款</span>
                    <el-tag size="medium" class="name" style="margin-left:42px;">收货人姓名:{{
                        props.row.receiverName
                      }}
                    </el-tag>
                    <el-button style="margin-left:42px;" v-if="props.row.orderStatus===2" type="text" size="small"
                               v-on:click="confirmReceipt(props.row.orderId)">确认收货
                    </el-button>
                    <el-button style="margin-left:42px;" v-else-if="props.row.orderStatus===3" type="text" size="small"
                               v-on:click="grade(props.row.orderId)">评分
                    </el-button>
                    <el-button style="margin-left:42px;" type="text" size="small"
                               v-if="props.row.orderStatus!==4 && props.row.orderStatus!==5 && props.row.orderStatus!==6 && props.row.orderStatus!==7"
                               v-on:click="refund(props.row.orderId)">申请退款
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
                  ref="multipleTable">
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
                    <span style="margin-left:42px;" v-else-if="props.row.orderStatus===5 || props.row.orderStatus===6">退款申请中</span>
                    <span style="margin-left:42px;" v-else-if="props.row.orderStatus===7">已退款</span>
                    <el-tag size="medium" class="name" style="margin-left:42px;">收货人姓名:{{
                        props.row.receiverName
                      }}
                    </el-tag>
                    <el-button style="margin-left:42px;" v-if="props.row.orderStatus===2" type="text" size="small"
                               v-on:click="confirmReceipt(props.row.orderId)">确认收货
                    </el-button>
                    <el-button style="margin-left:42px;" v-else-if="props.row.orderStatus===3" type="text" size="small"
                               v-on:click="grade(props.row.orderId)">评分
                    </el-button>
                    <el-button style="margin-left:42px;" type="text" size="small"
                               v-if="props.row.orderStatus!==4 && props.row.orderStatus!==5 && props.row.orderStatus!==6 && props.row.orderStatus!==7"
                               v-on:click="refund(props.row.orderId)">申请退款
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
      <el-tab-pane label="待退款" name="5">
        <el-table v-bind:data="orderList" :default-expand-all="true" class="parentTable"
                  ref="multipleTable">
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
                    <span style="margin-left:42px;" v-else-if="props.row.orderStatus===5 || props.row.orderStatus===6">退款申请中</span>
                    <span style="margin-left:42px;" v-else-if="props.row.orderStatus===7">已退款</span>
                    <el-tag size="medium" class="name" style="margin-left:42px;">收货人姓名:{{
                        props.row.receiverName
                      }}
                    </el-tag>
                    <el-button style="margin-left:42px;" v-if="props.row.orderStatus===2" type="text" size="small"
                               v-on:click="confirmReceipt(props.row.orderId)">确认收货
                    </el-button>
                    <el-button style="margin-left:42px;" v-else-if="props.row.orderStatus===3" type="text" size="small"
                               v-on:click="grade(props.row.orderId)">评分
                    </el-button>
                    <el-button style="margin-left:42px;" type="text" size="small"
                               v-if="props.row.orderStatus!==4 && props.row.orderStatus!==5 && props.row.orderStatus!==6 && props.row.orderStatus!==7"
                               v-on:click="refund(props.row.orderId)">申请退款
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
                  ref="multipleTable">
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
                    <span style="margin-left:42px;" v-else-if="props.row.orderStatus===5 || props.row.orderStatus===6">退款申请中</span>
                    <span style="margin-left:42px;" v-else-if="props.row.orderStatus===7">已退款</span>
                    <el-tag size="medium" class="name" style="margin-left:42px;">收货人姓名:{{
                        props.row.receiverName
                      }}
                    </el-tag>
                    <el-button style="margin-left:42px;" v-if="props.row.orderStatus===2" type="text" size="small"
                               v-on:click="confirmReceipt(props.row.orderId)">确认收货
                    </el-button>
                    <el-button style="margin-left:42px;" v-else-if="props.row.orderStatus===3" type="text" size="small"
                               v-on:click="grade(props.row.orderId)">评分
                    </el-button>
                    <el-button style="margin-left:42px;" type="text" size="small"
                               v-if="props.row.orderStatus!==4 && props.row.orderStatus!==5 && props.row.orderStatus!==6 && props.row.orderStatus!==7"
                               v-on:click="refund(props.row.orderId)">申请退款
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
</template>

<script>
export default {
  name: 'userOrderList',
  data: function () {
    return {
      orderList: [],
      activeName: '0'
    }
  },
  computed: {
    user_id() {
      return this.$store.state.user_id;
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    getOrderList: function () {
      this.axios.get('/api/order/searchUserAllOrder?userId=' + this.user_id).then(res => {
        console.log(res.orderList)
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
        // console.log(this.orderList)
      })
    },
    getOrderListByStatus: function (userId, status) {
      this.axios.get('/api/order/searchUserOrderByStatus?userId=' + this.user_id + '&status=' + status).then(res => {
        console.log(res.orderList)
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
      })
    },
    confirmReceipt: function (orderId) {
      this.$confirm('是否要确认收货', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已确认收货!'
        })
        this.axios.post('/api/order/buyerChangeOrderStatus?orderId=' + orderId).then(() => {
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
      this.$confirm('是否要申请退款', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已申请退款!'
        })
        this.axios.post('/api/order/buyerRefund?orderId=' + orderId).then(() => {
          this.getOrderList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    grade: function (orderId) {
      this.$confirm('评分', '提示', {
        confirmButtonText: '只有好评',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已好评!'
        })
        this.axios.post('/api/order/buyerChangeOrderStatus?orderId=' + orderId).then(() => {
          this.getOrderList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消评分！'
        })
      })
    },
    checkProduct: function (row) {
      this.$router.push('/detail/' + row.productId);
    },
    handleClick: function (tab) {
      console.log(this.orderList)
      if (tab.name === '0') {
        this.getOrderList()
      } else {
        this.getOrderListByStatus(1, tab.name)
      }
    }
  }
}
</script>

<style lang="scss">
/*@import './../assets/scss/element-variables.scss';*/
#userOrderList {
  padding: 30px 0 50px;
  position: relative;
  width: 1226px;
  margin-right: auto;
  margin-left: auto;

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
</style>
