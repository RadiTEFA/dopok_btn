<template>
    <title-page>INPUT DOKUMEN</title-page>
    <form @submit.prevent="submitStudent" class="border border-gray-200 w-full max-w-md mx-auto p-4 sm:p-6 rounded-lg shadow-md m-5">
        <div class="mb-4">
            <label class="block my-2 text-sm sm:text-base font-medium">NAMA</label>
            <input type="text" :class="[isName ? 'border-red-600' : 'border-gray-200']" class="border px-4 py-3 rounded-lg shadow-sm w-full text-base sm:text-lg focus:ring-2 focus:ring-blue-500" v-model="name" @input="name = name.toUpperCase()" placeholder="Masukan Nama">
            <warning-message v-if="isName" class="mt-1 text-sm text-red-600">{{ NameMessage }}</warning-message>
        </div>
        <div class="mb-4">
            <label class="block my-2 text-sm sm:text-base font-medium">DEBITUR</label>
            <input type="text" :class="[isDebitur ? 'border-red-600' : 'border-gray-200']" class="border px-4 py-3 rounded-lg shadow-sm w-full text-base sm:text-lg focus:ring-2 focus:ring-blue-500" v-model="debitur" @input="debitur = debitur.toUpperCase()" placeholder="Masukan Debitur">
            <warning-message v-if="isDebitur" class="mt-1 text-sm text-red-600">{{ DebiturMessage }}</warning-message>
        </div>
        <div class="mb-4">
            <label class="block my-2 text-sm sm:text-base font-medium">SERTIPIKAT</label>
            <input type="text" :class="[isSertipikat ? 'border-red-600' : 'border-gray-200']" class="border px-4 py-3 rounded-lg shadow-sm w-full text-base sm:text-lg focus:ring-2 focus:ring-blue-500" v-model="sertipikat" @input="sertipikat = sertipikat.toUpperCase()" placeholder="Masukan Sertipikat">
            <warning-message v-if="isSertipikat" class="mt-1 text-sm text-red-600">{{ SertipikatMessage }}</warning-message>
        </div>
        <div class="mb-4">
            <label class="block my-2 text-sm sm:text-base font-medium">IMB</label>
            <input type="text" :class="[isIMB ? 'border-red-600' : 'border-gray-200']" class="border px-4 py-3 rounded-lg shadow-sm w-full text-base sm:text-lg focus:ring-2 focus:ring-blue-500" v-model="imb" @input="imb = imb.toUpperCase()" placeholder="Masukan IMB">
            <warning-message v-if="isIMB" class="mt-1 text-sm text-red-600">{{ IMBMessage }}</warning-message>
        </div>
        <div class="mb-4">
            <label class="block my-2 text-sm sm:text-base font-medium">PENERIMA</label>
            <select :class="[isPenerima ? 'border-red-600' : 'border-gray-200']" class="border px-4 py-3 rounded-lg shadow-sm w-full text-base sm:text-lg focus:ring-2 focus:ring-blue-500" v-model="penerima_id" placeholder="Pilih Penerima">
                <option v-for="penerima in penerimaOptions" :key="penerima.id" :value="penerima.id">{{ penerima.name }}</option>
            </select>
            <warning-message v-if="isPenerima" class="mt-1 text-sm text-red-600">{{ PenerimaMessage }}</warning-message>
        </div>
        <blue-button class="w-full py-3 text-base sm:w-auto sm:px-6 sm:py-2 min-h-[44px]">SIMPAN</blue-button>
    </form>

    <teleport to="body">
        <confirm-dialog v-if="isConfirmDialog" class="sm:max-w-md mx-auto">
            <template v-slot:title>Informasi</template>
            <template v-slot:message>{{ message }}</template>
            <template v-slot:buttons>
                <blue-button @click="closeConfirmDialog" class="w-full py-3 text-base min-h-[44px]">TUTUP</blue-button>
            </template>
        </confirm-dialog>
    </teleport>
</template>

<script>
export default {
    inject: ['students', 'saveStudent', 'penerimaOptions'],
    data() {
        return {
            name: '',
            debitur: '',
            sertipikat: '',
            imb: '',
            penerima_id: '',
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
                const searchingStudent = this.students.find(student => student.name === this.name);
                if (searchingStudent) {
                    this.isConfirmDialog = true;
                    this.message = `Nama ${this.name} sudah ada.`;
                } else {
                    this.saveStudent(this.name, this.debitur, this.sertipikat, this.imb, this.penerima_id);
                    this.isConfirmDialog = true;
                    this.message = 'Data Dokumen baru berhasil disimpan.';
                    this.name = '';
                    this.debitur = '';
                    this.sertipikat = '';
                    this.imb = '';
                    this.penerima_id = '';
                }
            }
        },
        closeConfirmDialog() {
            this.isConfirmDialog = false;
        }
    }
};
</script>

<style scoped>
.border {
    border: 1px solid #e5e7eb;
}
</style>
