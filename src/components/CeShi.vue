<template>
  <div class="box">
    <!-- 搜索栏，搜索表单formSearch -->
    <div class="searchForm">
      <el-form ref="formSearch" :model="formSearch" :disabled="isShowForm">
        <el-form-item
          style="width: 150px; position: absolute; left: 10px; top: 10px"
        >
          <el-input
            v-model="formSearch.number"
            placeholder="身份证号码"
            @change="showSearchButton"
            onkeyup="this.value=this.value.replace(/[^\X0-9]/g, '')"
          ></el-input>
        </el-form-item>
        <el-form-item
          style="width: 150px; position: absolute; left: 170px; top: 10px"
        >
          <el-input
            v-model="formSearch.name"
            placeholder="姓名"
            @change="showSearchButton"
          ></el-input>
        </el-form-item>
        <el-form-item
          style="width: 150px; position: absolute; left: 330px; top: 10px"
          ><el-select
            v-model="formSearch.sex"
            placeholder="性别"
            filterable
            clearable
            @change="showSearchButton"
          >
            <el-option
              v-for="item in optionsSex"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option> </el-select
        ></el-form-item>
        <el-form-item
          style="width: 150px; position: absolute; left: 490px; top: 10px"
          ><el-select
            v-model="formSearch.ethnic__name"
            placeholder="民族"
            filterable
            clearable
            @change="showSearchButton"
          >
            <el-option
              v-for="item in optionsEthnic.items"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option> </el-select
        ></el-form-item>
        <el-form-item
          style="width: 150px; position: absolute; left: 650px; top: 10px"
        >
          <el-col>
            <el-date-picker
              v-model="formSearch.birthday"
              type="date"
              placeholder="生日"
              value-format="yyyy-MM-dd"
              style="width: 150px"
              @change="showSearchButton"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item
          style="width: 150px; position: absolute; left: 810px; top: 10px"
          ><el-select
            v-model="formSearch.city__province__name"
            placeholder="省份"
            filterable
            clearable
            @change="searchProvinceNow"
          >
            <el-option
              v-for="item in optionsProvince.items"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option> </el-select
        ></el-form-item>
        <el-form-item
          style="width: 150px; position: absolute; left: 970px; top: 10px"
          ><el-select
            v-model="formSearch.city__name"
            placeholder="城市"
            filterable
            clearable
            :disabled="!formSearch.city__province__name"
            @change="showSearchButton"
          >
            <el-option
              v-for="item in optionsCity.items"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option> </el-select
        ></el-form-item>
        <el-form-item style="position: absolute; right: 10px; top: 10px">
          <el-button
            type="primary"
            @click="searchPerson"
            icon="el-icon-search"
            :disabled="disabledSearch"
            >搜索</el-button
          >
          <el-button
            type="danger"
            plain
            @click="clearFormSearch"
            :disabled="disabledClear"
            >清空</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <!-- 添加/修改表单form -->
    <div class="addOrUpdateForm" v-show="isShowForm">
      <el-form ref="form" :model="form">
        <!-- <el-form ref="form" :model="form" :rules="rules"> -->
        <el-form-item
          label="身份证号码"
          style="width: 200px; position: absolute; left: 25px; top: 20px"
          prop="number"
        >
          <el-input v-model="form.number" placeholder="身份证号码"></el-input>
          <!-- onkeyup="this.value=this.value.replace(/[^\X0-9]/g, '')" 正则表达式限制输入 -->
        </el-form-item>
        <el-form-item
          label="姓名"
          style="width: 150px; position: absolute; left: 275px; top: 20px"
        >
          <el-input v-model="form.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item
          label="性别"
          style="width: 150px; position: absolute; right: 25px; top: 20px"
        >
          <el-select v-model="form.sex" placeholder="性别" filterable clearable>
            <el-option
              v-for="item in optionsSex"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="民族"
          style="width: 150px; position: absolute; left: 25px; top: 120px"
        >
          <el-select
            v-model="form.ethnic_id"
            placeholder="民族"
            filterable
            clearable
          >
            <el-option
              v-for="item in optionsEthnic.items"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="生日"
          style="position: absolute; left: 275px; top: 120px"
        >
          <el-col>
            <el-date-picker
              v-model="form.birthday"
              type="date"
              placeholder="生日"
              value-format="yyyy-MM-dd"
              style="width: 150px"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item
          label="省份"
          style="width: 150px; position: absolute; right: 25px; top: 120px"
        >
          <el-select
            v-model="form.city__province__name"
            placeholder="省份"
            filterable
            clearable
            @change="addOrUpdateProvince"
          >
            <el-option
              v-for="item in optionsProvince.items"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="城市"
          style="width: 150px; position: absolute; left: 25px; top: 220px"
        >
          <el-select
            v-model="form.city_id"
            placeholder="城市"
            filterable
            clearable
            :disabled="!form.city__province__name"
          >
            <el-option
              v-for="item in optionsCity.items"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option> </el-select
        ></el-form-item>
        <el-form-item
          label="详细地址"
          style="width: 200px; position: absolute; left: 275px; top: 220px"
        >
          <el-input v-model="form.address" placeholder="详细地址"></el-input>
        </el-form-item>
        <el-form-item style="position: absolute; right: 25px; top: 260px">
          <el-button type="primary" @click="addSubmit" v-if="!isShowSave"
            >提交</el-button
          >
          <el-button type="primary" @click="updateSubmit" v-if="isShowSave"
            >保存</el-button
          >
          <el-button type="button" @click="hiddenForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 内容主体：添加、数据表格、分页器 -->
    <div class="content">
      <!-- 返回按钮 -->
      <el-button
        type="primary"
        plain
        @click="backHome"
        style="position: absolute; left: 10px; top: 10px"
        v-if="isShowBack"
        icon="el-icon-back"
        >返回</el-button
      >
      <!-- 添加按钮 -->
      <el-button
        type="primary"
        @click="addPerson"
        style="position: absolute; left: 10px; top: 10px"
        v-if="!isShowBack"
        icon="el-icon-plus"
        :disabled="isShowForm"
        >添加</el-button
      >
      <!-- 数据表格 -->
      <el-table
        :data="personsData.items"
        border
        style="
          width: 100%;
          position: absolute;
          left: 0px;
          top: 50px;
          border-radius: 8px;
        "
        height="500"
      >
        <el-table-column prop="number" label="身份证号码" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="150">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="65"> </el-table-column>
        <el-table-column prop="ethnic__name" label="民族" width="100">
        </el-table-column>
        <el-table-column prop="birthday" label="生日" width="110" sortable>
        </el-table-column>
        <el-table-column prop="city__province__name" label="省份" width="150">
        </el-table-column>
        <el-table-column prop="city__name" label="城市" width="150">
        </el-table-column>
        <el-table-column
          prop="address"
          label="详细地址（县、镇、村）"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="{ row, $index }">
            <el-button
              type="info"
              size="small"
              @click="updatePerson(row, $index)"
              icon="el-icon-edit"
              :disabled="isShowForm"
            ></el-button>
            <el-button
              type="danger"
              size="small"
              @click="deletePerson(row, $index)"
              icon="el-icon-delete"
              :disabled="isShowForm"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :disabled="isShowForm"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 退出登录 -->
    <!-- <div class="exit">
      <el-button type="info" plain icon="el-icon-switch-button" @click="exit"
        >注销</el-button
      >
    </div> -->

    <!-- redis练习 -->
    <div class="test">
      <el-form :model="testForm" ref="testFrom">
        <el-form-item
          style="width: 150px; position: absolute; left: 10px; top: 10px"
        >
          <el-select
            v-model="testForm.country"
            placeholder="国家"
            clearable
            filterable
            @change="getTestProvince"
          >
            <el-option
              v-for="item in testCountry.items"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          style="width: 150px; position: absolute; left: 170px; top: 10px"
          ><el-select
            v-model="testForm.province"
            placeholder="省份"
            filterable
            clearable
            @change="getTestCity"
          >
            <el-option
              v-for="item in testProvince.items"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option> </el-select
        ></el-form-item>
        <el-form-item
          style="width: 150px; position: absolute; left: 330px; top: 10px"
          ><el-select
            v-model="testForm.city"
            placeholder="城市"
            filterable
            clearable
            @change="getTestPerson"
          >
            <el-option
              v-for="item in testCity.items"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option> </el-select
        ></el-form-item>
        <el-form-item
          style="width: 150px; position: absolute; left: 490px; top: 10px"
          ><el-select
            v-model="testForm.person"
            placeholder="公民"
            filterable
            clearable
          >
            <el-option
              v-for="item in testPerson.items"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option> </el-select
        ></el-form-item>
        <el-form-item
          style="width: 150px; position: absolute; left: 650px; top: 10px"
        >
          <el-link
            type="primary"
            :underline="false"
            href="https://www.runoob.com/w3cnote/python-redis-intro.html"
            target="_blank"
            >python redis</el-link
          >
        </el-form-item>
      </el-form>
      <!-- 退出登录 -->
      <div class="exit">
        user_id:{{ userNow.user_id }}
        <el-button type="info" plain icon="el-icon-switch-button" @click="exit"
          >注销</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
import cloneDeep from "lodash/cloneDeep"; // 深拷贝
import { Message } from "element-ui";
import jwtDecode from "jwt-decode"; // 解析token

export default {
  name: "CeShi",
  data() {
    // ==========================================身份证校验===============================================
    // (1) :rules="rules" 动态绑定校验规则属性
    // (2) prop="xxx" 绑定需要校验的属性
    // (3) data() {...} 在data中定义变量，接收校验结果
    // (4) var yyy = (rule, value, callback) => {...} 根据需求，编写校验规则
    // (5) return {..., rules: { xxx: [{ validator: yyy, trigger: "blur" }],}, ...}  在return中调用rules
    // var checkNumber = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error("请输入身份证号码！"));
    //   }
    //   if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
    //     callback(new Error("身份证长度或格式错误！"));
    //   }
    //   //身份证城市
    //   var aCity = {
    //     11: "北京",
    //     12: "天津",
    //     13: "河北",
    //     14: "山西",
    //     15: "内蒙古",
    //     21: "辽宁",
    //     22: "吉林",
    //     23: "黑龙江",
    //     31: "上海",
    //     32: "江苏",
    //     33: "浙江",
    //     34: "安徽",
    //     35: "福建",
    //     36: "江西",
    //     37: "山东",
    //     41: "河南",
    //     42: "湖北",
    //     43: "湖南",
    //     44: "广东",
    //     45: "广西",
    //     46: "海南",
    //     50: "重庆",
    //     51: "四川",
    //     52: "贵州",
    //     53: "云南",
    //     54: "西藏",
    //     61: "陕西",
    //     62: "甘肃",
    //     63: "青海",
    //     64: "宁夏",
    //     65: "新疆",
    //     71: "台湾",
    //     81: "香港",
    //     82: "澳门",
    //     91: "国外",
    //   };
    //   if (!aCity[parseInt(value.substr(0, 2))]) {
    //     callback(new Error("身份证地区非法！"));
    //   }
    //   // 出生日期验证
    //   var sBirthday = (
    //       value.substr(6, 4) +
    //       "-" +
    //       Number(value.substr(10, 2)) +
    //       "-" +
    //       Number(value.substr(12, 2))
    //     ).replace(/-/g, "/"),
    //     d = new Date(sBirthday);
    //   if (
    //     sBirthday !=
    //     d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()
    //   ) {
    //     callback(new Error("身份证上的出生日期非法！"));
    //   }
    //   // 身份证号码校验
    //   var sum = 0,
    //     weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
    //     codes = "10X98765432";
    //   for (var i = 0; i < value.length - 1; i++) {
    //     sum += value[i] * weights[i];
    //   }
    //   var last = codes[sum % 11]; //计算出来的最后一位身份证号码
    //   if (value[value.length - 1] != last) {
    //     callback(new Error("输入的身份证号非法！"));
    //   }
    //   callback();
    // };
    return {
      personsData: [], // 存放请求到的persons数据
      optionsEthnic: [], // 存放请求到的ethnics数据，民族选择器
      optionsProvince: [], // 存放请求到的provinces数据，省份选择器
      optionsCity: [], // 存放请求到的cities数据，城市选择器
      optionsSex: [
        { value: 0, label: "女" },
        { value: 1, label: "男" },
      ], // 性别选择器

      form: {}, // 添加、修改 表单
      dict: {}, // 存放person信息，然后post给后端
      isShowForm: false, // 控制form表单的显示
      isShowSave: false, // 控制form表单中（提交按钮/保存按钮）的显示

      formSearch: {}, // 搜索 表单
      dictSearch: {}, // 存放search信息，然后post给后端
      isShowBack: false, // 控制主页面中（添加按钮/返回按钮）的显示
      disabledSearch: true, // 控制（搜索按钮）是否禁用
      disabledClear: true, // 控制（清空按钮）是否禁用

      pageSize: 5, // 每页显示条数
      currentPage: 1, // 当前页码
      total: 1, // 数据总条数

      params: {}, // 存放分页器参数和搜索表单信息，然后get给后端

      // rules: {
      //   number: [{ validator: checkNumber, trigger: "blur" }],
      // },

      userNow: "", // 存放当前登录用户的信息，user_id

      // redis练习
      testForm: {},
      testCountry: [], // 存放国家数据，用于国家选择器展示
      testProvince: [], // 存放省份数据，同上
      testCity: [], // 存放城市数据，同上
      testPerson: [], // 存放公民数据，同上
    };
  },
  mounted() {
    this.getJsonData(); // 利用get请求获取persons、provinces、ethnics，并完成分页、搜索功能
    this.getTestCountry(); // 练习
    this.welcome();
  },
  methods: {
    welcome() {
      let token = window.localStorage.getItem("token");
      this.userNow = jwtDecode(token);
      console.log("当前登录用户的id：", this.userNow.user_id);
    },
    // 请求后端数据，get
    getJsonData() {
      // 利用params完成分页、搜索，get
      this.params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
      };
      this.dictSearch = this.formSearch;
      console.log("getJsonData,dictSearch", this.dictSearch);
      for (var key in this.dictSearch) {
        this.params[key] = this.dictSearch[key];
      }
      console.log("params", this.params);
      axios
        .get(
          "api/persons/",
          { params: this.params }, // get传参只能使用 { params: { xxx: xxx } }
          { withCredentials: true }
        )
        .then((response) => {
          this.personsData = response.data;
          console.log("get请求api/persons/", this.personsData);
          this.total = this.personsData.total; // 更新total
          console.log("total", this.total);
        })
        .catch((error) => {
          Message.error("请求persons失败！");
          console.log("报错", error);
        });
      // 获取provinces，get
      axios
        .get("api/get_provinces/", { withCredentials: true })
        .then((response) => {
          this.optionsProvince = response.data;
          console.log("api/get_provinces/", this.optionsProvince);
        })
        .catch((error) => {
          Message.error("请求provinces失败！");
          console.error("报错", error);
        });
      // 获取ethnics，get
      axios
        .get("api/get_ethnics/", { withCredentials: true })
        .then((response) => {
          this.optionsEthnic = response.data;
          console.log("api/get_ethnics/", this.optionsEthnic);
        })
        .catch((error) => {
          Message.error("请求ethnics失败！");
          console.error("报错", error);
        });
    },
    // 点击添加按钮
    addPerson() {
      this.isShowForm = true; // 显示form表单
      this.form = {}; // 清空form表单
      this.formSearch = {}; // 清空formSearch表单
      this.disabledSearch = true; // 禁用搜索按钮
      this.disabledClear = true; // 禁用清空按钮
    },
    // 点击提交按钮，添加person信息，post
    addSubmit() {
      console.log("add,form", this.form);
      this.dict = this.form;
      console.log("add,dict", this.dict);
      axios
        .post("api/persons/", this.dict, { withCredentials: true })
        .then((response) => {
          Message.success("添加成功！");
          console.log("post请求api/persons/", response.data);
          this.hiddenForm(); // 隐藏并清空form表单
          this.getJsonData(); // 更新主页面数据
        })
        .catch((error) => {
          Message.error("添加失败！");
          console.error("报错", error);
        });
    },
    // 点击删除按钮，删除person信息，post
    deletePerson(row) {
      this.dict = cloneDeep(row); // 深拷贝
      console.log("delete,dict", this.dict);
      axios // 删除请求，delete，url里面要携带被删除目标的id
        .delete("api/persons/" + this.dict.id + "/", {
          withCredentials: true,
        })
        .then((response) => {
          Message.success("删除成功！");
          console.log("delete请求api/persons/", response.data);
          this.getJsonData(); // 更新total
        })
        .catch((error) => {
          Message.error("删除失败！");
          console.error("报错", error);
        });
    },
    // 点击修改按钮
    updatePerson(row) {
      this.isShowForm = true; // 显示form表单
      this.isShowSave = true; // 显示保存按钮
      this.dict = cloneDeep(row); // 深拷贝
      this.form = this.dict; // 在form表单上展示当前person信息
      this.disabledSearch = true; // 禁用搜索按钮
      // this.disabledClear = true; // 禁用清空按钮
      this.provinceNow(); // 获取当前省份的所有城市
    },
    // 点击保存按钮，修改person信息，post
    updateSubmit() {
      console.log("update,form", this.form);
      this.dict = this.form;
      console.log("update,dict", this.dict);
      axios // 更新请求，put，url里面要携带被修改目标的id
        .put("api/persons/" + this.dict.id + "/", this.dict, {
          withCredentials: true,
        })
        .then((response) => {
          Message.success("修改成功！");
          console.log("put请求api/persons/", response.data);
          this.hiddenForm(); // 隐藏并清空form表单
          this.getJsonData(); // 更新主页面数据
        })
        .catch((error) => {
          Message.error("修改失败！");
          console.error("报错", error);
        });
    },
    // 点击取消按钮
    hiddenForm() {
      this.isShowForm = false; // 隐藏form表单
      this.isShowSave = false; // 隐藏保存按钮
      this.form = {}; // 清空form表单
    },
    // 点击搜索按钮，提交搜索表单，post
    searchPerson() {
      console.log("search,dictSearch", this.dictSearch);
      this.isShowBack = true; // 显示返回按钮，隐藏添加按钮
      this.disabledSearch = true; // 禁用搜索按钮
      this.pageSize = 5;
      this.currentPage = 1;
      this.getJsonData(); // 更新主页面数据
    },
    // 点击返回按钮
    backHome() {
      this.isShowBack = false; // 隐藏返回按钮，显示添加按钮
      this.clearFormSearch();
      this.getJsonData(); // 更新主页面数据
    },
    // 触发搜索栏
    showSearchButton() {
      this.disabledSearch = false; // 启用搜索按钮
      this.disabledClear = false; // 启用清空按钮
    },
    // 点击清空按钮
    clearFormSearch() {
      this.formSearch = {}; // 清空formSearch表单
      this.disabledSearch = true; // 禁用搜索按钮
      this.disabledClear = true; // 禁用清空按钮
    },
    // 搜索表单中，根据省份请求城市数据
    searchProvinceNow() {
      this.disabledSearch = false; // 启用搜索按钮
      console.log("search省份", this.formSearch.city__province__name);
      this.dictSearch = {
        city__province__name: this.formSearch.city__province__name,
      };
      // 获取cities，post
      axios
        .post("api/get_cities/", this.dictSearch, { withCredentials: true })
        .then((response) => {
          this.optionsCity = response.data;
          console.log("api/get_cities/", this.optionsCity);
        })
        .catch((error) => {
          console.error("报错", error);
        });
    },
    // 添加/修改表单中，根据省份请求城市数据
    provinceNow() {
      console.log("add/update省份", this.form.city__province__name);
      this.dict = { city__province__name: this.form.city__province__name };
      // 获取cities，post
      axios
        .post("api/get_cities/", this.dict, { withCredentials: true })
        .then((response) => {
          this.optionsCity = response.data;
          console.log("api/get_cities/", this.optionsCity);
        })
        .catch((error) => {
          console.error("报错", error);
        });
    },
    // 添加/修改表单中，当省份选择器被修改时清空城市选择器
    addOrUpdateProvince() {
      this.form.city_id = ""; // 清空城市选择器
      this.provinceNow();
    },
    // pageSize改变时触发
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      console.log("pageSize", this.pageSize);
      this.getJsonData(); // 更新主页面数据
    },
    // currentPage改变时触发
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      console.log("currentPage", this.currentPage);
      this.getJsonData(); // 更新主页面数据
    },
    // 退出登录
    exit() {
      // 移除本地存储中的 token
      window.localStorage.removeItem("token");

      Message.info("已退出登录");
      this.$router.push({ name: "login" });
    },

    // redis练习
    getTestCountry() {
      delete this.testForm.country;
      delete this.testForm.province;
      delete this.testForm.city;
      delete this.testForm.person;
      axios
        .get("api/redis_test/")
        .then((response) => {
          this.testCountry = response.data;
        })
        .catch((error) => {
          console.log("报错", error);
        });
    },
    // 使用country选择器，更新provinces，清空cities、persons
    getTestProvince() {
      delete this.testForm.province; // 清空province选择器
      delete this.testForm.city; // 清空city选择器
      delete this.testForm.person; // 清空person选择器
      axios
        .get("api/redis_test/", { params: { country: this.testForm.country } })
        .then((response) => {
          this.testProvince = response.data; // 更新provinces
          this.testCity = []; // 清空cities
          this.testPerson = []; // 清空persons
        })
        .catch((error) => {
          console.log("报错", error);
        });
    },
    // 使用province选择器，更新cities，清空persons
    getTestCity() {
      delete this.testForm.city;
      delete this.testForm.person;
      axios
        .get("api/redis_test/", {
          params: { province: this.testForm.province },
        })
        .then((response) => {
          this.testCity = response.data;
          this.testPerson = [];
        })
        .catch((error) => {
          console.log("报错", error);
        });
    },
    // 使用city选择器，更新persons
    getTestPerson() {
      delete this.testForm.person;
      axios
        .get("api/redis_test/", { params: { city: this.testForm.city } })
        .then((response) => {
          this.testPerson = response.data;
        })
        .catch((error) => {
          console.log("报错", error);
        });
    },
  },
};
</script>

<style scoped>
.box {
  width: 80%;
  margin: 0 auto;
  position: relative;
}
.searchForm {
  /* 搜索表单 */
  width: 100%;
  height: 60px;
  margin: 10px auto;
  background-color: whitesmoke;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.6s;
}
.searchForm:hover {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
}
.content {
  /* 主体内容 */
  width: 100%;
  height: 600px;
  margin: 10px auto;
  background-color: whitesmoke;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  position: relative;
  transition: all 0.6s;
}
.content:hover {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
}
.pagination {
  /* 分页器 */
  height: 40px;
  /* background-color: pink; */
  position: absolute;
  bottom: 5px;
  right: 10px;
  z-index: 99;
}
.addOrUpdateForm {
  /* 添加表单 */
  width: 700px;
  height: 340px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  z-index: 100;
  left: 50%;
  top: 100px;
  transform: translate(-50%, 0);
  transition: all 0.3s;
}
.addOrUpdateForm:hover {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
}
.exit {
  /* 注销按钮 */
  position: absolute;
  top: 10px;
  right: 10px;
}
.test {
  /* redis练习 */
  width: 100%;
  height: 60px;
  margin: 10px auto;
  background-color: whitesmoke;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 670px;
  transition: all 0.6s;
}
.test:hover {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
}
</style>
