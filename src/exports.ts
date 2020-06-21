import DmSnapshot from './components/DmSnapshot.vue'
import { Hierarchy } from 'treemap'
import { VueConstructor } from 'vue'

// (npm/webpack 等で) モジュールとして利用させるためコンポーネントを export する
export default DmSnapshot
export interface Snapshot extends Hierarchy<Snapshot> {
    completed?: boolean;
}

// Vue.use() によって実行される install 関数を定義
type install = {
    (Vue: VueConstructor): void;
    installed?: boolean;
}
export const install: install = function (Vue: VueConstructor) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('DmSnapshot', DmSnapshot);
}

// Vue.use() のためのモジュール定義を作成
// Create module definition for Vue.use()
const plugin = {
    install,
};

// vue が見つかった場合に自動インストールする (ブラウザで <script> タグを用いた場合等)
declare var global: {
    Vue?: VueConstructor
}
let GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}
