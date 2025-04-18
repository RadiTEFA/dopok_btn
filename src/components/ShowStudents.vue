<template>
    <title-page>DATA PENYERAHAN DOKUMEN POKOK</title-page>
    <div class="container-fluid mx-auto max-w-full px-4 sm:px-6">
        <!-- Search Input with Icon -->
        <div class="mb-6">
            <label for="search" class="block my-2 text-sm sm:text-base font-medium">Cari Dokumen</label>
            <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </span>
                <input 
                    id="search" 
                    type="text" 
                    v-model="searchQuery" 
                    placeholder="" 
                    aria-label="" 
                    class="border border-gray-200 pl-10 pr-4 py-3 rounded-lg shadow-sm w-full text-base sm:text-lg focus:ring-2 focus:ring-blue-500" @input="searchQuery = searchQuery.toUpperCase()"
                />
            </div>
        </div>

        <!-- Mobile Card View -->
        <div class="block sm:hidden space-y-4">
            <div v-for="(student, index) in filteredStudents" :key="student.sertipikat" class="border rounded-lg shadow-md p-4 bg-white">
                <div class="flex justify-between items-center">
                    <div class="font-semibold text-base">{{ students.name }}</div>
                    <button @click="toggleDetails(index)" class="text-blue-600 text-sm">
                        {{ expanded[index] ? 'Sembunyikan' : 'Tampilkan' }}
                    </button>
                </div>
                <div v-if="expanded[index]" class="mt-3 text-sm" style="font-family: 'Times New Roman', Times, serif;">
                    <p><strong>Nama:</strong> {{ student.name }}</p>
                    <p><strong>Debitur:</strong> {{ student.debitur }}</p>
                    <p><strong>Sertipikat:</strong> {{ student.sertipikat }}</p>
                    <p><strong>IMB:</strong> {{ student.imb }}</p>
                    <p><strong>Penerima:</strong> {{ student.penerima }}</p>
                    <p><strong>Tanggal Dibuat:</strong> {{ student.created_at }}</p>
                    <div class="mt-3 flex space-x-2">
                        <blue-button class="px-4 py-2 text-sm min-h-[44px]" @click="editStudent(student)">Edit</blue-button>
                        <red-button class="px-4 py-2 text-sm min-h-[44px]" @click="deleteStudent(student.sertipikat)">Hapus</red-button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Desktop Table View -->
        <div class="hidden sm:block overflow-x-auto">
            <table class="border border-collapse w-full text-sm sm:text-base">
                <thead class="bg-gray-100 sticky top-0">
                    <tr>
                        <th-table class="py-3 px-4">No</th-table>
                        <th-table class="py-3 px-4">NAMA</th-table>
                        <th-table class="py-3 px-4">DEBITUR</th-table>
                        <th-table class="py-3 px-4">SERTIPIKAT</th-table>
                        <th-table class="py-3 px-4">IMB</th-table>
                        <th-table class="py-3 px-4">PENERIMA</th-table>
                        <th-table class="py-3 px-4">TANGGAL DIBUAT</th-table>
                        <th-table class=" innerhalb px-4">AKSI</th-table>
                    </tr>
                </thead>
                <tbody>
                    <tr class="odd:bg-gray-50 hover:bg-red-50" v-for="(student, index) in filteredStudents" :key="student.sertipikat" style="font-family: 'Times New Roman', Times, serif;">
                        <td-table class="text-center py-3 px-4">{{ index + 1 }}</td-table>
                        <td-table class="py-3 px-4">{{ student.name }}</td-table>
                        <td-table class="py-3 px-4">{{ student.debitur }}</td-table>
                        <td-table class="py-3 px-4">{{ student.sertipikat }}</td-table>
                        <td-table class="py-3 px-4">{{ student.imb }}</td-table>
                        <td-table class="py-3 px-4">{{ student.penerima }}</td-table>
                        <td-table class="py-3 px-4">{{ student.created_at }}</td-table>
                        <td-table class="py-3 px-4 flex justify-center space-x-2">
                            <blue-button class="px-4 py-2 text-sm min-h-[44px]" @click="editStudent(student)">Edit</blue-button>
                            <red-button class="px-4 py-2 text-sm min-h-[44px]" @click="deleteStudent(student.sertipikat)">Hapus</red-button>
                        </td-table>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    inject: ['students', 'deleteStudent', 'editStudent'],
    data() {
        return {
            expanded: {},
            searchQuery: ''
        };
    },
    computed: {
        filteredStudents() {
            if (!this.searchQuery.trim()) {
                return this.students;
            }
            const query = this.searchQuery.toLowerCase();
            return this.students.filter(student => 
                student.name.toLowerCase().includes(query) ||
                student.debitur.toLowerCase().includes(query) ||
                student.sertipikat.toLowerCase().includes(query) ||
                student.imb.toLowerCase().includes(query) ||
                student.penerima.toLowerCase().includes(query) ||
                student.created_at.toLowerCase().includes(query)
            );
        }
    },
    methods: {
        toggleDetails(index) {
            this.expanded = { ...this.expanded, [index]: !this.expanded[index] };
        }
    }
};
</script>

<style scoped>
.border {
    border: 1px solid #e5e7eb;
    box-shadow: 0 0px 3px rgba(0, 0, 0, 0.1);
}
th-table, td-table {
    border: 1px solid #e5e7eb;
}
</style>
