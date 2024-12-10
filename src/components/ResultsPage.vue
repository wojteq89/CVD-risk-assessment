<template>
<div id="main-container">
    <h1 id="title">Wyniki</h1>

    <div class="row appearIn">
        <p class="result-name">Płeć:</p>
        <p class="result">{{ formData.pickedGender }}</p>
        <div class="bar" style="background: transparent;"></div>
    </div>

    <div class="row appearIn">
        <p class="result-name">Cholesterol całkowity:</p>
        <p v-if="formData.selected == 'mmol/l' " class="result">{{ parseFloat((formData.cholesterol / 38.64).toFixed(3)) }} {{ formData.selected }}</p>
        <p v-else class="result">{{ parseFloat((formData.cholesterol).toFixed(3)) }} {{ formData.selected }}</p>
    </div>
    <div class="bar appearIn appearIn">
        <div class="ball slideIn" :style="{ marginLeft: calculatePercentage('cholesterol') + '%' }"></div>
    </div>

    <div class="row appearIn">
        <p class="result-name">LDL:</p>
        <p v-if="formData.selected == 'mmol/l'" class="result">{{ parseFloat((formData.ldl / 38.64).toFixed(3))  }} {{ formData.selected }}</p>
        <p v-else class="result">{{ parseFloat((formData.ldl).toFixed(3)) }} {{ formData.selected }}</p>
    </div>
    <div class="bar appearIn">
        <div class="ball slideIn" :style="{ marginLeft: calculatePercentage('ldl') + '%' }"></div>
    </div>

    <div class="row appearIn">
        <p class="result-name">HDL:</p>
        <p v-if="formData.selected == 'mmol/l'" class="result">{{ parseFloat((formData.hdl / 38.64).toFixed(3))  }} {{ formData.selected }}</p>
        <p v-else class="result">{{ parseFloat((formData.hdl).toFixed(3)) }} {{ formData.selected }}</p>
    </div>
    <div class="bar appearIn" style="    background: linear-gradient(90deg, orange, red, #40a832, #40a832, #40a832);">
        <div class="ball slideIn" :style="{ marginLeft: calculatePercentage('hdl') + '%' }"></div>
    </div>
    
    <div class="row appearIn">
        <p class="result-name">Trójglicerydy:</p>
        <p v-if="formData.selected == 'mmol/l'" class="result">{{ parseFloat((formData.triglycerides / 88.62).toFixed(3))  }} {{ formData.selected }}</p>
        <p v-else class="result">{{ parseFloat((formData.triglycerides).toFixed(3)) }} {{ formData.selected }}</p>
    </div>
    <div class="bar appearIn">
        <div class="ball slideIn" :style="{ marginLeft: calculatePercentage('triglycerides') + '%' }"></div>
    </div>

    <select v-model="selected" @change="updateUnit" id="unit">
        <option disabled value="">Wybierz jednostkę</option>
        <option value="mg/dl">mg/dl</option>
        <option value="mmol/l">mmol/l</option>
    </select>
</div>

<div id="all-norms" class="appearIn">
    <h1 id="title">Normy</h1>

    <div class="second-row">
        <p class="result-name">Cholesterol całkowity:</p>
        <p v-if="formData.selected == 'mmol/l'" class="result"> < 4,9 mmol/l </p> 
        <p v-else class="result">< 190 mg/dl </p> </div> <div class="row">
    </div>

    <div id="line"></div>

    <div class="second-row">
        <p class="result-name">LDL:</p>
        <p v-if="formData.selected == 'mmol/l'" class="result"> < 3 mmol/l </p> 
        <p v-else class="result">< 115 mg/dl </p> </div> <div class="row">
    </div>

    <div id="line"></div>

    <div class="second-row">
        <p class="result-name">HDL:</p>
        <p v-if="formData.selected == 'mmol/l'" class="result">> 1,1 mmol/l dla kobiet<br>> 1 mmol/l dla mężczyzn</p>
        <p v-else class="result">> 45 mg/dl dla kobiet<br>> 40 mg/dl dla mężczyzn</p>
    </div>

    <div id="line"></div>

    <div class="second-row">
        <p class="result-name">Trójglicerydy:</p>
        <p v-if="formData.selected == 'mmol/l'" class="result"> < 1,7 mmol/l </p> 
        <p v-else class="result">< 150 mg/dl </p> 
    </div> 

    <div id="line"></div>

    <div id="button-container">
        <button id="check-results" @click="nextPage">Sprawdź nowe normy</button>
    </div>
</div>
</template>

<script lang="ts">
import {
    useStore
} from 'vuex';

export default {
    data() {
        return {
            selected: null,
        };
    },
    computed: {
        formData() {
            return this.$store.getters.getFormData;
        },
    },

    methods: {
        calculatePercentage(type: string): number {
            const data = this.formData;
            let value = 0;
            let normMax = 0;

            switch (type) {
                case 'cholesterol':
                    normMax = 190;
                    value = data.cholesterol;
                    break;
                case 'ldl':
                    normMax = 115;
                    value = data.ldl;
                    break;
                case 'hdl':
                    if (data.pickedGender === 'kobieta') {
                        normMax = 45;
                    } else if (data.pickedGender === 'mężczyzna') {
                        normMax = 40;
                    }
                    value = data.hdl;
                    break;
                case 'triglycerides':
                    normMax = 150;
                    value = data.triglycerides;
                    break;
            }

            let percentage = (value / normMax) * 100;

            if (value === normMax) {
                return 50;
            }

            if (value < normMax) {
                percentage = (value / normMax) * 50;
                if (percentage < 0) {
                    return 0;
                }
            }

            if (value > normMax) {
                percentage = 50 + ((value - normMax) / normMax) * 50;
                if (percentage > 91.5) {
                    percentage = 91.5;
                }
            }

            return percentage;
        },

        updateUnit() {
            const data = {
                selected: this.selected
            };
            this.$store.dispatch("changeUnit", data);
        },

        nextPage() {
            this.$router.push('/tabs/tab3');
        },

        setUnit() {
            this.selected = this.formData.selected;
        },
    },
    mounted() {
        this.selected = this.formData.selected;
    },
    watch: {
        'formData.selected': 'setUnit',
    },
};
</script>

<style scoped>
/*-----animations-----*/
@keyframes slideIn {
    from{
        margin-left: 0;
    }
}

@keyframes appearIn {
    from{
        opacity: 0;
    }
    to {
        opacity: 1;
    }
} 

.slideIn {
    animation: slideIn 3s ease-in-out forwards;
}

.appearIn {
    animation: appearIn 2s ease-in-out forwards;
}

/*-----styles-----*/

#main-container{
    background-color: transparent;
    width: 80%;
    height: 100%;
    margin: 0 auto;
    margin-top: 30px;
    background-color: rgb(34, 34, 34);
    padding: 30px;
    border-radius: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
}

#title {
    text-align: center;
    font-size: 30px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
}

.row {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    margin-top: 10px;

    p {
        width: 200px;
    }
}

.second-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    align-items: center;
    margin-top: 10px;
    flex-wrap: wrap;
    width: 80%;
}

.result-name {
    font-weight: bold;
    font-size: 20px;
}

.result {
    font-size: 20px;
}

.bar {
    flex-grow: 1;
    background: linear-gradient(90deg, #40a832, #40a832, #40a832, orange, red);
    width: 100%;
    height: 20px;
    border-radius: 20px;
    display: flex;
    align-items: center;
}

.ball {
    width: 5px;
    height: 35px;
    border-radius: 20px;
    border: 5px solid white;
}

#all-norms {
    background-color: transparent;
    width: 80%;
    height: auto;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
    background-color: rgb(34, 34, 34);
    padding: 30px;
    border-radius: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#unit {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 100px;
    height: 40px;
    border-radius: 20px;
    text-align: center;
}

#button-container {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

#check-results {
    width: 50%;
    max-width: 400px;
    padding: 15px;
    border-radius: 20px;
    margin: 0 auto;
    margin-top: 20px;
    box-shadow: 0 0 5px transparent;
    transition: all 0.3s ease-in-out;
}

#check-results:hover {
    box-shadow: 0 0 5px rgba(255, 165, 0, 0.7);
    background-color: orange;
    color: black;
}

#line {
    width: 80%;
    background-color: #ccc;
    height: 1px;
    border-radius: 20px;
}

@media only screen and (max-width: 600px) {
  #main-container, #all-norms {
    width: 90%;
  }
  .row {
    gap: 0px;
  }
  .second-row {
    flex-direction: column;
    gap: 0px;
  }
}
</style>
