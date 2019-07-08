import style from "./sass/index.scss";
import fonts from "./sass/fonts.scss";

import CompApi from './js/comp-api';


const comp = new CompApi(document.getElementById('parent'));
comp.renderForm();


comp.getResults(39).then(res => console.log(res));