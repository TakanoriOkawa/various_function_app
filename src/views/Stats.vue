<template>
    <div class="stats">
       <h1>A different component</h1>
       <p>There are currently {{ countLinks }} links</p>

       <button @click="removeAllLinks">全て削除</button>
       <p>{{ msg }}</p>
    </div>
</template>

<script>
import { mapGetters ,mapMutations,mapActions } from 'vuex';

export default {
    name: 'Stats',

    data(){
        return{
            msg: ''
        }
    },

    methods:{
        ...mapMutations(['REMOVE_ALL']),
        ...mapActions(['removeAll']),
        
        //1.5秒後にthenを実行
        removeAllLinks(){
            this.removeAll().then(() => {
                this.msg = 'They have been removed'
            })
        }
    },

    //監視状態にする
    computed: {
        //vuexのstateにあるデータを常時取得可能。
        ...mapGetters([
            'countLinks',
        ]),
    }
}
</script>