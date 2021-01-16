<template>
    <div class="book-mark">
        <div class="left">
            <h1>{{ title }}</h1>

            <!-- submitをpreventするのでリロードは起きない -->
            <form @submit.prevent="addLink">
                <input type="text" class="link-input" placeholder="リンクを追加" v-model="newLink" />
            </form>

            <ul>
                <!-- linksをforで回してURLを取得していく -->
                <li v-for="(link,index) in links" :key="index">
                    {{ link }}

                    <!-- 削除ボタンを追加 index番号を引数に-->
                    <button @click="removeLinks(index)" class="remove">削除</button>
                </li>
                
            </ul>
        </div>
        <div class="right">
            <stats />
        </div>
    </div>
</template>

<script>
import Stats from '@/views/Stats'
import { mapMutations, mapState,mapActions } from 'vuex';

export default {
    name: 'BookMark',
    data(){
        return{
            newLink: '',
        }
    },

    //部品を登録
    components:{
        Stats
    },

    //mutationならmethodsに定義、
    //stateはcomputedに定義、

    methods:{
        //...mapMutationsでミューテーションを取得。
        ...mapMutations([
            'ADD_LINK'
        ]),

        ...mapActions([
            'removeLink'
        ]),
        //独自メソッドの中で、取得したミューテーションを実行。
        addLink(){
            // inputのテキストを引数に実行
            this.ADD_LINK(this.newLink)

            //url情報をリセット
            this.newLink = '';
        },
        removeLinks: function(link){

            //actionsに定義されたもの
            this.removeLink(link)
        }
    },

    computed: {
        //vuexのstateにあるデータを常時取得可能。
        ...mapState([
            'title',
            'links',
        ]),
    }
}
</script>

<style lang="scss" scoped>
    .book-mark{
        display: grid;
        grid-template-columns: repeat(2,50%);
        grid-template-rows: 100%;
        grid-template-areas: 
            "left right";

        height: 100vh;
    }

    .left{
        background-color: pink;

        & > ul{
            padding: 0;
            margin: 0 20px;
            list-style: none;

            & > li{
                font-size: 20px;
                padding: 10px;
                margin-bottom: 20px;
                background-color: rgb(240, 240, 240);
            }
        }
    }

    input{
        border: none;
        padding: 20px;
        width: calc(100% - 40px);
        box-shadow: 0 5px 5px lightgray;
        margin-bottom: 50px;
        outline: none;
    }

    .remove{
        float: right;
        text-transform: uppercase;
        background: pink;
        border: none;
        padding: 5px;
        color: red;
        cursor: pointer;
    }
</style>