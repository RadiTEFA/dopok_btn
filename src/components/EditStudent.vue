<template>
    <title-page>EDIT DOKUMEN</title-page>
    <form @submit.prevent="submitStudent" class="border w-1/2 mx-auto p-3 rounded shadow">
        <div class="mb-3">
            <label class="block my-1">NAMA</label>
            <input type="text" disabled :class="[isName ? 'border-red-600' : 'border-gray-200']" class="border px-2 py-1 rounded shadow w-full" v-model="name">
            <warning-message v-if="isName">{{ NameMessage }}</warning-message>
        </div>
        <div class="mb-3">
            <label class="block my-1">DEBITUR</label>
            <input type="text" :class="[isDebitur ? 'border-red-600' : 'border-gray-200']" class="border px-2 py-1 rounded shadow w-full" v-model="debitur" @input="debitur = debitur.toUpperCase()">
            <warning-message v-if="isDebitur">{{ DebiturMessage }}</warning-message>
        </div>
        <div class="mb-3">
            <label class="block my-1">SERTIPIKAT</label>
            <input type="text" :class="[isSertipikat ? 'border-red-600' : 'border-gray-200']" class="border px-2 py-1 rounded shadow w-full" v-model="sertipikat" @input="sertipikat = sertipikat.toUpperCase()">
            <warning-message v-if="isSertipikat">{{ SertipikatMessage }}</warning-message>
        </div>
        <div class="mb-3">
            <label class="block my-1">IMB</label>
            <input type="text" :class="[isIMB ? 'border-red-600' : 'border-gray-200']" class="border px-2 py-1 rounded shadow w-full" v-model="imb" @input="imb = imb.toUpperCase()">
            <warning-message v-if="isIMB">{{ IMBMessage }}</warning-message>
        </div>
        <div class="mb-3">
            <label class="block my-1">PENERIMA</label>
            <select :class="[isPenerima ? 'border-red-600' : 'border-gray-200']" class="border px-2 py-2 rounded shadow w-full" v-model="penerima_id">
                <option v-for="penerima in penerimaOptions" :key="penerima.id" :value="penerima.id">{{ penerima.name }}</option>
            </select>
            <warning-message v-if="isPenerima">{{ PenerimaMessage }}</warning-message>
        </div>
        <blue-button>Simpan</blue-button>
    </form>

    <teleport to="body">
        <confirm-dialog v-if="isConfirmDialog">
            <template v-slot:title>Informasi</template>
            <template v-slot:message>{{ message }}</template>
            <template v-slot:buttons>
                <blue-button @click="closeConfirmDialog">Tutup</blue-button>
            </template>
        </confirm-dialog>
    </teleport>
</template>

<script>
export default {
    inject: ['student', 'updateStudent', 'penerimaOptions'],
    data() {
        return {
            id: this.student.id,
            name: this.student.name,
            debitur: this.student.debitur,
            sertipikat: this.student.sertipikat,
            imb: this.student.imb,
            penerima_id: this.student.penerima_id,
            isName: false,
            isDebitur: false,
            isSertipikat: false,
            isIMB: false,
            isPenerima: false,
            isConfirmDialog: false,
            NameMessage: '',
            DebiturMessage: '',
            SertipikatMessage: '',
            IMBMessage: '',
            PenerimaMessage: '',
            message: ''
        };
    },
    methods: {
        submitStudent() {
            // Validasi format
            if (!this.name.trim() || !this.name.match(/^[A-Z\s]+$/)) {
                this.isName = true;
                this.NameMessage = "Nama harus diisi dan hanya berisi huruf kapital";
            } else {
                this.isName = false;
            }
            if (!this.debitur.trim() || this.debitur.match(/[a-z]/)) {
                this.isDebitur = true;
                this.DebiturMessage = "Debitur harus diisi dan hanya berisi huruf kapital, angka, atau tanda baca";
            } else {
                this.isDebitur = false;
            }
            if (!this.sertipikat.trim() || this.sertipikat.match(/[a-z]/)) {
                this.isSertipikat = true;
                this.SertipikatMessage = "Sertipikat harus diisi dan hanya berisi huruf kapital, angka, atau tanda baca";
            } else {
                this.isSertipikat = false;
            }
            if (!this.imb.trim() || this.imb.match(/[a-z]/)) {
                this.isIMB = true;
                this.IMBMessage = "IMB harus diisi dan hanya berisi huruf kapital, angka, atau tanda baca";
            } else {
                this.isIMB = false;
            }
            if (!this.penerima_id) {
                this.isPenerima = true;
                this.PenerimaMessage = "Penerima harus dipilih";
            } else {
                this.isPenerima = false;
            }

            if (!this.isName && !this.isDebitur && !this.isSertipikat && !this.isIMB && !this.isPenerima) {
                this.updateStudent(this.name, this.debitur, this.sertipikat, this.imb, this.penerima_id);
                this.isConfirmDialog = true;
                this.message = 'Data Dokumen berhasil diubah.';
            }
        },
        closeConfirmDialog() {
            this.isConfirmDialog = false;
        }
    }
};
</script>

<style>
body {
  overflow-x: hidden;
}
</style>