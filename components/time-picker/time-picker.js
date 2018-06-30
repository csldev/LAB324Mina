// components/time-picker/time-picker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    years: [],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    value: [9999, 9999],
    toViewYear: '',
    toViewMonth: '',
    currentYear: '',
    currentMonth: ''
  },

  ready() {
    const date = new Date();
    const year = date.getFullYear();
    const month = Number(date.getMonth()) + 1;
    for (let ii = 1970; ii <= Number(year); ii++) {
      this.data.years.push(ii);
    }
    this.setData({
      years: this.data.years,
      toViewYear: `year${year}`,
      toViewMonth: `month${month}`,
      currentMonth: month,
      currentYear: year,
    })


  },

  /**
   * 组件的方法列表
   */
  methods: {
    onYearTapped(e) {
      this.setData({
        currentYear: e.currentTarget.dataset.year,
        openYearList: false,
      })
      this.triggerEvent("setYear", {
        year: this.data.currentYear
      });
    },

    onMonthTapped(e) {
      this.setData({
        currentMonth: e.currentTarget.dataset.month,
        openMonthList: false,
      })
      this.triggerEvent("setMonth", {
        month: this.data.currentMonth
      });
    },

    onYIconTapped() {
      this.setData({
        openYearList: !this.data.openYearList,
      })

    },

    onMIconTapped() {
      this.setData({
        openMonthList: !this.data.openMonthList,
      })
    },

    hideModal() {
      this.triggerEvent("hideModal")
    }

  }
})