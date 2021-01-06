<template>
    <div id="music">
        <header>
            <h1>My Sound</h1>
        </header>
        <main>
            <section class="player">
                <h2 class="song-title">{{ current.title }} - <span>{{ current.artist }}</span></h2>
                <section class="controls">
                    <button class="prev" @click="prev">Prev</button>
                    <button class="play" v-if="!isPlaying" @click="play">Play</button>
                    <button class="pause" v-else @click="pause">Pause</button>
                    <button class="next" @click="next">Next</button>
                </section>
            </section>
            <section class="playlist">
                <h3>The Playlist</h3>
                <!-- 現在の曲と、選択した音楽情報が一致した場合、playingクラスをつける -->
                <button v-for="song in songs" :key="song.src" @click="play(song)" :class="(song.src == current.src) ? 'song playing' : 'song' ">
                {{ song.title }} - {{ song.artist }}
                </button>
            </section>
        </main>
    </div>
</template>

<script>
export default {

    name: 'music',

    data(){
        return{
            //現在の音楽、タイトル、アーティスト名を格納するオブジェクト
            current:{},
            isPlaying:false,

            //音楽番号
            index: 0,

            songs:[
                {
                    title:'Cup',
                    artist:'takanori',
                    src:require('../assets/cup.mp3')
                },
                {
                    title:'Clap',
                    artist:'takanori',
                    src:require('../assets/clap.mp3')
                },
                {
                    title:'Knock',
                    artist:'takanori',
                    src:require('../assets/knock.mp3')
                },
                
            ],

            //Audioクラスのインスタンスを保存
            mediaPlayer : new Audio(),
        }
    },
    methods:{
        //ループは無視して、流れで楽曲を流せるように。

        play(song){
            // 楽曲が直接押された場合
            if(typeof song.src != "undefined"){
                this.current = song;
                //音楽を設置
                this.mediaPlayer.src = this.current.src;

                //indexを設定。
                this.index = this.songs.indexOf(song);
            }

            //音楽再生 srcに設定されている音楽を再生せする
            this.mediaPlayer.play();

            //再生中フラグをtrue
            this.isPlaying = true;

            this.mediaPlayer.addEventListener("ended",function () {
                this.isPlaying = false;
                console.log(this);
            }.bind(this));
        },

        pause(){
            //音楽停止
            this.mediaPlayer.pause();
            //再生フラグをfalse
            this.isPlaying = false;
        },

        prev(){
            this.index--;
            //0以下になったら。最大値の飛ぶ
            if(this.index < 0){
                this.index = this.songs.length - 1;
            }

            this.current = this.songs[this.index];
            //playメソッドへ現在の楽曲情報を飛ばす
            this.play(this.current);
        },

        next(){
            this.index++;
            //設定した音楽総数を超えた最初の音楽に戻る
            if(this.index > this.songs.length - 1){
                this.index = 0;
            }

            this.current = this.songs[this.index];
            
            //playメソッドへ現在の楽曲情報を飛ばす
            this.play(this.current);
        }
    },

    //DOMが作られる前の初期化処理
    created(){
        //現在選択されている音楽情報を保存
        this.current = this.songs[this.index];

        //音楽のソースを保存
        this.mediaPlayer.src = this.current.src;
    }
}
</script>


<style lang="scss" scoped>
    *{
        margin :0;
        padding: 0;
        box-sizing: border-box;
    }
    body{
        font-family: sans-serif;
    }

    header{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px;
        background-color: #212121;
        color: #FFF;
    }
    main{
        width: 100%;
        max-width: 768px;
        margin: 0 auto;
        padding: 25px;
    }
    .song-title{
        color: #53565A;
        font-weight: 700;
        font-size: 32px;
        text-transform: uppercase;
        text-align: center;
    }
    .song-title span{
        font-weight: 400;
        font-style: italic;
    }
    .controls{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px 15px;
    }

    button{
        appearance: none;
        background: none;
        border: none;
        outline: none;
        cursor: pointer;

        &:hover{
            opacity: 0.8;
        }
    }

    .play,
    .pause{
        font-size: 20px;
        font-weight: 700;
        padding: 15px 25px;
        margin: 0px 15px;
        border-radius: 8px;
        color: #FFF;
        background-color: #47ffb3;
    }
    .next,
    .prev{
        font-size: 16px;
        font-weight: 700;
        padding: 10px 20px;
        margin: 0 15px;
        border-radius: 6px;
        color: #FFF;
        background-color: #2ecc8a;
    }

    .playlist{
        padding: 0px 30px;
        & .song{
            display: block;
            width: 100%;
            padding: 15px;
            font-size: 20px;
            font-weight: 700;
            cursor: pointer;

            &:hover{
                color: #2ebacc;
            }

            //楽曲選択している場合
            &.playing{
                color: #FFF;
                background-image: linear-gradient(to right, #2ebacc, #58ff90);
            }
        }
    }
</style>