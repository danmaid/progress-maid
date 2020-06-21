import DmSnapshot from './components/DmSnapshot.vue';
import { VueConstructor } from 'vue';
export default DmSnapshot;
declare type install = {
    (Vue: VueConstructor): void;
    installed?: boolean;
};
export declare const install: install;
