var app = new Vue({
  // マウントする要素
  el: "#app",

  // 用いるデータ
  data: {
    currentDate: new Date(),
    endTime: "00:00:00",
  },

  // 算出プロパティ
  // （関数によって算出されたデータ）
  computed: {
    currentTime: function () {
      return this.dateToTime(this.currentDate);
    },
    endDate: function () {
      return this.timeToDate(this.endTime);
    },

    countDownTime: function () {
      if (this.endDate - this.currentDate > 0) {
        this.endDate++;
      }
      return this.secToTime(this.endDate - this.currentDate);
    }

  },

  // ライフサイクルハック
  // created:
  created: function () {
    setInterval(function () {
      this.currentDate = new Date()
    }.bind(this), 100)
  },

  // mounted: DOM構築直後
  mounted: function () {},


  // このアプリケーションで使うメソッド
  methods: {
    zeroPadding: function (num) {
      return ("0" + num).slice(-2);
    },
    dateToTime: function (date) {
      return `${this.zeroPadding(date.getHours())}:${this.zeroPadding(date.getMinutes())}:${this.zeroPadding(date.getSeconds())}`
    },

    timeToDate: function (time) {
      var d = new Date();
      return new Date(Date.parse(`${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()} ${time}`));
    },

    secToTime: function (sec) {
      var sec = Math.floor(Number(sec) / 1000);
      var h = Math.floor(sec / 3600);
      var m = Math.floor((sec - h * 3600) / 60);
      var s = sec - h * 3600 - m * 60;
      return this.zeroPadding(h) + ":" + this.zeroPadding(m) + ":" + this.zeroPadding(s);
    }
  }
});