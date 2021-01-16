import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: 'My BookMark',
    links:[
      'http://google.com',
      'http://twitter.com',
      'http://youtube.com',
    ]
  },
  getters:{
    //stateを渡すことで stateのデータを渡せる
    countLinks: state => {
      //urlの数を別コンポーネントに渡したい時。
      return state.links.length
    }
  },
  mutations: {
    //追加ミューテーション
    //stateは上のstate。 linkは実行時に渡されたURL
    ADD_LINK:(state , link) => {
      state.links.push(link);
    },
    //ミューテーションの第一引数にはstateが入る
    REMOVE_LINK(state, link){
      //削除
      state.links.splice(link,1)
    },

    REMOVE_ALL(state){
      state.links = []
    }
  },
  actions: {
    //第一引数のcontextってなんや？ 第二引数のlinkはindex番号
    removeLink: (context ,link) => {
      //ミューテーションをコミットする
      context.commit("REMOVE_LINK",link)
    },

    removeAll({commit}){

      //呼び出し下にpromiseインスタンスを返す。
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('REMOVE_ALL');
          resolve();
        },1500)
      })
    }

    //actionsは非同期処理が可能 使い方はmutationsをcommitして使う。
  },
  modules: {},
});