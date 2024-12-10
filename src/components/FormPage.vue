<template>
<div id="main">
    <div id="user-data-container">
        <div id="input-container">
            <label class="input-labels">Cholesterol całkowity</label>
            <input class="inputs appearIn" v-model="cholesterol" type="number" required></input>

            <label class="input-labels">LDL</label>
            <input class="inputs appearIn" v-model="ldl" type="number" required></input>

            <label class="input-labels">HDL</label>
            <input class="inputs appearIn" v-model="hdl" type="number" required></input>

            <label class="input-labels">Trójglicerydy</label>
            <input class="inputs appearIn" v-model="triglycerides" type="number" required></input>
        </div>
        <select v-model="selected" id="unit" required>
            <option disabled value="">Wybierz jednostkę</option>
            <option value="mg/dl">mg/dl</option>
            <option value="mmol/l">mmol/l</option>
        </select>
        
        <label id="gender-label" for="radio-buttons-container">Wybierz płeć:</label>
        <div id="radio-buttons-container">
            <input class="radio-buttons" type="radio" name="gender" value="mężczyzna" v-model="pickedGender">
            Mężczyzna
            </input>
            <input class="radio-buttons" type="radio" name="gender" value="kobieta" v-model="pickedGender">
            Kobieta
            </input>
        </div>
        <button id="checkResults" @click="submitData">Sprawdź wyniki</button>
        <p id="checkFields" v-if="checkAllFields == 'Wypełnij wszystkie pola' ">Wypełnij wszystkie pola!</p>
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
            pickedGender: null,
            selected: 'mg/dl',
            cholesterol: null,
            ldl: null,
            hdl: null,
            triglycerides: null,
            checkAllFields: null
        };
    },
    methods: {
        submitData() {

            if (!this.pickedGender || !this.cholesterol || !this.ldl || !this.hdl || !this.triglycerides || !this.selected) {
                this.checkAllFields = "Wypełnij wszystkie pola";
                return;
            }

            this.checkAllFields = null;
            let cholesterol = this.cholesterol; 
            let ldl = this.ldl;
            let hdl = this.hdl;
            let triglycerides = this.triglycerides;

            if (this.selected === "mmol/l") {
                cholesterol = this.cholesterol * 38.64;
                ldl = this.ldl * 38.64;
                hdl = this.hdl * 38.64;
                triglycerides = this.triglycerides * 88.62;
            }

            const data = {
                pickedGender: this.pickedGender,
                cholesterol: cholesterol,
                ldl: ldl,
                hdl: hdl,
                triglycerides: triglycerides,
                selected: this.selected
            };

            this.$store.dispatch('updateFormData', data);
            this.$router.push('/tabs/tab2');
        }
    }
};
</script>

<style scoped>
/*-----animations-----*/

@keyframes appearIn {
    25%{
        border: 1px solid orange;
        box-shadow: 0 0 5px rgba(255, 165, 0, 0.7);
    }
    50% {
        border: 1px solid gray;
        box-shadow: 0 0 5px transparent;
    }
    75%{
        border: 1px solid orange;
        box-shadow: 0 0 5px rgba(255, 165, 0, 0.7);
    }
    100% {
        border: 1px solid gray;
        box-shadow: 0 0 5px transparent;
    }
} 

@keyframes blink {
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

#main {
    background-color: transparent;
    width: 80%;
    margin: 0 auto;
    margin-top: 50px;
    background-color: rgb(34, 34, 34);
    padding: 30px;
    border-radius: 20px;
    position: relative;
}

#user-data-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

#gender-label {
    margin: 0 auto;
}

#radio-buttons-container {
    display: flex;
    justify-content: center;
    gap: 20px;
}

#input-container {
    display: flex;
    flex-direction: column;
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

#checkResults {
    width: 50%;
    max-width: 400px;
    padding: 15px;
    border-radius: 20px;
    margin: 0 auto;
    margin-top: 20px;
    box-shadow: 0 0 5px transparent;
    transition: all 0.3s ease-in-out;
}

#checkResults:hover {
    box-shadow: 0 0 5px rgba(255, 165, 0, 0.7);
    background-color: orange;
    color: black;
}

#checkFields {
    margin: 0 auto;
    color: red;
}

.input-labels {
    margin-top: 20px;
    margin-left: 20px;
    text-align: left;
    font-size: 20px;
    color: white;
}

.inputs {
    margin-top: 5px;
    height: 50px;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 20px;
    outline: none;
    transition: all 0.3s ease-in-out;
}

.inputs:hover {
    border: 1px solid orange;
    box-shadow: 0 0 5px rgba(255, 165, 0, 0.7);
}

.inputs:focus {
    border: 1px solid orange;
    box-shadow: 0 0 5px rgba(255, 165, 0, 0.7);

}

.inputs:hover .input-labels {
    color: orange;
}

.inputs::-webkit-outer-spin-button,
.inputs::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.radio-buttons {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 2px solid #ccc;
    appearance: none;
    background-color: #ccc;
    cursor: pointer;
    transition: all 0.3s ease;
}

.radio-buttons:hover {
    border: 2px solid orange;
    box-shadow: 0 0 5px rgba(255, 165, 0, 0.7);
}

.radio-buttons:focus {
    border: 2px solid orange;
    outline: none;
    box-shadow: 0 0 5px rgba(255, 165, 0, 0.7);
}

.radio-buttons:checked {
    background-color: orange;
    border-color: orange;
    box-shadow: 0 0 5px rgba(255, 165, 0, 0.7);
}


@media only screen and (max-width: 600px) {
  #main {
    width: 90%;
  }
}
</style>
