import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    flagLists: [
      { "capital": "Andorra la Vella", "code": "ad", "continent": "Europe", "flag_1x1": "flags/1x1/ad.svg", "flag": "../flags/4x3/ad.svg", "iso": true, "name": "Andorra", "nameJ": "アンドラ公国", "nameH": "あんどら公国", "id": 1, "nameL": "andorra", "nameR": "andora公国", "nameR2": "andora公国" },
      
      { "capital": "Abu Dhabi", "code": "ae", "continent": "Asia", "flag_1x1": "flags/1x1/ae.svg", "flag": "../flags/4x3/ae.svg", "iso": true, "name": "United Arab Emirates", "nameJ": "アラブ首長国連邦", "nameH": "あらぶ首長国連邦", "id": 2, "nameL": "united arab emirates", "nameR": "arabu首長国連邦", "nameR2": "arabu首長国連邦" },
      
      { "capital": "Kabul", "code": "af", "continent": "Asia", "flag_1x1": "flags/1x1/af.svg", "flag": "../flags/4x3/af.svg", "iso": true, "name": "Afghanistan", "nameJ": "アフガニスタン・イスラム国", "nameH": "あふがにすたん・いすらむ国", "id": 3, "nameL": "afghanistan", "nameR": "ahuganisutan・isuramu国", "nameR2": "afuganisutan・isuramu国" },
      
      { "capital": "St. John's", "code": "ag", "continent": "North America", "flag_1x1": "flags/1x1/ag.svg", "flag": "../flags/4x3/ag.svg", "iso": true, "name": "Antigua and Barbuda", "nameJ": "アンチグア・バーブーダ", "nameH": "あんちぐあ・ばーぶーだ", "id": 4, "nameL": "antigua and barbuda", "nameR": "antigua・ba-bu-da", "nameR2": "anchigua・ba-bu-da" },
      
      { "capital": "The Valley", "code": "ai", "continent": "North America", "flag_1x1": "flags/1x1/ai.svg", "flag": "../flags/4x3/ai.svg", "iso": true, "name": "Anguilla", "nameJ": "アンギラ", "nameH": "あんぎら", "id": 5, "nameL": "anguilla", "nameR": "angira", "nameR2": "angira" },
      
      { "capital": "Tirana", "code": "al", "continent": "Europe", "flag_1x1": "flags/1x1/al.svg", "flag": "../flags/4x3/al.svg", "iso": true, "name": "Albania", "nameJ": "アルバニア共和国", "nameH": "あるばにあ共和国", "id": 6, "nameL": "albania", "nameR": "arubania共和国", "nameR2": "arubania共和国" },
      
      { "capital": "Yerevan", "code": "am", "continent": "Asia", "flag_1x1": "flags/1x1/am.svg", "flag": "../flags/4x3/am.svg", "iso": true, "name": "Armenia", "nameJ": "アルメニア共和国", "nameH": "あるめにあ共和国", "id": 7, "nameL": "armenia", "nameR": "arumenia共和国", "nameR2": "arumenia共和国" },
      
      { "capital": "Luanda", "code": "ao", "continent": "Africa", "flag_1x1": "flags/1x1/ao.svg", "flag": "../flags/4x3/ao.svg", "iso": true, "name": "Angola", "nameJ": "アンゴラ共和国", "nameH": "あんごら共和国", "id": 8, "nameL": "angola", "nameR": "angora共和国", "nameR2": "angora共和国" },
      
      { "code": "aq", "flag_1x1": "flags/1x1/aq.svg", "flag": "../flags/4x3/aq.svg", "iso": true, "name": "Antarctica", "nameJ": "南極", "nameH": "南極", "id": 9, "nameL": "antarctica", "nameR": "南極", "nameR2": "南極" },
      
      { "capital": "Buenos Aires", "code": "ar", "continent": "South America", "flag_1x1": "flags/1x1/ar.svg", "flag": "../flags/4x3/ar.svg", "iso": true, "name": "Argentina", "nameJ": "アルゼンチン共和国", "nameH": "あるぜんちん共和国", "id": 10, "nameL": "argentina", "nameR": "aruzentin共和国", "nameR2": "aruzenchin共和国" },
      
      { "capital": "Pago Pago", "code": "as", "continent": "Oceania", "flag_1x1": "flags/1x1/as.svg", "flag": "../flags/4x3/as.svg", "iso": true, "name": "American Samoa", "nameJ": "米領サモア", "nameH": "米領さもあ", "id": 11, "nameL": "american samoa", "nameR": "米領samoa", "nameR2": "米領samoa" },
      
      { "capital": "Vienna", "code": "at", "continent": "Europe", "flag_1x1": "flags/1x1/at.svg", "flag": "../flags/4x3/at.svg", "iso": true, "name": "Austria", "nameJ": "オーストリア共和国", "nameH": "おーすとりあ共和国", "id": 12, "nameL": "austria", "nameR": "o-sutoria共和国", "nameR2": "o-sutoria共和国" },
      
      { "capital": "Canberra", "code": "au", "continent": "Oceania", "flag_1x1": "flags/1x1/au.svg", "flag": "../flags/4x3/au.svg", "iso": true, "name": "Australia", "nameJ": "オーストラリア", "nameH": "おーすとらりあ", "id": 13, "nameL": "australia", "nameR": "o-sutoraria", "nameR2": "o-sutoraria" },
      
      { "capital": "Oranjestad", "code": "aw", "continent": "South America", "flag_1x1": "flags/1x1/aw.svg", "flag": "../flags/4x3/aw.svg", "iso": true, "name": "Aruba", "nameJ": "アルバ", "nameH": "あるば", "id": 14, "nameL": "aruba", "nameR": "aruba", "nameR2": "aruba" },
      
      { "capital": "Baku", "code": "az", "continent": "Asia", "flag_1x1": "flags/1x1/az.svg", "flag": "../flags/4x3/az.svg", "iso": true, "name": "Azerbaijan", "nameJ": "アゼルバイジャン共和国", "nameH": "あぜるばいじゃん共和国", "id": 15, "nameL": "azerbaijan", "nameR": "azerubaizyan共和国", "nameR2": "azerubaijan共和国" },
      
      { "capital": "Sarajevo", "code": "ba", "continent": "Europe", "flag_1x1": "flags/1x1/ba.svg", "flag": "../flags/4x3/ba.svg", "iso": true, "name": "Bosnia and Herzegovina", "nameJ": "(ボスニア・ヘルツェゴビナ共和国)", "nameH": "(ぼすにあ・へるつぇごびな共和国)", "id": 16, "nameL": "bosnia and herzegovina", "nameR": "(bosunia・herutuegobina共和国)", "nameR2": "(bosunia・herutsuegobina共和国)" },
      
      { "capital": "Bridgetown", "code": "bb", "continent": "North America", "flag_1x1": "flags/1x1/bb.svg", "flag": "../flags/4x3/bb.svg", "iso": true, "name": "Barbados", "nameJ": "バルバドス", "nameH": "ばるばどす", "id": 17, "nameL": "barbados", "nameR": "barubadosu", "nameR2": "barubadosu" },
      
      { "capital": "Dhaka", "code": "bd", "continent": "Asia", "flag_1x1": "flags/1x1/bd.svg", "flag": "../flags/4x3/bd.svg", "iso": true, "name": "Bangladesh", "nameJ": "バングラデシュ人民共和国", "nameH": "ばんぐらでしゅ人民共和国", "id": 18, "nameL": "bangladesh", "nameR": "banguradesyu人民共和国", "nameR2": "banguradeshu人民共和国" },
      
      { "capital": "Brussels", "code": "be", "continent": "Europe", "flag_1x1": "flags/1x1/be.svg", "flag": "../flags/4x3/be.svg", "iso": true, "name": "Belgium", "nameJ": "ベルギー王国", "nameH": "べるぎー王国", "id": 19, "nameL": "belgium", "nameR": "berugi-王国", "nameR2": "berugi-王国" },
      
      { "capital": "Ouagadougou", "code": "bf", "continent": "Africa", "flag_1x1": "flags/1x1/bf.svg", "flag": "../flags/4x3/bf.svg", "iso": true, "name": "Burkina Faso", "nameJ": "ブルキナファソ", "nameH": "ぶるきなふぁそ", "id": 20, "nameL": "burkina faso", "nameR": "burukinafaso", "nameR2": "burukinafaso" },
      
      { "capital": "Sofia", "code": "bg", "continent": "Europe", "flag_1x1": "flags/1x1/bg.svg", "flag": "../flags/4x3/bg.svg", "iso": true, "name": "Bulgaria", "nameJ": "ブルガリア共和国", "nameH": "ぶるがりあ共和国", "id": 21, "nameL": "bulgaria", "nameR": "burugaria共和国", "nameR2": "burugaria共和国" },
      
      { "capital": "Manama", "code": "bh", "continent": "Asia", "flag_1x1": "flags/1x1/bh.svg", "flag": "../flags/4x3/bh.svg", "iso": true, "name": "Bahrain", "nameJ": "バーレーン国", "nameH": "ばーれーん国", "id": 22, "nameL": "bahrain", "nameR": "ba-re-n国", "nameR2": "ba-re-n国" },
      
      { "capital": "Bujumbura", "code": "bi", "continent": "Africa", "flag_1x1": "flags/1x1/bi.svg", "flag": "../flags/4x3/bi.svg", "iso": true, "name": "Burundi", "nameJ": "ブルンジ共和国", "nameH": "ぶるんじ共和国", "id": 23, "nameL": "burundi", "nameR": "burunzi共和国", "nameR2": "burunji共和国" },
      
      { "capital": "Porto-Novo", "code": "bj", "continent": "Africa", "flag_1x1": "flags/1x1/bj.svg", "flag": "../flags/4x3/bj.svg", "iso": true, "name": "Benin", "nameJ": "ベナン共和国", "nameH": "べなん共和国", "id": 24, "nameL": "benin", "nameR": "benan共和国", "nameR2": "benan共和国" },
      
      { "capital": "Hamilton", "code": "bm", "continent": "North America", "flag_1x1": "flags/1x1/bm.svg", "flag": "../flags/4x3/bm.svg", "iso": true, "name": "Bermuda", "nameJ": "バーミューダ諸島", "nameH": "ばーみゅーだ諸島", "id": 25, "nameL": "bermuda", "nameR": "ba-myu-da諸島", "nameR2": "ba-myu-da諸島" },
      
      { "capital": "Bandar Seri Begawan", "code": "bn", "continent": "Asia", "flag_1x1": "flags/1x1/bn.svg", "flag": "../flags/4x3/bn.svg", "iso": true, "name": "Brunei Darussalam", "nameJ": "ブルネイ・ダルサラーム国", "nameH": "ぶるねい・だるさらーむ国", "id": 26, "nameL": "brunei darussalam", "nameR": "burunei・darusara-mu国", "nameR2": "burunei・darusara-mu国" },
      
      { "capital": "Sucre", "code": "bo", "continent": "South America", "flag_1x1": "flags/1x1/bo.svg", "flag": "../flags/4x3/bo.svg", "iso": true, "name": "Bolivia", "nameJ": "ボリビア共和国", "nameH": "ぼりびあ共和国", "id": 27, "nameL": "bolivia", "nameR": "boribia共和国", "nameR2": "boribia共和国" },
      
      { "capital": "Brasília", "code": "br", "continent": "South America", "flag_1x1": "flags/1x1/br.svg", "flag": "../flags/4x3/br.svg", "iso": true, "name": "Brazil", "nameJ": "ブラジル連邦共和国", "nameH": "ぶらじる連邦共和国", "id": 28, "nameL": "brazil", "nameR": "buraziru連邦共和国", "nameR2": "burajiru連邦共和国" },
      
      { "capital": "Nassau", "code": "bs", "continent": "North America", "flag_1x1": "flags/1x1/bs.svg", "flag": "../flags/4x3/bs.svg", "iso": true, "name": "Bahamas", "nameJ": "バハマ国", "nameH": "ばはま国", "id": 29, "nameL": "bahamas", "nameR": "bahama国", "nameR2": "bahama国" },
      
      { "capital": "Thimphu", "code": "bt", "continent": "Asia", "flag_1x1": "flags/1x1/bt.svg", "flag": "../flags/4x3/bt.svg", "iso": true, "name": "Bhutan", "nameJ": "ブータン王国", "nameH": "ぶーたん王国", "id": 30, "nameL": "bhutan", "nameR": "bu-tan王国", "nameR2": "bu-tan王国" },
      
      { "code": "bv", "flag_1x1": "flags/1x1/bv.svg", "flag": "../flags/4x3/bv.svg", "iso": true, "name": "Bouvet Island", "nameJ": "ブーベ島", "nameH": "ぶーべ島", "id": 31, "nameL": "bouvet island", "nameR": "bu-be島", "nameR2": "bu-be島" },
      
      { "capital": "Gaborone", "code": "bw", "continent": "Africa", "flag_1x1": "flags/1x1/bw.svg", "flag": "../flags/4x3/bw.svg", "iso": true, "name": "Botswana", "nameJ": "ボツワナ共和国", "nameH": "ぼつわな共和国", "id": 32, "nameL": "botswana", "nameR": "botuwana共和国", "nameR2": "botsuwana共和国" },
      
      { "capital": "Minsk", "code": "by", "continent": "Europe", "flag_1x1": "flags/1x1/by.svg", "flag": "../flags/4x3/by.svg", "iso": true, "name": "Belarus", "nameJ": "ベラルーシ共和国", "nameH": "べらるーし共和国", "id": 33, "nameL": "belarus", "nameR": "beraru-si共和国", "nameR2": "beraru-shi共和国" },
      
      { "capital": "Belmopan", "code": "bz", "continent": "North America", "flag_1x1": "flags/1x1/bz.svg", "flag": "../flags/4x3/bz.svg", "iso": true, "name": "Belize", "nameJ": "ベリーズ", "nameH": "べりーず", "id": 34, "nameL": "belize", "nameR": "beri-zu", "nameR2": "beri-zu" },
      
      { "capital": "Ottawa", "code": "ca", "continent": "North America", "flag_1x1": "flags/1x1/ca.svg", "flag": "../flags/4x3/ca.svg", "iso": true, "name": "Canada", "nameJ": "カナダ", "nameH": "かなだ", "id": 35, "nameL": "canada", "nameR": "kanada", "nameR2": "kanada" },
      
      { "capital": "West Island", "code": "cc", "continent": "Asia", "flag_1x1": "flags/1x1/cc.svg", "flag": "../flags/4x3/cc.svg", "iso": true, "name": "Cocos (Keeling) Islands", "nameJ": "ココス諸島", "nameH": "ここす諸島", "id": 36, "nameL": "cocos (keeling) islands", "nameR": "kokosu諸島", "nameR2": "kokosu諸島" },
      
      { "capital": "Bangui", "code": "cf", "continent": "Africa", "flag_1x1": "flags/1x1/cf.svg", "flag": "../flags/4x3/cf.svg", "iso": true, "name": "Central African Republic", "nameJ": "中央アフリカ共和国", "nameH": "中央あふりか共和国", "id": 37, "nameL": "central african republic", "nameR": "中央ahurika共和国", "nameR2": "中央afurika共和国" },
      
      { "capital": "Brazzaville", "code": "cg", "continent": "Africa", "flag_1x1": "flags/1x1/cg.svg", "flag": "../flags/4x3/cg.svg", "iso": true, "name": "Republic of the Congo", "nameJ": "コンゴ共和国", "nameH": "こんご共和国", "id": 38, "nameL": "republic of the congo", "nameR": "kongo共和国", "nameR2": "kongo共和国" },
      
      { "capital": "Bern", "code": "ch", "continent": "Europe", "flag_1x1": "flags/1x1/ch.svg", "flag": "../flags/4x3/ch.svg", "iso": true, "name": "Switzerland", "nameJ": "スイス連邦", "nameH": "すいす連邦", "id": 39, "nameL": "switzerland", "nameR": "suisu連邦", "nameR2": "suisu連邦" },
      
      { "capital": "Yamoussoukro", "code": "ci", "continent": "Africa", "flag_1x1": "flags/1x1/ci.svg", "flag": "../flags/4x3/ci.svg", "iso": true, "name": "Côte d'Ivoire", "nameJ": "コートジボアール共和国", "nameH": "こーとじぼあーる共和国", "id": 40, "nameL": "côte d'ivoire", "nameR": "ko-toziboa-ru共和国", "nameR2": "ko-tojiboa-ru共和国" },
      
      { "capital": "Avarua", "code": "ck", "continent": "Oceania", "flag_1x1": "flags/1x1/ck.svg", "flag": "../flags/4x3/ck.svg", "iso": true, "name": "Cook Islands", "nameJ": "クック諸島", "nameH": "くっく諸島", "id": 41, "nameL": "cook islands", "nameR": "kukku諸島", "nameR2": "kukku諸島" },
      
      { "capital": "Santiago", "code": "cl", "continent": "South America", "flag_1x1": "flags/1x1/cl.svg", "flag": "../flags/4x3/cl.svg", "iso": true, "name": "Chile", "nameJ": "チリ共和国", "nameH": "ちり共和国", "id": 42, "nameL": "chile", "nameR": "tiri共和国", "nameR2": "chiri共和国" },
      
      { "capital": "Yaoundé", "code": "cm", "continent": "Africa", "flag_1x1": "flags/1x1/cm.svg", "flag": "../flags/4x3/cm.svg", "iso": true, "name": "Cameroon", "nameJ": "カメルーン共和国", "nameH": "かめるーん共和国", "id": 43, "nameL": "cameroon", "nameR": "kameru-n共和国", "nameR2": "kameru-n共和国" },
      
      { "capital": "Beijing", "code": "cn", "continent": "Asia", "flag_1x1": "flags/1x1/cn.svg", "flag": "../flags/4x3/cn.svg", "iso": true, "name": "China", "nameJ": "中華人民共和国", "nameH": "中華人民共和国", "id": 44, "nameL": "china", "nameR": "中華人民共和国", "nameR2": "中華人民共和国" },
      
      { "capital": "Bogotá", "code": "co", "continent": "South America", "flag_1x1": "flags/1x1/co.svg", "flag": "../flags/4x3/co.svg", "iso": true, "name": "Colombia", "nameJ": "コロンビア共和国", "nameH": "ころんびあ共和国", "id": 45, "nameL": "colombia", "nameR": "koronbia共和国", "nameR2": "koronbia共和国" },
      
      { "capital": "San José", "code": "cr", "continent": "North America", "flag_1x1": "flags/1x1/cr.svg", "flag": "../flags/4x3/cr.svg", "iso": true, "name": "Costa Rica", "nameJ": "コスタリカ共和国", "nameH": "こすたりか共和国", "id": 46, "nameL": "costa rica", "nameR": "kosutarika共和国", "nameR2": "kosutarika共和国" },
      
      { "capital": "Havana", "code": "cu", "continent": "North America", "flag_1x1": "flags/1x1/cu.svg", "flag": "../flags/4x3/cu.svg", "iso": true, "name": "Cuba", "nameJ": "キューバ共和国", "nameH": "きゅーば共和国", "id": 47, "nameL": "cuba", "nameR": "kyu-ba共和国", "nameR2": "kyu-ba共和国" },
      
      { "capital": "Praia", "code": "cv", "continent": "Africa", "flag_1x1": "flags/1x1/cv.svg", "flag": "../flags/4x3/cv.svg", "iso": true, "name": "Cabo Verde", "nameJ": "カーボベルデ共和国", "nameH": "かーぼべるで共和国", "id": 48, "nameL": "cabo verde", "nameR": "ka-boberude共和国", "nameR2": "ka-boberude共和国" },
      
      { "capital": "Flying Fish Cove", "code": "cx", "continent": "Asia", "flag_1x1": "flags/1x1/cx.svg", "flag": "../flags/4x3/cx.svg", "iso": true, "name": "Christmas Island", "nameJ": "クリスマス島", "nameH": "くりすます島", "id": 49, "nameL": "christmas island", "nameR": "kurisumasu島", "nameR2": "kurisumasu島" },
      
      { "capital": "Nicosia", "code": "cy", "continent": "Europe", "flag_1x1": "flags/1x1/cy.svg", "flag": "../flags/4x3/cy.svg", "iso": true, "name": "Cyprus", "nameJ": "キプロス共和国", "nameH": "きぷろす共和国", "id": 50, "nameL": "cyprus", "nameR": "kipurosu共和国", "nameR2": "kipurosu共和国" },
      
      { "capital": "Prague", "code": "cz", "continent": "Europe", "flag_1x1": "flags/1x1/cz.svg", "flag": "../flags/4x3/cz.svg", "iso": true, "name": "Czech Republic", "nameJ": "チェコ共和国", "nameH": "ちぇこ共和国", "id": 51, "nameL": "czech republic", "nameR": "tyeko共和国", "nameR2": "cheko共和国" },
      
      { "capital": "Berlin", "code": "de", "continent": "Europe", "flag_1x1": "flags/1x1/de.svg", "flag": "../flags/4x3/de.svg", "iso": true, "name": "Germany", "nameJ": "ドイツ連邦共和国", "nameH": "どいつ連邦共和国", "id": 52, "nameL": "germany", "nameR": "doitu連邦共和国", "nameR2": "doitsu連邦共和国" },
      
      { "capital": "Djibouti", "code": "dj", "continent": "Africa", "flag_1x1": "flags/1x1/dj.svg", "flag": "../flags/4x3/dj.svg", "iso": true, "name": "Djibouti", "nameJ": "ジブチ共和国", "nameH": "じぶち共和国", "id": 53, "nameL": "djibouti", "nameR": "zibuti共和国", "nameR2": "jibuchi共和国" },
      
      { "capital": "Copenhagen", "code": "dk", "continent": "Europe", "flag_1x1": "flags/1x1/dk.svg", "flag": "../flags/4x3/dk.svg", "iso": true, "name": "Denmark", "nameJ": "デンマーク王国", "nameH": "でんまーく王国", "id": 54, "nameL": "denmark", "nameR": "denma-ku王国", "nameR2": "denma-ku王国" },
      
      { "capital": "Roseau", "code": "dm", "continent": "North America", "flag_1x1": "flags/1x1/dm.svg", "flag": "../flags/4x3/dm.svg", "iso": true, "name": "Dominica", "nameJ": "ドミニカ国", "nameH": "どみにか国", "id": 55, "nameL": "dominica", "nameR": "dominika国", "nameR2": "dominika国" },
      
      { "capital": "Santo Domingo", "code": "do", "continent": "North America", "flag_1x1": "flags/1x1/do.svg", "flag": "../flags/4x3/do.svg", "iso": true, "name": "Dominican Republic", "nameJ": "ドミニカ共和国", "nameH": "どみにか共和国", "id": 56, "nameL": "dominican republic", "nameR": "dominika共和国", "nameR2": "dominika共和国" },
      
      { "capital": "Algiers", "code": "dz", "continent": "Africa", "flag_1x1": "flags/1x1/dz.svg", "flag": "../flags/4x3/dz.svg", "iso": true, "name": "Algeria", "nameJ": "アルジェリア民主人民共和国", "nameH": "あるじぇりあ民主人民共和国", "id": 57, "nameL": "algeria", "nameR": "aruzyeria民主人民共和国", "nameR2": "aruzyeria民主人民共和国" },
      
      { "capital": "Quito", "code": "ec", "continent": "South America", "flag_1x1": "flags/1x1/ec.svg", "flag": "../flags/4x3/ec.svg", "iso": true, "name": "Ecuador", "nameJ": "エクアドル共和国", "nameH": "えくあどる共和国", "id": 58, "nameL": "ecuador", "nameR": "ekuadoru共和国", "nameR2": "ekuadoru共和国" },
      
      { "capital": "Tallinn", "code": "ee", "continent": "Europe", "flag_1x1": "flags/1x1/ee.svg", "flag": "../flags/4x3/ee.svg", "iso": true, "name": "Estonia", "nameJ": "エストニア共和国", "nameH": "えすとにあ共和国", "id": 59, "nameL": "estonia", "nameR": "esutonia共和国", "nameR2": "esutonia共和国" },
      
      { "capital": "Cairo", "code": "eg", "continent": "Africa", "flag_1x1": "flags/1x1/eg.svg", "flag": "../flags/4x3/eg.svg", "iso": true, "name": "Egypt", "nameJ": "エジプト・アラブ共和国", "nameH": "えじぷと・あらぶ共和国", "id": 60, "nameL": "egypt", "nameR": "eziputo・arabu共和国", "nameR2": "ejiputo・arabu共和国" },
      
      { "capital": "Laayoune", "code": "eh", "continent": "Africa", "flag_1x1": "flags/1x1/eh.svg", "flag": "../flags/4x3/eh.svg", "iso": true, "name": "Western Sahara", "nameJ": "西サハラ", "nameH": "西さはら", "id": 61, "nameL": "western sahara", "nameR": "西sahara", "nameR2": "西sahara" },
      
      { "capital": "Asmara", "code": "er", "continent": "Africa", "flag_1x1": "flags/1x1/er.svg", "flag": "../flags/4x3/er.svg", "iso": true, "name": "Eritrea", "nameJ": "エリトリア", "nameH": "えりとりあ", "id": 62, "nameL": "eritrea", "nameR": "eritoria", "nameR2": "eritoria" },
      
      { "capital": "Madrid", "code": "es", "continent": "Europe", "flag_1x1": "flags/1x1/es.svg", "flag": "../flags/4x3/es.svg", "iso": true, "name": "Spain", "nameJ": "スペイン", "nameH": "すぺいん", "id": 63, "nameL": "spain", "nameR": "supein", "nameR2": "supein" },
      
      { "capital": "Addis Ababa", "code": "et", "continent": "Africa", "flag_1x1": "flags/1x1/et.svg", "flag": "../flags/4x3/et.svg", "iso": true, "name": "Ethiopia", "nameJ": "エチオピア", "nameH": "えちおぴあ", "id": 64, "nameL": "ethiopia", "nameR": "etiopia", "nameR2": "echiopia" },
      
      { "capital": "Helsinki", "code": "fi", "continent": "Europe", "flag_1x1": "flags/1x1/fi.svg", "flag": "../flags/4x3/fi.svg", "iso": true, "name": "Finland", "nameJ": "フィンランド共和国", "nameH": "ふぃんらんど共和国", "id": 65, "nameL": "finland", "nameR": "finrando共和国", "nameR2": "finrando共和国" },
      
      { "capital": "Suva", "code": "fj", "continent": "Oceania", "flag_1x1": "flags/1x1/fj.svg", "flag": "../flags/4x3/fj.svg", "iso": true, "name": "Fiji", "nameJ": "フィジー共和国", "nameH": "ふぃじー共和国", "id": 66, "nameL": "fiji", "nameR": "fizi-共和国", "nameR2": "fiji-共和国" },
      
      { "capital": "Stanley", "code": "fk", "continent": "South America", "flag_1x1": "flags/1x1/fk.svg", "flag": "../flags/4x3/fk.svg", "iso": true, "name": "Falkland Islands", "nameJ": "フォークランド(マルビナス)諸島", "nameH": "ふぉーくらんど(まるびなす)諸島", "id": 67, "nameL": "falkland islands", "nameR": "fo-kurando(marubinasu)諸島", "nameR2": "fo-kurando(marubinasu)諸島" },
      
      { "capital": "Palikir", "code": "fm", "continent": "Oceania", "flag_1x1": "flags/1x1/fm.svg", "flag": "../flags/4x3/fm.svg", "iso": true, "name": "Federated States of Micronesia", "nameJ": "ミクロネシア連邦", "nameH": "みくろねしあ連邦", "id": 68, "nameL": "federated states of micronesia", "nameR": "mikuronesia連邦", "nameR2": "mikuroneshia連邦" },
      
      { "capital": "Tórshavn", "code": "fo", "continent": "Europe", "flag_1x1": "flags/1x1/fo.svg", "flag": "../flags/4x3/fo.svg", "iso": true, "name": "Faroe Islands", "nameJ": "フェロー諸島", "nameH": "ふぇろー諸島", "id": 69, "nameL": "faroe islands", "nameR": "fero-諸島", "nameR2": "fero-諸島" },
      
      { "capital": "Paris", "code": "fr", "continent": "Europe", "flag_1x1": "flags/1x1/fr.svg", "flag": "../flags/4x3/fr.svg", "iso": true, "name": "France", "nameJ": "フランス共和国", "nameH": "ふらんす共和国", "id": 70, "nameL": "france", "nameR": "huransu共和国", "nameR2": "furansu共和国" },
      
      { "capital": "Libreville", "code": "ga", "continent": "Africa", "flag_1x1": "flags/1x1/ga.svg", "flag": "../flags/4x3/ga.svg", "iso": true, "name": "Gabon", "nameJ": "ガボン共和国", "nameH": "がぼん共和国", "id": 71, "nameL": "gabon", "nameR": "gabon共和国", "nameR2": "gabon共和国" },
      
      { "capital": "London", "code": "gb", "continent": "Europe", "flag_1x1": "flags/1x1/gb.svg", "flag": "../flags/4x3/gb.svg", "iso": true, "name": "United Kingdom", "nameJ": "グレートブリテン及び北部アイルランド連合王国(英国)", "nameH": "ぐれーとぶりてん及び北部あいるらんど連合王国(英国)", "id": 72, "nameL": "united kingdom", "nameR": "gure-toburiten及bi北部airurando連合王国(英国)", "nameR2": "gure-toburiten及bi北部airurando連合王国(英国)" },
      
      { "capital": "St. George's", "code": "gd", "continent": "North America", "flag_1x1": "flags/1x1/gd.svg", "flag": "../flags/4x3/gd.svg", "iso": true, "name": "Grenada", "nameJ": "グレナダ", "nameH": "ぐれなだ", "id": 73, "nameL": "grenada", "nameR": "gurenada", "nameR2": "gurenada" },
      
      { "capital": "Tbilisi", "code": "ge", "continent": "Asia", "flag_1x1": "flags/1x1/ge.svg", "flag": "../flags/4x3/ge.svg", "iso": true, "name": "Georgia", "nameJ": "グルジア共和国", "nameH": "ぐるじあ共和国", "id": 74, "nameL": "georgia", "nameR": "guruzia共和国", "nameR2": "gurujia共和国" },
      
      { "capital": "Cayenne", "code": "gf", "continent": "South America", "flag_1x1": "flags/1x1/gf.svg", "flag": "../flags/4x3/gf.svg", "iso": true, "name": "French Guiana", "nameJ": "仏領ギアナ", "nameH": "仏領ぎあな", "id": 75, "nameL": "french guiana", "nameR": "仏領giana", "nameR2": "仏領giana" },
      
      { "capital": "Accra", "code": "gh", "continent": "Africa", "flag_1x1": "flags/1x1/gh.svg", "flag": "../flags/4x3/gh.svg", "iso": true, "name": "Ghana", "nameJ": "ガーナ共和国", "nameH": "がーな共和国", "id": 76, "nameL": "ghana", "nameR": "ga-na共和国", "nameR2": "ga-na共和国" },
      
      { "capital": "Gibraltar", "code": "gi", "continent": "Europe", "flag_1x1": "flags/1x1/gi.svg", "flag": "../flags/4x3/gi.svg", "iso": true, "name": "Gibraltar", "nameJ": "ジブラルタル", "nameH": "じぶらるたる", "id": 77, "nameL": "gibraltar", "nameR": "ziburarutaru", "nameR2": "jiburarutaru" },
      
      { "capital": "Nuuk", "code": "gl", "continent": "North America", "flag_1x1": "flags/1x1/gl.svg", "flag": "../flags/4x3/gl.svg", "iso": true, "name": "Greenland", "nameJ": "グリーンランド", "nameH": "ぐりーんらんど", "id": 78, "nameL": "greenland", "nameR": "guri-nrando", "nameR2": "guri-nrando" },
      
      { "capital": "Banjul", "code": "gm", "continent": "Africa", "flag_1x1": "flags/1x1/gm.svg", "flag": "../flags/4x3/gm.svg", "iso": true, "name": "Gambia", "nameJ": "ガンビア共和国", "nameH": "がんびあ共和国", "id": 79, "nameL": "gambia", "nameR": "ganbia共和国", "nameR2": "ganbia共和国" },
      
      { "capital": "Conakry", "code": "gn", "continent": "Africa", "flag_1x1": "flags/1x1/gn.svg", "flag": "../flags/4x3/gn.svg", "iso": true, "name": "Guinea", "nameJ": "ギニア共和国", "nameH": "ぎにあ共和国", "id": 80, "nameL": "guinea", "nameR": "ginia共和国", "nameR2": "ginia共和国" },
      
      { "capital": "Basse-Terre", "code": "gp", "continent": "North America", "flag_1x1": "flags/1x1/gp.svg", "flag": "../flags/4x3/gp.svg", "iso": true, "name": "Guadeloupe", "nameJ": "グアドループ島", "nameH": "ぐあどるーぷ島", "id": 81, "nameL": "guadeloupe", "nameR": "guadoru-pu島", "nameR2": "guadoru-pu島" },
      
      { "capital": "Malabo", "code": "gq", "continent": "Africa", "flag_1x1": "flags/1x1/gq.svg", "flag": "../flags/4x3/gq.svg", "iso": true, "name": "Equatorial Guinea", "nameJ": "赤道ギニア共和国", "nameH": "赤道ぎにあ共和国", "id": 82, "nameL": "equatorial guinea", "nameR": "赤道ginia共和国", "nameR2": "赤道ginia共和国" },
      
      { "capital": "Athens", "code": "gr", "continent": "Europe", "flag_1x1": "flags/1x1/gr.svg", "flag": "../flags/4x3/gr.svg", "iso": true, "name": "Greece", "nameJ": "ギリシア共和国", "nameH": "ぎりしあ共和国", "id": 83, "nameL": "greece", "nameR": "girisia共和国", "nameR2": "girishia共和国" },
      
      { "capital": "King Edward Point", "code": "gs", "continent": "Antarctica", "flag_1x1": "flags/1x1/gs.svg", "flag": "../flags/4x3/gs.svg", "iso": true, "name": "South Georgia and the South Sandwich Islands", "nameJ": "南ジョージア島・南サンドイッチ諸島", "nameH": "南じょーじあ島・南さんどいっち諸島", "id": 84, "nameL": "south georgia and the south sandwich islands", "nameR": "南zyo-zia島・南sandoitti諸島", "nameR2": "南jo-jia島・南sandoicchi諸島" },
      
      { "capital": "Guatemala City", "code": "gt", "continent": "North America", "flag_1x1": "flags/1x1/gt.svg", "flag": "../flags/4x3/gt.svg", "iso": true, "name": "Guatemala", "nameJ": "グアテマラ共和国", "nameH": "ぐあてまら共和国", "id": 85, "nameL": "guatemala", "nameR": "guatemara共和国", "nameR2": "guatemara共和国" },
      
      { "capital": "Hagåtña", "code": "gu", "continent": "Oceania", "flag_1x1": "flags/1x1/gu.svg", "flag": "../flags/4x3/gu.svg", "iso": true, "name": "Guam", "nameJ": "グアム", "nameH": "ぐあむ", "id": 86, "nameL": "guam", "nameR": "guamu", "nameR2": "guamu" },
      
      { "capital": "Bissau", "code": "gw", "continent": "Africa", "flag_1x1": "flags/1x1/gw.svg", "flag": "../flags/4x3/gw.svg", "iso": true, "name": "Guinea-Bissau", "nameJ": "ギニアビサオ共和国", "nameH": "ぎにあびさお共和国", "id": 87, "nameL": "guinea-bissau", "nameR": "giniabisao共和国", "nameR2": "giniabisao共和国" },
      
      { "capital": "Georgetown", "code": "gy", "continent": "South America", "flag_1x1": "flags/1x1/gy.svg", "flag": "../flags/4x3/gy.svg", "iso": true, "name": "Guyana", "nameJ": "ガイアナ協同共和国", "nameH": "がいあな協同共和国", "id": 88, "nameL": "guyana", "nameR": "gaiana協同共和国", "nameR2": "gaiana協同共和国" },
      
      { "capital": "Hong Kong", "code": "hk", "continent": "Asia", "flag_1x1": "flags/1x1/hk.svg", "flag": "../flags/4x3/hk.svg", "iso": true, "name": "Hong Kong", "nameJ": "ホンコン (香港)", "nameH": "ほんこん (香港)", "id": 89, "nameL": "hong kong", "nameR": "honkon (香港)", "nameR2": "honkon (香港)" },
      
      { "code": "hm", "flag_1x1": "flags/1x1/hm.svg", "flag": "../flags/4x3/hm.svg", "iso": true, "name": "Heard Island and McDonald Islands", "nameJ": "ヘアド島・マクドナルド諸島", "nameH": "へあど島・まくどなるど諸島", "id": 90, "nameL": "heard island and mcdonald islands", "nameR": "heado島・makudonarudo諸島", "nameR2": "heado島・makudonarudo諸島" },
      
      { "capital": "Tegucigalpa", "code": "hn", "continent": "North America", "flag_1x1": "flags/1x1/hn.svg", "flag": "../flags/4x3/hn.svg", "iso": true, "name": "Honduras", "nameJ": "ホンジュラス共和国", "nameH": "ほんじゅらす共和国", "id": 91, "nameL": "honduras", "nameR": "honzyurasu共和国", "nameR2": "honjurasu共和国" },
      
      { "capital": "Zagreb", "code": "hr", "continent": "Europe", "flag_1x1": "flags/1x1/hr.svg", "flag": "../flags/4x3/hr.svg", "iso": true, "name": "Croatia", "nameJ": "クロアチア共和国", "nameH": "くろあちあ共和国", "id": 92, "nameL": "croatia", "nameR": "kuroatia共和国", "nameR2": "kuroachia共和国" },
      
      { "capital": "Port-au-Prince", "code": "ht", "continent": "North America", "flag_1x1": "flags/1x1/ht.svg", "flag": "../flags/4x3/ht.svg", "iso": true, "name": "Haiti", "nameJ": "ハイチ共和国", "nameH": "はいち共和国", "id": 93, "nameL": "haiti", "nameR": "haiti共和国", "nameR2": "haichi共和国" },
      
      { "capital": "Budapest", "code": "hu", "continent": "Europe", "flag_1x1": "flags/1x1/hu.svg", "flag": "../flags/4x3/hu.svg", "iso": true, "name": "Hungary", "nameJ": "ハンガリー共和国", "nameH": "はんがりー共和国", "id": 94, "nameL": "hungary", "nameR": "hangari-共和国", "nameR2": "hangari-共和国" },
      
      { "capital": "Jakarta", "code": "id", "continent": "Asia", "flag_1x1": "flags/1x1/id.svg", "flag": "../flags/4x3/id.svg", "iso": true, "name": "Indonesia", "nameJ": "インドネシア共和国", "nameH": "いんどねしあ共和国", "id": 95, "nameL": "indonesia", "nameR": "indonesia共和国", "nameR2": "indoneshia共和国" },
      
      { "capital": "Dublin", "code": "ie", "continent": "Europe", "flag_1x1": "flags/1x1/ie.svg", "flag": "../flags/4x3/ie.svg", "iso": true, "name": "Ireland", "nameJ": "アイルランド", "nameH": "あいるらんど", "id": 96, "nameL": "ireland", "nameR": "airurando", "nameR2": "airurando" },
      
      { "capital": "Jerusalem", "code": "il", "continent": "Asia", "flag_1x1": "flags/1x1/il.svg", "flag": "../flags/4x3/il.svg", "iso": true, "name": "Israel", "nameJ": "イスラエル国", "nameH": "いすらえる国", "id": 97, "nameL": "israel", "nameR": "isuraeru国", "nameR2": "isuraeru国" },
      
      { "capital": "New Delhi", "code": "in", "continent": "Asia", "flag_1x1": "flags/1x1/in.svg", "flag": "../flags/4x3/in.svg", "iso": true, "name": "India", "nameJ": "インド", "nameH": "いんど", "id": 98, "nameL": "india", "nameR": "indo", "nameR2": "indo" },
      
      { "capital": "Diego Garcia", "code": "io", "continent": "Asia", "flag_1x1": "flags/1x1/io.svg", "flag": "../flags/4x3/io.svg", "iso": true, "name": "British Indian Ocean Territory", "nameJ": "英領インド洋地域", "nameH": "英領いんど洋地域", "id": 99, "nameL": "british indian ocean territory", "nameR": "英領indo洋地域", "nameR2": "英領indo洋地域" },
      
      { "capital": "Baghdad", "code": "iq", "continent": "Asia", "flag_1x1": "flags/1x1/iq.svg", "flag": "../flags/4x3/iq.svg", "iso": true, "name": "Iraq", "nameJ": "イラク共和国", "nameH": "いらく共和国", "id": 100, "nameL": "iraq", "nameR": "iraku共和国", "nameR2": "iraku共和国" },
      
      { "capital": "Tehran", "code": "ir", "continent": "Asia", "flag_1x1": "flags/1x1/ir.svg", "flag": "../flags/4x3/ir.svg", "iso": true, "name": "Iran", "nameJ": "イラン・イスラム共和国", "nameH": "いらん・いすらむ共和国", "id": 101, "nameL": "iran", "nameR": "iran・isuramu共和国", "nameR2": "iran・isuramu共和国" },
      
      { "capital": "Reykjavik", "code": "is", "continent": "Europe", "flag_1x1": "flags/1x1/is.svg", "flag": "../flags/4x3/is.svg", "iso": true, "name": "Iceland", "nameJ": "アイスランド共和国", "nameH": "あいすらんど共和国", "id": 102, "nameL": "iceland", "nameR": "aisurando共和国", "nameR2": "aisurando共和国" },
      
      { "capital": "Rome", "code": "it", "continent": "Europe", "flag_1x1": "flags/1x1/it.svg", "flag": "../flags/4x3/it.svg", "iso": true, "name": "Italy", "nameJ": "イタリア共和国", "nameH": "いたりあ共和国", "id": 103, "nameL": "italy", "nameR": "itaria共和国", "nameR2": "itaria共和国" },
      
      { "capital": "Kingston", "code": "jm", "continent": "North America", "flag_1x1": "flags/1x1/jm.svg", "flag": "../flags/4x3/jm.svg", "iso": true, "name": "Jamaica", "nameJ": "ジャマイカ", "nameH": "じゃまいか", "id": 104, "nameL": "jamaica", "nameR": "zyamaika", "nameR2": "jamaika" },
      
      { "capital": "Amman", "code": "jo", "continent": "Asia", "flag_1x1": "flags/1x1/jo.svg", "flag": "../flags/4x3/jo.svg", "iso": true, "name": "Jordan", "nameJ": "ヨルダン・ハシミテ王国", "nameH": "よるだん・はしみて王国", "id": 105, "nameL": "jordan", "nameR": "yorudan・hasimite王国", "nameR2": "yorudan・hashimite王国" },
      
      { "capital": "Tokyo", "code": "jp", "continent": "Asia", "flag_1x1": "flags/1x1/jp.svg", "flag": "../flags/4x3/jp.svg", "iso": true, "name": "Japan", "nameJ": "日本国", "nameH": "日本国", "id": 106, "nameL": "japan", "nameR": "日本国", "nameR2": "日本国" },
      
      { "capital": "Nairobi", "code": "ke", "continent": "Africa", "flag_1x1": "flags/1x1/ke.svg", "flag": "../flags/4x3/ke.svg", "iso": true, "name": "Kenya", "nameJ": "ケニア共和国", "nameH": "けにあ共和国", "id": 107, "nameL": "kenya", "nameR": "kenia共和国", "nameR2": "kenia共和国" },
      
      { "capital": "Bishkek", "code": "kg", "continent": "Asia", "flag_1x1": "flags/1x1/kg.svg", "flag": "../flags/4x3/kg.svg", "iso": true, "name": "Kyrgyzstan", "nameJ": "キルギスタン共和国", "nameH": "きるぎすたん共和国", "id": 108, "nameL": "kyrgyzstan", "nameR": "kirugisutan共和国", "nameR2": "kirugisutan共和国" },
      
      { "capital": "Phnom Penh", "code": "kh", "continent": "Asia", "flag_1x1": "flags/1x1/kh.svg", "flag": "../flags/4x3/kh.svg", "iso": true, "name": "Cambodia", "nameJ": "カンボディア王国", "nameH": "かんぼでぃあ王国", "id": 109, "nameL": "cambodia", "nameR": "kanbodeia王国", "nameR2": "kanbodeia王国" },
      
      { "capital": "South Tarawa", "code": "ki", "continent": "Oceania", "flag_1x1": "flags/1x1/ki.svg", "flag": "../flags/4x3/ki.svg", "iso": true, "name": "Kiribati", "nameJ": "キリバス共和国", "nameH": "きりばす共和国", "id": 110, "nameL": "kiribati", "nameR": "kiribasu共和国", "nameR2": "kiribasu共和国" },
      
      { "capital": "Moroni", "code": "km", "continent": "Africa", "flag_1x1": "flags/1x1/km.svg", "flag": "../flags/4x3/km.svg", "iso": true, "name": "Comoros", "nameJ": "コモロ・イスラム連邦共和国", "nameH": "こもろ・いすらむ連邦共和国", "id": 111, "nameL": "comoros", "nameR": "komoro・isuramu連邦共和国", "nameR2": "komoro・isuramu連邦共和国" },
      
      { "capital": "Basseterre", "code": "kn", "continent": "North America", "flag_1x1": "flags/1x1/kn.svg", "flag": "../flags/4x3/kn.svg", "iso": true, "name": "Saint Kitts and Nevis", "nameJ": "セントクリストファー・ネイビス", "nameH": "せんとくりすとふぁー・ねいびす", "id": 112, "nameL": "saint kitts and nevis", "nameR": "sentokurisutofa-・neibisu", "nameR2": "sentokurisutofa-・neibisu" },
      
      { "capital": "Pyongyang", "code": "kp", "continent": "Asia", "flag_1x1": "flags/1x1/kp.svg", "flag": "../flags/4x3/kp.svg", "iso": true, "name": "North Korea", "nameJ": "(北朝鮮=朝鮮民主主義人民共和国)", "nameH": "(北朝鮮=朝鮮民主主義人民共和国)", "id": 113, "nameL": "north korea", "nameR": "(北朝鮮=朝鮮民主主義人民共和国)", "nameR2": "(北朝鮮=朝鮮民主主義人民共和国)" },
      
      { "capital": "Seoul", "code": "kr", "continent": "Asia", "flag_1x1": "flags/1x1/kr.svg", "flag": "../flags/4x3/kr.svg", "iso": true, "name": "South Korea", "nameJ": "大韓民国", "nameH": "大韓民国", "id": 114, "nameL": "south korea", "nameR": "大韓民国", "nameR2": "大韓民国" },
      
      { "capital": "Kuwait City", "code": "kw", "continent": "Asia", "flag_1x1": "flags/1x1/kw.svg", "flag": "../flags/4x3/kw.svg", "iso": true, "name": "Kuwait", "nameJ": "クウェート国", "nameH": "くうぇーと国", "id": 115, "nameL": "kuwait", "nameR": "ku-e-to国", "nameR2": "ku-e-to国" },
      
      { "capital": "George Town", "code": "ky", "continent": "North America", "flag_1x1": "flags/1x1/ky.svg", "flag": "../flags/4x3/ky.svg", "iso": true, "name": "Cayman Islands", "nameJ": "ケイマン諸島", "nameH": "けいまん諸島", "id": 116, "nameL": "cayman islands", "nameR": "keiman諸島", "nameR2": "keiman諸島" },
      
      { "capital": "Astana", "code": "kz", "continent": "Asia", "flag_1x1": "flags/1x1/kz.svg", "flag": "../flags/4x3/kz.svg", "iso": true, "name": "Kazakhstan", "nameJ": "カザフスタン共和国", "nameH": "かざふすたん共和国", "id": 117, "nameL": "kazakhstan", "nameR": "kazahusutan共和国", "nameR2": "kazafusutan共和国" },
      
      { "capital": "Vientiane", "code": "la", "continent": "Asia", "flag_1x1": "flags/1x1/la.svg", "flag": "../flags/4x3/la.svg", "iso": true, "name": "Laos", "nameJ": "ラオス人民民主共和国", "nameH": "らおす人民民主共和国", "id": 118, "nameL": "laos", "nameR": "raosu人民民主共和国", "nameR2": "raosu人民民主共和国" },
      
      { "capital": "Beirut", "code": "lb", "continent": "Asia", "flag_1x1": "flags/1x1/lb.svg", "flag": "../flags/4x3/lb.svg", "iso": true, "name": "Lebanon", "nameJ": "レバノン共和国", "nameH": "ればのん共和国", "id": 119, "nameL": "lebanon", "nameR": "rebanon共和国", "nameR2": "rebanon共和国" },
      
      { "capital": "Castries", "code": "lc", "continent": "North America", "flag_1x1": "flags/1x1/lc.svg", "flag": "../flags/4x3/lc.svg", "iso": true, "name": "Saint Lucia", "nameJ": "セントルシア", "nameH": "せんとるしあ", "id": 120, "nameL": "saint lucia", "nameR": "sentorusia", "nameR2": "sentorushia" },
      
      { "capital": "Vaduz", "code": "li", "continent": "Europe", "flag_1x1": "flags/1x1/li.svg", "flag": "../flags/4x3/li.svg", "iso": true, "name": "Liechtenstein", "nameJ": "リヒテンシュタイン公国", "nameH": "りひてんしゅたいん公国", "id": 121, "nameL": "liechtenstein", "nameR": "rihitensyutain公国", "nameR2": "rihitenshutain公国" },
      
      { "capital": "Sri Jayawardenepura Kotte, Colombo", "code": "lk", "continent": "Asia", "flag_1x1": "flags/1x1/lk.svg", "flag": "../flags/4x3/lk.svg", "iso": true, "name": "Sri Lanka", "nameJ": "スリランカ民主社会主義共和国", "nameH": "すりらんか民主社会主義共和国", "id": 122, "nameL": "sri lanka", "nameR": "suriranka民主社会主義共和国", "nameR2": "suriranka民主社会主義共和国" },
      
      { "capital": "Monrovia", "code": "lr", "continent": "Africa", "flag_1x1": "flags/1x1/lr.svg", "flag": "../flags/4x3/lr.svg", "iso": true, "name": "Liberia", "nameJ": "リベリア共和国", "nameH": "りべりあ共和国", "id": 123, "nameL": "liberia", "nameR": "riberia共和国", "nameR2": "riberia共和国" },
      
      { "capital": "Maseru", "code": "ls", "continent": "Africa", "flag_1x1": "flags/1x1/ls.svg", "flag": "../flags/4x3/ls.svg", "iso": true, "name": "Lesotho", "nameJ": "レソト王国", "nameH": "れそと王国", "id": 124, "nameL": "lesotho", "nameR": "resoto王国", "nameR2": "resoto王国" },
      
      { "capital": "Vilnius", "code": "lt", "continent": "Europe", "flag_1x1": "flags/1x1/lt.svg", "flag": "../flags/4x3/lt.svg", "iso": true, "name": "Lithuania", "nameJ": "リトアニア共和国", "nameH": "りとあにあ共和国", "id": 125, "nameL": "lithuania", "nameR": "ritoania共和国", "nameR2": "ritoania共和国" },
      
      { "capital": "Luxembourg City", "code": "lu", "continent": "Europe", "flag_1x1": "flags/1x1/lu.svg", "flag": "../flags/4x3/lu.svg", "iso": true, "name": "Luxembourg", "nameJ": "ルクセンブルク大公国", "nameH": "るくせんぶるく大公国", "id": 126, "nameL": "luxembourg", "nameR": "rukusenburuku大公国", "nameR2": "rukusenburuku大公国" },
      
      { "capital": "Riga", "code": "lv", "continent": "Europe", "flag_1x1": "flags/1x1/lv.svg", "flag": "../flags/4x3/lv.svg", "iso": true, "name": "Latvia", "nameJ": "ラトビア共和国", "nameH": "らとびあ共和国", "id": 127, "nameL": "latvia", "nameR": "ratobia共和国", "nameR2": "ratobia共和国" },
      
      { "capital": "Tripoli", "code": "ly", "continent": "Africa", "flag_1x1": "flags/1x1/ly.svg", "flag": "../flags/4x3/ly.svg", "iso": true, "name": "Libya", "nameJ": "社会主義人民リビア・アラブ国", "nameH": "社会主義人民りびあ・あらぶ国", "id": 128, "nameL": "libya", "nameR": "社会主義人民ribia・arabu国", "nameR2": "社会主義人民ribia・arabu国" },
      
      { "capital": "Rabat", "code": "ma", "continent": "Africa", "flag_1x1": "flags/1x1/ma.svg", "flag": "../flags/4x3/ma.svg", "iso": true, "name": "Morocco", "nameJ": "モロッコ王国", "nameH": "もろっこ王国", "id": 129, "nameL": "morocco", "nameR": "morokko王国", "nameR2": "morokko王国" },
      
      { "capital": "Monaco", "code": "mc", "continent": "Europe", "flag_1x1": "flags/1x1/mc.svg", "flag": "../flags/4x3/mc.svg", "iso": true, "name": "Monaco", "nameJ": "モナコ公国", "nameH": "もなこ公国", "id": 130, "nameL": "monaco", "nameR": "monako公国", "nameR2": "monako公国" },
      
      { "capital": "Chișinău", "code": "md", "continent": "Europe", "flag_1x1": "flags/1x1/md.svg", "flag": "../flags/4x3/md.svg", "iso": true, "name": "Moldova", "nameJ": "モルドバ共和国", "nameH": "もるどば共和国", "id": 131, "nameL": "moldova", "nameR": "morudoba共和国", "nameR2": "morudoba共和国" },
      
      { "capital": "Antananarivo", "code": "mg", "continent": "Africa", "flag_1x1": "flags/1x1/mg.svg", "flag": "../flags/4x3/mg.svg", "iso": true, "name": "Madagascar", "nameJ": "マダガスカル共和国", "nameH": "まだがすかる共和国", "id": 132, "nameL": "madagascar", "nameR": "madagasukaru共和国", "nameR2": "madagasukaru共和国" },
      
      { "capital": "Majuro", "code": "mh", "continent": "Oceania", "flag_1x1": "flags/1x1/mh.svg", "flag": "../flags/4x3/mh.svg", "iso": true, "name": "Marshall Islands", "nameJ": "マーシャル諸島共和国", "nameH": "まーしゃる諸島共和国", "id": 133, "nameL": "marshall islands", "nameR": "ma-syaru諸島共和国", "nameR2": "ma-sharu諸島共和国" },
      
      { "capital": "Bamako", "code": "ml", "continent": "Africa", "flag_1x1": "flags/1x1/ml.svg", "flag": "../flags/4x3/ml.svg", "iso": true, "name": "Mali", "nameJ": "マリ共和国", "nameH": "まり共和国", "id": 134, "nameL": "mali", "nameR": "mari共和国", "nameR2": "mari共和国" },
      
      { "capital": "Naypyidaw", "code": "mm", "continent": "Asia", "flag_1x1": "flags/1x1/mm.svg", "flag": "../flags/4x3/mm.svg", "iso": true, "name": "Myanmar", "nameJ": "ミャンマー連邦", "nameH": "みゃんまー連邦", "id": 135, "nameL": "myanmar", "nameR": "myanma-連邦", "nameR2": "myanma-連邦" },
      
      { "capital": "Ulaanbaatar", "code": "mn", "continent": "Asia", "flag_1x1": "flags/1x1/mn.svg", "flag": "../flags/4x3/mn.svg", "iso": true, "name": "Mongolia", "nameJ": "モンゴル国", "nameH": "もんごる国", "id": 136, "nameL": "mongolia", "nameR": "mongoru国", "nameR2": "mongoru国" },
      
      { "capital": "Macau", "code": "mo", "continent": "Asia", "flag_1x1": "flags/1x1/mo.svg", "flag": "../flags/4x3/mo.svg", "iso": true, "name": "Macau", "nameJ": "マカオ(澳門)", "nameH": "まかお(澳門)", "id": 137, "nameL": "macau", "nameR": "makao(澳門)", "nameR2": "makao(澳門)" },
      
      { "capital": "Saipan", "code": "mp", "continent": "Oceania", "flag_1x1": "flags/1x1/mp.svg", "flag": "../flags/4x3/mp.svg", "iso": true, "name": "Northern Mariana Islands", "nameJ": "北マリアナ諸島", "nameH": "北まりあな諸島", "id": 138, "nameL": "northern mariana islands", "nameR": "北mariana諸島", "nameR2": "北mariana諸島" },
      
      { "capital": "Fort-de-France", "code": "mq", "continent": "North America", "flag_1x1": "flags/1x1/mq.svg", "flag": "../flags/4x3/mq.svg", "iso": true, "name": "Martinique", "nameJ": "マルチニーク島", "nameH": "まるちにーく島", "id": 139, "nameL": "martinique", "nameR": "marutini-ku島", "nameR2": "maruchini-ku島" },
      
      { "capital": "Nouakchott", "code": "mr", "continent": "Africa", "flag_1x1": "flags/1x1/mr.svg", "flag": "../flags/4x3/mr.svg", "iso": true, "name": "Mauritania", "nameJ": "モーリタニア・イスラム共和国", "nameH": "もーりたにあ・いすらむ共和国", "id": 140, "nameL": "mauritania", "nameR": "mo-ritania・isuramu共和国", "nameR2": "mo-ritania・isuramu共和国" },
      
      { "capital": "Little Bay, Brades, Plymouth", "code": "ms", "continent": "North America", "flag_1x1": "flags/1x1/ms.svg", "flag": "../flags/4x3/ms.svg", "iso": true, "name": "Montserrat", "nameJ": "モントセラト", "nameH": "もんとせらと", "id": 141, "nameL": "montserrat", "nameR": "montoserato", "nameR2": "montoserato" },
      
      { "capital": "Valletta", "code": "mt", "continent": "Europe", "flag_1x1": "flags/1x1/mt.svg", "flag": "../flags/4x3/mt.svg", "iso": true, "name": "Malta", "nameJ": "マルタ共和国", "nameH": "まるた共和国", "id": 142, "nameL": "malta", "nameR": "maruta共和国", "nameR2": "maruta共和国" },
      
      { "capital": "Port Louis", "code": "mu", "continent": "Africa", "flag_1x1": "flags/1x1/mu.svg", "flag": "../flags/4x3/mu.svg", "iso": true, "name": "Mauritius", "nameJ": "モーリシャス共和国", "nameH": "もーりしゃす共和国", "id": 143, "nameL": "mauritius", "nameR": "mo-risyasu共和国", "nameR2": "mo-rishasu共和国" },
      
      { "capital": "Malé", "code": "mv", "continent": "Asia", "flag_1x1": "flags/1x1/mv.svg", "flag": "../flags/4x3/mv.svg", "iso": true, "name": "Maldives", "nameJ": "モルジブ共和国", "nameH": "もるじぶ共和国", "id": 144, "nameL": "maldives", "nameR": "moruzibu共和国", "nameR2": "morujibu共和国" },
      
      { "capital": "Lilongwe", "code": "mw", "continent": "Africa", "flag_1x1": "flags/1x1/mw.svg", "flag": "../flags/4x3/mw.svg", "iso": true, "name": "Malawi", "nameJ": "マラウイ共和国", "nameH": "まらうい共和国", "id": 145, "nameL": "malawi", "nameR": "maraui共和国", "nameR2": "maraui共和国" },
      
      { "capital": "Mexico City", "code": "mx", "continent": "North America", "flag_1x1": "flags/1x1/mx.svg", "flag": "../flags/4x3/mx.svg", "iso": true, "name": "Mexico", "nameJ": "メキシコ合衆国", "nameH": "めきしこ合衆国", "id": 146, "nameL": "mexico", "nameR": "mekisiko合衆国", "nameR2": "mekishiko合衆国" },
      
      { "capital": "Kuala Lumpur", "code": "my", "continent": "Asia", "flag_1x1": "flags/1x1/my.svg", "flag": "../flags/4x3/my.svg", "iso": true, "name": "Malaysia", "nameJ": "マレーシア", "nameH": "まれーしあ", "id": 147, "nameL": "malaysia", "nameR": "mare-sia", "nameR2": "mare-shia" },
      
      { "capital": "Maputo", "code": "mz", "continent": "Africa", "flag_1x1": "flags/1x1/mz.svg", "flag": "../flags/4x3/mz.svg", "iso": true, "name": "Mozambique", "nameJ": "モザンビーク共和国", "nameH": "もざんびーく共和国", "id": 148, "nameL": "mozambique", "nameR": "mozanbi-ku共和国", "nameR2": "mozanbi-ku共和国" },
      
      { "capital": "Windhoek", "code": "na", "continent": "Africa", "flag_1x1": "flags/1x1/na.svg", "flag": "../flags/4x3/na.svg", "iso": true, "name": "Namibia", "nameJ": "ナミビア共和国", "nameH": "なみびあ共和国", "id": 149, "nameL": "namibia", "nameR": "namibia共和国", "nameR2": "namibia共和国" },
      
      { "capital": "Nouméa", "code": "nc", "continent": "Oceania", "flag_1x1": "flags/1x1/nc.svg", "flag": "../flags/4x3/nc.svg", "iso": true, "name": "New Caledonia", "nameJ": "ニューカレドニア", "nameH": "にゅーかれどにあ", "id": 150, "nameL": "new caledonia", "nameR": "nyu-karedonia", "nameR2": "nyu-karedonia" },
      
      { "capital": "Niamey", "code": "ne", "continent": "Africa", "flag_1x1": "flags/1x1/ne.svg", "flag": "../flags/4x3/ne.svg", "iso": true, "name": "Niger", "nameJ": "ニジェール共和国", "nameH": "にじぇーる共和国", "id": 151, "nameL": "niger", "nameR": "nizye-ru共和国", "nameR2": "nizye-ru共和国" },
      
      { "capital": "Kingston", "code": "nf", "continent": "Oceania", "flag_1x1": "flags/1x1/nf.svg", "flag": "../flags/4x3/nf.svg", "iso": true, "name": "Norfolk Island", "nameJ": "ノーフォーク島", "nameH": "のーふぉーく島", "id": 152, "nameL": "norfolk island", "nameR": "no-fo-ku島", "nameR2": "no-fo-ku島" },
      
      { "capital": "Abuja", "code": "ng", "continent": "Africa", "flag_1x1": "flags/1x1/ng.svg", "flag": "../flags/4x3/ng.svg", "iso": true, "name": "Nigeria", "nameJ": "ナイジェリア連邦共和国", "nameH": "ないじぇりあ連邦共和国", "id": 153, "nameL": "nigeria", "nameR": "naizyeria連邦共和国", "nameR2": "naizyeria連邦共和国" },
      
      { "capital": "Managua", "code": "ni", "continent": "North America", "flag_1x1": "flags/1x1/ni.svg", "flag": "../flags/4x3/ni.svg", "iso": true, "name": "Nicaragua", "nameJ": "ニカラグア共和国", "nameH": "にからぐあ共和国", "id": 154, "nameL": "nicaragua", "nameR": "nikaragua共和国", "nameR2": "nikaragua共和国" },
      
      { "capital": "Amsterdam", "code": "nl", "continent": "Europe", "flag_1x1": "flags/1x1/nl.svg", "flag": "../flags/4x3/nl.svg", "iso": true, "name": "Netherlands", "nameJ": "オランダ王国", "nameH": "おらんだ王国", "id": 155, "nameL": "netherlands", "nameR": "oranda王国", "nameR2": "oranda王国" },
      
      { "capital": "Oslo", "code": "no", "continent": "Europe", "flag_1x1": "flags/1x1/no.svg", "flag": "../flags/4x3/no.svg", "iso": true, "name": "Norway", "nameJ": "ノルウェー王国", "nameH": "のるうぇー王国", "id": 156, "nameL": "norway", "nameR": "noru-e-王国", "nameR2": "noru-e-王国" },
      
      { "capital": "Kathmandu", "code": "np", "continent": "Asia", "flag_1x1": "flags/1x1/np.svg", "flag": "../flags/4x3/np.svg", "iso": true, "name": "Nepal", "nameJ": "ネパール王国", "nameH": "ねぱーる王国", "id": 157, "nameL": "nepal", "nameR": "nepa-ru王国", "nameR2": "nepa-ru王国" },
      
      { "capital": "Yaren District", "code": "nr", "continent": "Oceania", "flag_1x1": "flags/1x1/nr.svg", "flag": "../flags/4x3/nr.svg", "iso": true, "name": "Nauru", "nameJ": "ナウル共和国", "nameH": "なうる共和国", "id": 158, "nameL": "nauru", "nameR": "nauru共和国", "nameR2": "nauru共和国" },
      
      { "capital": "Alofi", "code": "nu", "continent": "Oceania", "flag_1x1": "flags/1x1/nu.svg", "flag": "../flags/4x3/nu.svg", "iso": true, "name": "Niue", "nameJ": "ニウエ", "nameH": "にうえ", "id": 159, "nameL": "niue", "nameR": "niue", "nameR2": "niue" },
      
      { "capital": "Wellington", "code": "nz", "continent": "Oceania", "flag_1x1": "flags/1x1/nz.svg", "flag": "../flags/4x3/nz.svg", "iso": true, "name": "New Zealand", "nameJ": "ニュージーランド", "nameH": "にゅーじーらんど", "id": 160, "nameL": "new zealand", "nameR": "nyu-zi-rando", "nameR2": "nyu-ji-rando" },
      
      { "capital": "Muscat", "code": "om", "continent": "Asia", "flag_1x1": "flags/1x1/om.svg", "flag": "../flags/4x3/om.svg", "iso": true, "name": "Oman", "nameJ": "オマーン国", "nameH": "おまーん国", "id": 161, "nameL": "oman", "nameR": "oma-n国", "nameR2": "oma-n国" },
      
      { "capital": "Panama City", "code": "pa", "continent": "North America", "flag_1x1": "flags/1x1/pa.svg", "flag": "../flags/4x3/pa.svg", "iso": true, "name": "Panama", "nameJ": "パナマ共和国", "nameH": "ぱなま共和国", "id": 162, "nameL": "panama", "nameR": "panama共和国", "nameR2": "panama共和国" },
      
      { "capital": "Lima", "code": "pe", "continent": "South America", "flag_1x1": "flags/1x1/pe.svg", "flag": "../flags/4x3/pe.svg", "iso": true, "name": "Peru", "nameJ": "ペルー共和国", "nameH": "ぺるー共和国", "id": 163, "nameL": "peru", "nameR": "peru-共和国", "nameR2": "peru-共和国" },
      
      { "capital": "Papeete", "code": "pf", "continent": "Oceania", "flag_1x1": "flags/1x1/pf.svg", "flag": "../flags/4x3/pf.svg", "iso": true, "name": "French Polynesia", "nameJ": "仏領ポリネシア", "nameH": "仏領ぽりねしあ", "id": 164, "nameL": "french polynesia", "nameR": "仏領porinesia", "nameR2": "仏領porineshia" },
      
      { "capital": "Port Moresby", "code": "pg", "continent": "Oceania", "flag_1x1": "flags/1x1/pg.svg", "flag": "../flags/4x3/pg.svg", "iso": true, "name": "Papua New Guinea", "nameJ": "パプアニューギニア", "nameH": "ぱぷあにゅーぎにあ", "id": 165, "nameL": "papua new guinea", "nameR": "papuanyu-ginia", "nameR2": "papuanyu-ginia" },
      
      { "capital": "Manila", "code": "ph", "continent": "Asia", "flag_1x1": "flags/1x1/ph.svg", "flag": "../flags/4x3/ph.svg", "iso": true, "name": "Philippines", "nameJ": "フィリピン共和国", "nameH": "ふぃりぴん共和国", "id": 166, "nameL": "philippines", "nameR": "firipin共和国", "nameR2": "firipin共和国" },
      
      { "capital": "Islamabad", "code": "pk", "continent": "Asia", "flag_1x1": "flags/1x1/pk.svg", "flag": "../flags/4x3/pk.svg", "iso": true, "name": "Pakistan", "nameJ": "パキスタン・イスラム共和国", "nameH": "ぱきすたん・いすらむ共和国", "id": 167, "nameL": "pakistan", "nameR": "pakisutan・isuramu共和国", "nameR2": "pakisutan・isuramu共和国" },
      
      { "capital": "Warsaw", "code": "pl", "continent": "Europe", "flag_1x1": "flags/1x1/pl.svg", "flag": "../flags/4x3/pl.svg", "iso": true, "name": "Poland", "nameJ": "ポーランド共和国", "nameH": "ぽーらんど共和国", "id": 168, "nameL": "poland", "nameR": "po-rando共和国", "nameR2": "po-rando共和国" },
      
      { "capital": "Saint-Pierre", "code": "pm", "continent": "North America", "flag_1x1": "flags/1x1/pm.svg", "flag": "../flags/4x3/pm.svg", "iso": true, "name": "Saint Pierre and Miquelon", "nameJ": "サンピエール島・ミクロン島", "nameH": "さんぴえーる島・みくろん島", "id": 169, "nameL": "saint pierre and miquelon", "nameR": "sanpie-ru島・mikuron島", "nameR2": "sanpie-ru島・mikuron島" },
      
      { "capital": "Adamstown", "code": "pn", "continent": "Oceania", "flag_1x1": "flags/1x1/pn.svg", "flag": "../flags/4x3/pn.svg", "iso": true, "name": "Pitcairn", "nameJ": "ピトケアン島", "nameH": "ぴとけあん島", "id": 170, "nameL": "pitcairn", "nameR": "pitokean島", "nameR2": "pitokean島" },
      
      { "capital": "San Juan", "code": "pr", "continent": "North America", "flag_1x1": "flags/1x1/pr.svg", "flag": "../flags/4x3/pr.svg", "iso": true, "name": "Puerto Rico", "nameJ": "プエルトリコ", "nameH": "ぷえるとりこ", "id": 171, "nameL": "puerto rico", "nameR": "puerutoriko", "nameR2": "puerutoriko" },
      
      { "capital": "Lisbon", "code": "pt", "continent": "Europe", "flag_1x1": "flags/1x1/pt.svg", "flag": "../flags/4x3/pt.svg", "iso": true, "name": "Portugal", "nameJ": "ポルトガル共和国", "nameH": "ぽるとがる共和国", "id": 172, "nameL": "portugal", "nameR": "porutogaru共和国", "nameR2": "porutogaru共和国" },
      
      { "capital": "Ngerulmud", "code": "pw", "continent": "Oceania", "flag_1x1": "flags/1x1/pw.svg", "flag": "../flags/4x3/pw.svg", "iso": true, "name": "Palau", "nameJ": "パラオ", "nameH": "ぱらお", "id": 173, "nameL": "palau", "nameR": "parao", "nameR2": "parao" },
      
      { "capital": "Asunción", "code": "py", "continent": "South America", "flag_1x1": "flags/1x1/py.svg", "flag": "../flags/4x3/py.svg", "iso": true, "name": "Paraguay", "nameJ": "パラグアイ共和国", "nameH": "ぱらぐあい共和国", "id": 174, "nameL": "paraguay", "nameR": "paraguai共和国", "nameR2": "paraguai共和国" },
      
      { "capital": "Doha", "code": "qa", "continent": "Asia", "flag_1x1": "flags/1x1/qa.svg", "flag": "../flags/4x3/qa.svg", "iso": true, "name": "Qatar", "nameJ": "カタール国", "nameH": "かたーる国", "id": 175, "nameL": "qatar", "nameR": "kata-ru国", "nameR2": "kata-ru国" },
      
      { "capital": "Saint-Denis", "code": "re", "continent": "Africa", "flag_1x1": "flags/1x1/re.svg", "flag": "../flags/4x3/re.svg", "iso": true, "name": "Réunion", "nameJ": "レユニオン", "nameH": "れゆにおん", "id": 176, "nameL": "réunion", "nameR": "reyunion", "nameR2": "reyunion" },
      
      { "capital": "Bucharest", "code": "ro", "continent": "Europe", "flag_1x1": "flags/1x1/ro.svg", "flag": "../flags/4x3/ro.svg", "iso": true, "name": "Romania", "nameJ": "ルーマニア", "nameH": "るーまにあ", "id": 177, "nameL": "romania", "nameR": "ru-mania", "nameR2": "ru-mania" },
      
      { "capital": "Moscow", "code": "ru", "continent": "Europe", "flag_1x1": "flags/1x1/ru.svg", "flag": "../flags/4x3/ru.svg", "iso": true, "name": "Russia", "nameJ": "ロシア連邦", "nameH": "ろしあ連邦", "id": 178, "nameL": "russia", "nameR": "rosia連邦", "nameR2": "roshia連邦" },
      
      { "capital": "Kigali", "code": "rw", "continent": "Africa", "flag_1x1": "flags/1x1/rw.svg", "flag": "../flags/4x3/rw.svg", "iso": true, "name": "Rwanda", "nameJ": "ルワンダ共和国", "nameH": "るわんだ共和国", "id": 179, "nameL": "rwanda", "nameR": "ruwanda共和国", "nameR2": "ruwanda共和国" },
      
      { "capital": "Riyadh", "code": "sa", "continent": "Asia", "flag_1x1": "flags/1x1/sa.svg", "flag": "../flags/4x3/sa.svg", "iso": true, "name": "Saudi Arabia", "nameJ": "サウジアラビア王国", "nameH": "さうじあらびあ王国", "id": 180, "nameL": "saudi arabia", "nameR": "sauziarabia王国", "nameR2": "saujiarabia王国" },
      
      { "capital": "Honiara", "code": "sb", "continent": "Oceania", "flag_1x1": "flags/1x1/sb.svg", "flag": "../flags/4x3/sb.svg", "iso": true, "name": "Solomon Islands", "nameJ": "ソロモン諸島", "nameH": "そろもん諸島", "id": 181, "nameL": "solomon islands", "nameR": "soromon諸島", "nameR2": "soromon諸島" },
      
      { "capital": "Victoria", "code": "sc", "continent": "Africa", "flag_1x1": "flags/1x1/sc.svg", "flag": "../flags/4x3/sc.svg", "iso": true, "name": "Seychelles", "nameJ": "セイシェル共和国", "nameH": "せいしぇる共和国", "id": 182, "nameL": "seychelles", "nameR": "seisyeru共和国", "nameR2": "seisyeru共和国" },
      
      { "capital": "Khartoum", "code": "sd", "continent": "Africa", "flag_1x1": "flags/1x1/sd.svg", "flag": "../flags/4x3/sd.svg", "iso": true, "name": "Sudan", "nameJ": "スーダン共和国", "nameH": "すーだん共和国", "id": 183, "nameL": "sudan", "nameR": "su-dan共和国", "nameR2": "su-dan共和国" },
      
      { "capital": "Stockholm", "code": "se", "continent": "Europe", "flag_1x1": "flags/1x1/se.svg", "flag": "../flags/4x3/se.svg", "iso": true, "name": "Sweden", "nameJ": "スウェーデン王国", "nameH": "すうぇーでん王国", "id": 184, "nameL": "sweden", "nameR": "su-e-den王国", "nameR2": "su-e-den王国" },
      
      { "capital": "Singapore", "code": "sg", "continent": "Asia", "flag_1x1": "flags/1x1/sg.svg", "flag": "../flags/4x3/sg.svg", "iso": true, "name": "Singapore", "nameJ": "シンガポール共和国", "nameH": "しんがぽーる共和国", "id": 185, "nameL": "singapore", "nameR": "singapo-ru共和国", "nameR2": "shingapo-ru共和国" },
      
      { "capital": "Jamestown", "code": "sh", "continent": "Africa", "flag_1x1": "flags/1x1/sh.svg", "flag": "../flags/4x3/sh.svg", "iso": true, "name": "Saint Helena, Ascension and Tristan da Cunha", "nameJ": "セントヘレナ島", "nameH": "せんとへれな島", "id": 186, "nameL": "saint helena, ascension and tristan da cunha", "nameR": "sentoherena島", "nameR2": "sentoherena島" },
      
      { "capital": "Ljubljana", "code": "si", "continent": "Europe", "flag_1x1": "flags/1x1/si.svg", "flag": "../flags/4x3/si.svg", "iso": true, "name": "Slovenia", "nameJ": "スロベニア共和国", "nameH": "すろべにあ共和国", "id": 187, "nameL": "slovenia", "nameR": "surobenia共和国", "nameR2": "surobenia共和国" },
      
      { "capital": "Longyearbyen", "code": "sj", "continent": "Europe", "flag_1x1": "flags/1x1/sj.svg", "flag": "../flags/4x3/sj.svg", "iso": true, "name": "Svalbard and Jan Mayen", "nameJ": "スバールバル諸島・ヤンマイエン島", "nameH": "すばーるばる諸島・やんまいえん島", "id": 188, "nameL": "svalbard and jan mayen", "nameR": "suba-rubaru諸島・yanmaien島", "nameR2": "suba-rubaru諸島・yanmaien島" },
      
      { "capital": "Bratislava", "code": "sk", "continent": "Europe", "flag_1x1": "flags/1x1/sk.svg", "flag": "../flags/4x3/sk.svg", "iso": true, "name": "Slovakia", "nameJ": "スロバキア共和国", "nameH": "すろばきあ共和国", "id": 189, "nameL": "slovakia", "nameR": "surobakia共和国", "nameR2": "surobakia共和国" },
      
      { "capital": "Freetown", "code": "sl", "continent": "Africa", "flag_1x1": "flags/1x1/sl.svg", "flag": "../flags/4x3/sl.svg", "iso": true, "name": "Sierra Leone", "nameJ": "シエラレオネ共和国", "nameH": "しえられおね共和国", "id": 190, "nameL": "sierra leone", "nameR": "sierareone共和国", "nameR2": "shierareone共和国" },
      
      { "capital": "San Marino", "code": "sm", "continent": "Europe", "flag_1x1": "flags/1x1/sm.svg", "flag": "../flags/4x3/sm.svg", "iso": true, "name": "San Marino", "nameJ": "サンマリノ共和国", "nameH": "さんまりの共和国", "id": 191, "nameL": "san marino", "nameR": "sanmarino共和国", "nameR2": "sanmarino共和国" },
      
      { "capital": "Dakar", "code": "sn", "continent": "Africa", "flag_1x1": "flags/1x1/sn.svg", "flag": "../flags/4x3/sn.svg", "iso": true, "name": "Senegal", "nameJ": "セネガル共和国", "nameH": "せねがる共和国", "id": 192, "nameL": "senegal", "nameR": "senegaru共和国", "nameR2": "senegaru共和国" },
      
      { "capital": "Mogadishu", "code": "so", "continent": "Africa", "flag_1x1": "flags/1x1/so.svg", "flag": "../flags/4x3/so.svg", "iso": true, "name": "Somalia", "nameJ": "ソマリア民主共和国", "nameH": "そまりあ民主共和国", "id": 193, "nameL": "somalia", "nameR": "somaria民主共和国", "nameR2": "somaria民主共和国" },
      
      { "capital": "Paramaribo", "code": "sr", "continent": "South America", "flag_1x1": "flags/1x1/sr.svg", "flag": "../flags/4x3/sr.svg", "iso": true, "name": "Suriname", "nameJ": "スリナム共和国", "nameH": "すりなむ共和国", "id": 194, "nameL": "suriname", "nameR": "surinamu共和国", "nameR2": "surinamu共和国" },
      
      { "capital": "São Tomé", "code": "st", "continent": "Africa", "flag_1x1": "flags/1x1/st.svg", "flag": "../flags/4x3/st.svg", "iso": true, "name": "Sao Tome and Principe", "nameJ": "サントメ・プリンシペ民主共和国", "nameH": "さんとめ・ぷりんしぺ民主共和国", "id": 195, "nameL": "sao tome and principe", "nameR": "santome・purinsipe民主共和国", "nameR2": "santome・purinshipe民主共和国" },
      
      { "capital": "San Salvador", "code": "sv", "continent": "North America", "flag_1x1": "flags/1x1/sv.svg", "flag": "../flags/4x3/sv.svg", "iso": true, "name": "El Salvador", "nameJ": "エルサルバドル共和国", "nameH": "えるさるばどる共和国", "id": 196, "nameL": "el salvador", "nameR": "erusarubadoru共和国", "nameR2": "erusarubadoru共和国" },
      
      { "capital": "Damascus", "code": "sy", "continent": "Asia", "flag_1x1": "flags/1x1/sy.svg", "flag": "../flags/4x3/sy.svg", "iso": true, "name": "Syria", "nameJ": "シリア・アラブ共和国", "nameH": "しりあ・あらぶ共和国", "id": 197, "nameL": "syria", "nameR": "siria・arabu共和国", "nameR2": "shiria・arabu共和国" },
      
      { "capital": "Lobamba, Mbabane", "code": "sz", "continent": "Africa", "flag_1x1": "flags/1x1/sz.svg", "flag": "../flags/4x3/sz.svg", "iso": true, "name": "Eswatini", "nameJ": "スワジランド王国", "nameH": "すわじらんど王国", "id": 198, "nameL": "eswatini", "nameR": "suwazirando王国", "nameR2": "suwajirando王国" },
      
      { "capital": "Cockburn Town", "code": "tc", "continent": "North America", "flag_1x1": "flags/1x1/tc.svg", "flag": "../flags/4x3/tc.svg", "iso": true, "name": "Turks and Caicos Islands", "nameJ": "タークス諸島・カイコス諸島", "nameH": "たーくす諸島・かいこす諸島", "id": 199, "nameL": "turks and caicos islands", "nameR": "ta-kusu諸島・kaikosu諸島", "nameR2": "ta-kusu諸島・kaikosu諸島" },
      
      { "capital": "N'Djamena", "code": "td", "continent": "Africa", "flag_1x1": "flags/1x1/td.svg", "flag": "../flags/4x3/td.svg", "iso": true, "name": "Chad", "nameJ": "チャド共和国", "nameH": "ちゃど共和国", "id": 200, "nameL": "chad", "nameR": "tyado共和国", "nameR2": "chado共和国" },
      
      { "capital": "Saint-Pierre, Réunion", "code": "tf", "continent": "Africa", "flag_1x1": "flags/1x1/tf.svg", "flag": "../flags/4x3/tf.svg", "iso": true, "name": "French Southern Territories", "nameJ": "仏領極南諸島", "nameH": "仏領極南諸島", "id": 201, "nameL": "french southern territories", "nameR": "仏領極南諸島", "nameR2": "仏領極南諸島" },
      
      { "capital": "Lomé", "code": "tg", "continent": "Africa", "flag_1x1": "flags/1x1/tg.svg", "flag": "../flags/4x3/tg.svg", "iso": true, "name": "Togo", "nameJ": "トーゴ共和国", "nameH": "とーご共和国", "id": 202, "nameL": "togo", "nameR": "to-go共和国", "nameR2": "to-go共和国" },
      
      { "capital": "Bangkok", "code": "th", "continent": "Asia", "flag_1x1": "flags/1x1/th.svg", "flag": "../flags/4x3/th.svg", "iso": true, "name": "Thailand", "nameJ": "タイ王国", "nameH": "たい王国", "id": 203, "nameL": "thailand", "nameR": "tai王国", "nameR2": "tai王国" },
      
      { "capital": "Dushanbe", "code": "tj", "continent": "Asia", "flag_1x1": "flags/1x1/tj.svg", "flag": "../flags/4x3/tj.svg", "iso": true, "name": "Tajikistan", "nameJ": "タジキスタン共和国", "nameH": "たじきすたん共和国", "id": 204, "nameL": "tajikistan", "nameR": "tazikisutan共和国", "nameR2": "tajikisutan共和国" },
      
      { "capital": "Nukunonu, Atafu,Tokelau", "code": "tk", "continent": "Oceania", "flag_1x1": "flags/1x1/tk.svg", "flag": "../flags/4x3/tk.svg", "iso": true, "name": "Tokelau", "nameJ": "トケラウ諸島", "nameH": "とけらう諸島", "id": 205, "nameL": "tokelau", "nameR": "tokerau諸島", "nameR2": "tokerau諸島" },
      
      { "capital": "Ashgabat", "code": "tm", "continent": "Asia", "flag_1x1": "flags/1x1/tm.svg", "flag": "../flags/4x3/tm.svg", "iso": true, "name": "Turkmenistan", "nameJ": "トルクメニスタン", "nameH": "とるくめにすたん", "id": 206, "nameL": "turkmenistan", "nameR": "torukumenisutan", "nameR2": "torukumenisutan" },
      
      { "capital": "Tunis", "code": "tn", "continent": "Africa", "flag_1x1": "flags/1x1/tn.svg", "flag": "../flags/4x3/tn.svg", "iso": true, "name": "Tunisia", "nameJ": "チュニジア共和国", "nameH": "ちゅにじあ共和国", "id": 207, "nameL": "tunisia", "nameR": "tyunizia共和国", "nameR2": "chunijia共和国" },
      
      { "capital": "Nukuʻalofa", "code": "to", "continent": "Oceania", "flag_1x1": "flags/1x1/to.svg", "flag": "../flags/4x3/to.svg", "iso": true, "name": "Tonga", "nameJ": "トンガ王国", "nameH": "とんが王国", "id": 208, "nameL": "tonga", "nameR": "tonga王国", "nameR2": "tonga王国" },
      
      { "capital": "Ankara", "code": "tr", "continent": "Asia", "flag_1x1": "flags/1x1/tr.svg", "flag": "../flags/4x3/tr.svg", "iso": true, "name": "Turkey", "nameJ": "トルコ共和国", "nameH": "とるこ共和国", "id": 209, "nameL": "turkey", "nameR": "toruko共和国", "nameR2": "toruko共和国" },
      
      { "capital": "Port of Spain", "code": "tt", "continent": "South America", "flag_1x1": "flags/1x1/tt.svg", "flag": "../flags/4x3/tt.svg", "iso": true, "name": "Trinidad and Tobago", "nameJ": "トリニダード・トバゴ共和国", "nameH": "とりにだーど・とばご共和国", "id": 210, "nameL": "trinidad and tobago", "nameR": "torinida-do・tobago共和国", "nameR2": "torinida-do・tobago共和国" },
      
      { "capital": "Funafuti", "code": "tv", "continent": "Oceania", "flag_1x1": "flags/1x1/tv.svg", "flag": "../flags/4x3/tv.svg", "iso": true, "name": "Tuvalu", "nameJ": "ツバル", "nameH": "つばる", "id": 211, "nameL": "tuvalu", "nameR": "tubaru", "nameR2": "tsubaru" },
      
      { "capital": "Taipei", "code": "tw", "continent": "Asia", "flag_1x1": "flags/1x1/tw.svg", "flag": "../flags/4x3/tw.svg", "iso": true, "name": "Taiwan", "nameJ": "台湾", "nameH": "台湾", "id": 212, "nameL": "taiwan", "nameR": "台湾", "nameR2": "台湾" },
      
      { "capital": "Dodoma", "code": "tz", "continent": "Africa", "flag_1x1": "flags/1x1/tz.svg", "flag": "../flags/4x3/tz.svg", "iso": true, "name": "Tanzania", "nameJ": "タンザニア連合共和国", "nameH": "たんざにあ連合共和国", "id": 213, "nameL": "tanzania", "nameR": "tanzania連合共和国", "nameR2": "tanzania連合共和国" },
      
      { "capital": "Kiev", "code": "ua", "continent": "Europe", "flag_1x1": "flags/1x1/ua.svg", "flag": "../flags/4x3/ua.svg", "iso": true, "name": "Ukraine", "nameJ": "ウクライナ", "nameH": "うくらいな", "id": 214, "nameL": "ukraine", "nameR": "ukuraina", "nameR2": "ukuraina" },
      
      { "capital": "Kampala", "code": "ug", "continent": "Africa", "flag_1x1": "flags/1x1/ug.svg", "flag": "../flags/4x3/ug.svg", "iso": true, "name": "Uganda", "nameJ": "ウガンダ共和国", "nameH": "うがんだ共和国", "id": 215, "nameL": "uganda", "nameR": "uganda共和国", "nameR2": "uganda共和国" },
      
      { "capital": "Washington, D.C.", "code": "um", "continent": "North America", "flag_1x1": "flags/1x1/um.svg", "flag": "../flags/4x3/um.svg", "iso": true, "name": "United States Minor Outlying Islands", "nameJ": "米領太平洋諸島", "nameH": "米領太平洋諸島", "id": 216, "nameL": "united states minor outlying islands", "nameR": "米領太平洋諸島", "nameR2": "米領太平洋諸島" },
      
      { "capital": "Washington, D.C.", "code": "us", "continent": "North America", "flag_1x1": "flags/1x1/us.svg", "flag": "../flags/4x3/us.svg", "iso": true, "name": "United States of America", "nameJ": "アメリカ合衆国(米国)", "nameH": "あめりか合衆国(米国)", "id": 217, "nameL": "united states of america", "nameR": "amerika合衆国(米国)", "nameR2": "amerika合衆国(米国)" },
      
      { "capital": "Montevideo", "code": "uy", "continent": "South America", "flag_1x1": "flags/1x1/uy.svg", "flag": "../flags/4x3/uy.svg", "iso": true, "name": "Uruguay", "nameJ": "ウルグアイ東方共和国", "nameH": "うるぐあい東方共和国", "id": 218, "nameL": "uruguay", "nameR": "uruguai東方共和国", "nameR2": "uruguai東方共和国" },
      
      { "capital": "Tashkent", "code": "uz", "continent": "Asia", "flag_1x1": "flags/1x1/uz.svg", "flag": "../flags/4x3/uz.svg", "iso": true, "name": "Uzbekistan", "nameJ": "ウズベキスタン共和国", "nameH": "うずべきすたん共和国", "id": 219, "nameL": "uzbekistan", "nameR": "uzubekisutan共和国", "nameR2": "uzubekisutan共和国" },
      
      { "capital": "Vatican City", "code": "va", "continent": "Europe", "flag_1x1": "flags/1x1/va.svg", "flag": "../flags/4x3/va.svg", "iso": true, "name": "Holy See", "nameJ": "バチカン市国", "nameH": "ばちかん市国", "id": 220, "nameL": "holy see", "nameR": "batikan市国", "nameR2": "bachikan市国" },
      
      { "capital": "Kingstown", "code": "vc", "continent": "North America", "flag_1x1": "flags/1x1/vc.svg", "flag": "../flags/4x3/vc.svg", "iso": true, "name": "Saint Vincent and the Grenadines", "nameJ": "セントビンセント及びグレナディーン諸島", "nameH": "せんとびんせんと及びぐれなでぃーん諸島", "id": 221, "nameL": "saint vincent and the grenadines", "nameR": "sentobinsento及bigurenadei-n諸島", "nameR2": "sentobinsento及bigurenadei-n諸島" },
      
      { "capital": "Caracas", "code": "ve", "continent": "South America", "flag_1x1": "flags/1x1/ve.svg", "flag": "../flags/4x3/ve.svg", "iso": true, "name": "Venezuela", "nameJ": "ベネズエラ共和国", "nameH": "べねずえら共和国", "id": 222, "nameL": "venezuela", "nameR": "benezuera共和国", "nameR2": "benezuera共和国" },
      
      { "capital": "Road Town", "code": "vg", "continent": "North America", "flag_1x1": "flags/1x1/vg.svg", "flag": "../flags/4x3/vg.svg", "iso": true, "name": "Virgin Islands (British)", "nameJ": "英領バージン諸島", "nameH": "英領ばーじん諸島", "id": 223, "nameL": "virgin islands (british)", "nameR": "英領ba-zin諸島", "nameR2": "英領ba-jin諸島" },
      
      { "capital": "Charlotte Amalie", "code": "vi", "continent": "North America", "flag_1x1": "flags/1x1/vi.svg", "flag": "../flags/4x3/vi.svg", "iso": true, "name": "Virgin Islands (U.S.)", "nameJ": "米領バージン諸島", "nameH": "米領ばーじん諸島", "id": 224, "nameL": "virgin islands (u.s.)", "nameR": "米領ba-zin諸島", "nameR2": "米領ba-jin諸島" },
      
      { "capital": "Hanoi", "code": "vn", "continent": "Asia", "flag_1x1": "flags/1x1/vn.svg", "flag": "../flags/4x3/vn.svg", "iso": true, "name": "Vietnam", "nameJ": "ベトナム社会主義共和国", "nameH": "べとなむ社会主義共和国", "id": 225, "nameL": "vietnam", "nameR": "betonamu社会主義共和国", "nameR2": "betonamu社会主義共和国" },
      
      { "capital": "Port Vila", "code": "vu", "continent": "Oceania", "flag_1x1": "flags/1x1/vu.svg", "flag": "../flags/4x3/vu.svg", "iso": true, "name": "Vanuatu", "nameJ": "バヌアツ共和国", "nameH": "ばぬあつ共和国", "id": 226, "nameL": "vanuatu", "nameR": "banuatu共和国", "nameR2": "banuatsu共和国" },
      
      { "capital": "Mata-Utu", "code": "wf", "continent": "Oceania", "flag_1x1": "flags/1x1/wf.svg", "flag": "../flags/4x3/wf.svg", "iso": true, "name": "Wallis and Futuna", "nameJ": "ワリス・フテュナ諸島", "nameH": "わりす・ふてゅな諸島", "id": 227, "nameL": "wallis and futuna", "nameR": "warisu・huthuna諸島", "nameR2": "warisu・futhuna諸島" },
      
      { "capital": "Apia", "code": "ws", "continent": "Oceania", "flag_1x1": "flags/1x1/ws.svg", "flag": "../flags/4x3/ws.svg", "iso": true, "name": "Samoa", "nameJ": "西サモア", "nameH": "西さもあ", "id": 228, "nameL": "samoa", "nameR": "西samoa", "nameR2": "西samoa" },
      
      { "capital": "Sana'a", "code": "ye", "continent": "Asia", "flag_1x1": "flags/1x1/ye.svg", "flag": "../flags/4x3/ye.svg", "iso": true, "name": "Yemen", "nameJ": "イエメン共和国", "nameH": "いえめん共和国", "id": 229, "nameL": "yemen", "nameR": "iemen共和国", "nameR2": "iemen共和国" },
      
      { "capital": "Mamoudzou", "code": "yt", "continent": "Africa", "flag_1x1": "flags/1x1/yt.svg", "flag": "../flags/4x3/yt.svg", "iso": true, "name": "Mayotte", "nameJ": "マイヨット島", "nameH": "まいよっと島", "id": 230, "nameL": "mayotte", "nameR": "maiyotto島", "nameR2": "maiyotto島" },
      
      { "capital": "Pretoria", "code": "za", "continent": "Africa", "flag_1x1": "flags/1x1/za.svg", "flag": "../flags/4x3/za.svg", "iso": true, "name": "South Africa", "nameJ": "南アフリカ共和国", "nameH": "南あふりか共和国", "id": 231, "nameL": "south africa", "nameR": "南ahurika共和国", "nameR2": "南afurika共和国" },
      
      { "capital": "Lusaka", "code": "zm", "continent": "Africa", "flag_1x1": "flags/1x1/zm.svg", "flag": "../flags/4x3/zm.svg", "iso": true, "name": "Zambia", "nameJ": "ザンビア共和国", "nameH": "ざんびあ共和国", "id": 232, "nameL": "zambia", "nameR": "zanbia共和国", "nameR2": "zanbia共和国" },
      
      { "capital": "Harare", "code": "zw", "continent": "Africa", "flag_1x1": "flags/1x1/zw.svg", "flag": "../flags/4x3/zw.svg", "iso": true, "name": "Zimbabwe", "nameJ": "ジンバブエ共和国", "nameH": "じんばぶえ共和国", "id": 233, "nameL": "zimbabwe", "nameR": "zinbabue共和国", "nameR2": "jinbabue共和国" },
      ],
    setArr:[],  //英語、モード、地域、難易度、追加で正解数
    uid:'', //各ページでauth確認を取ることになったので使用しない-->やっぱり使用します
    test:5, //テスト用
  },
  mutations:{
    setChange(state,arr){
      state.setArr = arr.concat()
    },
    setPush(state,n){
      state.setArr.push(n)
    },
    // 各ページでauth確認を取ることになったので使用しない-->やっぱり使用します
    authTrue(state,uid){
      state.uid = uid
    },
    authFalse(state){
      state.uid = ''
    },
  },
  getters:{},
  actions:{},
})
export default store 
