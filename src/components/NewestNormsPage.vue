<template>
    <div id="main-container">
        <h1 id="title">Wyniki</h1>
    
        <div class="row appearIn">
            <p class="result-name">Cholesterol resztkowy:</p>
            <p class="result">{{ cholesterol }} mg/dl</p>
            <p class="interpretation">{{ cholesterolInterpretation }}</p>
        </div>
        <div id="line"></div>
        <div class="row appearIn">
            <p class="result-name">Trójglicerydy/HDL:</p>
            <p class="result">{{ triglyceridesHdl }} mg/dl</p>
            <p class="interpretation">{{ triglyceridesHdlInterpretation }}</p>
        </div>
    </div>

    <div id="all-norms">
        <h1 id="title">Normy</h1>
    
        <div class="row appearIn">
            <p class="result-name">Cholesterol resztkowy: <br> ( mg/dl )</p>
            <p class="result">> 25 => niedobrze <br> 18-25 => dobrze <br> < 18 => bardzo dobrze </p>
        </div>
        <div id="line"></div>
        <div class="row appearIn">
            <p class="result-name">Trójglicerydy / HDL: <br> ( mg/dl )</p>
            <p class="result">> 2 => niedobrze <br> 1-2 => dobrze <br> < 1 => bardzo dobrze </p>
        </div>
    </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';

export default {
    data() {
        return {
            cholesterol: 0,
            triglyceridesHdl: 0
        };
    },
    computed: {
        formData() {
            return this.$store.getters.getFormData;
        },
        cholesterolInterpretation(): string {
            if (this.cholesterol > 25) {
                return 'Niedobrze';
            } else if (this.cholesterol >= 18 && this.cholesterol <= 25) {
                return 'Dobrze';
            } else {
                return 'Bardzo dobrze';
            }
        },
        triglyceridesHdlInterpretation(): string {
            if (this.triglyceridesHdl > 2) {
                return 'Niedobrze';
            } else if (this.triglyceridesHdl >= 1 && this.triglyceridesHdl <= 2) {
                return 'Dobrze';
            } else {
                return 'Bardzo dobrze';
            }
        }
    },
    mounted() {
        this.calculateResults();
    },
    watch: {
        'formData.cholesterol': 'calculateResults',
        'formData.ldl': 'calculateResults',
        'formData.hdl': 'calculateResults',
        'formData.triglycerides': 'calculateResults'
    },
    methods: {
        calculateResults() {
            this.cholesterol = parseFloat((this.formData.cholesterol - this.formData.ldl - this.formData.hdl).toFixed(3));
            this.triglyceridesHdl = parseFloat((this.formData.triglycerides / this.formData.hdl).toFixed(3));
        },
    }
};
</script>


    
<style scoped>
/*-----animations-----*/

@keyframes appearIn {
    from{
        opacity: 0;
    }
    to {
        opacity: 1;
    }
} 
.appearIn {
    animation: appearIn 2s ease-in-out forwards;
}

/*-----styles-----*/

    #main-container {
        background-color: transparent;
        width: 80%;
        margin: 0 auto;
        margin-top: 50px;
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
        justify-content: center;
        text-align: center;
        margin-top: 10px;
        margin-top: 20px;
    
        p {
            width: 200px;
        }
    }
    
    .result-name {
        font-weight: bold;
        font-size: 20px;
        flex-grow: 1;
    }
    
    .result {
        font-size: 20px;
        flex-grow: 1;
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
        margin-top: 20px;
        margin-bottom: 50px;
        background-color: rgb(34, 34, 34);
        padding: 30px;
        border-radius: 20px;
        position: relative;
    }
    
    #button-container {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    
    #checkResults {
        width: 50%;
        max-width: 400px;
        padding: 15px;
        border-radius: 20px;
        margin-top: 20px;
    }

    #line {
        width: 100%;
        background-color: #ccc;
        height: 1px;
        border-radius: 20px;
    }

    @media only screen and (max-width: 600px) {
        #main-container, #all-norms {
            width: 90%;
            flex-direction: column;
        }
        .row {
            flex-direction: column;
            text-align: center;
        }
    }
    </style>
    