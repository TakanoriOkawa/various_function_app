<template>
  <!-- mainオブジェクトを取得しており、かつ、16度以上の場合.warmクラスをつける -->
  <div
    id="weather"
    :class="
      typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''
    "
  >
    <header>
      <h1>Search Weather</h1>
    </header>

    <main>
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="Search..."
          v-model="query"
          @keypress="fetchWeather"
        />
      </div>

      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
        <div class="location-box">
          <div class="location">
            {{ weather.name }} , {{ weather.sys.country }}
          </div>
          <div class="data">{{ deteBuilder() }}</div>
        </div>

        <div class="weather-box">
          <div class="temp">{{ Math.round(weather.main.temp) }}℃</div>
          <div class="weather">
            <p class="weather-text">{{ weather.weather[0].main }}</p>
            <img
              class="img"
              :src="
                'http://openweathermap.org/img/w/' +
                weather.weather[0].icon +
                '.png'
              "
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "weather",
  data() {
    return {
      api_key: "your_api",
      url_base: "https://api.openweathermap.org/data/2.5/",
      query: "",
      weather: {},
    };
  },
  methods: {
    fetchWeather(e) {
      if (e.key == "Enter") {
        fetch(
          `${this.url_base}weather?q=${this.query}&units=metric&lang=ja&appid=${this.api_key}`
        )
          .then((res) => {
            return res.json();
          })
          .then(this.setResults);
      }
    },

    setResults(results) {
      this.weather = results;
      console.log(this.weather);
    },

    deteBuilder() {
      let d = new Date();

      //データに対応する月名、曜日名を準備。
      let months = [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ];
      let days = ["日", "月", "火", "水", "木", "金", "土"];

      //曜日を決める
      let day = days[d.getDay()];

      //日付を入手
      let date = d.getDate();

      //月名を決める
      let month = months[d.getMonth()];

      //年を決める。
      let year = d.getFullYear();

      return `${year}年 ${month} ${date}日 (${day})`;
    },
  },
};
</script>


<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "monstserrat", sans-serif;
}

#weather {
  background-image: url("../assets/cold.jpg");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
  & header {
    min-height: 10vh;
    background-color: #000;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & main {
    min-height: 90vh;
    padding: 25px;
    background-image: lineaer-gradient(
      to bottom,
      rgba(0, 0, 0, 0.25),
      rgba(0, 0, 0, 0.75)
    );
  }

  //温暖の場合
  &.warm {
    background-image: url("../assets/warm.jpg");
  }
}

.search-box {
  width: 100%;
  margin-bottom: 30px;

  & .search-bar {
    //inputエリアのスタイル。
    display: block;
    width: 100%;
    padding: 15px;

    color: #313131;
    font-size: 20px;

    appearance: none;
    border: none;
    outline: none;
    background: none;

    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0px 16px 0px 16px;

    transition: 0.4s;

    &:focus {
      //選択時のアニメーション
      box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
      background-color: rgba(255, 255, 255, 0.75);
      border-radius: 16px 0px 16px 0px;
    }
  }
}

.location-box {
  & .location {
    color: #fff;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
    text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
  }

  & .data {
    color: #fff;
    font-size: 20px;
    font-weight: 300;
    font-style: italic;
    text-align: center;
  }
}

.weather-box {
  text-align: center;

  & .temp {
    display: inline-block;
    padding: 10px 25px;
    color: #fff;
    font-size: 102px;
    font-weight: 900;

    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 16px;

    margin: 30px 0px;
    box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  }

  & .weather {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 48px;
    font-weight: 700;
    font-style: italic;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);

    & > img {
      background-color: rgba(255, 255, 255, 0.4);
      box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
      border-radius: 16px;
    }

    &-text {
      margin-right: 20px;
    }
  }
}
</style>