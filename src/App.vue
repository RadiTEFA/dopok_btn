<template>
    <header class="w-screen bg-red-100 px-2 py-2 grid grid-cols-2">
        <div>
            <img src="./assets/img/logo-btn-1.png" alt="" height="75px" width="75px">
        </div>
        <div class="pt-5">
            <menu-button @click="setActivePage('show-students')" :class="[activePage === 'show-students' ? 'text-black' : 'bg-blue-600 text-white']">DATA DOPOK</menu-button>
            <span class="mx-1"></span>
            <menu-button @click="setActivePage('input-student')" :class="[activePage === 'input-student' ? 'text-black' : 'bg-blue-600 text-white']">INPUT DOPOK</menu-button>
        </div>
    </header>
    <div id="content" class="container mx-auto py-2">
        <component :is="activePage"></component>
    </div>
    <confirm-dialog v-if="isConfirmDialog">
        <template v-slot:title>Konfirmasi</template>
        <template v-slot:message>Yakin data akan dihapus?</template>
        <template v-slot:buttons>
            <red-button @click="deletingStudent">Ya</red-button>
            <span class="mx-1"></span>
            <blue-button @click="cancelDelete">Batal</blue-button>
        </template>
    </confirm-dialog>
</template>

<script>
import InputStudent from './components/InputStudent.vue';
import ShowStudents from './components/ShowStudents.vue';
import EditStudent from './components/EditStudent.vue';
import { computed } from 'vue';
import { supabase } from './supabase';

export default {
    components: {
        InputStudent,
        ShowStudents,
        EditStudent
    },
    data() {
        return {
            activePage: 'show-students',
            isConfirmDialog: false,
            deletedSertipikat: '',
            OldStudent: {
                id: '',
                name: '',
                debitur: '',
                sertipikat: '',
                imb: '',
                penerima_id: '',
                created_at: ''
            },
            students: [],
            penerimaOptions: []
        };
    },
    provide() {
        return {
            students: computed(() => this.students),
            student: computed(() => this.OldStudent),
            penerimaOptions: computed(() => this.penerimaOptions),
            deleteStudent: this.deleteStudent,
            saveStudent: this.saveStudent,
            editStudent: this.editStudent,
            updateStudent: this.updateStudent
        };
    },
    async created() {
        await this.fetchStudents();
        await this.fetchPenerima();
    },
    methods: {
        async fetchStudents() {
            const { data, error } = await supabase
                .from('documents')
                .select('id, name, debitur, sertipikat, imb, penerima_id, created_at, penerima(name)')
                .order('created_at', { ascending: false });
            if (error) {
                console.error('Error fetching students:', error);
                alert('Gagal memuat data: ' + error.message);
            } else {
                this.students = data.map(doc => ({
                    id: doc.id,
                    name: doc.name,
                    debitur: doc.debitur,
                    sertipikat: doc.sertipikat,
                    imb: doc.imb,
                    penerima: doc.penerima.name,
                    penerima_id: doc.penerima_id,
                    created_at: new Date(doc.created_at).toLocaleString('id-ID')
                }));
            }
        },
        async fetchPenerima() {
            const { data, error } = await supabase
                .from('penerima')
                .select('id, name')
                .order('name');
            if (error) {
                console.error('Error fetching penerima:', error);
                alert('Gagal memuat penerima: ' + error.message);
            } else {
                this.penerimaOptions = data;
            }
        },
        setActivePage(page) {
            this.activePage = page;
        },
        deleteStudent(sertipikat) {
            this.isConfirmDialog = true;
            this.deletedSertipikat = sertipikat;
        },
        async deletingStudent() {
            const { error } = await supabase
                .from('documents')
                .delete()
                .eq('sertipikat', this.deletedSertipikat);
            if (error) {
                console.error('Error deleting student:', error);
                alert('Gagal menghapus data: ' + error.message);
            } else {
                this.students = this.students.filter(
                    student => student.sertipikat !== this.deletedSertipikat
                );
                this.isConfirmDialog = false;
                this.deletedSertipikat = '';
            }
        },
        cancelDelete() {
            this.isConfirmDialog = false;
            this.deletedSertipikat = '';
        },
        async saveStudent(name, debitur, sertipikat, imb, penerima_id) {
            // Validasi huruf kapital
            if (!name.match(/^[A-Z\s]+$/) || name.match(/[a-z]/)) {
                alert('Nama harus hanya berisi huruf kapital dan spasi.');
                return;
            }
            if (debitur.match(/[a-z]/)) {
                alert('Debitur tidak boleh mengandung huruf kecil.');
                return;
            }
            if (sertipikat.match(/[a-z]/)) {
                alert('Sertipikat tidak boleh mengandung huruf kecil.');
                return;
            }
            if (imb.match(/[a-z]/)) {
                alert('IMB tidak boleh mengandung huruf kecil.');
                return;
            }

            const { error } = await supabase
                .from('documents')
                .insert({ name, debitur, sertipikat, imb, penerima_id });
            if (error) {
                console.error('Error saving student:', error);
                if (error.code === '23505') {
                    alert('Debitur atau sertipikat sudah ada.');
                } else {
                    alert('Gagal menyimpan data: ' + error.message);
                }
            } else {
                await this.fetchStudents();
            }
        },
        editStudent(editedStudent) {
            this.activePage = 'edit-student';
            this.OldStudent = {
                id: editedStudent.id,
                name: editedStudent.name,
                debitur: editedStudent.debitur,
                sertipikat: editedStudent.sertipikat,
                imb: editedStudent.imb,
                penerima_id: editedStudent.penerima_id,
                penerima: editedStudent.penerima,
                created_at: editedStudent.created_at
            };
        },
        async updateStudent(name, debitur, sertipikat, imb, penerima_id) {
            // Validasi huruf kapital
            if (!name.match(/^[A-Z\s]+$/) || name.match(/[a-z]/)) {
                alert('Nama harus hanya berisi huruf kapital dan spasi.');
                return;
            }
            if (debitur.match(/[a-z]/)) {
                alert('Debitur tidak boleh mengandung huruf kecil.');
                return;
            }
            if (sertipikat.match(/[a-z]/)) {
                alert('Sertipikat tidak boleh mengandung huruf kecil.');
                return;
            }
            if (imb.match(/[a-z]/)) {
                alert('IMB tidak boleh mengandung huruf kecil.');
                return;
            }

            const { error } = await supabase
                .from('documents')
                .update({ name, debitur, sertipikat, imb, penerima_id })
                .eq('id', this.OldStudent.id); // Gunakan id untuk pembaruan
            if (error) {
                console.error('Error updating student:', error);
                if (error.code === '23505') {
                    alert('Debitur atau sertipikat sudah ada.');
                } else {
                    alert('Gagal memperbarui data: ' + error.message);
                }
            } else {
                await this.fetchStudents();
                this.activePage = 'show-students';
            }
        }
    }
};
</script>